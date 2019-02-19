import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchUsers, clearUsers } from '../../../actions/user/UsersActions';
import UsersList from './UsersList';
import UsersListToolbar from './UsersListToolbar';

class UsersListApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchUsers();
    }

    componentWillUnmount() {
        this.props.clearUsers();
    }

    refreshContactsData = () => {
        this.props.clearUsers();
        this.props.fetchUsers();
    };

    render() {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="col-md-12 margin-10-top">
                            <UsersListToolbar refreshContactsData={() => this.refreshContactsData()} />
                        </div>

                        <div className="col-md-12 margin-10-top">
                            <UsersList users={this.props.users} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.users,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchUsers: () => {
        dispatch(fetchUsers());
    },
    clearUsers: () => {
        dispatch(clearUsers());
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UsersListApp);
