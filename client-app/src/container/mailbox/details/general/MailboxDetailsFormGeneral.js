import React, { useState } from 'react';
import { connect } from 'react-redux';

import MailboxDetailsFormGeneralEdit from './MailboxDetailsFormGeneralEdit';
import MailboxDetailsFormGeneralView from './MailboxDetailsFormGeneralView';

function MailboxDetailsFormGeneral({ meDetails }) {
    const [state, setState] = useState({ showEdit: true, activeDiv: '' });

    function switchToEdit() {
        setState({
            ...state,
            showEdit: true,
        });
    }

    function switchToView() {
        setState({
            showEdit: false,
            activeDiv: '',
        });
    }

    function onDivEnter() {
        setState({
            ...state,
            activeDiv: 'panel-grey',
        });
    }

    function onDivLeave() {
        if (!state.showEdit) {
            setState({
                ...state,
                activeDiv: '',
            });
        }
    }

    return (
        <div className={state.activeDiv} onMouseEnter={() => onDivEnter()} onMouseLeave={() => onDivLeave()}>
            {state.showEdit && meDetails?.permissions?.createMailbox ? (
                <MailboxDetailsFormGeneralEdit switchToView={switchToView} />
            ) : (
                <MailboxDetailsFormGeneralView switchToEdit={switchToEdit} />
            )}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        mailboxDetails: state.mailboxDetails,
        meDetails: state.meDetails,
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(MailboxDetailsFormGeneral);
