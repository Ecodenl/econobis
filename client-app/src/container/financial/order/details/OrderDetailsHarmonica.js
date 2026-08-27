import React, { Component } from 'react';
import { connect } from 'react-redux';

import TaskHarmonica from './harmonica/TaskHarmonica';
import EmailHarmonica from './harmonica/EmailHarmonica';
import DocumentHarmonica from './harmonica/DocumentHarmonica';
import { useNavigate } from 'react-router-dom';
import InvoiceHarmonica from './harmonica/InvoiceHarmonica';
import InvoicePaidCollectionHarmonica from './harmonica/InvoicePaidCollectionHarmonica';
import InvoicePaidTransferHarmonica from './harmonica/InvoicePaidTransferHarmonica';

// Functionele wrapper voor de class component
const OrderDetailsHarmonicaWrapper = props => {
    const navigate = useNavigate();
    return <OrderDetailsHarmonica {...props} navigate={navigate} />;
};

class OrderDetailsHarmonica extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleShowList: {
                tasks: false,
                emails: false,
                documents: false,
                invoices: false,
                invoicesPaidCollection: false,
                invoicesPaidTransfer: false,
            },
        };

        this.toggleShowList = this.toggleShowList.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.id !== nextProps.id) {
            this.setState({
                toggleShowList: {
                    tasks: false,
                    emails: false,
                    documents: false,
                    invoices: false,
                    invoicesPaidCollection: false,
                    invoicesPaidTransfer: false,
                },
            });
        }
    }

    toggleShowList(name) {
        this.setState({
            ...this.state,
            toggleShowList: {
                ...this.state.toggleShowList,
                [name]: !this.state.toggleShowList[name],
            },
        });
    }

    newTask = type => {
        if (this.props.orderDetails) {
            this.props.navigate(
                `/taak/nieuw/${type}/order/${this.props.orderDetails.id}/contact/${this.props.orderDetails.contactId}`
            );
        }
    };

    newEmail = () => {
        this.props.navigate(`/email/nieuw`);
    };

    newDocument = type => {
        if (this.props.orderDetails) {
            this.props.navigate(`/document/nieuw/${type}/order/${this.props.orderDetails.id}`);
        }
    };

    render() {
        return (
            <div className="margin-10-top">
                <TaskHarmonica
                    toggleShowList={() => this.toggleShowList('tasks')}
                    showTasksList={this.state.toggleShowList.tasks}
                    taskCount={this.props.orderDetails.taskCount}
                    newTask={this.newTask}
                />
                <EmailHarmonica
                    toggleShowList={() => this.toggleShowList('emails')}
                    showEmailsList={this.state.toggleShowList.emails}
                    newEmail={this.newEmail}
                    emailCount={this.props.orderDetails.emailCount}
                />
                <DocumentHarmonica
                    toggleShowList={() => this.toggleShowList('documents')}
                    showDocumentsList={this.state.toggleShowList.documents}
                    newDocument={this.newDocument}
                    documentCount={this.props.orderDetails.documentCount}
                />
                <InvoiceHarmonica
                    toggleShowList={() => this.toggleShowList('invoices')}
                    showInvoicesList={this.state.toggleShowList.invoices}
                    invoiceCount={this.props.orderDetails.invoiceCount}
                />
                {this.props.orderDetails.paymentTypeId === 'collection' ? (
                    <InvoicePaidCollectionHarmonica
                        toggleShowList={() => this.toggleShowList('invoicesPaidCollection')}
                        showInvoicesPaidCollectionList={this.state.toggleShowList.invoicesPaidCollection}
                        invoicePaidCollectionCount={this.props.orderDetails.invoicePaidCollectionCount}
                    />
                ) : (
                    <InvoicePaidTransferHarmonica
                        toggleShowList={() => this.toggleShowList('invoicesPaidTransfer')}
                        showInvoicesPaidTransferList={this.state.toggleShowList.invoicesPaidTransfer}
                        invoicePaidTransferCount={this.props.orderDetails.invoicePaidTransferCount}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orderDetails: state.orderDetails,
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(OrderDetailsHarmonicaWrapper);
