import React from 'react';
import { connect } from 'react-redux';

import TeamDetailsMailboxesItem from './TeamDetailsMailboxesItem';

const TeamDetailsMailboxesList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-11">Mailbox naam</div>
                <div className="col-sm-1" />
            </div>
            {props.mailboxes && props.mailboxes.length > 0 ? (
                props.mailboxes.map(mailbox => {
                    return <TeamDetailsMailboxesItem key={mailbox.id} mailbox={mailbox} />;
                })
            ) : (
                <div>Geen mailboxes bekend in het systeem.</div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        mailboxes: state.teamDetails.mailboxes,
    };
};
export default connect(mapStateToProps)(TeamDetailsMailboxesList);
