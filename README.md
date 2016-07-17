[![npm](https://img.shields.io/npm/l/speechyl.svg?maxAge=2592000?style=flat-square)]()
[![npm](https://img.shields.io/npm/dt/speechyl.svg?maxAge=2592000?style=flat-square)]()

# SpeechYL

SpeechYL (spitʃ waj ɛl) is a Web Speech API library wrapper. It helps with the basic usage of web speech api. You can associate a sentence to a function with just a json object.

## Installation

### From npm

```bash
$ npm install speechyl
```

## Quick tutorial

A quick tutorial available [here](http://ffloriel.github.io/speechYL/documentation/manual/tutorial.html).

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
```

### Simple example commands file

```json

[
    {
        "recognition": "Hello",
        "synthesis": "Hello World"
    },
    {
        "recognition": {
            "en-EN": "log me out",
            "fr-FR": "deconnecte moi"
        },
        "func": "logOut"
    },
    {
        "recognition": {
            "en-EN": "go to the previous page",
            "fr-FR": "va a la page precedente"
        },
        "func": "goPreviousPage"
    },
    {
        "recognition": {
            "en-EN": "go to the next page",
            "fr-FR": "va a la page suivante"
        },
        "func": "goNextPage"
    },

]

```
