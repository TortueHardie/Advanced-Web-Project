// eslint.config.mjs
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
    },
    rules: {
      // Style & formatage assouplis
      'indent': ['warn', 2, 4, { SwitchCase: 1 }], // 2 espaces, flexible sur les switch
      'quotes': ['warn', 'single', { avoidEscape: true }], // Simple quote mais permet les doubles si nécessaire
      'comma-dangle': ['warn', 'always-multiline'],
      'max-statements-per-line': ['warn', { max: 3 }], // Autorise plus d'expressions par ligne
      'no-inline-comments': 'off', // Autorisation des commentaires inline
      'no-multiple-empty-lines': ['warn', { max: 2, maxEOF: 1, maxBOF: 0 }],
      'no-trailing-spaces': 'warn',

      // Bonne pratique JS/TS
      'prefer-const': 'warn',
      'no-var': 'error',
      'curly': ['warn', 'multi-line'], // Facultatif pour les blocs à une ligne
      'no-shadow': 'warn',
      'no-empty-function': 'warn',
      'object-curly-spacing': ['warn', 'always'],
      'space-before-function-paren': ['warn', {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      }],

      // Nommage des variables et fonctions
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'variable', 
          format: ['camelCase', 'UPPER_CASE'], // Variables en camelCase ou majuscules pour les constantes
        },
        {
          selector: 'function',
          format: ['camelCase'], 
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'], // Types et interfaces en PascalCase
        }
      ],

      // Suppression de règles inutiles pour TypeScript
      'no-undef': 'off', // TypeScript s'en occupe
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }], // Pas obligatoire pour les expressions
    },
    ignores: ['dist/**', 'node_modules/**', 'tsconfig.json'],
  }
);
