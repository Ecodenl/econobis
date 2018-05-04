import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../components/modal/Modal';
import {deleteAdministration} from "../../../actions/administration/AdministrationsActions";
import {hashHistory} from "react-router";

const AdministrationDeleteItem = (props) => {
    const confirmAction = () => {
        props.deleteAdministration(props.id);
        hashHistory.push(`/administraties`);
    };

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={props.closeDeleteItemModal}
            confirmAction={() => confirmAction()}
            title="Verwijderen"
        >
            Verwijder administratie: <strong> { props.name } </strong>?
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteAdministration: (id) => {
        dispatch(deleteAdministration(id));
    },
});

export default connect(null, mapDispatchToProps)(AdministrationDeleteItem);
