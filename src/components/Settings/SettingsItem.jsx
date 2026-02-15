import React from 'react'

const SettingsItem = ({id, name,number}) => {

    return(
        <li className="player">
        <span className="player__number">{id}</span>
        <div className="player__desc">
            <div className="player__name">{name}</div>
            <div className="player__status">
                <div className="player__role"></div>
                <div className="player__foll">
                    <div className="player__foll-name">Фол</div>
                    <div className="player__foll-count">
                        <button className="player__foll-btn player__foll-right">-</button>
                    <input type="text" defaultValue={number} className="player__foll-number" />
                    <button className="player__foll-btn player__foll-left">+</button>
                    </div>
                </div>
            </div>
        </div>
    </li>
    )
  
}

export default SettingsItem;