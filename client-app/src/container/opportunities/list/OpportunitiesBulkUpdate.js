import React, { useState } from 'react';

import Modal from '../../../components/modal/Modal';
import OpportunityDetailsAPI from '../../../api/opportunity/OpportunityDetailsAPI';
import { useSelector } from 'react-redux';
import InputSelect from '../../../components/form/InputSelect';
import InputText from '../../../components/form/InputText';
import InputDate from '../../../components/form/InputDate';

function OpportunitiesBulkUpdate({ confirmActionsBulkUpdate, closeBulkUpdateModal, opportunityIds }) {
    const statusses = useSelector(state => state.systemData.opportunityStatus.filter(item => item.active == 1));

    const [statusId, setStatusId] = useState(-1);
    const [amount, setAmount] = useState(null);
    const [desiredDate, setDesiredDate] = useState(null);
    const [evaluationAgreedDate, setEvaluationAgreedDate] = useState(null);

    const confirmAction = () => {
        if (opportunityIds && opportunityIds.length > 0) {
            let values = {};

            if (parseInt(statusId) !== -1) {
                values.statusId = statusId;
            }
            if (amount !== null) {
                values.amount = parseInt(amount);
            }
            if (desiredDate !== null) {
                values.desiredDate = desiredDate;
            }
            if (evaluationAgreedDate !== null) {
                values.evaluationAgreedDate = evaluationAgreedDate;
            }

            OpportunityDetailsAPI.updateBulkOpportunities(opportunityIds, values).then(() => {
                confirmActionsBulkUpdate();
            });
        }
    };

    return (
        <Modal
            buttonConfirmText="Bijwerken kansen"
            buttonClassName={'btn-danger'}
            modalClassName="modal-lg"
            closeModal={closeBulkUpdateModal}
            confirmAction={() => confirmAction()}
            title="Bijwerken kansen"
        >
            <div className="row">
                <div className="col-md-12">
                    <InputSelect
                        label={'Status'}
                        size={'col-sm-12'}
                        name={'statusId'}
                        options={[{ id: -1, name: '--- niet wijzigen ---' }, ...statusses]}
                        value={statusId}
                        onChangeAction={e => setStatusId(e.target.value)}
                        emptyOption={false}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <InputText
                        label="Aantal"
                        divSize={'col-sm-12'}
                        size={'col-sm-5'}
                        name={'amount'}
                        type={'number'}
                        min={'0'}
                        value={amount}
                        placeholder={'--- niet wijzigen ---'}
                        onChangeAction={e => setAmount(e.target.value)}
                        allowZero={true}
                        textToolTip={`aantal, m2 of Wattpiek`}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <InputDate
                        label="Datum uitvoering"
                        divSize={'col-sm-12'}
                        name="desiredDate"
                        value={desiredDate}
                        placeholder={'--- niet wijzigen ---'}
                        onChangeAction={value => setDesiredDate(value)}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <InputDate
                        label="Datum evaluatie"
                        divSize={'col-sm-12'}
                        name="evaluationAgreedDate"
                        value={evaluationAgreedDate}
                        placeholder={'--- niet wijzigen ---'}
                        onChangeAction={value => setEvaluationAgreedDate(value)}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    Bijwerken alle <strong>{opportunityIds.length} geselecteerde kansen.</strong> Weet je het zeker?
                </div>
            </div>
        </Modal>
    );
}

export default OpportunitiesBulkUpdate;
