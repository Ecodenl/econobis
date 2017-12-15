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
        registrationName,
        contactGroup,
        datePlanned,
        dateStarted,
        dateFinished,
        responsibleUser,
        finishedBy,
        createdAt,
        createdBy,
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
            </div>

            <div className="row">
                <ViewText
                    label={"Contact"}
                    value={contact && contact.fullName}
                />
                <ViewText
                    label="Status"
                    value={status && status.name}
                />
            </div>

            <div className="row">
                <ViewText
                    label={"Aanmelding"}
                    value={registrationName}
                />
                <ViewText
                    label={"Kans"}
                    value={opportunityName}
                />
            </div>

            <div className="row">
                <ViewText
                    label={"Groep"}
                    value={contactGroup && contactGroup.name}
                />
            </div>

            <div className="row margin-20-top">
                <ViewText
                    label={"Plan datum"}
                    value={datePlanned && moment(datePlanned.date).format('d-M-Y')}
                />
                <ViewText
                    label="Datum gestart"
                    value={dateStarted && moment(dateStarted.date).format('d-M-Y')}
                />
            </div>

            <div className="row">
                <ViewText
                    label={"Datum gereed"}
                    value={dateFinished && moment(dateFinished.date).format('d-M-Y')}
                />
                <ViewText
                    label="Afgerond door"
                    value={finishedBy && finishedBy.name}
                />
            </div>

            <div className="row">
                <ViewText
                    label={"Verantwoordelijk"}
                    value={responsibleUser && responsibleUser.name}
                />
            </div>

            <div className="row margin-20-top">
                <ViewText
                    label={"Gemaakt op"}
                    value={createdAt && moment(createdAt.date).format('d-M-Y')}
                />
                <ViewText
                    label="Gemaakt door"
                    value={createdBy && createdBy.fullName}
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