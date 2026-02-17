import React from 'react';

const RolesSelectItem = ({index, name, chooseRole}) => {
	return (
		<li 
        className="role__name role__name--modbrb" 
        onMouseDown={() => chooseRole(name)
            
        }>{name}</li>
	);
};

export default RolesSelectItem;
