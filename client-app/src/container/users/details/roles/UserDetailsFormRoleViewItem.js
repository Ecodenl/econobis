import React, { Component } from 'react';

class UserDetailsFormRoleViewItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { name, hasRole } = this.props.role;

        return (
            <div className="col-sm-6 border-bottom">
                <label className="col-sm-6">{name}</label>
                <span className="col-sm-6">{hasRole || this.props.alwaysTrue ? 'Ja' : 'Nee'}</span>
            </div>
        );
    }
}

export default UserDetailsFormRoleViewItem;
