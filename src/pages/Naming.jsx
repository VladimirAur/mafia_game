import React from 'react';
import Header from '../components/Header';
import Names from '../components/Names';

const Naming = () => { 
  
  return (
    <div className='container'>
        <Header linkToOptions={true}/>
        <Names/>     
    </div>
  )
}

export default Naming