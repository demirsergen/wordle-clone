import React, {useEffect, useCallback, useContext} from 'react'
import Key from './Key';
import { context } from '../App';

const Keyboard = () => {

    const {onSelectLetter, onDelete, onEnter, isWin, isLose, disabledLetters, correctLetters, almostLetters} = useContext(context);

    const firstRow = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
    const secondRow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
    const thirdRow = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

    const handleKeyboard = useCallback((event) => {
        if(event.key === 'Enter') {
            if(isLose || isWin) return;
            onEnter();
        } else if(event.key === 'Backspace') {
            if(isLose || isWin) return;
            onDelete();
        } else {
            
            firstRow.forEach(key => {
                if(event.key === key) {
                    onSelectLetter(key)
                }
            })
            secondRow.forEach(key => {
                if(event.key === key) {
                    onSelectLetter(key)
                }
            })
            thirdRow.forEach(key => {
                    if(event.key === key) {
                    onSelectLetter(key)
                }
            })
        }
    })

    useEffect(() => {
        document.addEventListener('keydown', handleKeyboard);
        return () => {
        document.removeEventListener('keydown', handleKeyboard);
        }
    }, [handleKeyboard])


  return (
    <div className='keyboard' onKeyDown={handleKeyboard}>
        <div className='keyboard__row'>
            {firstRow.map((letter) => {return <Key keyVal={letter} disabled={disabledLetters.includes(letter) ? true : false} correct={correctLetters.includes(letter) ? true : false} almost={almostLetters.includes(letter) ? true : false}/>})}
        </div>
        <div className='keyboard__row'>
            {secondRow.map((letter) => {return <Key keyVal={letter} disabled={disabledLetters.includes(letter) ? true : false } correct={correctLetters.includes(letter) ? true : false} almost={almostLetters.includes(letter) ? true : false}/>})}
        </div>
        <div className='keyboard__row'>
            <Key keyVal='Enter' bigKey="true"/>
            {thirdRow.map((letter) => {return <Key keyVal={letter} disabled={disabledLetters.includes(letter) ? true : false} correct={correctLetters.includes(letter) ? true : false} almost={almostLetters.includes(letter) ? true : false}/>})}
            <Key keyVal='Delete' bigKey="true"/>
        </div>
    </div>
  )
}

export default Keyboard