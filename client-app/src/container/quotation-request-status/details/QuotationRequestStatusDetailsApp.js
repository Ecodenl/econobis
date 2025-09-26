import React, { Component } from 'react';

import QuotationRequestStatusDetailsToolbar from './QuotationRequestStatusDetailsToolbar';
import QuotationRequestStatusDetailsForm from './QuotationRequestStatusDetailsForm';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import QuotationRequestStatusDetailsAPI from '../../../api/quotation-request-status/QuotationRequestStatusDetailsAPI';
import { useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const QuotationRequestStatusDetailsAppWrapper = props => {
    const params = useParams();
    return <QuotationRequestStatusDetailsApp {...props} params={params} />;
};

class QuotationRequestStatusDetailsApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quotationRequestStatus: {},
            isLoading: false,
            hasError: false,
        };
    }

    componentDidMount() {
        this.callFetchQuotationRequestStatusDetails();
    }

    callFetchQuotationRequestStatusDetails = () => {
        this.setState({ isLoading: true, hasError: false });
        QuotationRequestStatusDetailsAPI.fetchQuotationRequestStatusDetails(this.props.params.id)
            .then(payload => {
                this.setState({
                    isLoading: false,
                    quotationRequestStatus: {
                        ...payload.data.data,
                    },
                });
            })
            .catch(error => {
                this.setState({ isLoading: false, hasError: true });
            });
    };

    updateState = quotationRequestStatus => {
        this.setState({ quotationRequestStatus });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={'panel-small'}>
                                <QuotationRequestStatusDetailsToolbar
                                    name={this.state.quotationRequestStatus.name || ''}
                                />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <QuotationRequestStatusDetailsForm
                            quotationRequestStatus={this.state.quotationRequestStatus}
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

export default QuotationRequestStatusDetailsAppWrapper;
