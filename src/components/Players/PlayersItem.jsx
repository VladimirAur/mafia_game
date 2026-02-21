import React from 'react';

const PlayersItem = ({ id, number, nickname, role, foul, addFoul, removeFoul, ban }) => {
    
    

	return (
		<li className={`player ${ban ? "player--disabled" : ""}`} >
			<span 
                className={`player__number ${ban ? "player__number--disabled":""}`}
                >{number}</span>
			<div className="player__desc">
				<div className="player__name">{nickname}</div>
				{/* <div className="player__status">
					<div className="player__role">{role}</div>
				</div> */}
			</div>
			<div className="player__foll">
				<div className="player__foll-count">
					<button 
                    className="player__foll-btn player__foll-left"
                    onClick={() => removeFoul(id)}>-</button>
					<input 
                    type="text" 
                    value={foul > 0 ? foul : "Ф"} 
                    className="player__foll-number"
                    readOnly />
					<button 
                    className="player__foll-btn player__foll-right"
                    onClick={() => addFoul(id)}>+</button>
				</div>
			</div>
		</li>
	);
};

export default PlayersItem;
