
const RaffleItem = ({img, role, number, active, nickname, isLast, onNext, onPrev, onStart}) => {


  return (
    <div className={`raffle__item ${active ? "raffle__item--active" : ""}`}>
        <img className='raffle__img' src={img} alt="Фон" />    
        <button className="raffle__btn-prev" onClick={onPrev}>
            <span className="icon-left2"></span>
        </button>
        <div className="raffle__top">
            <div className="raffle__title">игрок {number}</div>
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