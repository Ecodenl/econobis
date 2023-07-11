import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import { deleteHousingFileHousingStatus } from '../../../../actions/housing-file/HousingFileDetailsActions';

const HousingFileHousingStatusDelete = props => {
    const confirmAction = () => {
        props.deleteHousingFileHousingStatus(props.id);
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
                Verwijder woningstatus: <strong> {`${props.housingFileHoomLink.label}`} </strong>
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
    deleteHousingFileHousingStatus: housingFileHousingStatusId => {
        dispatch(deleteHousingFileHousingStatus(housingFileHousingStatusId));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(HousingFileHousingStatusDelete);
