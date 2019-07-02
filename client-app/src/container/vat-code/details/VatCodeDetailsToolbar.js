import React from 'react';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';

const VatCodeDetailsToolbar = ({ description }) => (
    <div className="row">
        <div className="col-md-4">
            <div className="btn-group btn-group-flex margin-small" role="group">
                <ButtonIcon iconName={'glyphicon-arrow-left'} onClickAction={browserHistory.goBack} />
            </div>
        </div>
        <div className="col-md-4">
            <h4 className="text-center">BTW code: {description}</h4>
        </div>
        <div className="col-md-4" />
    </div>
);

export default VatCodeDetailsToolbar;
