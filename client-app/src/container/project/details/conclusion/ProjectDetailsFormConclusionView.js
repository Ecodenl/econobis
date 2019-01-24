import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../../components/form/ViewText';
import moment from 'moment/moment';

moment.locale('nl');

const ProjectDetailsFormConclusionView = props => {
    const { createdAt, createdBy } = props.projectDetails;

    return (
        <div>
            <div className="row">
                <ViewText label={'Gemaakt op'} value={createdAt ? moment(createdAt.date).format('L') : 'Onbekend'} />
                <ViewText label={'Gemaakt door'} value={createdBy ? createdBy.fullName : 'Onbekend'} />
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        projectDetails: state.projectDetails,
    };
};

export default connect(mapStateToProps)(ProjectDetailsFormConclusionView);
