import React, {Component} from 'react';

import AdministrationDetailsUsersView from './AdministrationDetailsUsersView';
import AdministrationDetailsUsersDelete from "./AdministrationDetailsUsersDelete";
import {connect} from "react-redux";

class AdministrationDetailsUsersItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showDelete: false,

            user: props.user,
        };
    };

    onLineEnter = () => {
        this.setState({
            showActionButtons: true,
            highlightLine: 'highlight-line',
        });
    };

    onLineLeave = () => {
        this.setState({
            showActionButtons: false,
            highlightLine: '',
        });
    };

    toggleDelete = () => {
        this.setState({showDelete: !this.state.showDelete});
    };

    render() {
        return (
            <div>
                <AdministrationDetailsUsersView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    toggleDelete={this.toggleDelete}
                    user={this.state.user}
                />
                {
                    this.state.showDelete && this.props.permissions.manageFinancial &&
                    <AdministrationDetailsUsersDelete
                        toggleDelete={this.toggleDelete}
                        userId={this.state.user.id}
                    />
                }
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions
    }
};

export default connect(mapStateToProps)(AdministrationDetailsUsersItem);