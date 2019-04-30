import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import { fetchMeasure } from '../../../../actions/measure/MeasureDetailsActions';
import MeasureAPI from '../../../../api/measure/MeasureAPI';

const MeasureDetailsSupplierItemDelete = props => {
    const confirmAction = () => {
        MeasureAPI.detachSupplier(props.measureId, props.supplierId).then(() => {
            props.fetchMeasure(props.measureId);
            props.toggleDelete();
        });
    };

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={props.toggleDelete}
            confirmAction={() => confirmAction()}
            title="Verwijderen"
        >
            <p>Wil je deze organisatie verwijderen als leverancier van deze maatregel?</p>
        </Modal>
    );
};

const mapStateToProps = state => {
    return {
        measureId: state.measureDetails.id,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchMeasure: id => {
        dispatch(fetchMeasure(id));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MeasureDetailsSupplierItemDelete);
