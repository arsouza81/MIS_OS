<h1>📝 CHANGELOG</h1>

<p style="text-align: justify;">
Todas as mudanças relevantes deste projeto serão documentadas neste arquivo.
O formato segue princípios do <em>Keep a Changelog</em> e do <em>Semantic Versioning</em>.
</p>

<hr>

<h2>[1.1.0] - 2025-11-15</h2>
<h3>🚀 Manutenção Evolutiva – Etapa 2</h3>

<h4>✨ Adicionado</h4>

<ul>
  <li>
    <strong>Rastreabilidade de Atualizações na Ordem de Serviço</strong><br>
    <ul>
      <li>Inclusão do campo <code>DataAtualizacao</code> no modelo <code>FormServidor</code>.</li>
      <li>Replicação do campo nos DTOs para consumo pelo frontend.</li>
      <li>Inicialização de <code>DataAtualizacao</code> no POST com o valor de <code>Data_Solicitacao</code>.</li>
      <li>Atualização automática de <code>DataAtualizacao</code> no PUT/PATCH utilizando <code>DateTime.Now</code>.</li>
      <li>Migração criada e aplicada no banco de dados.</li>
      <li><em>(Issue #57)</em></li>
    </ul>
  </li>

  <li>
    <strong>Timeline de Criação e Atualização da OS</strong><br>
    <ul>
      <li>Exibição visual dos marcos <code>Data_Solicitacao</code> e <code>DataAtualizacao</code>.</li>
      <li>Implementação nas telas <code>Solicitacao.jsx</code> e <code>DetalhesSolicitacao.jsx</code>.</li>
      <li>Formatação das datas no padrão brasileiro (<code>dd/mm/aaaa hh:mm</code>).</li>
      <li><em>(Issue #58)</em></li>
    </ul>
  </li>

  <li>
    <strong>Listagem Geral de Ordens de Serviço (sem filtro obrigatório por data)</strong><br>
    <ul>
      <li>A página <code>IndexGerente.jsx</code> passa a exibir todas as OS automaticamente ao carregar.</li>
      <li>Ordenação das OS da mais recente para a mais antiga.</li>
      <li><em>(Issue #59)</em></li>
    </ul>
  </li>

  <li>
    <strong>Filtros e Busca para Gerente de TI</strong><br>
    <ul>
      <li>Campo de busca pelo número de protocolo.</li>
      <li>Filtro por status: <em>Todos</em>, <em>Pendente</em>, <em>Em Andamento</em>, <em>Concluída</em>, <em>Descartada</em>.</li>
      <li>Listagem atualizada dinamicamente conforme filtros são aplicados.</li>
      <li><em>(Issue complementar de usabilidade)</em></li>
    </ul>
  </li>
</ul>


