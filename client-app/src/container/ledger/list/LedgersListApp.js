import React, { Component } from 'react';

import LedgersList from './LedgersList';
import LedgersListToolbar from './LedgersListToolbar';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import LedgerAPI from '../../../api/ledger/LedgerAPI';

class LedgersListApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ledgers: [],
            isLoading: false,
            hasError: false,
        };
    }

    componentDidMount() {
        this.callFetchLedgersData();
    }

    callFetchLedgersData = () => {
        this.setState({ isLoading: true, hasError: false });
        LedgerAPI.fetchLedgers()
            .then(payload => {
                this.setState({ isLoading: false, ledgers: payload.data.data });
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
                        <LedgersListToolbar
                            ledgersCount={this.state.ledgers ? this.state.ledgers.length : 0}
                            refreshLedgersData={this.callFetchLedgersData}
                        />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <LedgersList
                            ledgers={this.state.ledgers}
                            isLoading={this.state.isLoading}
                            hasError={this.state.hasError}
                        />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

export default LedgersListApp;
