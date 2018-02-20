import React from 'react';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';

const MeasuresListToolbar = () => {
    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack}/>
                </div>

            </div>
            <div className="col-md-4"><h3 className="text-center table-title">Maatregelen</h3></div>
            <div className="col-md-4"/>
        </div>
    );
};

export default MeasuresListToolbar;

