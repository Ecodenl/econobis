import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import ViewText from '../../../../components/form/ViewText';

const TaskDetailsFormGeneralView = props => {
    const {
        name,
        description,
        type,
        contact,
        status,
        registrationId,
        registrationName,
        contactGroup,
        campaign,
        datePlanned,
        dateStarted,
        dateFinished,
        responsibleUser,
        finishedBy,
        createdAt,
        createdBy,
        opportunityId,
        opportunityName
    } = props.taskDetails;

    return (
        <div onClick={props.switchToEdit}>
            <div className="row">
                <ViewText
                    label={"Naam"}
                    value={name}
                />
            </div>

            <div className="row">
                <div className="col-sm-3">
                    <label htmlFor="description" className="col-sm-12">Omschrijving</label>
                </div>
                <div className="col-sm-9" id="description">
                    {description}
                </div>
            </div>

            <div className="row margin-20-top">
                <ViewText
                    label="Type"
                    value={type && type.name}
                />

                <ViewText
                    label="Status"
                    value={status && status.name}
                />
            </div>

            <div className="row">
                <ViewText
                    label={"Contact"}
                    value={contact && contact.fullName}
                    link={contact ? 'contact/' + contact.id : ''}
                />

                <ViewText
                    label={"Campagne"}
                    value={campaign && campaign.name}
                    link={campaign ? 'campagne/' + campaign.id : ''}
                />
            </div>

            <div className="row">
                <ViewText
                    label={"Aanmelding"}
                    value={registrationName}
                    link={registrationId ? 'aanmelding/' + registrationId : ''}
                />
                <ViewText
                    label={"Kans"}
                    value={opportunityName}
                    link={opportunityId ? 'kans/' + opportunityId : ''}
                />
            </div>

            <div className="row">
                <ViewText
                    label={"Groep"}
                    value={contactGroup && contactGroup.name}
                    link={contactGroup ? 'contact-groep/' + contactGroup.id : ''}
                />
            </div>

            <div className="row margin-20-top">
                <ViewText
                    label={"Plan datum"}
                    value={datePlanned && moment(datePlanned.date).format('L')}
                />
                <ViewText
                    label="Datum gestart"
                    value={dateStarted && moment(dateStarted.date).format('L')}
                />
            </div>

            <div className="row">
                <ViewText
                    label={"Datum gereed"}
                    value={dateFinished && moment(dateFinished.date).format('L')}
                />
                <ViewText
                    label="Afgerond door"
                    value={finishedBy && finishedBy.fullName}
                    link={finishedBy ? 'gebruiker/' + finishedBy.id : ''}
                />
            </div>

            <div className="row">
                <ViewText
                    label={"Verantwoordelijk"}
                    value={responsibleUser && responsibleUser.fullName}
                    link={responsibleUser ? 'gebruiker/' + responsibleUser.id : ''}
                />
            </div>

            <div className="row margin-20-top">
                <ViewText
                    label={"Gemaakt op"}
                    value={createdAt && moment(createdAt.date).format('L')}
                />
                <ViewText
                    label="Gemaakt door"
                    value={createdBy && createdBy.fullName}
                    link={createdBy ? 'gebruiker/' + createdBy.id : ''}
                />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        taskDetails: state.taskDetails,
    };
};

export default connect(mapStateToProps)(TaskDetailsFormGeneralView);