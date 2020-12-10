import React, { Component } from 'react';
import { connect } from 'react-redux';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import FinancialOverviewContactPreviewForm from './FinancialOverviewContactPreviewForm';
import FinancialOverviewContactPreviewToolbar from './FinancialOverviewContactPreviewToolbar';
import FinancialOverviewDetailsAPI from '../../../../api/financial/overview/FinancialOverviewDetailsAPI';

class FinancialOverviewContactPreviewApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            financialOverviewContactDetails: {},
            isLoading: false,
            hasError: false,
            scale: 1,
        };
    }

    componentDidMount() {
        this.callFetchFinancialOverviewContactDetails();
    }

    callFetchFinancialOverviewContactDetails = () => {
        this.setState({ isLoading: true, hasError: false });
        FinancialOverviewDetailsAPI.fetchFinancialOverviewContactDetails(
            this.props.params.id,
            this.props.params.contactId
        )
            .then(payload => {
                this.setState({
                    isLoading: false,
                    financialOverviewContactDetails: payload.data,
                });
            })
            .catch(error => {
                this.setState({ isLoading: false, hasError: true });
            });
    };

    zoomIn = () => {
        this.setState({
            scale: this.state.scale + 0.2,
        });
    };

    zoomOut = () => {
        this.setState({
            scale: this.state.scale - 0.2,
        });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={'panel-small'}>
                                <FinancialOverviewContactPreviewToolbar
                                    financialOverviewContactDetails={this.state.financialOverviewContactDetails}
                                    zoomIn={this.zoomIn}
                                    zoomOut={this.zoomOut}
                                />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <FinancialOverviewContactPreviewForm
                            financialOverviewContactDetails={this.state.financialOverviewContactDetails}
                            financialOverviewId={this.props.params.id}
                            contactId={this.props.params.contactId}
                            scale={this.state.scale}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

// const mapDispatchToProps = dispatch => ({
//     financialOverviewContactDetails: (id, contactId) => {
//         dispatch(financialOverviewContactDetails(id, contactId));
//     },
// });
//
// export default connect(null, mapDispatchToProps)(FinancialOverviewContactPreviewApp);
export default FinancialOverviewContactPreviewApp;
