module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": ["eslint:recommended",
                "airbnb-base"],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "settings": {
        "html/report-bad-indent": "error",
        "html/indent": "+2",
        "html/xml-extensions": [".html"]
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "no-console":"off",
        "no-plusplus":"off",
        "curly":"off",
        "keyword-spacing":"off",
        "nonblock-statement-body-position":"off",
        "consistent-return":"off"
    }
}