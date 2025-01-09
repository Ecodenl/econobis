import React from 'react';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';

const AddressDonglesListToolbar = () => {
    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'arrowLeft'} onClickAction={browserHistory.goBack} />
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">Dongels</h3>
            </div>
            <div className="col-md-4" />
        </div>
    );
};

export default AddressDonglesListToolbar;
