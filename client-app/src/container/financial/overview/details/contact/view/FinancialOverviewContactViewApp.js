import React, { Component } from 'react';

import Panel from '../../../../../../components/panel/Panel';
import PanelBody from '../../../../../../components/panel/PanelBody';
import FinancialOverviewContactViewForm from './FinancialOverviewContactViewForm';
import FinancialOverviewContactViewToolbar from './FinancialOverviewContactViewToolbar';
import FinancialOverviewContactAPI from '../../../../../../api/financial/overview/FinancialOverviewContactAPI';
import fileDownload from 'js-file-download';
import { useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const FinancialOverviewContactViewAppWrapper = props => {
    const params = useParams();
    return <FinancialOverviewContactViewApp {...props} params={params} />;
};

class FinancialOverviewContactViewApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            financialOverviewContactDetails: {},
            isLoading: false,
            hasError: false,
            scale: 1,
        };

        this.download = this.download.bind(this);
    }

    componentDidMount() {
        this.callFetchFinancialOverviewContactDetails();
    }

    callFetchFinancialOverviewContactDetails = () => {
        this.setState({ isLoading: true, hasError: false });
        FinancialOverviewContactAPI.fetchFinancialOverviewContactDetails(this.props.params.id)
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

    download() {
        FinancialOverviewContactAPI.download(this.props.params.id).then(payload => {
            fileDownload(payload.data, payload.headers['x-filename']);
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={'panel-small'}>
                                <FinancialOverviewContactViewToolbar
                                    financialOverviewContactDetails={this.state.financialOverviewContactDetails}
                                    zoomIn={this.zoomIn}
                                    zoomOut={this.zoomOut}
                                    download={this.download}
                                />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <FinancialOverviewContactViewForm
                            financialOverviewContactDetails={this.state.financialOverviewContactDetails}
                            financialOverviewContactId={this.props.params.id}
                            scale={this.state.scale}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default FinancialOverviewContactViewAppWrapper;
