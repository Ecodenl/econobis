import React, { useState } from 'react';
import Icon from 'react-icons-kit';
import { refresh } from 'react-icons-kit/fa/refresh';
import { trash } from 'react-icons-kit/fa/trash';

import Modal from '../../../components/modal/Modal';
import DataCleanupItemsToolbar from './DataCleanupItemsToolbar';

export default function DataCleanupItemsItem({ cleanupDataItem, handleDataCleanupUpdateItems, confirmCleanup }) {
    const [showModal, setShowModal] = useState(false);
    const [showActionButtons, setShowActionButtons] = useState(true);
    const [modalErrorMessage, setModalErrorMessage] = useState([]);

    const onConfirm = async () => {
        setShowActionButtons(false);
        setModalErrorMessage([]);
        try {
            await confirmCleanup(cleanupDataItem.code_ref);
            setShowModal(false);
        } catch (e) {
            setModalErrorMessage(['Er ging iets mis tijdens opschonen.']);
            setShowActionButtons(true);
        }
    };

    return (
        <>
            <tr>
                <td>
                    {cleanupDataItem.name} ouder dan {cleanupDataItem.years_for_delete} jaar
                </td>
                <td>{cleanupDataItem.number_of_items_to_delete}</td>
                <td>{cleanupDataItem.date_determined}</td>
                <td>{cleanupDataItem.date_cleaned_up}</td>
                <td>
                    {showActionButtons && (
                        <>
                            <a role="button" onClick={() => handleDataCleanupUpdateItems(cleanupDataItem.code_ref)}>
                                <Icon className="mybtn-success" size={14} icon={refresh} />
                            </a>{' '}
                            <a role="button" onClick={() => setShowModal(true)}>
                                <Icon className="mybtn-success" size={14} icon={trash} />
                            </a>
                        </>
                    )}
                </td>
            </tr>
            {showModal ? (
                <Modal
                    closeModal={() => setShowModal(false)}
                    confirmAction={onConfirm}
                    buttonConfirmText="Opschonen"
                    buttonClassName={'btn-danger'}
                    title={`Bevestig opschonen ${cleanupDataItem.name}`}
                >
                    <div>
                        Weet u zeker dat u <strong>{cleanupDataItem.name}</strong>,{' '}
                        <strong>ouder dan {cleanupDataItem.years_for_delete} jaar</strong> wilt opschonen?
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
