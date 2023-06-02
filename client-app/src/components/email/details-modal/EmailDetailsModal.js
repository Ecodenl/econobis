import React, {useEffect, useState} from 'react';
import Modal from '../../../components/modal/Modal';
import EmailDetailsModalView from "./EmailDetailsModalView";
import EmailDetailsModalEdit from "./EmailDetailsModalEdit";
import EmailDetailsAPI from "../../../api/email/EmailDetailsAPI";
import EmailGenericAPI from "../../../api/email/EmailGenericAPI";

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

    useEffect(() => {
        if (email && email.withSaveAndClose) {
            save();
        }
    }, [email]);

    const updateEmailAttributes = (attributes) => {
        // Als we in weergave modus zitten willen we bij bewerken van status of verantwoordelijke meteen opslaan en popup sluiten
        let saveAndClose = (!showEdit && (Object.keys(attributes).some(key => ['responsibleUserId', 'responsibleTeamId', 'status'].includes(key))));

        setEmail({
            ...email,
            ...attributes,
            withSaveAndClose: saveAndClose,
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
            contactIds: email.contacts.map(c => c.id),
        }).then(() => {
            setShowEdit(false);
            setShowModal(false);
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
                        <EmailDetailsModalEdit email={email} updateEmailAttributes={updateEmailAttributes} onRemoved={() => setShowModal(false)} />
                    ) : (
                        <EmailDetailsModalView email={email} updateEmailAttributes={updateEmailAttributes} onRemoved={() => setShowModal(false)} />
                    )}
                </Modal>
            )}
        </>
    );
}

