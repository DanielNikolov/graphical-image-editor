const numberRegex = /\d+/;
const colorRegex = /^.{1}$/;
const maxGridSize = 250;

let operationsConfig = {
    i: 'createGrid',
    c: 'resetGrid',
    l: 'colorPixel',
    v: 'drawVLine',
    h: 'drawHLine',
    f: 'fillRegion',
    s: 'showGrid'
};

let isValidSize = (sizeValue, maxValue) => {
    if (!numberRegex.test(sizeValue)) {
        return false;
    }
    let sizeValueInt = parseInt(sizeValue, 10);
    return (sizeValueInt > 0 && sizeValueInt <= maxValue);
}

let floodFill = (pointX, pointY, color, imageGrid) => {
    if (pointX < 0 || pointX > imageGrid[0].length-1) {
        return;
    }
    if (pointY < 0 || pointY > imageGrid.length-1) {
        return;
    }
    if (imageGrid[pointY][pointX].toLowerCase() !== color.toLowerCase() && imageGrid[pointY][pointX].toLowerCase() !== 'o') {
        return;
    }
    if (imageGrid[pointY][pointX].toLowerCase() === color.toLowerCase()) {
        return;
    }
    imageGrid[pointY][pointX] = color;
    floodFill(pointX+1, pointY, color, imageGrid);
    floodFill(pointX-1, pointY, color, imageGrid);
    floodFill(pointX+1, pointY, color, imageGrid);
    floodFill(pointX, pointY+1, color, imageGrid);
    floodFill(pointX, pointY-1, color, imageGrid);
}

export default class ImageGrid {

    constructor() {
        this._imageGrid = [];
    }

    processCommand(command) {
        let tokens = command.split(/\s+/);
        let operationConfig = operationsConfig[tokens.shift().toLowerCase()];
        if (!operationConfig) {
            throw new Error('Invalid command. Please try again.\n');
        }
        this[operationConfig](tokens);
    }

    resetGrid() {
        if (this._imageGrid.length < 1) {
            throw new Error('Image is not initialized');
        }
        this._imageGrid.forEach(row => {
            row.fill('o');
        })
    }

    createGrid(params) {
        if (params.length < 2) {
            throw new Error('Invalid number of parameters');
        }
        if (!isValidSize(params[0], maxGridSize) || !isValidSize(params[1], maxGridSize)) {
            throw new Error('Invalid parameter values');
        }
        this._imageGrid = [];
        for (let i=0; i < parseInt(params[1]); i++) {
            this._imageGrid.push(Array(parseInt(params[0])).fill('o'));
        }
    }

    showGrid() {
        if (this._imageGrid.length < 1) {
            throw new Error('Image is not initialized');
        }
        this._imageGrid.forEach(row => console.log(row.join(' ')));
    }

    drawVLine(params) {
        if (this._imageGrid.length < 1) {
            throw new Error('Image is not initialized');
        }
        if (params.length < 4) {
            throw new Error('Invalid number of parameters');
        }
        if (!isValidSize(params[0], this._imageGrid[0].length) ||
            !isValidSize(params[1], this._imageGrid.length) ||
            !isValidSize(params[2], this._imageGrid.length) ||
            !colorRegex.test(params[3])) {
            throw new Error('Invalid parameter values');
        }
        let colX = parseInt(params[0], 10) - 1;
        let rowA = Math.min(params[1], params[2]);
        let rowB = Math.max(params[1], params[2]);
        for (let i = rowA-1; i < rowB; i++) {
            this._imageGrid[i][colX] = params[3];
        }
    }

    drawHLine(params) {
        if (this._imageGrid.length < 1) {
            throw new Error('Image is not initialized');
        }
        if (params.length < 4) {
            throw new Error('Invalid number of parameters');
        }
        if (!isValidSize(params[0], this._imageGrid[0].length) ||
            !isValidSize(params[1], this._imageGrid[0].length) ||
            !isValidSize(params[2], this._imageGrid.length) ||
            !colorRegex.test(params[3])) {
            throw new Error('Invalid parameter values');
        }
        let row = parseInt(params[2], 10) - 1;
        let colA = Math.min(params[0], params[1]);
        let colB = Math.max(params[0], params[1]);
        for (let i = colA-1; i < colB; i++) {
            this._imageGrid[row][i] = params[3];
        }
    }

    fillRegion(params) {
        if (this._imageGrid.length < 1) {
            throw new Error('Image is not initialized');
        }
        if (params.length < 3) {
            throw new Error('Invalid number of parameters');
        }
        if (!isValidSize(params[0], this._imageGrid[0].length) ||
            !isValidSize(params[1], this._imageGrid.length) ||
            !colorRegex.test(params[2])) {
            throw new Error('Invalid parameter values');
        }
        floodFill(parseInt(params[0])-1, parseInt(params[1])-1, params[2], this._imageGrid);
    }

    colorPixel(params) {
        if (this._imageGrid.length < 1) {
            throw new Error('Image is not initialized');
        }
        if (params.length < 3) {
            throw new Error('Invalid number of parameters');
        }
        if (!isValidSize(params[0], this._imageGrid[0].length) ||
            !isValidSize(params[1], this._imageGrid.length) ||
            !colorRegex.test(params[2])) {
            throw new Error('Invalid parameter values');
        }
        this._imageGrid[parseInt(params[1])-1][parseInt(params[1])-1] = params[2];
    }
}