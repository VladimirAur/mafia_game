import React from 'react';

const RolesItem = ({ name, number }) => {
	return (
		<li className="role">
			<div className="role__name">{name}</div>
			<div className="role__count">
				<button className="role__btn role__btn--left">-</button>
				<div className="role__count-number">{number}</div>
				<button className="role__btn role__btn--right">+</button>
                <button className="role__btn role__btn--del">x</button>
			</div>
		</li>
	);
};

export default RolesItem;
