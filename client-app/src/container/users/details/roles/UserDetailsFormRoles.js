import React, { Component }from 'react';
import { connect } from 'react-redux';

import UserDetailsFormRolesView from './UserDetailsFormRolesView';
import UserDetailsFormRolesEdit from './UserDetailsFormRolesEdit';
import Panel from '../../../../components/panel/Panel';

class UserDetailsFormRoles extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEdit: false,
        };
    }

    switchToEdit = () => {
        this.setState({
            showEdit: true,
        })
    };

    switchToView = () => {
        this.setState({
            showEdit: false,
        })
    };

    onDivEnter() {
        this.setState({
            activeDiv: 'panel-grey',
        });
    };

    onDivLeave() {
        if(!this.state.showEdit) {
            this.setState({
                activeDiv: '',
            });
        }
    };

    render() {
        const { permissions = {} } = this.props.meDetails;
        return (
            <Panel className={this.state.activeDiv} onMouseEnter={() => this.onDivEnter()} onMouseLeave={() => this.onDivLeave()}>
                {
                        this.state.showEdit && permissions.manageUser ?
                            <UserDetailsFormRolesEdit switchToView={this.switchToView} />
                            :
                            <UserDetailsFormRolesView switchToEdit={this.switchToEdit}/>
                    }
            </Panel>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        meDetails: state.meDetails,
    };
};

export default connect(mapStateToProps)(UserDetailsFormRoles);
