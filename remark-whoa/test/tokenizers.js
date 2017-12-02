const should = require('chai').should();
const Remark = require('remark');
const whoa = require('../index.js');

const sampleWhoaText = require('./samples');

let remark = new Remark().use(whoa);

describe('block tokenizers', () => {
  describe('timeLapse', () => {
    const parsed = remark.parse(sampleWhoaText.timeLapse);
    const timeLapseNode = parsed.children[0];

    it('should create an object with type "timeLapse"', () => {
      timeLapseNode.type.should.equal('timeLapse');
    });

    it('should have the contents as its first child', () => {
      timeLapseNode.children[0].type.should.equal('text');
      timeLapseNode.children[0].value.should.equal('10 days later');
    });
  });
});

describe('inline tokenizers', () => {
  describe('normative', () => {
    const parsed = remark.parse(sampleWhoaText.normative);
    const childrenArr = parsed.children[0].children;
    const normativeNode = childrenArr[1];

    it('should create an object with type "normative"', () => {
      childrenArr.should.have.lengthOf(3);
      normativeNode.type.should.equal('normative');
    });

    it('should have an id starting with "normative-"', () => {
      normativeNode.id.should.include('normative-');
    });

    it('should have child with "I should"', () => {
      normativeNode.children[0].value.should.equal('I should ');
    });

    it('should have child with inner content', () => {
      normativeNode.children[1].value.should.equal('do this.');
    });
  });

  describe('redaction', () => {
    const parsed = remark.parse(sampleWhoaText.redaction);
    const childrenArr = parsed.children[0].children;
    const redactionNode = childrenArr[0];

    it('should create an object with type "redaction"', () => {
      childrenArr.should.have.lengthOf(1);
      redactionNode.type.should.equal('redaction');
    });

    it('should tokenize its inner value', () => {
      redactionNode.children.length.should.equal(2);
      redactionNode.children[0].type.should.equal('text');
      redactionNode.children[0].value.should.equal('redact me and this is ');
      redactionNode.children[1].type.should.equal('strong');
      redactionNode.children[1].children[0].value.should.equal('bold');
    });
  });

  describe('revision', () => {
    describe('with hint', () => {
      const parsed = remark.parse(sampleWhoaText.revision[0]);
      const childrenArr = parsed.children[0].children;
      const revisionNode = childrenArr[0];

      it('should create an object with type "revision"', () => {
        revisionNode.type.should.equal('revision');
      });

      it('should have the contents as its first child', () => {
        revisionNode.children[0].type.should.equal('text');
        revisionNode.children[0].value.should.equal(
          'Some text that needs revising.'
        );
      });

      it('should have the raw hint string as its second child', () => {
        revisionNode.children[1].should.equal('A hint.');
      });
    });

    describe('without hint', () => {
      const parsed = remark.parse(sampleWhoaText.revision[1]);
      const childrenArr = parsed.children[0].children;
      const revisionNode = childrenArr[0];

      it('should create an object with type "revision"', () => {
        revisionNode.type.should.equal('revision');
      });

      it('should have the contents as its first child', () => {
        revisionNode.children[0].type.should.equal('text');
        revisionNode.children[0].value.should.equal(
          'Some text that needs revising.'
        );
      });
    });
  });

  describe('search', () => {
    const parsed = remark.parse(sampleWhoaText.search);
    const childrenArr = parsed.children[0].children;
    const searchNode = childrenArr[0];

    it('should create an object with type "search"', () => {
      searchNode.type.should.equal('search');
    });

    it('should have the contents as its first child', () => {
      searchNode.children[0].type.should.equal('text');
      searchNode.children[0].value.should.equal('Search the google for me.');
    });
  });

  describe('tangent', () => {
    const parsed = remark.parse(sampleWhoaText.tangent);
    const childrenArr = parsed.children[0].children;
    const tangentNode = childrenArr[0];

    it('should create an object with type "tangent"', () => {
      tangentNode.type.should.equal('tangent');
    });

    it('should have the contents as its first child', () => {
      tangentNode.children[0].type.should.equal('text');
      tangentNode.children[0].value.should.equal('This is a tangent.');
    });
  });

  describe('wordChoice', () => {
    describe('with up to three words', () => {
      const parsed = remark.parse(sampleWhoaText.wordChoice[0]);
      const childrenArr = parsed.children[0].children;
      const wordChoiceNode = childrenArr[0];

      it('should create an object with type "wordChoice"', () => {
        wordChoiceNode.type.should.equal('wordChoice');
      });
      it('should work with three words', () => {
        wordChoiceNode.children.length.should.equal(3);
        wordChoiceNode.children[0].value.should.equal('use');
        wordChoiceNode.children[1].value.should.equal('write');
        wordChoiceNode.children[2].value.should.equal('say');
      });
    });

    describe('with just one word', () => {
      const parsed = remark.parse(sampleWhoaText.wordChoice[1]);
      const childrenArr = parsed.children[0].children;
      const wordChoiceNode = childrenArr[0];

      it('should create an object with type "wordChoice"', () => {
        wordChoiceNode.type.should.equal('wordChoice');
      });

      it('should work with one word', () => {
        wordChoiceNode.children[0].value.should.equal('befitting');
      });
    });
  });
});

describe('full length sample', () => {
  it('should parse', () => {
    const parsed = remark.parse(sampleWhoaText.heading);
  });
  it('should parse', () => {
    const parsed = remark.parse(sampleWhoaText.fullSample);
  });
});
