import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsers, clearUsers } from '../../../actions/user/UsersActions';
import UsersList from './UsersList';
import UsersListToolbar from './UsersListToolbar';
import fileDownload from 'js-file-download';
import moment from 'moment';
import UserAPI from '../../../api/user/UserAPI';
import { blockUI, unblockUI } from '../../../actions/general/BlockUIActions';

class UsersListApp extends Component {
    constructor(props) {
        super(props);

        this.getExcel = this.getExcel.bind(this);
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

    getExcel = () => {
        this.props.blockUI();
        setTimeout(() => {
            UserAPI.getExcel()
                .then(payload => {
                    fileDownload(payload.data, 'Permissions-' + moment().format('YYYY-MM-DD HH:mm:ss') + '.xlsx');
                    this.props.unblockUI();
                })
                .catch(error => {
                    this.props.unblockUI();
                });
        }, 100);
    };

    render() {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="col-md-12 margin-10-top">
                            <UsersListToolbar
                                getExcel={this.getExcel}
                                refreshContactsData={() => this.refreshContactsData()}
                            />
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

const mapDispatchToProps = dispatch => {
    // fetchUsers: () => {
    //     dispatch(fetchUsers());
    // },
    // clearUsers: () => {
    //     dispatch(clearUsers());
    // },
    return bindActionCreators(
        {
            fetchUsers,
            clearUsers,
            blockUI,
            unblockUI,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersListApp);
