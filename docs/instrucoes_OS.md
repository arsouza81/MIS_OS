<h1>Manual de Instalação e Configuração do Projeto Ordem de Serviço</h1>

<h2>1. Requisitos de Sistema</h2>
<p>Antes de iniciar, certifique-se de que seu sistema atenda aos seguintes requisitos:</p>
<ul>
    <li>Windows 10 ou superior</li>
    <li>Conexão com a internet para baixar as ferramentas necessárias</li>
</ul>

<h2>2. Instalando o .NET SDK (Backend em C#)</h2>
<ol>
    <li>Acesse o site oficial do .NET:</li>
    <a href="https://dotnet.microsoft.com/pt-br/download" target="_blank">https://dotnet.microsoft.com/pt-br/download</a>
    <li>Baixe e instale o <strong>.NET SDK 8.x</strong> (não o Runtime).</li>
    <li>Após a instalação, abra o Terminal ou PowerShell e execute:</li>
    <pre><code>dotnet --version</code></pre>
    <li>Se aparecer a versão, a instalação está concluída.</li>
</ol>

<h2>3. Instalando o Entity Framework Core CLI</h2>
<p>O Entity Framework Core é utilizado para atualizar o banco de dados do projeto.</p>
<ol>
    <li>Abra o Terminal ou PowerShell.</li>
    <li>Execute o seguinte comando para instalar o EF CLI:</li>
    <pre><code>dotnet tool install --global dotnet-ef</code></pre>
    <li>Verifique a instalação:</li>
    <pre><code>dotnet ef --version</code></pre>
</ol>

<h2>4. Instalando o Node.js (Frontend em React)</h2>
<ol>
    <li>Acesse o site oficial do Node.js:</li>
    <a href="https://nodejs.org" target="_blank">https://nodejs.org</a>
    <li>Baixe a versão <strong>LTS</strong>.</li>
    <li>Após a instalação, verifique com os comandos:</li>
    <pre><code>node -v
npm -v</code></pre>
</ol>

<h2>5. Baixando o Projeto do GitHub</h2>
<p>Você pode baixar o projeto de duas formas:</p>

<h3>5.1 Clonar com Git</h3>
<ol>
    <li>Abra o Terminal ou Git Bash.</li>
    <li>Navegue até a pasta onde deseja salvar o projeto.</li>
    <li>Execute o comando:</li>
    <pre><code>git clone https://github.com/arsouza81/MIS_OS.git</code></pre>
</ol>

<h3>5.2 Baixar como arquivo ZIP</h3>
<ol>
    <li>Acesse o repositório:</li>
    <a href="https://github.com/arsouza81/MIS_OS" target="_blank">https://github.com/arsouza81/MIS_OS</a>
    <li>Clique em <strong>Code</strong> &gt; <strong>Download ZIP</strong>.</li>
    <li>Extraia o arquivo ZIP em uma pasta de sua preferência.</li>
</ol>

<h2>6. Estrutura do Projeto</h2>
<p>Após baixar o projeto, confirme a seguinte estrutura:</p>
<pre><code>/codigo_fonte/
    ├── backend/
    │     └── OrdemDeServico/
    └── frontend/
          └── src/
</code></pre>

<h2>7. Configurando o Backend (C#)</h2>

<h3>7.1 Abrindo no VS Code</h3>
<ol>
    <li>Abra o VS Code.</li>
    <li>Clique em <strong>File &gt; Open Folder</strong>.</li>
    <li>Selecione a pasta:</li>
    <pre><code>/codigo_fonte/backend/OrdemDeServico/</code></pre>
</ol>

<h3>7.2 Configurando o appsettings.json</h3>
<ol>
    <li>Abra o arquivo <strong>appsettings.json</strong>.</li>
    <li>Localize a seção <strong>ConnectionStrings</strong>.</li>
    <li>Atualize com suas credenciais:</li>
</ol>

<pre><code>"ConnectionStrings": {
    "OrdemServicoConnection": "server=localhost;database=ordem_de_servico_api;user=root;password="
  },
  "Smtp": {
    "Host": "smtp.gmail.com",
    "Port": 587,
    "Username": "",
    "Password": "",
    "From": ""
  }
</code></pre>

<h2>8. Atualizando o Banco de Dados (EF Core)</h2>
<p>Todos os comandos devem ser executados no terminal dentro da pasta do backend:</p>

<pre><code>/codigo_fonte/backend/OrdemDeServico/</code></pre>

<h3>8.1 Criando uma migração (caso necessário)</h3>
<pre><code>dotnet ef migrations add NomeDaMigracao</code></pre>

<h3>8.2 Atualizando o banco de dados</h3>
<pre><code>dotnet ef database update</code></pre>

<p>Após isso, o banco estará atualizado e pronto para uso.</p>

<h2>9. Iniciando o Backend</h2>
<ol>
    <li>No terminal, execute:</li>
    <pre><code>dotnet run</code></pre>
    <li>O servidor será iniciado e aparecerá algo como:</li>
</ol>

<pre><code>Now listening on: https://localhost:5053</code></pre>

<h2>10. Configurando o Frontend (React)</h2>

<h3>10.1 Acessando a pasta do frontend</h3>
<pre><code>/codigo_fonte/frontend/</code></pre>

<h3>10.2 Instalando as dependências</h3>
<pre><code>npm install</code></pre>

<h3>10.3 Executando o projeto</h3>
<pre><code>npm run dev</code></pre>

<p>O terminal exibirá algo como:</p>

<pre><code>http://localhost:5173/</code></pre>

<h2>11. Acessando o Sistema</h2>
<ul>
    <li><strong>Backend:</strong> https://localhost:5053</li>
    <li><strong>Frontend:</strong> http://localhost:5173</li>
</ul>

<h2>12. Problemas Comuns</h2>

<h3>❌ dotnet-ef não encontrado</h3>
<pre><code>dotnet tool install --global dotnet-ef</code></pre>

<h3>❌ Erro de conexão com o banco</h3>
<ul>
    <li>Verifique a senha do MySQL no appsettings.json.</li>
    <li>Certifique-se de que o MySQL está rodando.</li>
</ul>

<h3>❌ Erro no npm install</h3>
<pre><code>npm cache clean --force</code></pre>

<p>Com isso, todo o ambiente deve estar funcionando corretamente.</p>
