import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import moment from 'moment';

class ContactGroupsListItem extends Component {
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
    }

    onRowLeave() {
        this.setState({
            showActionButtons: false,
            highlightRow: '',
        });
    }

    openItem(id) {
        hashHistory.push(`/contact-groep/${id}`);
    }

    openContactsInGroup(id) {
        hashHistory.push(`/contacten-in-groep/${id}`);
    }

    render() {
        const { id, name, numberOfContacts, closedStatus } = this.props;

        return (
          <tr className={this.state.highlightRow} onDoubleClick={() => this.openItem(id)} onMouseEnter={() => this.onRowEnter()} onMouseLeave={() => this.onRowLeave()}>
              <td>{ name }</td>
              <td className="link-underline" onClick={() => this.openContactsInGroup(id)}>{ numberOfContacts }</td>
              <td>{ closedStatus }</td>
              <td>
                  {(this.state.showActionButtons ? <a role="button" onClick={() => this.openItem(id)}><span className="glyphicon glyphicon-pencil mybtn-success" /> </a> : '')}
                  {(this.state.showActionButtons ? <a role="button" onClick={this.props.showDeleteItemModal.bind(this, id, name)}><span className="glyphicon glyphicon-trash mybtn-danger"  /> </a> : '')}
              </td>
            </tr>
        );
    }
}

export default ContactGroupsListItem;
