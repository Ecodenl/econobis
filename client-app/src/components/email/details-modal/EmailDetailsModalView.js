import React from 'react';
import EmailDetailsModalLayout from './EmailDetailsModalLayout';
import ViewText from '../../../components/form/ViewText';
import { FaInfoCircle } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';

export default function EmailDetailsModalView({ email, updateEmailAttributes, createContact }) {
    return (
        <EmailDetailsModalLayout
            email={email}
            updateEmailAttributes={updateEmailAttributes}
            createContact={createContact}
            intakeComponent={
                <ViewText
                    label={'Intake'}
                    value={email.intake ? email.intake.name : ''}
                    link={email.intake ? '/intake/' + email.intake.id : ''}
                />
            }
            taskComponent={
                <ViewText
                    label={'Taak'}
                    value={email.task ? email.task.noteSummary : ''}
                    link={email.task ? '/taak/' + email.task.id : ''}
                />
            }
            quotationRequestComponent={
                <ViewText
                    label={'Kansactie'}
                    value={email.quotationRequest ? 'Offerteverzoek ' + email.quotationRequest.id : ''}
                    link={email.quotationRequest ? '/offerteverzoek/' + email.quotationRequest.id : ''}
                />
            }
            measureComponent={
                <ViewText
                    label={'Maatregel'}
                    value={email.measure ? email.measure.name : ''}
                    link={email.measure ? '/maatregel/' + email.measure.id : ''}
                />
            }
            opportunityComponent={
                <ViewText
                    label={'Kans'}
                    value={email.opportunity ? email.opportunity.name : ''}
                    link={email.opportunity ? '/kans/' + email.opportunity.id : ''}
                />
            }
            orderComponent={
                <ViewText
                    label={'Order'}
                    value={email.order ? email.order.subject : ''}
                    link={email.order ? '/order/' + email.order.id : ''}
                />
            }
            invoiceComponent={
                <ViewText
                    label={'Nota'}
                    value={email.invoice ? email.invoice.number : ''}
                    link={email.invoice ? '/nota/' + email.invoice.id : ''}
                />
            }
            noteComponent={
                <>
                    <div className="col-sm-3">
                        <label htmlFor="note" className="col-sm-12">
                            Opmerking
                        </label>
                    </div>
                    <div className="col-sm-8" id="note">
                        {email.note}
                    </div>
                    <div className="col-sm-1">
                        <FaInfoCircle
                            color={'blue'}
                            size={'15px'}
                            data-tip={
                                'Let op: deze opmerking is alleen intern zichtbaar bij deze specifieke e-mail, bij latere antwoordmails is de opmerking niet te zien.'
                            }
                            data-for={`tooltip-note`}
                        />
                        <ReactTooltip
                            id={`tooltip-note`}
                            effect="float"
                            place="right"
                            multiline={true}
                            aria-haspopup="true"
                        />
                        &nbsp;
                    </div>
                </>
            }
        />
    );
}
