import React, { Component } from 'react';

import FinancialOverviewList from './FinancialOverviewList';
import FinancialOverviewListToolbar from './FinancialOverviewListToolbar';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import { setError } from '../../../../actions/general/ErrorActions';
import { connect } from 'react-redux';
import FinancialOverviewsAPI from '../../../../api/financial/overview/FinancialOverviewsAPI';
import FinancialOverviewDetailsAPI from '../../../../api/financial/overview/FinancialOverviewDetailsAPI';

class FinancialOverviewListApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            financialOverviews: [],
            isLoading: false,
            hasError: false,
        };
    }

    componentDidMount() {
        this.callFetchFinancialOverviewsData();
    }

    callFetchFinancialOverviewsData = () => {
        this.setState({ isLoading: true, hasError: false });
        FinancialOverviewsAPI.fetchFinancialOverviews()
            .then(payload => {
                this.setState({ isLoading: false, financialOverviews: payload.data.data });
            })
            .catch(error => {
                this.setState({ isLoading: false, hasError: true });
            });
    };

    deleteFinancialOverview = id => {
        // Api aanroepen met delete
        FinancialOverviewDetailsAPI.deleteFinancialOverview(id)
            .then(payload => {
                this.setState({
                    financialOverviews: this.state.financialOverviews.filter(
                        financialOverview => financialOverview.id !== id
                    ),
                });
            })
            .catch(error => {
                // this.setState({ isLoading: false, hasError: true });
                this.props.setError(error.response.status, error.response.data.message);
            });
    };

    render() {
        return (
            <Panel>
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        <FinancialOverviewListToolbar
                            financialOverviewsCount={
                                this.state.financialOverviews ? this.state.financialOverviews.length : 0
                            }
                            refreshFinancialOverviewsData={this.callFetchFinancialOverviewsData}
                        />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <FinancialOverviewList
                            financialOverviews={this.state.financialOverviews}
                            isLoading={this.state.isLoading}
                            hasError={this.state.hasError}
                            deleteFinancialOverview={this.deleteFinancialOverview}
                        />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});

export default connect(null, mapDispatchToProps)(FinancialOverviewListApp);
