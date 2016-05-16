# Usage

SpeechYL can be used to add quickly voice recognition and synthesis functionnality to a website or a web application.

## Basic configuration

```javascript
var speechYL = new SpeechYL();
var lang = "en-EN";
speechYL.setLang(lang);

//Choose a voice for synthesis

//Array of the available voices
console.log(speechYL.voices);

//Functions to get voices more easily

var voicesEnglish = speechYL.getVoicesByLang("en-GB");
var voiceFemaleEnglish = speechYL.getVoiceByName("Google UK English Female");

//Set voice

speechYL.voice = voiceFemaleEnglish;

```

## Commands

Multiple possible way to add commands with SpeechYL.

### Programmaticaly
```javascript

speechYL.addCommand("Z=What is your name", "My name is Oracle", null);

speechYL.commands.push({
    recognition: "Hello World",
    synthesis: "Hello human"
});


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

speechYL.commands = simpleData;


```

### From a json file
```json
[
    {
        "recognition": "How are you",
        "synthesis": "I am fine. Thank you"
    },
    {
        "recognition": "Who are you",
        "synthesis": "My name is Oracle. I am your personal assistant"
    },
    {
        "recognition": "What is your purpose",
        "synthesis": "My purpose is to assist you, help you."
    }
]
```

```javascript
speechYL.loadJsonCommands('commands.json');
```


## Start recognition with a button

```javascript

document.getElementById("button").addEventListener("click", function() {
    speechYL.recogStart();
}, false);

```