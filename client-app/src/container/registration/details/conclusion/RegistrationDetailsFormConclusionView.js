import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../../components/form/ViewText';
import moment from "moment/moment";
moment.locale('nl');

const RegistrationDetailsFormConclusionView = props => {
    const { createdAt, updatedAt } = props.registrationDetails;

    return (
        <div>
            <div className="row">
                <ViewText
                    label={"Gemaakt op"}
                    value={createdAt ? moment(createdAt.date).format('L') : 'Onbekend'}
                />
                <ViewText
                    label={"Laatste update door"}
                    value={updatedAt ? moment(updatedAt.date).format('L') : 'Onbekend'}
                />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        registrationDetails: state.registrationDetails,
    };
};

export default connect(mapStateToProps)(RegistrationDetailsFormConclusionView);