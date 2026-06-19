import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../../components/button/ButtonIcon';
import InvoiceSendConfirm from './InvoiceSendConfirm';
import ButtonText from '../../../../components/button/ButtonText';
import InvoiceSendConfirmPost from './InvoiceSendConfirmPost';

// Functionele wrapper voor de class component
const InvoiceSendToolbarWrapper = props => {
    const navigate = useNavigate();
    return <InvoiceSendToolbar {...props} navigate={navigate} />;
};

class InvoiceSendToolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSend: false,
        };
    }

    showSend = () => {
        this.setState({ showSend: !this.state.showSend });
    };

    render() {
        const { navigate } = this.props;

        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group btn-group-flex margin-small" role="group">
                        <ButtonIcon iconName={'arrowLeft'} onClickAction={() => navigate(-1)} />
                        {this.props.amountOfInvoices > 0 &&
                            this.props.type === 'email' &&
                            this.props.paymentType === 'incasso' && (
                                <ButtonText
                                    buttonText={"Nota's e-mailen en sepa bestand maken"}
                                    onClickAction={this.showSend}
                                />
                            )}
                        {this.props.amountOfInvoices > 0 &&
                            this.props.type === 'email' &&
                            this.props.paymentType === 'overboeken' && (
                                <ButtonText buttonText={"Nota's e-mailen"} onClickAction={this.showSend} />
                            )}
                        {this.props.amountOfInvoices > 0 &&
                            this.props.type === 'post' &&
                            this.props.paymentType === 'incasso' && (
                                <ButtonText
                                    buttonText={"Nota's aanmaken en sepa bestand maken"}
                                    onClickAction={this.showSend}
                                />
                            )}
                        {this.props.amountOfInvoices > 0 &&
                            this.props.type === 'post' &&
                            this.props.paymentType === 'overboeken' && (
                                <ButtonText buttonText={"Nota's aanmaken"} onClickAction={this.showSend} />
                            )}
                    </div>
                </div>
                <div className="col-md-4">
                    <h4 className="text-center">Te verzenden nota's versturen ({this.props.amountOfInvoices})</h4>
                </div>
                <div className="col-md-4" />
                {this.state.showSend && this.props.type === 'email' && (
                    <InvoiceSendConfirm
                        type={this.props.type}
                        paymentType={this.props.paymentType}
                        invoiceIds={this.props.invoiceIds}
                        closeModal={this.showSend}
                        administrationId={this.props.administrationId}
                    />
                )}
                {this.state.showSend && this.props.type === 'post' && (
                    <InvoiceSendConfirmPost
                        type={this.props.type}
                        paymentType={this.props.paymentType}
                        invoiceIds={this.props.invoiceIds}
                        closeModal={this.showSend}
                        administrationId={this.props.administrationId}
                    />
                )}
            </div>
        );
    }
}

export default InvoiceSendToolbarWrapper;
