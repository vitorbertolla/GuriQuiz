# GuriQuiz

GuriQuiz é um aplicativo de quiz interativo que permite aos usuários responder a perguntas de múltipla escolha sobre diversos tópicos. O projeto é construído com React e utiliza Firebase para gerenciamento de dados em tempo real.

---

## 🚀 Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário modernas e reativas.
- **Firebase**: Plataforma de desenvolvimento que fornece serviços como autenticação, banco de dados em tempo real (Firestore) e armazenamento.
- **Vite**: Ferramenta de construção que fornece um ambiente de desenvolvimento rápido e otimizado.
- **React Router**: Biblioteca para roteamento e navegação entre páginas.
- **CSS Modules**: Para estilização de componentes de forma modular e isolada.

---

## 📦 Dependências do Projeto

### Dependências Principais (`dependencies`)

| Pacote | Versão | Descrição |
|--------|--------|-----------|
| `react` | `^18.3.1` | Biblioteca principal para construção de interfaces |
| `react-dom` | `^18.3.1` | Renderização de componentes React no DOM |
| `react-router-dom` | `^6.x.x` | Roteamento e navegação entre páginas |
| `firebase` | `^10.x.x` | SDK do Firebase para autenticação e banco de dados |

### Dependências de Desenvolvimento (`devDependencies`)

| Pacote | Versão | Descrição |
|--------|--------|-----------|
| `@vitejs/plugin-react` | `^4.2.1` | Plugin Vite para suporte a React |
| `vite` | `^5.0.8` | Ferramenta de build e desenvolvimento |
| `eslint` | `^8.55.0` | Linter para verificar qualidade do código |
| `eslint-plugin-react` | `^7.33.2` | Plugin ESLint para React |
| `eslint-plugin-react-hooks` | `^4.6.0` | Plugin ESLint para hooks do React |
| `eslint-plugin-react-refresh` | `^0.4.5` | Plugin ESLint para React Refresh |

---

## 📁 Estrutura do Projeto

```
Projeto/
├── public/
│   └── images/
├── src/
│   ├── assets/
│   │   ├── Fonts/
│   │   └── GeneralCss/
│   │       ├── Global.css
│   │       └── Theme.css
│   ├── Pages/
│   │   ├── Componentes/
│   │   │   ├── SelectDificuldade.jsx
│   │   │   └── SelectMateria.jsx
│   │   ├── Tela_Admin/
│   │   │   ├── Tela_Admin.jsx
│   │   │   ├── Tela_Admin.module.css
│   │   │   ├── Tela_ListaPerguntas.jsx
│   │   │   ├── Tela_ListaQuiz.jsx
│   │   │   ├── Lista.module.css
│   │   │   └── TelaModal.module.css
│   │   ├── Tela_Cadastro/
│   │   │   ├── Tela_Cadastro.jsx
│   │   │   └── Tela_Cadastro.module.css
│   │   ├── Tela_Cadastro_Pergunta/
│   │   │   ├── Tela_Cadastro_Pergunta.jsx
│   │   │   ├── Tela_Cadastro_IA.jsx
│   │   │   ├── Tela_Cadastro_Pergunta.module.css
│   │   │   └── Tela_Cadastro_IA.module.css
│   │   ├── Tela_Cadastro_Quiz/
│   │   │   ├── Tela_Cadastro_Quiz.jsx
│   │   │   └── Tela_Cadastro_Quiz.module.css
│   │   ├── Tela_Config_Quiz/
│   │   │   ├── Tela_Config_Quiz.jsx
│   │   │   └── Tela_Config_Quiz.module.css
│   │   ├── Tela_Inicial/
│   │   │   ├── Tela_Inicial.jsx
│   │   │   └── Tela_Inicial.module.css
│   │   ├── Tela_Jogo/
│   │   │   ├── Tela_Jogo.jsx
│   │   │   ├── Tela_Jogo.module.css
│   │   │   ├── Dica.jsx
│   │   │   ├── Dica.module.css
│   │   │   └── Timer.jsx
│   │   ├── Tela_Login/
│   │   │   ├── Tela_Login.jsx
│   │   │   └── Tela_Login.module.css
│   │   ├── Tela_Menu/
│   │   │   ├── Tela_Menu.jsx
│   │   │   └── Tela_Menu.module.css
│   │   ├── Tela_Quiz_Pronto/
│   │   │   ├── Tela_Quiz_Pronto.jsx
│   │   │   └── Tela_Quiz_Pronto.module.css
│   │   ├── Tela_Ranking/
│   │   │   ├── Tela_Ranking.jsx
│   │   │   ├── Tela_Ranking.module.css
│   │   │   └── Grafico.jsx
│   │   ├── Tela_Resultados/
│   │   │   ├── Tela_Resultados.jsx
│   │   │   └── Tela_Resultados.module.css
│   │   ├── Tela_Start/
│   │   │   ├── Tela_Start.jsx
│   │   │   └── Tela_Start.module.css
│   │   └── Tela_Fim_Jogo/
│   │       ├── Tela_Fim_Jogo.jsx
│   │       └── Tela_Fim_Jogo.module.css
│   ├── services/
│   │   ├── authentication.js
│   │   ├── crudPerguntas.js
│   │   ├── crudQuiz.js
│   │   ├── firebaseConfig.js
│   │   └── quizConfig.js
│   ├── App.jsx
│   └── main.jsx
├── .env
├── .env.example
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

---

## 📄 Descrição Detalhada das Páginas

### 🏠 **Tela_Inicial**
- **Função**: Página de boas-vindas e entrada do aplicativo.
- **Funcionalidades**:
  - Apresentação do aplicativo GuriQuiz
  - Botões para navegar para Login ou Cadastro
  - Design atrativo com background e elementos visuais

### 👤 **Tela_Login**
- **Função**: Autenticação de usuários existentes.
- **Funcionalidades**:
  - Campo de e-mail e senha
  - Validação de credenciais via Firebase Authentication
  - Redirecionar para tela de menu após login bem-sucedido

### 📝 **Tela_Cadastro**
- **Função**: Criação de novas contas de usuário.
- **Funcionalidades**:
  - Formulário com campos: nome, e-mail e senha
  - Validação de dados antes do envio
  - Criação de conta no Firebase Authentication
  - Redirecionar para login após cadastro bem-sucedido

### 🎯 **Tela_Start**
- **Função**: Página intermediária após login.
- **Funcionalidades**:
  - Menu de opções iniciais
  - Navegação para o menu principal

### 📋 **Tela_Menu** 
- **Função**: Menu principal do aplicativo.
- **Funcionalidades**:
  - Botão "Jogo Rápido" para iniciar um quiz
  - Botão "Jogo Personalizado" para personalizar um jogo
  - Botão "Cadastro Perguntas" para adicionar novas perguntas
  - Botão "Cadastro Quiz" para adicionar novos quizzes
  - Botão "Ranking Geral" para visualizar o desempenho dos usuários nos quizzes

### 🎮 **Tela_Quiz_Pronto**
- **Função**: Exibição de quizzes disponíveis.
- **Funcionalidades**:
  - Lista de quizzes criados
  - Informações sobre cada quiz (nome, descrição, dificuldade)
  - Navegação para Tela_Jogo ao confirmar

### ⚙️ **Tela_Config_Quiz**
- **Função**: Configuração de quiz antes de jogar.
- **Funcionalidades**:
  - Seleção de matérias (múltipla escolha com checkboxes)
  - Seleção de dificuldade (Fácil, Médio, Difícil)
  - Escolha do número de perguntas
  - Validação de configurações antes de iniciar o jogo

### 🎲 **Tela_Jogo**
- **Função**: Experiência principal de jogar quiz.
- **Funcionalidades**:
  - Exibição da pergunta atual
  - Apresentação de 4 alternativas de múltipla escolha
  - Feedback imediato (correto/incorreto) ao responder
  - Sistema de pontuação 
  - Mostrador de dificuldade
  - Botão de "Dica" 
  - Avanço automático para próxima pergunta após 2 segundos
  - Navegação para Tela_Resultados ao término

### 🏆 **Tela_Resultados**
- **Função**: Exibição dos resultados finais do quiz.
- **Funcionalidades**:
  - Pontuação total alcançada
  - Número de acertos vs total de perguntas
  - Percentual de acertos
  - Botão para retornar ao menu
  - Armazenamento dos resultados no Firebase, se for quiz

### 📊 **Tela_Ranking**
- **Função**: Visualização do desempenho dos usuários.
- **Funcionalidades**:
  - Ranking dos usuários por pontuação total
  - Exibição de nome, pontuação
  - Gráfico visual de desempenho 

### 🔧 **Tela_Admin**
- **Função**: Painel administrativo para gerenciar conteúdo.
- **Funcionalidades**:
  - Gerenciamento de quizzes (CRUD completo)
  - Gerenciamento de perguntas (CRUD completo)
  - Lista de perguntas e quizzes cadastrados
  - Modal para adicionar/editar informações
  - Exclusão de quizzes e perguntas

### ❓ **Tela_Cadastro_Pergunta**
- **Função**: Adição de novas perguntas ao banco de dados.
- **Funcionalidades**:
  - Formulário com campos: descrição, matéria, dificuldade
  - Adição de alternativas (múltiplas)
  - Seleção da resposta correta
  - Integração com IA para gerar perguntas 
  - Validação de dados antes do envio ao Firebase

### 📚 **Tela_Cadastro_Quiz**
- **Função**: Criação de novos quizzes.
- **Funcionalidades**:
  - Formulário com nome e descrição do quiz
  - Seleção de perguntas para incluir no quiz
  - Definição de dificuldade geral do quiz
  - Validação antes de salvar
  - Armazenamento no Firebase Firestore

---

## 🎨 Componentes Reutilizáveis

### **SelectMateria.jsx**
- Componente para seleção de matérias
- Usado em Tela_Config_Quiz e Tela_Cadastro_Pergunta

### **SelectDificuldade.jsx**
- Componente para seleção de dificuldade
- Usado em Tela_Config_Quiz e Tela_Cadastro_Quiz

### **Dica.jsx**
- Componente para fornecer dicas durante o jogo
- Integrado em Tela_Jogo

### **Timer.jsx**
- Componente de temporizador para limitar tempo de resposta
- Pode ser integrado em Tela_Jogo

### **Grafico.jsx**
- Componente para visualização de dados em gráficos
- Usado em Tela_Ranking

---

## 🛠️ Services (Serviços)

### **authentication.js**
- Gerencia autenticação via Firebase
- Funções: login, cadastro, logout, verificação de sessão

### **crudPerguntas.js**
- Hook `usePerguntas()` para gerenciar perguntas
- Funções: carregar, adicionar, editar, remover perguntas

### **crudQuiz.js**
- Hook `useQuizzes()` para gerenciar quizzes
- Funções: carregar, adicionar, editar, remover quizzes

### **firebaseConfig.js**
- Configuração inicial do Firebase
- Exporta instância do Firebase para uso em toda aplicação

### **quizConfig.js**
- Funções utilitárias para validação e construção de parâmetros de quiz
- `buildQuizParams()`: valida e constrói parâmetros
- `paramsToQueryString()`: converte parâmetros para query string
- `queryStringToParams()`: converte query string para parâmetros

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (v14 ou superior)
- npm ou yarn
- Conta Firebase com projeto criado

### Instalação

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu_usuario/GuriQuiz.git
   cd GuriQuiz/Projeto
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:
   - Copie o arquivo `.env.example` para `.env`
   - Preencha com suas credenciais do Firebase:
   ```env
   VITE_FIREBASE_API_KEY=seu_api_key
   VITE_FIREBASE_AUTH_DOMAIN=seu_auth_domain
   VITE_FIREBASE_PROJECT_ID=seu_project_id
   VITE_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=seu_messaging_sender_id
   VITE_FIREBASE_APP_ID=seu_app_id
   ```

4. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

5. **Acesse o aplicativo**:
   ```
   http://localhost:5173
   ```

---

## 📦 Build para Produção

```bash
npm run build
```

O arquivo compilado será gerado na pasta `dist/`.

---

## 📝 Funcionalidades Principais

✅ **Autenticação de Usuários**: Login e cadastro via Firebase  
✅ **Gerenciamento de Quizzes**: Criar, editar e remover quizzes  
✅ **Gerenciamento de Perguntas**: Adicionar perguntas com múltiplas alternativas  
✅ **Ranking de Usuários**: Visualizar desempenho de todos os usuários nos quizzes
✅ **Feedback Imediato**: Resposta correta/incorreta durante o jogo  
✅ **Interface Responsiva**: Design adaptável para diferentes telas  

---

## 🔒 Segurança

- Autenticação segura via Firebase Authentication
- Regras de segurança no Firestore para proteger dados
- Variáveis de ambiente para credenciais sensíveis
- Validação de dados no cliente e servidor

---

## 📚 Estrutura de Dados do Firebase

### **Collection: usuarios**
```json
{
  "uid": "user_id",
  "nick": "Nome do Usuário",
  "email": "email@example.com",
  "dataCadastro": "2024-01-01"
}
```

### **Collection: perguntas**
```json
{
  "descricao": "Qual é a capital da França?",
  "materia": "Geografia",
  "dificuldade": "Fácil",
  "alternativas": [
    {"letra": "A", "texto": "Londres"},
    {"letra": "B", "texto": "Paris"},
    {"letra": "C", "texto": "Berlim"},
    {"letra": "D", "texto": "Madri"}
  ],
  "correta": "Paris"
}
```

### **Collection: quizzes**
```json
{
  "nome": "Quiz de Geografia",
  "descricao": "Teste seus conhecimentos de geografia",
  "dificuldade": "Médio",
  "materia": "Geografia",
  "perguntas": ["id1", "id2", "id3"]
}
```

### **Collection: resultados**
```json
{
  "usuarioId": "user_id",
  "nick": "Nome do Usuário",
  "quizId": "quiz_id",
  "nomeQuiz":"Quiz de Geografia",
  "pontuacao": 300,
  "data": "2024-01-01"
}
```

---

