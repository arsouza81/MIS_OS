using System;
using System.Linq;
using OrdemDeServico.Data;

namespace OrdemDeServico.Services.Helpers;
public class ProtocoloGenerator {
    private readonly OrdemContext _context;
    private static readonly string _chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    
    public ProtocoloGenerator(OrdemContext context) {
        _context = context;
    }

    public string GenerateUniqueProtocolo() {
        var random = new Random();
        string protocolo;

        do {
            protocolo = new string(Enumerable.Repeat(_chars, 8)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        } while (_context.FormsServidores.Any(f => f.Protocolo == protocolo));

        return protocolo;
    }
}