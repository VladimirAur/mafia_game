import React from 'react';

const RolesItem = ({ role, resetRole, sportGame, incRoleNumber, decRoleNumber }) => {
	const { name, number, icon } = role;

	return (
		<li className="role">
			<div className="role__name">
				<span className={icon}></span> {name}
			</div>
			{sportGame ? (
				<div className="role__count">
					<div className="role__count-number role__count-number--md">{number}</div>
				</div>
			) : (
				<div className="role__count">
					<button className="role__btn role__btn--left" onClick={() => decRoleNumber(name)}>
						<span className="icon-minus"></span>
					</button>
					<div className="role__count-number">{number}</div>
					<button className="role__btn role__btn--right" onClick={() => incRoleNumber(name)}>
						<span className="icon-plus"></span>
					</button>
					<button className="role__btn role__btn--del" onClick={() => resetRole(name)}>
						<span className="icon-close"></span>
					</button>
				</div>
			)}
		</li>
	);
};

export default RolesItem;
