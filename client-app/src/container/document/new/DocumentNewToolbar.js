import React from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../components/button/ButtonIcon';
import ButtonText from '../../../components/button/ButtonText';

const DocumentNewToolbar = ({ handleSubmit, documentCreatedFromName }) => {
    const navigate = useNavigate();

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group btn-group-flex margin-small margin-10-right" role="group">
                    <ButtonIcon iconName={'arrowLeft'} onClickAction={navigate(-1)} />
                </div>
            </div>
            <div className="col-md-4">
                <h4 className="text-center margin-small">Nieuw document</h4>
            </div>
            <div className="col-md-4">
                <h4 className="text-right margin-10-right">
                    Gemaakt vanuit/voor: <strong>{documentCreatedFromName ? documentCreatedFromName : ''}</strong>
                </h4>
            </div>
        </div>
    );
};

export default DocumentNewToolbar;
