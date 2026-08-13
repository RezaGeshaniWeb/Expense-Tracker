# Expense Tracker

A simple, practical web app for tracking income and expenses — built with **Next.js**, **React**, **TypeScript**, **TailwindCSS**, and **Zustand**.

## Live Demo

Click the link below to try the project online:

**[Live Demo](https://expense-tracker-eight-taupe-21.vercel.app/)**

---

## Built with Prompt.txt

This project was implemented from the specifications and instructions in [`Prompt.txt`](./Prompt.txt).

`Prompt.txt` is the full prompt used to generate this Expense Tracker and acts as the project’s source of truth. It defines:

| Section | Content |
|---------|---------|
| **ROLE** | Senior frontend developer role |
| **OBJECTIVE** | Overall goal: build a complete, realistic Expense Tracker |
| **TECH_STACK** | Allowed technologies (Next.js, React, TypeScript, TailwindCSS, Zustand, etc.) |
| **PROJECT_FEATURES** | Product features (add/delete transactions, financial summary, LocalStorage, etc.) |
| **UI_REQUIREMENTS** | UI requirements (light theme, brand color `#4F46E5`, responsive layout, etc.) |
| **FORM_VALIDATION** | Form validation rules |
| **NEXTJS / TYPESCRIPT** | App Router rules, Client Components, and strict TypeScript practices |
| **FILE_STRUCTURE** | Exact file and folder structure |

To see the criteria this app was designed and coded against, start with `Prompt.txt` — the current codebase follows those specs.

---

## Features

- Add a new transaction (title, amount, type: income or expense)
- Display **total balance**, **total income**, and **total expenses**
- Transaction history list
- Delete a transaction
- Persist data in **LocalStorage** and restore it automatically on page reload
- Recalculate totals dynamically after every add or delete
- Form validation with clear error messages
- Modern, light-theme, responsive UI

---

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/) (with LocalStorage persistence)

---

## Project Structure

```
/
├── Prompt.txt                 # Main prompt used to build the project
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── app/
│   ├── layout.tsx             # Root shell (fonts, metadata, global styles)
│   ├── page.tsx               # Main Expense Tracker screen
│   └── globals.css            # Tailwind directives and minimal CSS variables
├── components/
│   ├── Header.tsx
│   ├── BalanceSummary.tsx
│   ├── IncomeExpenseSummary.tsx
│   ├── TransactionForm.tsx
│   └── TransactionList.tsx
├── store/
│   └── useExpenseStore.ts     # Zustand store + LocalStorage
└── types/
    └── transaction.ts         # Types and stored-data validation
```

This layout matches the `FILE_STRUCTURE` section in `Prompt.txt`.

---

## Prerequisites

- Node.js (v18 or newer recommended)
- npm

---

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Other scripts

```bash
# Production build
npm run build

# Run the production build
npm run start

# Lint
npm run lint
```

---

## How It Works (Overview)

1. **Transaction form** collects title, amount, and type (Income / Expense), and validates input before submit.
2. **Zustand store** holds transactions and uses the `persist` middleware to save them in LocalStorage.
3. **Financial summary** (balance, income, expenses) is derived from the transaction list and updates automatically.
4. **Transaction list** lets you view and delete items; totals refresh after each delete.

---

## UI Colors

| Item | Value |
|------|--------|
| Theme | Light only |
| Primary brand color | `#4F46E5` |
