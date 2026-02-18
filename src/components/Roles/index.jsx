import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../App';
import RolesItem from './RolesItem';
import object from '../../bd.json';
import RolesSelectItem from './RolesSelectItem';


const Roles = () => {
	const [roles, setRoles] = React.useState([]);
	const [adding, setAdding] = React.useState(false);
	const [isFocused, setIsFocused] = React.useState(false);
	const [value, setValue] = React.useState("");
	const {rolesNames, setRolesNames} = useAppContext();
	

	React.useEffect(() => {
        
        const rolesArray = object.roles.map(role => ({
            ...role,
            id: crypto.randomUUID() 
        }))

		setRoles(rolesArray);

        
	}, []);

        
	React.useEffect(() => {
        
		const names = roles
			.filter(role => role.number > 0)
			.flatMap(role => Array(role.number).fill(role.name))
			.sort(() => Math.random() - 0.5);

		setRolesNames(names);
	}, [roles]);

    const chooseRole = (name) => {
        setValue(name);
    }

	const addNewRole = (value) => {        
		const existing = roles.find(role => role.name === value);
        let updatedRoles;

        if (existing){
            updatedRoles = roles.map(role => role.name === value
            ? {...role, number:1}
            : role)
        }else{
            updatedRoles = [...roles, { name: value, number: 1 }];
        }

        setRoles(updatedRoles);
		setAdding(false);
		setValue('');
        
	};

    const incRoleNumber = (index) => {
        setRoles(prevRoles =>
            prevRoles.map(role => role.id === index
                ? { ...role, number: role.number - 1 }
                : role
            )
        )
    }

    const decRoleNumber = (index) => {
        setRoles(prevRoles =>
            prevRoles.map(role => role.id === index
                ? { ...role, number: role.number + 1 }
                : role
            )
        )
    }

	const resetRole = (index) => {
		setRoles((prevRoles) =>
			prevRoles.map(
				(role) =>
					role.id === index
						? { ...role, number: 0 }
						: role, 
			),
		);
	};
  
    
    
   	
	return (
		<div className="roles">
			<h2 className="roles__title"># Настройки игры</h2>
			<ul className="roles__list">
				{roles.filter(role => role.number > 0).map((role) => (
					<RolesItem 
                        key={role.id} 
                        role={role} 
                        id={role.id} 
                        resetRole={resetRole} 
                        incRoleNumber={incRoleNumber}
                        decRoleNumber={decRoleNumber}/>
				))}
			</ul>
			{adding ? (
				<div className="roles__popup">
					<div className={`roles__select ${isFocused ? 'roles__select--focus' : ''}`}>
						<input
							type="text"
							value={value}
							placeholder="Роль..."
							className={`role__name ${isFocused ? 'role__name--modbrt' : ''}`}
							onFocus={() => setIsFocused(!isFocused)}
							onBlur={() => setIsFocused(false)}
							onChange={(e) => setValue(e.target.value)}
						/>
						<span className="roles__close" onMouseDown={() => setValue('')}>
							x
						</span>
						{isFocused && (
							<ul className="roles__list">
                                {roles.filter(role => role.number === 0).map((role, index) => (
                                    <RolesSelectItem 
                                        key={index} 
                                        name={role.name} 
                                        index={index} 
                                        chooseRole={chooseRole}
                                    />
                                ))}								
							</ul>
						)}
					</div>
					<button 
                        className="roles__add roles__add--small" 
                        onClick={() => addNewRole(value)}
                        disabled={!value.trim()}>
						Добавить
					</button>
				</div>
			) : (
				<button className="roles__add" onClick={() => setAdding(true)}>
					+ Добавить роль
				</button>
			)}

			<Link to="/naming" className="roles__start">Начать ({rolesNames.length})</Link>
		</div>
	);
};

export default Roles;
