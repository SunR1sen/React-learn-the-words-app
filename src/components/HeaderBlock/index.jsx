import React from 'react';
import { ReactComponent as ReactLogo } from '../../logo.svg';
import s from './Header.module.scss';

const HeaderBlock = ({ hideBackground = false, hideLogo = false, children }) => {
    const styleHideBg = hideBackground ? { backgroundImage: 'none'} : {};
    const styleHideLogo = hideLogo ? { display: 'none'} : {};

    return (
        <div className={s.cover} style={styleHideBg}>
            <div className={s.wrap}>
                { children }
                <ReactLogo style={styleHideLogo}/>
            </div>
        </div>
    )
}

export default HeaderBlock;