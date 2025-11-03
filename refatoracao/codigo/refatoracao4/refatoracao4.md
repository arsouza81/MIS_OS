<h1>Refatoração em Nível de Código – Extract Method</h1>

<h2>Descrição da Refatoração</h2>

<p align="justify">
A Refatoração em Nível de Código – Extract Method teve como foco a melhoria da clareza, da coesão e da manutenibilidade do fluxo de autenticação da aplicação. Essa refatoração foi aplicada no método <i>Login</i>, originalmente implementado dentro do <i>UserController</i>. Antes da mudança, toda a lógica de autenticação, incluindo a criação da lista de <i>Claims</i>, a construção da <i>ClaimsIdentity</i> e da instância de <i>ClaimsPrincipal</i>, estava diretamente embutida no método do controller.
</p>

<p align="justify">
Esse código foi extraído para um método dedicado em uma nova classe auxiliar chamada <i>ClaimsHelper</i>. O objetivo foi isolar a responsabilidade de criação das credenciais de autenticação do usuário (as <i>claims</i>) e deixar o controller responsável apenas por orquestrar o fluxo da requisição HTTP.
Essa refatoração segue o padrão Extract Method descrito por Martin Fowler, no qual um trecho coeso de lógica dentro de um método maior é removido e encapsulado em um novo método com um nome expressivo. No nosso caso, a lógica de geração do <i>ClaimsPrincipal</i> passou a ser responsabilidade do método <code>CreateClaimsPrincipal(user)</code> da classe <i>ClaimsHelper</i>.
</p>

<p align="justify">
O comportamento externo não foi alterado, o login continua retornando sucesso quando o usuário é autenticado e erro quando as credenciais são inválidas. No entanto, internamente o código se tornou mais legível, reutilizável e preparado para expansão futura (por exemplo: adicionar novas <i>claims</i>, papéis de usuário ou permissões específicas sem precisar alterar o controller).
</p>

<h2>Justificativa Técnica</h2>

<p align="justify">
Antes da refatoração, o método <i>Login</i> apresentava sinais claros de <b>code smell</b> do tipo <i>Long Method</i> e <i>Low Cohesion</i>. O controller concentrava ao mesmo tempo: consulta ao banco de dados, validação de credenciais, criação das <i>claims</i> e configuração do contexto de autenticação da aplicação. Essa mistura de responsabilidades dificultava a leitura, aumentava o risco de erro em alterações futuras e tornava a implementação menos testável.
</p>

<p align="justify">
Além disso, a lógica de criação do <i>ClaimsPrincipal</i> é uma funcionalidade crítica de segurança que pode ser necessária em múltiplos pontos da aplicação (por exemplo, login de administradores, renovação de sessão etc.). Se essa lógica permanecesse “copiada e colada” dentro de cada controller, haveria uma tendência a repetição de código e risco de inconsistência entre fluxos de autenticação diferentes.
</p>

<p align="justify">
Com a refatoração, essa responsabilidade foi removida do <i>UserController</i> e centralizada em <i>ClaimsHelper</i>. O controller passou a apenas chamar um método expressivo, <code>ClaimsHelper.CreateClaimsPrincipal(user)</code>, reduzindo o acoplamento, aumentando a coesão e aplicando o Princípio da Responsabilidade Única (SRP). A refatoração também facilita a escrita de testes unitários específicos para autenticação, pois agora é possível testar a montagem das <i>claims</i> isoladamente, sem precisar simular toda a requisição HTTP.
</p>

<h2>Evidências Antes e Depois da Refatoração</h2>

<h3>Antes da Refatoração</h3>

<ul>
<li>A montagem de todas as <i>claims</i> era feita manualmente dentro do método <code>Login</code> no <i>UserController</i>.</li>
<li>O próprio controller criava a <code>ClaimsIdentity</code> e a <code>ClaimsPrincipal</code>.</li>
<li>O método <code>Login</code> ficava mais extenso e menos direto, acumulando lógica de autenticação e de construção de credenciais.</li>
<li>A testabilidade era limitada porque essa lógica estava acoplada diretamente ao <code>HttpContext</code>.</li>
</ul>

<p><b>Controllers/UserController.cs (antes)</b></p>

<pre>
[HttpPost("login")]
public async Task&lt;IActionResult&gt; Login([FromBody] LoginDto loginDto) {
    var user = _context.Users.FirstOrDefault(u => 
        u.Email == loginDto.Email && u.Password == loginDto.Password);

    if (user != null)
    {
        var claims = new List&lt;Claim&gt; {
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.Name)
        };

        var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
        var principal = new ClaimsPrincipal(identity);

        await HttpContext.SignInAsync(
            CookieAuthenticationDefaults.AuthenticationScheme, 
            principal
        );

        return Ok(new { success = true });
    }

    return Unauthorized(new { success = false, message = "Credenciais inválidas" });
}
</pre>


<h3>Depois da Refatoração</h3>

<ul>
<li>Foi criada a classe <i>ClaimsHelper</i> contendo o método <code>CreateClaimsPrincipal(User user)</code>, responsável por montar toda a estrutura de autenticação do usuário.</li>
<li>O método <code>Login</code> no <i>UserController</i> ficou mais limpo, objetivo e fácil de entender: ele autentica, delega a criação do principal e finaliza o login.</li>
<li>O código ficou mais reutilizável: qualquer outro ponto do sistema que precise autenticar um usuário agora pode chamar o <i>ClaimsHelper</i> diretamente.</li>
<li>Houve redução de acoplamento entre camada de controle e detalhes de autenticação/autorização.</li>
</ul>

<p><b>Services/Helpers/ClaimsHelper.cs (depois)</b></p>

<pre>
public static class ClaimsHelper
{
    public static ClaimsPrincipal CreateClaimsPrincipal(User user)
    {
        var claims = new List&lt;Claim&gt; {
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.Name)
        };

        var identity = new ClaimsIdentity(
            claims, 
            CookieAuthenticationDefaults.AuthenticationScheme
        );

        return new ClaimsPrincipal(identity);
    }
}
</pre>

<p><b>Controllers/UserController.cs (depois)</b></p>

<pre>
[HttpPost("login")]
public async Task&lt;IActionResult&gt; Login([FromBody] LoginDto loginDto) {
    var user = _context.Users.FirstOrDefault(u =>
        u.Email == loginDto.Email && u.Password == loginDto.Password);

    if (user != null)
    {
        var principal = ClaimsHelper.CreateClaimsPrincipal(user);

        await HttpContext.SignInAsync(
            CookieAuthenticationDefaults.AuthenticationScheme,
            principal
        );

        return Ok(new { success = true });
    }

    return Unauthorized(new { success = false, message = "Credenciais inválidas" });
}
</pre>

<h2>Classificação da Refatoração</h2>

<ul>
<li><b>Tipo:</b> Refatoração em Nível de Código – Extract Method.</li>
<li><b>Camada afetada:</b> Backend (Controller + Helper).</li>
<li><b>Escopo:</b> Autenticação e montagem de credenciais do usuário.</li>
<li><b>Smell abordado:</b> Método longo (<i>Long Method</i>) e lógica de autenticação duplicável.</li>
<li><b>Princípios aplicados:</b> Single Responsibility Principle (SRP), Clean Code e baixo acoplamento.</li>
</ul>

<h2>Smell Identificado</h2>

<p align="justify">
O smell que motivou essa refatoração foi a presença de uma lógica detalhada e repetível dentro do método <code>Login</code>, no controller. Esse padrão indica um <b>Long Method</b>, em que uma única função concentra múltiplas responsabilidades: autenticar credenciais, montar <i>claims</i>, criar a identidade de segurança e registrar a sessão. Esse tipo de código tende a crescer com o tempo e dificulta a compreensão por parte de novos desenvolvedores.
</p>

<p align="justify">
Também havia risco de <b>duplicação de lógica</b>: se outro endpoint precisasse autenticar o usuário (por exemplo, um login de administrador ou renovação de sessão), a tendência seria copiar o mesmo bloco de criação de <code>ClaimsPrincipal</code> para outro controller, o que prejudica a consistência e aumenta custo de manutenção.
</p>

<p align="justify">
Ao extrair essa lógica para o método <code>CreateClaimsPrincipal</code> dentro de <i>ClaimsHelper</i>, o sistema passa a ter um ponto único e confiável para gerar credenciais de autenticação. Isso reduz a chance de divergência entre fluxos de login e torna explícita a intenção do código.
</p>

<h2>Impacto Esperado</h2>

<ul>
<li> Redução da complexidade do método <code>Login</code>, que agora é curto e direto.</li>
<li> Aumento da legibilidade e da clareza sem alterar o comportamento funcional.</li>
<li> Reutilização da lógica de montagem de <i>claims</i> em outros fluxos (admin, gerente, etc.).</li>
<li> Melhoria da manutenção da parte de segurança/autenticação, que agora está centralizada.</li>
<li> Aumento da testabilidade: é possível testar o <i>ClaimsHelper</i> isoladamente, simulando diferentes perfis de usuário e verificando se as <i>claims</i> geradas estão corretas.</li>
</ul>

<h2>Conclusão acerca da Refatoração</h2>

<p align="justify">
A Refatoração em Nível de Código – Extract Method, representou um passo importante para evoluir a arquitetura do backend em direção a um código mais limpo, sustentável e escalável. Ao extrair a lógica de criação de <i>ClaimsPrincipal</i> do <i>UserController</i> e encapsulá-la em uma classe auxiliar especializada (<i>ClaimsHelper</i>), reduzimos a responsabilidade do controller, melhoramos a coesão e criamos um ponto único de autenticação passível de evolução.
</p>

<p align="justify">
Essa melhoria elimina o code smell associado a métodos extensos e com múltiplas responsabilidades, além de preparar a base de autenticação para futuras extensões (por exemplo, inclusão de roles, permissões e políticas de acesso diferenciadas). A refatoração não alterou o resultado final do endpoint de login, mantendo o comportamento externo do sistema inalterado — exatamente o objetivo de uma refatoração bem-sucedida.
</p>

<p align="justify">
Para mais detalhes técnicos mais minuciosos, acesse o registro desta refatoração em:
<a href="https://github.com/arsouza81/MIS_OS/issues/34" target="_blank">
Refatoração em Nível de Código – Extract Method #34
</a>.
</p>
