import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory, hashHistory} from 'react-router';

import ButtonIcon from '../../../../components/button/ButtonIcon';
import InvoiceDetailsFormSetChecked from "./general/InvoiceDetailsFormSetChecked";
import InvoiceDetailsFormSetPaid from "./general/InvoiceDetailsFormSetPaid";
import InvoiceDetailsFormSendNotification from "./general/InvoiceDetailsFormSendNotification";
import InvoiceDetailsFormSetIrrecoverable from "./general/InvoiceDetailsFormSetIrrecoverable";
import InvoiceDetailsFormSend from "./general/InvoiceDetailsFormSend";
import InvoiceDetailsFormSendPost from "./general/InvoiceDetailsFormSendPost";
import fileDownload from "js-file-download";
import InvoiceDetailsAPI from "../../../../api/invoice/InvoiceDetailsAPI";

class InvoiceToolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showSetChecked: false,
            showSend: false,
            showSendPost: false,
            showSetPaid: false,
            showSendNotification: false,
            reminderText: '',
            showSetIrrecoverable: false,
        };
    };

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            if (nextProps.invoiceDetails.dateReminder3) {
                this.setState({
                    reminderText: 'Wilt u de aanmaning sturen?',
                });
            }
            else if (nextProps.invoiceDetails.dateReminder2) {
                this.setState({
                    reminderText: 'Wilt u de derde herinnering sturen?',
                });
            }
            else if (nextProps.invoiceDetails.dateReminder1) {
                this.setState({
                    reminderText: 'Wilt u de tweede herinnering sturen?',
                });
            }
            else {
                this.setState({
                    reminderText: 'Wilt u de eerste herinnering sturen?',
                });
            }
        }
    };

    download = () => {
        InvoiceDetailsAPI.download(this.props.invoiceDetails.id).then((payload) => {
            fileDownload(payload.data, payload.headers['x-filename']);
        });
    };

    showSetChecked = () => {
        this.setState({showSetChecked: !this.state.showSetChecked});
    };

    showSend = () => {
        this.setState({showSend: !this.state.showSend});
    };

    showSendPost = () => {
        this.setState({showSendPost: !this.state.showSendPost});
    };

    showSetPaid = () => {
        this.setState({showSetPaid: !this.state.showSetPaid});
    };

    showSendNotification = () => {
        this.setState({showSendNotification: !this.state.showSendNotification});
    };

    showSetIrrecoverable = () => {
        this.setState({showSetIrrecoverable: !this.state.showSetIrrecoverable});
    };

    view = () => {
        hashHistory.push(`/factuur/inzien/${this.props.invoiceDetails.id}`);
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group btn-group-flex margin-small" role="group">
                        <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack}/>
                        <ButtonIcon iconName={"glyphicon-eye-open"} onClickAction={this.view}/>
                        {this.props.invoiceDetails.statusId === 'concept' &&
                        <ButtonIcon iconName={"glyphicon-ok"} onClickAction={this.showSetChecked}/>
                        }
                        {this.props.invoiceDetails.statusId === 'checked' && (this.props.invoiceDetails.emailToAddress !== 'Geen e-mail bekend') &&
                        <ButtonIcon iconName={"glyphicon-envelope"} onClickAction={this.showSend}/>
                        }
                        {this.props.invoiceDetails.statusId === 'checked' && (this.props.invoiceDetails.emailToAddress === 'Geen e-mail bekend') &&
                        <ButtonIcon iconName={"glyphicon-envelope"} onClickAction={this.showSendPost}/>
                        }
                        {(this.props.invoiceDetails.statusId === 'sent' || this.props.invoiceDetails.statusId === 'exported') &&
                        <ButtonIcon iconName={"glyphicon-euro"} onClickAction={this.showSetPaid}/>
                        }
                        {(this.props.invoiceDetails.statusId === 'sent' || this.props.invoiceDetails.statusId === 'exported') && !this.props.invoiceDetails.dateExhortation &&
                        <ButtonIcon iconName={"glyphicon-bullhorn"} onClickAction={this.showSendNotification}/>
                        }
                        {(this.props.invoiceDetails.statusId !== 'paid' && this.props.invoiceDetails.statusId !== 'irrecoverable') &&
                        <ButtonIcon iconName={"glyphicon-remove"} onClickAction={this.showSetIrrecoverable}/>
                        }
                        <ButtonIcon iconName={"glyphicon-download-alt"} onClickAction={this.download}/>
                    </div>
                </div>
                <div className="col-md-4"><h4
                    className="text-center">Factuur: {this.props.invoiceDetails.order ? this.props.invoiceDetails.order.contact.fullName : ''} / {this.props.invoiceDetails.number}</h4>
                </div>
                <div className="col-md-4"/>
                {
                    this.state.showSetChecked &&
                    <InvoiceDetailsFormSetChecked
                        closeModal={this.showSetChecked}
                        invoiceId={this.props.invoiceDetails.id}
                    />
                }

                {
                    this.state.showSend &&
                    <InvoiceDetailsFormSend
                        closeModal={this.showSend}
                        invoiceId={this.props.invoiceDetails.id}
                    />
                }

                {
                    this.state.showSendPost &&
                    <InvoiceDetailsFormSendPost
                        closeModal={this.showSendPost}
                        invoiceId={this.props.invoiceDetails.id}
                    />
                }

                {
                    this.state.showSetPaid &&
                    <InvoiceDetailsFormSetPaid
                        closeModal={this.showSetPaid}
                        invoiceId={this.props.invoiceDetails.id}
                        amountOpen={this.props.invoiceDetails.amountOpen}
                    />
                }
                {
                    this.state.showSendNotification &&
                    <InvoiceDetailsFormSendNotification
                        reminderText={this.state.reminderText}
                        closeModal={this.showSendNotification}
                        invoiceId={this.props.invoiceDetails.id}
                    />
                }

                {
                    this.state.showSetIrrecoverable &&
                    <InvoiceDetailsFormSetIrrecoverable
                        closeModal={this.showSetIrrecoverable}
                        invoiceId={this.props.invoiceDetails.id}
                    />
                }
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        invoiceDetails: state.invoiceDetails,
    };
};

export default connect(mapStateToProps, null)(InvoiceToolbar);