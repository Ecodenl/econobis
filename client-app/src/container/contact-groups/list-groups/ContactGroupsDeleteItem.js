import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../components/modal/Modal';
import { deleteContactGroup } from '../../../actions/contact/ContactGroupsActions';

const ContactGroupsDeleteItem = (props) => {
    const confirmAction = () => {
        props.deleteContactGroup(props.id);
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
            Verwijder groep: <strong> { props.name } </strong>
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteContactGroup: (id) => {
        dispatch(deleteContactGroup(id));
    },
});

export default connect(null, mapDispatchToProps)(ContactGroupsDeleteItem);
