﻿using AutoMapper;
using HandlebarsDotNet;
using Microsoft.AspNetCore.Mvc;
using OrdemDeServico.Data;
using OrdemDeServico.Dtos;
using OrdemDeServico.Models;
using OrdemDeServico.Services;
using OrdemDeServico.Services.Helpers;

namespace OrdemDeServico.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FormServidorController : Controller {

    private OrdemContext _context;
    private IMapper _mapper;
    private readonly IEmailSender _emailSender;
    private readonly ProtocoloGenerator _protocoloGenerator;    

    public FormServidorController(OrdemContext context, IMapper mapper, IEmailSender emailSender) {
        _context = context;
        _mapper = mapper;
        _emailSender = emailSender;
        _protocoloGenerator = new ProtocoloGenerator(context);
    }

    [HttpPost]
    public IActionResult PostFormServidor([FromBody] CreateFormServidorDto formServidorDto) {
        FormServidor formServidor = _mapper.Map<FormServidor>(formServidorDto);
        _context.FormsServidores.Add(formServidor);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetFormServidorPorId), new { id = formServidor.Id }, formServidor);
    }

    [HttpGet("{id}")]
    public IActionResult GetFormServidorPorId(int id) {
        var formServidor = _context.FormsServidores.FirstOrDefault(formServidor => formServidor.Id == id);
        if(formServidor == null) return NotFound();
        return Ok(formServidor);
    }

    [HttpGet]
    public IEnumerable<ReadFormServidorDto> GetFormServidor() {
        return _mapper.Map<List<ReadFormServidorDto>>(_context.FormsServidores).ToList();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteFormServidor(int id) {
        var formServidor = _context.FormsServidores.FirstOrDefault(formServidor => formServidor.Id == id);
        if(formServidor == null) return NotFound();
        _context.Remove(formServidor);
        _context.SaveChanges();
        return NoContent();
    }

    [HttpGet("buscar-protocolo")]
    public IActionResult BuscarProtocolo(string? protocolo) {
        if(string.IsNullOrEmpty(protocolo))
            return BadRequest(new { error = "O protocolo não pode estar vazio" });

        var formulario = _context.FormsServidores
            .FirstOrDefault(f => f.Protocolo == protocolo);

        if(formulario == null)
            return NotFound(new { error = "Protocolo não encontrado" });

        
        var formularioSemSiape = new {
            formulario.Protocolo,
            formulario.Nome,
            formulario.Email,
            formulario.Bloco,
            formulario.Sala,
            formulario.DescricaoProblema,
            formulario.Data_Solicitacao,
            formulario.DataAtualizacao,
            formulario.Status
        };

        return Ok(formularioSemSiape);
    }

    [HttpPost("formulario")]
    public async Task<IActionResult> PostFormulario([FromBody] CreateFormServidorDto formDto) {
        if (!ModelState.IsValid) {
            return BadRequest(ModelState);
        }

        var formulario = new FormServidor {
            Nome = formDto.Nome,
            Email = formDto.Email,
            Siape = formDto.Siape,
            Bloco = formDto.Bloco,
            Sala = formDto.Sala,
            DescricaoProblema = formDto.DescricaoProblema,
            Data_Solicitacao = formDto.Data_Solicitacao,
            Status = "em_andamento",
            Protocolo = _protocoloGenerator.GenerateUniqueProtocolo()
        };

        _context.FormsServidores.Add(formulario);
        await _context.SaveChangesAsync();

        //enviar e-mails
        await _emailSender.SendEmailAsync(
            formulario.Email,
            "Sua Ordem de Serviço Recebida",
            $"Sua ordem de serviço foi recebida com o protocolo: {formulario.Protocolo}. Estamos trabalhando nisso.");

        var users = _context.Users.ToList();
        foreach (var user in users) {
            await _emailSender.SendEmailAsync(
                user.Email,
                "Nova Ordem de Serviço Recebida",
                $"Uma nova ordem de serviço foi criada com o protocolo: {formulario.Protocolo}.");
        }

    
        return Ok(new {
            message = "Formulário enviado com sucesso!",
            protocolo = formulario.Protocolo
        });
    }
}