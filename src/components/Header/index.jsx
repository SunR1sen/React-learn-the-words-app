import React from 'react';
import s from './Header.module.scss';

const Header = ({ children }) => {
    return (
        <h2 className={s.header}>{ children }</h2>
    )
}

export default Header;