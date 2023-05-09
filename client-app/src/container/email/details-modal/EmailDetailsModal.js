import React, {useEffect, useState} from 'react';
import Modal from '../../../components/modal/Modal';
import EmailDetailsModalView from "./EmailDetailsModalView";
import EmailDetailsModalEdit from "./EmailDetailsModalEdit";
import EmailDetailsAPI from "../../../api/email/EmailDetailsAPI";

export default function EmailDetailsModal({emailId, showModal, setShowModal}) {
    const [showEdit, setShowEdit] = useState(false);
    const [email, setEmail] = useState(null);

    useEffect(() => {
        if (!showModal) {
            return;
        }

        EmailDetailsAPI.fetchEmail(emailId).then(data => {
            setEmail(data)
        });
    }, [showModal]);

    const save = () => {
        setShowModal(false);
    }

    if (!email) return null;

    return (
        <>
            {showModal && (
                <Modal
                    buttonConfirmText="Sluiten"
                    closeModal={() => setShowModal(false)}
                    confirmAction={save}
                    title={'Email van ' + email.from}
                    modalMainClassName="modal-fullscreen"
                >
                    {showEdit ? (
                        <EmailDetailsModalEdit email={email}/>
                    ) : (
                        <EmailDetailsModalView email={email} onClick={() => setShowEdit(true)}/>
                    )}
                </Modal>
            )}
        </>
    );
}

