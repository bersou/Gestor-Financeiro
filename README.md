# Gestor Financeiro

[![TypeScript](https://img.shields.io/badge/TypeScript-96.9%25-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![CSS](https://img.shields.io/badge/CSS-2.1%25-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/docs/Web/CSS)
[![HTML](https://img.shields.io/badge/HTML-1.0%25-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/docs/Web/HTML)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

> Aplicação web para **gestão financeira pessoal**, com controle de entradas, saídas e visão geral do fluxo de caixa.

---

## Sumário

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Como Executar Localmente](#como-executar-localmente)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Boas Práticas](#boas-práticas)
- [Como Contribuir](#como-contribuir)
- [Roadmap](#roadmap)
- [Licença](#licença)

---

## Visão Geral

O **Gestor Financeiro** é uma aplicação frontend moderna construída com **React**, **TypeScript** e **Vite**, utilizando **Tailwind CSS** e **shadcn/ui** para a interface.

O objetivo principal é permitir que o usuário:

- Registre transações financeiras (receitas e despesas) de forma rápida.
- Categorize seus gastos para melhor organização.
- Acompanhe seu saldo atual e indicadores financeiros-chave.
- Visualize um resumo financeiro por período (dia, semana, mês).

O projeto foi desenvolvido com uma arquitetura frontend limpa e escalável, preparada para integração futura com um backend e banco de dados.

---

## Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|---|---|---|
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Tipagem estática e segurança de código |
| [React](https://react.dev/) | 18.x | Construção de interfaces reativas |
| [Vite](https://vitejs.dev/) | 5.x | Bundler e dev server rápido |
| [Tailwind CSS](https://tailwindcss.com/) | 3.x | Estilização utilitária e responsiva |
| [shadcn/ui](https://ui.shadcn.com/) | latest | Componentes de interface reutilizáveis |
| [Vitest](https://vitest.dev/) | latest | Framework de testes unitários |
| [ESLint](https://eslint.org/) | latest | Linting e qualidade de código |

**Arquivos de configuração importantes:**

- `vite.config.ts` — Configuração do Vite e plugins.
- `tailwind.config.ts` — Tema e caminhos de conteúdo do Tailwind.
- `tsconfig.json` / `tsconfig.app.json` — Compilador TypeScript.
- `vitest.config.ts` — Configuração dos testes.
- `components.json` — Configuração do shadcn/ui.
- `eslint.config.js` — Regras de linting.

---

## Estrutura do Projeto

```
Gestor-Financeiro/
├── public/                  # Assets públicos (favicon, imagens, etc.)
├── src/
│   ├── components/          # Componentes reutilizáveis (UI e domínio)
│   ├── hooks/               # Hooks customizados React
│   ├── lib/                 # Utilitários, helpers e funções de formatação
│   ├── pages/               # Páginas principais da aplicação
│   ├── test/                # Testes unitários e de componentes
│   ├── App.css              # Estilos globais da aplicação
│   ├── App.tsx              # Componente raiz e configuração de rotas
│   ├── index.css            # Estilos base (Tailwind directives)
│   ├── main.tsx             # Ponto de entrada da aplicação
│   └── vite-env.d.ts        # Tipos de ambiente Vite
├── index.html               # HTML base da SPA
├── package.json             # Dependências e scripts do projeto
├── bun.lockb                # Lockfile do Bun
├── components.json          # Configuração shadcn/ui
├── eslint.config.js         # Configuração do ESLint
├── postcss.config.js        # Configuração PostCSS
├── tailwind.config.ts       # Configuração do Tailwind CSS
├── tsconfig.json            # Configuração base do TypeScript
├── tsconfig.app.json        # Configuração TypeScript para a aplicação
└── vite.config.ts           # Configuração do Vite
```

---

## Funcionalidades

### Implementadas / Base estruturada

- [x] Layout inicial com tema e componentes base configurados.
- [x] Integração completa de Tailwind CSS e shadcn/ui.
- [x] Estrutura de pastas organizada por responsabilidade.
- [x] Configuração de testes com Vitest.
- [x] ESLint configurado para qualidade de código.

### Planejadas

- [ ] **Cadastro de Transações**
  - Tipo (receita / despesa), valor, data, categoria e descrição.
  - Validações: valor positivo, data válida, campos obrigatórios.
- [ ] **Dashboard Financeiro**
  - Cartões de resumo: saldo atual, total de receitas, total de despesas.
  - Lista das últimas transações cadastradas.
- [ ] **Filtros Avançados**
  - Filtro por período: hoje, semana, mês ou intervalo customizado.
  - Filtro por categoria de gasto.
- [ ] **Experiência de Uso**
  - Feedback visual: toasts, loaders e estados vazios.
  - Suporte a modo escuro e claro (dark/light mode).
- [ ] **Persistência de Dados**
  - Armazenamento local com LocalStorage / IndexedDB.
  - Integração futura com API e banco de dados.

---

## Como Executar Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) LTS (v18 ou superior)
- Gerenciador de pacotes: `npm`, `pnpm`, `yarn` ou `bun`

### Passo a passo

**1. Clone o repositório:**

```bash
git clone https://github.com/bersou/Gestor-Financeiro.git
cd Gestor-Financeiro
```

**2. Instale as dependências:**

```bash
# npm
npm install

# ou pnpm
pnpm install

# ou yarn
yarn install

# ou bun
bun install
```

**3. Inicie o servidor de desenvolvimento:**

```bash
npm run dev
```

**4. Acesse no navegador:**

```
http://localhost:5173
```

> A porta pode variar; verifique o terminal após rodar o comando.

---

## Scripts Disponíveis

| Script | Comando | Descrição |
|---|---|---|
| Desenvolvimento | `npm run dev` | Inicia o servidor Vite em modo dev |
| Build | `npm run build` | Gera o build otimizado para produção |
| Preview | `npm run preview` | Serve o build de produção localmente |
| Testes | `npm run test` | Executa os testes com Vitest |
| Cobertura | `npm run coverage` | Gera relatório de cobertura de testes |
| Lint | `npm run lint` | Verifica o código com ESLint |

---

## Boas Práticas

- **TypeScript** em todo o projeto: tipagem de modelos de domínio, props de componentes, hooks e utilitários.
- **Organização por responsabilidade**: componentes de apresentação separados de lógica de negócio.
- **Hooks customizados** em `src/hooks/` para encapsular lógica reutilizável.
- **Utilitários isolados** em `src/lib/` para formatação de moeda, datas e cálculos financeiros.
- **Testes** configurados em `src/test/` para garantir confiabilidade do código.
- **ESLint** configurado para manter qualidade e consistência no código.
- **Tailwind CSS** com tokens definidos em `tailwind.config.ts` para estilização consistente.

---

## Como Contribuir

1. Faça um **fork** do repositório.
2. Crie uma branch para sua feature ou correção:
   ```bash
   git checkout -b feature/nome-da-feature
   ```
3. Implemente as alterações seguindo os padrões do projeto.
4. Rode lint e build antes de enviar:
   ```bash
   npm run lint
   npm run build
   npm run test
   ```
5. Envie um **Pull Request** descrevendo:
   - O que foi implementado ou alterado.
   - Screenshots (se a mudança for visual).
   - Passos para testar a alteração.

---

## Roadmap

- [ ] Persistência com LocalStorage e IndexedDB.
- [ ] Autenticação de usuários (login/cadastro).
- [ ] Exportação de dados para CSV e Excel.
- [ ] Gráficos de gastos por categoria e por período.
- [ ] Integração com backend e banco de dados (ex: Supabase).
- [ ] Ampliar cobertura de testes unitários e de componentes.
- [ ] Versão mobile (PWA ou aplicativo nativo).

---

## Licença

Este projeto está sob a licença **MIT**. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<p align="center">
  Desenvolvido por <a href="https://github.com/bersou">bersou</a>
</p>
