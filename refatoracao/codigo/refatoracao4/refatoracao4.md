<h1>Refatoração em Nível de Código – Extract Method</h1>

<h2>Descrição da Refatoração</h2>

<p align="justify">
A Refatoração em Nível de Código – Extract Method teve como foco a <b>aplicação prática</b> dos métodos que haviam sido previamente refatorados e extraídos para classes auxiliares no projeto. 
Essa etapa foi realizada nos métodos <code>Login</code> do <i>UserController</i> e <code>PostFormulario</code> do <i>FormServidorController</i>, 
com o objetivo de garantir <b>reutilização de código, redução de duplicação e melhor coesão</b> entre os componentes da aplicação.
</p>

<p align="justify">
Em vez de manter as lógicas internas de autenticação e geração de protocolos dentro dos controladores, 
essas responsabilidades passaram a ser delegadas às classes auxiliares <i>ClaimsHelper</i> e <i>ProtocoloGenerator</i>, 
que já haviam sido criadas anteriormente na Refatoração A (Extract Class).
Assim, os controladores passaram apenas a orquestrar o fluxo de requisição HTTP, chamando métodos especializados.
</p>

<p align="justify">
Essa refatoração segue o padrão <i>Extract Method</i> descrito por Martin Fowler, 
não no sentido de extrair um novo método diretamente do controller, mas de <b>utilizar métodos já extraídos</b> de forma adequada e modularizada. 
Dessa forma, a equipe garantiu a correta integração e uso das refatorações previamente criadas, 
mantendo a consistência do código e aplicando o Princípio da Responsabilidade Única (SRP).
</p>

<h2>Justificativa Técnica</h2>

<p align="justify">
Antes da aplicação dessa refatoração, os controladores <i>UserController</i> e <i>FormServidorController</i> ainda continham trechos de código que reproduziam lógicas 
já existentes nas classes auxiliares criadas anteriormente. Isso caracterizava um <b>code smell</b> do tipo <i>Duplicated Code</i>, 
uma vez que diferentes partes da aplicação estavam realizando funções semelhantes — como autenticação e geração de protocolo — de forma redundante.
</p>

<p align="justify">
A decisão técnica foi <b>substituir</b> essas implementações duplicadas por chamadas diretas às classes <i>ClaimsHelper</i> e <i>ProtocoloGenerator</i>. 
Com isso, o sistema passou a centralizar as regras de negócio em componentes específicos, reduzindo a chance de inconsistência e 
facilitando futuras alterações sem a necessidade de modificar múltiplos controladores.
</p>

<p align="justify">
A aplicação dessa refatoração promoveu maior <b>coesão</b> entre as camadas do backend, 
reforçou o uso do <i>Single Responsibility Principle</i> e aumentou a <b>testabilidade</b> da aplicação, 
já que a lógica sensível de autenticação e geração de protocolos passou a estar isolada em métodos reutilizáveis.
</p>

<h2>Evidências Antes e Depois da Refatoração</h2>

<h3><b>Problema:</b> Separação das funcionalidades no arquivo <code>FormServidorController</code></h3>

<p align="justify">
Antes da refatoração, o <i>FormServidorController</i> acumulava múltiplas responsabilidades dentro de um mesmo método, 
misturando a lógica de controle HTTP com a lógica de geração de protocolos. 
Essa prática gerava duplicação de código e dificultava a manutenção, além de violar o Princípio da Responsabilidade Única (SRP). 
Era necessário extrair essa lógica para uma classe auxiliar dedicada, promovendo maior modularidade e reutilização.
</p>

<p><b>Antes da Refatoração – <code>Controllers/FormServidorController.cs</code></b></p>

<img width="1362" height="715" alt="Antes - Código original no controller" src="https://github.com/user-attachments/assets/36c6ddf7-aa45-4dd8-87ba-a6f225197725" />

<img width="1359" height="715" alt="Antes - Código com duplicação de lógica" src="https://github.com/user-attachments/assets/e976abf0-52ef-4147-a618-4c6cf26191a2" />

<p><b>Depois da Refatoração – Injeção e uso do <code>ProtocoloGenerator</code></b></p>

<img width="1361" height="718" alt="Depois - Injeção do ProtocoloGenerator" src="https://github.com/user-attachments/assets/d09410b2-96e6-4d49-bd8f-eab31056c9d4" />

<img width="1361" height="718" alt="Depois - Uso do método GenerateUniqueProtocol()" src="https://github.com/user-attachments/assets/126c5f50-66e0-481f-ba44-ba4be94cbe02" />

<hr>

<h3><b>Problema:</b> Método de Login com mais de uma funcionalidade</h3>

<p align="justify">
O método <code>Login</code> do <i>UserController</i> concentrava múltiplas operações: autenticação do usuário, 
montagem de claims e criação do <code>ClaimsPrincipal</code>. 
Essa sobrecarga tornava o código extenso, de difícil leitura e propenso a erros em futuras manutenções. 
A refatoração se fez necessária para isolar a criação das credenciais de autenticação em um helper específico, 
garantindo clareza, coesão e facilidade de reutilização em diferentes contextos da aplicação.
</p>

<p><b>Antes da Refatoração – <code>Controllers/UserController.cs</code></b></p>

<img width="1358" height="717" alt="Antes - Lógica de autenticação inline" src="https://github.com/user-attachments/assets/2f8c24ac-7e63-4550-aa74-4eaae3126e51" />

<p><b>Depois da Refatoração – <code>Controllers/UserController.cs</code></b></p>

<img width="1358" height="717" alt="Depois - Login com uso do ClaimsHelper" src="https://github.com/user-attachments/assets/53110c23-310a-4b7a-a841-a96d1854a72d" />

<hr>

<h2>Classificação da Refatoração</h2>

<ul>
<li><b>Tipo:</b> Refatoração em Nível de Código – Extract Method (Aplicação dos Métodos Refatorados).</li>
<li><b>Camada afetada:</b> Backend (Controllers + Helpers).</li>
<li><b>Escopo:</b> Reutilização dos métodos <code>ClaimsHelper.CreateClaimsPrincipal()</code> e <code>ProtocoloGenerator.GenerateUniqueProtocol()</code>.</li>
<li><b>Smell abordado:</b> <i>Duplicated Code</i> e <i>Low Cohesion</i> (baixa coesão entre camadas).</li>
<li><b>Princípios aplicados:</b> Single Responsibility Principle (SRP), Reutilização de Código, Clean Architecture e Baixo Acoplamento.</li>
</ul>

<h2>Smell Identificado</h2>

<p align="justify">
Antes da aplicação dessa refatoração, o projeto apresentava <b>duplicação de código</b> e <b>baixa reutilização</b> nos controladores principais. 
Trechos responsáveis por autenticação e geração de protocolos estavam sendo implementados de forma redundante, 
violando o princípio da responsabilidade única e dificultando a manutenção do sistema.
</p>

<p align="justify">
Com a refatoração, essas lógicas passaram a ser utilizadas a partir das classes auxiliares <i>ClaimsHelper</i> e <i>ProtocoloGenerator</i>. 
Dessa forma, o sistema ganhou modularidade, clareza e reutilização efetiva de código, 
além de permitir futuras evoluções sem comprometer outras partes da aplicação.
</p>

<h2>Impacto Esperado</h2>

<ul>
<li> Redução da duplicação de código entre controladores.</li>
<li> Aumento da clareza e da coesão entre as camadas de backend.</li>
<li> Facilitação da manutenção e expansão futura do sistema.</li>
<li> Centralização da lógica de autenticação e geração de protocolos em componentes reutilizáveis.</li>
<li> Melhoria da testabilidade dos componentes auxiliares (<i>Helpers</i>).</li>
</ul>

<h2>Conclusão acerca da Refatoração</h2>

<p align="justify">
A Refatoração em Nível de Código – Extract Method (Aplicação dos Métodos Refatorados) representou um passo essencial para consolidar as melhorias introduzidas nas etapas anteriores. 
Ao aplicar e integrar as classes <i>ClaimsHelper</i> e <i>ProtocoloGenerator</i> aos controladores, 
o código tornou-se mais limpo, reutilizável e aderente aos princípios de arquitetura limpa e modularização.
</p>

<p align="justify">
Essa refatoração não alterou o comportamento funcional do sistema, mantendo o mesmo resultado externo — mas aprimorou significativamente a estrutura interna, 
eliminando duplicações, fortalecendo a manutenção e preparando o projeto para futuras extensões com menor esforço de desenvolvimento.
</p>

<p align="justify">
Para mais detalhes técnicos, acesse o registro desta refatoração em:
<a href="https://github.com/arsouza81/MIS_OS/issues/34" target="_blank">
Refatoração em Nível de Código – Extract Method #34
</a>.
</p>
