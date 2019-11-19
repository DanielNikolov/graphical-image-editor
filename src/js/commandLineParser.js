import readline from 'readline';
import ImageGrid from './imageGrid';

export default class CommandLineParser {

    async getUserInput() {
        let command;
        const readLine = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        let askForInput = () => new Promise(resolve => readLine.question('Please enter command sequence or type "X": ', response => resolve(response)));
        do {
            command = (await askForInput()).toLowerCase();
        } while (command !== 'x');
    }

    createGrid() {
        let imageGrid = new ImageGrid();
        imageGrid.createGrid(5, 5);
        imageGrid.resetGrid();
        imageGrid.showGrid();
    }
}