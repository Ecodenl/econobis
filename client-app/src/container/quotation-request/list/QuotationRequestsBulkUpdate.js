import React, { useState } from 'react';

import Modal from '../../../components/modal/Modal';
import QuotationRequestDetailsAPI from '../../../api/quotation-request/QuotationRequestDetailsAPI';
import { useSelector } from 'react-redux';
import InputSelect from '../../../components/form/InputSelect';

function QuotationRequestsBulkUpdate({
    confirmActionsBulkUpdate,
    closeBulkUpdateModal,
    quotationRequestIds,
    opportunityActionId,
}) {
    const statusses = useSelector(state =>
        state.systemData.quotationRequestStatus.filter(item => item.opportunityActionId == opportunityActionId)
    );

    const [statusId, setStatusId] = useState(-1);

    const confirmAction = () => {
        if (quotationRequestIds && quotationRequestIds.length > 0) {
            let values = {};

            if (parseInt(statusId) !== -1) {
                values.statusId = statusId;
            }

            QuotationRequestDetailsAPI.updateBulkQuotationRequests(quotationRequestIds, values).then(() => {
                confirmActionsBulkUpdate();
            });
        }
    };

    return (
        <Modal
            buttonConfirmText="Bijwerken kansacties"
            buttonClassName={'btn-danger'}
            closeModal={closeBulkUpdateModal}
            confirmAction={() => confirmAction()}
            title="Bijwerken kansacties"
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
                    Bijwerken alle <strong>{quotationRequestIds.length} geselecteerde kansacties.</strong> Weet je het
                    zeker?
                </div>
            </div>
        </Modal>
    );
}

export default QuotationRequestsBulkUpdate;
