import React from 'react'
import { useAppContext } from '../../App';
import PlayersItem from './PlayersItem';

const Players = () => {
    const {players,setPlayers} = useAppContext();
       
    
  return (    		
    <div className="players">
        <ul className="players__list">
            {
                players.map(item => <PlayersItem key={item.id} {...item}/>) 
            }
        </ul>
    </div>
		
  )
}

export default Players;