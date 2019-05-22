import React, { Component } from 'react';
import { connect } from 'react-redux';

import VatCodeDetailsFormGeneralEdit from './VatCodeDetailsFormGeneralEdit';
import VatCodeDetailsFormGeneralView from './VatCodeDetailsFormGeneralView';

class VatCodeDetailsFormGeneral extends Component {
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
                    <VatCodeDetailsFormGeneralEdit
                        vatCode={this.props.vatCode}
                        switchToView={this.switchToView}
                        updateState={this.props.updateState}
                    />
                ) : (
                    <VatCodeDetailsFormGeneralView {...this.props.vatCode} switchToEdit={this.switchToEdit} />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        meDetails: state.meDetails,
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(VatCodeDetailsFormGeneral);
