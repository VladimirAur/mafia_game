import React from 'react';
import { useAppContext } from '../../App';
import RaffleItem from './RaffleItem';


const Raffle = () => {
    const { players } = useAppContext();
  return (
    <div className="raffle">
        {players.map(player => (
            <RaffleItem key={player.id} {...player}/>
        ))}
    </div>
  )
}

export default Raffle;