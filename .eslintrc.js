// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // add your custom rules here
    'rules': {
        // allow paren-less arrow functions
        "arrow-parens": 0,
        "comma-dangle": [2, "only-multiline"],
        "indent": [2, 4],
        // allow async-await
        "generator-star-spacing": 0,
        // allow debugger during development
        "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
        "no-undef": 0,
        "semi": [2, "always"],
        "space-before-function-paren": 0,
        "operator-linebreak": [2, "after"], 
        "no-new": 0,
        "quotes": [0,'single','double'],
        "no-unused-vars": 0,
    }
}