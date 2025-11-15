<h1>📘 Planejamento da Manutenção Evolutiva e Acessibilidade<br>
  <small>(Etapa 2 – Evolução do Sistema)</small>
</h1>

<hr>

<h2>1. Introdução</h2>

<p style="text-align: justify;">
Esta etapa do projeto tem como objetivo evoluir o sistema por meio da implementação de 
<strong>novas funcionalidades</strong> e da aplicação de <strong>melhorias significativas de acessibilidade</strong>. 
As funcionalidades descritas nesta documentação foram definidas com base nas issues registradas no repositório, 
buscando ampliar a rastreabilidade das informações, melhorar a experiência do usuário e otimizar a 
eficiência do processo de acompanhamento das Ordens de Serviço (OS).
</p>

<hr>

<h2>2. Funcionalidades Evolutivas</h2>

<p style="text-align: justify;">
Nesta seção são apresentadas as funcionalidades planejadas para a manutenção evolutiva do sistema, contendo 
<strong>descrição</strong>, <strong>objetivo</strong>, <strong>justificativa</strong> e 
<strong>escopo técnico</strong> de cada implementação.
</p>

<hr>

<h3>🔧 Funcionalidade 1 — Rastreabilidade de Atualizações na Ordem de Serviço<br>
  <small>(Issue #57)</small>
</h3>

<h4>📘 Descrição</h4>
<p style="text-align: justify;">
Atualmente, o sistema registra apenas a data de criação da Ordem de Serviço (<code>Data_Solicitacao</code>), 
sem armazenar informações sobre quando as atualizações posteriores são realizadas pelo Gerente de TI. 
Essa limitação impede auditoria adequada e compromete a rastreabilidade do ciclo de vida da OS.
</p>

<h4>🎯 Objetivo</h4>
<p style="text-align: justify;">
Implementar um mecanismo que registre automaticamente a data e o horário da última modificação, por meio da 
adição do campo <code>DataAtualizacao</code> no modelo da Ordem de Serviço.
</p>

<h4>📝 Justificativa</h4>
<p style="text-align: justify;">
Sem o registro da última atualização, é impossível identificar quando uma OS foi alterada ou verificar 
a atualidade das informações exibidas. A inclusão do campo <code>DataAtualizacao</code> oferece rastreabilidade 
mínima necessária para auditoria, aumenta a transparência e melhora o acompanhamento das solicitações.
</p>

<h4>🔧 Escopo Técnico</h4>
<ul>
  <li>Adicionar o campo <code>DateTime DataAtualizacao</code> ao modelo FormServidor.</li>
  <li>Replicar o novo campo nos DTOs utilizados pelo backend.</li>
  <li>No método de criação (POST), inicializar <code>DataAtualizacao</code> com o valor de <code>Data_Solicitacao</code>.</li>
  <li>No método de atualização (PUT/PATCH), atualizar automaticamente o campo com <code>DateTime.Now</code>.</li>
  <li>Criar a migração correspondente e aplicá-la ao banco de dados.</li>
</ul>

<hr>

<h3>🎨 Funcionalidade 2 — Timeline de Criação e Atualização da Ordem de Serviço<br>
  <small>(Issue #58)</small>
</h3>

<h4>📘 Descrição</h4>
<p style="text-align: justify;">
Após a implementação do campo <code>DataAtualizacao</code>, o frontend deve exibir uma timeline contendo os 
dois marcos temporais principais da OS: a data de criação e a data da última atualização. Essa timeline será 
apresentada nas páginas <code>Solicitacao.jsx</code> (Servidor) e <code>DetalhesSolicitacao.jsx</code> (Gerência), 
abaixo dos dados principais da solicitação.
</p>

<h4>🎯 Objetivo</h4>
<p style="text-align: justify;">
Fornecer uma visualização clara e intuitiva da evolução da Ordem de Serviço, destacando seus momentos de criação 
e modificação.
</p>

<h4>📝 Justificativa</h4>
<p style="text-align: justify;">
A exibição apenas da data de criação não transmite ao usuário quando a OS foi atualizada pela última vez, 
gerando incertezas sobre o andamento do atendimento. A timeline torna essas informações visíveis e melhora a 
experiência do usuário.
</p>

<h4>🔧 Escopo Técnico</h4>
<ul>
  <li>Adicionar componente visual de timeline às telas de visualização da OS.</li>
  <li>Exibir <code>Data_Solicitacao</code> e <code>DataAtualizacao</code> com ícones representativos.</li>
  <li>Formatar datas no padrão brasileiro (<code>dd/mm/aaaa hh:mm</code>).</li>
  <li>Garantir responsividade e integração com o layout atual.</li>
</ul>

<hr>

<h3>📄 Funcionalidade 3 — Listagem Geral de Ordens de Serviço (sem filtro obrigatório por data)<br>
  <small>(Issue #59)</small>
</h3>

<h4>📘 Descrição</h4>
<p style="text-align: justify;">
Antes da evolução, o Gerente precisava selecionar uma data no calendário para visualizar Ordens de Serviço 
registradas naquele dia. Essa abordagem tornava a navegação pouco prática, pois exigia conhecimento prévio da data 
de criação das OS para encontrá-las.
</p>
<p style="text-align: justify;">
A funcionalidade proposta apresenta uma listagem geral, exibida automaticamente ao acessar a página 
<code>IndexGerente.jsx</code>, mostrando todas as OS cadastradas.
</p>

<h4>🎯 Objetivo</h4>
<p style="text-align: justify;">
Oferecer ao Gerente uma visão ampla, rápida e eficiente das solicitações, sem a necessidade de selecionar datas 
manualmente.
</p>

<h4>📝 Justificativa</h4>
<p style="text-align: justify;">
A navegação por calendário é lenta e pouco prática, especialmente quando o volume de solicitações aumenta. 
A exibição automática das OS reduz etapas desnecessárias, acelera o fluxo de trabalho e melhora a usabilidade.
</p>

<h4>🔧 Escopo Técnico</h4>
<ul>
  <li>Modificar a lógica de carregamento para listar todas as OS ao entrar na página.</li>
  <li>Ordenar as OS da mais recente para a mais antiga.</li>
  <li>Manter coerência visual e responsividade.</li>
</ul>

<hr>

<h3>🎛️ Funcionalidade 4 — Filtros e Busca na visão do Gerente<br>
  <small>(Busca por protocolo e filtro por status)</small>
</h3>

<h4>📘 Descrição</h4>
<p style="text-align: justify;">
Com a listagem geral ativada, tornou-se necessário adicionar ferramentas que ajudem o Gerente a localizar 
especificamente as Ordens de Serviço desejadas. Essa funcionalidade adiciona:
</p>
<ul>
  <li>Campo de busca por número de protocolo;</li>
  <li>Filtro por status da solicitação 
      (Todos, Pendente, Em Andamento, Concluída, Descartada).</li>
</ul>
<p style="text-align: justify;">
A listagem é atualizada dinamicamente conforme o usuário digita ou seleciona um status.
</p>

<h4>🎯 Objetivo</h4>
<p style="text-align: justify;">
Facilitar a localização de OS específicas e melhorar a eficiência do processo de gestão.
</p>

<h4>📝 Justificativa</h4>
<p style="text-align: justify;">
Com o aumento da quantidade de OS exibidas, navegar apenas por rolagem torna-se pouco eficiente. 
Os filtros reativos oferecem uma experiência mais organizada, rápida e intuitiva.
</p>

<h4>🔧 Escopo Técnico</h4>
<ul>
  <li>Implementar campo de busca por protocolo em <code>IndexGerente.jsx</code>.</li>
  <li>Adicionar dropdown de status.</li>
  <li>Atualizar listagem em tempo real conforme filtros são aplicados.</li>
  <li>Preservar responsividade e coerência do layout.</li>
</ul>

<hr>

<h2>3. Melhorias de Acessibilidade (a implementar)</h2>

<p style="text-align: justify;">
Além das funcionalidades evolutivas, esta etapa inclui a implementação de pelo menos uma melhoria significativa 
de acessibilidade, visando corrigir uma limitação real do sistema e promover maior inclusão no uso da interface. 
O modelo abaixo será preenchido quando a melhoria for definida e implementada.
</p>

<h3>♿ Melhoria de Acessibilidade — [Título da melhoria]</h3>

<h4>📘 Problema Identificado</h4>
<p style="text-align: justify;"><em>[Descrição da limitação de acessibilidade encontrada]</em></p>

<h4>🎯 Objetivo</h4>
<p style="text-align: justify;"><em>[O que a solução busca resolver]</em></p>

<h4>📝 Justificativa</h4>
<ul>
  <li><em>Público afetado pela limitação.</em></li>
  <li><em>Impactos causados pela barreira atual.</em></li>
  <li><em>Importância da solução para acessibilidade e inclusão.</em></li>
</ul>

<h4>🔧 Solução Proposta</h4>
<p style="text-align: justify;"><em>[Descrição técnica da solução]</em></p>

<hr>

<h2>4. Considerações Finais</h2>

<p style="text-align: justify;">
As funcionalidades de manutenção evolutiva apresentadas neste documento fortalecem a eficiência, transparência e 
usabilidade do sistema, atendendo às necessidades do Gerente de TI e dos usuários que acompanham o ciclo de vida 
das Ordens de Serviço. A implementação da melhoria de acessibilidade complementará este processo, aproximando o 
sistema das boas práticas de inclusão e alinhando-o às exigências acadêmicas e reais de uso.
</p>
