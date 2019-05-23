import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../../../../components/form/ViewText';
import moment from 'moment/moment';

moment.locale('nl');

const RevenueConclusionView = props => {
    const { createdAt, createdBy } = props.revenue;

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
        revenue: state.projectRevenue,
    };
};

export default connect(mapStateToProps)(RevenueConclusionView);
