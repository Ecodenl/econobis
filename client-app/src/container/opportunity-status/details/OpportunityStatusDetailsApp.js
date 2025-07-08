import React, { Component } from 'react';

import OpportunityStatusDetailsToolbar from './OpportunityStatusDetailsToolbar';
import OpportunityStatusDetailsForm from './OpportunityStatusDetailsForm';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import OpportunityStatusDetailsAPI from '../../../api/opportunity-status/OpportunityStatusDetailsAPI';
import { useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const OpportunityStatusDetailsAppWrapper = props => {
    const params = useParams();
    return <OpportunityStatusDetailsApp {...props} params={params} />;
};

class OpportunityStatusDetailsApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            opportunityStatus: {},
            isLoading: false,
            hasError: false,
        };
    }

    componentDidMount() {
        this.callFetchOpportunityStatusDetails();
    }

    callFetchOpportunityStatusDetails = () => {
        this.setState({ isLoading: true, hasError: false });
        OpportunityStatusDetailsAPI.fetchOpportunityStatusDetails(this.props.params.id)
            .then(payload => {
                this.setState({
                    isLoading: false,
                    opportunityStatus: {
                        ...payload.data.data,
                    },
                });
            })
            .catch(error => {
                this.setState({ isLoading: false, hasError: true });
            });
    };

    updateState = opportunityStatus => {
        this.setState({ opportunityStatus });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={'panel-small'}>
                                <OpportunityStatusDetailsToolbar name={this.state.opportunityStatus.name || ''} />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <OpportunityStatusDetailsForm
                            opportunityStatus={this.state.opportunityStatus}
                            isLoading={this.state.isLoading}
                            hasError={this.state.hasError}
                            updateState={this.updateState}
                        />
                    </div>
                </div>
                <div className="col-md-3" />
            </div>
        );
    }
}

export default OpportunityStatusDetailsAppWrapper;
