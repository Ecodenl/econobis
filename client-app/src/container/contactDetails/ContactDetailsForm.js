import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import * as actions from '../../actions/ContactDetailsActions';
import ContactDetailsFormGeneral from './general/ContactDetailsFormGeneral';
import ContactDetailsFormAddress from './address/ContactDetailsFormAddress';
import ContactDetailsFormPhone from './phone/ContactDetailsFormPhone';
import ContactDetailsFormEmail from './email/ContactDetailsFormEmail';
import ContactDetailsFormEnergy from './energy/ContactDetailsFormEnergy';
import ContactDetailsFormOther from './other/ContactDetailsFormOther';
import ContactDetailsFormNote from './note/ContactDetailsFormNote';
import ContactDetailsFormConclusion from './conclusion/ContactDetailsFormConclusion';

class ContactDetailsForm extends Component {
    constructor(props){
        super(props);
    };

    componentDidMount() {
        this.props.dispatch(actions.getContactDetails(this.props.id));
    };

    render() {
        return (
            isEmpty(this.props.contactDetails) ?
                <div>Geen gegevens gevonden!</div>
                :
                <div>
                    <ContactDetailsFormGeneral />
                    <ContactDetailsFormAddress />
                    <ContactDetailsFormPhone />
                    <ContactDetailsFormEmail />
                    {/* <ContactDetailsFormEnergy /> */}
                    <ContactDetailsFormOther />
                    <ContactDetailsFormNote />
                    <ContactDetailsFormConclusion />
                </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        contactDetails: state.contactDetails,
    };
};

export default connect(mapStateToProps)(ContactDetailsForm);
