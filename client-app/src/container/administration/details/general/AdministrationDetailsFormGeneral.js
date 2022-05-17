import React, { Component } from 'react';
import { connect } from 'react-redux';

import AdministrationDetailsFormGeneralEdit from './AdministrationDetailsFormGeneralEdit';
import AdministrationDetailsFormGeneralView from './AdministrationDetailsFormGeneralView';

class AdministrationDetailsFormGeneral extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEdit: false,
            activeDiv: '',
            imageHash: Date.now(),
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
            imageHash: Date.now(),
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
                    <AdministrationDetailsFormGeneralEdit
                        switchToView={this.switchToView}
                        administrationLogoDetails={this.props.administrationLogoDetails}
                        meDetails={this.props.meDetails}
                        imageHash={this.state.imageHash}
                    />
                ) : (
                    <AdministrationDetailsFormGeneralView
                        switchToEdit={this.switchToEdit}
                        administrationLogoDetails={this.props.administrationLogoDetails}
                        imageHash={this.state.imageHash}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        administrationDetails: state.administrationDetails,
        meDetails: state.meDetails,
    };
};

export default connect(mapStateToProps)(AdministrationDetailsFormGeneral);
