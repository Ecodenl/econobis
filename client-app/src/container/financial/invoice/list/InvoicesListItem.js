import React, { Component } from 'react';

import { hashHistory } from 'react-router';
import moment from 'moment';
import InvoiceListSetPaid from './InvoiceListSetPaid';
import InvoiceListSendNotification from './InvoiceListSendNotification';
import InvoiceListSetIrrecoverable from './InvoiceListSetIrrecoverable';
import InvoiceListSend from './InvoiceListSend';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import { eye } from 'react-icons-kit/fa/eye';
import { envelopeO } from 'react-icons-kit/fa/envelopeO';
import { euro } from 'react-icons-kit/fa/euro';
import { bullhorn } from 'react-icons-kit/fa/bullhorn';
import { remove } from 'react-icons-kit/fa/remove';
import { trash } from 'react-icons-kit/fa/trash';

class InvoicesListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightRow: '',
            showSend: false,
            showSetPaid: false,
            showSendNotification: false,
            reminderText: '',
            showSetIrrecoverable: false,
        };
    }

    componentDidMount() {
        if (this.props.dateReminder3) {
            this.setState({
                reminderText: 'Wilt u de aanmaning sturen?',
            });
        } else if (this.props.dateReminder2) {
            this.setState({
                reminderText: 'Wilt u de derde herinnering sturen?',
            });
        } else if (this.props.dateReminder1) {
            this.setState({
                reminderText: 'Wilt u de tweede herinnering sturen?',
            });
        } else {
            this.setState({
                reminderText: 'Wilt u de eerste herinnering sturen?',
            });
        }
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
        hashHistory.push(`/nota/${id}`);
    }

    viewItem(id) {
        hashHistory.push(`/nota/inzien/${id}`);
    }

    showSend = () => {
        this.setState({ showSend: !this.state.showSend });
    };

    showSetPaid = () => {
        this.setState({ showSetPaid: !this.state.showSetPaid });
    };

    showSendNotification = () => {
        this.setState({ showSendNotification: !this.state.showSendNotification });
    };

    showSetIrrecoverable = () => {
        this.setState({ showSetIrrecoverable: !this.state.showSetIrrecoverable });
    };

    render() {
        let hideRowClass = '';

        if (
            this.props.onlyEmailInvoices &&
            (this.props.emailToAddress === 'Geen e-mail bekend' ||
                (!this.props.ibanContactOrInvoice && this.props.paymentTypeId === 'collection'))
        ) {
            hideRowClass = 'hide';
        }

        if (
            this.props.onlyPostInvoices &&
            (this.props.emailToAddress !== 'Geen e-mail bekend' ||
                (!this.props.ibanContactOrInvoice && this.props.paymentTypeId === 'collection'))
        ) {
            hideRowClass = 'hide';
        }

        if (
            (this.props.onlyEmailInvoices || this.props.onlyPostInvoices) &&
            this.props.totalInclVatInclReduction < 0 &&
            this.props.paymentTypeId === 'collection'
        ) {
            hideRowClass = 'hide';
        }

        const {
            id,
            number,
            date,
            subject,
            orderContactFullName,
            paymentType,
            status,
            daysToExpire,
            daysLastReminder,
            totalInclVatInclReduction,
            amountOpen,
            emailToAddress,
            ibanContactOrInvoice,
            subStatus,
            usesTwinfield,
            invoiceInTwinfield,
            invoicePaidInTwinfield,
            compatibleWithTwinfield,
            okForSepa,
        } = this.props;

        const inProgressRowClass =
            this.props.statusId === 'in-progress' ||
            this.props.statusId === 'is-sending' ||
            this.props.statusId === 'error-making' ||
            this.props.statusId === 'error-sending' ||
            this.props.statusId === 'is-resending'
                ? 'in-progress-row'
                : '';
        const errorStatus =
            (this.props.statusId === 'to-send' || this.props.statusId === 'sent') &&
            ((usesTwinfield && !compatibleWithTwinfield) || okForSepa !== true);
        const errorStatusRowClow = errorStatus ? 'missing-data-row' : '';

        let errorStatusTitle = '';
        if (usesTwinfield && !compatibleWithTwinfield)
            errorStatusTitle +=
                'Er ontbreekt een Twinfield Grootboekrekening koppeling bij één of meerdere producten.\n';
        if (okForSepa !== true) errorStatusTitle += okForSepa;

        return (
            <tr
                className={`${this.state.highlightRow} ${hideRowClass} ${inProgressRowClass} ${errorStatusRowClow}`}
                onDoubleClick={() => this.openItem(id)}
                onMouseEnter={() => this.onRowEnter()}
                onMouseLeave={() => this.onRowLeave()}
                title={errorStatus ? errorStatusTitle : ''}
            >
                {this.props.showSelectInvoicesToSend && (
                    <td>
                        <input
                            type="checkbox"
                            name={id}
                            onChange={this.props.toggleInvoiceCheck}
                            checked={this.props.invoiceIds ? this.props.invoiceIds.includes(id) : false}
                        />
                    </td>
                )}
                <td>{number}</td>
                <td>{date ? moment(date).format('DD-MM-Y') : ''}</td>
                <td className={emailToAddress === 'Geen e-mail bekend' ? 'warning-td' : ''}>
                    {orderContactFullName ? orderContactFullName : ''}
                    {emailToAddress === 'Geen e-mail bekend' && ' (Geen e-mail bekend)'}
                </td>
                <td>{subject ? subject : ''}</td>
                <td>{daysToExpire}</td>
                <td>{daysLastReminder}</td>
                <td>
                    {'€ ' +
                        totalInclVatInclReduction.toLocaleString('nl', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    {this.props.statusId === 'sent' || this.props.statusId === 'exported' ? <br /> : ''}
                    {this.props.statusId === 'sent' || this.props.statusId === 'exported' ? (
                        <span className="error-span">
                            {'€ ' +
                                amountOpen.toLocaleString('nl', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                        </span>
                    ) : (
                        ''
                    )}
                </td>
                <td>{paymentType ? paymentType.name : ''}</td>
                <td>{status ? status.name : ''}</td>
                <td>{subStatus}</td>
                <td className={ibanContactOrInvoice || paymentType.id === 'transfer' ? '' : 'warning-td'}>
                    {ibanContactOrInvoice || paymentType.id === 'transfer' ? ibanContactOrInvoice : 'Geen IBAN bekend'}
                </td>
                <td>
                    {this.state.showActionButtons ? (
                        <a role="button" onClick={() => this.openItem(id)} title="Open nota">
                            <Icon className="mybtn-success" size={14} icon={pencil} />
                            &nbsp;
                        </a>
                    ) : (
                        ''
                    )}
                    {this.state.showActionButtons ? (
                        <a role="button" onClick={() => this.viewItem(id)} title="Preview nota">
                            <Icon className="mybtn-success" size={14} icon={eye} />
                            &nbsp;
                        </a>
                    ) : (
                        ''
                    )}
                    {this.state.showActionButtons && this.props.statusId === 'to-send' && !errorStatus ? (
                        <a role="button" onClick={() => this.showSend()} title="Verstuur nota">
                            <Icon className="mybtn-success" size={14} icon={envelopeO} />
                            &nbsp;
                        </a>
                    ) : (
                        ''
                    )}
                    {this.state.showActionButtons && this.props.statusId === 'error-sending' && !errorStatus ? (
                        <a role="button" onClick={() => this.showSend()} title="Verstuur nota opnieuw">
                            <Icon className="mybtn-success" size={14} icon={envelopeO} />
                            &nbsp;
                        </a>
                    ) : (
                        ''
                    )}
                    {!invoiceInTwinfield &&
                    !invoicePaidInTwinfield &&
                    this.state.showActionButtons &&
                    (this.props.statusId === 'sent' || this.props.statusId === 'exported') ? (
                        <a role="button" onClick={() => this.showSetPaid()} title="Zet op betaald">
                            <Icon className="mybtn-success" size={14} icon={euro} />
                            &nbsp;
                        </a>
                    ) : (
                        ''
                    )}
                    {this.state.showActionButtons &&
                    (this.props.statusId === 'sent' || this.props.statusId === 'exported') &&
                    !this.props.dateExhortation &&
                    !this.props.isPaidByMollie ? (
                        <a role="button" onClick={() => this.showSendNotification()} title="Verstuur herinnering">
                            <Icon className="mybtn-success" size={14} icon={bullhorn} />
                            &nbsp;
                        </a>
                    ) : (
                        ''
                    )}
                    {this.state.showActionButtons &&
                    this.props.statusId !== 'to-send' &&
                    this.props.statusId !== 'in-progress' &&
                    this.props.statusId !== 'is-sending' &&
                    this.props.statusId !== 'error-making' &&
                    this.props.statusId !== 'error-sending' &&
                    this.props.statusId !== 'is-resending' &&
                    this.props.statusId !== 'paid' &&
                    this.props.statusId !== 'irrecoverable' ? (
                        <a role="button" onClick={() => this.showSetIrrecoverable()} title="Zet op oninbaar">
                            <Icon className="mybtn-success" size={14} icon={remove} />
                        </a>
                    ) : (
                        ''
                    )}
                    {this.state.showActionButtons && this.props.statusId === 'to-send' ? (
                        <a
                            role="button"
                            onClick={this.props.showDeleteItemModal.bind(this, id, number)}
                            title="Verwijder nota"
                        >
                            <Icon className="mybtn-danger" size={14} icon={trash} />
                        </a>
                    ) : (
                        ''
                    )}

                    {this.state.showSend && (
                        <InvoiceListSend
                            paymentType={this.props.paymentTypeId}
                            closeModal={this.showSend}
                            invoiceId={id}
                            administrationId={this.props.administrationId}
                        />
                    )}

                    {this.state.showSetPaid && (
                        <InvoiceListSetPaid
                            closeModal={this.showSetPaid}
                            invoiceId={id}
                            amountOpen={amountOpen}
                            administrationId={this.props.administrationId}
                        />
                    )}

                    {this.state.showSendNotification && (
                        <InvoiceListSendNotification
                            reminderText={this.state.reminderText}
                            closeModal={this.showSendNotification}
                            invoiceId={id}
                            fetchInvoicesData={this.props.fetchInvoicesData}
                            administrationId={this.props.administrationId}
                            type={emailToAddress === 'Geen e-mail bekend' ? 'post' : 'email'}
                        />
                    )}

                    {this.state.showSetIrrecoverable && (
                        <InvoiceListSetIrrecoverable
                            closeModal={this.showSetIrrecoverable}
                            invoiceId={id}
                            administrationId={this.props.administrationId}
                        />
                    )}
                </td>
            </tr>
        );
    }
}

export default InvoicesListItem;
