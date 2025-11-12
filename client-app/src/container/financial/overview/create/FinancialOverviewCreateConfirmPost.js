import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../../components/modal/Modal';
import FinancialOverviewContactAPI from '../../../../api/financial/overview/FinancialOverviewContactAPI';
import fileDownload from 'js-file-download';

export default function FinancialOverviewCreateConfirmPost({
    closeModal,
    financialOverviewId,
    financialOverviewContactIds = [],
    financialOverviewContactId,
    isInterimMode,
}) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const confirmAction = event => {
        event.preventDefault();
        setLoading(true);

        if (isInterimMode === true && financialOverviewContactId) {
            FinancialOverviewContactAPI.sendInterimPost(financialOverviewContactId)
                .then(payload => {
                    if (payload && payload.headers && payload.headers['x-filename']) {
                        fileDownload(payload.data, payload.headers['x-filename']);
                    }
                })
                .finally(() => {
                    navigate(`/waardestaat/${financialOverviewId}`);
                });
        } else {
            FinancialOverviewContactAPI.sendAllPost(financialOverviewId, financialOverviewContactIds, isInterimMode)
                .then(payload => {
                    if (payload && payload.headers && payload.headers['x-filename']) {
                        fileDownload(payload.data, payload.headers['x-filename']);
                    }
                })
                .finally(() => {
                    navigate(`/waardestaat/${financialOverviewId}`);
                });
        }
    };

    return (
        <Modal
            closeModal={closeModal}
            confirmAction={confirmAction}
            title="Waardestaten downloaden"
            buttonConfirmText={'Downloaden'}
            loading={loading}
        >
            <div className="row">
                <div className={'col-sm-12 margin-10-bottom'}>
                    <span>
                        Wilt u alle geselecteerde definitieve waardestaten ({financialOverviewContactIds.length})
                        downloaden en doorzetten naar status verzonden?
                    </span>
                </div>
            </div>
        </Modal>
    );
}
