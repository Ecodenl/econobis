import React, { Component } from 'react';

class UserDetailsFormRoleViewItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {name, hasRole } = this.props.role;

        return (
            <div className="col-sm-6 border-bottom">
                <label className="col-sm-6">{`Heeft rol ${name} : `}</label>
                <span className="col-sm-6">{hasRole ? 'Ja' : 'Nee'}</span>
            </div>
        );
    }
}

export default UserDetailsFormRoleViewItem;