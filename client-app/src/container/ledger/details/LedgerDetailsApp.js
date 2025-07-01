import React, { Component } from 'react';

import LedgerDetailsToolbar from './LedgerDetailsToolbar';
import LedgerDetailsForm from './LedgerDetailsForm';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import LedgerDetailsAPI from '../../../api/ledger/LedgerDetailsAPI';
import { setError } from '../../../actions/general/ErrorActions';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const LedgerDetailsAppWrapper = props => {
    const navigate = useNavigate();
    const params = useParams();

    return <LedgerDetailsApp {...props} navigate={navigate} params={params} />;
};

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

    deleteLedger = id => {
        // Api aanroepen met delete
        LedgerDetailsAPI.deleteLedger(id)
            .then(payload => {
                this.props.navigate(`/grootboekrekeningen`);
            })
            .catch(error => {
                // this.setState({ isLoading: false, hasError: true });
                this.props.setError(error.response.status, error.response.data.message);
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
                                <LedgerDetailsToolbar
                                    description={this.state.ledger.description || ''}
                                    id={this.state.ledger.id}
                                    deleteLedger={this.deleteLedger}
                                />
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

const mapDispatchToProps = dispatch => ({
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});

export default connect(null, mapDispatchToProps)(LedgerDetailsAppWrapper);
