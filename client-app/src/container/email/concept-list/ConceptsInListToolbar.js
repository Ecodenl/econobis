import React from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../components/button/ButtonIcon';

const ConceptsInListToolbar = props => {
    const navigate = useNavigate();

    const newMailbox = () => {
        navigate(`/email/nieuw`);
    };

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'refresh'} onClickAction={props.refreshData} />
                    <ButtonIcon iconName={'plus'} onClickAction={newMailbox} />
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">E-mail concepten</h3>
            </div>
            <div className="col-md-4" />
        </div>
    );
};

export default ConceptsInListToolbar;
