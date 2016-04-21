/* globals require, describe, it, before, chai, SpeechYL */

var assert = chai.assert;

describe('Class Properties', function () {
    
    var speechYL = new SpeechYL();
    
    it('SpeechYL has the property : recognition', function () {
        assert.property(speechYL, 'recognition');
    });
        
    it('SpeechYL has the property : synthesis', function () {
        assert.property(speechYL, 'synthesis');
    });
        
    it('SpeechYL has the property : utterance', function () {
        assert.property(speechYL, 'utterance');
    });
    
    it('SpeechYL has the property : lastTranscript', function () {
        assert.property(speechYL, 'lastTranscript');
    });
    
    it('SpeechYL has the property : synthText', function () {
        assert.property(speechYL, 'synthText');
    });
    
    it('SpeechYL has the property : commands', function () {
        assert.property(speechYL, 'commands');
    });
    
    it('SpeechYL has the property : commandsFunc', function () {
        assert.property(speechYL, 'commandsFunc');
    });
    
    it('SpeechYL has the property : voices', function () {
        assert.property(speechYL, 'voices');
    });
    
    it('SpeechYL has the property : synthesisLang', function () {
        assert.property(speechYL, 'synthesisLang');
    });
    
    it('SpeechYL has the property : recognitionLang', function () {
        assert.property(speechYL, 'recognitionLang');
    });
    
    it('SpeechYL has the property : voice', function () {
        assert.property(speechYL, 'voice');
    });
    
    it('SpeechYL has the property : maxAlternatives', function () {
        assert.property(speechYL, 'maxAlternatives');
    });
    
    it('SpeechYL has the property : serviceURI', function () {
        assert.property(speechYL, 'serviceURI');
    });
    
    it('SpeechYL has the property : onaudiostart', function () {
        assert.property(speechYL, 'onaudiostart');
    });
    
    it('SpeechYL has the property : onaudioend', function () {
        assert.property(speechYL, 'onaudioend');
    });
    
    it('SpeechYL has the property : onend', function () {
        assert.property(speechYL, 'onend');
    });
    
    it('SpeechYL has the property : onerror', function () {
        assert.property(speechYL, 'onerror');
    });
    
    it('SpeechYL has the property : onnomatch', function () {
        assert.property(speechYL, 'onnomatch');
    });
    
    it('SpeechYL has the property : onresult', function () {
        assert.property(speechYL, 'onresult');
    });
    
    it('SpeechYL has the property : onsoundstart', function () {
        assert.property(speechYL, 'onsoundstart');
    });
    
    it('SpeechYL has the property : onsoundend', function () {
        assert.property(speechYL, 'onsoundend');
    });
    
    it('SpeechYL has the property : onspeechstart', function () {
        assert.property(speechYL, 'onspeechstart');
    });
    
    it('SpeechYL has the property : onspeechend', function () {
        assert.property(speechYL, 'onspeechend');
    });
    
    it('SpeechYL has the property : onstart', function () {
        assert.property(speechYL, 'onstart');
    });
    
    it('SpeechYL has the property : onvoiceschanged', function () {
        assert.property(speechYL, 'onvoiceschanged');
    });
    
});


describe('Class Properties Type', function () {
    
    var speechYL = new SpeechYL();
    
    it('Type of the property recognition is Object', function () {
        assert.equal('object', typeof speechYL.recognition);
    });
        
    it('Type of the property synthesis is Object', function () {
        assert.equal('object', typeof speechYL.synthesis);
    });
        
    it('Type of the property utterance is Object', function () {
        assert.equal('object', typeof speechYL.utterance);
    });
    
    it('Type of the property lastTranscript is String', function () {
        assert.typeOf(speechYL.lastTranscript, 'string');
    });
    
    it('Type of the property synthText is String', function () {
        assert.typeOf(speechYL.synthText, 'string');
    });
    
    it('Type of the property commands is Array', function () {
        assert.typeOf(speechYL.commands, 'array');
    });
    
    it('Type of the property commandsFunc is Null', function () {
        assert.typeOf(speechYL.commandsFunc, 'null');
    });
    
    it('Type of the property voices is Array', function () {
        assert.typeOf(speechYL.voices, 'array');
    });
    
    it('Type of the property synthesisLang is String', function () {
        assert.typeOf(speechYL.synthesisLang, 'string');
    });
    
    it('Type of the property recognitionLang is String', function () {
        assert.typeOf(speechYL.recognitionLang, 'string');
    });
    
    it('Type of the property voice is Object', function () {
        assert.equal('object', typeof speechYL.voice);
    });
    
    it('Type of the property maxAlternatives is Number', function () {
        assert.typeOf(speechYL.maxAlternatives, 'number');
    });
    
    it('Type of the property serviceURI is Undefined', function () {
        assert.typeOf(speechYL.serviceURI, 'undefined');
    });
    
    it('Type of the property onaudiostart is Object', function () {
        assert.equal('object', typeof speechYL.onaudiostart);
    });
    
    it('Type of the property onaudioend is Object', function () {
        assert.equal('object', typeof speechYL.onaudioend);
    });
    
    it('Type of the property onend is Object', function () {
        assert.equal('object', typeof speechYL.onend);
    });
    
    it('Type of the property onerror is Object', function () {
        assert.equal('object', typeof speechYL.onerror);
    });
    
    it('Type of the property onnomatch is Object', function () {
        assert.equal('object', typeof speechYL.onnomatch);
    });
    
    it('Type of the property onresult is function', function () {
        assert.equal('function', typeof speechYL.onresult);
    });
    
    it('Type of the property onsoundstart is Object', function () {
        assert.equal('object', typeof speechYL.onsoundstart);
    });
    
    it('Type of the property onsoundend is Object', function () {
        assert.equal('object', typeof speechYL.onsoundend);
    });
    
    it('Type of the property onspeechstart is Object', function () {
        assert.equal('object', typeof speechYL.onspeechstart);
    });
    
    it('Type of the property onspeechend is Object', function () {
        assert.equal('object', typeof speechYL.onspeechend);
    });
    
    it('Type of the property onstart is Object', function () {
        assert.equal('object', typeof speechYL.onstart);
    });
    
    it('Type of the property onvoiceschanged is function', function () {
        assert.equal('function', typeof speechYL.onvoiceschanged);
    });
    
});



describe('Constructor', function () {
    
    var speechYL = new SpeechYL();
    
    it('lastTtranscript should have the default value "" ', function () {
        assert.typeOf(speechYL.lastTranscript, 'string');
        assert.equal("", speechYL.lastTranscript);
    });
    
    it('synthText should have the default value "" ', function () {
        assert.typeOf(speechYL.synthText, 'string');
        assert.equal("", speechYL.synthText);
    });
    
    it('commands should have the default value [] ', function () {
        assert.isArray(speechYL.commands);
        assert.lengthOf(speechYL.commands, 0);
    });
    
    it('commandsFunc should have the default value null ', function () {
        assert.equal(null, speechYL.commandsFunc);
    });

});