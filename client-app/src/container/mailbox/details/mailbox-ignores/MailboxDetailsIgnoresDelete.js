import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import { deleteMailboxIgnore } from '../../../../actions/mailbox/MailboxDetailsActions';

const MailboxDetailsIgnoresDelete = props => {
    const confirmAction = () => {
        props.deleteMailboxIgnore(props.ignoreId);
        props.toggleDelete();
    };

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={props.toggleDelete}
            confirmAction={() => confirmAction()}
            title="Verwijderen"
        >
            <p>Wil je deze regel verwijderen van deze mailbox?</p>
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteMailboxIgnore: ignoreId => {
        dispatch(deleteMailboxIgnore(ignoreId));
    },
});

export default connect(
    null,
    mapDispatchToProps
)(MailboxDetailsIgnoresDelete);
