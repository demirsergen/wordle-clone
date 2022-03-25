import React, {useContext, useEffect} from 'react'
import { context } from '../App';

const Letter = ({letterPos, attemptVal}) => {
    const {board, todaysWord, currentAttempt, setDisabledLetters, setCorrectLetters, setAlmostLetters} = useContext(context);
    const letter = board[attemptVal][letterPos];

    const correct = todaysWord[letterPos] === letter;
    const almost = !correct && letter !== '' && todaysWord.includes(letter);

    const letterState = currentAttempt.attempt > attemptVal && (correct ? 'correct' : almost ? 'almost' : 'error')

    useEffect(() => {
      if( letter !== '' && !correct  && !almost) {
          setDisabledLetters((prev) => [...prev, letter.toLowerCase()]);
        }
      if(correct) {
        setCorrectLetters(prev => [...prev, letter.toLowerCase()]);
      }
      if(almost) {
        setAlmostLetters(prev => [...prev, letter.toLowerCase()]);
      }
    }, [currentAttempt.attempt])


  return (
    <div className='board__cell' id={letterState} >
       {letter}
    </div>
  )
}

export default Letter

