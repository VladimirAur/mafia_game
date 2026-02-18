import React from 'react';
import { useAppContext } from '../../App';
import NamesItem from "./NamesItem"

const Names = () => {
    const {rolesNames, players, setPlayers} = useAppContext();
    

    React.useEffect(() => {
      const playersArray = rolesNames.map(name => ({
        id: crypto.randomUUID(),
        role: name,
        nickname: "",
        foll: 0,
        marker: 0 
              
      }))
      setPlayers(playersArray);
    },[])

    console.log("Hello");
    

  return (
    <div className="players">
      <h2 className="roles__title">% Имена Игроков</h2>
        <ul className="players__list">
            {
                players.map((item, index) => <NamesItem key={item.id} index={index}/>) 
            }
        </ul>
    </div>
  )
  
}

export default Names;