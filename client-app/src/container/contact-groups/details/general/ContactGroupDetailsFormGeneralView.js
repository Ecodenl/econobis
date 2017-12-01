import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import ViewText from '../../../../components/form/ViewText';

const ContactGroupDetailsFormGeneralView = props => {
    const { name, description, responsibleUser = {}, closedStatus, dateStarted, dateFinished, createdAt, createdBy } = props.contactGroupDetails;

    return (
        <div onClick={props.switchToEdit}>
            <div className="row">
                <ViewText
                    label={"Name"}
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

            <div className="row">
                <ViewText
                    label={"Gebruiker"}
                    value={responsibleUser && responsibleUser.fullName}
                />
                <div className="row">
                    <ViewText
                        label="Status"
                        value={closedStatus}
                    />
                </div>
            </div>

            <div className="row">
                <ViewText
                    label={"Start datum"}
                    value={dateStarted && moment(dateStarted.date).format('DD-MM-Y')}
                />
                <div className="row">
                    <ViewText
                        label="Datum gereed"
                        value={dateFinished && moment(dateFinished.date).format('DD-MM-Y')}
                    />
                </div>
            </div>

            <div className="row">
                <ViewText
                    label={"Gemaakt op"}
                    value={createdAt && moment(createdAt.date).format('DD-MM-Y')}
                />
                <div className="row">
                    <ViewText
                        label="Gemaakt door"
                        value={"Gebruiker"}
                    />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        contactGroupDetails: state.contactGroupDetails,
    };
};

export default connect(mapStateToProps)(ContactGroupDetailsFormGeneralView);