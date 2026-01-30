import React, { useState } from 'react';
import Icon from 'react-icons-kit';
import { refresh } from 'react-icons-kit/fa/refresh';
import { trash } from 'react-icons-kit/fa/trash';

import Modal from '../../../components/modal/Modal';

export default function DataCleanupItemsItem({ cleanupDataItem, handleDataCleanupUpdateItem, confirmCleanup }) {
    const [showModal, setShowModal] = useState(false);
    const [showActionButtons, setShowActionButtons] = useState(true);
    const [modalErrorMessage, setModalErrorMessage] = useState([]);

    const splitApiMessage = msg =>
        (msg || '')
            .split(';')
            .map(s => s.trim())
            .filter(Boolean);

    const onConfirm = async () => {
        setShowActionButtons(false);
        setModalErrorMessage([]);

        try {
            console.log('confirmCleanup result', await confirmCleanup(cleanupDataItem));
            // await confirmCleanup(cleanupDataItem);

            setShowModal(false);
        } catch (e) {
            const apiMsg = e?.response?.data?.message || e?.response?.data?.error || '';

            const errors = splitApiMessage(apiMsg);

            setModalErrorMessage(errors.length ? errors : ['Er ging iets mis tijdens opschonen.']);
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
                    {cleanupDataItem.name} ouder dan {cleanupDataItem.yearsForDelete} jaar
                </td>
                <td>{cleanupDataItem.numberOfItemsToDelete}</td>
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
                <td>{cleanupDataItem.numberOfItemsCleaned}</td>
                <td>{cleanupDataItem.numberOfItemsFailed}</td>
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
                        <strong>ouder dan {cleanupDataItem.yearsForDelete} jaar</strong> wilt opschonen?
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
        </>
    );
}
