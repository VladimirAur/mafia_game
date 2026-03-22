import React from 'react';

const PlayersFouls = ({ number, foul, addFoul }) => {
	return (
		<div className="player__foll">
			<div className="player__foll-count">
				<input type="text" value={foul > 0 ? foul : 'Ф'} className="player__foll-number" readOnly />
				<button className="player__foll-btn player__foll-right" onClick={() => addFoul(number)}>
					<span className="icon-plus"></span>
				</button>
			</div>
		</div>
	);
};

export default PlayersFouls;
