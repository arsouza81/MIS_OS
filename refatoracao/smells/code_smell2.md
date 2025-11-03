## Code Smells Identificados

### Refatoração 3 - *Dead Code*

---
---

### Refatoração 4 — *Extract Method*

A refatoração de extração do método `CreateClaimsPrincipal()` para a classe auxiliar `ClaimsHelper` foi motivada pela identificação de *code smells* relacionados à complexidade e à falta de coesão no método `Login` do `UserController`.  
Esses *smells* foram classificados conforme os tipos descritos no capítulo 9.5 do livro *Engenharia de Software Moderna*.

---

#### 1. Método Longo (*Long Method*)
O método `Login` concentrava múltiplas operações: consulta ao banco de dados, verificação de credenciais, criação da lista de *claims*, construção da identidade e registro da autenticação no contexto HTTP.

**Consequência:**  
Código extenso e de difícil leitura, exigindo maior esforço cognitivo para compreender o fluxo e dificultando a escrita de testes unitários.

**Correção aplicada:**  
A lógica de autenticação foi **extraída** para o método dedicado `CreateClaimsPrincipal()` na classe `ClaimsHelper`, aplicando o padrão *Extract Method*.  
Isso reduziu o tamanho do método `Login`, tornando-o mais legível e direto ao propósito de autenticar usuários.

---

#### 2. Baixa Coesão (*Low Cohesion*)
O `UserController` executava tanto a responsabilidade de controle de requisições HTTP quanto a montagem da estrutura de autenticação, o que misturava camadas distintas da aplicação.

**Consequência:**  
Dificuldade de manutenção e de evolução do código, além de violação do Princípio da Responsabilidade Única (SRP).

**Correção aplicada:**  
A criação de *claims* e do `ClaimsPrincipal` foi movida para a classe `ClaimsHelper`, centralizando essa responsabilidade e mantendo o controlador apenas como orquestrador das requisições.

---

#### 3. Duplicação Potencial de Código (*Duplicated Code*)
A lógica de criação de *claims* poderia ser replicada em outros fluxos (como autenticação de administradores ou renovação de sessão).

**Consequência:**  
Risco de inconsistência e aumento do esforço de manutenção se fosse necessário atualizar a forma de autenticação em diferentes locais do código.

**Correção aplicada:**  
Com a refatoração, a criação de *claims* foi **centralizada** em um único método (`CreateClaimsPrincipal`), permitindo reutilização e padronização.

---

#### 4. Complexidade Desnecessária (*Unnecessary Complexity*)
O método `Login` apresentava complexidade excessiva por conter múltiplas etapas lógicas em um mesmo bloco de código.

**Consequência:**  
Baixa legibilidade, risco de erros ao modificar partes isoladas e dificuldade de expansão da autenticação (por exemplo, para adicionar novas permissões).

**Correção aplicada:**  
O uso do *Extract Method* simplificou o método original, reduzindo o número de responsabilidades diretas e melhorando a estrutura interna.

---

### Resumo dos Benefícios

- Redução da complexidade e tamanho do método `Login`;
- Maior clareza e legibilidade do fluxo de autenticação;
- Centralização da lógica de criação de *claims* em uma única classe reutilizável (`ClaimsHelper`);
- Melhoria na coesão e aderência ao SRP (Single Responsibility Principle);
- Facilitação da manutenção e testes unitários da lógica de autenticação.

---

### Referências

- Capítulo 9.5 — *Code Smells e Refatoração* do livro **Engenharia de Software Moderna** (Bruno P. de Almeida et al., 2021).  
- Fowler, Martin. *Refactoring: Improving the Design of Existing Code.* Addison-Wesley, 2018.

