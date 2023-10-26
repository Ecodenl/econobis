import React from 'react';
import {connect} from 'react-redux';

import ViewText from '../../../../components/form/ViewText';

const UserDetailsFormMailboxView = props => {
    return (
        <div onClick={props.switchToEdit}>
            <div className="row">
                <ViewText label={'Standaard afzender e-mail'} value={props.userDetails.defaultMailbox ? props.userDetails.defaultMailbox.email : '-'}/>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        userDetails: state.userDetails,
    };
};

export default connect(mapStateToProps)(UserDetailsFormMailboxView);
