/**
* Example of commands data (see source)
* @type {Object}
* @property {string} sentence the user has to say (the language can be precise)
*/
var recognitionObj = {
    "en-EN": "Hello",
    "fr-FR": "Bonjour"
};

/**
* Example of synthesis data (see source)
* @type {Object[]}
*/
var synthesisObj = [
    {
        weight: 1,
        "en-EN": "Hello, Sir",
        "fr-FR": "Bonjour, monsieur"
    },
    {
        weight: 1,
        "en-EN": "Hi, Sir",
        "fr-FR": "Salut, mec"
    }
];

/**
* Example of function data (see source)
* @type {Object[]}
*/
var func = [
    {
        weight: 1,
        func: "func1",
        funcParameters: []
    },
    {
        weight: 24,
        func: "func2",
        funcParameters: []
    }
];

/**
* Example of commands data (see source)
* @type {Object[]}
*/
var simpleData = [
    {
        recognition: "How are you",
        synthesis: "I am fine. Thank you"
    },
    {
        recognition: "Hello World",
        synthesis: "Hello human"
    },
    {
        recognition: "This is a test",
        synthesis: "The test is passed"
    }
];

/**
* Example of commands data (see source)
* @type {Object[]}
*/
var simpleData2 = [
    {
        recognition: {
            "en-EN": "Hello",
            "fr-FR": "Bonjour"
        },
        synthesis: [
            {
                weight: 1,
                "en-EN": "Hello, Sir",
                "fr-FR": "Bonjour, monsieur"
            },
            {
                weight: 1,
                "en-EN": "Hi, Sir",
                "fr-FR": "Salut, mec"
            }
        ],
        func: [
            // this function will be executed 1 / 25 in average
            {
                weight: 1,
                func: "func1",
                funcParameters: []
            },
            // this function will be executed 24 / 25 in average
            {
                weight: 24,
                func: "func2",
                funcParameters: []
            }
        ]
    }
];