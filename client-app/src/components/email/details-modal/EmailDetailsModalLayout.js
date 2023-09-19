import React, {useContext, useEffect} from 'react';
import ViewText from "../../../components/form/ViewText";
import moment from "moment/moment";
import Panel from "../../../components/panel/Panel";
import EmailAddressList from "../../../components/email/EmailAddressList";
import EmailAttachmentsPanel from "../../../components/email/EmailAttachmentsPanel";
import ResponsibleInputSelect from "../../../components/email/ResponsibleInputSelect";
import InputSelect from "../../../components/form/InputSelect";
import {useSelector} from "react-redux";
import Icon from "react-icons-kit";
import {mailReply} from 'react-icons-kit/fa/mailReply';
import {mailReplyAll} from 'react-icons-kit/fa/mailReplyAll';
import {mailForward} from 'react-icons-kit/fa/mailForward';
import {trash} from 'react-icons-kit/fa/trash';
import {pencil} from 'react-icons-kit/fa/pencil';
import {copy} from 'react-icons-kit/fa/copy';
import EmailGenericAPI from "../../../api/email/EmailGenericAPI";
import {EmailModalContext} from "../../../context/EmailModalContext";
import {mapEmojiToStatuses} from "../../../helpers/EmailStatusHelpers";
import CopyToClipboard from "react-copy-to-clipboard";
import AsyncSelectSet from "../../form/AsyncSelectSet";
import ContactsAPI from "../../../api/contact/ContactsAPI";
import Frame from 'react-frame-component';

export default function EmailDetailsModalLayout({
                                                    email,
                                                    updateEmailAttributes,
                                                    intakeComponent,
                                                    taskComponent,
                                                    quotationRequestComponent,
                                                    measureComponent,
                                                    opportunityComponent,
                                                    orderComponent,
                                                    invoiceComponent,
                                                    onRemoved,
                                                    noteComponent,
                                                    editButtonComponent,
                                                    createContact,
                                                }) {
    const statusses = useSelector((state) => mapEmojiToStatuses(state.systemData.emailStatuses));
    const {openEmailSendModal} = useContext(EmailModalContext);
    const domain = window.location.origin;

    const createReply = () => {
        EmailGenericAPI.storeReply(email.id).then(payload => {
            openEmailSendModal(payload.data.id)
        });
    }

    const createReplyAll = () => {
        EmailGenericAPI.storeReplyAll(email.id).then(payload => {
            openEmailSendModal(payload.data.id)
        });
    }

    const createForward = () => {
        EmailGenericAPI.storeForward(email.id).then(payload => {
            openEmailSendModal(payload.data.id)
        });
    }

    const moveToRemoved = () => {
        EmailGenericAPI.update(email.id, {folder: 'removed'}).then(() => {
            onRemoved();
        });
    }

    useEffect(() => {
        document.getElementById("details-modal-email-html").addEventListener("click", captureMailtoLinks);

        return () => {
            if(document.getElementById("details-modal-email-html")){
                document.getElementById("details-modal-email-html").removeEventListener("click", captureMailtoLinks);
            }
        }
    }, []);

    const captureMailtoLinks = (event) => {
        if (event.target.tagName === 'A' && event.target.href && event.target.href.indexOf('mailto:') !== -1) {
            event.preventDefault();

            if(confirm('Wil je een e-mail opstellen aan mailadres ' + event.target.href.replace('mailto:', '') + '?')) {
                EmailGenericAPI.storeNew({
                    to: [event.target.href.replace('mailto:', '')],
                }).then(payload => {
                    openEmailSendModal(payload.data.id)
                });
            }
        }
    }

    const getContactOptions = (searchTerm) => {
        return ContactsAPI.fetchContactSearch(searchTerm).then(payload => payload.data.data);
    };

    return (
        <div>
            <div className="row" style={{marginLeft: '-5px'}}>
                <div className="col-md-12">
                    {email.folder !== 'concept' && (
                        <div className="btn-group margin-small margin-10-right" role="group">
                            <button
                                type="button"
                                title="Beantwoorden"
                                className={'btn btn-success btn-sm'}
                                onClick={createReply}
                            >
                                <Icon icon={mailReply} size={13}/>
                            </button>
                            <button
                                type="button"
                                title="Allen beantwoorden"
                                className={'btn btn-success btn-sm'}
                                onClick={createReplyAll}
                            >
                                <Icon icon={mailReplyAll} size={13}/>
                            </button>
                            <button
                                type="button"
                                title="Doorsturen"
                                className={'btn btn-success btn-sm'}
                                onClick={createForward}
                            >
                                <Icon icon={mailForward} size={13}/>
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
                                <Icon icon={pencil} size={13}/>
                            </button>
                        </div>
                    )}

                    <div className="btn-group margin-small margin-10-right" role="group">
                        {editButtonComponent}
                        <button
                            type="button"
                            title="Verwijderen"
                            className={'btn btn-success btn-sm'}
                            onClick={moveToRemoved}
                        >
                            <Icon icon={trash} size={13}/>
                        </button>
                        <CopyToClipboard text={domain + '/#/mailclient/email/' + email.id}>
                            <button
                                type="button"
                                title="Haal directe link naar e-mail op"
                                className={'btn btn-success btn-sm'}
                            >
                                <Icon icon={copy} size={13}/>
                            </button>
                        </CopyToClipboard>
                    </div>

                    {createContact && (
                        <div className="btn-group margin-small" role="group">
                            {
                                email && email.contacts &&
                                email.contacts.length === 0 && (
                                    <button className="btn btn-success btn-sm" onClick={createContact}>Contact aanmaken</button>
                                )
                            }
                        </div>
                    )}

                </div>
            </div>

            {email.folder === 'removed' ? (
                <>
                    <div className="row">
                        <ViewText
                            label={'Verwijderd door'}
                            value={email.removedBy ? email.removedBy.fullName : 'Onbekend'}
                            link={email.removedBy ? 'gebruiker/' + email.removedBy.id : ''}
                        />
                        <ViewText
                            label={'Datum verwijderd'}
                            value={email.dateRemoved ? moment(email.dateRemoved).format('DD-MM-YYYY HH:mm') : ''}
                        />
                    </div>
                    <hr/>
                </>
            ) : null}
            <div className="row">
                <ViewText label={'Van'} value={email.from}/>
                <ViewText
                    label={'Ontvangen datum tijd'}
                    value={email.createdAt ? moment(email.createdAt).format('DD-MM-YYYY HH:mm') : ''}
                />
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <label className="col-sm-6">Aan</label>
                    <div className="col-sm-6">
                        <EmailAddressList emailAddresses={(() => {
                            let addresses = [...email.toAddresses];

                            if (email.contactGroup) {
                                addresses.push({
                                    email: null,
                                    name: email.contactGroup.name,
                                });
                            }

                            return addresses;
                        })()}/>
                    </div>
                </div>
                <ViewText
                    label={'Verzonden datum tijd'}
                    value={email.dateSent ? moment(email.dateSent).format('DD-MM-YYYY HH:mm') : ''}
                />
            </div>
            {email.folder === 'sent' ? (
                <div className="row">
                    <div className={'form-group col-md-6'}/>
                    <ViewText label={'Verzonden door gebruiker'}
                              value={email.sentByUser ? email.sentByUser.fullName : ''}/>
                </div>
            ) : null}
            <div className="row">
                <div className="col-sm-6">
                    <label className="col-sm-6">CC</label>
                    <div className="col-sm-6">
                        <EmailAddressList emailAddresses={email.ccAddresses}/>
                    </div>
                </div>
                <div className="col-sm-6">
                    <label className="col-sm-6">Bcc</label>
                    <div className="col-sm-6">
                        <EmailAddressList emailAddresses={email.bccAddresses}/>
                    </div>
                </div>
            </div>

            <div className="row">
                <AsyncSelectSet
                    label={'Contacten'}
                    name={'contacts'}
                    value={email.contacts}
                    loadOptions={getContactOptions}
                    optionName={'fullName'}
                    onChangeAction={(value) => updateEmailAttributes({contacts: value ? value : []})}
                    clearable={true}
                />
                <AsyncSelectSet
                    label={'Eenmalig te koppelen contacten'}
                    name={'manualContacts'}
                    value={email.manualContacts}
                    loadOptions={getContactOptions}
                    optionName={'fullName'}
                    onChangeAction={(value) => updateEmailAttributes({manualContacts: value ? value : []})}
                    clearable={true}
                    textToolTip={'Bij contacten die je hier invult, wordt wel deze e-mail gekoppeld, maar niet het afzender e-mailadres gekoppeld in hun contactgegevens.'}
                />
            </div>

            <div className="row">
                {intakeComponent}
            </div>

            <div className="row">
                {taskComponent}
                {quotationRequestComponent}
            </div>

            <div className="row">
                {measureComponent}
                {opportunityComponent}
            </div>

            <div className="row">
                {orderComponent}
                {invoiceComponent}
            </div>

            <div className="row margin-10-top">
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-3">
                            <label className="col-sm-12">Onderwerp</label>
                        </div>
                        <div className="col-sm-9">{email.subject}</div>
                    </div>
                </div>
            </div>

            <div className="row" style={{paddingLeft: '15px', paddingRight: '15px'}} id="details-modal-email-html">
                <Panel className="col-sm-12">
                    <Frame style={{height: 'calc(100vh - 750px)'}}>
                        <div dangerouslySetInnerHTML={{__html: email.htmlBodyWithEmbeddedImages}}/>
                    </Frame>
                </Panel>
            </div>

            <div className="row">
                {noteComponent}
            </div>

            {email.folder === 'inbox' && (
                <div>
                    <div className="row">
                        <ViewText
                            label={'Datum afgehandeld'}
                            value={email.dateClosed ? moment(email.dateClosed).format('DD-MM-YYYY HH:mm') : ''}
                        />
                        <InputSelect
                            label={'Status'}
                            size={'col-sm-6'}
                            name={'status'}
                            options={statusses}
                            value={email.status}
                            onChangeAction={(e) => updateEmailAttributes({status: e.target.value})}
                            emptyOption={false}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Afgehandeld door'}
                            value={email.closedBy ? email.closedBy.fullName : ''}
                            link={email.closedBy ? 'gebruiker/' + email.closedBy.id : ''}
                        />
                        <ResponsibleInputSelect values={{
                            responsibleUserId: email.responsibleUserId,
                            responsibleTeamId: email.responsibleTeamId,
                        }} onChangeAction={updateEmailAttributes}/>
                    </div>
                </div>
            )}

            <EmailAttachmentsPanel email={email} allowView={false}/>
        </div>
    );
}

