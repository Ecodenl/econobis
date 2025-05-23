import React from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../components/button/ButtonIcon';
import ButtonText from '../../../components/button/ButtonText';

const ConceptNewToolbar = ({ handleSubmit, loading, removeEmail }) => {
    const navigate = useNavigate();

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group margin-small margin-10-right" role="group">
                    <ButtonIcon iconName={'arrowLeft'} onClickAction={() => navigate(-1)} />
                </div>
                <div className="btn-group margin-small" role="group">
                    <ButtonText
                        buttonText={'Opslaan'}
                        onClickAction={e => {
                            handleSubmit(e, true);
                        }}
                    />
                    <ButtonText
                        buttonText={'Verstuur e-mail'}
                        onClickAction={handleSubmit}
                        loading={loading}
                        loadText={'E-mail verzenden'}
                    />
                </div>

                <div className="btn-group margin-small margin-10-left" role="group">
                    <ButtonIcon iconName={'trash'} onClickAction={removeEmail} />
                </div>
            </div>
            <div className="col-md-4">
                <h4 className="text-center margin-small">Concept bewerken</h4>
            </div>
            <div className="col-md-4" />
        </div>
    );
};

export default ConceptNewToolbar;
