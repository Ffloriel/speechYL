import SpeechYL from '../speechYL';

let speechYL = new SpeechYL();
var lang = "en-EN";
speechYL.setLang(lang);
speechYL.commands.push({
    recognition: "Hello World",
    synthesis: "Hello human"
});

setTimeout(function() {
    speechYL.voice = speechYL.voices[2];
    console.log(speechYL.getVoiceByName("Google UK English Female"));
    console.log(speechYL.getVoicesByLang("en-GB"));
}, 1000);
speechYL.loadJsonCommands('example/commandsGlobal.json');

speechYL.addCommand("Your name is", "My name is Oracle", null);