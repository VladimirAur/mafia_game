import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { resetRoles } from '../redux/slices/roleSlice';
import { resetMatch, advancePhase } from '../redux/slices/matchSlice';
import { resetPlayers, setOnRole } from '../redux/slices/playerSlice';

const Header = ({ linkToNaming, linkToOptions, daySwitcher }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { phase, dayNumber, nominatedPlayers } = useSelector((state) => state.match);

	const hasNominated = Object.keys(nominatedPlayers).length > 0;
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

	const onNextPhase = () => {
		dispatch(advancePhase());
	};

	const showRole = () => {
		dispatch(setOnRole(true));
		setTimeout(() => {
			dispatch(setOnRole(false));
		}, 1000);
	};

	return (
		<div className="header">
			{linkToOptions && <Link to="/" className="header__prev icon-left2"></Link>}
			{linkToNaming && <Link to="/drawing" className="header__prev icon-left2"></Link>}
			<h2 className="header__name" onClick={() => showRole()}>
				<span className="icon-mafiya"></span>Mafia
			</h2>
			<div className="header__buttons">
				{regularPhase && (
					<button
						className={`header__switch ${hasNominated ? 'header__switch--disabled' : ''}`}
						onClick={onNextPhase}
						disabled={hasNominated}
					>
						{phaseRu} {dayNumber}
						<span className="icon-right"></span>
					</button>
				)}
				{firstNight && (
					<button className="header__switch" onClick={onNextPhase}>
						Ночь знакомств
					</button>
				)}
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
