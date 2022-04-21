import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../../../../components/form/ViewText';
import moment from 'moment/moment';

moment.locale('nl');

const RevenuesKwhConclusionView = props => {
    const { createdAt, createdBy } = props.revenuesKwh;

    return (
        <div>
            <div className="row">
                <ViewText label={'Gemaakt op'} value={createdAt ? moment(createdAt).format('L') : 'Onbekend'} />
                <ViewText label={'Gemaakt door'} value={createdBy ? createdBy.fullName : 'Onbekend'} />
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        revenuesKwh: state.revenuesKwh,
    };
};

export default connect(mapStateToProps)(RevenuesKwhConclusionView);
