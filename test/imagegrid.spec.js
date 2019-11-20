import assert from 'assert';
import ImageGrid from '../src/js/imageGrid';

let imageGrid

describe('ImageGrid', function () {

    this.beforeEach(() => {
        imageGrid = new ImageGrid();
    })

    this.afterEach(() => {
        imageGrid = null;
    })

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

    it('test - reset grid', () => {
        imageGrid.processCommand('I 5 5')
        imageGrid.processCommand('C');
        assert.equal(imageGrid._imageGrid[0][0], 'o')
    });

    it('test - vertical draw lines no params', () => {
        let result = true;
        try {
            imageGrid.processCommand('I 5 5');
            imageGrid.processCommand('V 5 5 5');
        } catch (error) {
            result = false;
        }
        assert(!result);
    });

    it('test - vertical draw lines no grid', () => {
        let result = true;
        try {
            imageGrid.processCommand('V 5 5 5 C');
        } catch (error) {
            result = false;
        }
        assert(!result);
    });

    it('test - vertical draw lines invalid params', () => {
        let result = true;
        try {
            imageGrid.processCommand('I 5 5');
            imageGrid.processCommand('V C C C C');
        } catch (error) {
            result = false;
        }
        assert(!result);
    });

    it('test - error call create grid', () => {
        let result = true;
        try {
            imageGrid.processCommand('I 5');
        } catch (error) {
            result = false;
        }
        assert(!result);
    });

    it('test - error call create grid invalid params', () => {
        let result = true;
        try {
            imageGrid.processCommand('I A A');
        } catch (error) {
            result = false;
        }
        assert(!result);
    });

    it('test - error call reset grid', () => {
        let result = true;
        try {
            imageGrid.processCommand('C');
        } catch (error) {
            result = false;
        }
        assert(!result);
    });

    it('test - horizontal draw line no grid', () => {
        let result = true;
        try {
            imageGrid.processCommand('H 2 1 4 C');
        } catch (error) {
            result = false;
        }
        assert(!result);
    });

    it('test - horizontal draw line no params', () => {
        let result = true;
        try {
            imageGrid.processCommand('I 5 5');
            imageGrid.processCommand('H 2 1');
        } catch (error) {
            result = false;
        }
        assert(!result);
    });

    it('test - horizontal draw line invalid params', () => {
        let result = true;
        try {
            imageGrid.processCommand('I 5 5');
            imageGrid.processCommand('H A A A A');
        } catch (error) {
            result = false;
        }
        assert(!result);
    });

    it('test - fill region no params', () => {
        let result = true;
        try {
            imageGrid.processCommand('I 5 5');
            imageGrid.processCommand('F');
        } catch (error) {
            result = false;
        }
        assert(!result);
    });

    it('test - fill region no grid', () => {
        let result = true;
        try {
            imageGrid.processCommand('F 2 2 C');
        } catch (error) {
            result = false;
        }
        assert(!result);
    });

    it('test - fill region invalid params', () => {
        let result = true;
        try {
            imageGrid.processCommand('I 5 5');
            imageGrid.processCommand('F C C C');
        } catch (error) {
            result = false;
        }
        assert(!result);
    });

    it('test - color pixel no params', () => {
        let result = true;
        try {
            imageGrid.processCommand('I 5 5');
            imageGrid.processCommand('L');
        } catch (error) {
            result = false;
        }
        assert(!result);
    });

    it('test - color pixel no grid', () => {
        let result = true;
        try {
            imageGrid.processCommand('L 2 2 C');
        } catch (error) {
            result = false;
        }
        assert(!result);
    });

    it('test - color pixel invalid params', () => {
        let result = true;
        try {
            imageGrid.processCommand('I 5 5');
            imageGrid.processCommand('L C C C');
        } catch (error) {
            result = false;
        }
        assert(!result);
    });

    it('test - show grid no grid', () => {
        let result = true;
        try {
            imageGrid.processCommand('S');
        } catch (error) {
            result = false;
        }
        assert(!result);
    });
})