import assert from 'assert';
import ImageGrid from '../src/js/imageGrid';

let imageGrid = new ImageGrid();

describe('ImageGrid', function () {
    it('test - parsing commands', () => {
        let result = true;
        try {
            imageGrid.processCommand('I 5 5');
        } catch (error) {
            result = false;
        }
        assert(!result);
    });
})
