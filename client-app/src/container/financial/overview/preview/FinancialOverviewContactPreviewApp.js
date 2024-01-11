import React, { Component } from 'react';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import FinancialOverviewContactPreviewForm from './FinancialOverviewContactPreviewForm';
import FinancialOverviewContactPreviewToolbar from './FinancialOverviewContactPreviewToolbar';
import FinancialOverviewContactAPI from '../../../../api/financial/overview/FinancialOverviewContactAPI';

class FinancialOverviewContactPreviewApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            financialOverviewContactDetails: {},
            isLoading: true,
            hasError: false,
            scale: 1,
        };
    }

    componentDidMount() {
        this.callFetchFinancialOverviewContactDetails();
    }

    callFetchFinancialOverviewContactDetails = () => {
        FinancialOverviewContactAPI.fetchFinancialOverviewContactDetails(this.props.params.id)
            .then(payload => {
                this.setState({
                    financialOverviewContactDetails: payload.data,
                    isLoading: false,
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
                    {this.state.isLoading ? (
                        <div>Gegevens aan het laden.</div>
                    ) : (
                        <>
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
                        </>
                    )}
                </div>
            </div>
        );
    }
}

export default FinancialOverviewContactPreviewApp;
