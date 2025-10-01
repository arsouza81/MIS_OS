<h1 align=center> Universidade Federal do Amazonas<br>
Instituto de Ciências Exatas e Tecnologia</h1>

<h3 align=right>Engenharia de Software</h3>
<p align=right>
Alicia Caldeira Da Silva <br>
Anderson Rodrigues De Souza <br>
Diandre Pires Bruce <br>
Kássia Ramos Oliveira <br>
Rennan De Souza Alves
</p>


---

<h3 align=center>RELATÓRIO FINAL<br>Manutenção Corretiva</h3>


---

## 1. Descrição do Sistema

### 1.1 Propósito e Funcionalidades

<p align=justify>
O Instituto de Ciências Exatas e Tecnologia (ICET), em Itacoatiara, possui uma ampla infraestrutura acadêmica e tecnológica, atendendo milhares de alunos e servidores. Apesar desse porte, o setor de Tecnologia da Informação enfrenta dificuldades no gerenciamento de operações de suporte, devido à ausência de um sistema centralizado para registro e acompanhamento de atendimentos, o que compromete a organização e a eficiência da Gerência de TI (GTI).
</p>

<p align=justify>
Para resolver esse problema, foi desenvolvido o sistema <b>Ordem de Serviço (OS)</b>, uma aplicação voltada para a gestão das demandas de TI do instituto. O sistema tem como objetivo principal organizar, registrar e canalizar as vantagens de serviços, permitindo que os chamados sejam acompanhados em tempo real e direcionados corretamente aos responsáveis, oferecendo maior agilidade no processo de suporte técnico.
</p>

<p align=justify>
Entre suas principais funcionalidades, destacam-se: o cadastro de operadoras de serviços pelos servidores, a emissão de protocolos de envio, o envio automático de notificações por e-mail, consultas de andamento e histórico, além do acesso restrito à Gerência de TI, que pode consultar e alterar o status das transações.
</p>

---

### 1.2 Arquitetura Resumida

<p align=justify>
Para facilitar a leitura e entendimento, o sistema será apresentado por meio de um Diagrama de Classes, que apresenta uma representação visual das classes que compõem o sistema, bem como suas relações e interações entre si.
</p>

<img src="https://raw.githubusercontent.com/arsouza81/MIS_OS/refs/heads/main/images/Diagrama%20de%20classe.jpg" alt="Diagrama de Classe">


<p><i>Imagem 01: Diagrama de Classes do OS</i></p>

---

## 2. Identificação e Classificação de Bugs do Sistema

<p align=justify>A seguir apresentamos a lista dos Bugs encontrados e suas respectivas classificações, bem como os links das suas issues correspondentes.</p>

### Bug 1 – Logo Não Aparecendo
- **Descrição:** A logo do sistema não aparece em todas as páginas, some na página de Detalhes das Solicitações.
- **Resultado Esperado:** A logo do sistema deve aparecer em todas as páginas do sistema.
- **Classificação:** Lógica
- **Status:** Corrigido e testado.
- **Link da Issue:** <a href="https://github.com/arsouza81/MIS_OS/issues/1">https://github.com/arsouza81/MIS_OS/issues/1</a>

### Bug 2 – Link de sair com falha (logout)
- **Descrição:** O link de logout da GTI quebrava a página, impossibilitando o usuário de fazer qualquer ação.
- **Resultado Esperado:** O usuário deve ser direcionado para a página principal sem quebra de página.
- **Classificação:** Lógica
- **Status:** Corrigido e testado.
- **Link da Issue:** <a href="https://github.com/arsouza81/MIS_OS/issues/2">https://github.com/arsouza81/MIS_OS/issues/2</a>

### Bug 3 – Formulário da Ordem de Serviço com Problemas de Envio
- **Descrição:** O sistema bloqueia cadastro de informações em branco somente no backend e quebra a página.
- **Resultado Esperado:** O usuário deve receber mensagens de alerta sem quebra na página.
- **Classificação:** Lógica
- **Status:** Corrigido e testado.
- **Link da Issue:** <a href="https://github.com/arsouza81/MIS_OS/issues/3">https://github.com/arsouza81/MIS_OS/issues/3</a>

### Bug 4 – Feedback no envio
- **Descrição:** O usuário não recebia mensagem clara de confirmação ou erro após o envio de formulários.
- **Resultado Esperado:** O usuário deve receber feedbacks em cada ação no sistema.
- **Classificação:** Lógica
- **Status:** Corrigido e testado.
- **Link da Issue:** <a href="https://github.com/arsouza81/MIS_OS/issues/4">https://github.com/arsouza81/MIS_OS/issues/4</a>

### Bug 5 – Feedback de Falha
- **Descrição:** O usuário não recebe feedbacks ao inserir credenciais erradas no login.
- **Resultado Esperado:** Receber Feedback de sucesso.
- **Classificação:** Lógica
- **Status:** Corrigido e testado.
- **Link da Issue:** <a href="https://github.com/arsouza81/MIS_OS/issues/5">https://github.com/arsouza81/MIS_OS/issues/5</a>

---

## 3. Correções dos Bugs

<p align=justify>Para cada um dos Bugs listados no tópico anterior, foi atribuída uma <i>Issue</i> no repositório remoto do projeto, bem como uma descrição, labels que indicavam sua identificação, a prioridade da correção e o responsável por sua correção. Para cada correção de Bug, foi aberto um <i>Pull Request</i>; ou seja, cada bug foi tratado em uma branch separada da branch principal do sistema. Os links de commits e PRs das correções são listados abaixo para facilitar o acesso e visualização.</p>

<h3>Bug 1 – Logo Não Aparecendo</h3>
<ul>
  <li><b>Responsável pela correção:</b> Anderson Souza</li>
  <li><b>Prioridade de Correção:</b> Média</li>
  <li><b>Link:</b> <a href="https://github.com/arsouza81/MIS_OS/pull/6">https://github.com/arsouza81/MIS_OS/pull/6</a></li>
</ul>

<h3>Bug 2 – Link de sair com falha (logout)</h3>
<ul>
  <li><b>Responsável pela correção:</b> Diandre Pires</li>
  <li><b>Prioridade de Correção:</b> Alta</li>
  <li><b>Link:</b> <a href="https://github.com/arsouza81/MIS_OS/pull/8">https://github.com/arsouza81/MIS_OS/pull/8</a></li>
</ul>

<h3>Bug 3 – Formulário da Ordem de Serviço com Problemas de Envio</h3>
<ul>
  <li><b>Responsável pela correção:</b> Kássia Ramos</li>
  <li><b>Prioridade de Correção:</b> Alta</li>
  <li><b>Link:</b> <a href="https://github.com/arsouza81/MIS_OS/pull/7">https://github.com/arsouza81/MIS_OS/pull/7</a></li>
</ul>

<h3>Bug 4 – Feedback no envio</h3>
<ul>
  <li><b>Responsável pela correção:</b> Alicia Caldeira</li>
  <li><b>Prioridade de Correção:</b> Média</li>
  <li><b>Link:</b> <a href="https://github.com/arsouza81/MIS_OS/pull/10">https://github.com/arsouza81/MIS_OS/pull/10</a></li>
</ul>

<h3>Bug 5 – Feedback de Falha</h3>
<ul>
  <li><b>Responsável pela correção:</b> Rennan Alves</li>
  <li><b>Prioridade de Correção:</b> Média</li>
  <li><b>Link:</b> <a href="https://github.com/arsouza81/MIS_OS/pull/9">https://github.com/arsouza81/MIS_OS/pull/9</a></li>
</ul>


---

## 4. Testes de Correções

<p align=justify>Para cada correção feita e enviada para análise, foi realizada uma validação para comprovar a eficácia da solução, além de garantir que todo o sistema continuaria funcionando corretamente com as alterações aplicadas. Os testes unitários foram feitos através da plataforma <b>Cypress</b>, sendo um teste criado para cada correção.</p>

<h3>Teste Bug 1 – Logo Não Aparecendo</h3>
<ul>
  <li><b>Cenário:</b> Usuário (Gerente de TI) não consegue visualizar as imagens das logos do ICET e da UFAM na página de exibição da ordem de serviço.</li>
  <li><b>Resultado Esperado:</b> Logos da UFAM e do ICET exibidas corretamente.</li>
  <li><b>Responsável pelo teste:</b> Kássia Ramos</li>
  <li><b>Evidência:</b> Teste Cypress passou (vídeo disponível).</li>
  <li><b>Link da Evidência:</b> <a href="https://drive.google.com/file/d/1_vmYNB7Xv6CcCdaza6m2HIZji52bjmdh/view?usp=drive_link">teste-automatizado-bug1-logos-nao-aparecendo.mp4</a></li>
</ul>

<h3>Teste Bug 2 – Link de sair com falha (logout)</h3>
<ul>
  <li><b>Cenário:</b> Usuário loga, seleciona data e clica em "Sair".</li>
  <li><b>Resultado Esperado:</b> Redirecionamento correto para a página principal (index).</li>
  <li><b>Responsável pelo teste:</b> Kássia Ramos</li>
  <li><b>Evidência:</b> Teste Cypress passou (vídeo disponível).</li>
  <li><b>Link da Evidência:</b> <a href="https://drive.google.com/file/d/1RvFxhdDPcQ1p9kz7yFqupbFjf68Si2cM/view?usp=drive_link">teste-automatizado-bug2-logout.mp4</a></li>
</ul>

<h3>Teste Bug 3 – Formulário da Ordem de Serviço com Problemas de Envio</h3>
<ul>
  <li><b>Cenário:</b> Usuário tenta enviar formulário apenas com espaços em campos de texto.</li>
  <li><b>Resultado Esperado:</b> Alerta exibido, formulário não enviado.</li>
  <li><b>Responsável pelo teste:</b> Anderson Souza</li>
  <li><b>Evidência:</b> Teste Cypress passou (vídeo disponível).</li>
  <li><b>Link da Evidência:</b> <a href="https://drive.google.com/file/d/1uPFNDdvInCqNyYJA5oZIF7AZa1nvaeK5/view?usp=drive_link">teste-automatizado-bug3-formulario.mp4</a></li>
</ul>

<h3>Teste Bug 4 – Feedback no envio</h3>
<ul>
  <li><b>Cenário:</b> Usuário envia formulário válido.</li>
  <li><b>Resultado Esperado:</b> Mensagem de sucesso exibida.</li>
  <li><b>Responsável pelo teste:</b> Kássia Ramos</li>
  <li><b>Evidência:</b> Teste Cypress passou (vídeo disponível).</li>
  <li><b>Link da Evidência:</b> <a href="https://drive.google.com/file/d/1G1YFvbQQov0KcEZQz_Uiv1HNwifOg9oS/view?usp=drive_link">teste-automatizado-bug4-FeedbackEnvio.mp4</a></li>
</ul>

<h3>Teste Bug 5 – Feedback de Falha</h3>
<ul>
  <li><b>Cenário:</b> Inserir credenciais inválidas na página de Login do sistema.</li>
  <li><b>Resultado Esperado:</b> Um toast ou alerta de erro é mostrado ao usuário informando que as credenciais estão incorretas.</li>
  <li><b>Responsável pelo teste:</b> Kássia Ramos</li>
  <li><b>Evidência:</b> Teste Cypress passou (vídeo disponível).</li>
  <li><b>Link da Evidência:</b> <a href="https://drive.google.com/file/d/1qS2eg5EgXkqfo9UxI-0jiqKAphqzBbuv/view?usp=drive_link">teste-automatizado-bug5-FeedbackFalha.mp4</a></li>
</ul>


---

## 5. Conclusão

<p align=justify>
Os principais bugs do sistema estavam relacionados à <b>usabilidade</b> (feedback, validações e navegação). Todos foram corrigidos e testados, garantindo que:
</p>

- O sistema não quebre em cenários de uso incorreto.
- O usuário sempre receba feedback adequado.
- Fluxos principais como login, logout e envio de formulários funcionem corretamente.

<p align=justify>
Portanto, este relatório apresenta o fluxo completo da <b>Manutenção Corretiva</b> do Sistema Ordem de Serviço.
</p>
