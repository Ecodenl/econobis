import React from 'react';

import ButtonIcon from '../../../components/button/ButtonIcon';
import ButtonText from "../../../components/button/ButtonText";

const EmailNewToolbar = ({handleSubmit, loading, goBack}) => {
    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group margin-small margin-10-right" role="group">
                    <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={goBack} />
                </div>
                <div className="btn-group margin-small" role="group">
                    <ButtonText buttonText={"Opslaan als concept"} onClickAction={(e) => {handleSubmit(e, true)}}/>
                    <ButtonText buttonText={"Verstuur e-mail"} onClickAction={handleSubmit} loading={loading} loadText={'E-mail verzenden'}/>
                </div>
            </div>
            <div className="col-md-4"><h4 className="text-center margin-small">Nieuwe e-mail</h4></div>
            <div className="col-md-4" />
        </div>
    );
};

export default EmailNewToolbar;