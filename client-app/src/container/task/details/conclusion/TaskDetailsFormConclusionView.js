import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../../components/form/ViewText';
import moment from "moment/moment";
moment.locale('nl');

const TaskDetailsFormConclusionView = props => {
    const { createdAt, updatedAt, updatedBy, createdBy } = props.taskDetails;

    return (
        <div>
            <div className="row">
                <ViewText
                    label={"Gemaakt door"}
                    value={createdBy ? createdBy.fullName : 'Onbekend'}
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
                    label={"Laatste gewijzigd op"}
                    value={updatedAt ? moment(updatedAt.date).format('L') : 'Onbekend'}
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

export default connect(mapStateToProps)(TaskDetailsFormConclusionView);