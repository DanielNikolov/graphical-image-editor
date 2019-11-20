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
        assert(result);
        assert.equal(imageGrid._imageGrid.length, 5);
        assert.equal(imageGrid._imageGrid[0].length, 5);
        assert.equal(imageGrid._imageGrid[0][0], 'o');
    });

    it('test - parsing invalid commands', () => {
        let result = true;
        try {
            imageGrid.processCommand('X 5 5');
        } catch (error) {
            result = false;
        }
        assert(!result);
    });

    it('test - draw vertical line', () => {
        let result = true;
        imageGrid.processCommand('I 5 5');
        imageGrid.processCommand('V 1 2 4 C');
        for (let i=1; i<4; i++) {
            result = result && (imageGrid._imageGrid[i][0] === 'C');
        }
        assert(result);
    });

    it('test - draw horizontal line', () => {
        let result = true;
        imageGrid.processCommand('I 5 5');
        imageGrid.processCommand('H 1 4 2 C');
        for (let i=1; i<4; i++) {
            result = result && (imageGrid._imageGrid[1][i] === 'C');
        }
        assert(result);
    });

    it('test - fill region', () => {
        let result = true;
        imageGrid.processCommand('I 5 5');
        imageGrid.processCommand('V 2 1 4 X');
        imageGrid.processCommand('V 4 1 4 X');
        imageGrid.processCommand('F 3 2 C');
        for (let i = 0; i < 5; i++) {
            result = result && (imageGrid._imageGrid[i][0] === 'C');
            result = result && (imageGrid._imageGrid[i][2] === 'C');
            result = result && (imageGrid._imageGrid[i][4] === 'C');
        }
        result = result && (imageGrid._imageGrid[4][1] === 'C');
        result = result && (imageGrid._imageGrid[4][3] === 'C');
        for (let i = 0; i < 4; i++) {
            result = result && (imageGrid._imageGrid[i][1] === 'X');
            result = result && (imageGrid._imageGrid[i][3] === 'X');
        }
        assert(result);
    });

    it('test - color pixel', () => {
        imageGrid.processCommand('I 5 5');
        imageGrid.processCommand('L 2 2 D');
        assert.equal(imageGrid._imageGrid[1][1], 'D')
    })

    it('test - parsing invalid params', () => {
        let result = true;
        try {
            imageGrid.processCommand('I 5 5');
            imageGrid.processCommand('V 5 5 5');
        } catch (error) {
            result = false;
        }
        assert(!result);
    });
})