import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../components/modal/Modal';
import { deleteContactInGroup } from '../../../actions/ContactsInGroupActions';

const ContactsDeleteItem = (props) => {
    const confirmAction = () => {
        props.deleteContactInGroup(props.id);
        props.closeDeleteItemModal();
    };

    return (
      <Modal
          buttonConfirmText="Verwijder"
          buttonClassName={'btn-danger'}
          closeModal={props.closeDeleteItemModal}
          confirmAction={() => confirmAction()}
          title="Verwijderen"
      >
            Verwijder contact uit groep: <strong> { props.fullName } </strong>
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteContactInGroup: (id) => {
        dispatch(deleteContactInGroup(id));
    },
});

export default connect(null, mapDispatchToProps)(ContactsDeleteItem);
