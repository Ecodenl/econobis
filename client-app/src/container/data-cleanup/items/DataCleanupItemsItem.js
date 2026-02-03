import React, { useState } from 'react';
import Icon from 'react-icons-kit';
import { refresh } from 'react-icons-kit/fa/refresh';
import { trash } from 'react-icons-kit/fa/trash';
import { exclamationTriangle } from 'react-icons-kit/fa/exclamationTriangle';

import Modal from '../../../components/modal/Modal';

export default function DataCleanupItemsItem({
    cleanupDataItem,
    handleDataCleanupUpdateItem,
    confirmCleanup,
    getErrorsForItem,
    setErrorsForItem,
}) {
    const [showModal, setShowModal] = useState(false);
    const [showErrorsModal, setShowErrorsModal] = useState(false);
    const [showActionButtons, setShowActionButtons] = useState(true);
    const [modalErrorMessage, setModalErrorMessage] = useState([]);

    const itemErrors = getErrorsForItem ? getErrorsForItem(cleanupDataItem.id) : [];
    const hasErrors = itemErrors && itemErrors.length > 0;
    const splitApiMessage = msg =>
        (msg || '')
            .split(';')
            .map(s => s.trim())
            .filter(Boolean);

    const onConfirm = async () => {
        setShowActionButtons(false);
        setModalErrorMessage([]);

        try {
            // console.log('confirmCleanup result', await confirmCleanup(cleanupDataItem));
            await confirmCleanup(cleanupDataItem);
            setErrorsForItem && setErrorsForItem(cleanupDataItem.id, []);
            setShowModal(false);
        } catch (e) {
            // const apiMsg = e?.response?.data?.message || e?.response?.data?.error || '';
            // const errors = splitApiMessage(apiMsg);
            const apiErrors = e?.response?.data?.errors;
            const apiMsg = e?.response?.data?.message || e?.response?.data?.error || '';
            const errors = Array.isArray(apiErrors) && apiErrors.length ? apiErrors : splitApiMessage(apiMsg);

            const finalErrors = errors.length ? errors : ['Er ging iets mis tijdens opschonen.'];

            setModalErrorMessage(finalErrors);
            setErrorsForItem && setErrorsForItem(cleanupDataItem.id, finalErrors);
        } finally {
            setShowActionButtons(true);
        }
    };

    const openModal = () => {
        setModalErrorMessage([]);
        setShowActionButtons(true);
        setShowModal(true);
    };

    const closeModal = () => {
        setModalErrorMessage([]);
        setShowActionButtons(true);
        setShowModal(false);
    };

    return (
        <>
            <tr>
                <td>
                    {cleanupDataItem.name} ouder dan {cleanupDataItem.yearsForDelete} jaar op {cleanupDataItem.dateRef}
                </td>
                <td>{cleanupDataItem.determinedCount}</td>
                <td>{cleanupDataItem?.dateDetermined}</td>
                <td>
                    {showActionButtons && (
                        <>
                            <a
                                role="button"
                                title={`Herbereken ${cleanupDataItem.name}`}
                                onClick={() => {
                                    handleDataCleanupUpdateItem(cleanupDataItem);
                                }}
                            >
                                <Icon className="mybtn-success" size={14} icon={refresh} />
                            </a>
                        </>
                    )}
                </td>
                <td>{cleanupDataItem.cleanedCount}</td>
                <td>{cleanupDataItem.failedCount}</td>
                <td style={{ textAlign: 'center' }}>
                    {hasErrors ? (
                        <a role="button" title="Toon fouten" onClick={() => setShowErrorsModal(true)}>
                            <Icon className="mybtn-danger" size={14} icon={exclamationTriangle} />
                        </a>
                    ) : null}
                </td>
                <td>{cleanupDataItem.dateCleanedUp}</td>
                <td>
                    {showActionButtons && (
                        <>
                            <a role="button" title={`Opschonen ${cleanupDataItem.name}`} onClick={openModal}>
                                <Icon className="mybtn-success" size={14} icon={trash} />
                            </a>
                        </>
                    )}
                </td>
            </tr>
            {showModal ? (
                <Modal
                    closeModal={closeModal}
                    confirmAction={onConfirm}
                    buttonConfirmText="Opschonen"
                    buttonClassName={'btn-danger'}
                    title={`Bevestig opschonen ${cleanupDataItem.name}`}
                    loading={!showActionButtons}
                >
                    <div>
                        Weet u zeker dat u <strong>{cleanupDataItem.name}</strong>,{' '}
                        <strong>ouder dan {cleanupDataItem.yearsForDelete} jaar</strong> op{' '}
                        <strong>{cleanupDataItem.dateRef}</strong> opschonen?
                        <br />
                        <br />
                        Deze verwijderactie is niet terug te draaien.
                        <br />
                        <br />
                        <div id="cleanupModalWarning" style={{ color: '#e64a4a' }}>
                            {modalErrorMessage.length > 0 && (
                                <div style={{ maxHeight: 260, overflowY: 'auto' }}>
                                    <ul style={{ marginBottom: 0, paddingLeft: 18 }}>
                                        {modalErrorMessage.map((item, idx) => (
                                            <li key={idx}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </Modal>
            ) : null}
            {showErrorsModal ? (
                <Modal
                    closeModal={() => setShowErrorsModal(false)}
                    buttonCancelText="Sluiten"
                    showConfirmAction={false} // als jullie Modal dit ondersteunt; anders: confirmAction noop + hide confirm button
                    title={`Fouten bij ${cleanupDataItem.name}`}
                >
                    <div style={{ maxHeight: 260, overflowY: 'auto' }}>
                        <ul style={{ marginBottom: 0, paddingLeft: 18 }}>
                            {itemErrors.map((msg, idx) => (
                                <li key={idx}>{msg}</li>
                            ))}
                        </ul>
                    </div>
                </Modal>
            ) : null}
        </>
    );
}
