import React from 'react';
import EmailDetailsModalLayout from "./EmailDetailsModalLayout";
import {Link} from "react-router";
import ViewText from "../../../components/form/ViewText";

export default function EmailDetailsModalView({email, updateEmailAttributes}) {
    return (
        <EmailDetailsModalLayout
            email={email}
            updateEmailAttributes={updateEmailAttributes}
            contactsComponent={(
                <div className="col-sm-6">
                    <label className="col-sm-6">Contacten</label>
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
            )}
            intakeComponent={(
                <ViewText
                    label={'Intake'}
                    value={email.intake ? email.intake.name : ''}
                    link={email.intake ? 'intake/' + email.intake.id : ''}
                />
            )}
            taskComponent={(
                <ViewText
                    label={'Taak'}
                    value={email.task ? email.task.noteSummary : ''}
                    link={email.task ? 'taak/' + email.task.id : ''}
                />
            )}
            quotationRequestComponent={(
                <ViewText
                    label={'Kansactie'}
                    value={email.quotationRequest ? 'Offerteverzoek ' + email.quotationRequest.id : ''}
                    link={email.quotationRequest ? 'offerteverzoek/' + email.quotationRequest.id : ''}
                />
            )}
            measureComponent={(
                <ViewText
                    label={'Maatregel'}
                    value={email.measure ? email.measure.name : ''}
                    link={email.measure ? 'maatregel/' + email.measure.id : ''}
                />
            )}
            opportunityComponent={(
                <ViewText
                    label={'Kans'}
                    value={email.opportunity ? email.opportunity.name : ''}
                    link={email.opportunity ? 'kans/' + email.opportunity.id : ''}
                />
            )}
            orderComponent={(
                <ViewText
                    label={'Order'}
                    value={email.order ? email.order.subject : ''}
                    link={email.order ? 'order/' + email.order.id : ''}
                />
            )}
            invoiceComponent={(
                <ViewText
                    label={'Nota'}
                    value={email.invoice ? email.invoice.number : ''}
                    link={email.invoice ? 'nota/' + email.invoice.id : ''}
                />
            )}
        />
    );
}

