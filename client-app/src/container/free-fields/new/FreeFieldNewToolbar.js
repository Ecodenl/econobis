import React from 'react';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';

const FreeFieldNewToolbar = () => {
    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group btn-group-flex margin-small" role="group">
                    <ButtonIcon iconName={'arrowLeft'} onClickAction={browserHistory.goBack} />
                </div>
            </div>
            <div className="col-md-4">
                <h4 className="text-center margin-small">Nieuw vrij veld</h4>
            </div>
            <div className="col-md-4" />
        </div>
    );
};

export default FreeFieldNewToolbar;
