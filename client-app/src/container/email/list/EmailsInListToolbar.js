import React from 'react';
import { hashHistory } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';

const EmailsInListToolbar = props => {
    const newMailbox = () => {
        hashHistory.push(`/email/nieuw`);
    };

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={"glyphicon-refresh"} onClickAction={props.refreshData} />
                    <ButtonIcon iconName={"glyphicon-plus"} onClickAction={newMailbox} />
                </div>
            </div>
            <div className="col-md-4"><h3 className="text-center table-title">Email {props.folder} </h3></div>
            <div className="col-md-4" />
        </div>
    );
};

export default EmailsInListToolbar;