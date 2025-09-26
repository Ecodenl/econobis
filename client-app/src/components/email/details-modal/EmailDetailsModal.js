import React, { useContext, useEffect, useState } from 'react';
import Modal from '../../../components/modal/Modal';
import EmailDetailsModalView from './EmailDetailsModalView';
import EmailDetailsModalEdit from './EmailDetailsModalEdit';
import EmailDetailsAPI from '../../../api/email/EmailDetailsAPI';
import EmailGenericAPI from '../../../api/email/EmailGenericAPI';
import { useNavigate } from 'react-router-dom';
import Icon from 'react-icons-kit';
import CopyToClipboard from 'react-copy-to-clipboard';
import { mailReply } from 'react-icons-kit/fa/mailReply';
import { mailReplyAll } from 'react-icons-kit/fa/mailReplyAll';
import { mailForward } from 'react-icons-kit/fa/mailForward';
import { trash } from 'react-icons-kit/fa/trash';
import { pencil } from 'react-icons-kit/fa/pencil';
import { copy } from 'react-icons-kit/fa/copy';
import { arrowLeft } from 'react-icons-kit/fa/arrowLeft';
import { EmailModalContext } from '../../../context/EmailModalContext';

export default function EmailDetailsModal({ emailId, showModal, setShowModal }) {
    const navigate = useNavigate();

    const [showEdit, setShowEdit] = useState(false);
    const [email, setEmail] = useState(null);
    const domain = window.location.origin;
    const { openEmailSendModal } = useContext(EmailModalContext);

    const createReply = () => {
        EmailGenericAPI.storeReply(email.id).then(payload => {
            openEmailSendModal(payload.data.id);
        });
    };

    const createReplyAll = () => {
        EmailGenericAPI.storeReplyAll(email.id).then(payload => {
            openEmailSendModal(payload.data.id);
        });
    };

    const createForward = () => {
        EmailGenericAPI.storeForward(email.id).then(payload => {
            openEmailSendModal(payload.data.id);
        });
    };

    const moveToRemoved = () => {
        EmailGenericAPI.update(email.id, { folder: 'removed' }).then(() => {
            setShowModal(false);
        });
    };

    useEffect(() => {
        if (!showModal) {
            return;
        }

        fetchEmail();
    }, [showModal]);

    useEffect(() => {
        if (email && email.withSaveAndClose) {
            save();
        }
    }, [email]);

    const fetchEmail = () => {
        EmailDetailsAPI.fetchEmail(emailId).then(data => {
            setEmail(data);
        });
    };

    const updateEmailAttributes = attributes => {
        // Als we in weergave modus zitten willen we bij bewerken van status of verantwoordelijke meteen opslaan en popup sluiten
        let saveAndClose =
            !showEdit &&
            Object.keys(attributes).some(key => ['responsibleUserId', 'responsibleTeamId', 'status'].includes(key));

        setEmail({
            ...email,
            ...attributes,
            withSaveAndClose: saveAndClose,
        });
    };

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
            manualContactIds: email.manualContacts.map(c => c.id),
            note: email.note,
        }).then(() => {
            setShowEdit(false);
            setShowModal(false);
        });
    };

    const createContact = () => {
        EmailGenericAPI.createContact(emailId).then(() => {
            fetchEmail();
        });
    };

    const goTo = link => {
        setShowModal(false);
        navigate(link);
    };

    if (!email) return null;

    return (
        <>
            {showModal && (
                <Modal
                    buttonConfirmText="Opslaan"
                    closeModal={() => {
                        setShowEdit(false);
                        setShowModal(false);
                    }}
                    confirmAction={save}
                    title={
                        <div className="row" style={{ marginLeft: '-5px' }}>
                            <div className="col-md-12">
                                <div className="btn-group margin-small margin-10-right" role="group">
                                    <button
                                        type="button"
                                        title="Terug"
                                        className={'btn btn-success btn-sm'}
                                        onClick={() => setShowModal(false)}
                                    >
                                        <Icon icon={arrowLeft} size={13} />
                                    </button>
                                </div>
                                {email.folder !== 'concept' && (
                                    <div className="btn-group margin-small margin-10-right" role="group">
                                        <button
                                            type="button"
                                            title="Beantwoorden"
                                            className={'btn btn-success btn-sm'}
                                            onClick={createReply}
                                        >
                                            <Icon icon={mailReply} size={13} />
                                        </button>
                                        <button
                                            type="button"
                                            title="Allen beantwoorden"
                                            className={'btn btn-success btn-sm'}
                                            onClick={createReplyAll}
                                        >
                                            <Icon icon={mailReplyAll} size={13} />
                                        </button>
                                        <button
                                            type="button"
                                            title="Doorsturen"
                                            className={'btn btn-success btn-sm'}
                                            onClick={createForward}
                                        >
                                            <Icon icon={mailForward} size={13} />
                                        </button>
                                    </div>
                                )}

                                {email.folder === 'concept' && (
                                    <div className="btn-group margin-small margin-10-right" role="group">
                                        <button
                                            type="button"
                                            title="Openen"
                                            className={'btn btn-success btn-sm'}
                                            onClick={() => openEmailSendModal(email.id)}
                                        >
                                            <Icon icon={pencil} size={13} />
                                        </button>
                                    </div>
                                )}

                                <div className="btn-group margin-small margin-10-right" role="group">
                                    <button
                                        type="button"
                                        title={showEdit ? ' Bewerken annuleren' : 'Bewerken'}
                                        className={'btn btn-success btn-sm'}
                                        onClick={() => setShowEdit(!showEdit)}
                                    >
                                        <Icon icon={pencil} size={13} />
                                    </button>
                                    <button
                                        type="button"
                                        title="Verwijderen"
                                        className={'btn btn-success btn-sm'}
                                        onClick={moveToRemoved}
                                    >
                                        <Icon icon={trash} size={13} />
                                    </button>
                                    <CopyToClipboard text={domain + '/#/mailclient/email/' + email.id}>
                                        <button
                                            type="button"
                                            title="Haal directe link naar e-mail op"
                                            className={'btn btn-success btn-sm'}
                                        >
                                            <Icon icon={copy} size={13} />
                                        </button>
                                    </CopyToClipboard>
                                </div>

                                {createContact && (
                                    <div className="btn-group margin-small" role="group">
                                        {email && email.contacts && email.contacts.length === 0 && (
                                            <button className="btn btn-success btn-sm" onClick={createContact}>
                                                Contact aanmaken
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    }
                    modalMainClassName="modal-fullscreen"
                    headerRight={
                        <h4
                            className="close-modal"
                            onClick={() => {
                                setShowModal(false);
                            }}
                        >
                            X
                        </h4>
                    }
                >
                    {showEdit ? (
                        <EmailDetailsModalEdit
                            email={email}
                            updateEmailAttributes={updateEmailAttributes}
                            setShowEdit={setShowEdit}
                        />
                    ) : (
                        <EmailDetailsModalView
                            email={email}
                            updateEmailAttributes={updateEmailAttributes}
                            createContact={createContact}
                            goTo={goTo}
                            setShowEdit={setShowEdit}
                        />
                    )}
                </Modal>
            )}
        </>
    );
}
