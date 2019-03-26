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
        this.setState({ loading: false, hasError: false });
        VatCodeAPI.fetchVatCodes()
            .then(payload => {
                this.setState({ loading: false, vatCodes: payload.data.data });
            })
            .catch(error => {
                this.setState({ loading: false, hasError: true });
            });
    };

    render() {
        return (
            <Panel>
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        <VatCodesListToolbar refreshVatCodesData={this.callFetchVatCodesData} />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <VatCodesList
                            vatCodes={this.state.vatCodes}
                            loading={this.state.loading}
                            hasError={this.state.hasError}
                        />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

export default VatCodesListApp;
