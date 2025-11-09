﻿using AutoMapper;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using OrdemDeServico.Data;
using OrdemDeServico.Dtos;
using OrdemDeServico.Models;
using System.Security.Claims;
using OrdemDeServico.Services.Helpers;

namespace OrdemDeServico.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase {

    private OrdemContext _context;
    private IMapper _mapper;

    public UserController(OrdemContext context, IMapper mapper) {
        _context = context;
        _mapper = mapper;
    }

    [HttpPost]
    public IActionResult PostUser([FromBody] CreateUserDto userDto) {
        User user = _mapper.Map<User>(userDto);
        _context.Users.Add(user);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetUserPorId), new { id = user.Id }, user);
    }

    [HttpGet("{id}")]
    public IActionResult GetUserPorId(int id) {
        var user = _context.Users.FirstOrDefault(user => user.Id == id);
        if (user == null) return NotFound();
        return Ok(user);
    }

    [HttpGet]
    public IEnumerable<ReadUserDto> GetUsers() {
        return _mapper.Map<List<ReadUserDto>>(_context.Users).ToList();
    }

    [HttpDelete]
    public IActionResult DeleteUser(int id) {
        var user = _context.Users.FirstOrDefault(user => user.Id == id);
        if (user == null) return NotFound();
        _context.Remove(user);
        _context.SaveChanges();
        return NoContent();
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto) {
       var user = _context.Users.FirstOrDefault(u => u.Email == loginDto.Email && u.Password == loginDto.Password);

        if(user != null) {
            var principal = ClaimsHelper.CreateClaimsPrincipal(user);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);
            
            return Ok(new { success = true });
        }
        
        return Unauthorized(new { success = false, message = "Credenciais inválidas" });
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout() {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return Ok(new { success = true });
    }

    [HttpPost("atualizar-status")]
    public IActionResult AtualizarStatus([FromBody] AtualizarStatusDto statusDto) {
        // atualizar o status no banco de dados com base no protocolo e novoStatus fornecidos
        var solicitacao = _context.FormsServidores
            .FirstOrDefault(s => s.Protocolo == statusDto.Protocolo);

        if(solicitacao != null) {
            solicitacao.Status = statusDto.NovoStatus;
            _context.SaveChanges();
            return Ok(); //retorna uma resposta de sucesso
        }
        return NotFound(); //retorna um erro 404 se a solicitação não for encontrada
    }


    [HttpGet("solicitacoes-por-data")]
    public IActionResult GetSolicitacoesPorData([FromQuery(Name = "data_solicitacao")] string dataSolicitacao) {
        if (!DateTime.TryParseExact(dataSolicitacao, "yyyy-MM-dd", null, System.Globalization.DateTimeStyles.None, out var data))
            return BadRequest("Data inválida");

        var solicitacoes = _context.FormsServidores
            .Where(f => f.Data_Solicitacao.Date == data.Date)
            .Select(f => new {
                id = f.Id,
                nome = f.Nome,
                email = f.Email,
                protocolo = f.Protocolo,
                status = f.Status,
                dataSolicitacao = f.Data_Solicitacao
            })
            .ToList();

        return Ok(new {
            diaSelecionado = data.ToString("dd/MM/yyyy"),
            nomesEIds = solicitacoes
        });
    }
    
    [HttpGet("solicitacao-detalhes/{id}")]
    public IActionResult GetSolicitacaoDetalhes(int id) {
        var solicitacao = _context.FormsServidores
            .Where(s => s.Id == id)
            .Select(s => new ReadFormServidorDto
            {
                Nome = s.Nome,
                Email = s.Email,
                Siape = s.Siape,
                Bloco = s.Bloco,
                Sala = s.Sala,
                DescricaoProblema = s.DescricaoProblema,
                Status = s.Status,
                Protocolo = s.Protocolo,
            })
            .FirstOrDefault();

        if(solicitacao == null)
            return NotFound();

        return Ok(solicitacao);
    }
}