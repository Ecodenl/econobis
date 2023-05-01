import React, {useState} from 'react';
import Modal from '../../../components/modal/Modal';
import Icon from "react-icons-kit";
import {trash} from 'react-icons-kit/fa/trash';
import EmailSplitviewAPI from "../../../api/email/EmailSplitviewAPI";

export default function EmailSplitViewBulkDeleteModal({emailIds, onDeleted}) {
    const [showModal, setShowModal] = useState(false);

    const doDelete = () => {
        EmailSplitviewAPI.deleteMultiple(emailIds).then(() => {
            setShowModal(false);
            onDeleted();
        });
    }

    return (
        <>
            <button
                type="button"
                title="Verwijderen"
                className={'btn btn-success btn-sm'}
                onClick={() => {
                    setShowModal(true);
                }}
            >
                <Icon icon={trash} size={13}/>
            </button>
            {showModal && (
                <Modal
                    buttonConfirmText="Verwijderen"
                    closeModal={() => setShowModal(false)}
                    confirmAction={doDelete}
                    title="Bevestigen"
                    buttonClassName={'btn-danger'}
                >
                    <p>Weet u zeker dat u deze {emailIds.length} emails wilt verwijderen?</p>
                </Modal>
            )}
        </>
    );
}

