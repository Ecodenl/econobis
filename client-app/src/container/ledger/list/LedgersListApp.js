import React, { Component } from 'react';

import LedgersList from './LedgersList';
import LedgersListToolbar from './LedgersListToolbar';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import LedgerAPI from '../../../api/ledger/LedgerAPI';
import LedgerDetailsAPI from '../../../api/ledger/LedgerDetailsAPI';
import { setError } from '../../../actions/general/ErrorActions';
import { connect } from 'react-redux';

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

    deleteLedger = id => {
        // Api aanroepen met delete
        LedgerDetailsAPI.deleteLedger(id)
            .then(payload => {
                this.setState({ ledgers: this.state.ledgers.filter(ledger => ledger.id !== id) });
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
                            deleteLedger={this.deleteLedger}
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

export default connect(
    null,
    mapDispatchToProps
)(LedgersListApp);
