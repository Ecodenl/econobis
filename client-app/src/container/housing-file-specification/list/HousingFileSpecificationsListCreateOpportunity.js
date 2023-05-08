import React, { Component } from 'react';
import { connect } from 'react-redux';
import CampaignsAPI from '../../../api/campaign/CampaignsAPI';
import HousingFileDetailsAPI from '../../../api/housing-file/HousingFileDetailsAPI';
import Modal from '../../../components/modal/Modal';
import InputSelect from '../../../components/form/InputSelect';
import validator from 'validator';

class HousingFileSpecificationsListCreateOpportunity extends Component {
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
            HousingFileSpecificationsAPI.createOpportunitiesFromSpecificationsList(
                // this.props.housingFileId,
                this.props.specificationIds,
                this.state.campaignId
            ).then(payload => {
                this.props.toggleCreateOpportunity();
                this.props.toggleShowCheckboxList();
                // this.props.fetchHousingFileDetails(this.props.housingFileId);
            });
        }
    };

    render() {
        return (
            <Modal
                buttonConfirmText="Kans(en) maken"
                closeModal={this.props.toggleCreateOpportunity}
                confirmAction={this.handleSubmit}
                title="Kans(en) maken"
            >
                <div className="row">
                    <InputSelect
                        size={'col-md-12'}
                        label={`Maak kans(en) van geselecteerde specificatie(s) voor campagne:`}
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
    };
};

export default connect(mapStateToProps, null)(HousingFileSpecificationsListCreateOpportunity);
