import React from 'react';
import { useAppContext } from '../../App';
import NamesItem from './NamesItem';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectRoles } from '../../redux/slices/roleSlice';
import { setPlayers } from '../../redux/slices/playerSlice';

const Names = () => {
    const dispatch = useDispatch();
    const mafiaPlayers = useSelector((state) => state.players.playersData);
	const { players } = useAppContext();
    const {mainRoles} = useSelector(selectRoles);
	const navigate = useNavigate();
	// const allFilled = players.every((player) => player.nickname?.trim());

    // React.useEffect(() => {
    //     const namesArray = mainRoles
    //         .flatMap(role => Array(role.number).fill(role.name))
    //         .sort(() => Math.random() - 0.5);

    //     const playersArray = namesArray.map((name, index) => {
	//     	const imgUrl = mainRoles.find((role) => role.name === name).img;

    //         return {
    //             number: index + 1,
    //             nickname: '',
    //             role: name,
    //             img: imgUrl
    //         }
    //     })          
                    
    //     dispatch(setPlayers(playersArray));       
        
    // }, [])

   
    console.log(mafiaPlayers);
    

    
// const buildPlayers = () => {
	// 	const playersArray = rolesNames.map((name, index) => {
	// 		const roleFromJson = object.roles.find((role) => role.name === name);

	// 		return {
	// 			id: crypto.randomUUID(),
	// 			number: index + 1,
	// 			role: name,
	// 			nickname: '',
	// 			foul: 0,
	// 			ban: false,
	// 			marker: 0,
	// 			img: roleFromJson ? roleFromJson.img : null,
	// 		};
	// 	});

	// 	setPlayers(playersArray);
	// };
    

	return (
		<div className="players">
			<div className="players__options">
				<h2 className="roles__title">% Имена Игроков</h2>
				<ul className="players__list">
					{players.map((item) => (
						<NamesItem key={item.id} number={item.number} id={item.id} />
					))}
				</ul>
			</div>

			{/* <button
                className={`roles__start  ${!allFilled ? 'roles__start--disabled' : ''}`}
				disabled={!allFilled}
				onClick={() => {
					if (allFilled) {
						navigate('/drawing');
					}
				}}>Раздача ролей
			</button> */}
			<button className="roles__start" onClick={() => navigate('/drawing')}>
				Раздача ролей
			</button>
		</div>
	);
};

export default Names;
