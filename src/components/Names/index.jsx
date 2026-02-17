import React from 'react';
import { useAppContext } from '../../App';

const Names = () => {
    const {namesArray, players, setPlayers} = useAppContext();

    React.useEffect(() => {
      const playersArray = namesArray.map(name => ({
        role: name,
        id: crypto.randomUUID()         
      }))
      setPlayers(playersArray);
    },[])

    console.log(players);
    

  return (
    <div>Names</div>
  )
}

export default Names;