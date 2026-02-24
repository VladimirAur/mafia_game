import React from 'react';

const RolesItem = ({ role, resetRole, incRoleNumber,decRoleNumber}) => {
    
    
	const {name, number} = role;
	return (
		<li className="role">
			<div className="role__name">{name}</div>
			<div className="role__count">
				<button className="role__btn role__btn--left" onClick={() => decRoleNumber(name)}>-</button>
				<div className="role__count-number">{number}</div>
				<button className="role__btn role__btn--right" onClick={() => incRoleNumber(name)}>+</button>
                <button className="role__btn role__btn--del" onClick={() => resetRole(name)}>x</button>
			</div>
		</li>
	);
};

export default RolesItem;
