import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../../components/button/ButtonIcon';
import InvoiceDetailsFormSetPaid from './general/InvoiceDetailsFormSetPaid';
import InvoiceDetailsFormSendNotification from './general/InvoiceDetailsFormSendNotification';
import InvoiceDetailsFormSetIrrecoverable from './general/InvoiceDetailsFormSetIrrecoverable';
import fileDownload from 'js-file-download';
import InvoiceDetailsAPI from '../../../../api/invoice/InvoiceDetailsAPI';
import { previewSend } from '../../../../actions/invoice/InvoicesActions';
import InvoiceDetailsFormDelete from './general/InvoiceDetailsFormDelete';
import { setError } from '../../../../actions/general/ErrorActions';

// Functionele wrapper voor de class component
const InvoiceToolbarWrapper = props => {
    const navigate = useNavigate();
    return <InvoiceToolbar {...props} navigate={navigate} />;
};

class InvoiceToolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showSetChecked: false,
            showSetPaid: false,
            showSendNotification: false,
            reminderText: '',
            showSetIrrecoverable: false,
            showDelete: false,
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            if (nextProps.invoiceDetails.dateReminder3) {
                this.setState({
                    reminderText: 'Wilt u de aanmaning sturen?',
                });
            } else if (nextProps.invoiceDetails.dateReminder2) {
                this.setState({
                    reminderText:
                        nextProps.invoiceDetails.numberOfInvoiceReminders > 2
                            ? 'Wilt u de derde herinnering sturen?'
                            : 'Wilt u de aanmaning sturen?',
                });
            } else if (nextProps.invoiceDetails.dateReminder1) {
                this.setState({
                    reminderText:
                        nextProps.invoiceDetails.numberOfInvoiceReminders > 1
                            ? 'Wilt u de tweede herinnering sturen?'
                            : 'Wilt u de aanmaning sturen?',
                });
            } else {
                this.setState({
                    reminderText: 'Wilt u de eerste herinnering sturen?',
                });
            }
        }
    }

    download = () => {
        InvoiceDetailsAPI.download(this.props.invoiceDetails.id).then(payload => {
            fileDownload(payload.data, payload.headers['x-filename']);
        });
    };

    showSend = () => {
        let paymentType = this.props.invoiceDetails.paymentTypeId === 'collection' ? 'incasso' : 'overboeken';
        if (paymentType == 'incasso' && this.props.invoiceDetails.totalInclVatInclReduction < 0) {
            this.props.setError(
                405,
                'Een nota met een negatief bedrag kan geen incasso zijn. Wil je a.u.b. de betaalwijze van de order aanpassen in "Overboeken".'
            );
        } else {
            this.props.previewSend([this.props.invoiceDetails.id]);
            this.props.navigate(
                `/financieel/${this.props.invoiceDetails.order.administrationId}/notas/te-verzenden/verzenden/email/${paymentType}`
            );
        }
    };

    showSendPost = () => {
        let paymentType = this.props.invoiceDetails.paymentTypeId === 'collection' ? 'incasso' : 'overboeken';
        this.props.previewSend([this.props.invoiceDetails.id]);
        this.props.navigate(
            `/financieel/${this.props.invoiceDetails.order.administrationId}/notas/te-verzenden/verzenden/post/${paymentType}`
        );
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

    showDelete = () => {
        this.setState({ showDelete: !this.state.showDelete });
    };

    view = () => {
        this.props.navigate(`/nota/inzien/${this.props.invoiceDetails.id}`);
    };

    render() {
        const compatibleStatus =
            (this.props.invoiceDetails.statusId === 'to-send' || this.props.invoiceDetails.statusId === 'sent') &&
            this.props.invoiceDetails.usesTwinfield &&
            !this.props.invoiceDetails.compatibleWithTwinfield;

        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group btn-group-flex margin-small" role="group">
                        <ButtonIcon iconName={'arrowLeft'} onClickAction={navigate(-1)} />
                        <ButtonIcon iconName={'eye'} onClickAction={this.view} />
                        {(this.props.invoiceDetails.statusId === 'to-send' ||
                            this.props.invoiceDetails.statusId === 'error-sending') &&
                            this.props.invoiceDetails.emailToAddress !== 'Geen e-mail bekend' &&
                            !compatibleStatus && <ButtonIcon iconName={'envelopeO'} onClickAction={this.showSend} />}
                        {(this.props.invoiceDetails.statusId === 'to-send' ||
                            this.props.invoiceDetails.statusId === 'error-sending') &&
                            this.props.invoiceDetails.emailToAddress === 'Geen e-mail bekend' &&
                            !compatibleStatus && (
                                <ButtonIcon iconName={'envelopeO'} onClickAction={this.showSendPost} />
                            )}
                        {!this.props.invoiceDetails.invoiceInTwinfield &&
                            !this.props.invoiceDetails.invoicePaidInTwinfield &&
                            (this.props.invoiceDetails.statusId === 'sent' ||
                                this.props.invoiceDetails.statusId === 'exported') && (
                                <ButtonIcon iconName={'euro'} onClickAction={this.showSetPaid} />
                            )}
                        {(this.props.invoiceDetails.statusId === 'sent' ||
                            this.props.invoiceDetails.statusId === 'exported') &&
                            !this.props.invoiceDetails.dateExhortation &&
                            !this.props.invoiceDetails.isPaidByMollie && (
                                <ButtonIcon iconName={'bullhorn'} onClickAction={this.showSendNotification} />
                            )}
                        {this.props.invoiceDetails.statusId !== 'to-send' &&
                            this.props.invoiceDetails.statusId !== 'in-progress' &&
                            this.props.invoiceDetails.statusId !== 'is-sending' &&
                            this.props.invoiceDetails.statusId !== 'error-making' &&
                            this.props.invoiceDetails.statusId !== 'error-sending' &&
                            this.props.invoiceDetails.statusId !== 'is-resending' &&
                            this.props.invoiceDetails.statusId !== 'paid' &&
                            this.props.invoiceDetails.statusId !== 'irrecoverable' && (
                                <ButtonIcon iconName={'remove'} onClickAction={this.showSetIrrecoverable} />
                            )}
                        <ButtonIcon iconName={'download'} onClickAction={this.download} />
                        {this.props.invoiceDetails.statusId === 'to-send' && (
                            <ButtonIcon iconName={'trash'} onClickAction={this.showDelete} />
                        )}
                    </div>
                </div>
                {!this.props.isLoading && (
                    <div className="col-md-4">
                        <h4 className="text-center">
                            Nota:{' '}
                            {this.props.invoiceDetails.order ? this.props.invoiceDetails.order.contact.fullName : ''} /{' '}
                            {this.props.invoiceDetails.number}
                        </h4>
                    </div>
                )}
                <div className="col-md-4" />

                {this.state.showSetPaid && (
                    <InvoiceDetailsFormSetPaid
                        closeModal={this.showSetPaid}
                        invoiceId={this.props.invoiceDetails.id}
                        amountOpen={this.props.invoiceDetails.amountOpen}
                    />
                )}
                {this.state.showSendNotification && (
                    <InvoiceDetailsFormSendNotification
                        reminderText={this.state.reminderText}
                        closeModal={this.showSendNotification}
                        invoiceId={this.props.invoiceDetails.id}
                    />
                )}

                {this.state.showSetIrrecoverable && (
                    <InvoiceDetailsFormSetIrrecoverable
                        closeModal={this.showSetIrrecoverable}
                        invoiceId={this.props.invoiceDetails.id}
                    />
                )}
                {this.state.showDelete && (
                    <InvoiceDetailsFormDelete
                        number={this.props.invoiceDetails.number}
                        id={this.props.invoiceDetails.id}
                        closeDeleteItemModal={this.showDelete}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        invoiceDetails: state.invoiceDetails,
        isLoading: state.loadingData.isLoading,
    };
};

const mapDispatchToProps = dispatch => ({
    previewSend: ids => {
        dispatch(previewSend(ids));
    },
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceToolbarWrapper);
