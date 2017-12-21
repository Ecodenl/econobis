import React, { Component } from 'react';
import moment from 'moment';
import validator from 'validator';
import { isEmpty } from 'lodash';
import { hashHistory } from 'react-router';

import CampaignNewToolbar from './CampaignNewToolbar';
import CampaignNew from './CampaignNew';

import CampaignAPI from '../../../api/campaign/CampaignAPI';

class CampaignNewApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            campaign: {
                name: '',
                description: '',
                startDate: '',
                endDate: '',
                goal: '',
                statusId: '',
                typeId: '',
                measureIds:'',
            },
            errors: {
                name: false,
                type: false,
            },
        }
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            campaign: {
                ...this.state.campaign,
                [name]: value
            },
        });
    };

    handleStartDate = (date) => {
        const formattedDate = (date ? moment(date).format('Y-MM-DD') : '');

        this.setState({
            ...this.state,
            campaign: {
                ...this.state.campaign,
                startDate: formattedDate
            },
        });
    };

    handleEndDate = (date) => {
        const formattedDate = (date ? moment(date).format('Y-MM-DD') : '');

        this.setState({
            ...this.state,
            campaign: {
                ...this.state.campaign,
                endDate: formattedDate
            },
        });
    };

    handleMeasureIds = (selectedOption) => {
        this.setState({
            ...this.state,
            campaign: {
                ...this.state.campaign,
                measureIds: selectedOption
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const {campaign} = this.state;

        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty(campaign.name)){
            errors.name = true;
            hasErrors = true;
        };

        if(validator.isEmpty('' + campaign.typeId)){
            errors.type = true;
            hasErrors = true;
        };

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
        CampaignAPI.storeCampaign(campaign).then(payload => {
            hashHistory.push(`/campagne/${payload.id}`);
        });
    };

    render() {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="col-md-12 extra-space-above">
                            <CampaignNewToolbar/>
                        </div>
                        <div className="col-md-12 extra-space-above">
                            <CampaignNew
                                campaign={this.state.campaign}
                                errors={this.state.errors}
                                handleInputChange={this.handleInputChange}
                                handleStartDate={this.handleStartDate}
                                handleEndDate={this.handleEndDate}
                                handleMeasureIds={this.handleMeasureIds}
                                handleSubmit={this.handleSubmit}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default CampaignNewApp;