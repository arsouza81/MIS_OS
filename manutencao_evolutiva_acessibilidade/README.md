<h1>🖥️ MIS_OS – Sistema de Gestão de Ordens de Serviço do ICET/UFAM</h1>

<p style="text-align: justify;">
O <strong>MIS_OS</strong> é o sistema oficial utilizado no 
<strong>Instituto de Ciências Exatas e Tecnologia da Universidade Federal do Amazonas (ICET/UFAM)</strong> 
para o registro, acompanhamento e gerenciamento de <strong>Ordens de Serviço (OS)</strong> relacionadas 
a demandas de Tecnologia da Informação. O sistema apoia dois perfis principais:
<strong>Servidores do ICET</strong>, responsáveis por registrar as solicitações, e a 
<strong>Gerência de TI</strong>, responsável por analisar, priorizar e solucionar os atendimentos.
</p>

<hr>

<h2>📌 Objetivos do Sistema</h2>

<ul>
  <li>Registrar de forma organizada e padronizada as Ordens de Serviço de TI do ICET/UFAM.</li>
  <li>Permitir o acompanhamento completo do status de cada solicitação.</li>
  <li>Fornecer ao setor de TI do ICET uma interface eficiente para gerenciamento de demandas.</li>
  <li>Garantir maior transparência, rastreabilidade e qualidade no fluxo de atendimentos.</li>
</ul>

<hr>

<h2>📁 Estrutura Geral do Repositório</h2>

<ul>
  <li><code>/backend</code> – API e lógica de negócios do sistema MIS_OS (ASP.NET/C#).</li>
  <li><code>/frontend</code> – Aplicação React utilizada pelos Servidores e pela Gerência de TI.</li>
  <li><code>/docs</code> – Documentações complementares:
    <ul>
      <li><code>/docs/planejamento-evolucao-acessibilidade.html</code> – Planejamento da etapa de Manutenção Evolutiva e Acessibilidade.</li>
    </ul>
  </li>
  <li><code>CHANGELOG.html</code> – Registro de todas as alterações realizadas no MIS_OS.</li>
</ul>

<hr>

<h2>🧩 Funcionalidades Principais</h2>

<h3>👤 Perfil Servidor (ICET/UFAM)</h3>
<ul>
  <li>Abertura de novas Ordens de Serviço.</li>
  <li>Acompanhamento do status atual da OS.</li>
  <li>Visualização da timeline de criação e atualização.</li>
</ul>

<h3>🛠️ Perfil Gerência de TI (ICET/UFAM)</h3>
<ul>
  <li>Visualização geral de todas as solicitações registradas.</li>
  <li>Atualização de status, descrição e demais dados da OS.</li>
  <li>Listagem automática das OS (mais novas para mais antigas).</li>
  <li>Busca por protocolo e filtros por status.</li>
  <li>Análise detalhada com timeline completa.</li>
</ul>

<hr>

<h2>⚙️ Manutenção Evolutiva – Etapa 2</h2>

<p style="text-align: justify;">
Durante a segunda etapa do trabalho acadêmico, foram implementadas melhorias com foco em 
<strong>rastreabilidade</strong>, <strong>usabilidade</strong> e <strong>interface</strong>, 
melhorando consideravelmente a experiência dos usuários do ICET/UFAM. As principais evoluções são:
</p>

<ul>
  <li><strong>Rastreabilidade temporal</strong> – Adição do campo <code>DataAtualizacao</code> para registrar a última modificação da OS.</li>
  <li><strong>Timeline visual</strong> – Exibição clara dos marcos de criação e atualização da OS.</li>
  <li><strong>Listagem geral para a Gerência</strong> – Remoção da exigência de filtro por data.</li>
  <li><strong>Filtros avançados</strong> – Busca por protocolo e filtragem por status das solicitações.</li>
</ul>

<p style="text-align: justify;">
O planejamento detalhado desta etapa está disponível no documento abaixo:
</p>

<p>
  📄 <a href="https://github.com/arsouza81/MIS_OS/blob/manutencao_evolutiva/manutencao_evolutiva_acessibilidade/Planejamento%20da%20Manuten%C3%A7%C3%A3o%20Evolutiva%20e%20Acessibilidade.md">
    Planejamento da Manutenção Evolutiva e Acessibilidade – MIS_OS
  </a>
</p>

<hr>

<h2>♿ Acessibilidade</h2>

<p style="text-align: justify;">
O MIS_OS está em processo de evolução para incorporar melhorias reais de acessibilidade, garantindo uso adequado 
por pessoas com deficiência, conforme diretrizes de acessibilidade digital.  
As melhorias planejadas incluem: contraste adequado, navegação por teclado, textos alternativos, rótulos claros, 
uso correto de ARIA e outras boas práticas.
</p>

<hr>

<h2>📜 CHANGELOG</h2>

<p style="text-align: justify;">
O histórico de versão e todas as alterações realizadas no MIS_OS podem ser consultados abaixo:
</p>

<p>
  📝 <a href="https://github.com/arsouza81/MIS_OS/blob/manutencao_evolutiva/manutencao_evolutiva_acessibilidade/CHANGELOG.md">
    Ver CHANGELOG – MIS_OS
  </a>
</p>

<hr>

<h2>🚀 Como Executar o Projeto</h2>

<h3>Backend (ASP.NET/C#)</h3>
<ol>
  <li>Acesse o diretório <code>/backend</code>.</li>
  <li>Configure a connection string (arquivo <code>appsettings.json</code>).</li>
  <li>Execute as migrações: <code>dotnet ef database update</code>.</li>
  <li>Inicie a API: <code>dotnet run</code>.</li>
</ol>

<h3>Frontend (React)</h3>
<ol>
  <li>Acesse o diretório <code>/frontend</code>.</li>
  <li>Instale dependências: <code>npm install</code> ou <code>yarn</code>.</li>
  <li>Configure a URL da API nos arquivos de ambiente.</li>
  <li>Inicie a aplicação: <code>npm start</code> ou <code>yarn start</code>.</li>
</ol>

<hr>

<h2>🤝 Contribuição</h2>

<p style="text-align: justify;">
Este repositório foi desenvolvido como parte das atividades acadêmicas do ICET/UFAM e pode servir como base para 
ampliações, estudos e pesquisas futuras. Sugestões e melhorias podem ser registradas via 
<strong>issues</strong> ou <strong>pull requests</strong>, seguindo boas práticas de desenvolvimento.
</p>

<hr>

<h2>📚 Documentação Complementar</h2>

<ul>
  <li>
    📄 <a href="https://github.com/arsouza81/MIS_OS/blob/manutencao_evolutiva/manutencao_evolutiva_acessibilidade/Planejamento%20da%20Manuten%C3%A7%C3%A3o%20Evolutiva%20e%20Acessibilidade.md">
      Planejamento da Manutenção Evolutiva e Acessibilidade – MIS_OS
    </a>
  </li>
  <li>
    📝 <a href="https://github.com/arsouza81/MIS_OS/blob/manutencao_evolutiva/manutencao_evolutiva_acessibilidade/CHANGELOG.md">
      CHANGELOG – MIS_OS
    </a>
  </li>
</ul>



