import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import moment from 'moment';
moment.locale('nl');

class ParticipantsListItem extends Component {
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

    openItem(id) {
        hashHistory.push(`/productie-project/participant/${id}`);
    };

    render() {
        const { id, contact, participationsCurrent, status, dateRegister } = this.props;
        const primaryAddress = contact.primaryAddress;
        let street = '';
        let number = '';
        let addition = '';

        if (primaryAddress) {
            primaryAddress.street && (street = primaryAddress.street);
            primaryAddress.number && (number = primaryAddress.number);
            primaryAddress.addition && (addition = primaryAddress.addition);
        }

        return (
            <tr className={this.state.highlightRow} onDoubleClick={() => this.openItem(id)} onMouseEnter={() => this.onRowEnter()} onMouseLeave={() => this.onRowLeave()}>
                <td>
                    { this.props.showCheckboxList && this.props.checkedAll && <input type="checkbox" checked/> }
                    { this.props.showCheckboxList && !this.props.checkedAll && contact.primaryEmailAddress && <input type="checkbox" name={id} onChange={this.props.toggleParticipantCheck}/> }
                    { this.props.showCheckboxList && !this.props.checkedAll && !contact.primaryEmailAddress && <input type="checkbox" name={id} onChange={this.props.toggleParticipantCheckNoEmail}/> }
                    { !this.props.showCheckboxList && <span>{id}</span> }
                </td>
                <td>{ contact.type ? contact.type.name : '' }</td>
                <td>{ contact.fullName }</td>
                <td>{ primaryAddress ? street + ' ' + number + addition : ''}</td>
                <td>{ contact.primaryAddress ? contact.primaryAddress.postalCode : '' }</td>
                <td>{ contact.primaryAddress ? contact.primaryAddress.city : '' }</td>
                <td>{ participationsCurrent ? participationsCurrent : '' }</td>
                <td>{ status ? status.name : '' }</td>
                <td>{ dateRegister ? moment(dateRegister).format('L') : '' }</td>
                <td>{ contact.primaryContactEnergySupplier ? contact.primaryContactEnergySupplier.energySupplier.name : '' }</td>
                <td>
                    {(this.state.showActionButtons ? <a role="button" onClick={() => this.openItem(id)}><span className="glyphicon glyphicon-pencil mybtn-success" /> </a> : '')}
                </td>
            </tr>
        );
    }
}

export default ParticipantsListItem;