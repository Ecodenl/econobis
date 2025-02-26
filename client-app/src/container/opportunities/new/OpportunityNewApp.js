import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import { hashHistory } from 'react-router';

import OpportunityNewToolbar from './OpportunityNewToolbar';
import OpportunityNew from './OpportunityNew';
import OpportunityDetailsAPI from '../../../api/opportunity/OpportunityDetailsAPI';
import IntakeDetailsAPI from '../../../api/intake/IntakeDetailsAPI';
import PanelBody from '../../../components/panel/PanelBody';
import Panel from '../../../components/panel/Panel';
import validator from 'validator';
import { connect } from 'react-redux';

class OppportunitiesNewApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            measure: [],
            intake: [],
            status: props.status,
            opportunity: {
                intakeId: '',
                measureCategoryId: props.params.measureCategoryId,
                measureIds: '',
                measureIdsSelected: [],
                statusId: '1',
                quotationText: '',
                evaluationAgreedDate: '',
                desiredDate: '',
                amount: '',
                exceptionDebtRelief: '',
                belowWozLimit: '',
            },
            errors: {
                statusId: false,
                desiredDate: false,
            },
        };

        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    }

    componentWillMount() {
        IntakeDetailsAPI.fetchIntakeDetails(this.props.params.intakeId).then(payload => {
            this.setState({
                ...this.state,
                intake: payload,
                opportunity: {
                    ...this.state.opportunity,
                    intakeId: payload.id,
                },
            });
        });
    }

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            opportunity: {
                ...this.state.opportunity,
                [name]: value,
            },
        });
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            opportunity: {
                ...this.state.opportunity,
                [name]: value,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { opportunity } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(opportunity.statusId)) {
            errors.statusId = true;
            hasErrors = true;
        } else {
            const chosenStatus = this.state.status.find(item => {
                return item.id == opportunity.statusId;
            });

            if (chosenStatus.name === 'Uitvoering') {
                if (validator.isEmpty(opportunity.desiredDate)) {
                    errors.desiredDate = true;
                    hasErrors = true;
                }
            }
        }

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
            OpportunityDetailsAPI.storeOpportunity(opportunity).then(payload => {
                hashHistory.push('/kans/' + payload.id);
            });
    };

    handleMeasureIds = selectedOption => {
        const measureIds = selectedOption ? selectedOption.map(item => item.id).join(',') : '';
        this.setState({
            ...this.state,
            opportunity: {
                ...this.state.opportunity,
                measureIds: measureIds,
                measureIdsSelected: selectedOption,
            },
        });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <Panel>
                            <PanelBody className={'panel-small'}>
                                <OpportunityNewToolbar />
                            </PanelBody>
                        </Panel>
                    </div>
                    <div className="col-md-12">
                        <Panel>
                            <PanelBody>
                                <OpportunityNew
                                    handleInputChange={this.handleInputChange}
                                    handleInputChangeDate={this.handleInputChangeDate}
                                    handleMeasureIds={this.handleMeasureIds}
                                    intake={this.state.intake}
                                    measureCategoryId={this.state.measureCategoryId}
                                    opportunity={this.state.opportunity}
                                    handleSubmit={this.handleSubmit}
                                    errors={this.state.errors}
                                />
                            </PanelBody>
                        </Panel>
                    </div>
                </div>
                <div className="col-md-3" />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        status: state.systemData.opportunityStatus,
    };
};

export default connect(mapStateToProps)(OppportunitiesNewApp);
