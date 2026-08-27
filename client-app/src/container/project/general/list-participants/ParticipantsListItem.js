import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment/moment';
import MoneyPresenter from '../../../../helpers/MoneyPresenter';
import validator from 'validator';
moment.locale('nl');

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';

// Functionele wrapper voor de class component
const ParticipantsListItemWrapper = props => {
    const navigate = useNavigate();
    return <ParticipantsListItem {...props} navigate={navigate} />;
};

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
        this.props.navigate(`/project/deelnemer/${id}`);
    }

    render() {
        const {
            id,
            contact,
            address,
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
        const amountTotal = amountInteressed + amountOptioned + amountGranted + amountDefinitive;
        let street = '';
        let number = '';
        let addition = '';

        if (address) {
            address.street && (street = address.street);
            address.number && (number = address.number);
            address.addition && (addition = address.addition);
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
                <td>{street + ' ' + number + (addition ? '-' + addition : '')}</td>
                <td>{address ? address.postalCode : ''}</td>
                <td>{address ? address.city : ''}</td>
                {this.props.projectTypeRef === 'loan' ? (
                    <td>{amountTotal ? MoneyPresenter(amountTotal) : ''}</td>
                ) : (
                    <td>{participantionsTotal ? participantionsTotal : ''}</td>
                )}
                <td>{uniqueMutationStatuses.map(item => item.name).join(', ')}</td>
                <td>{dateRegister ? moment(dateRegister).format('L') : ''}</td>
                {this.props.projectTypeRef === 'postalcode_link_capital' ? (
                    <td>
                        {address && address.currentAddressEnergySupplierElectricity
                            ? address.currentAddressEnergySupplierElectricity.energySupplier.name
                            : ''}
                    </td>
                ) : null}
                <td>
                    {this.state.showActionButtons ? (
                        <a role="button" onClick={() => this.openItem(id)}>
                            <Icon className="mybtn-success" size={14} icon={pencil} />
                        </a>
                    ) : (
                        ''
                    )}
                </td>
            </tr>
        );
    }
}

export default ParticipantsListItemWrapper;
