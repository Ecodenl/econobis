import React from 'react';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';
import ButtonText from '../../../components/button/ButtonText';

const EmailAnswerToolbar = ({ handleSubmit, loading }) => {
    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group margin-small margin-10-right" role="group">
                    <ButtonIcon iconName={'arrowLeft'} onClickAction={browserHistory.goBack} />
                </div>
                <div className="btn-group margin-small" role="group">
                    <ButtonText
                        buttonText={'Opslaan als concept'}
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
            </div>
            <div className="col-md-4">
                <h4 className="text-center margin-small">E-mail versturen</h4>
            </div>
            <div className="col-md-4" />
        </div>
    );
};

export default EmailAnswerToolbar;
