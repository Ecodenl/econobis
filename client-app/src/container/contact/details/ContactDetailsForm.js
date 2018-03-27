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
import PanelDeletedItem from "../../../components/panel/PanelDeletedItem";
import moment from "moment/moment";

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
        const { typeId, deletedAt } = this.props.contactDetails;

        return (
            isEmpty(this.props.contactDetails) ?
                <div>Geen gegevens gevonden!</div>
                :
                <div>
                    { deletedAt &&
                    <PanelDeletedItem
                    text={`Dit contact is verwijderd op ${moment(deletedAt).format('L')}.`}
                    />
                    }
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
    };
};

const mapDispatchToProps = dispatch => ({
    fetchContactDetails: (id) => {
        dispatch(fetchContactDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailsForm);
