import React from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../components/button/ButtonIcon';

function ProccessesListToolbar({ countTotal, reloadHousingFilelogs }) {
    const navigate = useNavigate();

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'arrowLeft'} onClickAction={browserHistory.goBack} />
                    <ButtonIcon iconName={'refresh'} onClickAction={reloadHousingFilelogs} />
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">Hoomdossier logs</h3>
            </div>
            <div className="col-md-4">
                <div className="pull-right">Resultaten: {countTotal || 0}</div>
            </div>
        </div>
    );
}

export default ProccessesListToolbar;
