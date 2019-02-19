import React from 'react';
import { connect } from 'react-redux';

import MailboxDetailsIgnoresItem from './MailboxDetailsIgnoresItem';

const MailboxDetailsIgnoresList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-6">Waarde</div>
                <div className="col-sm-5">Type</div>
                <div className="col-sm-1" />
            </div>
            {props.mailboxIgnores.length > 0 ? (
                props.mailboxIgnores.map(ignore => {
                    return <MailboxDetailsIgnoresItem key={ignore.id} ignore={ignore} />;
                })
            ) : (
                <div>Geen gegevens bekend.</div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        mailboxIgnores: state.mailboxDetails.mailboxIgnores,
    };
};
export default connect(mapStateToProps)(MailboxDetailsIgnoresList);
