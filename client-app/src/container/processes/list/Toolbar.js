import React from 'react';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';

function ProccessesListToolbar({ countTotal, reloadJobslogs }) {
    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'glyphicon-arrow-left'} onClickAction={browserHistory.goBack} />
                    <ButtonIcon iconName={'glyphicon-refresh'} onClickAction={reloadJobslogs} />
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">Processen logs</h3>
            </div>
            <div className="col-md-4">
                <div className="pull-right">Resultaten: {countTotal || 0}</div>
            </div>
        </div>
    );
}

export default ProccessesListToolbar;
