import React from 'react';

const PlayersItem = ({id, name, role, foll}) => {
  return (
    <li className="player">
        <span className="player__number">{id}</span>
        <div className="player__desc">
            <div className="player__name">{name}</div>
            <div className="player__status">
                <div className="player__role">{role}</div>
                <div className="player__foll">
                    <div className="player__foll-name">Фол</div>
                    <button className="player__foll-btn player__foll-right">-</button>
                    <input type="text" defaultValue={foll} className="player__foll-count" />
                    <button className="player__foll-btn player__foll-left">+</button>
                </div>
            </div>
        </div>
    </li>
  )
}

export default PlayersItem;