import React, { Component } from 'react';
import { connect } from 'react-redux';

import AdministrationDetailsFormGeneralEdit from './AdministrationDetailsFormGeneralEdit';
import AdministrationDetailsFormGeneralView from './AdministrationDetailsFormGeneralView';
import AdministrationDetailsAPI from '../../../../api/administration/AdministrationDetailsAPI';

class AdministrationDetailsFormGeneral extends Component {
    constructor(props) {
        super(props);

        this.state = {
            administrationLogoDetails: [],
            showEdit: false,
            activeDiv: '',
            imageHash: Date.now(),
        };
    }

    componentDidMount() {
        this.fetchAdministrationLogoDetails(this.props.administrationDetails.id);
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
        this.fetchAdministrationLogoDetails(this.props.administrationDetails.id);
    };

    fetchAdministrationLogoDetails = administrationId => {
        AdministrationDetailsAPI.fetchAdministrationLogoDetails(administrationId).then(payload => {
            this.setState({ administrationLogoDetails: payload });
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
                        administrationLogoDetails={this.state.administrationLogoDetails}
                        meDetails={this.props.meDetails}
                        imageHash={this.state.imageHash}
                    />
                ) : (
                    <AdministrationDetailsFormGeneralView
                        switchToEdit={this.switchToEdit}
                        administrationLogoDetails={this.state.administrationLogoDetails}
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
