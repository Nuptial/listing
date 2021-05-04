import React from 'react';
import Logo from '../../assets/Logo.svg';
import Basket from '../Basket/Basket';
import './Header.css';

export const Header = () => {
  return (
    <div className="header-wrapper">
      <img src={Logo} className="logo" />
      <div className="right-items-wrapper">
        <Basket></Basket>
      </div>
    </div>
  )
}



export default Header;