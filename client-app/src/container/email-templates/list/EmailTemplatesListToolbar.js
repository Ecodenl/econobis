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
                    <ButtonIcon iconName={"glyphicon-refresh"} onClickAction={props.refreshEmailTemplatesData} />
                    <ButtonIcon iconName={"glyphicon-plus"} onClickAction={newEmailTemplate} />
                </div>
            </div>
            <div className="col-md-4"><h3 className="text-center table-title">Email templates</h3></div>
            <div className="col-md-4" />
        </div>
    );
};

export default EmailTemplatesListToolbar;