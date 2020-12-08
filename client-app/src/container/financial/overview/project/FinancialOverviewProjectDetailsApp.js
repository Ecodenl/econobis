import React, { Component } from 'react';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import FinancialOverviewDetailsAPI from '../../../../api/financial/overview/FinancialOverviewDetailsAPI';
import FinancialOverviewProjectDetailsToolbar from './FinancialOverviewProjectDetailsToolbar';
import FinancialOverviewProjectDetailsForm from './FinancialOverviewProjectDetailsForm';

class FinancialOverviewProjectDetailsApp extends Component {
    constructor(props) {
        super(props);
        // todo WM: opschonen log regels
        console.log('FinancialOverviewProjectDetailsApp');
        console.log(props);
        this.state = {
            financialOverviewProject: {},
            isLoading: false,
            hasError: false,
        };
    }

    componentDidMount() {
        this.callFetchFinancialOverviewProjectDetails();
    }

    callFetchFinancialOverviewProjectDetails = () => {
        this.setState({ isLoading: true, hasError: false });
        FinancialOverviewDetailsAPI.fetchFinancialOverviewProjectDetails(this.props.params.id)
            .then(payload => {
                // todo WM: opschonen log regels
                console.log('payload');
                console.log(payload);
                this.setState({
                    isLoading: false,
                    financialOverviewProject: payload.data.data,
                });
            })
            .catch(error => {
                this.setState({ isLoading: false, hasError: true });
            });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={'panel-small'}>
                                <FinancialOverviewProjectDetailsToolbar
                                    year={
                                        this.state.financialOverviewProject &&
                                        this.state.financialOverviewProject.financialOverview
                                            ? this.state.financialOverviewProject.financialOverview.year
                                            : ''
                                    }
                                    administrationName={
                                        this.state.financialOverviewProject &&
                                        this.state.financialOverviewProject.financialOverview &&
                                        this.state.financialOverviewProject.financialOverview.administration
                                            ? this.state.financialOverviewProject.financialOverview.administration.name
                                            : ''
                                    }
                                    id={
                                        this.state.financialOverviewProject &&
                                        this.state.financialOverviewProject.financialOverview
                                            ? this.state.financialOverviewProject.financialOverview.id
                                            : null
                                    }
                                />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <FinancialOverviewProjectDetailsForm
                            financialOverviewProject={this.state.financialOverviewProject}
                            isLoading={this.state.isLoading}
                            hasError={this.state.hasError}
                        />
                    </div>
                </div>
                <div className="col-md-3" />
            </div>
        );
    }
}

export default FinancialOverviewProjectDetailsApp;
