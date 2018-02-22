import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserAPI from "../../../../api/user/UserAPI";

import { updateRole } from '../../../../actions/user/UserDetailsActions';
import InputToggle from "../../../../components/form/InputToggle";

class UserDetailsFormRoleListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.role,
        };
    }

    handleInputChange = event => {
        const target = event.target;
        if(!target.checked) {
            UserAPI.removeRole(this.props.id, this.state.id).then(() => {
                this.setState({
                    ...this.state,
                    hasRole: !this.state.hasRole
                });
                this.props.updateRole(target.id, false);
            }).catch(function () {
                alert('Je hebt niet de rechten om deze rol toe te kennen');
            });
        }
        else{
            UserAPI.addRole(this.props.id, this.state.id).then(() => {
                this.setState({
                    ...this.state,
                    hasRole: !this.state.hasRole
                });
                this.props.updateRole(target.id, true);
            }).catch(function () {
                alert('Je hebt niet de rechten om deze rol toe te kennen');
            });
        }
    };

    render() {
        const { id, name, hasRole } = this.state;

        return (
                <InputToggle
                    label={name}
                    id={id}
                    name={"name"}
                    value={hasRole}
                    onChangeAction={this.handleInputChange}
                />
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateRole: (id, value) => {
        dispatch(updateRole(id, value));
    },
});

export default connect(null, mapDispatchToProps)(UserDetailsFormRoleListItem);