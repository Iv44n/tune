import globals from 'globals'
import jsPlugins from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginAstro from 'eslint-plugin-astro'

export default [
  // Configuración general para todos los archivos JS y TS
  {
    files: ['**/*.{js,mjs,cjs,ts,astro}'],
    languageOptions: {
      globals: globals.node
    },
    rules: {
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'no-trailing-spaces': 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'eol-last': 'error',
      'comma-dangle': ['error', 'never'],
      'block-spacing': ['error', 'always'],
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'no-duplicate-imports': 'error',
      'comma-spacing': ['error', { before: false, after: true }],
      'object-curly-spacing': ['error', 'always'],
      'camelcase': 'error',
      'astro/no-unused-css-selector': 'off',
      'astro/semi': ['error', 'never'],
      'jsx-quotes': ['error', 'prefer-single']
    }
  },

  // Configuración específica para archivos .js
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs'
    }
  },

  // Incluir configuraciones recomendadas de ESLint para JS y TS
  jsPlugins.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs['flat/recommended'],

  // Carpetas ignoradas
  {
    ignores: ['dist/', 'node_modules/', '.vscode/', '.astro/']
  }
]
