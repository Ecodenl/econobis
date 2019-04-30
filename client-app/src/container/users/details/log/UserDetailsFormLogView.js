import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import ViewText from '../../../../components/form/ViewText';

const UserDetailsFormLogView = props => {
    const { lastVisit, visitCount } = props.userDetails;

    return (
        <div>
            <div className="row">
                <ViewText label={'Laatst ingelogd'} value={lastVisit && moment(lastVisit.date).format('DD-MM-Y')} />
                <ViewText label={'Aantal keer ingelogd'} value={visitCount} />
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        userDetails: state.userDetails,
    };
};

export default connect(mapStateToProps)(UserDetailsFormLogView);
