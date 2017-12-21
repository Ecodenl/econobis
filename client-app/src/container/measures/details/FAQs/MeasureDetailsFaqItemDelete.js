import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import { fetchMeasure } from '../../../../actions/measure/MeasureActions';
import MeasureAPI from "../../../../api/measure/MeasureAPI";

const MeasureDetailsFaqItemDelete = (props) => {
    const confirmAction = () => {
        MeasureAPI.deleteFaq(props.id).then(() => {
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
            <p>Wil je deze response ontkoppelen van deze campagne?</p>



        </Modal>
    );
};

const mapStateToProps = (state) => {
    return {
        measureId: state.measure.id,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchMeasure: (id) => {
        dispatch(fetchMeasure(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MeasureDetailsFaqItemDelete);
