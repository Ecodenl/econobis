import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');
import { Link } from 'react-router-dom';

import ViewText from '../../../../components/form/ViewText';
import ViewHtmlAsText from '../../../../components/form/ViewHtmlAsText';
import ButtonText from '../../../../components/button/ButtonText';

const createMarkup = value => {
    return { __html: value };
};

const EmailFormView = props => {
    const {
        from,
        responsibleUser,
        responsibleTeam,
        toWithGroup,
        cc,
        bcc,
        contacts,
        order,
        invoice,
        intake,
        task,
        quotationRequest,
        measure,
        opportunity,
        subject,
        htmlBodyWithEmbeddedImages,
        createdAt,
        dateSent,
        sentByUser,
        folder,
        status,
        closedBy,
        dateClosed,
        removedBy,
        dateRemoved,
    } = props.email;

    const maxContactsToShowDirectly = 5;
    const manyContacts = contacts.length > maxContactsToShowDirectly;

    return (
        <div>
            {folder === 'removed' ? (
                <React.Fragment>
                    <div className="row" onClick={props.switchToEdit}>
                        <ViewText
                            label={'Verwijderd door'}
                            value={removedBy ? removedBy.fullName : 'Onbekend'}
                            link={removedBy ? '/gebruiker/' + removedBy.id : ''}
                        />
                        <ViewText
                            label={'Datum verwijderd'}
                            value={dateRemoved ? moment(dateRemoved).format('DD-MM-YYYY HH:mm') : ''}
                        />
                    </div>
                    <hr />
                </React.Fragment>
            ) : null}
            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Van'} value={from} />
                <ViewText
                    label={'Ontvangen datum tijd'}
                    value={createdAt ? moment(createdAt).format('DD-MM-YYYY HH:mm') : ''}
                />
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Aan'} value={toWithGroup && toWithGroup.map(toWithGroup => toWithGroup).join(', ')} />
                <ViewText
                    label={'Verzonden datum tijd'}
                    value={dateSent ? moment(dateSent).format('DD-MM-YYYY HH:mm') : ''}
                />
            </div>
            {folder === 'sent' ? (
                <div className="row" onClick={props.switchToEdit}>
                    <div className={'form-group col-md-6'} />
                    <ViewText label={'Verzonden door gebruiker'} value={sentByUser ? sentByUser.fullName : ''} />
                </div>
            ) : null}
            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Cc'} value={cc && cc.map(cc => cc).join(', ')} />
                <ViewText label={'Bcc'} value={bcc && bcc.map(bcc => bcc).join(', ')} />
            </div>

            <div className="row">
                <ViewText
                    label={'Contacten'}
                    value={
                        manyContacts && !props.showContacten ? (
                            <ButtonText
                                buttonClassName={'btn-success btn-padding-small'}
                                buttonText={'Toon contacten (' + contacts.length + ')'}
                                onClickAction={props.toggleShowContacten}
                            />
                        ) : (
                            contacts &&
                            contacts.map(contact => {
                                return (
                                    <span>
                                        <Link to={`/contact/${contact.id}`} className="link-underline">
                                            {contact.fullName}
                                        </Link>{' '}
                                        <br />
                                    </span>
                                );
                            })
                        )
                    }
                />
                <ViewText
                    label={'Intake'}
                    value={intake ? intake.name : ''}
                    link={intake ? '/intake/' + intake.id : ''}
                />
            </div>
            {manyContacts && props.showContacten && (
                <div className="row" onClick={props.toggleShowContacten}>
                    <ViewText
                        label={''}
                        value={
                            <ButtonText
                                buttonClassName={'btn-success btn-padding-small'}
                                buttonText={'Verberg contacten'}
                                onClickAction={props.toggleShowContacten}
                            />
                        }
                    />
                    <div className="col-md-6" />
                </div>
            )}

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Taak'} value={task ? task.noteSummary : ''} link={task ? '/taak/' + task.id : ''} />
                <ViewText
                    label={'Kansactie'}
                    value={quotationRequest ? quotationRequest.name : ''}
                    link={quotationRequest ? '/offerteverzoek/' + quotationRequest.id : ''}
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={'Maatregel'}
                    value={measure ? measure.name : ''}
                    link={measure ? '/maatregel/' + measure.id : ''}
                />
                <ViewText
                    label={'Kans'}
                    value={opportunity ? opportunity.name : ''}
                    link={opportunity ? '/kans/' + opportunity.id : ''}
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Order'} value={order ? order.name : ''} link={order ? '/order/' + order.id : ''} />
                <ViewText
                    label={'Nota'}
                    value={invoice ? invoice.name : ''}
                    link={invoice ? '/nota/' + invoice.id : ''}
                />
            </div>

            <div className="row margin-10-top" onClick={props.switchToEdit}>
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-3">
                            <label className="col-sm-12">Onderwerp</label>
                        </div>
                        <div className="col-sm-9">{subject}</div>
                    </div>
                </div>
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewHtmlAsText label={'Tekst'} value={htmlBodyWithEmbeddedImages} />
            </div>
            {folder == 'inbox' && (
                <div>
                    <div className="row" onClick={props.switchToEdit}>
                        <ViewText label={'Status'} value={status ? status.name : ''} />
                        <ViewText
                            label={'Datum afgehandeld'}
                            value={dateClosed ? moment(dateClosed).format('DD-MM-YYYY HH:mm') : ''}
                        />
                    </div>
                    <div className="row" onClick={props.switchToEdit}>
                        <ViewText
                            label={'Afgehandeld door'}
                            value={closedBy ? closedBy.fullName : ''}
                            link={closedBy ? '/gebruiker/' + closedBy.id : ''}
                        />
                        {responsibleUser || responsibleTeam ? (
                            <ViewText
                                label={'Verantwoordelijke'}
                                value={responsibleUser ? responsibleUser.fullName : responsibleTeam.name}
                                link={
                                    responsibleUser ? '/gebruiker/' + responsibleUser.id : '/team/' + responsibleTeam.id
                                }
                            />
                        ) : (
                            <ViewText label={'Verantwoordelijke'} value={''} />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        email: state.email,
    };
};

export default connect(mapStateToProps)(EmailFormView);
