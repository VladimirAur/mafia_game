import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { resetRoles } from '../redux/slices/roleSlice';
import { nextPhase, prevPhase, resetPhase } from '../redux/slices/phaseSlice';
import { startDay } from '../redux/slices/matchSlice';

const Header = ({ linkToNaming, linkToOptions, daySwitcher }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
    const phase = useSelector(state => state.phases.phase);
    const dayNumber = useSelector(state => state.phases.dayNumber);
    const players = useSelector(state => state.players.playersData);
    const currentPlayer = useSelector(state => state.match.currentPlayerNumber);
	const [active, setActive] = React.useState(false);

     

	const startNewGame = () => {
		setActive(false);
		dispatch(resetRoles());
        dispatch(resetPhase());
		navigate('/');
	};

    const switchPhase = () => {
        const next = phase === "night" ? "day" : "night";

        dispatch(nextPhase());
        
        if (next === "night") {
        dispatch(startDay({players,dayNumber}));
        }
    }

    const returnPhase = () => {
        dispatch(prevPhase());
    }

       

	return (
		<div className="header">
			{linkToOptions && <Link to="/" className="header__prev icon-left2"></Link>}
			{phase === 'Ночь' && dayNumber === 1 && linkToNaming 
                ? (<Link to="/drawing" className="header__prev icon-left2"></Link>) 
                : (linkToNaming && (<button className='header__prev icon-left2' onClick={returnPhase}></button>))}
			<h2 className="header__name">
				<span className="icon-mafiya"></span>Mafia
			</h2>
			<div className="header__buttons">
                {daySwitcher && (<button className={`header__switch ${phase === 'Ночь' ? 'header__switch--dark' : '' }`}
                                        onClick={switchPhase}>{phase} {dayNumber} 
                                    <span className='icon-right'></span>                                    
                                </button>)}
				<button
					className={`header__burger ${active ? 'header__burger--active' : ''}`}
                    onClick={() => setActive(!active)}>
					<span className="header__burger-line"></span>
					<span className="header__burger-line"></span>
					<span className="header__burger-line"></span>
				</button>
			</div>

			{active && (
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
