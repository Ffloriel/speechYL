/* Generated by Babel */
/* globals window, console, SpeechYWFunc, webkitSpeechRecognition, SpeechSynthesisUtterance */

/**
* Library Web Speech Recognition & Web Speech Synthesis
* @class SpeechYL
*/
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SpeechYL = (function () {

    /**
    * Default constructor
    * @example
    * let speechYL = new SpeechYL();
    */

    function SpeechYL() {
        var _this = this;

        _classCallCheck(this, SpeechYL);

        var speechRecognition = window.SpeechRecognition || webkitSpeechRecognition;

        if (speechRecognition) {
            /**
            * SpeechRecognition Object from Web API SpeechRecognition
            * @type {SpeechRecognition}
            */
            this.recognition = new speechRecognition();
        } else {
            throw "Your browser does not support the Web Speech API";
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
        * Object that contains recognition and speech commands.
        * @type {Object}
        */
        this.commands = null;
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
        this.onresult = function (e) {
            _this.actionData(e, _this.commands);
        };

        //Default onvoiceschanged
        this.onvoiceschanged = function (e) {
            _this.voices = _this.synthesis.getVoices();
        };
    }

    /**
     * Set lang for synthesis and recognition speech.
     * @param {string} lang Language ("en-EN", "fr-FR")
     */

    _createClass(SpeechYL, [{
        key: "setLang",
        value: function setLang(lang) {
            this.synthesisLang = lang;
            this.recognitionLang = lang;
        }

        /**
         * @ignore
         */
    }, {
        key: "synthCancel",

        /**
         * Removes all utterances from the utterance queue.
         */
        value: function synthCancel() {
            this.synthesis.cancel();
        }

        /**
         * Puts the SpeechSynthesis object into a paused state.
         */
    }, {
        key: "synthPause",
        value: function synthPause() {
            this.synthesis.pause();
        }

        /**
         * Puts the SpeechSynthesis object into a non-paused state: resumes it if it was already paused.
         */
    }, {
        key: "synthResume",
        value: function synthResume() {
            this.synthesis.resume();
        }

        /**
         * Stops the speech recognition service from listening to incoming audio, and doesn't attempt to return a SpeechRecognitionResult.
         */
    }, {
        key: "recogAbort",
        value: function recogAbort() {
            this.recognition.abort();
        }

        /**
         * Starts the speech recognition service listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
         */
    }, {
        key: "recogStart",
        value: function recogStart() {
            this.recognition.start();
        }

        /**
         * Stops the speech recognition service from listening to incoming audio, and attempts to return a SpeechRecognitionResult using the audio captured so far.
         */
    }, {
        key: "recogStop",
        value: function recogStop() {
            this.recognition.stop();
        }

        /**
         * Adds an utterance to the utterance queue; it will be spoken when any other utterances queued before it have been spoken.
         * @param {string} sentence The sentence that is said by the speech synthesis
         */
    }, {
        key: "speak",
        value: function speak(sentence) {
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
    }, {
        key: "say",
        value: function say(sentence) {
            this.utterance.text = sentence;
            this.synthesis.speak(this.utterance);
        }

        /**
        * Know if the word is said by the user
        * @method isWordSaid
        * @param {Object} event
        * @param {String} word
        * @return {Bool} Return true if the word is said by the user
        */
    }, {
        key: "isWordSaid",
        value: function isWordSaid(event, word) {
            var indexResult = event.resultIndex;

            for (indexResult; indexResult < event.results.length; indexResult += 1) {
                this.lastTranscript = this.formatTranscript(event.results[indexResult][0].transcript + " ");
                if (event.results[indexResult].isFinal && this.lastTranscript.includes(word + " ")) {
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
    }, {
        key: "isSentenceSaid",
        value: function isSentenceSaid(event, sentence) {
            var indexResult = event.resultIndex;
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
    }, {
        key: "saySentenceAfterRecognition",
        value: function saySentenceAfterRecognition(event, sentenceRecognition, sentenceSynthesis) {
            var indexResult = event.resultIndex;
            var transcript = undefined;
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
    }, {
        key: "saySentenceFromData",
        value: function saySentenceFromData(transcript, recogData) {
            var dataIndex = 0;
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
    }, {
        key: "launchFunc",
        value: function launchFunc(funcObj, recogSentence) {
            var type = arguments.length <= 2 || arguments[2] === undefined ? "normal" : arguments[2];

            var fn = this.commandsFunc[funcObj.func];
            var params = funcObj.funcParameters;
            var transcript = undefined;
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
                throw "SpeechYL : function " + funcObj.func + " not found.";
            }
        }

        /**
         * @access private
         * Get synthesis sentence based on weight and language
         * @param   {Array}  synthesisArray Synthesis Array
         * @returns {string} Sentence synthesis
         */
    }, {
        key: "getSynthesisSentence",
        value: function getSynthesisSentence(synthesisArray) {
            var weightTotal = this.computeTotalWeight(synthesisArray);
            var random = Math.random() * weightTotal;
            var weight = 0;
            var i = 0;
            for (i; i < synthesisArray.length; i += 1) {
                weight += synthesisArray[i].weight;
                if (random < weight) {
                    return synthesisArray[i][this.utterance.lang];
                }
            }
            throw "SpeechYW : getSynthesisError.";
        }

        /**
         * @access private
         * Get name of the function based on weight
         * @param   {Array}  funcArray Functions Array
         * @returns {string} Name of the function
         */
    }, {
        key: "getFunction",
        value: function getFunction(funcArray) {
            var weightTotal = this.computeTotalWeight(funcArray);
            var random = Math.random() * weightTotal;
            var weight = 0;
            var i = 0;
            for (i; i < funcArray.length; i += 1) {
                weight += funcArray[i].weight;
                if (random < weight) {
                    return funcArray[i];
                }
            }
            throw "SpeechYW : getFunctionError.";
        }

        /**
         * @access private
         * Format the transcript (lowercase and first space remove)
         * @param   {string} transcript Text to format
         * @returns {string} Return text formated
         */
    }, {
        key: "formatTranscript",
        value: function formatTranscript(transcript) {
            if (transcript === null) {
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
    }, {
        key: "actionDataType",
        value: function actionDataType(event, recogData) {
            var type = arguments.length <= 2 || arguments[2] === undefined ? "normal" : arguments[2];

            var eventResult = undefined,
                data = undefined,
                synthesis = undefined,
                funcObj = undefined,
                recogSentence = undefined;
            for (var i = 0; i < event.results.length; i += 1) {
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
    }, {
        key: "actionData",
        value: function actionData(event, recogData) {
            this.actionDataType(event, recogData, "normal");
        }

        /**
         * Launch actions if the beginning of the recognition sentence from the data is recognize
         * @param {object} event           Event from SpeechRecognition
         * @param {object} recogData Array of single recognition data
         */
    }, {
        key: "actionDataStart",
        value: function actionDataStart(event, recogData) {
            this.actionDataType(event, recogData, "start");
        }

        /**
         * Launch actions if a part of the recognition sentence from the data is recognize
         * @param {object} event           Event from SpeechRecognition
         * @param {object} recogData Array of single recognition data
         */
    }, {
        key: "actionDataInclude",
        value: function actionDataInclude(event, recogData) {
            this.actionDataType(event, recogData, "include");
        }

        /**
         * @access private
         * Compute the total weight of an array of object
         * @param   {Array}  objectArray Array of objects
         * @returns {number} The total weight of the array
         */
    }, {
        key: "computeTotalWeight",
        value: function computeTotalWeight(objectArray) {
            var i = 0;
            var weight = 0;
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
    }, {
        key: "retrieveData",
        value: function retrieveData(recogData) {
            var _this2 = this;

            var type = arguments.length <= 1 || arguments[1] === undefined ? "normal" : arguments[1];

            var data = undefined;
            switch (type) {
                case "normal":
                    data = recogData.find(function (data) {
                        return _this2.lastTranscript === _this2.retrieveRecognitionSentence(data);
                    });
                    break;
                case "start":
                    data = recogData.find(function (data) {
                        return _this2.lastTranscript.startsWith(_this2.retrieveRecognitionSentence(data));
                    });
                    break;
                case "include":
                    data = recogData.find(function (data) {
                        return _this2.lastTranscript.includes(_this2.retrieveRecognitionSentence(data));
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
    }, {
        key: "retrieveSynthesis",
        value: function retrieveSynthesis(data) {
            var synthesis = null;
            if (!data.synthesis) {
                synthesis = null;
            } else if (data.synthesis instanceof Array) {
                synthesis = this.getSynthesisSentence(data.synthesis);
            } else if (data.synthesis instanceof Object) {
                synthesis = data.synthesis[this.utterance.lang];
            } else if (typeof data.synthesis === "string") {
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
    }, {
        key: "retrieveFunction",
        value: function retrieveFunction(data) {
            var funcObj = null;
            if (!data.func) {
                funcObj = null;
            } else if (data.func instanceof Array) {
                funcObj = this.getFunction(data.func);
            } else if (data.func instanceof Object) {
                funcObj = data.func;
            } else if (typeof data.func === "string") {
                funcObj = { func: data.func, funcParameters: [] };
            }
            return funcObj;
        }

        /**
         * @access private
         * Retrieve the synthesis 
         * @param   {object} data Single Recognition Data
         * @returns {string} Recognition sentence
         */
    }, {
        key: "retrieveRecognitionSentence",
        value: function retrieveRecognitionSentence(data) {
            var recognition = null;
            if (data.recognition instanceof Object) {
                recognition = data.recognition[this.recognition.lang];
            } else if (typeof data.recognition === "string") {
                recognition = data.recognition;
            }
            return this.formatTranscript(recognition);
        }
    }, {
        key: "synthesisLang",
        get: function get() {
            return this.utterance.lang;
        },

        /**
        * Set the language for speech synthesis (ex : "en-EN", "fr-FR")
        * @type {string}
        */
        set: function set(v) {
            this.utterance.lang = v;
        }

        /**
         * @ignore
         */
    }, {
        key: "recognitionLang",
        get: function get() {
            return this.recognition.lang;
        },

        /**
        * Set the language for speech recognition (ex : "en-EN", "fr-FR")
        * @type {string}
        */
        set: function set(v) {
            this.recognition.lang = v;
        }

        /**
         * @ignore
         */
    }, {
        key: "voice",
        get: function get() {
            return this.utterance.voice;
        },

        /**
        * Set the language for speech synthesis (ex : "en-EN", "fr-FR")
        * @type {string}
        */
        set: function set(v) {
            this.utterance.voice = v;
        }

        /**
         * @ignore
         */
    }, {
        key: "maxAlternatives",
        get: function get() {
            return this.recognition.maxAlternatives;
        },

        /**
        * Sets the maximum number of SpeechRecognitionAlternatives provided per result. The default value is 1.
        * @type {number}
        */
        set: function set(v) {
            this.recognition.maxAlternatives = v;
        }

        /**
         * @ignore
         */
    }, {
        key: "serviceURI",
        get: function get() {
            return this.recognition.serviceURI;
        },

        /**
        * Specifies the location of the speech recognition service used by the current SpeechRecognition
        * to handle the actual recognition. The default is the user agent's default speech service.
        * @type {DOMString}
        */
        set: function set(v) {
            this.recognition.serviceURI = v;
        }

        /**
         * Fired when the user agent has started to capture audio.
         * @listens {audiostart}
         * @type {function}
         */
    }, {
        key: "onaudiostart",
        set: function set(f) {
            this.recognition.onaudiostart = f;
        },

        /**
        * Fired when the user agent has finished capturing audio.
        * @listens {audioend}
        * @type {function}
        */

        /**
         * @ignore
         */
        get: function get() {
            return this.recognition.onaudiostart;
        }

        /**
         * @ignore
         */
    }, {
        key: "onaudioend",
        set: function set(f) {
            this.recognition.onaudioend = f;
        },

        /**
        * Fired when the speech recognition service has disconnected.
        * @listens {end}
        * @type {function}
        */
        get: function get() {
            return this.recognition.onaudioend;
        }

        /**
         * @ignore
         */
    }, {
        key: "onend",
        set: function set(f) {
            this.recognition.onend = f;
        },

        /**
        * Fired when a speech recognition error occurs.
        * @listens {error}
        * @type {function}
        */
        get: function get() {
            return this.recognition.onend;
        }

        /**
         * @ignore
         */
    }, {
        key: "onerror",
        set: function set(f) {
            this.recognition.onerror = f;
        },

        /**
        * Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
        * @listens {nomatch}
        * @type {function}
        */
        get: function get() {
            return this.recognition.onerror;
        }

        /**
         * @ignore
         */
    }, {
        key: "onnomatch",
        set: function set(f) {
            this.recognition.onnomatch = f;
        },

        /**
        * Fired when the speech recognition service returns a result — a word or phrase has been positively recognized and this has been communicated back to the app.
        * @listens {result}
        * @type {function}
        */
        get: function get() {
            return this.recognition.onnomatch;
        }

        /**
         * @ignore
         */
    }, {
        key: "onresult",
        set: function set(f) {
            this.recognition.onresult = f;
        },

        /**
        * Fired when any sound — recognisable speech or not — has been detected.
        * @listens {soundstart}
        * @type {function}
        */
        get: function get() {
            return this.recognition.onresult;
        }

        /**
         * @ignore
         */
    }, {
        key: "onsoundstart",
        set: function set(f) {
            this.recognition.onsoundstart = f;
        },

        /**
        * Fired when any sound — recognisable speech or not — has stopped being detected.
        * @listens {soundend}
        * @type {function}
        */
        get: function get() {
            return this.recognition.onsoundstart;
        }

        /**
         * @ignore
         */
    }, {
        key: "onsoundend",
        set: function set(f) {
            this.recognition.onsoundend = f;
        },

        /**
        * Fired when sound that is recognised by the speech recognition service as speech has been detected.
        * @listens {speechstart}
        * @type {function}
        */
        get: function get() {
            return this.recognition.onsoundend;
        }

        /**
         * @ignore
         */
    }, {
        key: "onspeechstart",
        set: function set(f) {
            this.recognition.onspeechstart = f;
        },

        /**
        * Fired when speech recognised by the speech recognition service has stopped being detected.
        * @listens {speechend}
        * @type {function}
        */
        get: function get() {
            return this.recognition.onspeechstart;
        }

        /**
         * @ignore
         */
    }, {
        key: "onspeechend",
        set: function set(f) {
            this.recognition.onspeechend = f;
        },

        /**
        * Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
        * @type {function}
        */
        get: function get() {
            return this.recognition.onspeechend;
        }

        /**
         * @ignore
         */
    }, {
        key: "onstart",
        set: function set(f) {
            this.recognition.onstart = f;
        },

        /**
        * Fired when the list of SpeechSynthesisVoice objects that would be returned by the SpeechSynthesis.getVoices() method has changed.
        * @type {function}
        */
        get: function get() {
            return this.recognition.onstart;
        }

        /**
         * @ignore
         */
    }, {
        key: "onvoiceschanged",
        set: function set(f) {
            this.synthesis.onvoiceschanged = f;
        },
        get: function get() {
            return this.synthesis.onvoiceschanged;
        }
    }]);

    return SpeechYL;
})();