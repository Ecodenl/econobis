import React from 'react';
import ImgLogo from '../../images/logo/logo-ECO-2025.png';

const Logo = props => {
    const style = {
        height: props.height,
        paddingTop: '10px',
        paddingBottom: '10px',
        width: 'auto',
    };

    return <img src={ImgLogo} className="img-logo" alt="Logo Eco" style={style} />;
};

export default Logo;
