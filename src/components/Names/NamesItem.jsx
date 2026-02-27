import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPlayerNickname } from '../../redux/slices/playerSlice';

const NamesItem = ({ number }) => {
	const dispatch = useDispatch();
	const players = useSelector((state) => state.players.playersData);
	const [inFocus, setInFocus] = React.useState(false);

	const player = players.find((player) => player.number === number);

	const handleChange = (e) => {
		dispatch(
			addPlayerNickname({
				number: player.number,
				name: e.target.value,
			}),
		);
	};

	return (
		<li className="player">
			<div className="player__item">
				<span className="player__number">{number}</span>
				<div className="player__desc player__desc--mod">
					<input
						type="text"
						value={player?.nickname || ''}
						placeholder="Игрок..."
						className="player__input"
						onFocus={() => setInFocus(true)}
						onBlur={() => setInFocus(false)}
						onChange={handleChange}
					/>
				</div>
				{inFocus && <button className="role__btn role__btn--mod">Готово</button>}
			</div>
		</li>
	);
};

export default NamesItem;
