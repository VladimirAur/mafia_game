import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayerRole } from '../../redux/slices/playerSlice';
import { selectRoles } from '../../redux/slices/roleSlice';

const RoleItemTest = ({ name, number, switchFocus }) => {
	const dispatch = useDispatch();
	const { mainRoles } = useSelector(selectRoles);

	const handleClick = () => {
		const role = mainRoles.find((r) => r.name === name);
		if (role) dispatch(setPlayerRole({ number, role }));
		switchFocus();
	};
	return (
		<li className="role role-test" onClick={handleClick}>
			<div className="role__name role__name-test ">
				<span></span> {name}
			</div>
		</li>
	);
};

export default RoleItemTest;
