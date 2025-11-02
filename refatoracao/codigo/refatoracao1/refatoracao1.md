<h1>Refatoração em Nível de Código – Extract Class</h1>

<h2>Descrição da Refatoração</h2>

<p align="justify">
A Refatoração em Nível de Código – Extract Class consistiu em uma melhoria planejada no backend do sistema, com foco em separação de responsabilidades, redução de acoplamento e aumento da coesão entre os componentes. O processo envolveu a extração de duas lógicas específicas que, até então, estavam incorporadas diretamente aos controladores <i>UserController</i> e <i>FormServidorController</i>: a criação do objeto <i>ClaimsPrincipal</i>, responsável por representar as credenciais e permissões do usuário autenticado, e a geração de um protocolo único, utilizado para identificação e rastreamento de solicitações realizadas pelos servidores.
</p>

<p align="justify">
Essas duas funcionalidades foram transferidas para classes dedicadas — <i>ClaimsHelper</i> e <i>ProtocoloGenerator</i> — localizadas no diretório <i>Services/Helpers</i>. Essa modificação foi fundamentada no Princípio da Responsabilidade Única e na aplicação do padrão de refatoração Extract Class, conforme proposto por Martin Fowler. O objetivo foi reorganizar o código para que cada classe desempenhasse uma função específica e bem delimitada, melhorando assim a legibilidade, o reuso e a testabilidade da aplicação.
</p>

<p align="justify">
Essa refatoração manteve o comportamento externo do sistema, sem alterar a lógica funcional das requisições, mas aprimorou significativamente sua estrutura interna. O resultado foi um código mais limpo, modular e preparado para futuras expansões e integrações.
</p>

<h2>Justificativa Técnica</h2>

<p align="justify">
Antes da refatoração, observou-se que os controladores acumulavam múltiplas responsabilidades, o que ia de encontro aos princípios de uma arquitetura bem estruturada. No <i>UserController</i>, a lógica para criação do <i>ClaimsPrincipal</i> estava diretamente acoplada ao fluxo de autenticação, o que tornava o código mais extenso, repetitivo e de difícil manutenção. Já no <i>FormServidorController</i>, o código responsável pela geração de protocolo estava embutido nos métodos de requisição HTTP, combinando lógica de negócio com controle de requisições — uma prática que fragilizava a arquitetura e dificultava testes automatizados.
</p>

<p align="justify">
Essa estrutura violava o Princípio da Responsabilidade Única e representava um code smell clássico de “Classe com Responsabilidades Múltiplas”, reduzindo a clareza e dificultando a evolução do sistema. Além disso, ao manter essas operações dentro dos controllers, a reutilização de suas funcionalidades em outras partes da aplicação (por exemplo, em outros controladores ou serviços) exigiria duplicação de código.
</p>

<p align="justify">
Com a refatoração, essas lógicas foram extraídas e realocadas em classes auxiliares especializadas, garantindo que cada componente possuísse apenas uma função clara e isolada. Isso permitiu a injeção de dependência dessas classes em diferentes contextos, facilitando a manutenção e a realização de testes unitários independentes. O código passou a seguir os princípios da Clean Architecture, promovendo modularidade, clareza e extensibilidade.
</p>

<h2>Evidências Antes e Depois da Refatoração</h2>

<h3>Antes da Refatoração</h3>
<ul>
<li>A criação de <i>ClaimsPrincipal</i> ocorria diretamente dentro do <i>UserController</i>, junto com a lógica de autenticação e persistência, gerando acoplamento entre camadas de controle e segurança.</li>
<li>O <i>FormServidorController</i> continha a geração de protocolos de forma manual e repetitiva, sem abstração ou reutilização possível.</li>
<li>A ausência de abstrações dificultava a aplicação de testes unitários e a substituição de implementações.</li>
<li>Baixa coesão e alta dependência entre classes, comprometendo a clareza e a manutenibilidade do código.</li>
</ul>

Controllers/UserController.cs
<img width="1362" height="715" alt="Image" src="https://github.com/user-attachments/assets/0a5ede66-af55-405f-905f-39b65e07b6c0" />

Controllers/FormServidorController.cs
<img width="1358" height="717" alt="Image" src="https://github.com/user-attachments/assets/7d8c3284-87b1-4cde-805b-8808dfc5070a" />

<h3>Depois da Refatoração</h3>
<ul>
<li>Foram criadas as classes <i>ClaimsHelper</i> e <i>ProtocoloGenerator</i> no diretório <i>Services/Helpers</i>, cada uma com uma responsabilidade única.</li>
<li>O <i>UserController</i> passou a delegar a criação de <i>ClaimsPrincipal</i> para o <i>ClaimsHelper</i>, mantendo o foco apenas na lógica de requisição HTTP.</li>
<li>O <i>FormServidorController</i> agora solicita a geração de protocolo ao <i>ProtocoloGenerator</i>, removendo completamente essa lógica de seu escopo.</li>
<li>As classes podem ser injetadas via Dependency Injection, promovendo baixo acoplamento e alta testabilidade.</li>
<li>O código tornou-se mais legível, modular e reutilizável, permitindo evoluções futuras sem riscos de regressões indesejadas.</li>
</ul>

Services/Helpers/ClaimsHelper.cs
<img width="1359" height="715" alt="Image" src="https://github.com/user-attachments/assets/db5d3cc1-9cb0-4696-9f37-fc03720b0f8b" />

Services/Helpers/ProtocoloGenerator.cs
<img width="1361" height="718" alt="Image" src="https://github.com/user-attachments/assets/cb0b4caa-00c5-49db-8dce-83280c460d01" />


<h2>Conclusão acerca da Refatoração</h2>
<p align="justify">
A Refatoração em Nível de Código – Extract Class #31 representa uma etapa essencial no processo de melhoria contínua da base de código. A mudança eliminou code smells relacionados à concentração excessiva de responsabilidades e trouxe ganhos expressivos em organização, testabilidade, coesão e clareza arquitetural. Essa iniciativa reforça o compromisso com a aplicação de boas práticas de desenvolvimento, tornando o sistema mais robusto e preparado para escalabilidade.
</p>
<p align="justify">
Para detalhes técnicos mais minuciosos, acesse o registro da refatoração em: Refatoração em Nível de Código – <a href="https://github.com/arsouza81/MIS_OS/issues/31" target="_blank">Extract Class #31</a>
