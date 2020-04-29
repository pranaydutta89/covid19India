module.exports = {
    env: {
        browser: true,
        es2017: true,
    },
    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
            impliedStrict: true,
            "jsx": true
        },
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    rules: {
        "react/prop-types": 0,
    }
};
