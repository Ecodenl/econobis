import React, { useContext } from 'react';
import Icon from 'react-icons-kit';
import { mailReply } from 'react-icons-kit/fa/mailReply';
import { mailReplyAll } from 'react-icons-kit/fa/mailReplyAll';
import { mailForward } from 'react-icons-kit/fa/mailForward';
import { trash } from 'react-icons-kit/fa/trash';
import { rotateLeft } from 'react-icons-kit/fa/rotateLeft';
import { externalLink } from 'react-icons-kit/fa/externalLink';
import { pencil } from 'react-icons-kit/fa/pencil';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import InputSelect from '../../../components/form/InputSelect';
import EmailGenericAPI from '../../../api/email/EmailGenericAPI';
import EmailAddressList from '../../../components/email/EmailAddressList';
import ResponsibleInputSelect from '../../../components/email/ResponsibleInputSelect';
import { EmailModalContext } from '../../../context/EmailModalContext';
import { mapEmojiToStatuses } from '../../../helpers/EmailStatusHelpers';

export default function EmailSplitViewDetailsHeaderPanel({ email, updateEmailAttributes, deleted, refetchCurrentEmails }) {
    const { openEmailDetailsModal, openEmailSendModal } = useContext(EmailModalContext);
    const statusses = useSelector(state => mapEmojiToStatuses(state.systemData.emailStatuses));

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

    const deleteEmail = () => {
        if (!confirm('Weet je zeker dat je dit e-mailbericht permanent wilt verwijderen?')) {
            return;
        }

        EmailGenericAPI.deleteMultiple([email.id]).then(() => {
            deleted();
        });
    };

    const refetchEmail = () => {
        if (!confirm('Weet je zeker dat je dit e-mailbericht wilt terugzetten naar de inbox?')) {
            return;
        }

        refetchCurrentEmails();
    };

    return (
        <div className="panel panel-default">
            <div className="panel-body panel-small">
                <div className="row">
                    <div className="col-md-6" style={{ paddingLeft: '25px' }}>
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

                        <div className="btn-group margin-small" role="group">
                            <button
                                type="button"
                                title="Verwijderen"
                                className={'btn btn-sm ' + (email.folder === 'removed' ? 'btn-danger' : ' btn-success')}
                                onClick={() =>
                                    email.folder === 'removed'
                                        ? deleteEmail()
                                        : updateEmailAttributes({ folder: 'removed' })
                                }
                            >
                                <Icon icon={trash} size={13} />
                            </button>

                            {email.folder === 'removed' && (
                                <button
                                    type="button"
                                    title="Verwijderen ongedaan maken"
                                    className={'btn btn-sm btn-success'}
                                    onClick={() => {
                                        updateEmailAttributes({ folder: 'inbox' });
                                        refetchEmail();
                                    }}
                                >
                                    <Icon icon={rotateLeft} size={13} />
                                </button>
                            )}

                            {email.folder !== 'concept' && (
                                <button
                                    type="button"
                                    title="Openen"
                                    className={'btn btn-success btn-sm'}
                                    onClick={() => openEmailDetailsModal(email.id)}
                                >
                                    <Icon icon={externalLink} size={13} />
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <label className="col-sm-6">Aan</label>
                        <div className="col-sm-6">
                            <EmailAddressList
                                emailAddresses={(() => {
                                    let addresses = [...email.toAddresses];

                                    if (email.contactGroup) {
                                        addresses.push({
                                            email: null,
                                            name: email.contactGroup.name,
                                        });
                                    }

                                    return addresses;
                                })()}
                            />
                        </div>
                    </div>
                </div>
                <div className="row" style={{ marginTop: '12px' }}>
                    <div className="col-sm-6">
                        <label className="col-sm-6">Gekoppeld contact</label>
                        <div className="col-sm-6">
                            {email &&
                                [...email.contacts, ...email.manualContacts].map(contact => {
                                    return (
                                        <span key={contact.id}>
                                            <Link to={`/contact/${contact.id}`} className="link-underline">
                                                {contact.fullName}
                                            </Link>{' '}
                                            <br />
                                        </span>
                                    );
                                })}
                        </div>
                    </div>
                    <InputSelect
                        label={'Status'}
                        size={'col-sm-6'}
                        name={'status'}
                        options={statusses}
                        value={email.status}
                        onChangeAction={e => updateEmailAttributes({ status: e.target.value })}
                        emptyOption={false}
                    />
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <label className="col-sm-6">CC</label>
                        <div className="col-sm-6">
                            <EmailAddressList emailAddresses={email.ccAddresses} />
                        </div>
                    </div>
                    <ResponsibleInputSelect
                        values={{
                            responsibleUserId: email.responsibleUserId,
                            responsibleTeamId: email.responsibleTeamId,
                        }}
                        onChangeAction={updateEmailAttributes}
                    />
                </div>
                <div className="row">
                    <div className="col-sm-3">
                        <label className="col-sm-12">Opmerking</label>
                    </div>
                    <div className="col-sm-9">{email.note}</div>
                </div>
            </div>
        </div>
    );
}