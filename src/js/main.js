import CommandLineParser from './commandLineParser';
import ImageGrid from './imageGrid';

let commandLineParser = new CommandLineParser();
let imageGrid = new ImageGrid();

imageGrid.processCommand('i 5 5');
imageGrid.processCommand('s');

/*
commandLineParser.
commandLineParser.createGrid();
*/