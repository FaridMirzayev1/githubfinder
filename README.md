# GitHub Finder

A web application for searching GitHub profiles by username and viewing detailed user information.

🔗 **Live Demo:** [https://faridmirzayev1.github.io/githubfinder/](https://faridmirzayev1.github.io/githubfinder/)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

GitHub Finder is a lightweight and responsive React application that allows users to search for any GitHub profile by username and instantly view key information such as avatar, bio, repository count, followers, and following — powered by the public GitHub REST API.

## Features

- 🔍 Search GitHub users by username
- 👤 Display profile details (avatar, name, bio, location, etc.)
- 📦 Show repository, followers, and following counts
- ⚡ Fast performance with Vite
- 📱 Fully responsive design
- 🧭 Client-side routing with React Router

## Tech Stack

| Category         | Technology            |
|-------------------|------------------------|
| Frontend          | React, TypeScript      |
| Build Tool        | Vite                   |
| Routing           | React Router           |
| Styling           | CSS                    |
| API               | GitHub REST API        |
| Deployment        | GitHub Pages           |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/faridmirzayev1/githubfinder.git

# Navigate into the project directory
cd githubfinder

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

## Available Scripts

| Command           | Description                              |
|--------------------|-------------------------------------------|
| `npm run dev`      | Runs the app in development mode          |
| `npm run build`    | Builds the app for production to `dist/`  |
| `npm run preview`  | Previews the production build locally     |
| `npm run deploy`   | Builds and deploys the app to GitHub Pages|

## Deployment

This project is deployed to **GitHub Pages** using the `gh-pages` package.

```bash
npm run deploy
```

This command builds the project and pushes the contents of the `dist` folder to the `gh-pages` branch.

> **Note:** Ensure `vite.config.ts` has the correct `base` path set (e.g. `base: '/githubfinder/'`) so that assets load correctly on GitHub Pages.

## Project Structure

```
githubfinder/
├── src/
│   ├── components/     # Reusable UI components
│   ├── types/           # github.ts
│   ├── App.tsx          # Root application component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── index.html
├── vite.config.ts
├── package.json
└── README.md
```


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
