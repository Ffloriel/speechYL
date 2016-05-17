let expect = chai.expect;

describe('Retrieve Methods', () => {
    
    let speechYL = new SpeechYL();
    let formatTranscript = speechYL.formatTranscript;
    
    describe('retrieveRecognitionSentence', () => {
        it('should return null: recognition do not exist');
        it('should return null: recognition is not object or array');
        it('should return null: recognition is not in lang');
        
        it('should return the only recognition');
        it('should return in the specific language: fr-FR');
    });
    
    describe('retrieveFunction', () => {
        it('should return null: func not exist');
        it('should return null: synthesis not object or array');
        it('should return null: weight total is 0');
        
        it('should return the only func');
        it('should return an array of func');
        it('should return an object of func');
    });
    
    describe('retrieveSynhesis', () => {
        it('should return null: synthesis do not exist');
        it('should return null: synthesis is not object or array');
        it('should return null: synthesis is not in lang');
        
        it('should return the only synthesis');
        it('should return in the specific language: fr-FR');
    });
    
    describe('computeTotalWeight', () => {
        it('should return 0 if objectArray is not an array');
        it('should return 0');
        it('should return 38');
        it('should return 30, ignore func which weight inferior to 0');
    });

});