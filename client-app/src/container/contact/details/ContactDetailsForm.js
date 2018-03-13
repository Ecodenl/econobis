import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { fetchContactDetails } from '../../../actions/contact/ContactDetailsActions';
import ContactDetailsFormGeneral from './general/ContactDetailsFormGeneral';
import ContactDetailsFormAddress from './address/ContactDetailsFormAddress';
import ContactDetailsFormPhone from './phone/ContactDetailsFormPhone';
import ContactDetailsFormEmail from './email/ContactDetailsFormEmail';
import ContactDetailsFormPerson from './person/ContactDetailsFormPerson';
import ContactDetailsFormOther from './other/ContactDetailsFormOther';
import ContactDetailsFormNote from './note/ContactDetailsFormNote';
import ContactDetailsFormConclusion from './conclusion/ContactDetailsFormConclusion';
import ContactDetailsQuotations from "./quotations/ContactDetailsQuotations";
import ContactDetailsCampaigns from "./campaigns/ContactDetailsCampaigns";
import ContactDetailsFormOccupations from "./occupations/ContactDetailsFormOccupations";
import ContactDetailsFormContactEnergySupplier from "./contact-energy-suppliers/ContactDetailsFormContactEnergySupplier";

class ContactDetailsForm extends Component {
    constructor(props){
        super(props);
    };

    componentDidMount() {
        this.props.fetchContactDetails(this.props.id);
    };

    componentWillReceiveProps(nextProps) {
        if(this.props.id !== nextProps.id) {
            this.props.fetchContactDetails(nextProps.id);
        }
    }

    render() {
        const { typeId } = this.props.contactDetails;

        return (
            isEmpty(this.props.contactDetails) ?
                <div>Geen gegevens gevonden!</div>
                :
                <div>
                    <ContactDetailsFormGeneral />
                    <ContactDetailsFormAddress />
                    <ContactDetailsFormEmail />
                    <ContactDetailsFormPhone />
                    <ContactDetailsFormContactEnergySupplier />
                    { typeId == 'organisation' &&
                    <ContactDetailsFormPerson />
                    }
                    { typeId == 'organisation' &&
                    <ContactDetailsQuotations />
                    }
                    { typeId == 'organisation' &&
                    <ContactDetailsCampaigns />
                    }
                    { typeId == 'person' &&
                    <ContactDetailsFormOccupations/>
                    }
                    { typeId == 'person' &&
                    <ContactDetailsFormOther />
                    }
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

const mapDispatchToProps = dispatch => ({
    fetchContactDetails: (id) => {
        dispatch(fetchContactDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailsForm);
