import React from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../components/button/ButtonIcon';

const QuotationRequestNewToolbar = props => {
    const navigate = useNavigate();

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'arrowLeft'} onClickAction={() => navigate(-1)} />
                </div>
            </div>
            <div className="col-md-4">
                <h4 className="text-center">
                    Nieuw {props.opportunityAction ? props.opportunityAction.name : 'actie'}
                </h4>
            </div>
            <div className="col-md-4" />
        </div>
    );
};

export default QuotationRequestNewToolbar;
