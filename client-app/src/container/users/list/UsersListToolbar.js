import React from 'react';
import { hashHistory } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';

const UsersListToolbar = props => {
    const newUser = () => {
        hashHistory.push(`/gebruiker/nieuw`);
    };

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={"glyphicon-refresh"} onClickAction={props.refreshContactsData} />
                    <ButtonIcon iconName={"glyphicon-plus"} onClickAction={newUser} />
                </div>
            </div>
            <div className="col-md-4"><h3 className="text-center table-title">Gebruikers</h3></div>
            <div className="col-md-4" />
        </div>
    );
};

export default UsersListToolbar;