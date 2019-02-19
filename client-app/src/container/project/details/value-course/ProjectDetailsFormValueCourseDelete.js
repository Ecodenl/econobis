import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import { deleteValueCourse } from '../../../../actions/project/ProjectDetailsActions';

const ProjectDetailsFormValueCourseDelete = props => {
    const confirmAction = () => {
        props.deleteValueCourse(props.id);
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
            <p>Verwijder waardeverloop</p>
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteValueCourse: id => {
        dispatch(deleteValueCourse(id));
    },
});

export default connect(
    null,
    mapDispatchToProps
)(ProjectDetailsFormValueCourseDelete);
