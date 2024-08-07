import React, { Component } from 'react';
import { connect } from 'react-redux';

import MailgunDomainDetailsFormGeneralEdit from './MailgunDomainDetailsFormGeneralEdit';
import MailgunDomainDetailsFormGeneralView from './MailgunDomainDetailsFormGeneralView';

class MailgunDomainDetailsFormGeneral extends Component {
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
                {this.state.showEdit && permissions.manageMailgunDomain ? (
                    <MailgunDomainDetailsFormGeneralEdit switchToView={this.switchToView} />
                ) : (
                    <MailgunDomainDetailsFormGeneralView switchToEdit={this.switchToEdit} />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        mailgunDomainDetails: state.mailgunDomainDetails,
        meDetails: state.meDetails,
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(MailgunDomainDetailsFormGeneral);
