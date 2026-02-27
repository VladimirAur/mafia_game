import React from 'react';

const Timer = ({seconds}) => {
	return (
		<div className="player__timer timer">
			<div className="timer__control">
				<div className="timer__count">{seconds} сек</div>
				<button className="timer__button">
					<span className="icon-play3"></span>
				</button>
				<button className="timer__button">
					<span className="icon-stop2"></span>
				</button>
			</div>
			<button className="timer__button timer__button-next">Следующий Игрок</button>
		</div>
	);
};

export default Timer;
