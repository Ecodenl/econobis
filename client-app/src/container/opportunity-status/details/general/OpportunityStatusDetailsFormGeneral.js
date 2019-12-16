import React, { Component } from 'react';
import { connect } from 'react-redux';

import OpportunityStatusDetailsFormGeneralEdit from './OpportunityStatusDetailsFormGeneralEdit';
import OpportunityStatusDetailsFormGeneralView from './OpportunityStatusDetailsFormGeneralView';

class OpportunityStatusDetailsFormGeneral extends Component {
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
                    <OpportunityStatusDetailsFormGeneralEdit
                        opportunityStatus={this.props.opportunityStatus}
                        switchToView={this.switchToView}
                        updateState={this.props.updateState}
                    />
                ) : (
                    <OpportunityStatusDetailsFormGeneralView
                        {...this.props.opportunityStatus}
                        switchToEdit={this.switchToEdit}
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
    };
};

export default connect(mapStateToProps)(OpportunityStatusDetailsFormGeneral);
