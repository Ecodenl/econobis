import React, { useEffect, useState } from 'react';
import Modal from '../../../components/modal/Modal';
import EmailSendAPI from '../../../api/email/EmailSendAPI';
import InputReactSelectLong from '../../../components/form/InputReactSelectLong';
import MailboxAPI from '../../../api/mailbox/MailboxAPI';
import validator from 'validator';
import InputText from '../../../components/form/InputText';
import AsyncSelectSet from '../../../components/form/AsyncSelectSet';
import EmailAddressAPI from '../../../api/contact/EmailAddressAPI';
import EmailTemplateAPI from '../../../api/email-template/EmailTemplateAPI';
import InputTinyMCEUpdateable from '../../../components/form/InputTinyMCEUpdateable';
import EmailSendModalAttachments from './EmailSendModalAttachments';
import EmailAttachmentAPI from '../../../api/email/EmailAttachmentAPI';
import EmailGenericAPI from '../../../api/email/EmailGenericAPI';
import InputCheckbox from '../../form/InputCheckbox';
import ContactsAPI from '../../../api/contact/ContactsAPI';

export default function EmailSendModal({ emailId, showModal, setShowModal }) {
    const [email, setEmail] = useState(null);
    const [mailboxAddresses, setMailboxAddresses] = useState([]);
    const [emailTemplates, setEmailTemplates] = useState([]);
    const [emailTemplateId, setEmailTemplateId] = useState(null);
    const [errors, setErrors] = useState({});
    const [initialHtmlBody, setInitialHtmlBody] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [isMarkedForSending, setIsMarkedForSending] = useState(false);

    useEffect(() => {
        if (!showModal) {
            return;
        }

        fetchEmail();

        setEmailTemplateId(null);

        /**
         * 20230817 Jos; Besproken met Sjiron
         * Onderstaande fetches worden elke keer bij openen opnieuw gedaan.
         * Dit is bewust omdat actuele data hier zwaarder weegt dan het besparen van deze fetches/queries.
         */
        MailboxAPI.fetchMailboxesLoggedInUserPeek().then(payload => {
            setMailboxAddresses(payload.data.data);
        });

        EmailTemplateAPI.fetchEmailTemplatesPeek().then(payload => {
            setEmailTemplates(payload);
        });
    }, [showModal]);

    const fetchEmail = () => {
        EmailSendAPI.fetchEmail(emailId).then(data => {
            setEmail(data);

            setInitialHtmlBody(data.htmlBody);
        });
    };

    const validate = () => {
        setErrors({});

        let newErrors = {};

        if (validator.isEmpty('' + email.mailboxId)) {
            newErrors = { ...newErrors, mailboxId: 'Verplicht' };
        }

        if (validator.isEmpty('' + email.subject)) {
            newErrors = { ...newErrors, subject: 'Verplicht' };
        }

        if (!email.contactGroup && email.toAddresses.length === 0) {
            newErrors = { ...newErrors, toAddresses: 'Verplicht' };
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const updateEmail = values => {
        let newEmail = { ...email, ...values };
        setEmail(newEmail);

        return save(values);
    };

    useEffect(() => {
        if (emailTemplateId) {
            applyEmailTemplate(emailTemplateId);
        }
    }, [emailTemplateId]);
    const applyEmailTemplate = templateId => {
        EmailTemplateAPI.fetchEmailTemplateWithUser(templateId).then(payload => {
            let emailData = {
                subject: email.subject,
                htmlBody: email.htmlBody,
            };

            if (email.isForwardOrReply) {
                emailData.htmlBody = payload.htmlBody + '<br />' + email.htmlBody;
            } else {
                emailData.subject = payload.subject;
                emailData.htmlBody = payload.htmlBody;
            }

            updateEmail(emailData).then(() => {
                if (payload.defaultAttachmentDocument) {
                    EmailAttachmentAPI.addDocumentsAsAttachments(email.id, [payload.defaultAttachmentDocument.id]).then(
                        () => {
                            fetchEmail();
                        }
                    );
                }
            });
        });
    };

    useEffect(() => {
        if (isMarkedForSending && !isSaving) {
            /**
             * We verzenden obv deze 2 flags.
             * Dit is ingebouwd om ervoor te zorgen dat eerst alle wijzigingen zijn opgeslagen voordat we gaan verzenden.
             * Als we direct zouden verzenden kan de inhoud van de email nog leeg zijn omdat het blur event nog niet volledig is afgehandeld.
             */
            EmailSendAPI.send(emailId).then(() => {
                setIsMarkedForSending(false);
                setShowModal(false);
            });
        }
    }, [isMarkedForSending, isSaving]);

    const send = () => {
        if (!validate()) {
            return;
        }

        setIsMarkedForSending(true);
    };

    const save = (values = {}) => {
        setIsSaving(true);

        let newEmail = { ...email, ...values };

        return EmailSendAPI.saveConcept(emailId, {
            mailboxId: newEmail.mailboxId,
            to: newEmail.toAddresses.map(to => to.id),
            cc: newEmail.ccAddresses.map(cc => cc.id),
            bcc: newEmail.bccAddresses.map(bcc => bcc.id),
            manualContactIds: newEmail.manualContacts.map(c => c.id),
            subject: newEmail.subject,
            htmlBody: newEmail.htmlBody,
            mailContactGroupWithSingleMail: newEmail.mailContactGroupWithSingleMail,
        }).then(() => {
            setIsSaving(false);
        });
    };

    const moveToRemoved = () => {
        EmailGenericAPI.update(emailId, { folder: 'removed' }).then(() => {
            setShowModal(false);
        });
    };

    const getContactEmailOptions = async searchTerm => {
        return EmailAddressAPI.fetchEmailAddressessSearch(searchTerm).then(payload => payload.data);
    };

    const getContactOptions = async searchTerm => {
        return ContactsAPI.fetchContactSearch(searchTerm).then(payload => payload.data.data);
    };

    if (!email) return null;

    return (
        <>
            {showModal && (
                <Modal
                    buttonConfirmText="Versturen"
                    closeModal={() => {
                        setShowModal(false);
                    }}
                    confirmAction={send}
                    title={'Email versturen'}
                    modalMainClassName="modal-fullscreen"
                    extraButtonAction={moveToRemoved}
                    extraButtonClass={'btn btn-danger'}
                    extraButtonLabel={'Concept verwijderen'}
                    buttonCancelText="Concept opslaan"
                >
                    <div className="row">
                        <InputReactSelectLong
                            label="Van selecteren"
                            name={'mailboxId'}
                            value={email.mailboxId}
                            options={mailboxAddresses}
                            optionName={'email'}
                            onChangeAction={value => updateEmail({ mailboxId: value })}
                            required={'required'}
                            error={!!errors.mailboxId}
                            errorMessage={errors.mailboxId}
                        />
                    </div>
                    <div className="row">
                        {email.contactGroup ? (
                            <>
                                <InputText
                                    label={
                                        <span>
                                            Groep
                                            <br />
                                            <small style={{ color: 'red', fontWeight: 'normal' }}>
                                                Contacten in groep en extra contacten krijgen elk een aparte mail en
                                                zien niet e-mail adressen van anderen. Samenvoegvelden werken niet voor
                                                extra contacten waar alleen emailadres is toegevoegd.
                                            </small>
                                        </span>
                                    }
                                    name={'contactGroupName'}
                                    value={email.contactGroup.name}
                                    readOnly={true}
                                />
                                <InputCheckbox
                                    name={'mailContactGroupWithSingleMail'}
                                    checked={email.mailContactGroupWithSingleMail}
                                    label={
                                        <span>
                                            Verstuur in enkele mail
                                            <br />
                                            <small style={{ color: 'red', fontWeight: 'normal' }}>
                                                Bij het versturen via enkele mail worden alle contacten van de groep in
                                                "aan" gezet en zijn ontvangers zichtbaar voor elkaar. Samenvoegvelden
                                                zijn bij inschakelen van deze optie niet beschikbaar.
                                            </small>
                                        </span>
                                    }
                                    onChangeAction={event =>
                                        updateEmail({ mailContactGroupWithSingleMail: event.target.checked })
                                    }
                                />
                            </>
                        ) : (
                            <AsyncSelectSet
                                label={
                                    <span>
                                        Aan selecteren
                                        {email.toAddresses.length > 1 ? (
                                            <React.Fragment>
                                                <br />
                                                <small style={{ color: 'red', fontWeight: 'normal' }}>
                                                    Meer dan 1 geselecteerd.
                                                </small>
                                                <br />
                                                <small style={{ color: 'red', fontWeight: 'normal' }}>
                                                    Samenvoegvelden contact niet mogelijk.
                                                </small>
                                            </React.Fragment>
                                        ) : email.toAddresses.some(e => (e.id + '').includes('@')) ? (
                                            <React.Fragment>
                                                <br />
                                                <small style={{ color: 'red', fontWeight: 'normal' }}>
                                                    Geen contact geselecteerd, maar "los" emailadres ingevuld.
                                                </small>
                                                <br />
                                                <small style={{ color: 'red', fontWeight: 'normal' }}>
                                                    Samenvoegvelden contact niet mogelijk.
                                                </small>
                                            </React.Fragment>
                                        ) : (
                                            ''
                                        )}
                                    </span>
                                }
                                name={'to'}
                                value={email.toAddresses}
                                loadOptions={getContactEmailOptions}
                                optionName={'name'}
                                onChangeAction={value => updateEmail({ toAddresses: value ? value : [] })}
                                allowCreate={true}
                                required={'required'}
                                error={!!errors.toAddresses}
                                errorMessage={errors.toAddresses}
                            />
                        )}
                    </div>
                    <div className="row">
                        <AsyncSelectSet
                            label={email.contactGroup ? 'Extra contacten' : 'Cc selecteren'}
                            name={'cc'}
                            value={email.ccAddresses}
                            loadOptions={getContactEmailOptions}
                            optionName={'name'}
                            onChangeAction={value => updateEmail({ ccAddresses: value ? value : [] })}
                            allowCreate={true}
                        />
                    </div>
                    {!email.contactGroup && (
                        <div className="row">
                            <AsyncSelectSet
                                label="Bcc selecteren"
                                name={'bcc'}
                                value={email.bccAddresses}
                                loadOptions={getContactEmailOptions}
                                optionName={'name'}
                                onChangeAction={value => updateEmail({ bccAddresses: value ? value : [] })}
                                allowCreate={true}
                            />
                        </div>
                    )}
                    <div className="row">
                        <AsyncSelectSet
                            label="Eenmalig te koppelen contacten"
                            name={'contact_email'}
                            value={email.manualContacts}
                            loadOptions={getContactOptions}
                            optionName={'fullName'}
                            onChangeAction={value => updateEmail({ manualContacts: value ? value : [] })}
                            allowCreate={false}
                            textToolTip={
                                'Bij contacten die je hier invult, wordt wel deze e-mail gekoppeld, maar niet het afzender e-mailadres gekoppeld in hun contactgegevens. <br> Bij het gebruik van dit veld bij het versturen van een e-mail zal dit contact geen email ontvangen maar is deze mail wel te zien bij het contact rechtsboven bij “email verzonden”.'
                            }
                        />
                    </div>
                    <div className="row">
                        <InputReactSelectLong
                            label="Template"
                            name={'emailTemplateId'}
                            value={emailTemplateId}
                            options={emailTemplates}
                            onChangeAction={setEmailTemplateId}
                        />
                    </div>
                    <div className="row">
                        <div className="form-group col-sm-12">
                            <div className="row">
                                <div className="col-sm-3">
                                    <label className="col-sm-12 required">Onderwerp</label>
                                </div>
                                <div className="col-sm-9">
                                    <input
                                        type="text"
                                        className={`form-control input-sm ${errors.subject ? 'has-error' : ''}`}
                                        name="subject"
                                        value={email.subject}
                                        onChange={e => setEmail({ ...email, subject: e.target.value })}
                                        onBlur={save}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ marginBottom: '10px' }}>
                        <div className="form-group col-sm-12">
                            <div className="row">
                                <InputTinyMCEUpdateable
                                    label={'Tekst'}
                                    initialValue={initialHtmlBody}
                                    value={email.htmlBody}
                                    onChangeAction={value => setEmail({ ...email, htmlBody: value })}
                                    onBlur={save}
                                />
                            </div>
                        </div>
                    </div>

                    <EmailSendModalAttachments email={email} setEmail={setEmail} updated={fetchEmail} />
                </Modal>
            )}
        </>
    );
}
