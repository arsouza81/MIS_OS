# Refatoração em Nível de Código – Rename Method / Variable

## Descrição da Refatoração
A refatoração aplicada consistiu na padronização de nomes de métodos, parâmetros e rotas HTTP nos controladores **UserController** e **FormServidorController**, utilizando o padrão **Rename Method/Variable**, conforme descrito por *Martin Fowler*.  

O objetivo foi tornar o código mais consistente com as convenções do C# (.NET), adotando o padrão **camelCase** para parâmetros e métodos, além de reorganizar rotas para o formato **api/[controller]**, seguindo práticas RESTful.

As principais ações realizadas foram:

- Padronização das URLs seguindo uma estrutura clara e previsível;
- Substituição de parâmetros em *snake_case* (ex.: `data_solicitacao`) para **camelCase** (ex.: `dataSolicitacao`);
- Renomeação de métodos e endpoints para refletir com precisão a ação realizada;
- Melhoria da legibilidade e coerência sem modificar o comportamento funcional da aplicação.

Essa refatoração **não alterou a lógica do sistema**, apenas aprimorou sua estrutura interna e clareza.

---

## Justificativa Técnica
Durante a análise do código, foram identificados alguns *code smells*, principalmente relacionados à inconsistência na nomenclatura e falta de clareza semântica. Esses problemas impactavam a manutenção e dificultavam a comunicação entre backend e frontend. De forma resumida listamos três tópicos que relacionam os *code smells* encontrados para essa refatoração ser aplicada. 

### Smells Identificados

| Code Smell | Descrição | Consequência |
|-----------|-----------|--------------|
| **Naming Inconsistency** | Métodos, parâmetros e rotas utilizavam convenções diferentes | Dificultava leitura e manutenção |
| **Rotas pouco descritivas** | Endpoints não deixavam claro seu propósito | Prejudicava a integração com o frontend |
| **Desalinhamento REST** | Estrutura de rotas não seguia semântica de recursos | API menos previsível e menos padronizada |

Ao aplicar o padrão **Rename Method / Variable**, o código passou a refletir melhor o domínio da aplicação, reduzindo ambiguidades e facilitando a evolução futura.

Para mais detalhes dos *code smells* encontrados para essa refatoração, verifique a descrição dos *code smells* de forma mais detalhada e alinhada com a descrição do livro:  [Code Small](https://github.com/arsouza81/MIS_OS/blob/manutencao_de_refatoracao/refatoracao/smells/code_smell1.md)
---

## Evidências Antes e Depois

### Antes da Refatoração
```csharp
[HttpGet("detalhes_solicitacao/{id}")]
public async Task<IActionResult> GetDetalhesSolicitacao(int id, DateTime data_solicitacao)
{
    ...
}
```


### Depois da Refatoração
```csharp
[HttpGet("solicitacao-detalhes/{id}")]
public async Task<IActionResult> ObterDetalhesSolicitacao(int id, DateTime dataSolicitacao)
{
    ...
}
```

### Resultado Obtido
- URLs ficaram mais limpas e descritivas (ex.: api/user/solicitacao-detalhes/5);
- Variáveis e parâmetros passaram a seguir padrão camelCase;
- Melhor entendimento semântico e previsibilidade da API;
- Integração frontend–backend facilitada pela padronização.

## Conclusão
A refatoração Rename Method / Variable trouxe ganhos diretos em clareza, legibilidade, padronização e coesão interna do código, sem alterar o comportamento observado pelo usuário.
A API agora segue práticas recomendadas para desenvolvimento em C# e REST, tornando o sistema mais profissional, sustentável e preparado para evoluções futuras.

Para detalhes técnicos mais minuciosos, acesse o registro da refatoração em: [Issue #32](https://github.com/arsouza81/MIS_OS/issues/32)
