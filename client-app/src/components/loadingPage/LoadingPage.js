import React from 'react';
import ImgLoading from '../../images/loader/loader.gif';

const LoadingPage = () => (
    <div className="loader">
        <img className="loader-image" src={ImgLoading} />
        <h3>Econobis is aan het laden ...</h3>
    </div>
);

export default LoadingPage;