import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { fetchMailboxDetails } from '../../../actions/mailbox/MailboxDetailsActions';
import MailboxDetailsFormGeneral from './general/MailboxDetailsFormGeneral';

class MailboxDetailsForm extends Component {
    constructor(props){
        super(props);
    };

    render() {
        return (
            isEmpty(this.props.mailboxDetails) ?
                <div>Geen gegevens gevonden!</div>
                :
                <div>
                    <MailboxDetailsFormGeneral />
                </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        mailboxDetails: state.mailboxDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchMailboxDetails: (id) => {
        dispatch(fetchMailboxDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MailboxDetailsForm);
