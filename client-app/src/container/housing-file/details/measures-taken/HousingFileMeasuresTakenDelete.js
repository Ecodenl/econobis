import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import { deleteHousingFileMeasureTaken, fetchHousingFileDetails } from '../../../../actions/housing-file/HousingFileDetailsActions';

const HousingFileMeasuresTakenDelete = (props) => {
    const confirmAction = () => {
        props.deleteHousingFileMeasureTaken(props.addressId, props.id);
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
        addressId: state.housingFileDetails.address.id,
        housingFileId: state.housingFileDetails.id,
    };
};

const mapDispatchToProps = dispatch => ({
    deleteHousingFileMeasureTaken: (addressId, measureId) => {
        dispatch(deleteHousingFileMeasureTaken(addressId, measureId));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(HousingFileMeasuresTakenDelete);