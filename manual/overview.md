# speechYL.js

SpeechYL is a Web Speech API library wrapper. It helps with the basic usage of web speech api. You can associate a sentence to a function with just a json file. 

## Installation

### From npm

```bash
$ npm install speechyl
```

## Documentation

Documentation available [here](http://ffloriel.github.io/speechYL/documentation/).

## Usage

### Getting started

Start by importing the library if you are using ES6
```javascript
import SpeechYL from 'speechyl'
```
Or put the script file in the html file :
```html
<script src="speechYL.min.js"></script>
```

```javascript
var speechYL = new SpeechYL();
var lang = "en-EN";
speechYL.setLang(lang);
speechYL.commands = simpleData // from 'Commands Data examples'
```

### Commands Data examples
```javascript
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
```
```javascript
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
                func: "func1"
            },
            // this function will be executed 24 / 25 in average
            {
                weight: 24,
                func: "func2"
            }
        ]
    }
];
```
