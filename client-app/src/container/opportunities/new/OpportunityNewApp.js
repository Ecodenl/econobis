import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import { hashHistory } from 'react-router';

import OpportunityNewToolbar from './OpportunityNewToolbar';
import OpportunityNew from './OpportunityNew';
import OpportunityDetailsAPI from '../../../api/opportunity/OpportunityDetailsAPI';
import IntakeDetailsAPI from '../../../api/intake/IntakeDetailsAPI';
import MeasureAPI from '../../../api/measure/MeasureAPI';
import PanelBody from "../../../components/panel/PanelBody";
import Panel from "../../../components/panel/Panel";


class OppportunitiesNewApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            measure: [],
            intake: [],
            opportunity: {
                intakeId: '',
                measureId: '',
                statusId: '',
                quotationText: '',
                evaluationAgreedDate: '',
                desiredDate: '',
            },
        };

        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    };

    componentWillMount(){
        IntakeDetailsAPI.fetchIntakeDetails(this.props.params.intakeId).then((payload) => {
            this.setState({
                ...this.state,
                intake: payload,
                opportunity: {
                    ...this.state.opportunity,
                    intakeId: payload.id,
                },
            });
        });

        MeasureAPI.fetchMeasure(this.props.params.measureId).then((payload) => {
            this.setState({
                ...this.state,
                measure: payload,
                opportunity: {
                    ...this.state.opportunity,
                    measureId: payload.id,
                },
            });
        });
    }

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            opportunity: {
                ...this.state.opportunity,
                [name]: value
            },
        });
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            opportunity: {
                ...this.state.opportunity,
                [name]: value
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const {opportunity} = this.state;


        OpportunityDetailsAPI.storeOpportunity(opportunity).then(payload => {
            hashHistory.push('/kans/' + payload.id);
        });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <Panel>
                            <PanelBody className={"panel-small"}>
                                <OpportunityNewToolbar/>
                            </PanelBody>
                        </Panel>
                    </div>
                    <div className="col-md-12">
                        <Panel>
                            <PanelBody>
                                <OpportunityNew
                                    handleInputChange={this.handleInputChange}
                                    handleInputChangeDate={this.handleInputChangeDate}
                                    intake={this.state.intake}
                                    measure={this.state.measure}
                                    opportunity={this.state.opportunity}
                                    handleSubmit={this.handleSubmit}
                                />
                            </PanelBody>
                        </Panel>
                    </div>
                </div>
                <div className="col-md-3"/>
            </div>
        )
    }
};


export default OppportunitiesNewApp;