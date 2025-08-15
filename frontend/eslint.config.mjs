import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default defineConfig([
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    ignores: ['node_modules'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  eslintConfigPrettier,
]);
