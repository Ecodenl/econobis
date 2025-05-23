import React, { Component } from 'react';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import FinancialOverviewProjectDetailsToolbar from './FinancialOverviewProjectDetailsToolbar';
import FinancialOverviewProjectDetailsForm from './FinancialOverviewProjectDetailsForm';
import FinancialOverviewProjectAPI from '../../../../api/financial/overview/FinancialOverviewProjectAPI';
import { useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const FinancialOverviewProjectDetailsAppWrapper = props => {
    const params = useParams();
    return <FinancialOverviewProjectDetailsApp {...props} params={params} />;
};

class FinancialOverviewProjectDetailsApp extends Component {
    constructor(props) {
        super(props);

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
        FinancialOverviewProjectAPI.fetchFinancialOverviewProjectDetails(this.props.params.id)
            .then(payload => {
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
                                    id={this.props.params.id}
                                    projectName={
                                        this.state.financialOverviewProject &&
                                        this.state.financialOverviewProject.project
                                            ? this.state.financialOverviewProject.project.name
                                            : ''
                                    }
                                    financialOverviewDescription={
                                        this.state.financialOverviewProject &&
                                        this.state.financialOverviewProject.financialOverview
                                            ? this.state.financialOverviewProject.financialOverview.description
                                            : ''
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

export default FinancialOverviewProjectDetailsAppWrapper;
