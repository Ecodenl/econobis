import React, { Component } from 'react';
import { connect } from 'react-redux';
import CampaignsAPI from '../../../../api/campaign/CampaignsAPI';
import HousingFileDetailsAPI from '../../../../api/housing-file/HousingFileDetailsAPI';
import Modal from '../../../../components/modal/Modal';
import InputSelect from '../../../../components/form/InputSelect';
import validator from 'validator';

class HousingFileSpecificationCreateOpportunity extends Component {
    constructor(props) {
        super(props);

        this.state = {
            campaigns: [],
            campaignId: '',
            errors: {
                campaignId: false,
            },
        };
    }

    componentDidMount() {
        CampaignsAPI.peekNotFinishedCampaigns().then(payload => {
            this.setState({ campaigns: payload });
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

    handleSubmit = event => {
        if (validator.isEmpty(this.state.campaignId + '')) {
            this.setState({
                errors: {
                    campaignId: true,
                },
            });
        } else {
            HousingFileDetailsAPI.createOpportunitiesFromSpecifications(
                this.props.housingFileId,
                this.props.specificationIds,
                this.state.campaignId
            ).then(payload => {
                this.props.closeModalCreateOpportunity();
                this.props.showModalCreateQuotationRequest(this.state.campaignId, payload.opportunityIds);
            });
        }
    };

    render() {
        return (
            <Modal
                buttonConfirmText="Kans(en) maken"
                closeModal={this.props.closeModalCreateOpportunity}
                confirmAction={this.handleSubmit}
                title="Kans(en) maken"
            >
                <p>Aanmaken kans(en) voor de {this.props.specificationIds.length} geselecteerde specificatie(s)?</p>
                <div className="row">
                    <InputSelect
                        size={'col-md-12'}
                        label={'Campagne'}
                        name="campaignId"
                        options={this.state.campaigns}
                        value={this.state.campaignId}
                        onChangeAction={this.handleInputChange}
                        required={'required'}
                        error={this.state.errors.campaignId}
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

export default connect(mapStateToProps, null)(HousingFileSpecificationCreateOpportunity);
