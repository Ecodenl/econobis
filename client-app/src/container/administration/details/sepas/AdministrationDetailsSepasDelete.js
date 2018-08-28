import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import { deleteAdministrationSepa } from '../../../../actions/administration/AdministrationDetailsActions';

const AdministrationDetailsSepasDelete = (props) => {
    const confirmAction = () => {
        props.deleteAdministrationSepa(props.sepaId);
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
            <p>Wil je deze sepa verwijderen?</p>

        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteAdministrationSepa: (sepaId) => {
        dispatch(deleteAdministrationSepa(sepaId));
    },
});

export default connect(null, mapDispatchToProps)(AdministrationDetailsSepasDelete);
