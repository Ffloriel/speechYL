/**
* Library Web Speech Recognition & Web Speech Synthesis
* @class SpeechYL
*/
class SpeechYL{
    
    /**
    * Default constructor
    * @example
    * let speechYL = new SpeechYL();
    */
    constructor() {
        let speechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
        
        if (speechRecognition) {
            /**
            * SpeechRecognition Object from Web API SpeechRecognition
            * @type {SpeechRecognition}
            */
            this.recognition = new speechRecognition();
        } else {
            throw("Your browser does not support the Web Speech API");
        }
        
        /**
        * SpeechSynthesis Object from Web API SpeechSynthesis
        * @type {SpeechSynthesis}
        */
        this.synthesis = window.speechSynthesis;
        /**
        * SpeechSynthesisUtterance Object from Web API SpeechSynthesis
        * @type {SpeechSynthesisUtterance}
        */
        this.utterance = new SpeechSynthesisUtterance();
        /**
        * The last transcript from SpeechRecognition
        * @type {String} 
        */
        this.lastTranscript = "";
        /**
        * The last text from SpeechSynthesis
        * @type {String} 
        */
        this.synthText = "";
        
        /**
        * Array that contains recognition and speech commands.
        * @type {Array}
        */
        this.commands = [];
        /**
        * Object that contains all functions listed in 'commands' object
        * @type {Object}
        */
        this.commandsFunc = null;
        
        /**
        * List of SpeechSynthesisVoice objects representing all the available voices on the current device.
        * @type {Array<SpeechSynthesisVoice>}
        */
         
        this.voices = this.synthesis.getVoices();
        
        //Default onresult
        this.onresult = e => {
            this.actionData(e, this.commands);
        };
        
        //Default onvoiceschanged
        this.onvoiceschanged = e => {
            this.voices = this.synthesis.getVoices();
        };
    }
    
    /**
     * Set lang for synthesis and recognition speech.
     * @param {string} lang Language ("en-EN", "fr-FR")
     */
    setLang(lang) {
        this.synthesisLang = lang;
        this.recognitionLang = lang;
    }
    
    /**
     * @ignore
     */
    get synthesisLang() {
        return this.utterance.lang;
    }
    
    /**
    * Set the language for speech synthesis (ex : "en-EN", "fr-FR")
    * @type {string}
    */
    set synthesisLang(v) {
        this.utterance.lang = v;
    }
    
    /**
     * @ignore
     */
    get recognitionLang() {
        return this.recognition.lang;
    }
    
    /**
    * Set the language for speech recognition (ex : "en-EN", "fr-FR")
    * @type {string}
    */
    set recognitionLang(v) {
        this.recognition.lang = v;
    }
    
    /**
     * @ignore
     */
    get voice() {
        return this.utterance.voice;
    }
    
    /**
    * Set the language for speech synthesis (ex : "en-EN", "fr-FR")
    * @type {string}
    */
    set voice (v) {
        this.utterance.voice = v;
    }
    
    /**
     * @ignore
     */
    get maxAlternatives() {
        return this.recognition.maxAlternatives;
    }
    
    /**
    * Sets the maximum number of SpeechRecognitionAlternatives provided per result. The default value is 1.
    * @type {number}
    */
    set maxAlternatives(v) {
        this.recognition.maxAlternatives = v;
    }
    
    /**
     * @ignore
     */
    get serviceURI() {
        return this.recognition.serviceURI;
    }
    /**
    * Specifies the location of the speech recognition service used by the current SpeechRecognition
    * to handle the actual recognition. The default is the user agent's default speech service.
    * @type {DOMString}
    */
    set serviceURI(v) {
        this.recognition.serviceURI = v;
    }
    
   /**
    * Fired when the user agent has started to capture audio.
    * @listens {audiostart}
    * @type {function}
    */
    set onaudiostart(f) {
        this.recognition.onaudiostart = f;
    }
    
    /**
    * Fired when the user agent has finished capturing audio.
    * @listens {audioend}
    * @type {function}
    */
    set onaudioend(f) {
        this.recognition.onaudioend = f;
    }
    
    /**
    * Fired when the speech recognition service has disconnected.
    * @listens {end}
    * @type {function}
    */
    set onend(f) {
        this.recognition.onend = f;
    }
    
    /**
    * Fired when a speech recognition error occurs.
    * @listens {error}
    * @type {function}
    */
    set onerror(f) {
        this.recognition.onerror = f;
    }
    
    /**
    * Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
    * @listens {nomatch}
    * @type {function}
    */
    set onnomatch(f) {
        this.recognition.onnomatch = f;
    }
    
    /**
    * Fired when the speech recognition service returns a result — a word or phrase has been positively recognized and this has been communicated back to the app.
    * @listens {result}
    * @type {function}
    */
    set onresult(f) {
        this.recognition.onresult = f;
    }
    
    /**
    * Fired when any sound — recognisable speech or not — has been detected.
    * @listens {soundstart}
    * @type {function}
    */
    set onsoundstart(f) {
        this.recognition.onsoundstart = f;
    }
    
    /**
    * Fired when any sound — recognisable speech or not — has stopped being detected.
    * @listens {soundend}
    * @type {function}
    */
    set onsoundend(f) {
        this.recognition.onsoundend = f;
    }
    
    /**
    * Fired when sound that is recognised by the speech recognition service as speech has been detected.
    * @listens {speechstart}
    * @type {function}
    */
    set onspeechstart(f) {
        this.recognition.onspeechstart = f;
    }
    
    /**
    * Fired when speech recognised by the speech recognition service has stopped being detected.
    * @listens {speechend}
    * @type {function}
    */
    set onspeechend(f) {
        this.recognition.onspeechend = f;
    }
    
    /**
    * Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
    * @type {function}
    */
    set onstart(f) {
        this.recognition.onstart = f;
    }
    
    /**
    * Fired when the list of SpeechSynthesisVoice objects that would be returned by the SpeechSynthesis.getVoices() method has changed.
    * @type {function}
    */
    set onvoiceschanged(f) {
        this.synthesis.onvoiceschanged = f;
    }
    
    /**
     * @ignore
     */
    get onaudiostart() {
        return this.recognition.onaudiostart;
    }
    
    /**
     * @ignore
     */
    get onaudioend() {
        return this.recognition.onaudioend;
    }
    
    /**
     * @ignore
     */
    get onend() {
        return this.recognition.onend;
    }
    
    /**
     * @ignore
     */
    get onerror() {
        return this.recognition.onerror;
    }
    
    /**
     * @ignore
     */
    get onnomatch() {
        return this.recognition.onnomatch;
    }
    
    /**
     * @ignore
     */
    get onresult() {
        return this.recognition.onresult;
    }
    
    /**
     * @ignore
     */
    get onsoundstart() {
        return this.recognition.onsoundstart;
    }
    
    /**
     * @ignore
     */
    get onsoundend() {
        return this.recognition.onsoundend;
    }
    
    /**
     * @ignore
     */
    get onspeechstart() {
        return this.recognition.onspeechstart;
    }
    
    /**
     * @ignore
     */
    get onspeechend() {
        return this.recognition.onspeechend;
    }
    
    /**
     * @ignore
     */
    get onstart() {
        return this.recognition.onstart;
    }
    
    /**
     * @ignore
     */
    get onvoiceschanged() {
        return this.synthesis.onvoiceschanged;
    }
    
    /**
     * Removes all utterances from the utterance queue.
     */
    synthCancel() {
        this.synthesis.cancel();
    }
    
    /**
     * Puts the SpeechSynthesis object into a paused state.
     */
    synthPause() {
        this.synthesis.pause();
    }
    
    /**
     * Puts the SpeechSynthesis object into a non-paused state: resumes it if it was already paused.
     */
    synthResume() {
        this.synthesis.resume();
    }
    
    /**
     * Stops the speech recognition service from listening to incoming audio, and doesn't attempt to return a SpeechRecognitionResult.
     */
    recogAbort() {
        this.recognition.abort();
    }
    
    /**
     * Starts the speech recognition service listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
     */
    recogStart() {
        this.recognition.start();
    }
    
    /**
     * Stops the speech recognition service from listening to incoming audio, and attempts to return a SpeechRecognitionResult using the audio captured so far.
     */
    recogStop() {
        this.recognition.stop();
    }
    
    /**
     * Adds an utterance to the utterance queue; it will be spoken when any other utterances queued before it have been spoken.
     * @param {string} sentence The sentence that is said by the speech synthesis
     */
    speak(sentence) {
        this.synthText = sentence;
        this.utterance.text = sentence;
        this.synthesis.speak(this.utterance);
    }
    
    /**
    * Say a sentence using speech synthesis
    * @param {String} sentence The sentence that is said by the speech synthesis
    * @example
    * let speechYL = new SpeechYL();
    * speechYL.say("Hello world!");
    */
    say(sentence) {
        this.synthText = sentence;
        this.utterance.text = sentence;
        this.synthesis.speak(this.utterance);
        return this;
    }

    /**
    * Know if the word is said by the user
    * @method isWordSaid
    * @param {Object} event
    * @param {String} word
    * @return {Bool} Return true if the word is said by the user
    */
    isWordSaid(event, word) {
        let indexResult = event.resultIndex;
        
        for (indexResult; indexResult < event.results.length; indexResult += 1) {
            this.lastTranscript = this.formatTranscript(`${event.results[indexResult][0].transcript} ` );
            if (event.results[indexResult].isFinal && this.lastTranscript.includes(`${word} `)) {
                return true;
            }
        }
        return false;
    }
    
    /**
    * Know if the sentence is said by the user
    * @method isSentenceSaid
    * @param {Object} event Event from SpeechRecognition
    * @param {String} sentence Sentence that is said
    * @return {Bool} Return true if the sentence is said by the user
    */
    isSentenceSaid(event, sentence) {
        let indexResult = event.resultIndex;
        for (indexResult; indexResult < event.results.length; indexResult += 1) {
            this.lastTranscript = this.formatTranscript(event.results[indexResult][0].transcript);
            if (event.results[indexResult].isFinal) {
                if (this.lastTranscript === sentence) {
                    return true;
                }
            }
        }
        return false;
    }
    
    /**
    * Say sentence if the recognition sentence is recognize
    * @param {Object} event Event from SpeechRecognition
    * @param {String} sentenceRecognition Sentence said by the user and recognize
    * @param {String} sentenceSynthesis Sentence said by speech synthesis
    * @return {Bool} Return true if the sentence is said by the user
    */
    saySentenceAfterRecognition(event, sentenceRecognition, sentenceSynthesis) {
        let indexResult = event.resultIndex;
        let transcript;
        for (indexResult; indexResult < event.results.length; indexResult += 1) {
            this.lastTranscript = this.formatTranscript(event.results[indexResult][0].transcript);
            
            if (this.lastTranscript === sentenceRecognition) {
                this.say(sentenceSynthesis);
                return true;
            }
        }
        return false;
    }
    
    /**
    * Execute action if the transcript is in the data
    * @param {String} transcript Transcript
    * @param {Object} recogData 
    * @return {Bool} Return true if the transcript is in the data
    */
    saySentenceFromData(transcript, recogData) {
        let dataIndex = 0;
        for (dataIndex; dataIndex < recogData.length; dataIndex += 1) {
            if (transcript === recogData[dataIndex].recognition.toLowerCase()) {

                //Sunthesis
                if (recogData[dataIndex].synthesis && recogData[dataIndex].synthesis !== "") {
                    this.say(recogData[dataIndex].synthesis);
                }

                //Functions
                if (recogData[dataIndex].func) {
                    this.launchFunc(recogData[dataIndex].func, recogData[dataIndex].funcParameters);
                }


                return true;
            }
        }
        return false;
    }

    /**
     * Execute function in commandsFunc
     * @param {object} funcObj       Function object
     * @param {string} recogSentence Recognition sentence
     * @param {string} [type="normal"] Type (normal or start)
     */
    launchFunc(funcObj, recogSentence, type = "normal") {
        let fn = this.commandsFunc[funcObj.func];
        let params = funcObj.funcParameters;
        let transcript;
        if (typeof fn === "function") {
            if (!params) {
                params = [];
            }
            if (type === "start") {
                transcript = this.lastTranscript.slice(recogSentence.length + 1);
                params.unshift(transcript);
            }
            fn.apply(null, params);
            
        } else {
            throw(`SpeechYL : function ${funcObj.func} not found.`);
        }
        
    }
    
    /**
     * @access private
     * Get synthesis sentence based on weight and language
     * @param   {Array}  synthesisArray Synthesis Array
     * @returns {string} Sentence synthesis
     */
    getSynthesisSentence(synthesisArray) {
        let weightTotal = this.computeTotalWeight(synthesisArray);
        let random = Math.random() * weightTotal;
        let weight = 0;
        let i = 0;
        for (i; i < synthesisArray.length; i += 1) {
            weight += synthesisArray[i].weight;
            if (random < weight) {
                return synthesisArray[i][this.utterance.lang];
            }
        }
        throw("SpeechYW : getSynthesisError.");
    }
    
    /**
     * @access private
     * Get name of the function based on weight
     * @param   {Array}  funcArray Functions Array
     * @returns {string} Name of the function
     */
    getFunction(funcArray) {
        let weightTotal = this.computeTotalWeight(funcArray);
        let random = Math.random() * weightTotal;
        let weight = 0;
        let i = 0;
        for (i; i < funcArray.length; i += 1) {
            weight += funcArray[i].weight;
            if (random < weight) {
                return funcArray[i];
            }
        }
        throw("SpeechYW : getFunctionError.");
    }
    
    /**
     * @access private
     * Format the transcript (lowercase and first space remove)
     * @param   {string} transcript Text to format
     * @returns {string} Return text formated
     */
    formatTranscript(transcript) {
        if (typeof transcript !== "string") {
            return null;
        }
        transcript = transcript.toLowerCase();
        if (transcript.charAt(0) === " ") {
            transcript = transcript.slice(1);
        }
        return transcript;
    }
    
    /**
     * Launch actions if the recognition sentence from the data is recognize
     * @param {object} event           Event from SpeechRecognition
     * @param {object} recogData Array of single recognition data
     * @param {string} [type=normal] (normal, start or include)
     */
    actionDataType(event, recogData, type = "normal") {
        let eventResult,
            data,
            synthesis,
            funcObj,
            recogSentence;
        for (let i = 0; i < event.results.length; i += 1) {
            eventResult = event.results[i];
            this.lastTranscript = this.formatTranscript(eventResult[0].transcript);
            
            data = this.retrieveData(recogData, type);
            
            if (data !== null && data !== undefined) {
                recogSentence = this.retrieveRecognitionSentence(data);
                //Synthesis
                synthesis = this.retrieveSynthesis(data);
                if (synthesis !== null) {
                    this.say(synthesis);
                }
                //Functions
                funcObj = this.retrieveFunction(data);
                if (funcObj !== null) {
                    this.launchFunc(funcObj, recogSentence, type);
                }
                
                return true;
            }
        }
        return false;
    }
    
    /**
     * Launch actions if the recognition sentence from the data is recognize
     * @param {object} event           Event from SpeechRecognition
     * @param {object} recogData Array of single recognition data
     */
    actionData(event, recogData) {
        this.actionDataType(event, recogData, "normal");
    }
    
    /**
     * Launch actions if the beginning of the recognition sentence from the data is recognize
     * @param {object} event           Event from SpeechRecognition
     * @param {object} recogData Array of single recognition data
     */
    actionDataStart(event, recogData) {
        this.actionDataType(event, recogData, "start");
    }
    
    /**
     * Launch actions if a part of the recognition sentence from the data is recognize
     * @param {object} event           Event from SpeechRecognition
     * @param {object} recogData Array of single recognition data
     */
    actionDataInclude(event, recogData) {
        this.actionDataType(event, recogData, "include");
    }
    
    /**
     * @access private
     * Compute the total weight of an array of object
     * @param   {Array}  objectArray Array of objects
     * @returns {number} The total weight of the array
     */
    computeTotalWeight(objectArray) {
        let i = 0;
        let weight = 0;
        for (i; i < objectArray.length; i += 1) {
            weight += objectArray[i].weight;
        }
        return weight;
    }
    
    /**
     * @access private
     * Retrieve data based on the type (normal, start, include)
     * @param   {object} recogData Data from the recognition object
     * @param   {string} [type="normal"] Type (normal, start or include)
     * @returns {object} Data
     */
    retrieveData(recogData, type = "normal") {
        let data;
        switch (type) {
            case "normal":
                data = recogData.find(data => {
                    return this.lastTranscript === this.retrieveRecognitionSentence(data);
                });
                break;
            case "start":
                data = recogData.find(data => {
                    return this.lastTranscript.startsWith(this.retrieveRecognitionSentence(data));
                });
                break;
            case "include":
                data = recogData.find(data => {
                    return this.lastTranscript.includes(this.retrieveRecognitionSentence(data));
                });
                break;
            default:
                data = null;
                break;
        }
        return data;
    }
    
    /**
     * @access private
     * Retrieve the synthesis 
     * @param   {object} data Single Recognition Data
     * @returns {string} Text of utterance to synthesis
     */
    retrieveSynthesis(data) {
        let synthesis = null;
        if (!data.synthesis) {
            synthesis = null;
        } else if (data.synthesis instanceof Array) {
            synthesis = this.getSynthesisSentence(data.synthesis);
        } else if (data.synthesis instanceof Object) {
            synthesis = data.synthesis[this.utterance.lang];
        } else if (typeof data.synthesis === "string"){
            synthesis = data.synthesis;
        }
        return synthesis;
    }
    
    /**
     * @access private
     * Retrieve the function
     * @param   {object} data Single Recognition Data
     * @returns {string} Name of the function
     */
    retrieveFunction(data) {
        let funcObj = null;
        if (!data.func) {
            funcObj = null;
        } else if (data.func instanceof Array) {
            funcObj = this.getFunction(data.func);
        } else if (data.func instanceof Object) {
            funcObj = data.func;
        } else if (typeof data.func === "string") {
            funcObj = {func: data.func, funcParameters: []};
        }
        return funcObj;
    }
    
    /**
     * @access private
     * Retrieve the synthesis 
     * @param   {object} data Single Recognition Data
     * @returns {string} Recognition sentence
     */
    retrieveRecognitionSentence(data) {
        let recognition = null;
        if (data.recognition instanceof Object) {
            recognition = data.recognition[this.recognition.lang];
        } else if (typeof data.recognition === "string") {
            recognition = data.recognition;
        }
        return this.formatTranscript(recognition);
    }
    
    /**
     * @access private
     * Get a JSON File
     * @param   {string}  url Url of the json file
     * @returns {Promise} Promise
     */
    getJson(url) {
        return new Promise( (resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open('Get', url);
            request.onload = () => {
                if (request.status === 200) {
                    resolve(request.response);
                } else {
                    reject(new Error(`Data did not load successfully; Error code: ${request.statusText}`));
                }
            };
            request.onerror = () => {
                reject(new Error('Data did not load successfully; Network error.'));
            };
            request.send();
        });
    }
    
    /**
     * Load commands from a json file
     * @throws {TypeError} JSON object is not an array
     * @param {string} url Url of the json file
     */
    loadJsonCommands(url) {
        let commands;
        this.getJson(url).then( (data) => {
            commands = JSON.parse(data);
            if (!(commands instanceof Array)) {
                throw new TypeError("Json data must be an Array");
            } else {
                this.commands = this.commands.concat(commands);
            }
        }, (e) => {
            throw e;
        });
    }
    
    /**
     * Return a voice with the specified name
     * @param   {string}               name Name of the voice
     * @returns {SpeechSynthesisVoice} Voice
     */
    getVoiceByName(name) {
        return this.voices.find( voice => {
            return voice.name === name;
        });
    }
    
    /**
     * Return an array of voices corresponding to the specified langage
     * @param   {string} lang Lang of the voices
     * @returns {Array}  Array of voices
     */
    getVoicesByLang(lang) {
        return this.voices.filter(voice => {
            return voice.lang === lang;
        });
    }
    
    
    /**
     * Return a command object 
     * @param   {string          |           Array}   recognition Recognition string or array
     * @param   {string          |           Array}       synthesis   Synthesis string or array
     * @param   {string}         func        Name of the function
     * @returns {object}         Command object
     */
    createCommands(recognition, synthesis, func) {
        return {
            recognition,
            synthesis,
            func
        };
    }
    
    /**
     * Add a command
     * @param   {string          |           Array}   recognition Recognition string or array
     * @param   {string          |           Array}       synthesis   Synthesis string or array
     * @param   {string}         func        Name of the function
     */
    addCommand(recognition, synthesis, func) {
        this.commands.push({
            recognition,
            synthesis,
            func
        });
    }
    
}



//export default SpeechYL;
