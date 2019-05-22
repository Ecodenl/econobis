import React, { Component } from 'react';

import VatCodesList from './VatCodesList';
import VatCodesListToolbar from './VatCodesListToolbar';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import VatCodeAPI from '../../../api/vat-code/VatCodeAPI';

class VatCodesListApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            vatCodes: [],
            isLoading: false,
            hasError: false,
        };
    }

    componentDidMount() {
        this.callFetchVatCodesData();
    }

    callFetchVatCodesData = () => {
        this.setState({ isLoading: true, hasError: false });
        VatCodeAPI.fetchVatCodes()
            .then(payload => {
                this.setState({ isLoading: false, vatCodes: payload.data.data });
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
                        <VatCodesListToolbar
                            vatCodesCount={this.state.vatCodes ? this.state.vatCodes.length : 0}
                            refreshVatCodesData={this.callFetchVatCodesData}
                        />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <VatCodesList
                            vatCodes={this.state.vatCodes}
                            isLoading={this.state.isLoading}
                            hasError={this.state.hasError}
                        />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

export default VatCodesListApp;
