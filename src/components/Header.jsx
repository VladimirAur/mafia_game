import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { resetRoles } from '../redux/slices/roleSlice';
import { nextPhase, resetPhase } from '../redux/slices/phaseSlice';
import { giveSpeech, resetMatch, startDay } from '../redux/slices/matchSlice';

const Header = ({ linkToNaming, linkToOptions, daySwitcher }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const phase = useSelector((state) => state.phases.phase);
	const dayNumber = useSelector((state) => state.phases.dayNumber);
	const speechAllowed = useSelector((state) => state.match.speechAllowed);
	const nominatedPlayers = useSelector((state) => state.match.nominatedPlayers);
	const hasNominated = Object.keys(nominatedPlayers).length > 0;
	const phaseRu = phase === 'day' ? 'День' : 'Ночь';

	const [activeBurger, setActiveBurger] = React.useState(false);

	const startNewGame = () => {
		setActiveBurger(false);
		dispatch(resetRoles());
		dispatch(resetPhase());
		dispatch(resetMatch());
		navigate('/');
	};

	const switchPhase = () => {
		if (phase === 'night') dispatch(startDay());
		dispatch(nextPhase());
	};

	return (
		<div className="header">
			{linkToOptions && <Link to="/" className="header__prev icon-left2"></Link>}
			{linkToNaming && <Link to="/drawing" className="header__prev icon-left2"></Link>}
			<h2 className="header__name">
				<span className="icon-mafiya"></span>Mafia
			</h2>
			<div className="header__buttons">
				{daySwitcher && (
					<button
						className={`header__switch ${speechAllowed ? 'header__switch--disabled' : ''}`}
						onClick={switchPhase}
						disabled={speechAllowed}
					>
						{phaseRu} {dayNumber}
						<span className="icon-right"></span>
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
