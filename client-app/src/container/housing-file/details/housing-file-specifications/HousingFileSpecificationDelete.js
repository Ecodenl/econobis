import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import { deleteHousingFileSpecification } from '../../../../actions/housing-file/HousingFileDetailsActions';

const HousingFileSpecificationDelete = props => {
    const confirmAction = () => {
        props.deleteHousingFileSpecification(props.id);
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
            <p>
                Verwijder specificatie: <strong> {`${props.measure.name}`} </strong>
            </p>
        </Modal>
    );
};

const mapStateToProps = state => {
    return {
        housingFileId: state.housingFileDetails.id,
    };
};

const mapDispatchToProps = dispatch => ({
    deleteHousingFileSpecification: housingFileSpecificationId => {
        dispatch(deleteHousingFileSpecification(housingFileSpecificationId));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(HousingFileSpecificationDelete);
