import React from 'react';
import { hashHistory } from 'react-router';

import Modal from '../../../components/modal/Modal';
import MeasureAPI from './../../../api/measure/MeasureAPI';

const MeasureDetailsDelete = (props) => {
    const confirmAction = () => {
        MeasureAPI.deleteMeasure(props.id).then(() => {
            hashHistory.push('/maatregelen');
        });


    };

    return (
        <Modal
        buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={props.closeDeleteItemModal}
            confirmAction={() => confirmAction()}
            title="Verwijderen"
      >
            <p>Weet u zeker dat u deze maatregel wilt verwijderen?</p>
      </Modal>
    );
};

export default MeasureDetailsDelete;
