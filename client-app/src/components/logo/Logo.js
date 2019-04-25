import React from 'react';
import ImgLogo from '../../images/logo/Logo ECONOBIS_31okt17.jpg';

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
