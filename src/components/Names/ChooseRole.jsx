import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RoleItemTest from './RoleItemTest';
import { selectRoles } from '../../redux/slices/roleSlice';

const ChooseRole = ({ number }) => {
	const dispatch = useDispatch();
	const players = useSelector((state) => state.players.playersData);
	const { mainRoles } = useSelector(selectRoles);
	const player = players.find((player) => player.number === number);

	const [onFocus, setOnFocus] = React.useState(false);

	const switchFocus = () => {
		setOnFocus(!onFocus);
	};

	return (
		<li className="player">
			<div className="player__item">
				<span className="player__number">{number}</span>
				<div className="player__desc player__desc--mod">
					<div className="player__input">{player?.role}</div>
				</div>
				{
					<button className="role__btn role__btn--mod" onClick={switchFocus}>
						<span className="icon-right"></span>
					</button>
				}
			</div>
			{onFocus && (
				<ul className="roles__list roles__list-test">
					{mainRoles.map((role, index) => (
						<RoleItemTest key={role.name} name={role.name} number={number} switchFocus={switchFocus} />
					))}
				</ul>
			)}
		</li>
	);
};

export default ChooseRole;
