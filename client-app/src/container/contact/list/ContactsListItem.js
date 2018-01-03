import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hashHistory } from 'react-router';
import moment from 'moment';

import { setCheckedContact } from '../../../actions/contact/ContactsActions';

class ContactsListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightRow: '',
        };
    }

    onRowEnter() {
        this.setState({
            showActionButtons: true,
            highlightRow: 'highlight-row',
        });
    };

    onRowLeave() {
        this.setState({
            showActionButtons: false,
            highlightRow: '',
        });
    };

    setCheckedContact(id) {
        this.props.setCheckedContact(id);
    }

    openItem(id) {
        hashHistory.push(`/contact/${id}`);
    };

    render() {
        const { checked, id, number, typeName, fullName, streetAndNumber, postalCode, city, emailAddress, phoneNumber, statusName, createdAt } = this.props;

        return (
            <tr className={this.state.highlightRow} onDoubleClick={() => this.openItem(id)} onMouseEnter={() => this.onRowEnter()} onMouseLeave={() => this.onRowLeave()}>
                {this.props.showCheckbox && <td><input type="checkbox" checked={checked} onChange={() => this.setCheckedContact(id)} /></td>}
                <td className="hidden-xs">{number}</td>
                <td className="hidden-xs hidden-sm">{typeName} </td>
                <td>{ fullName }</td>
                <td className="hidden-xs">{streetAndNumber}</td>
                <td className="hidden-xs">{postalCode}</td>
                <td className="hidden-xs">{city}</td>
                <td className="hidden-xs">{emailAddress}</td>
                <td>{phoneNumber}</td>
                <td className="hidden-xs hidden-sm">{statusName}</td>
                <td className="hidden-xs hidden-sm">{ moment(createdAt.date).format('DD-MM-Y') }</td>
                <td>
                    {(this.state.showActionButtons ? <a role="button" onClick={() => this.openItem(id)}><span className="glyphicon glyphicon-pencil mybtn-success" /> </a> : '')}
                    {(this.state.showActionButtons ? <a role="button" onClick={this.props.showDeleteItemModal.bind(this, id, fullName)}><span className="glyphicon glyphicon-trash mybtn-danger"  /> </a> : '')}
                </td>
            </tr>
        );
    }
}

function mapStateToProps(state) {
    return {
        statuses: state.statuses,
        types: state.types
    };
}

const mapDispatchToProps = dispatch => ({
    setCheckedContact: (id) => {
        dispatch(setCheckedContact(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsListItem);