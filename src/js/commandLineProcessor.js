import readline from 'readline';
import ImageGrid from './imageGrid';

export default class CommandLineProcessor {
    constructor() {
        this._imageGrid = new ImageGrid();
    }

    async getUserInput() {
        let command;
        const readLine = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        let askForInput = () => new Promise(resolve => readLine.question('Please enter command sequence or type "X": ', response => resolve(response)));
        do {
            command = (await askForInput());
            if (command.toLowerCase() === 'x') {
                break;
            }
            try {
                this._imageGrid.processCommand(command);
            } catch (error) {
                console.log(error.message);
            }
        } while (command.toLowerCase() !== 'x');
        process.exit(0);
    }
}