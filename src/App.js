import React, {useState, createContext} from 'react';
import "./App.css";
import Keyboard from "./components/Keyboard";
import Board from './components/Board';
import GameOver from './components/GameOver';
import { defaultBoard, generateWordSet } from './defaultBoard';
import { useEffect } from 'react';

export const context = createContext();

function App() {
  const [board, setBoard] = useState(defaultBoard);
  const [currentAttempt, setCurrentAttempt] = useState({attempt: 0, letterPos: 0});
  const [isWin, setIsWin] = useState(false);
  const [isLose, setIsLose] = useState(false);
  const [wordSet, setWordSet] = useState(new Set())
  const [todaysWord, setTodaysWord] = useState('');
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [almostLetters, setAlmostLetters] = useState([]);


    useEffect(() => {
      generateWordSet().then(words => {
        setWordSet(words.wordSet);
        setTodaysWord(words.randomWord.toUpperCase());
      })
    }, [])


    const checkWord = (word) => {
        if(word === todaysWord) {
            setIsWin(true);
            return;
        } else if(currentAttempt.attempt === 4 && word !== todaysWord) {
            setIsLose(true);
            return;
        } else {
          if(wordSet.has(word.toLowerCase())) {
            setCurrentAttempt({...currentAttempt, attempt: currentAttempt.attempt + 1, letterPos: 0});
          } else {
            alert("it's not a word!")
          }
        
        }
    }


  const onSelectLetter = (keyVal) => {
    if(currentAttempt.letterPos === 5) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPos] = keyVal.toUpperCase();
    setBoard(newBoard);
    setCurrentAttempt({...currentAttempt, letterPos: currentAttempt.letterPos + 1});
  }

  const onDelete = () => {
    if(currentAttempt.letterPos === 0) return;
            const newBoard = [...board];
            newBoard[currentAttempt.attempt][currentAttempt.letterPos - 1] = "";
            setBoard(newBoard);
            setCurrentAttempt({...currentAttempt, letterPos: currentAttempt.letterPos -1});
  }

  const onEnter = () => {
    if(currentAttempt.letterPos !== 5) return;
    checkWord(board[currentAttempt.attempt].join(''));
  }

  
  return (
    <div className="App">
      <div className="title__container">
        <h1 className='title'>Wordle</h1>
      </div>
      
      <context.Provider value={{board, setBoard, currentAttempt, setCurrentAttempt, isWin, setIsWin, isLose, setIsLose, onEnter,onDelete, onSelectLetter,todaysWord, disabledLetters, setDisabledLetters, correctLetters, setCorrectLetters,almostLetters, setAlmostLetters  }}>
        <Board />
        <Keyboard />
        <GameOver />
      </context.Provider>
      
    </div>
  );
}

export default App;
