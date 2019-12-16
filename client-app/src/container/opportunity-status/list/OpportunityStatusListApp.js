import React, { Component } from 'react';

import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import OpportunityStatusAPI from '../../../api/opportunity-status/OpportunityStatusAPI';
import OpportunityStatusListToolbar from './OpportunityStatusListToolbar';
import OpportunityStatusList from './OpportunityStatusList';

class OpportunityStatusListApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            opportunityStatus: [],
            isLoading: false,
            hasError: false,
        };
    }

    componentDidMount() {
        this.callFetchOpportunityStatusData();
    }

    callFetchOpportunityStatusData = () => {
        this.setState({ isLoading: true, hasError: false });
        OpportunityStatusAPI.fetchOpportunityStatus()
            .then(payload => {
                this.setState({ isLoading: false, opportunityStatus: payload.data.data });
            })
            .catch(error => {
                this.setState({ isLoading: false, hasError: true });
            });
    };

    render() {
        return (
            <Panel>
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        <OpportunityStatusListToolbar
                            opportunityStatusCount={
                                this.state.opportunityStatus ? this.state.opportunityStatus.length : 0
                            }
                            refreshOpportunityStatusData={this.callFetchOpportunityStatusData}
                        />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <OpportunityStatusList
                            opportunityStatus={this.state.opportunityStatus}
                            isLoading={this.state.isLoading}
                            hasError={this.state.hasError}
                        />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

export default OpportunityStatusListApp;
