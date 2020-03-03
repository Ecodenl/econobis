import React from 'react';

import Modal from '../../../../../components/modal/Modal';

const MutationFormDelete = props => {
    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={props.closeDeleteItemModal}
            confirmAction={props.handleSubmitDelete}
            title="Verwijderen"
        >
            <p>Verwijder mutatie?</p>
        </Modal>
    );
};

export default MutationFormDelete;
