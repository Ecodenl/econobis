import React from 'react';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';

const QuotationRequestStatusDetailsToolbar = ({ name }) => (
    <div className="row">
        <div className="col-md-4">
            <div className="btn-group btn-group-flex margin-small" role="group">
                <ButtonIcon iconName={'arrowLeft'} onClickAction={browserHistory.goBack} />
            </div>
        </div>
        <div className="col-md-4">
            <h4 className="text-center">Kansactie status: {name}</h4>
        </div>
        <div className="col-md-4" />
    </div>
);

export default QuotationRequestStatusDetailsToolbar;
