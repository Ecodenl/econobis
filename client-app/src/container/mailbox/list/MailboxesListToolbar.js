import React from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../components/button/ButtonIcon';
import { connect } from 'react-redux';

function MailboxesListToolbar({ mailboxesTotal, refreshMailboxes, permissions }) {
    const navigate = useNavigate();

    const newMailbox = () => {
        navigate(`/mailbox/nieuw`);
    };

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'refresh'} onClickAction={refreshMailboxes} />
                    {permissions.createMailbox && <ButtonIcon iconName={'plus'} onClickAction={newMailbox} />}
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">Mailboxen</h3>
            </div>
            <div className="col-md-4">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="pull-right">Resultaten: {mailboxesTotal}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(MailboxesListToolbar);
