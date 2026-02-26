import React from 'react';
import { Link } from 'react-router-dom';
import RolesItem from './RolesItem';
import RolesSelectItem from './RolesSelectItem';
import { useDispatch, useSelector } from 'react-redux';
import { selectRoles, activateRole, incrementNumber, decrementNumber, resetNumber } from '../../redux/slices/roleSlice';
import { setPlayers } from '../../redux/slices/playerSlice';

const Roles = () => {
    const dispatch = useDispatch();
    const {mainRoles, extraRoles} = useSelector(selectRoles);
    const totalCount = useSelector((state) => state.roles.totalCount); 

	const [adding, setAdding] = React.useState(false);
	const [isFocused, setIsFocused] = React.useState(false);
	const [value, setValue] = React.useState('');
	 
	const chooseRole = (name) => {
		setValue(name);
	};
	
    const addNewRole = (value) => {
        dispatch(activateRole(value));
        setAdding(false);
	    setValue('');
    }

	const incRoleNumber = (name) => {
		dispatch(incrementNumber(name));
	};

	const decRoleNumber = (name) => {
		dispatch(decrementNumber(name));
	};

	const resetRole = (name) => {
		dispatch(resetNumber(name));
	};

	const buildPlayers = () => {
		const namesArray = mainRoles
            .flatMap(role => Array(role.number).fill(role.name))
            .sort(() => Math.random() - 0.5);

        const playersArray = namesArray.map((name, index) => {
            const imgUrl = mainRoles.find((role) => role.name === name).img;

            return {
                number: index + 1,
                nickname: '',
                role: name,
                foul: 0,
                ban: false,
                img: imgUrl
            }
        })          
                    
        dispatch(setPlayers(playersArray));
	};

	return (
		<div className="roles">
			<div className="roles__options">
				<h2 className="roles__title"><span className='icon-equalizer2'></span> Выбор ролей</h2>
				<ul className="roles__list">
					{mainRoles
						.map((role) => (
							<RolesItem
								key={role.name}
								role={role}
                                id={role.id}
								resetRole={resetRole}
								incRoleNumber={incRoleNumber}
								decRoleNumber={decRoleNumber}
							/>
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
									{extraRoles
										.map((role, index) => (
											<RolesSelectItem
												key={role.name}
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
							disabled={!value.trim()}
						>
							Добавить
						</button>
					</div>
				) : (
					<button className="roles__add" onClick={() => setAdding(true)}>
						+ Добавить роль
					</button>
				)}
			</div>

			<Link 
                to="/naming" 
                className="roles__start"
                onClick={() => buildPlayers()}
                >
				Имена игроков ({totalCount})
			</Link>
		</div>
	);
};

export default Roles;
