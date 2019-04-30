import React from 'react';

import Modal from '../../../components/modal/Modal';
import { deleteProductionProject } from '../../../actions/production-project/ProductionProjectDetailsActions';
import { connect } from 'react-redux';

const ProductionProjectDetailsDelete = props => {
    const confirmAction = () => {
        props.deleteProductionProject(props.id);
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
            <p>Weet u zeker dat u dit productieproject wilt verwijderen?</p>
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteProductionProject: id => {
        dispatch(deleteProductionProject(id));
    },
});

export default connect(
    null,
    mapDispatchToProps
)(ProductionProjectDetailsDelete);
