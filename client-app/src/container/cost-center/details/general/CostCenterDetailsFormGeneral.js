import React, { Component } from 'react';
import { connect } from 'react-redux';

import CostCenterDetailsFormGeneralEdit from './CostCenterDetailsFormGeneralEdit';
import CostCenterDetailsFormGeneralView from './CostCenterDetailsFormGeneralView';

class CostCenterDetailsFormGeneral extends Component {
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
                    <CostCenterDetailsFormGeneralEdit
                        costCenter={this.props.costCenter}
                        costCenters={this.props.costCenters}
                        switchToView={this.switchToView}
                        updateState={this.props.updateState}
                    />
                ) : (
                    <CostCenterDetailsFormGeneralView {...this.props.costCenter} switchToEdit={this.switchToEdit} />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        meDetails: state.meDetails,
        permissions: state.meDetails.permissions,
        costCenters: state.systemData.costCenters,
    };
};

export default connect(mapStateToProps)(CostCenterDetailsFormGeneral);
