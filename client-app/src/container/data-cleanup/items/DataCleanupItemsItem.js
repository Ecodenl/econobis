import React, { useState } from 'react';
import Icon from 'react-icons-kit';
import { refresh } from 'react-icons-kit/fa/refresh';
import { trash } from 'react-icons-kit/fa/trash';

import Modal from '../../../components/modal/Modal';

export default function DataCleanupItemsItem({ cleanupDataItem, handleDataCleanupUpdateItem, confirmCleanup }) {
    const [showModal, setShowModal] = useState(false);
    const [showActionButtons, setShowActionButtons] = useState(true);
    const [modalErrorMessage, setModalErrorMessage] = useState([]);

    const onConfirm = async () => {
        setShowActionButtons(false);
        setModalErrorMessage([]);
        try {
            await confirmCleanup(cleanupDataItem);
            setShowModal(false);
        } catch (e) {
            setModalErrorMessage(['Er ging iets mis tijdens opschonen.']);
        } finally {
            setShowActionButtons(true);
        }
    };

    return (
        <>
            <tr>
                <td>
                    {cleanupDataItem.name} ouder dan {cleanupDataItem.yearsForDelete} jaar
                </td>
                <td>{cleanupDataItem.numberOfItemsToDelete}</td>
                <td>{cleanupDataItem?.dateDetermined}</td>
                <td>{cleanupDataItem.dateCleanedUp}</td>
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
                            </a>{' '}
                            <a
                                role="button"
                                title={`Opschonen ${cleanupDataItem.name}`}
                                onClick={() => setShowModal(true)}
                            >
                                <Icon className="mybtn-success" size={14} icon={trash} />
                            </a>
                        </>
                    )}
                </td>
            </tr>
            {showModal ? (
                <Modal
                    closeModal={() => {
                        setShowModal(false);
                    }}
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
                                <ul>
                                    {modalErrorMessage.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </Modal>
            ) : null}
        </>
    );
}
