import React from 'react';
import ImgLogo from '../../images/logo/Logo-ECO.jpg';

const Logo = (props) => {
    const style = {
        height: props.height,
        paddingTop: '10px',
        paddingBottom: '10px',
        width: 'auto'
    };

    return (
        <img src={ImgLogo} className="img-logo" alt="Logo Eco" style={style} />
    );
};

export default Logo;