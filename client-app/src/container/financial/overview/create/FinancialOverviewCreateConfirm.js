import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import FinancialOverviewContactAPI from '../../../../api/financial/overview/FinancialOverviewContactAPI';
import fileDownload from 'js-file-download';
import { setError } from '../../../../actions/general/ErrorActions';

export default function FinancialOverviewCreateConfirm({
    closeModal,
    financialOverviewId,
    financialOverviewContactIds = [],
    financialOverviewContactId,
    isInterimMode,
}) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const confirmAction = event => {
        event.preventDefault();
        setLoading(true);

        if (isInterimMode === true && financialOverviewContactId) {
            FinancialOverviewContactAPI.sendInterim(financialOverviewContactId)
                .then(payload => {
                    if (payload && payload.headers && payload.headers['x-filename']) {
                        fileDownload(payload.data, payload.headers['x-filename']);
                    }
                })
                .catch(err => {
                    // je deed dit eerst niet, maar je had setError al geïmporteerd
                    dispatch(setError(err?.response?.status ?? 500, 'Verzenden is mislukt.'));
                })
                .finally(() => {
                    // zelfde gedrag als class: direct terug naar waardestaat
                    navigate(`/waardestaat/${financialOverviewId}`);
                });
        } else {
            FinancialOverviewContactAPI.sendAll(financialOverviewId, financialOverviewContactIds, isInterimMode)
                .then(payload => {
                    if (payload && payload.headers && payload.headers['x-filename']) {
                        fileDownload(payload.data, payload.headers['x-filename']);
                    }
                })
                .catch(err => {
                    // je deed dit eerst niet, maar je had setError al geïmporteerd
                    dispatch(setError(err?.response?.status ?? 500, 'Verzenden is mislukt.'));
                })
                .finally(() => {
                    // zelfde gedrag als class: direct terug naar waardestaat
                    navigate(`/waardestaat/${financialOverviewId}`);
                });
        }
    };

    return (
        <Modal
            closeModal={closeModal}
            confirmAction={confirmAction}
            title="Waardestaten verzenden"
            buttonConfirmText={'Verzenden'}
            loading={loading}
        >
            <div className="row">
                <div className={'col-sm-12 margin-10-bottom'}>
                    <span>
                        Wilt u alle geselecteerde definitieve waardestaten ({financialOverviewContactIds.length})
                        verzenden?
                    </span>
                </div>
            </div>
        </Modal>
    );
}
