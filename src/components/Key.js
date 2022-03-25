import React, {useContext} from 'react'
import { context } from '../App';



const Key = ({keyVal, bigKey, disabled}) => {
    const { onDelete, onEnter, onSelectLetter} = useContext(context);
    

    const selectLetter = () => {
        if(keyVal === "Enter") {   
            onEnter();
            
        } else if(keyVal === "Delete") {
            onDelete()
            
        } else {
            onSelectLetter(keyVal)
        }
    }
  return (
    <div 
    onClick={selectLetter} 
    className='key' 
    id={bigKey ? 'big' : disabled === true && 'disabled'}>
        {keyVal}
    </div>
  )
}

export default Key