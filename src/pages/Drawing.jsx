import React from 'react';
import mafiaImg from '../assets/img/chelovek_siluet_dym_121937_168x300.jpg'


const Drawing = () => {
  return (
    <div className="container">
        <div className="drawing" style={{ backgroundImage: `url(${mafiaImg})` }}></div>
    </div>
    
  )
}

export default Drawing