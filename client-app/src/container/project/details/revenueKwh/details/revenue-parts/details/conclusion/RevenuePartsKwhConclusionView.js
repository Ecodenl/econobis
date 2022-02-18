import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../../../../../../components/form/ViewText';
import moment from 'moment/moment';

moment.locale('nl');

const RevenuePartsKwhConclusionView = props => {
    const { createdAt } = props.revenuePartsKwh;

    return (
        <div>
            <div className="row">
                <ViewText label={'Gemaakt op'} value={createdAt ? moment(createdAt).format('L') : 'Onbekend'} />
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        revenuePartsKwh: state.revenuePartsKwh,
    };
};

export default connect(mapStateToProps)(RevenuePartsKwhConclusionView);
