import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { fetchContactDetails } from '../../../actions/contact/ContactDetailsActions';
import ContactDetailsFormGeneral from './general/ContactDetailsFormGeneral';
import ContactDetailsFormAddress from './address/ContactDetailsFormAddress';
import ContactDetailsFormPhone from './phone/ContactDetailsFormPhone';
import ContactDetailsFormEmail from './email/ContactDetailsFormEmail';
import ContactDetailsFormOther from './other/ContactDetailsFormOther';
import ContactDetailsFormNote from './note/ContactDetailsFormNote';
import ContactDetailsFormConclusion from './conclusion/ContactDetailsFormConclusion';
import ContactDetailsQuotations from "./quotations/ContactDetailsQuotations";
import ContactDetailsCampaigns from "./campaigns/ContactDetailsCampaigns";
import ContactDetailsFormOccupations from "./occupations/ContactDetailsFormOccupations";
import ContactDetailsFormContactEnergySupplier from "./contact-energy-suppliers/ContactDetailsFormContactEnergySupplier";
import moment from "moment/moment";
moment.locale('nl');

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
        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van contact.';
        }
        else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        }
        else if (isEmpty(this.props.contactDetails)) {
            loadingText = 'Geen gegevens gevonden.';
        }
        else {
            loading = false;
        }


        return (
            loading ?
                <div>{loadingText}</div>
                :
                <div>
                    <ContactDetailsFormGeneral />
                    <ContactDetailsFormAddress />
                    <ContactDetailsFormEmail />
                    <ContactDetailsFormPhone />
                    <ContactDetailsFormContactEnergySupplier />
                    { typeId == 'organisation' &&
                    <ContactDetailsQuotations />
                    }
                    { typeId == 'organisation' &&
                    <ContactDetailsCampaigns />
                    }
                    <ContactDetailsFormOccupations/>
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
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchContactDetails: (id) => {
        dispatch(fetchContactDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailsForm);
