import React from 'react';

import Modal from '../../../components/modal/Modal';
import IntakeDetailsAPI from '../../../api/intake/IntakeDetailsAPI';
import { setError } from '../../../actions/general/ErrorActions';
import { useDispatch } from 'react-redux';

const IntakesBulkDelete = props => {
    const dispatch = useDispatch();

    const confirmAction = () => {
        if (props.intakeIds && props.intakeIds.length > 0) {
            IntakeDetailsAPI.deleteBulkIntakes(props.intakeIds)
                .then(payload => {
                    if (payload.data.length > 0) {
                        dispatch(setError(200, payload.data));
                    }
                    props.confirmActionsBulkDelete();
                })
                .catch(error => {
                    console.log('hier de error:');
                    console.log(error);
                    props.confirmActionsBulkDelete();
                });
        }
    };

    return (
        <Modal
            buttonConfirmText="Verwijderen intakes"
            buttonClassName={'btn-danger'}
            closeModal={props.closeBulkDeleteModal}
            confirmAction={() => confirmAction()}
            title="Verwijderen intakes"
        >
            Verwijder alle <strong>{props.intakeIds.length} geselecteerde intakes.</strong> Weet je het zeker?
        </Modal>
    );
};

export default IntakesBulkDelete;
