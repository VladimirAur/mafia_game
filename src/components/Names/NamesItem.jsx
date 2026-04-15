import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPlayerNickname } from '../../redux/slices/playerSlice';
import { selectRoles } from '../../redux/slices/roleSlice';
import RoleItemTest from './RoleItemTest';

const NamesItem = ({ number, role, testMode }) => {
	const dispatch = useDispatch();
	const players = useSelector((state) => state.players.playersData);
	const { mainRoles } = useSelector(selectRoles);

	const [inFocus, setInFocus] = React.useState(false);
	const [showList, setShowList] = React.useState(false);

	const switchRoleList = () => {
		setShowList(!showList);
	};

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
					{testMode && (
						<div className="player__status player__status--active">
							<div className="player__role">{role}</div>
						</div>
					)}
				</div>
				{testMode && (
					<button className="role__btn role__btn--mod" onClick={switchRoleList}>
						<span className="icon-right"></span>
					</button>
				)}
				{!testMode && inFocus && <button className="role__btn role__btn--mod">Готово</button>}
			</div>
			{showList && (
				<ul className="roles__list roles__list-test">
					{mainRoles.map((role) => (
						<RoleItemTest
							key={role.name}
							name={role.name}
							number={number}
							switchRoleList={switchRoleList}
						/>
					))}
				</ul>
			)}
		</li>
	);
};

export default NamesItem;
