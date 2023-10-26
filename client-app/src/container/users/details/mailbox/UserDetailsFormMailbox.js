import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserDetailsFormMailboxEdit from './UserDetailsFormMailboxEdit';
import UserDetailsFormMailboxView from './UserDetailsFormMailboxView';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

class UserDetailsFormMailbox extends Component {
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
            <Panel
                className={this.state.activeDiv}
                onMouseEnter={() => this.onDivEnter()}
                onMouseLeave={() => this.onDivLeave()}
            >
                <PanelHeader>
                    <span className="h5 text-bold">Mailbox</span>
                </PanelHeader>
                <PanelBody>
                    {this.state.showEdit &&
                    (permissions.manageUser || this.props.meDetails.id === this.props.userDetails.id) ? (
                        <UserDetailsFormMailboxEdit switchToView={this.switchToView} />
                    ) : (
                        <UserDetailsFormMailboxView switchToEdit={this.switchToEdit} />
                    )}
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        meDetails: state.meDetails,
        userDetails: state.userDetails,
    };
};

export default connect(mapStateToProps)(UserDetailsFormMailbox);
