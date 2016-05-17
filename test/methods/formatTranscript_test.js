let expect = chai.expect;

describe('FormatTranscript Method', () => {
    
    let speechYL = new SpeechYL();
    let formatTranscript = speechYL.formatTranscript;
    
    it('should return a string', () => {
        expect(formatTranscript("Hello")).to.be.a('string');
    });
    
    it('should return null if parameter null', () => {
        expect(formatTranscript(null)).to.be.null;
    });
    
    it('should return null if parameter undefined', () => {
        expect(formatTranscript(null)).to.be.null;
    });
    
    it('should return null if parameter not a string', () => {
        expect(formatTranscript(["fer"])).to.be.null;
    });
    
    it('should return same string if already well format', () => {
        expect(formatTranscript("fer")).to.equal("fer");
        expect(formatTranscript("hello world")).to.equal("hello world");
    });
    
    it('should return same string if already well format', () => {
        expect(formatTranscript("fer")).to.equal("fer");
        expect(formatTranscript("hello world")).to.equal("hello world");
    });
    
    it('should remove the first chracter if it is a space', () => {
        expect(formatTranscript(" hello world")).to.equal("hello world");
    });
    
    it('should lowercase', () => {
        expect(formatTranscript("HELLO wOrlD")).to.equal("hello world");
    });
});