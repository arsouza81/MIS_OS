## Code Smells Identificados 

### Refatoração 1 — *Extract Class*

A refatoração de extração das classes `ClaimsHelper` e `ProtocoloGenerator` foi motivada pela presença de alguns *code smells* identificados e referenciados com base nos descritos no capítulo 9.5 do livro Engenharia de Software Moderna.

#### 1. Classe Grande (*Large Class*) — Seção 9.5.3
Os controladores `UserController` e `FormServidorController` acumulavam múltiplas responsabilidades, incluindo:
- Controle de requisições HTTP
- Lógica de autenticação e criação de `ClaimsPrincipal`
- Lógica de geração e padronização de protocolos

**Consequência:**  
Métodos mais longos, código difícil de navegar e baixa coesão entre funcionalidades.

**Correção aplicada:**  
A lógica foi **extraída** para classes especializadas (`Extract Class`), resultando em controladores menores e focados.

---

#### 2. Métodos Longos (*Long Method*) — Seção 9.5.2
Diversos métodos continham trechos extensos e com múltiplos passos internos, dificultando compreensão e testes.

**Consequência:**  
Alta carga cognitiva para entender o fluxo e dificuldade para isolar partes do código em testes.

**Correção aplicada:**  
Ao mover responsabilidades para `ClaimsHelper` e `ProtocoloGenerator`, o tamanho dos métodos diminuiu e o fluxo ficou mais claro.

---

#### 3. Duplicação de Código (*Duplicated Code*) — Seção 9.5.1
A criação do `ClaimsPrincipal` e a lógica de geração de protocolo apareciam mais de uma vez no código.

**Consequência:**  
Risco de inconsistência, esforço maior de manutenção e dificuldade de evolução futura.

**Correção aplicada:**  
Lógica repetida agora é centralizada em classes reutilizáveis, reduzindo a chance de divergências.

---

#### 4. Baixa Coesão / Muitas Responsabilidades (*Class with Multiple Responsibilities*)
Embora não listado como um smell específico nomeado no catálogo, este caso está relacionado à Seção 9.5 pois decorre da combinação de:
- Classe Grande
- Métodos Longos
- Código Duplicado

**Correção aplicada:**  
Cada classe agora desempenha **uma única função**, seguindo o Princípio da Responsabilidade Única (SRP).

---

### Resumo dos Benefícios
- Aumento da coesão entre componentes
- Menor acoplamento entre camadas
- Controladores mais simples e claros
- Facilitação de testes e manutenção

---

---

### Refatoração 2 — *Rename Method / Variable*

A refatoração aplicada teve foco na padronização de nomes, parâmetros e rotas REST.

#### 1. Inconsistência de Nomeação (*Inconsistent Naming*) — Relacionado a *Comentários* (Seção 9.5.10)
De acordo com a Seção 9.5.10, quando o código precisa de comentários explicativos é um indicativo de nomenclatura inadequada.

**Problema encontrado:**  
Variáveis e rotas usavam diferentes convenções, como `snake_case` e `camelCase`.

**Consequência:**  
O código não se explicava sozinho, exigindo leitura adicional e aumentando riscos de equívocos.

**Correção aplicada:**  
Aplicação do padrão `Rename Method/Variable` → nomes mais claros dispensam explicações extras.

---

#### 2. Código com Baixa Semântica / Métodos Pouco Descritivos (Relacionado a Seção 9.5.10)
Endpoints como `/detalhes_solicitacao/{id}` não deixavam evidente qual recurso era manipulado.

**Consequência:**  
Integração com o frontend e navegação na API se tornavam menos previsíveis.

**Correção aplicada:**  
Rotas refeitas para refletir o domínio da ação, ex.:
solicitacao-detalhes/{id}
solicitacoes-por-data

---

#### 3. Desalinhamento REST (API menos clara e menos padronizada)
Estrutura anterior das rotas nem sempre seguia a ideia de recurso → ação.

**Correção aplicada:**  
Padronização para o formato:
api/[controller]
api/user/...
api/form-servidor/...


---

### Resumo dos Benefícios
- URLs mais limpas e previsíveis
- Melhor comunicação entre backend e frontend
- Código autoexplicativo, reduzindo comentários desnecessários
- Aumento de legibilidade e manutenção

---
