import React from 'react';
import { connect } from 'react-redux';

import { fetchMeasures } from '../../../actions/measure/MeasureActions';
import Modal from '../../../components/modal/Modal';
import MeasureAPI from './../../../api/measure/MeasureAPI';


const MeasuresDeleteItem = (props) => {

    const confirmAction = () => {
        MeasureAPI.deleteMeasure(props.id).then(() => {
            props.fetchCampaigns();
        });
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
            Verwijder maatregel <strong>{ props.name }</strong>?
      </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    fetchMeasures: () => {
        dispatch(fetchMeasures());
    },
});

export default connect(null, mapDispatchToProps)(MeasuresDeleteItem);
