import React from 'react';
import { useAppContext } from '../../App';
import RaffleItem from './RaffleItem';
import { useNavigate } from 'react-router-dom';

const Raffle = () => {
	const { players } = useAppContext();
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
		navigate('/match');
	};

	return (
		<div className="raffle">
			{players.map((player, index) => (
				<RaffleItem
					key={player.id}                    
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
