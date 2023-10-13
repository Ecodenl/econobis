import React, { Component } from 'react';
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
import ContactDetailsQuotations from './quotations/ContactDetailsQuotations';
import ContactDetailsCampaigns from './campaigns/ContactDetailsCampaigns';
import ContactDetailsFormOccupations from './occupations/ContactDetailsFormOccupations';
import moment from 'moment/moment';
import ContactDetailsFormPortalUser from './portal-user/ContactDetailsFormPortalUser';
import ContactDetailsCoachQuotations from './quotationsCoach/ContactDetailsCoachQuotations';
import FreeFields from '../../../components/freeFields/FreeFields';

moment.locale('nl');

class ContactDetailsForm extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchContactDetails(this.props.id);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.id !== nextProps.id) {
            this.props.fetchContactDetails(nextProps.id);
        }
    }

    render() {
        const { typeId, inspectionPersonTypeId } = this.props.contactDetails;
        const { permissions } = this.props;
        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van contact.';
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (isEmpty(this.props.contactDetails)) {
            loadingText = 'Geen gegevens gevonden.';
        } else {
            loading = false;
        }

        return loading ? (
            <div>{loadingText}</div>
        ) : (
            <div>
                {permissions.viewContactGeneral ? <ContactDetailsFormGeneral /> : null}
                {permissions.viewContactGeneral ? <FreeFields table={'contacts'} recordId={this.props.id} /> : null}
                {permissions.viewContactAddress ? <ContactDetailsFormAddress /> : null}
                {permissions.viewContactEmail ? <ContactDetailsFormEmail /> : null}
                {permissions.viewContactPhone ? <ContactDetailsFormPhone /> : null}
                {permissions.viewContactCoachQuotation && inspectionPersonTypeId == 'coach' ? (
                    <ContactDetailsCoachQuotations />
                ) : null}
                {permissions.viewContactQuotation && typeId == 'organisation' ? <ContactDetailsQuotations /> : null}
                {permissions.viewContactCampaign && (inspectionPersonTypeId == 'coach' || typeId == 'organisation') ? (
                    <ContactDetailsCampaigns />
                ) : null}
                {permissions.viewContactOccupation ? <ContactDetailsFormOccupations /> : null}
                {permissions.viewContactOther && typeId == 'person' ? <ContactDetailsFormOther /> : null}
                {permissions.viewContactPortalUser && typeId == 'person' ? <ContactDetailsFormPortalUser /> : null}
                {permissions.viewContactNote ? <ContactDetailsFormNote /> : null}
                {permissions.viewContactConclusion ? <ContactDetailsFormConclusion /> : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        contactDetails: state.contactDetails,
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchContactDetails: id => {
        dispatch(fetchContactDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailsForm);
