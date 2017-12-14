import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserAPI from "../../../../api/UserAPI";

import { updateRole } from '../../../../actions/UserDetailsActions';

class UserDetailsFormRoleListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.role,
        }
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
            <div className="col-sm-6 border-bottom">
                <label className="col-sm-6">{name}</label>
                <div className="col-sm-6">
                        <input
                            name={name}
                            type="checkbox"
                            id={id}
                            onChange={this.handleInputChange}
                            checked={hasRole}
                        />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateRole: (id, value) => {
        dispatch(updateRole(id, value));
    },
});

export default connect(null, mapDispatchToProps)(UserDetailsFormRoleListItem);