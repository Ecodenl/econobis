import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import moment from 'moment/moment';
import MoneyPresenter from '../../../../helpers/MoneyPresenter';
import validator from 'validator';
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
    }

    onRowLeave() {
        this.setState({
            showActionButtons: false,
            highlightRow: '',
        });
    }

    openItem(id) {
        hashHistory.push(`/project/deelnemer/${id}`);
    }

    render() {
        const {
            id,
            contact,
            participationsInteressed,
            participationsOptioned,
            participationsGranted,
            participationsDefinitive,
            amountInteressed,
            amountOptioned,
            amountGranted,
            amountDefinitive,
            uniqueMutationStatuses,
            dateRegister,
        } = this.props;
        const participantionsTotal =
            participationsInteressed + participationsOptioned + participationsGranted + participationsDefinitive;
        const amountTotal =
            amountInteressed + amountOptioned + amountGranted + amountDefinitive;
        const primaryAddress = contact.primaryAddress;
        let street = '';
        let number = '';
        let addition = '';

        if (primaryAddress) {
            primaryAddress.street && (street = primaryAddress.street);
            primaryAddress.number && (number = primaryAddress.number);
            primaryAddress.addition && (addition = primaryAddress.addition);
        }

        const missingEmail =
            !contact.primaryEmailAddress ||
            !contact.primaryEmailAddress.email ||
            validator.isEmpty(contact.primaryEmailAddress.email)
                ? true
                : false;
        const missingContactDataMessage = missingEmail ? 'Primair e-mailadres bij contact ontbreekt.' : '';
        const missingDataClass = missingEmail ? this.state.highlightRow + ' missing-data-row' : this.state.highlightRow;

        return (
            <tr
                title={missingContactDataMessage}
                className={missingDataClass}
                onDoubleClick={() => this.openItem(id)}
                onMouseEnter={() => this.onRowEnter()}
                onMouseLeave={() => this.onRowLeave()}
            >
                <td>
                    {this.props.showCheckboxList ? (
                        <input
                            type="checkbox"
                            name={id}
                            onChange={this.props.toggleParticipantCheck}
                            checked={this.props.participantIds ? this.props.participantIds.includes(id) : false}
                        />
                    ) : null}
                </td>

                <td>{contact.type ? contact.type.name : ''}</td>
                <td>{contact.fullName}</td>
                <td>{primaryAddress ? street + ' ' + number + addition : ''}</td>
                <td>{contact.primaryAddress ? contact.primaryAddress.postalCode : ''}</td>
                <td>{contact.primaryAddress ? contact.primaryAddress.city : ''}</td>
                {this.props.projectTypeRef === 'loan' ? (
                    <td>{amountTotal ? MoneyPresenter(amountTotal) : ''}</td>
                ) : (
                    <td>{participantionsTotal ? participantionsTotal : ''}</td>
                )}
                <td>{uniqueMutationStatuses.map(item => item.name).join(', ')}</td>
                <td>{dateRegister ? moment(dateRegister).format('L') : ''}</td>
                {this.props.projectTypeRef === 'postalcode_link_capital' ? (
                    <td>
                        {contact.primaryContactEnergySupplier
                            ? contact.primaryContactEnergySupplier.energySupplier.name
                            : ''}
                    </td>
                ) : null}
                <td>
                    {this.state.showActionButtons ? (
                        <a role="button" onClick={() => this.openItem(id)}>
                            <span className="glyphicon glyphicon-pencil mybtn-success" />{' '}
                        </a>
                    ) : (
                        ''
                    )}
                </td>
            </tr>
        );
    }
}

export default ParticipantsListItem;
