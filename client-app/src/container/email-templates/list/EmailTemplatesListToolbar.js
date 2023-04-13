import React from 'react';
import { hashHistory } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';

const EmailTemplatesListToolbar = props => {
    const newEmailTemplate = () => {
        hashHistory.push(`/email-template/nieuw`);
    };

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'refresh'} onClickAction={props.refreshEmailTemplatesData} />
                    <ButtonIcon iconName={'plus'} onClickAction={newEmailTemplate} />
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">E-mail templates</h3>
            </div>
            <div className="col-md-4" />
        </div>
    );
};

export default EmailTemplatesListToolbar;
