import React from 'react';

const RolesItem = ({ id, name, number }) => {
	return (
		<li className="player">
			<div className="player__name">{name}</div>
			<div className="player__status">
				<div className="player__foll">
					<div className="player__foll-count">
						<button className="player__foll-btn player__foll-right">-</button>
						<input type="text" defaultValue={number} className="player__foll-number" />
						<button className="player__foll-btn player__foll-left">+</button>
					</div>
				</div>
			</div>
		</li>
	);
};

export default RolesItem;
