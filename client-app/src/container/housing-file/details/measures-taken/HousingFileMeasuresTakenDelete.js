import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import { deleteHousingFileMeasureTaken } from '../../../../actions/housing-file/HousingFileDetailsActions';

const HousingFileMeasuresTakenDelete = (props) => {
    const confirmAction = () => {
        props.deleteHousingFileMeasureTaken(props.housingFileId, props.id);
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
          <p>Verwijder maatregel genomen: <strong> {`${props.name}` } </strong></p>

        </Modal>
    );
};

const mapStateToProps = (state) => {
    return {
        housingFileId: state.housingFileDetails.id,
    };
};

const mapDispatchToProps = dispatch => ({
    deleteHousingFileMeasureTaken: (housingFileId, measureId) => {
        dispatch(deleteHousingFileMeasureTaken(housingFileId, measureId));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(HousingFileMeasuresTakenDelete);