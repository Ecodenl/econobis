import React from 'react';
import { hashHistory } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';
import { connect } from 'react-redux';

const MailboxesListToolbar = props => {
    const newMailbox = () => {
        hashHistory.push(`/mailbox/nieuw`);
    };

    const { permissions = {} } = props;

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'glyphicon-refresh'} onClickAction={props.refreshData} />
                    {permissions.createMailbox && <ButtonIcon iconName={'glyphicon-plus'} onClickAction={newMailbox} />}
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">Mailboxen</h3>
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

export default connect(mapStateToProps)(MailboxesListToolbar);
