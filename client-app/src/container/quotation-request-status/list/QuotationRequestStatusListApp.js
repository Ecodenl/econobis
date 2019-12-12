import React, { Component } from 'react';

import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import QuotationRequestStatusAPI from '../../../api/quotation-request-status/QuotationRequestStatusAPI';
import QuotationRequestStatusListToolbar from './QuotationRequestStatusListToolbar';
import QuotationRequestStatusList from './QuotationRequestStatusList';

class QuotationRequestStatusListApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quotationRequestStatus: [],
            isLoading: false,
            hasError: false,
        };
    }

    componentDidMount() {
        this.callFetchQuotationRequestStatusData();
    }

    callFetchQuotationRequestStatusData = () => {
        this.setState({ isLoading: true, hasError: false });
        QuotationRequestStatusAPI.fetchQuotationRequestStatus()
            .then(payload => {
                this.setState({ isLoading: false, quotationRequestStatus: payload.data.data });
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
                        <QuotationRequestStatusListToolbar
                            quotationRequestStatusCount={
                                this.state.quotationRequestStatus ? this.state.quotationRequestStatus.length : 0
                            }
                            refreshQuotationRequestStatusData={this.callFetchQuotationRequestStatusData}
                        />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <QuotationRequestStatusList
                            quotationRequestStatus={this.state.quotationRequestStatus}
                            isLoading={this.state.isLoading}
                            hasError={this.state.hasError}
                        />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

export default QuotationRequestStatusListApp;
