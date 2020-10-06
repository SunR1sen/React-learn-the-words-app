import React from 'react';
import s from './FooterBlock.module.scss';

const FooterBlock = (props) => {

    return (
        <div className={s.footer}>
            <h2 className={s.title}>
                {props.text}  &copy; <span className={s.author}> SunR1sen</span>
            </h2>
        </div>
    )
}

export default FooterBlock;