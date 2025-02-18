import React, { Component } from 'react';
import moment from 'moment';
import validator from 'validator';
import { isEmpty } from 'lodash';
import { hashHistory } from 'react-router';

import CampaignNewToolbar from './CampaignNewToolbar';
import CampaignNew from './CampaignNew';

import CampaignDetailsAPI from '../../../api/campaign/CampaignDetailsAPI';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

class CampaignNewApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            campaign: {
                name: '',
                description: '',
                startDate: '',
                endDate: '',
                statusId: '',
                typeId: '',
                measureCategoryIds: '',
                measureCategoryIdsSelected: [],
                opportunityActionIds: '',
                opportunityActionIdsSelected: [],
                subsidyPossible: false,
                wozLimit: '',
            },
            errors: {
                name: false,
                type: false,
                wozLimit: false,
            },
        };
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            campaign: {
                ...this.state.campaign,
                [name]: value,
            },
        });
    };

    handleInputChangeDate = (value, name) => {
        this.setState({
            ...this.state,
            campaign: {
                ...this.state.campaign,
                [name]: value,
            },
        });
    };

    handleMeasureCategoryIds = selectedOption => {
        const measureCategoryIds = selectedOption ? selectedOption.map(item => item.id).join(',') : '';
        this.setState({
            ...this.state,
            campaign: {
                ...this.state.campaign,
                measureCategoryIds: measureCategoryIds,
                measureCategoryIdsSelected: selectedOption,
            },
        });
    };

    handleOpportunityActionIds = selectedOption => {
        const opportunityActionIds = selectedOption ? selectedOption.map(item => item.id).join(',') : '';
        this.setState({
            ...this.state,
            campaign: {
                ...this.state.campaign,
                opportunityActionIds: opportunityActionIds,
                opportunityActionIdsSelected: selectedOption,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { campaign } = this.state;

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(campaign.name)) {
            errors.name = true;
            hasErrors = true;
        }

        if (validator.isEmpty('' + campaign.typeId)) {
            errors.type = true;
            hasErrors = true;
        }

        // if (!validator.isInt(campaign.wozLimit)) {
        //     errors.wozLimit = true;
        //     hasErrors = true;
        // }

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
            CampaignDetailsAPI.storeCampaign(campaign).then(payload => {
                hashHistory.push(`/campagne/${payload.data.data.id}`);
            });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <CampaignNewToolbar />
                    </div>

                    <div className="col-md-12">
                        <Panel>
                            <PanelBody>
                                <div className="col-md-12">
                                    <CampaignNew
                                        campaign={this.state.campaign}
                                        errors={this.state.errors}
                                        handleInputChange={this.handleInputChange}
                                        handleInputChangeDate={this.handleInputChangeDate}
                                        handleMeasureCategoryIds={this.handleMeasureCategoryIds}
                                        handleOpportunityActionIds={this.handleOpportunityActionIds}
                                        handleSubmit={this.handleSubmit}
                                    />
                                </div>
                            </PanelBody>
                        </Panel>
                    </div>
                </div>
                <div className="col-md-3" />
            </div>
        );
    }
}

export default CampaignNewApp;
