import React, { Component } from 'react';

import FinancialOverviewDetailsToolbar from './FinancialOverviewDetailsToolbar';
import FinancialOverviewDetailsForm from './FinancialOverviewDetailsForm';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import FinancialOverviewDetailsAPI from '../../../../api/financial/overview/FinancialOverviewDetailsAPI';
import { setError } from '../../../../actions/general/ErrorActions';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

class FinancialOverviewDetailsApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            financialOverview: {},
            isLoading: true,
            hasError: false,
        };
    }

    componentDidMount() {
        this.callFetchFinancialOverviewDetails();
    }

    callFetchFinancialOverviewDetails = () => {
        FinancialOverviewDetailsAPI.fetchFinancialOverviewDetails(this.props.params.id)
            .then(payload => {
                this.setState({
                    isLoading: false,
                    financialOverview: payload.data.data,
                });
            })
            .catch(error => {
                this.setState({ isLoading: false, hasError: true });
            });
    };

    deleteFinancialOverview = id => {
        // Api aanroepen met delete
        FinancialOverviewDetailsAPI.deleteFinancialOverview(id)
            .then(payload => {
                hashHistory.push(`/waardestaten`);
            })
            .catch(error => {
                // this.setState({ isLoading: false, hasError: true });
                this.props.setError(error.response.status, error.response.data.message);
            });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={'panel-small'}>
                                <FinancialOverviewDetailsToolbar
                                    financialOverview={this.state.financialOverview}
                                    deleteFinancialOverview={this.deleteFinancialOverview}
                                />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <FinancialOverviewDetailsForm
                            financialOverview={this.state.financialOverview}
                            isLoading={this.state.isLoading}
                            hasError={this.state.hasError}
                            callFetchFinancialOverviewDetails={this.callFetchFinancialOverviewDetails}
                            // updateProjectToState={this.updateProjectToState}
                            // addProjectToState={this.addProjectToState}
                            // deleteProjectToState={this.deleteProjectToState}
                        />
                    </div>
                </div>
                <div className="col-md-3" />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});

export default connect(null, mapDispatchToProps)(FinancialOverviewDetailsApp);
