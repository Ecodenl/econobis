import React from 'react';
import { hashHistory } from 'react-router';

import Modal from '../../../components/modal/Modal';
import ProductionProjectDetailsAPI from '../../../api/production-project/ProductionProjectDetailsAPI';

const ProductionProjectDetailsDelete = (props) => {
    const confirmAction = () => {
        ProductionProjectDetailsAPI.deleteProductionProject(props.id).then(() => {
            hashHistory.push('/productie-projecten');
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
            <p>Weet u zeker dat u dit productie project wilt verwijderen?</p>
      </Modal>
    );
};

export default ProductionProjectDetailsDelete;
