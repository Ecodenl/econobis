import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from '../../../../components/modal/Modal';
import InputSelect from '../../../../components/form/InputSelect';
import validator from 'validator';
import CampaignDetailsAPI from '../../../../api/campaign/CampaignDetailsAPI';
import { fetchHousingFileDetails } from '../../../../actions/housing-file/HousingFileDetailsActions';
import HousingFileDetailsAPI from '../../../../api/housing-file/HousingFileDetailsAPI';

class HousingFileSpecificationCreateQuotationRequest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            organisationsOrCoaches: [],
            organisationOrCoachId: '',
            errors: {
                organisationOrCoachId: false,
            },
        };
    }

    componentDidMount() {
        CampaignDetailsAPI.fetchCampaign({ id: this.props.campaignId }).then(payload => {
            this.setState({ organisationsOrCoaches: payload.data.data.organisationsOrCoaches });
        });
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };

    closeModalCreateQuotationRequest = event => {
        this.props.closeModalCreateQuotationRequest();
        this.props.fetchHousingFileDetails(this.props.housingFileId);
    };

    handleSubmit = event => {
        if (validator.isEmpty(this.state.organisationOrCoachId + '')) {
            this.setState({
                errors: {
                    organisationOrCoachId: true,
                },
            });
        } else {
            HousingFileDetailsAPI.createQuotationRequestsFromSpecifications(
                this.props.housingFileId,
                this.props.opportunityIds,
                this.state.organisationOrCoachId
            ).then(payload => {
                this.props.closeModalCreateQuotationRequest();
                this.props.fetchHousingFileDetails(this.props.housingFileId);
            });
        }
    };

    render() {
        return (
            <Modal
                buttonConfirmText="Kansactie(s) maken"
                closeModal={this.closeModalCreateQuotationRequest}
                confirmAction={this.handleSubmit}
                title="Kansactie(s) maken"
            >
                <p>{this.props.opportunityIds.length} kans(en) zijn aangemaakt.</p>
                <p>Ook kansactie(s) type 'Offerteverzoek' aanmaken voor deze kans(en)?</p>
                <p>Kies annuleren als er voor verschillende partijen offerteverzoeken gemaakt moeten worden.</p>
                <div className="row">
                    <InputSelect
                        size={'col-md-12'}
                        label={'Organisatie/coach'}
                        name="organisationOrCoachId"
                        options={this.state.organisationsOrCoaches}
                        value={this.state.organisationOrCoachId}
                        onChangeAction={this.handleInputChange}
                        required={'required'}
                        error={this.state.errors.organisationOrCoachId}
                    />
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        housingFileId: state.housingFileDetails.id,
    };
};
const mapDispatchToProps = dispatch => ({
    fetchHousingFileDetails: id => {
        dispatch(fetchHousingFileDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(HousingFileSpecificationCreateQuotationRequest);
