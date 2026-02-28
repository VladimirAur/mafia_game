import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { endDay, nextPlayer } from '../redux/slices/matchSlice';

const Timer = ({ seconds }) => {
	const dispatch = useDispatch();
    const dayNumber = useSelector((state) => state.phases.dayNumber);

	const speakingOrder = useSelector((state) => state.match.speakingOrder);    
	const isLastPlayer = speakingOrder.length === 1;

	const handleNextPlayer = () => {
		dispatch(nextPlayer());
	};

    const handleEndDay = (dayNumber) => {
        dispatch(endDay(dayNumber));

    }

    
    
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
			{!isLastPlayer ? (
				<button className="timer__button timer__button-next" onClick={handleNextPlayer}>
					Следующий Игрок
				</button>
			) : (
				<button className="timer__button timer__button-next" onClick={() => handleEndDay(dayNumber)}>
					Конец обсуждения
				</button>
			)}
		</div>
	);
};

export default Timer;
