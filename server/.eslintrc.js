// eslint-disable-next-line no-undef
module.exports = {
    'env': {
        'browser': true,
        'node': true,
        'es2015': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 11,
        'sourceType': 'module'
    },
    'plugins': [
        '@typescript-eslint'
    ],
    'rules': {
        'indent': ['error', 4],
        'linebreak-style': ['error', 'unix'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'never'],
        'eqeqeq': 'error',
        'no-console': 'off',
        'no-debugger': 'off',
    }
}
