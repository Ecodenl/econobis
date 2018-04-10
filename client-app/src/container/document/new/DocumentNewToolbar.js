import React from 'react';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';
import ButtonText from "../../../components/button/ButtonText";

const DocumentNewToolbar = ({handleSubmit}) => {
    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group btn-group-flex margin-small margin-10-right" role="group">
                    <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack} />
                </div>
            </div>
            <div className="col-md-4"><h4 className="text-center margin-small">Nieuw document</h4></div>
            <div className="col-md-4" />
        </div>
    );
};

export default DocumentNewToolbar;