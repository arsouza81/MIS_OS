# Avaliação Heurística – Sistema Ordem de Serviços

## 1. Introdução
<p align=justify>Esta avaliação tem como objetivo identificar e corrigir problemas de usabilidade no **Sistema Ordem de Serviços** do Instituto de Ciências Exatas e Tecnologia (ICET/UFAM), aplicando de forma sistemática as **10 Heurísticas de Usabilidade de Jakob Nielsen** como base de avaliação e redesign.</p>

<p align=justify>O foco deste trabalho é **melhorar a experiência do usuário** e **modernizar a interface** com base em evidências observáveis e documentadas, demonstrando que cada mudança aplicada resulta em uma **usabilidade mais eficiente, intuitiva e consistente**.</p>

<p align=justify>A análise foi conduzida sobre os perfis de **Servidor** e **Gerência**, resultando em *issues* específicas — uma para cada heurística — contendo o problema identificado, o objetivo da correção, as evidências visuais (*antes e depois das telas*), o impacto esperado e a prioridade de implementação.</p>

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

## 3. Issues por Heurística

---

### 3.1 Issue – Reconhecimento em vez de Memorização #45

**Descrição:**  
<p align=justify>Durante a avaliação heurística do Sistema Ordem de Serviços, foi identificada uma limitação relacionada à heurística **“Reconhecimento em vez de Memorização”**.</p>
<p align=justify>Atualmente, quando o **Gerente de TI** seleciona uma data para visualizar as ordens de serviço, o sistema exibe corretamente a **data e o horário** em que cada solicitação foi criada. Entretanto, ao acessar a **página de detalhes** de uma ordem de serviço específica, essas informações **não são apresentadas**, obrigando o usuário a **retornar à tela anterior** para consultá-las novamente.</p>

<p align=justify>Esse comportamento impõe ao usuário a necessidade de **memorizar informações relevantes** que poderiam estar visíveis, aumentando a carga cognitiva e dificultando a navegação.</p>

<p align=justify>Para corrigir essa limitação, recomenda-se **aplicar a heurística de Reconhecimento em vez de Memorização** por meio da **exibição de uma seção informativa consolidada** contendo os **dados do solicitante, a localização do problema, a descrição do problema, o status atual da solicitação e a data e hora em que ela foi registrada**.</p>
<p align=justify>A presença dessas informações na tela de detalhes permitirá que a gerência **reconheça rapidamente o contexto completo** da solicitação, sem depender da memória ou de consultas adicionais.</p>

**Objetivo:**  
<p align=justify>- Exibir, de forma organizada e acessível, os **dados essenciais da Ordem de Serviço** (dados do solicitante, localização, descrição, status atual e data/hora da solicitação);<br>  
- Fornecer informações **completas e contextuais**, eliminando a necessidade de o usuário lembrar dados de telas anteriores;<br>
- Permitir **compreensão imediata** do estado e do histórico da solicitação;<br>
- **Aumentar a transparência, rastreabilidade e eficiência** na gestão das ordens de serviço pelo setor de TI.
</p>

**Classificação:**  
<p align=justify>**Tipo:** Redesign<br>  
**Heurística de Nielsen:** *Reconhecimento em vez de Memorização*<br>  
**Descrição da ação:** Implementação de uma **seção informativa na tela de detalhes da Ordem de Serviço** contendo dados do solicitante, localização e descrição do problema, status atual e data/hora de registro.
</p>

**Evidências:**  
**Antes de aplicar a heurística de Reconhecimento em vez de Memorização** 
<img width="1271" height="548" alt="Image" src="https://github.com/user-attachments/assets/58e235c3-c479-4c51-a9f8-75cae90e5c2b" />

**Depois de aplicar a heurística de Reconhecimento em vez de Memorização**
<img width="1278" height="545" alt="Image" src="https://github.com/user-attachments/assets/76b8f30d-c18f-4bc9-b5f5-661dc698864c" />

**Impacto Esperado:**  
<p align=justify>🧠 **Reduz** a necessidade de o usuário memorizar informações entre telas;<br>
⏱️ **Facilita** a compreensão imediata do estado e do contexto da solicitação;<br>  
🔍 **Melhora** a clareza e a rastreabilidade das informações apresentadas;<br>  
📊 **Aumenta** a precisão e a agilidade na análise e priorização das demandas;<br>  
💼 **Proporciona** uma experiência mais intuitiva, transparente e eficiente para a gerência de TI.
</p>

**Prioridade:**  
**Média**

Para mais informações acesse a issue: <a href="https://github.com/arsouza81/MIS_OS/issues/45">Redesign - Consistência e Padrões #45</a>.

---

### 3.2 Issue – Consistência e Padrões #43

**Descrição:**  
<p align=justify>Durante a avaliação heurística do Sistema Ordem de Serviços, foi identificada uma inconsistência relacionada à heurística **“Consistência e Padrões”**.</p>
<p align=justify>Atualmente, os **status das Ordens de Serviço** variam entre os perfis de **Servidor** e **Gerência**, apresentando diferenças de nomenclatura, sequência e formatação visual (ex.: “em_andamento” vs. “Em Andamento”), além de divergências nas cores utilizadas para indicar os estados.</p>  

<p align=justify>Para corrigir essa limitação, recomenda-se **padronizar integralmente** os status — nomes, cores, capitalização e sequência — assegurando a mesma apresentação em todas as telas e perfis. Adota-se o seguinte **padrão único e ordem temporal**:</p>

1. **Pendente** → cor **azul**  
2. **Em Andamento** → cor **amarela**  
3. **Concluída** → cor **verde**  
4. **Descartada** → cor **cinza**

<p align=justify>Essa padronização reforça a **previsibilidade e coerência** da interface, reduz ambiguidades e melhora a comunicação visual entre os diferentes perfis de usuários.</p>

**Objetivo:**  
- **Unificar** a nomenclatura e o formato dos status da Ordem de Serviço;  
- **Garantir consistência visual e textual** (cores, capitalização e sequência) em todas as telas e perfis;  
- **Aplicar** o mesmo esquema de cores e ordenação (**Pendente → Em Andamento → Concluída → Descartada**);  
- **Manter coerência** entre as interfaces do perfil de Servidor e de Gerência.

**Classificação:**  
**Tipo:** Redesign  
**Heurística de Nielsen:** *Consistência e Padrões*  
**Descrição da ação:** Padronização dos **status da Ordem de Serviço** (nomes, cores, capitalização e sequência) em todos os níveis de acesso do sistema.

**Evidências:**  
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

**Impacto Esperado:**  
🧩 **Garante** coerência e previsibilidade na interface;  
🎯 **Facilita** o reconhecimento e reduz confusão entre diferentes usuários;  
💬 **Melhora** legibilidade e aparência visual dos status;  
🔄 **Mantém** linguagem uniforme em todo o sistema;  
📈 **Apoia** treinamento e adoção, reduzindo erros de interpretação.

**Prioridade:**  
**Média**

Para mais informações acesse a issue: <a href="https://github.com/arsouza81/MIS_OS/issues/43">Redesign - Consistência e Padrões #43</a>.

---

### 3.3 Issue – Visibilidade do Status do Sistema
*(estrutura reservada – aguardando preenchimento)*

---

### 3.4 Issue – Correspondência entre o Sistema e o Mundo Real
*(estrutura reservada – aguardando preenchimento)*

---

### 3.5 Issue – Controle e Liberdade do Usuário
*(estrutura reservada – aguardando preenchimento)*

---

### 3.6 Issue – Prevenção de Erros
*(estrutura reservada – aguardando preenchimento)*

---

### 3.7 Issue – Flexibilidade e Eficiência de Uso
*(estrutura reservada – aguardando preenchimento)*

---

### 3.8 Issue – Design Estético e Minimalista
*(estrutura reservada – aguardando preenchimento)*

---

### 3.9 Issue – Ajudar Usuários a Reconhecer, Diagnosticar e Corrigir Erros
*(estrutura reservada – aguardando preenchimento)*

---

### 3.10 Issue – Ajuda e Documentação
*(estrutura reservada – aguardando preenchimento)*

---

## 4. Conclusão
<p align=justify>A aplicação das heurísticas de Nielsen possibilitou identificar **pontos críticos de inconsistência, memória e clareza** na interface do Sistema Ordem de Serviços.</p>
<p align=justify>As melhorias implementadas resultam em **maior previsibilidade, menor carga cognitiva e maior eficiência** no uso do sistema pelos diferentes perfis de usuários.</p>
<p align=justify>As evidências apresentadas — compostas pelos *prints* de **antes e depois** — e os registros de *commits* associados a cada *issue* garantem **rastreabilidade completa** do processo de redesign, reforçando a aplicação prática e documentada dos princípios de usabilidade.</p>

---

