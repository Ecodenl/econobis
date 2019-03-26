import React, { Component } from 'react';

import LedgerDetailsToolbar from './LedgerDetailsToolbar';
import LedgerDetailsForm from './LedgerDetailsForm';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import LedgerDetailsAPI from '../../../api/ledger/LedgerDetailsAPI';
import moment from 'moment';

class LedgerDetailsApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ledger: {},
            isLoading: false,
            hasError: false,
        };
    }

    componentDidMount() {
        this.callFetchLedgerDetails();
    }

    callFetchLedgerDetails = () => {
        this.setState({ isLoading: true, hasError: false });
        LedgerDetailsAPI.fetchLedgerDetails(this.props.params.id)
            .then(payload => {
                this.setState({
                    isLoading: false,
                    ledger: payload.data.data,
                });
            })
            .catch(error => {
                this.setState({ isLoading: false, hasError: true });
            });
    };

    updateState = ledger => {
        this.setState({ ledger });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={'panel-small'}>
                                <LedgerDetailsToolbar description={this.state.ledger.description || ''} />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <LedgerDetailsForm
                            ledger={this.state.ledger}
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

export default LedgerDetailsApp;
