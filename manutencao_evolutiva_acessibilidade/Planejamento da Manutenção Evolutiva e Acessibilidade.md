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
  
  <small><em>(<a href="https://github.com/arsouza81/MIS_OS/issues/57" target="_blank">Issue #57</a>)</em></small>
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

<h4>📝 Componente a ser modificado </h4>

Método api/formservidor/buscar-protocolo?protocolo=xxx
<td style="width:50%;"><img src="https://github.com/user-attachments/assets/580d5a07-5d6d-4ee5-a084-1c333d7072a1"></td>


Método api/user/solicitacao-detalhes/{id}
<td style="width:50%;"><img src="https://github.com/user-attachments/assets/8844f97c-fde8-42ca-8d9f-61926ae024c2"></td>


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
  <small><em>(<a href="https://github.com/arsouza81/MIS_OS/issues/58" target="_blank">Issue #58</a>)</em></small>
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

<h4>📝 Componente a ser modificado </h4>

Tela Consultar Solicitação - Perfil do Servidor (Página Solicitacao.jsx)
<img width="1276" height="551" alt="Image" src="https://github.com/user-attachments/assets/ea06638b-ea25-435f-b528-b1b9fb2e3ca3" />


Tela Detalhes da Solicitação - Perfil da Gerência (Página DetalhesSolicitacao.jsx)
<img width="1278" height="551" alt="Image" src="https://github.com/user-attachments/assets/aa66439f-52f0-4b9b-a3e0-476c7c253183" />


<h4>🔧 Escopo Técnico</h4>
<ul>
  <li>Adicionar componente visual de timeline às telas de visualização da OS.</li>
  <li>Exibir <code>Data_Solicitacao</code> e <code>DataAtualizacao</code> com ícones representativos.</li>
  <li>Formatar datas no padrão brasileiro (<code>dd/mm/aaaa hh:mm</code>).</li>
  <li>Garantir responsividade e integração com o layout atual.</li>
</ul>

<hr>

<h3>📄 Funcionalidade 3 — Listagem Geral de Ordens de Serviço (sem filtro obrigatório por data)<br>
  <small><em>(<a href="https://github.com/arsouza81/MIS_OS/issues/59" target="_blank">Issue #59</a>)</em></small>
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

<h4>📝 Componente a ser modificado </h4>

Página de solicitações(indexGerente) antes da implementação da listagem geral de Ordens de Serviço

![Image](https://github.com/user-attachments/assets/070f4178-31b4-44ee-b74f-ca011461f60e)


<h4>🔧 Escopo Técnico</h4>
<ul>
  <li>Modificar a lógica de carregamento para listar todas as OS ao entrar na página.</li>
  <li>Ordenar as OS da mais recente para a mais antiga.</li>
  <li>Manter coerência visual e responsividade.</li>
</ul>

<hr>

<h3>🎛️ Funcionalidade 4 — Filtros e Busca na visão do Gerente (Busca por protocolo e filtro por status)<br>
  <small><em>(<a href="https://github.com/arsouza81/MIS_OS/issues/60" target="_blank">Issue #60</a>)</em></small>
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

<h4>📝 Componente a ser modificado </h4>

Página de solicitações(indexGerente) antes da implementação do filtro de busca 

<img width="1898" height="970" alt="Image" src="https://github.com/user-attachments/assets/6d160bab-53b7-4c72-94e1-68d1f81fb5f6" />


<h4>🔧 Escopo Técnico</h4>
<ul>
  <li>Implementar campo de busca por protocolo em <code>IndexGerente.jsx</code>.</li>
  <li>Adicionar dropdown de status.</li>
  <li>Atualizar listagem em tempo real conforme filtros são aplicados.</li>
  <li>Preservar responsividade e coerência do layout.</li>
</ul>

<hr>

<h2>3. Melhorias de Acessibilidade (implementada)</h2>

<p style="text-align: justify;">
Além das funcionalidades evolutivas, esta etapa contemplou a implementação de uma melhoria significativa de
acessibilidade: a integração do VLibras ao sistema. A adição deste recurso corrige uma limitação real da interface
e promove maior inclusão para pessoas surdas ou com deficiência auditiva, permitindo que todo o conteúdo textual
seja traduzido para a Língua Brasileira de Sinais.
</p>

<h3>♿ Melhoria de Acessibilidade — Integração do VLibras</h3>
<small><em>(<a href="https://github.com/arsouza81/MIS_OS/issues/64" target="_blank">Issue #64</a>)</em></small>

<h4>📘 Problema Identificado</h4>
<p style="text-align: justify;">
O sistema não oferecia suporte para usuários surdos, não permitindo a tradução do conteúdo da interface para
Libras. Essa limitação dificultava a interpretação das informações e restringia a autonomia de navegação para
pessoas com deficiência auditiva.
</p>

<h4>🎯 Objetivo</h4>
<p style="text-align: justify;">
Permitir que usuários surdos tenham acesso pleno às informações exibidas no sistema por meio da tradução automática
dos textos para a Língua Brasileira de Sinais (Libras), garantindo maior acessibilidade, inclusão e conformidade
com boas práticas de design universal.
</p>

<h4>📝 Justificativa</h4>
<ul>
  <li><em>Público afetado:</em> usuários com deficiência auditiva ou surdez que dependem de interpretação em Libras.</li>
  <li><em>Impacto atual:</em> dificuldade de compreender textos, descrições e mensagens exibidas no sistema, 
  reduzindo acessibilidade e autonomia.</li>
  <li><em>Relevância:</em> a integração do VLibras amplia a inclusão digital, segue diretrizes governamentais 
  para acessibilidade e melhora a experiência de diversos perfis de usuários.</li>
</ul>


<h4>🔧 Solução Proposta</h4>
<p style="text-align: justify;">
A solução adotada consiste na integração do VLibras diretamente no frontend React, por meio da inserção do 
<span style="font-weight: bold;">widget oficial</span> disponibilizado pelo Governo Federal. Foram adicionados ao 
arquivo <code>index.html</code> os elementos necessários para carregar o plugin — incluindo o container padrão e 
o script de inicialização. Dessa forma, o intérprete virtual fica disponível em todas as rotas da aplicação, 
incluindo páginas públicas e áreas autenticadas, sem interferir no design existente. O componente é carregado de 
forma automática e funciona mesmo após navegação por múltiplas rotas em SPA (Single Page Application).</p>

<hr>

<h2>4. Considerações Finais</h2>

<p style="text-align: justify;">
As funcionalidades de manutenção evolutiva apresentadas neste documento fortalecem a eficiência, transparência e 
usabilidade do sistema, atendendo às necessidades do Gerente de TI e dos usuários que acompanham o ciclo de vida 
das Ordens de Serviço. A implementação da melhoria de acessibilidade complementa esse processo, aproximando o 
sistema das boas práticas de inclusão e garantindo conformidade com diretrizes modernas de acessibilidade digital.
Assim, as evoluções realizadas fortalecem o sistema no presente e abrem caminho para melhorias contínuas e expansões futuras.
</p>
