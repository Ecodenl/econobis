import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import ViewText from '../../../../components/form/ViewText';
import PanelHeader from '../../../../components/panel/PanelHeader';
import Icon from 'react-icons-kit';
import { angleRight } from 'react-icons-kit/fa/angleRight';
import { angleDown } from 'react-icons-kit/fa/angleDown';

const TaskDetailsFormGeneralView = props => {
    const {
        note,
        type,
        contact,
        finished,
        intakeId,
        intakeName,
        contactGroup,
        order,
        invoice,
        campaign,
        housingFile,
        project,
        participant,
        datePlannedStart,
        datePlannedFinish,
        startTimePlanned,
        endTimePlanned,
        dateFinished,
        dateSentWfCompletedTask,
        dateSentWfExpiredTask,
        dateSentWfNewTask,
        responsibleUser,
        responsibleTeam,
        finishedBy,
        opportunityId,
        opportunityName,
    } = props.taskDetails;

    return (
        <div>
            <div onClick={props.switchToEdit}>
                <div className="row">
                    <ViewText label="Type" value={type && type.name} />
                </div>

                <div className="row">
                    <div className="col-sm-3">
                        <label htmlFor="description" className="col-sm-12">
                            Taak / notitie
                        </label>
                    </div>
                    <div className="col-sm-9" id="description">
                        {note}
                    </div>
                </div>

                <div className="row margin-20-top">
                    <ViewText
                        label={'Datum afhandelen'}
                        value={datePlannedStart && moment(datePlannedStart).format('L')}
                    />

                    <ViewText
                        label={'Start tijd'}
                        value={startTimePlanned && moment('1900-01-01 ' + startTimePlanned).format('HH:mm')}
                    />
                </div>

                <div className="row">
                    <ViewText label={'Einddatum'} value={datePlannedFinish && moment(datePlannedFinish).format('L')} />

                    <ViewText
                        label={'Eind tijd'}
                        value={endTimePlanned && moment('1900-01-01 ' + endTimePlanned).format('HH:mm')}
                    />
                </div>

                <div className="row">
                    <ViewText label={'Afgehandeld?'} value={finished ? 'Ja' : 'Nee'} />
                    <ViewText
                        label={'Verantwoordelijke'}
                        value={responsibleUser ? responsibleUser.fullName : responsibleTeam.name}
                        link={responsibleUser ? '/gebruiker/' + responsibleUser.id : '/team/' + responsibleTeam.id}
                    />
                </div>

                <div className="row">
                    <ViewText label={'Datum gereed'} value={dateFinished && moment(dateFinished).format('L')} />
                    <ViewText
                        label="Afgerond door"
                        value={finishedBy && finishedBy.fullName}
                        link={finishedBy ? '/gebruiker/' + finishedBy.id : ''}
                    />
                </div>

                <div className="row">
                    {type && type.usesWfCompletedTask ? (
                        <ViewText
                            label={'Email taak afgehandeld verzonden'}
                            value={dateSentWfCompletedTask ? moment(dateSentWfCompletedTask).format('L HH:mm') : ''}
                        />
                    ) : (
                        ''
                    )}
                    {type && type.usesWfExpiredTask ? (
                        <ViewText
                            label={'Email taak verlopen verzonden'}
                            value={dateSentWfExpiredTask ? moment(dateSentWfExpiredTask).format('L HH:mm') : ''}
                        />
                    ) : (
                        ''
                    )}
                    {type && type.usesWfNewTask && dateSentWfNewTask ? (
                        <ViewText
                            label={'Email taak nieuw verzonden'}
                            value={dateSentWfNewTask ? moment(dateSentWfNewTask).format('L HH:mm') : ''}
                        />
                    ) : (
                        ''
                    )}
                </div>

                <div className="row margin-20-top">
                    <ViewText
                        label={'Contact'}
                        value={contact && contact.fullName}
                        link={contact ? '/contact/' + contact.id : ''}
                    />
                </div>
            </div>

            <div className="margin-10-top">
                <PanelHeader>
                    <div className="row" onClick={props.toggleExtraConnections}>
                        {props.showExtraConnections ? (
                            <Icon size={21} icon={angleDown} />
                        ) : (
                            <Icon size={21} icon={angleRight} />
                        )}
                        <span className="h5">Overige koppelingen</span>
                    </div>
                </PanelHeader>
                {props.showExtraConnections && (
                    <div>
                        <div className="row">
                            <ViewText
                                label={'Campagne'}
                                value={campaign && campaign.name}
                                link={campaign ? '/campagne/' + campaign.id : ''}
                            />
                            <ViewText
                                label={'Intake'}
                                value={intakeName}
                                link={intakeId ? '/intake/' + intakeId : ''}
                            />
                        </div>

                        <div className="row">
                            <ViewText
                                label={'Groep'}
                                value={contactGroup && contactGroup.name}
                                link={contactGroup ? '/contact-groep/' + contactGroup.id : ''}
                            />
                            <ViewText
                                label={'Kans'}
                                value={opportunityName}
                                link={opportunityId ? '/kans/' + opportunityId : ''}
                            />
                        </div>

                        <div className="row">
                            <ViewText
                                label={'Woningdossier'}
                                value={housingFile && housingFile.id}
                                link={housingFile ? '/woningdossier/' + housingFile.id : ''}
                            />
                            <ViewText
                                label={'Project'}
                                value={project && project.name}
                                link={project ? '/project/' + project.id : ''}
                            />
                        </div>

                        <div className="row">
                            <ViewText
                                label={'Participant project'}
                                value={participant && participant.name}
                                link={participant ? '/project/deelnemer/' + participant.id : ''}
                            />
                            <ViewText
                                label={'Order'}
                                value={order && order.name}
                                link={order ? '/order/' + order.id : ''}
                            />
                        </div>

                        <div className="row">
                            <ViewText
                                label={'Nota'}
                                value={invoice && invoice.name}
                                link={invoice ? '/nota/' + invoice.id : ''}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        taskDetails: state.taskDetails,
    };
};

export default connect(mapStateToProps)(TaskDetailsFormGeneralView);
