import React from 'react';
import { useAppContext } from '../../App';

const NamesItem = ({index}) => {
  const {players, setPlayers} = useAppContext();
  const [inFocus, setInFocus] = React.useState(false);
  const [value, setValue] = React.useState("");

  const addNickname = (value) => {

  }  



  return (
    <li className="player">
        <span className="player__number">{index+1}</span>
        <div className="player__desc player__desc--mod">
          <input
                type="text"
                value={value}
                placeholder="Имя..."
                className="player__input"
                onFocus={() => setInFocus(true)}
                onBlur={() => setInFocus(false)}
                onChange={(e) => setValue(e.target.value)}
            />            
        </div>
        {inFocus && (<button 
                    className="role__btn role__btn--mod"
                    onClick={() => addNickname(value)}
                    disabled={!value.trim()}>Готово</button>)}
        
    </li>
  )
}

export default NamesItem;