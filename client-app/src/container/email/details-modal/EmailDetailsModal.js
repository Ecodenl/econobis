import React, {useEffect, useState} from 'react';
import Modal from '../../../components/modal/Modal';
import EmailDetailsModalView from "./EmailDetailsModalView";
import EmailDetailsModalEdit from "./EmailDetailsModalEdit";
import EmailDetailsAPI from "../../../api/email/EmailDetailsAPI";
import EmailGenericAPI from "../../../api/email/EmailGenericAPI";

export default function EmailDetailsModal({emailId, showModal, setShowModal, onSave}) {
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

    const updateEmailAttributes = (attributes) => {
        setEmail({
            ...email,
            ...attributes,
        });
    }

    const save = () => {
        EmailGenericAPI.update(emailId, {
            responsibleUserId: email.responsibleUserId,
            responsibleTeamId: email.responsibleTeamId,
            status: email.status,
            intakeId: email.intakeId,
            taskId: email.taskId,
            quotationRequestId: email.quotationRequestId,
            measureId: email.measureId,
            opportunityId: email.opportunityId,
            orderId: email.orderId,
            invoiceId: email.invoiceId,
        }).then(() => {
            setShowModal(false);

            onSave();
        });
    }

    if (!email) return null;

    return (
        <>
            {showModal && (
                <Modal
                    buttonConfirmText="Opslaan"
                    closeModal={() => setShowModal(false)}
                    confirmAction={save}
                    title={'Email van ' + email.from}
                    modalMainClassName="modal-fullscreen"
                    headerRight={(
                            <div>
                                <button type="button" className="btn btn-default" onClick={() => {setShowEdit(true)}}>
                                    Bewerken
                                </button>
                            </div>
                        )}
                >
                    {showEdit ? (
                        <EmailDetailsModalEdit email={email} updateEmailAttributes={updateEmailAttributes}/>
                    ) : (
                        <EmailDetailsModalView email={email} updateEmailAttributes={updateEmailAttributes}/>
                    )}
                </Modal>
            )}
        </>
    );
}

