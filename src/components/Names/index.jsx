import React from 'react';
import NamesItem from './NamesItem';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Names = () => {
	const navigate = useNavigate();
	const players = useSelector((state) => state.players.playersData);

	const [testMode, setTestMode] = React.useState(false);

	return (
		<div className="players">
			<div className="players__options">
				<div className="players__head">
					<h2 className="roles__title">
						<span className="icon-equalizer"></span> Имена игроков
					</h2>
					<div className="roles__choose">
						<div className="roles__choose-text">Test</div>
						<div
							className={`roles__switch ${testMode ? 'roles__switch--active' : ''}`}
							onClick={() => setTestMode(!testMode)}
						></div>
					</div>
				</div>
				<ul className="players__list">
					{players.map((player) => (
						<NamesItem key={player.number} number={player.number} role={player.role} testMode={testMode} />
					))}
				</ul>
			</div>

			<button className="roles__start" onClick={() => navigate('/drawing')}>
				Раздача ролей
			</button>
		</div>
	);
};

export default Names;
