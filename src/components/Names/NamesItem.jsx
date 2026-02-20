import React from 'react';
import { useAppContext } from '../../App';

const NamesItem = ({index, id}) => {
  const {players,setPlayers} = useAppContext();
  const [inFocus, setInFocus] = React.useState(false);


 const player = players.find(p => p.id === id);

  const handleChange = (e) => {
    const newValue = e.target.value;

    setPlayers(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, nickname: newValue }
          : p
      )
    );
  };
 

  return (
    <li className="player">
        <span className="player__number">{index+1}</span>
        <div className="player__desc player__desc--mod">
          <input
                type="text"
                value={player?.nickname || ""}
                placeholder="Имя..."
                className="player__input"
                onFocus={() => setInFocus(true)}
                onBlur={() => setInFocus(false)}
                onChange={handleChange}
            />            
        </div>
        {inFocus && (<button 
                    className="role__btn role__btn--mod"                    
                    >Готово</button>)}
        
    </li>
  )
}

export default NamesItem;