import React from 'react';
import Players from '../components/Players';
import Header from '../components/Header';

const Match = () => {
	return (
		<div className='container'>
			<Header linkToNaming={true} daySwitcher={true}/>
			<Players />
		</div>
	);
};

export default Match;
