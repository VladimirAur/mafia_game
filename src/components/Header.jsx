import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { returnState } from '../redux/slices/roleSlice';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [active, setActive] = React.useState(false);

    const startNewGame = () => {
        setActive(false);
        dispatch(returnState());
        navigate('/');
    }
    console.log("Header active", active);
    
  return (
    <div className="header">
        <h2 className="header__name">$ Mafia</h2>
        <button className={`header__burger ${active ? 'header__burger--active' : ''}`}
                onClick={() => setActive(!active)}>
            <span className="header__burger-line"></span>
            <span className="header__burger-line"></span>
            <span className="header__burger-line"></span>
        </button>
        {active && (
            <div className="header__popup">
            <div className="header__btn-confirm"
                 onClick={startNewGame}>Новая игра</div>
        </div>
        )}
        
           
    </div>
  )
}

export default Header;