import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { resetRoles } from '../redux/slices/roleSlice';
import { resetMatch, advancePhase } from '../redux/slices/matchSlice';
import { resetPlayers, setOnRole } from '../redux/slices/playerSlice';

const Header = ({ linkToOptions, daySwitcher, linkToNaming }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { phase, dayNumber } = useSelector((state) => state.match);
	const onRole = useSelector((state) => state.players.onRole);

	const phaseRu = phase === 'day' ? 'День' : 'Ночь';
	const firstNight = daySwitcher && dayNumber === 0;
	const regularPhase = daySwitcher && dayNumber !== 0;

	const [activeBurger, setActiveBurger] = React.useState(false);

	const startNewGame = () => {
		setActiveBurger(false);
		dispatch(resetRoles());
		dispatch(resetPlayers());
		dispatch(resetMatch());
		navigate('/');
	};

	// const onNextPhase = () => {
	// 	dispatch(advancePhase());
	// };

	const switchOnRole = () => {
		dispatch(setOnRole(!onRole));
	};

	return (
		<div className="header">
			{linkToOptions && <Link to="/" className="header__prev icon-left2"></Link>}
			{linkToNaming && <Link to="/drawing" className="header__prev icon-left2"></Link>}
			<h2 className="header__name" onClick={() => switchOnRole()}>
				<span className="icon-mafiya"></span>Mafia
			</h2>
			<div className="header__buttons">
				{regularPhase && (
					<div className={`header__switch ${phase === 'night' ? 'header__switch--night' : ''}`}>
						{phaseRu} {dayNumber}
					</div>
				)}
				{firstNight && <div className="header__switch header__switch--night">Ночь знакомств</div>}
				<button
					className={`header__burger ${activeBurger ? 'header__burger--active' : ''}`}
					onClick={() => setActiveBurger(!activeBurger)}
				>
					<span className="header__burger-line"></span>
					<span className="header__burger-line"></span>
					<span className="header__burger-line"></span>
				</button>
			</div>

			{activeBurger && (
				<div className="header__popup">
					<div className="header__btn-confirm" onClick={startNewGame}>
						Новая игра
					</div>
				</div>
			)}
		</div>
	);
};

export default Header;
