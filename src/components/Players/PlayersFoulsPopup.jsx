import React from 'react';

const PlayersFoulsPopup = ({ number, removeFoul, removePlayer }) => {
	return (
		<div className="players__popup">
			<button className="players__popup-close">
				<span className="icon-close"></span>
			</button>
			<div className="players__popup-set">
				<div className="players__caution">Игрок {number} набрал четыре фола</div>
				<button className="players__btn-confirm" onClick={() => removePlayer(number)}>
					Удалить игрока
				</button>
				<button className="players__btn-confirm" onClick={() => removeFoul(number)}>
					Отмена
				</button>
			</div>
		</div>
	);
};

export default PlayersFoulsPopup;
