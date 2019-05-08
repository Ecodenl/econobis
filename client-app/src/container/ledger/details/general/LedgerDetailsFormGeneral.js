import React, { Component } from 'react';
import { connect } from 'react-redux';

import LedgerDetailsFormGeneralEdit from './LedgerDetailsFormGeneralEdit';
import LedgerDetailsFormGeneralView from './LedgerDetailsFormGeneralView';

class LedgerDetailsFormGeneral extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEdit: false,
            activeDiv: '',
        };
    }

    switchToEdit = () => {
        this.setState({
            showEdit: true,
        });
    };

    switchToView = () => {
        this.setState({
            showEdit: false,
            activeDiv: '',
        });
    };

    onDivEnter() {
        this.setState({
            activeDiv: 'panel-grey',
        });
    }

    onDivLeave() {
        if (!this.state.showEdit) {
            this.setState({
                activeDiv: '',
            });
        }
    }

    render() {
        const { permissions = {} } = this.props.meDetails;

        return (
            <div
                className={this.state.activeDiv}
                onMouseEnter={() => this.onDivEnter()}
                onMouseLeave={() => this.onDivLeave()}
            >
                {this.state.showEdit && permissions.manageFinancial ? (
                    <LedgerDetailsFormGeneralEdit
                        ledger={this.props.ledger}
                        vatCodes={this.props.vatCodes}
                        ledgers={this.props.ledgers}
                        switchToView={this.switchToView}
                        updateState={this.props.updateState}
                    />
                ) : (
                    <LedgerDetailsFormGeneralView
                        {...this.props.ledger}
                        switchToEdit={this.switchToEdit}
                        vatCodes={this.props.vatCodes}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        meDetails: state.meDetails,
        permissions: state.meDetails.permissions,
        vatCodes: state.systemData.vatCodes,
        ledgers: state.systemData.ledgers
    };
};

export default connect(mapStateToProps)(LedgerDetailsFormGeneral);
