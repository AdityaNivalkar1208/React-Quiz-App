import React from 'react';
import '../Style/Header.css'

const Header = () => {
  return (
    <div className='app-header'>
      <img src="logo512.png" alt="logo" className="logo" />  
      <h1 className='quiz'>The React Quiz</h1>
      
    </div>
  );
}

export default Header;
