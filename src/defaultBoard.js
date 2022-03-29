import wordleBank from './wordle-bank.txt';

export const defaultBoard = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
];

export const generateWordSet = async () => {
    let wordSet;
    let randomWord;
    await fetch(wordleBank)
    .then((response) => response.text())
    .then(result => {
        const wordsArr = result.split('\n');
        const random = Math.floor(Math.random() * 2397);
        randomWord = wordsArr[random];
        wordSet = new Set(wordsArr);
    }) 
    return {wordSet, randomWord}
}

