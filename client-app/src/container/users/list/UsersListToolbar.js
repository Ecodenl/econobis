import React from 'react';
import { hashHistory } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';
import { connect } from 'react-redux';

const UsersListToolbar = props => {
    const newUser = () => {
        hashHistory.push(`/gebruiker/nieuw`);
    };

    const { permissions = {} } = props;

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'glyphicon-refresh'} onClickAction={props.refreshContactsData} />
                    {permissions.manageUser && <ButtonIcon iconName={'glyphicon-plus'} onClickAction={newUser} />}
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">Gebruikers</h3>
            </div>
            <div className="col-md-4" />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(UsersListToolbar);
