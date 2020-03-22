// https://www.npmjs.com/package/eslint-config-airbnb-typescript
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'airbnb-typescript/base',
    ],
    parserOptions: {
        project: './tsconfig.json',
    },
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off'
    }
};