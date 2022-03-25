import React, { useContext } from 'react'
import { context } from '../App'

const GameOver = () => {
    const {isWin, isLose, todaysWord} = useContext(context);
  return (
    <div className={isWin ? 'gameOver__container' : isLose ? 'gameOver__container' : null}>
        {isWin ? <div className='gameOver__result'>Correct Word! {todaysWord}</div> : null}
        {isLose ? <div className='gameOver__result'>You couldn't find the word! <br/> It was '{todaysWord}'</div> : null}
    </div>
  )
}

export default GameOver