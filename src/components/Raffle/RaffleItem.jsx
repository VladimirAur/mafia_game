import React from 'react';



const RaffleItem = ({img, role, number, active, nickname, isLast, onNext, onPrev, onStart}) => {


  return (
    <div className={`raffle__item ${active ? "raffle__item--active" : ""}`}
        style={{ backgroundImage: `url(${img})`}}>
        <button className="raffle__btn-prev" onClick={onPrev}>prev</button>
        <div className="raffle__top">
            <div className="raffle__title">Игрок {number}</div>
            <div className="raffle__player-name">{nickname}</div>
        </div>
        <div className="raffle__bottom">
            <div className="raffle__player-role">{role}</div>
            {!isLast 
                ? (<button className="raffle__btn-next" onClick={onNext}>Следующий игрок</button>)
                :(<button className="raffle__btn-next" onClick={onStart}>Начать игру</button>)
            } 
            
        </div>        
    </div>
  )
}

export default RaffleItem;