import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../components/modal/Modal';
import { deleteContactGroup } from '../../../actions/contact/ContactGroupsActions';
import {fetchSystemData} from "../../../actions/general/SystemDataActions";

const ContactGroupsDeleteItem = props => {
    const confirmAction = () => {
        props.deleteContactGroup(props.id, props.resetContactGroupsFilters);
        props.fetchSystemData();
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
            {props.contactGroupType === 'static'
                ? <span>Je gaat een statische groep verwijderen. Deze groep kan je niet meer herstellen. Weet je zeker dat de deze statische groep <strong>{props.name}</strong> wilt verwijderen?</span>
                : <span>Verwijder groep: <strong>{props.name}</strong></span>}
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteContactGroup: (id, reloadData) => {
        dispatch(deleteContactGroup(id, reloadData));
    },
    fetchSystemData: () => {
        dispatch(fetchSystemData());
    },
});

export default connect(
    null,
    mapDispatchToProps
)(ContactGroupsDeleteItem);
