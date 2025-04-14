import React from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../components/button/ButtonIcon';

const MeasuresListToolbar = () => {
    const navigate = useNavigate();

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'arrowLeft'} onClickAction={browserHistory.goBack} />
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">Maatregelen</h3>
            </div>
            <div className="col-md-4" />
        </div>
    );
};

export default MeasuresListToolbar;
