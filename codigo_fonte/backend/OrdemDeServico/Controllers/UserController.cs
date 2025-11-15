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
        var solicitacao = _context.FormsServidores
            .FirstOrDefault(s => s.Protocolo == statusDto.Protocolo);

        if(solicitacao != null) {
            solicitacao.Status = statusDto.NovoStatus;
            solicitacao.DataAtualizacao = DateTime.Now;
            _context.SaveChanges();

            return Ok(new {
                status = solicitacao.Status,
                dataAtualizacao = solicitacao.DataAtualizacao
            });
        }
        return NotFound();
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

    [HttpGet("solicitacoes")]
    public IActionResult GetSolicitacoes(int page = 1, int pageSize = 20) {
        var query = _context.FormsServidores
            .OrderByDescending(f => f.Data_Solicitacao);

        var total = query.Count();

        var solicitacoes = query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
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
            total,
            page,
            pageSize,
            data = solicitacoes
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
                Data_Solicitacao = s.Data_Solicitacao,
                DataAtualizacao = s.DataAtualizacao,
            })
            .FirstOrDefault();

        if(solicitacao == null)
            return NotFound();

        return Ok(solicitacao);
    }
}