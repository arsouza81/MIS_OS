# Plano de Estratégia de Manutenção Adaptativa

Este documento detalha o Plano de Ação da equipe para a realização da **Manutenção Adaptativa** no sistema **Ordem de Serviço**.  
A manutenção Adaptativa foi executada por meios de estratégias de classificação em três categorias, com base na necessidade de adaptar o sistema a mudanças de ambiente, o que garante a sua **sustentabilidade, segurança e relevância a longo prazo**.  

A seguir estão descritas por categorias as estratégias aplicadas para que o sistema Ordem de Serviço passasse de forma eficiente pela Manutenção Adaptativa.

---

## Estratégia para Mudança de Dependência

### Visão de Longo Prazo
Para o cenário de **Mudança de Dependência**, o objetivo a longo prazo não é apenas a atualização de uma biblioteca, mas o estabelecimento de um processo de monitoramento e a gestão das dependências.  
No sistema Ordem de Serviço, a dependência escolhida foi o fato de o sistema ser **completamente monolítico**, com alto nível de acoplamento.  
A decisão de **desacoplar o sistema** e migrar o front-end para **React** não é apenas uma atualização de dependência, mas uma **evolução arquitetural**. Essa modularização aumenta a **manutenibilidade, performance e escalabilidade**, facilitando futuras funcionalidades, correções de bugs e colaboração em equipe.

### Descrição do Problema
A versão atual do front-end é completamente dependente, acoplada e desatualizada em relação às boas práticas de desenvolvimento.  
A arquitetura monolítica dificulta a manutenção e a reutilização de componentes.  
A migração para React resolve o problema, mas exige uma **refatoração completa** das telas e da lógica de apresentação.

### Plano de Ação
- **Análise e Design de Componentes**: Mapeamento das telas e funcionalidades existentes e projeção da arquitetura em React.  
- **Desenvolvimento Híbrido**: Migração incremental para evitar quebra da aplicação principal, iniciando por telas mais simples como login e cadastro.  
- **Refatoração da Lógica**: Reescrita da manipulação do DOM e da gestão de estado para adequação ao padrão React.  

### Entregáveis e Evidências
- Issues abertas no repositório com especificações claras.  
- Alterações enviadas via Pull Request (PR).  
- Evidências em **prints de tela** e/ou **vídeos** comparando a interface antiga com a nova em React.  

---

## Estratégia para Cenário de Mudança de Regulamentação

### Visão de Longo Prazo
A capacidade de adaptação a **novas regulamentações** garante **flexibilidade e conformidade legal**.  
No sistema Ordem de Serviço, a **LGPD (Lei Geral de Proteção de Dados)** é obrigatória, já que o sistema lida com **dados sensíveis de usuários**.  

Foi implementada a **ocultação de dados sensíveis**, como o **Siape**, exceto para usuários com permissão de administrador. Isso demonstra compromisso com **segurança, privacidade e credibilidade**.

### Descrição do Problema
O sistema não possuía estratégia formal para proteção de dados sensíveis, como o Siape.  
Isso representava **risco de não-conformidade**, expondo dados pessoais e gerando vulnerabilidade de segurança e passivo legal.  

A adaptação era necessária para:
- Garantir **privacidade do usuário**.  
- Manter **usabilidade para administradores** que precisam visualizar dados completos.  

### Plano de Ação
- **Identificação de Dados**: Mapeamento dos dados sensíveis.  
- **Desenvolvimento da Lógica de Ocultação**: Implementação da visualização restrita com mensagens como *“Dados ocultados de acordo com a LGPD”*.  
- **Controle de Acesso**: Criação de permissões diferenciadas entre administradores e usuários comuns.  

### Entregáveis e Evidências
- Prints de tela mostrando visualização oculta para usuários comuns e completa para administradores.  
- Código da lógica de ocultação documentado no PR.  

---

## Estratégia para Migração de API Externa

### Visão de Longo Prazo
A migração de **APIs externas** é rotina em manutenção de software.  
Um processo estruturado evita interrupções no serviço e demonstra a capacidade de adaptação do sistema.  

No sistema Ordem de Serviço, foram adaptadas e atualizadas rotas para comunicação entre o **back-end** e o **front-end em React**, agora desacoplados.

### Descrição do Problema
A API consumida pelo sistema mudou sua estrutura de rotas.  
As rotas antigas, ligadas às **Views do back-end**, foram substituídas por **novas rotas que retornam JSON** ao front-end em React.  
Era necessário garantir a comunicação correta entre sistemas rodando em **portas diferentes**.  

### Plano de Ação
- **Testes Preliminares**: Uso do **Postman** para validar novas rotas e respostas.  
- **Refatoração da Chamada**: Alteração do código para consumir as novas rotas, ajustando a lógica de tratamento.  
- **Tratamento de Erros**: Implementação de mensagens claras ao usuário em caso de falhas.  

### Entregáveis e Evidências
- Prints de requisições bem-sucedidas no Postman.  
- Vídeos ou prints mostrando funcionamento no sistema com rotas atualizadas.  

---

## Conclusão

A elaboração deste plano permitiu à equipe **traçar passos eficientes** para além das correções de código-fonte.  

- A **migração para React** prepara o sistema para um ecossistema moderno.  
- A **adequação à LGPD** estabelece segurança e confiança.  
- A **estratégia para migração de APIs** garante interoperabilidade contínua.  

Essas ações reforçam a **sustentabilidade, escalabilidade e relevância a longo prazo** do sistema Ordem de Serviço.
