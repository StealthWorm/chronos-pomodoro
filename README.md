# Chronos Pomodoro Timer

A modern Pomodoro timer application built with React, TypeScript, and Vite that
helps users boost productivity through focused work sessions and structured
breaks.

## Features

- **Focus & Break Timer Display**: Visual countdown for both work sessions and
  relief periods
- **Task Tracking**: Monitor current focus sessions with real-time progress
- **Session History**: Complete history of completed, stopped, or abandoned
  Pomodoro sessions
- **Modern UI**: Clean and intuitive interface built with React and TypeScript
- **Fast Development**: Powered by Vite for lightning-fast hot module
  replacement

## About the Pomodoro Technique

The Pomodoro Technique is a time management method that uses a timer to break
down work into intervals, traditionally 25 minutes in length, separated by short
breaks. This app helps you implement this technique effectively by tracking your
sessions and providing insights into your productivity patterns.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the
configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

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

You can also install
[eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x)
and
[eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom)
for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
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
