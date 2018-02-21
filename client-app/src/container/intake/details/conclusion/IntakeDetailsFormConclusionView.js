import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../../components/form/ViewText';
import moment from "moment/moment";
moment.locale('nl');

const IntakeDetailsFormConclusionView = props => {
    const { createdAt, createdBy, updatedAt, updatedBy } = props.intakeDetails;

    return (
        <div>
            <div className="row">
                <ViewText
                    label={"Laatste gewijzigd op"}
                    value={updatedAt ? moment(updatedAt.date).format('L') : 'Onbekend'}
                />
                <ViewText
                    label={"Laatste gewijzigd door"}
                    value={updatedBy ? updatedBy.fullName : 'Onbekend'}
                />
            </div>
            <div className="row">
                <ViewText
                    label={"Gemaakt op"}
                    value={createdAt ? moment(createdAt.date).format('L') : 'Onbekend'}
                />
                <ViewText
                    label={"Gemaakt door"}
                    value={createdBy ? createdBy.fullName : 'Onbekend'}
                />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        intakeDetails: state.intakeDetails,
    };
};

export default connect(mapStateToProps)(IntakeDetailsFormConclusionView);