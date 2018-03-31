const FigmaStrategy = require('../lib/strategy');

describe('Strategy test', () => {
    const strategy = new FigmaStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret'
    }, () => {});

    it('should be named figma', () => {
        expect(strategy.name).toBe('figma');
    });

    it('should default to file_read scope', () => {
        expect(strategy._scope).toEqual(['file_read']);
    });
});