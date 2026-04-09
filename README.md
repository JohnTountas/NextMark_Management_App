# NextMark

NextMark is a polished, local-first task management application built with React, Vite, and Tailwind CSS. It is designed to demonstrate thoughtful frontend engineering, clean component architecture, and a product-minded user experience in a compact codebase.

For hiring developers, technical reviewers, and software engineering teams, this project shows how a focused single-page application can deliver strong usability, maintainable structure, and modern UI behavior without unnecessary complexity.

## Product Overview

NextMark helps users capture, organize, and manage personal tasks in a fast and distraction-free interface. The application emphasizes clarity, responsiveness, and a calm visual design while supporting the workflows expected from a modern task tool.

The current implementation is intentionally frontend-only. Task data and theme preferences are persisted in the browser through `localStorage`, making the application lightweight to run locally and easy to evaluate without backend setup.

## Core Capabilities

- Create tasks with priority and optional due date metadata
- Edit existing tasks inline
- Mark tasks as completed or active
- Delete tasks with a lightweight confirmation step
- Filter tasks by `all`, `active`, and `completed`
- Search tasks by keyword
- Reorder tasks with drag-and-drop interactions
- Persist tasks and dark mode preference in browser storage
- Present progress and task statistics in real time
- Support both light and dark themes

## Why This Project Matters

This repository is a strong reference point for teams evaluating frontend fundamentals and product execution. It demonstrates:

- Component-driven UI composition with clear separation of concerns
- Practical state management using React hooks
- Local persistence without introducing backend overhead
- Attention to UX details such as empty states, animation, visual hierarchy, and theme support
- A codebase small enough to review quickly, yet rich enough to discuss architecture, maintainability, and scalability decisions

## Technology Stack

### Frontend

- React 19
- Vite 8
- JavaScript (ES modules, JSX)
- Tailwind CSS 4

### Supporting Libraries

- `@hello-pangea/dnd` for drag-and-drop task reordering
- `react-dom` for client rendering

### Tooling

- ESLint 9 for linting and code quality checks
- PostCSS and Tailwind tooling for styling workflows

## Architecture and Implementation Notes

The application follows a straightforward, maintainable React structure:

- `src/App.jsx`
  Orchestrates application state, filtering logic, persistence integration, theme toggling, and task operations.
- `src/components/`
  Contains focused UI building blocks such as the header, input form, filters, task list, task item, statistics, and empty states.
- `src/hooks/useLocalStorage.js`
  Encapsulates browser persistence in a reusable custom hook.
- `src/utils/`
  Reserved for utility helpers and storage-related helpers.

This approach keeps business logic close to the application shell while allowing presentation concerns to remain isolated inside reusable components.

## User Experience Design

NextMark is not only functional, but intentionally designed to feel refined and production-aware. Notable UX characteristics include:

- Soft visual styling with a consistent design language
- Responsive layout optimized for focused single-column task management
- Smooth state transitions and lightweight animations
- Clear priority indicators and due date signals
- Friendly empty states that preserve usability when filters or search return no results
- Dark mode support implemented through a class-based theme strategy

## Data and State Model

The current application uses a simple client-side state model:

- Task records include `id`, `text`, `priority`, `dueDate`, `completed`, and `createdAt`
- State is managed with React hooks such as `useState`, `useMemo`, `useCallback`, and `useEffect`
- Persistence is handled with `localStorage` through a dedicated custom hook

This design is appropriate for a lightweight standalone application and provides a clean foundation for future expansion into API-backed persistence.

## Local Development

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

### Create a Production Build

```bash
npm run build
```

### Preview the Production Build

```bash
npm run preview
```

### Run Linting

```bash
npm run lint
```

## Available Scripts

- `npm run dev` starts the Vite development server
- `npm run build` creates an optimized production bundle
- `npm run preview` serves the production build locally
- `npm run lint` runs ESLint across the codebase

## Project Structure

```text
nextmark_app/
|-- public/
|-- src/
|   |-- components/
|   |-- hooks/
|   |-- utils/
|   |-- App.jsx
|   |-- index.css
|   `-- main.jsx
|-- index.html
|-- package.json
|-- vite.config.js
`-- README.md
```

## Engineering Assessment

From a professional software engineering perspective, this project currently represents:

- A strong frontend-focused implementation with clean UI modularity
- A good portfolio artifact for demonstrating React fundamentals and interface craftsmanship
- A practical base for extending into a multi-user or API-backed product

It does not yet include a backend, automated tests, authentication, or server-side persistence. Those omissions are appropriate for the current scope, but important to note for teams evaluating production readiness.

## Recommended Next Steps for Production Readiness

- Add unit and integration testing with tools such as Vitest and React Testing Library
- Introduce end-to-end coverage for core flows such as task creation, editing, filtering, and reordering
- Replace `localStorage` with an API-backed persistence layer
- Add authentication and user-specific data isolation
- Expand accessibility validation, including keyboard interaction audits and screen reader review
- Add analytics, error monitoring, and deployment pipeline automation

## Summary

NextMark is a concise but professional frontend application that balances product usability with implementation clarity. It is well suited for portfolio presentation, engineering review, and further expansion into a larger productivity platform.
