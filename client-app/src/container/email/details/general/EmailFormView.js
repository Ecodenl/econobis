import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
moment.locale('nl');

import ViewText from '../../../../components/form/ViewText';
import ViewHtmlAsText from '../../../../components/form/ViewHtmlAsText';

const createMarkup = (value) => {
    return {__html: value};
};

const EmailFormView = props => {
    const {from, to, cc, bcc, contacts, order, intake, task, quotationRequest, measure, opportunity, subject, htmlBody, createdAt, dateSent, folder, status, closedBy, dateClosed} = props.email;

    return (
        <div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={"Van"}
                    value={from}
                />
                <ViewText
                    label={"Ontvangen datum tijd"}
                    value={createdAt ? moment(createdAt.date).format('DD-MM-YYYY HH:mm') : ''}
                />
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={"Aan"}
                    value={to && to.map((to) => to).join(', ')}
                />
                <ViewText
                    label={"Verzonden datum tijd"}
                    value={dateSent ? moment(dateSent.date).format('DD-MM-YYYY HH:mm') : ''}
                />
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={"Cc"}
                    value={cc && cc.map((cc) => cc).join(', ')}
                />
                <ViewText
                    label={"Contacten"}
                    value={ contacts && contacts.map((contact) => contact.fullName).join(', ') }
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={"Intake"}
                    value={intake ? intake.name : ''}
                    link={intake ? 'intake/' + intake.id : ''}
                />
                <ViewText
                    label={"Taak"}
                    value={task ? task.noteSummary : ''}
                    link={task ? 'taak/' + task.id : ''}
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={"Offerteverzoek"}
                    value={quotationRequest ? quotationRequest.name : ''}
                    link={quotationRequest ? 'offerteverzoek/' + quotationRequest.id : ''}
                />
                <ViewText
                    label={"Maatregel"}
                    value={measure ? measure.name : ''}
                    link={measure ? 'maatregel/' + measure.id : ''}
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={"Kans"}
                    value={opportunity ? opportunity.name : ''}
                    link={opportunity ? 'kans/' + opportunity.id : ''}
                />
                <ViewText
                    label={"Order"}
                    value={order ? order.name : ''}
                    link={order ? 'order/' + order.id : ''}
                />
            </div>

            <div className="row margin-10-top" onClick={props.switchToEdit}>
                <div className='col-sm-12'>
                    <div className="row">
                        <div className="col-sm-3">
                            <label className="col-sm-12">Onderwerp</label>
                        </div>
                        <div className="col-sm-9">
                            {subject}
                        </div>
                    </div>
                </div>
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewHtmlAsText label={"Tekst"} value={htmlBody}/>
            </div>
            {folder == 'inbox' &&
            <div>
                <div className="row" onClick={props.switchToEdit}>
                    <ViewText
                        label={"Status"}
                        value={status ? status.name : ''}
                    />
                    <ViewText
                        label={"Datum afgehandeld"}
                        value={dateClosed ? moment(dateClosed.date).format('DD-MM-YYYY HH:mm') : ''}
                    />
                </div>
                <div className="row" onClick={props.switchToEdit}>
                    <ViewText
                        label={"Afgerond door"}
                        value={closedBy ? closedBy.fullName : ''}
                        link={closedBy ? 'gebruiker/' + closedBy.id : ''}
                    />
                </div>
            </div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        email: state.email,
    }
};

export default connect(mapStateToProps)(EmailFormView);