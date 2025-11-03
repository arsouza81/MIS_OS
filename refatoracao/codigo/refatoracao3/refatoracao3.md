# Refatoração em Nível de Código – Dead Code Removal

## Descrição da Refatoração
Remover código morto (Dead Code) do UserController, eliminando métodos e trechos não utilizados, redundantes ou substituídos por novas implementações.
Essa refatoração visa **reduzir complexidade**, melhorar desempenho e legibilidade, mantendo apenas o código efetivamente utilizado pela aplicação.r*.  

O objetivo principal foi reduzir a complexidade, melhorar o desempenho e a legibilidade do código, mantendo apenas as partes efetivamente utilizadas pela aplicação.

As principais ações realizadas foram:

- Remoção de métodos antigos que renderizavam páginas com Handlebars, substituídos por rotas RESTful que retornam JSON; 
- Eliminação de duplicações, como `SelecionarDataJson` e `DetalhesSolicitacaoJson`, que coexistiam com versões atualizadas (`GetSolicitacoesPorData`, `GetSolicitacaoDetalhes`);  
- Padronização do `UserController` para conter apenas rotas de API válidas e ativas;
- Remoção de dependências e referências obsoletas.

Essa refatoração **não alterou a lógica do sistema**, apenas aprimorou sua estrutura interna e clareza.

---

## Justificativa Técnica
Durante a análise do código, foram identificados diversos trechos inativos e redundantes, caracterizando o code smell Dead Code — trechos de código que não são mais utilizados em nenhuma parte do sistema.

Esses elementos prejudicavam a manutenção, aumentavam o tamanho do código compilado e introduziam riscos de inconsistência entre rotas antigas e as novas versões RESTful.

### Smells Identificados

| Code Smell                   | Descrição                                                           | Consequência                                    |
| ---------------------------- | ------------------------------------------------------------------- | ----------------------------------------------- |
| **Dead Code**                | Métodos e variáveis não mais utilizados ou acessados                | Aumento desnecessário da base de código         |
| **Duplicated Functionality** | Existência de métodos antigos coexistindo com novas versões RESTful | Ambiguidade e risco de manutenção incorreta     |
| **Obsolete Dependencies**    | Referências a bibliotecas e recursos legados (como Handlebars)      | Desempenho reduzido e acoplamento desnecessário |


Com a remoção desses code smells, o `UserController` tornou-se mais enxuto, claro e alinhado às boas práticas de desenvolvimento backend.


## Evidências Antes e Depois

### Antes da Refatoração
```csharp
[HttpGet("selecionarData")]
public IActionResult SelecionarDataJson()
{
    var dados = ObterDadosHandlebars();
    return View("SelecionarData", dados);
}

```


### Depois da Refatoração
```csharp
[HttpGet("solicitacoes/data/{data}")]
public async Task<IActionResult> GetSolicitacoesPorData(DateTime data)
{
    var solicitacoes = await _solicitacaoService.ObterPorDataAsync(data);
    return Ok(solicitacoes);
}

```

### Resultado Obtido
- Código mais limpo e focado apenas nas rotas REST em uso;
- Remoção completa de código e dependências obsoletas;
- Melhoria de desempenho e clareza estrutural do controlador;
- Redução de riscos de inconsistência e conflito entre versões de rotas.

## Conclusão
A refatoração Dead Code Removal resultou em um UserController mais leve, legível e eficiente, livre de métodos redundantes e implementações descontinuadas.
Essa melhoria reforça as boas práticas de manutenção e evolução contínua do código, garantindo uma base mais estável e preparada para futuras extensões do sistema.

Para detalhes técnicos mais minuciosos, acesse o registro da refatoração em: [Issue #33][(https://github.com/arsouza81/MIS_OS/issues/33)]
