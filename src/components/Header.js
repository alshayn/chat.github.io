import React from 'react';
import logo1 from '../assets/logo.png'; // Предполагается, что вы поместите изображения в папку src/assets
import logo2 from '../assets/profile.png';

function Header({ showBorder }) {
    return (
        <div className={`header ${showBorder ? 'with-border' : ''}`}>
            <img src={logo1} alt="Логотип 1" />
            <img src={logo2} alt="Логотип 2" />
        </div>
    );
}

export default Header;