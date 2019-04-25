import React from 'react';

import Modal from '../../../components/modal/Modal';
import { deleteCampaign } from '../../../actions/campaign/CampaignDetailsActions';
import { connect } from 'react-redux';

const CampaignDetailsDelete = props => {
    const confirmAction = () => {
        props.deleteCampaign(props.id);
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
            <p>Weet u zeker dat u deze campagne wilt verwijderen?</p>
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteCampaign: id => {
        dispatch(deleteCampaign(id));
    },
});

export default connect(
    null,
    mapDispatchToProps
)(CampaignDetailsDelete);
