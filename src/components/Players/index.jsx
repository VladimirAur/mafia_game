import React from 'react'
import object from "../../bd.json";
import PlayersItem from './PlayersItem';

const Players = () => {
    const [players,setPlayers] = React.useState([]);

    React.useEffect(() =>{
        setPlayers(object.players);
    },[])  
    
    
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