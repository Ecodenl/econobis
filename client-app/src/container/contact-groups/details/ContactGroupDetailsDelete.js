import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../components/modal/Modal';
import { deleteContactGroup } from '../../../actions/contact/ContactGroupsActions';
import { hashHistory } from 'react-router';
import {fetchSystemData} from "../../../actions/general/SystemDataActions";

const ContactGroupDetailsDelete = props => {
    const confirmAction = () => {
        props.deleteContactGroup(props.id, successAction);
        props.closeDeleteItemModal();
    };

    const successAction = () => {
        props.fetchSystemData();
        hashHistory.push(`/contact-groepen`);
    };

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={props.closeDeleteItemModal}
            confirmAction={() => confirmAction()}
            title="Verwijderen"
        >
            Verwijder groep: <strong> {props.name} </strong>
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteContactGroup: (id, successAction) => {
        dispatch(deleteContactGroup(id, successAction));
    },
    fetchSystemData: () => {
        dispatch(fetchSystemData());
    },
});

export default connect(
    null,
    mapDispatchToProps
)(ContactGroupDetailsDelete);
