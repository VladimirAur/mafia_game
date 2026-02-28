import React from 'react';
import RaffleItem from './RaffleItem';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startMatch } from '../../redux/slices/matchSlice';

const Raffle = () => {
    const dispatch = useDispatch();
	const  players  = useSelector(state => state.players.playersData);
    const navigate = useNavigate();
	const [activeIndex, setActiveIndex] = React.useState(0);

	const isFirst = activeIndex === 0;
	const isLast = activeIndex === players.length - 1;

	const nextSlide = () => {
		if (!isLast) {
			setActiveIndex((prev) => prev + 1);
		}
	};

	const prevSlide = () => {
		if (isFirst) {
			navigate('/naming');
		} else {
			setActiveIndex((prev) => prev - 1);
		}
	};

	const startGame = () => {
        dispatch(startMatch());
		navigate('/match');
	};

	return (
		<div className="raffle">
			{players.map((player, index) => (
				<RaffleItem
					key={player.number}                    
					{...player}
					active={index === activeIndex}
					isLast={isLast}
					onNext={nextSlide}
					onPrev={prevSlide}
					onStart={startGame}
				/>
			))}
		</div>
	);
};

export default Raffle;
