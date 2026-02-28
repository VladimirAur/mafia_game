import React from 'react';
import { useDispatch } from 'react-redux';
import { nextPlayer } from '../redux/slices/matchSlice';

const Timer = ({seconds}) => {
    const dispatch = useDispatch();

    const handleNextPlayer = () => {
        // dispatch(nextPlayer()); 
        };

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
			<button className="timer__button timer__button-next"
                    onClick={handleNextPlayer}>Следующий Игрок</button>
		</div>
	);
};

export default Timer;
