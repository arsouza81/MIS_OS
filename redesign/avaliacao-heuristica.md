# Avaliação Heurística – Sistema Ordem de Serviços

## 1. Introdução
<p align=justify>Esta avaliação tem como objetivo identificar e corrigir problemas de usabilidade no <b>Sistema Ordem de Serviços</b> do Instituto de Ciências Exatas e Tecnologia (ICET/UFAM), aplicando de forma sistemática as <b>10 Heurísticas de Usabilidade de Jakob Nielsen</b> como base de avaliação e redesign.</p>

<p align=justify>O foco deste trabalho é <b>melhorar a experiência do usuário</b> e <b>modernizar a interface</b> com base em evidências observáveis e documentadas, demonstrando que cada mudança aplicada resulta em uma <b>usabilidade mais eficiente, intuitiva e consistente</b>.</p>

<p align=justify>A análise foi conduzida sobre os perfis de <b>Servidor</b> e <b>Gerência</b>, resultando em <b>issues</b> específicas — uma para cada heurística — contendo o problema identificado, o objetivo da correção, as evidências visuais (antes e depois das telas), o impacto esperado e a prioridade de implementação.</p>

---

## 2. Estrutura do Documento
Cada seção a seguir corresponde a uma **issue vinculada a uma heurística de Nielsen**.  
Cada *issue* apresenta:

- **Descrição:** problema identificado e contexto da falha de usabilidade;  
- **Objetivo:** meta do redesign e resultado esperado;  
- **Classificação:** heurística aplicada e tipo de ação (Redesign, Ajuste Visual, Melhoria de Navegação etc.);  
- **Evidências:** comparativos visuais (*antes e depois* das telas);  
- **Impacto Esperado:** benefícios diretos à usabilidade e à experiência do usuário;  
- **Prioridade:** grau de importância da correção (Alta, Média ou Baixa).

---

## 2. Avaliação Heurística

A avaliação foi conduzida navegando pelas principais funcionalidades do sistema, analisando interface, fluxo de uso, comunicação visual e feedback ao usuário.  
Os problemas encontrados foram classificados conforme as dez heurísticas de Nielsen:


### 2.1 Ponto de Partida: Problemas Críticos Identificados

As primeiras heurísticas observadas com maior impacto negativo no sistema foram:

- Heurística: Design Estético e Minimalista;
- Heurística: Ajudar os usuários a Reconhecer, Diagnosticar e Recuperar-se de Erros;

Esses dois pontos foram **priorizados inicialmente**, pois impactavam diretamente a clareza, a navegabilidade e a confiança no sistema. Isso significa que o processo de Redesign se iniciou por eles, descritos com mais detalhes a seguir.

### Heurística: Design Estético e Minimalista
A interface apresentava excesso de elementos desalinhados, com falta de uma hierarquia visual e contraste entre seções. Isso resultava em uma interface pesada visualmente, dificultando a identificação do que é importante em cada tela. Os problemas identificados são listados a seguir: 

- Excesso de elementos pouco organizados.
- Paleta de cores incoerente e pouco harmonizada.
- Espaçamentos, alinhamentos e hierarquias visuais inconsistentes.
- A experiência visual não apoiava a compreensão do conteúdo.

---

### Heurística: Ajudar os Usuários a Reconhecer, Diagnosticar e Recuperar-se de Erros
Mensagens de erro eram pouco explicativas ou inexistentes, deixando o usuário sem saber o que ocorreu e como prosseguir. Isso poderia gerar ao usuário frustração, incerteza e repetição de tentativas incorretas. Os problemas identificados são listados a seguir: 

- Erros não eram comunicados claramente.
- Mensagens pouco explicativas ou inexistentes.
- Usuário ficava sem saber o que ocorreu e como resolver.
- Frustração e tentativa repetitiva de ações incorretas.

---

### Heurística: Visibilidade do Status do Sistema
O sistema não comunica claramente quando uma ação está sendo processada, como no envio ou atualização de uma solicitação. Isso poderia gerar incerteza, levando o usuário a clicar repetidas vezes ou acreditar que a operação falhou, quando na verdade ainda está em andamento. Os problemas identificados são listados a seguir: 

- O sistema não exibe feedback imediato ao realizar ações (ex.: salvar, enviar, atualizar).
- Usuário não sabe se a operação está carregando, concluída ou falhou.
- Ausência de indicadores de progresso ou confirmação visual.
- Gera cliques repetidos e sensação de travamento ou incerteza.

---

### Heurística: Correspondência entre o Sistema e o Mundo Real
Elementos da interface apresentam termos técnicos ou pouco familiares ao usuário comum.  Além disso, diversas ações são exibidas apenas em texto, sem apoio visual como ícones, metáforas ou hierarquias, dificultando interpretação rápida. Os problemas identificados são listados a seguir: 

- Termos utilizados no sistema nem sempre correspondem à linguagem do usuário.
- Ações importantes são representadas apenas por texto, sem apoio de ícones/metáforas visuais.
- Falta de elementos familiares que facilitem interpretação rápida.
- Usuários perdem tempo identificando funções ou reconhecendo ações.

---

### Heurística: Controle e Liberdade do Usuário
Alguns fluxos não permitem reversão de ações ou revisão antes da confirmação, especialmente no envio de solicitações. Isto aumenta o risco de erro e a necessidade de retrabalho manual. Os problemas identificados são listados a seguir: 

- Algumas ações não possuem botão de desfazer ou retorno claro.
- Falta de confirmação antes de ações irreversíveis.
- Usuário pode realizar operações por engano e não conseguir voltar ao estado anterior.
- Fluxos ficam rígidos e pouco flexíveis.

---

### Heurística: Consistência e Padrões
A nomenclatura, cores e formatação dos status variam entre telas e perfis.  
Essa inconsistência dificulta a identificação do andamento da solicitação e obriga o usuário a reaprender interpretações dependendo do contexto exibido. Os problemas identificados são listados a seguir:

- Estilos de botões variam entre telas.
- Nomes de status ou ações não seguem padrão único.
- Cores diferentes representam funções semelhantes e vice-versa.
- Exige reaprendizado constante e aumenta confusão cognitiva.

---

### Heurística: Prevenção de Erros
Botões e ações não possuem mecanismos eficientes de bloqueio contra envios duplicados ou cliques repetidos. Isso pode gerar múltiplos registros acidentais e confusão nos fluxos internos do sistema. Os problemas identificados são listados a seguir:

- Botões podem ser clicados múltiplas vezes gerando duplicidade.
- Falta de bloqueio ou alerta em ações que podem gerar inconsistências.
- Campos não possuem validações preventivas adequadas.
- Usuário só percebe o erro depois que já aconteceu.

---

### Heurística: Reconhecimento em vez de Memorização
Algumas informações importantes não são exibidas no momento em que o usuário precisa delas, fazendo com que o usuário tenha que lembrar dados visualizados anteriormente em outras telas.  Isso aumentava a carga cognitiva e dificultava a tomada de decisão. Os problemas identificados são listados a seguir:

- Informações importantes ficam escondidas ou em telas separadas.
- Usuário precisa lembrar dados antes de concluir uma tarefa.
- Falta de dicas visuais, ícones e rótulos claros.
- Aumenta o esforço mental e tempo para completar ações.

---

### Heurística: Flexibilidade e Eficiência de Uso
Muitas ações do sistema exigem passos desnecessários ou repetitivos, especialmente para usuários experientes.  A interação poderia ser simplificada com atalhos, menus mais diretos e reorganização de telas. Os problemas identificados são listados a seguir:

- Fluxos simples exigem muitos cliques ou etapas desnecessárias.
- Usuários frequentes não têm atalhos para agilizar tarefas repetitivas.
- Componentes como menus e formulários não estão otimizados para velocidade.
- Tornam o trabalho lento e menos eficiente.

---

### Heurística: Ajuda e Documentação
Não há instruções integradas ao sistema sobre fluxo de uso, nem orientações contextuais para auxiliar o usuário na execução correta das tarefas. Isso torna o aprendizado mais demorado e dependente de suporte externo. Os problemas  identificados são listados a seguir:

- Sistema não oferece orientações de uso no próprio ambiente.
- Não há explicações contextuais ou tutoriais embutidos.
- Usuário depende de suporte externo ou tentativa e erro.
- Dificulta aprendizado inicial e autonomia.

---

## 3. Redesign Orientado pelas Heurísticas

Nesta seção, serão documentadas as melhorias implementadas, organizadas da seguinte forma para cada heurística aplicada:

- Problema identificado
- Impacto na usabilidade
- Prioridade
- Proposta de melhoria
- Evidências de antes e depois (prints, comparações, fluxos)

---
### 3.1 Issue – Design Estético e Minimalista

**Problema identificado**  
A interface apresentava excesso de elementos alinhados de forma pouco organizada, cores pouco harmonizadas, falta de hierarquia visual, botões com baixo destaque e espaçamentos inconsistentes. Isso deixava a interface visualmente carregada e dificultava a navegação.

**Impacto na usabilidade**  
- Dificulta a leitura e identificação rápida de informações.
- Aumenta a carga cognitiva na execução de tarefas.
- Cria sensação de desorganização e sistema antiquado.
- Pode gerar insegurança no uso por parte de usuários novos.

**Prioridade:** Alta

**Proposta de melhoria**  
- Aplicação de uma nova paleta de cores mais harmônica e consistente.
- Inclusão de bordas arredondadas e sombras leves para suavizar elementos.
- Reorganização dos componentes em **cards** e estruturas mais equilibradas.
- Criação de espaçamentos e hierarquia visual para conduzir a leitura.
- Animações leves para melhorar fluidez na interação.

**Evidências (antes x depois)**

#### Tela 1 — Enviar Nova Ordem de Serviço
**Antes:**  
![Image](https://github.com/user-attachments/assets/1d97963c-d282-4d41-87ce-493149c32f08)

**Depois:**  
![Image](https://github.com/user-attachments/assets/c91d724d-158c-450d-bf07-77942a8c94d1)

---

#### Tela 2 — Consultar Solicitação
**Antes:**  
![Image](https://github.com/user-attachments/assets/21d25500-400c-4d33-bcab-be070b3b9f25)

**Depois:**  
![Image](https://github.com/user-attachments/assets/6a83edb9-dc35-41c0-9b2b-9bba83533eb1)

Visualização após inserir protocolo:  
![Image](https://github.com/user-attachments/assets/63c539b3-2675-4d2a-995c-5e18ee34018b)

---

#### Tela 3 — Acesso Restrito
**Antes:**  
![Image](https://github.com/user-attachments/assets/aa0a6a15-8cf8-4f47-ab21-0258b3270e71)

**Depois:**  
![Image](https://github.com/user-attachments/assets/d0b507ce-199c-402d-aaa9-264daa2c3378)

---

#### Tela 4 — Solicitações Registradas
**Antes:**  
![Image](https://github.com/user-attachments/assets/0ebd6ad0-ee16-4b94-a5b8-d71fb056175a)

**Depois:**  
![Image](https://github.com/user-attachments/assets/070f4178-31b4-44ee-b74f-ca011461f60e)

---

#### Tela 5 — Solicitações Registradas (Listagem)
**Antes:**  
![Image](https://github.com/user-attachments/assets/21097bdd-1de1-40b5-891e-68c8d34132da)

**Depois:**  
![Image](https://github.com/user-attachments/assets/13a470be-b46f-4423-80f5-aed6394fd0bd)

Para verificar as informações com mais detalhes, acesse: [Issue-Redesign- Design Estético e Minimalista](https://github.com/arsouza81/MIS_OS/issues/47)

---

### 3.2 Issue – Ajudar Usuários a Reconhecer, Diagnosticar e Corrigir Erros

**Problema identificado**  
Ao buscar um protocolo inexistente, o sistema não apresentava mensagem de retorno ao usuário. Isso fazia com que a ação parecesse não ter sido executada, deixando o usuário sem clareza sobre o que aconteceu e como prosseguir.

**Impacto na usabilidade**  
- Gera incerteza e frustração ao usuário.
- Aumenta tentativas repetidas sem sucesso.
- Dificulta a compreensão da causa do erro.
- Prejudica a confiança no sistema e no processo de interação.

**Prioridade:** Alta

**Proposta de melhoria**  
Implementação de mensagens informativas e visíveis quando o protocolo pesquisado não for encontrado.  
A mensagem deve:
- Ser clara e objetiva;
- Estar localizada em área imediatamente perceptível;
- Utilizar cor de destaque para garantir visibilidade.

**Evidências (antes x depois)**

| Antes                                                                 | Depois                                                                 |
|----------------------------------------------------------------------|------------------------------------------------------------------------|
| Nenhuma mensagem era apresentada, o usuário não recebia retorno.     | Uma mensagem clara é exibida indicando que o protocolo não foi encontrado. |

**Antes:**  
![Busca sem retorno](https://github.com/user-attachments/assets/ca81465d-964b-47b5-a325-f9eeb5e76454)

**Depois:**  
![Mensagem informativa](https://github.com/user-attachments/assets/f3789fdd-5aff-42ae-80a0-e84b046028a4)

Para verificar as informações com mais detalhes, acesse: [Issue-Redesign-  Ajudar os Usuários a Reconhecer, Diagnosticar e Recuperar-se de Erros](https://github.com/arsouza81/MIS_OS/issues/48)

---

### 3.3 Issue – Visibilidade do Status do Sistema

**Problema Identificado**  
Durante a análise heurística, identificou-se que o sistema **não apresentava feedback visual imediato** ao usuário durante o envio da **Ordem de Serviço**.  
Após clicar em **“Enviar”**, não havia nenhum indicativo de que o sistema estava processando a solicitação, o que levava o usuário a **clicar repetidamente** no botão e gerar **múltiplos envios acidentais**.  
Essa ausência de retorno visual causava incerteza e comprometia a percepção de confiabilidade da aplicação.

---

**Impacto na Usabilidade**  
- Gerava dúvidas sobre o andamento do envio;  
- Induzia o usuário a repetir a ação por falta de retorno;  
- Comprometia a percepção de estabilidade e eficiência do sistema.  

**Prioridade:** Alta  
A presença de feedback imediato é fundamental para orientar o usuário e prevenir ações redundantes durante o processamento.

---

**Proposta de Melhoria**  
Foi aplicada a heurística de **Visibilidade do Status do Sistema** ao implementar um **indicador visual (“Enviando...”)** no botão principal do formulário.  
Agora, ao enviar uma solicitação, o botão muda de estado para indicar que o sistema está processando a operação, permanecendo **desabilitado até a conclusão do envio**.  
Ao final, o sistema retorna o botão ao estado original e exibe uma **mensagem de sucesso**, mantendo o usuário sempre informado sobre o progresso da ação.  

Essa abordagem reduz a incerteza e melhora significativamente a **percepção de resposta e controle** do sistema.

---

**Evidências (Antes x Depois)**  

#### 🟥 Antes – Sem feedback visual durante o envio  
O botão permanecia ativo e inalterado após o clique em “Enviar”, sem qualquer indicação de processamento.  
Isso levava o usuário a clicar várias vezes, ocasionando múltiplos envios e gerando insegurança quanto ao funcionamento do sistema.

---

#### 🟩 Depois – Feedback visual com indicador “Enviando...”  
Durante o envio da solicitação, o sistema agora exibe o texto **“Enviando...”** dentro do botão principal, acompanhado do **bloqueio temporário** da ação.  
Essa solução mantém o usuário informado e evita cliques repetidos durante o processamento.

<p align="center">
  <img src="https://github.com/user-attachments/assets/b676a586-6254-4e42-821a-c9197481c62a" alt="Indicador visual de envio" width="700"/>
</p>

Assim que o envio é concluído, o botão retorna ao seu estado normal e o usuário recebe uma mensagem de confirmação de sucesso.

---

**Links Úteis**  
Para verificar os detalhes da implementação e commits relacionados, acesse: <a href="https://github.com/arsouza81/MIS_OS/issues/40">Issue – Redesign: Visibilidade do Status do Sistema #40</a>.

---

### 3.4 Issue – Correspondência entre o Sistema e o Mundo Real

**Problema Identificado**  
A interface utilizava apenas textos para representar ações, sem o apoio de metáforas visuais. Isso exigia que o usuário lesse e interpretasse continuamente os elementos da tela, tornando a navegação mais lenta e menos intuitiva, especialmente para novos usuários.

**Impacto na Usabilidade**  
- Aumentava o esforço cognitivo para localizar ações.
- Reduzia a fluidez e naturalidade da navegação.
- Dificultava o reconhecimento imediato de funcionalidades comuns.

**Prioridade:** Média  
Melhora significativamente a compreensão e reduz carga cognitiva.

**Proposta de Melhoria**  
Foram adicionados ícones representativos nas principais ações do sistema, seguindo metáforas visuais amplamente reconhecidas, tais como:
- Lupa → Buscar solicitação
- Seta/porta → Login e Logout
- Sinal de “+” → Criar nova solicitação
- Aviação/papel → Enviar formulário

Essa mudança aproxima a interface da linguagem visual do mundo real, tornando a identificação de ações mais imediata.

**Evidências (Antes x Depois)**

| Antes (Sem Ícones) | Depois (Com Ícones Representativos) |
|--------------------|--------------------------------------|
| Ações apresentadas apenas como texto. | Ações acompanhadas de ícones familiares. |
| Usuário precisava interpretar o significado de cada botão. | Funções reconhecidas visualmente de forma imediata. |
| Maior esforço cognitivo e navegação menos fluida. | Interface mais clara, amigável e autoexplicativa. |

**Antes**

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/39aa61b5-2214-44a1-8530-236e3269787d" width="400px" />
      <br>
      <sub>Cadastro de Nova Solicitação</sub>
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/b0b7fff5-b141-401e-9ca8-df200d34f9dc" width="400px" />
      <br>
      <sub>Consultar Solicitação</sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/9d532856-13a4-4cc8-8915-1230eed95b30" width="400px" />
      <br>
      <sub>Login da Gerência</sub>
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/88860b37-34e3-41dd-be77-428ce51603ef" width="400px" />
      <br>
      <sub>Detalhes da Solicitação</sub>
    </td>
  </tr>
</table>

**Depois**

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/45952f05-4ea8-48d5-b60a-746f92900269" width="400px" />
      <br>
      <sub>Cadastro de Nova Solicitação</sub>
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/612d5ca2-49dc-41c5-8ec2-5e7ce1053c1a" width="400px" />
      <br>
      <sub>Consultar Solicitação</sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/78a92b49-11d9-41aa-b2a9-a08a6f5a95f7" width="400px" />
      <br>
      <sub>Login da Gerência</sub>
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/7c7a43c6-db4a-40be-ae44-b17499839403" width="400px" />
      <br>
      <sub>Detalhes da Solicitação</sub>
    </td>
  </tr>
</table>


**Links úteis**

Para verificar as informações com mais detalhes, acesse: [Issue-Redesign-Correspondência entre o Sistema e o Mundo Real](https://github.com/arsouza81/MIS_OS/issues/41)

---

### 3.5 Issue – Controle e Liberdade do Usuário

**Problema Identificado**  
Durante a análise heurística, observou-se que o sistema não oferecia uma etapa de **confirmação antes do envio** das Ordens de Serviço.  
O formulário era enviado imediatamente após o clique em “Enviar Solicitação”, **sem que o usuário pudesse revisar ou cancelar a ação**.  
Essa limitação reduzia o controle do usuário sobre o processo e aumentava o risco de **envio de informações incorretas ou incompletas**.

---

**Impacto na Usabilidade**  
- Reduzia a sensação de controle e segurança durante o envio;  
- Aumentava a probabilidade de erros por falta de revisão;  
- Impedia o cancelamento de ações não intencionais.  

**Prioridade:** Alta  
A melhoria é fundamental para assegurar que o usuário tenha liberdade e controle total sobre suas ações antes da confirmação final.

---

**Proposta de Melhoria**  
Foi aplicada a heurística de **Controle e Liberdade do Usuário** por meio da implementação de uma **pré-visualização do formulário de Ordem de Serviço** antes do envio.  
Agora, ao clicar em **“Enviar Solicitação”**, o sistema exibe um **modal de confirmação** apresentando todos os dados preenchidos pelo usuário.  
Nesse modal, o usuário pode:  
- **Revisar** as informações antes do envio;  
- **Cancelar** o envio e retornar à edição do formulário;  
- **Confirmar** o envio apenas após verificar que os dados estão corretos.  

Essa solução garante **maior controle, previsibilidade e segurança** no processo, além de reduzir erros de preenchimento e retrabalho.

---

**Evidências (Antes x Depois)**  

#### 🟥 Antes – Envio direto sem revisão  
O formulário era enviado imediatamente após o clique em “Enviar Solicitação”, sem exibir uma etapa intermediária de confirmação.  
Isso aumentava a ocorrência de erros e dificultava a correção de informações incorretas.

---

#### 🟩 Depois – Modal de pré-visualização com confirmação  
Com a nova funcionalidade, ao clicar em “Enviar Solicitação”, o usuário visualiza um **modal de pré-visualização** contendo todos os dados preenchidos.  
A partir dele, é possível **confirmar** ou **cancelar** o envio, garantindo maior controle sobre a ação e prevenindo erros.

<p align="center">
  <img src="https://github.com/user-attachments/assets/4b22237d-1b89-4082-9c6d-6f59de7f4196" alt="Modal de pré-visualização - parte 1" width="700"/>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/48de47ad-5534-42f6-8901-9d85be450721" alt="Modal de pré-visualização - parte 2" width="700"/>
</p>

---

**Links Úteis**  
Para verificar os detalhes da implementação e commits relacionados, acesse: <a href="https://github.com/arsouza81/MIS_OS/issues/42">Issue – Redesign: Controle e Liberdade do Usuário #42</a>.

---

### 3.6 Issue – Consistência e Padrões 

**Problema Identificado**  
<p align=justify>Foram observadas inconsistências na exibição dos <b>status das Ordens de Serviço</b> entre os perfis de <b>Servidor</b> e <b>Gerência</b>.</p>
<p align=justify>As variações incluíam diferenças de nomenclatura (ex.: “em_andamento” vs. “Em Andamento”), capitalização, ordem de exibição e cores utilizadas para representar o progresso das solicitações.</p>
<p align=justify>Essas divergências comprometiam a coerência visual do sistema, dificultando a leitura e o reconhecimento imediato dos estados das solicitações.</p>

**Impacto na Usabilidade**  
- Reduzia a previsibilidade e coerência da interface.
- Aumentava o esforço cognitivo do usuário para interpretar os status.
- Dificultava a comunicação visual entre diferentes perfis de acesso.

**Prioridade:** Média  
A correção aumenta a clareza e padroniza a percepção visual entre os perfis do sistema.

**Proposta de Melhoria**  
<p align=justify>Foi realizada a <b>padronização integral dos status das Ordens de Serviço</b>, unificando nomenclatura, capitalização, cores e sequência de exibição, assegurando uma aparência uniforme em todas as telas e perfis.</p>
O novo padrão adota a seguinte sequência e codificação de cores:

| Status           | Cor Representativa |
| ---------------- | ------------------ |
| **Pendente**     | Azul               |
| **Em Andamento** | Amarelo            |
| **Concluída**    | Verde              |
| **Descartada**   | Cinza              |


<p align=justify>Essa padronização garante consistência e previsibilidade na interface, reduzindo ambiguidades e melhorando a comunicação visual entre os usuários do sistema.</p>


**Evidências (Antes x Depois)**

| Antes (Sem Padrão)                                          | Depois (Padronização Aplicada)                              |
| ----------------------------------------------------------- | ----------------------------------------------------------- |
| Status exibidos com variação de nomes e cores entre perfis. | Status padronizados em nomenclatura, capitalização e cores. |
| Dificuldade de reconhecimento e interpretação visual.       | Reconhecimento imediato e comunicação uniforme.             |
| Interface com aparência inconsistente e pouco intuitiva.    | Interface coerente, previsível e visualmente harmônica.     |


**Antes de aplicar a heurística de Consistência e Padrões**

Perfil Servidor (Nível de acesso para usuário comum)
<img width="1271" height="548" alt="Image" src="https://github.com/user-attachments/assets/914dcdf3-ddfa-425c-bf90-a96b9a7d2fa1" />

Perfil Gerente de TI (Nível de acesso para administrador)
<img width="1271" height="548" alt="Image" src="https://github.com/user-attachments/assets/3940d0f5-7e6d-4671-94ee-be45fdf81e1e" />

**Depois de aplicar a heurística de Consistência e Padrões**

Perfil Servidor (Nível de acesso para usuário comum)
<img width="1271" height="548" alt="Image" src="https://github.com/user-attachments/assets/f517df9a-84cf-404e-a62b-8854927e736b" />

Perfil Gerente de TI (Nível de acesso para administrador)
<img width="1271" height="548" alt="Image" src="https://github.com/user-attachments/assets/5a7661a9-3df1-4ba5-ae05-0daf45947890" /> 

**Links Úteis**
Para verificar os detalhes da implementação e commits relacionados, acesse: <a href="https://github.com/arsouza81/MIS_OS/issues/43">Issue – Redesign: Consistência e Padrões #43</a>.

---

### 3.7 Issue – Prevenção de Erros

**Problema Identificado**  
Durante a análise heurística, observou-se que o **botão de envio** do formulário de Ordem de Serviço permanecia **ativo enquanto a solicitação estava sendo processada**, permitindo que o usuário clicasse várias vezes e enviasse múltiplos pedidos simultaneamente.  
Essa falha resultava em **duplicidade de registros**, **sobrecarga no backend** e confusão por parte do usuário, que não recebia um feedback visual claro sobre o andamento do envio.

---

**Impacto na Usabilidade**  
- Possibilitava múltiplos envios acidentais da mesma solicitação;  
- Comprometia a confiabilidade do sistema e a clareza das ações;  
- Aumentava a carga de trabalho do servidor e a ocorrência de erros operacionais.  

**Prioridade:** Alta  
A correção é fundamental para evitar falhas funcionais e aumentar a segurança e estabilidade do sistema.

---

**Proposta de Melhoria**  
Foi aplicada a heurística de **Prevenção de Erros** ao implementar o **bloqueio temporário do botão de envio** enquanto o sistema processa a solicitação.  
Essa ação impede que o usuário execute cliques repetidos durante o carregamento, garantindo o envio único da Ordem de Serviço.  
Com essa melhoria, o sistema fornece um **feedback visual claro** e evita a criação de registros duplicados ou inconsistentes.

---

**Evidências (Antes x Depois)**  

#### 🟥 Antes – Botão ativo durante o envio  
Antes da refatoração, o botão de envio permanecia habilitado enquanto o sistema processava a solicitação, permitindo que o usuário clicasse várias vezes e gerasse múltiplos envios simultâneos.  

<p align="center">
  <img src="https://github.com/user-attachments/assets/ef9674f5-70b4-4d70-a2d2-3f19f1b27d8c" alt="Antes" width="700"/>
</p>

---

#### 🟩 Depois – Botão desabilitado durante o envio  
Após a implementação da heurística, o botão passa a ser temporariamente desativado enquanto o envio é processado. Essa melhoria **impede duplicações**, **reforça a clareza das ações** e **indica visualmente o progresso da operação**.  

<p align="center">
  <img src="https://github.com/user-attachments/assets/e19be166-47fe-449a-b196-757560593f90" alt="Depois" width="700"/>
</p>

---

**Links Úteis**  
Para verificar os detalhes da implementação e commits relacionados, acesse: <a href="https://github.com/arsouza81/MIS_OS/issues/44">Issue – Redesign: Prevenção de Erros #44</a>. 

---

### 3.8 Issue – Reconhecimento em vez de Memorização 

**Problema Identificado**  
<p align=justify>Durante a avaliação heurística do Sistema Ordem de Serviços, foi observada uma limitação que obriga o usuário a <b>memorizar informações essenciais</b> ao navegar entre as telas.</p>
<p align=justify>Atualmente, quando o <b>Gerente de TI</b> seleciona uma data para visualizar as ordens de serviço, o sistema exibe corretamente a <b>data e o horário</b> de criação de cada solicitação. No entanto, ao acessar a <b>página de detalhes</b> de uma ordem específica, essas informações <b>não são apresentadas</b>, exigindo que o usuário <b>retorne à tela anterior</b> para consultá-las novamente.</p>
<p align=justify>Essa falta de continuidade informacional aumenta a <b>carga cognitiva</b>, reduz a fluidez da navegação e prejudica a compreensão do contexto de cada solicitação.</p>

**Impacto na Usabilidade**  
- Obriga o usuário a lembrar dados exibidos em outras telas.
- Dificulta a análise contextual das solicitações.
- Aumenta o esforço cognitivo e reduz a eficiência da navegação.

**Prioridade:** Média  
<p align=justify>A melhoria reduz a sobrecarga mental e torna o acesso às informações mais direto e transparente.</p>

**Proposta de Melhoria**  
<p align=justify>Foi implementada uma <b>seção informativa consolidada</b> na página de detalhes da Ordem de Serviço, apresentando todos os dados relevantes ao contexto da solicitação, incluindo:</p>

- Dados do solicitante
- Localização do problema
- Descrição do problema
- Status atual da solicitação
- Data e hora de registro

<p align=justify>Essa solução permite que a gerência <b>reconheça imediatamente o contexto completo da solicitação</b>, sem depender da memória ou de retornos a telas anteriores.</p>
<p align=justify>Com essa mudança, o sistema passa a atender plenamente à heurística Reconhecimento em vez de Memorização, promovendo uma experiência mais fluida e intuitiva.</p>


**Evidências (Antes x Depois)**

| Antes (Sem Informações de Contexto)                                      | Depois (Com Seção Informativa Consolidada)                          |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| A página de detalhes não exibia data nem hora da solicitação.            | A tela exibe data, hora, status e dados do solicitante.             |
| O usuário precisava retornar à tela anterior para verificar informações. | Todas as informações essenciais estão acessíveis em um único local. |
| Maior esforço de memorização e navegação interrompida.                   | Navegação fluida, clara e com reconhecimento imediato do contexto.  |

**Antes de aplicar a heurística de Reconhecimento em vez de Memorização** 
<img width="1271" height="548" alt="Image" src="https://github.com/user-attachments/assets/58e235c3-c479-4c51-a9f8-75cae90e5c2b" />

**Depois de aplicar a heurística de Reconhecimento em vez de Memorização**
<img width="1278" height="545" alt="Image" src="https://github.com/user-attachments/assets/76b8f30d-c18f-4bc9-b5f5-661dc698864c" />

**Links Úteis**
Para verificar os detalhes da implementação e commits relacionados, acesse: <a href="https://github.com/arsouza81/MIS_OS/issues/45">Issue – Redesign: Reconhecimento em vez de Memorização #45</a>.

---

### 3.9 Issue – Flexibilidade e Eficiência de Uso

**Problema Identificado**  
Para alterar o status de uma solicitação, o usuário precisava abrir a tela de detalhes, localizar a opção e confirmar. Esse fluxo exigia múltiplos cliques e tornava o processo lento, especialmente para usuários que executam essa ação repetidamente (como gerentes e supervisores).

**Impacto na Usabilidade**
- Aumentava o tempo de execução de tarefas rotineiras.
- Dificultava a navegação e gestão simultânea de solicitações.
- Prejudicava a eficiência de usuários experientes.

**Prioridade:** Média  
Ação realizada com alta frequência; afeta produtividade diretamente.

**Proposta de Melhoria**  
- Implementação de um **menu de ações direto na tabela**, permitindo alterar status sem abrir outra página.
- Inclusão de ícones visuais para reforçar ações (visualizar, modificar).
- Padronização visual dos status por **cores significativas** (ex.: verde = concluído, amarelo = em andamento).
- Exibição mais clara de informações importantes: data, protocolo, nome e e-mail.

**Evidências (Antes x Depois)**

| Antes (Fluxo Antigo) | Depois (Fluxo Atual) |
|----------------------|----------------------|
| Alterar status obrigava acessar página de detalhes. | Status pode ser alterado diretamente na lista. |
| A ação não era evidente (dependia de descobrir onde clicar). | Ação explícita por meio de menu visível e intuitivo. |
| Status sem padronização visual clara. | Status padronizados com cores consistentes e significativas. |
| Fluxo lento e repetitivo. | Execução rápida e eficiente com menos cliques. |

**Antes**

![Antes do redesign](https://github.com/user-attachments/assets/b3f4a7b6-cc13-4bbd-8e99-f0c25b8eee06)

**Depois**

![Apos redesign](https://github.com/user-attachments/assets/31c192ed-390a-41aa-a750-d351a05dfbf0)

**Links úteis**

Para verificar as informações com mais detalhes, acesse: [Issue- Redesign-Flexibilidade e Eficiência de Uso](https://github.com/arsouza81/MIS_OS/issues/46)

---


### 3.10 Issue – Ajuda e Documentação 

**Problema Identificado**  
O sistema **não possuía um ponto de acesso direto à documentação ou guia de uso**, o que dificultava a consulta rápida e independente por parte dos usuários.  
A ausência dessa funcionalidade impactava diretamente a heurística de **Ajuda e Documentação**, reduzindo a autonomia, a clareza e a eficiência na utilização do sistema.

**Impacto na Usabilidade**
- Aumentava a dependência do suporte técnico para dúvidas simples.  
- Dificultava o aprendizado de novos usuários.  
- Tornava o uso do sistema menos intuitivo, exigindo memorização de processos.  
- Prejudicava a experiência de uso por falta de instruções visíveis.  

**Prioridade:** Média  
A ausência de documentação afeta diretamente a experiência de usuários novos e recorrentes, comprometendo a eficiência e a confiança na navegação.

**Proposta de Melhoria**  
- Inclusão de um **link visível no menu principal** do sistema, direcionando o usuário para uma **página de documentação e suporte**.  
- Criação de uma **página de ajuda estruturada**, contendo:  
  - Instruções sobre como **criar, buscar e gerenciar Ordens de Serviço**;  
  - Explicações sobre o **significado dos status** e das funções disponíveis para cada perfil (Servidor e Gerência);  
  - Seção de **Boas Práticas** e **contatos de suporte técnico**;  
  - Layout organizado por seções e títulos descritivos, garantindo leitura fluida e fácil localização de informações.  

**Evidências (Antes x Depois)**  

| Antes (Sem Guia de Uso) | Depois (Com Guia de Uso) |
|--------------------------|--------------------------|
| O sistema não possuía documentação acessível. | Adicionado um link de acesso direto para a página de ajuda e suporte. |
| Usuários precisavam solicitar auxílio técnico para entender funcionalidades. | Usuários podem consultar instruções e explicações de forma autônoma. |
| Ausência de explicações sobre status e papéis. | Página detalha status, fluxos e permissões de cada perfil. |
| Falta de centralização das informações de contato. | Seção “Suporte Técnico” reúne contatos e horários de atendimento. |

**Antes de aplicar a heurística de Ajuda e Documentação**

O sistema não apresentava um ponto de acesso à documentação ou tutoriais, exigindo que o usuário buscasse ajuda externa.

**Depois de aplicar a heurística de Ajuda e Documentação**

<p align="center">
<img width="1810" height="1018" alt="Redesign - Ajuda e Documentação" src="https://github.com/user-attachments/assets/0b3bdfd2-1663-41b2-b1c0-0d18de61c70d" />
</p>

**Links úteis**  

Para verificar as informações com mais detalhes, acesse: [Issue – Redesign: Ajuda e Documentação #49](https://github.com/arsouza81/MIS_OS/issues/49)

---

## 4. Conclusão

<p align=justify>A aplicação das heurísticas de Nielsen possibilitou identificar <i>pontos críticos de inconsistência, memória e clareza</i> na interface do Sistema Ordem de Serviços.</p>

<p align=justify>As melhorias implementadas resultam em <i>maior previsibilidade, menor carga cognitiva e maior eficiência</i> no uso do sistema pelos diferentes perfis de usuários.</p>

<p align=justify>As evidências apresentadas - compostas pelos <i>prints</i> de <i>antes e depois</i> - e os registros de <i>commits</i> associados a cada <i>issue</i> garantem <i>rastreabilidade completa</i> do processo de redesign, reforçando a aplicação prática e documentada dos princípios de usabilidade.</p>

---
