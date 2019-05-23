import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../../components/modal/Modal';
import { deleteRevenue } from '../../../../../actions/project/ProjectDetailsActions';

const ProjectDetailsFormValueCourseDelete = props => {
    const confirmAction = () => {
        props.deleteRevenue(props.id);
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
            <p>Verwijder opbrengst?</p>
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteRevenue: id => {
        dispatch(deleteRevenue(id));
    },
});

export default connect(
    null,
    mapDispatchToProps
)(ProjectDetailsFormValueCourseDelete);
