import { defineConfig } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    rules: {
      'no-debugger': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'error',
      'react/no-unescaped-entities': ['warn', { forbid: ['{', '}', '>', '<'] }],
      '@next/next/no-html-link-for-pages': 'warn',
    },
  },
  {
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      'coverage/**',
      'node_modules/**',
      '.turbo/**',
      '.vercel/**',
      'public/**',
    ],
  },
]);

export default eslintConfig;
