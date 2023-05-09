import React from 'react';
import ViewText from "../../../components/form/ViewText";
import moment from "moment/moment";
import {Link} from "react-router";
import Panel from "../../../components/panel/Panel";
import EmailAddressList from "../../../components/email/EmailAddressList";
import EmailAttachmentsPanel from "../../../components/email/EmailAttachmentsPanel";

export default function EmailDetailsModalView({email}) {
    return (
        <div>
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
                    <hr />
                </>
            ) : null}
            <div className="row">
                <ViewText label={'Van'} value={email.from} />
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
                            let addresses = email.toAddresses;

                            if(email.contactGroup) {
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
                    <div className={'form-group col-md-6'} />
                    <ViewText label={'Verzonden door gebruiker'} value={email.sentByUser ? email.sentByUser.fullName : ''} />
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
                <div className="col-sm-6">
                    <label className="col-sm-6">Gekoppeld contact</label>
                    <div className="col-sm-6">
                        {
                            email && email.contacts &&
                            email.contacts.map(contact => {
                                return (
                                    <span key={contact.id}>
                                        <Link to={`/contact/${contact.id}`} className="link-underline">
                                            {contact.fullName}
                                        </Link>{' '}
                                        <br/>
                                        </span>
                                )
                            })
                        }
                    </div>
                </div>
                <ViewText
                    label={'Intake'}
                    value={email.intake ? email.intake.name : ''}
                    link={email.intake ? 'intake/' + email.intake.id : ''}
                />
            </div>

            <div className="row">
                <ViewText label={'Taak'} value={email.task ? email.task.noteSummary : ''} link={email.task ? 'taak/' + email.task.id : ''} />
                <ViewText
                    label={'Kansactie'}
                    value={email.quotationRequest ? 'Offerteverzoek ' + email.quotationRequest.id : ''}
                    link={email.quotationRequest ? 'offerteverzoek/' + email.quotationRequest.id : ''}
                />
            </div>

            <div className="row">
                <ViewText
                    label={'Maatregel'}
                    value={email.measure ? email.measure.name : ''}
                    link={email.measure ? 'maatregel/' + email.measure.id : ''}
                />
                <ViewText
                    label={'Kans'}
                    value={email.opportunity ? email.opportunity.name : ''}
                    link={email.opportunity ? 'kans/' + email.opportunity.id : ''}
                />
            </div>

            <div className="row">
                <ViewText label={'Order'} value={email.order ? email.order.subject : ''} link={email.order ? 'order/' + email.order.id : ''} />
                <ViewText
                    label={'Nota'}
                    value={email.invoice ? email.invoice.number : ''}
                    link={email.invoice ? 'nota/' + email.invoice.id : ''}
                />
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

            <div className="row" style={{ paddingLeft: '15px', paddingRight: '15px'}}>
                <Panel className="col-sm-12">
                        <div dangerouslySetInnerHTML={{__html: email.htmlBodyWithEmbeddedImages}} />
                </Panel>
            </div>
            {email.folder === 'inbox' && (
                <div>
                    <div className="row">
                        <ViewText label={'Status'} value={email.status ? email.status.name : ''} />
                        <ViewText
                            label={'Datum afgehandeld'}
                            value={email.dateClosed ? moment(email.dateClosed).format('DD-MM-YYYY HH:mm') : ''}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Afgehandeld door'}
                            value={email.closedBy ? email.closedBy.fullName : ''}
                            link={email.closedBy ? 'gebruiker/' + email.closedBy.id : ''}
                        />
                        {email.responsibleUser || email.responsibleTeam ? (
                            <ViewText
                                label={'Verantwoordelijke'}
                                value={email.responsibleUser ? email.responsibleUser.fullName : email.responsibleTeam.name}
                                link={
                                    email.responsibleUser ? 'gebruiker/' + email.responsibleUser.id : 'team/' + email.responsibleTeam.id
                                }
                            />
                        ) : (
                            <ViewText label={'Verantwoordelijke'} value={''} />
                        )}
                    </div>
                </div>
            )}

            <EmailAttachmentsPanel email={email} allowView={false} />
        </div>
    );
}

