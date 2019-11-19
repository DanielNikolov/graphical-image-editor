let numberRegex = /\d+/;

let operationsConfig = {
    i: {
        operation: 'createGrid',
        paramsCount: 2
    },
    c: {
        operation: 'resetGrid',
        paramsCount: 0
    },
    l: {
        operation: 'colorPixel',
        paramsCount: 2
    },
    v: {
        operation: 'drawVLine',
        paramsCount: 4
    },
    h: {
        operation: 'drawHLine',
        paramsCount: 4
    },
    f: {
        operation: 'fillRegion',
        paramsCount: 3
    },
    s: {
        operation: 'showGrid',
        paramsCount: 0
    }
};

export default class ImageGrid {

    constructor() {
        this._imageGrid = [];
    }

    processCommand(command) {
        let tokens = command.split(/\s+/);
        let operationConfig = operationsConfig[tokens.shift()];
        if (!operationConfig || operationConfig.paramsCount !== tokens.length) {
            throw new Error('Invalid command. Please try again.\n');
        }
        this[operationConfig.operation](tokens);
    }

    resetGrid() {
        this._imageGrid.forEach(row => {
            row.fill('o');
        })
    }

    createGrid(params) {
        if (params.length !== 2) {
            throw new Error('Invalid number of parameters');
        }
        if (!numberRegex.test(params[0]) || !numberRegex.test(params[1])) {
            throw new Error('Invalid input parameters');
        }
        let sizeX = parseInt(params[0]);
        let sizeY = parseInt(params[1]);
        if (sizeX < 1 || sizeY < 1) {
            throw new Error('Invalid parameter values');
        }
        let row = Array(sizeY).fill('o');
        this._imageGrid = Array(sizeX).fill(row);
    }

    showGrid() {
        this._imageGrid.forEach(row => console.log(row.join(' ')));
    }
}