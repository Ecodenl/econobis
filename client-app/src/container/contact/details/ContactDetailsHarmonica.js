import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import AddContactToGroup from './harmonica/AddContactToGroup';
import ErrorModal from '../../../components/modal/ErrorModal';
import IntakeHarmonica from './harmonica/IntakeHarmonica';
import HousingFileHarmonica from './harmonica/HousingFileHarmonica';
import OpportunityHarmonica from './harmonica/OpportunityHarmonica';
import TaskHarmonica from './harmonica/TaskHarmonica';
import NoteHarmonica from './harmonica/NoteHarmonica';
import ContactGroupHarmonica from './harmonica/ContactGroupHarmonica';
import EmailInboxHarmonica from './harmonica/EmailInboxHarmonica';
import EmailSentHarmonica from './harmonica/EmailSentHarmonica';
import DocumentHarmonica from './harmonica/DocumentHarmonica';
import ParticipationHarmonica from './harmonica/ParticipationHarmonica';
import OrderHarmonica from './harmonica/OrderHarmonica';
import InvoiceHarmonica from './harmonica/InvoiceHarmonica';
import FinancialOverviewContactHarmonica from './harmonica/FinancialOverviewContactHarmonica';

class ContactDetailsHarmonica extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleShowList: {
                invoices: false,
                orders: false,
                intakes: false,
                housingFiles: false,
                opportunities: false,
                tasks: false,
                notes: false,
                contactGroups: false,
                emailsInbox: false,
                emailsSent: false,
                documents: false,
                participations: false,
            },
            showModalAddGroup: false,
        };

        this.toggleShowList = this.toggleShowList.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.id !== nextProps.id) {
            this.setState({
                toggleShowList: {
                    invoices: false,
                    orders: false,
                    intakes: false,
                    housingFiles: false,
                    opportunities: false,
                    tasks: false,
                    notes: false,
                    contactGroups: false,
                    emailsInbox: false,
                    emailsSent: false,
                    documents: false,
                    participations: false,
                },
            });
        }
    }

    newIntake = () => {
        let address = this.props.contactDetails.addresses.find(address => {
            return address.primary;
        });
        if (typeof address === 'undefined') {
            address = this.props.contactDetails.addresses[0];
            if (typeof address === 'undefined') {
                this.setState({
                    showModalError: !this.state.showModalError,
                    modalErrorTitle: 'Waarschuwing',
                    modalErrorMessage: 'Dit contact heeft nog geen adres.',
                });
            } else {
                hashHistory.push(`/intake/nieuw/contact/${this.props.contactDetails.id}/adres/${address.id}`);
            }
        } else {
            hashHistory.push(`/intake/nieuw/contact/${this.props.contactDetails.id}/adres/${address.id}`);
        }
    };

    newHousingFile = () => {
        let address = this.props.contactDetails.addresses.find(address => {
            return address.primary;
        });
        if (typeof address === 'undefined') {
            address = this.props.contactDetails.addresses[0];
            if (typeof address === 'undefined') {
                this.setState({
                    showModalError: !this.state.showModalError,
                    modalErrorTitle: 'Waarschuwing',
                    modalErrorMessage: 'Dit contact heeft nog geen adres.',
                });
            } else {
                hashHistory.push(`/woningdossier/nieuw/contact/${this.props.contactDetails.id}/adres/${address.id}`);
            }
        } else {
            hashHistory.push(`/woningdossier/nieuw/contact/${this.props.contactDetails.id}/adres/${address.id}`);
        }
    };

    toggleErrorModal = () => {
        this.setState({
            showModalError: !this.state.showModalError,
        });
    };

    toggleShowList(name) {
        this.setState({
            ...this.state,
            toggleShowList: {
                ...this.state.toggleShowList,
                [name]: !this.state.toggleShowList[name],
            },
        });
    }

    newTask = () => {
        if (this.props.contactDetails) {
            hashHistory.push(`/taak/nieuw/contact/${this.props.contactDetails.id}`);
        }
    };

    newNote = () => {
        if (this.props.contactDetails) {
            hashHistory.push(`/taak/nieuw/afgehandeld/contact/${this.props.contactDetails.id}`);
        }
    };

    newParticipation = () => {
        if (this.props.contactDetails) {
            hashHistory.push(`/project/deelnemer/nieuw/contact/${this.props.contactDetails.id}`);
        }
    };

    newEmail = () => {
        if (this.props.contactDetails) {
            let primaryEmail = this.props.contactDetails.emailAddresses.find(emailAddress => {
                return emailAddress.primary;
            });
            if (typeof primaryEmail === 'undefined') {
                this.setState({
                    showModalError: !this.state.showModalError,
                    modalErrorTitle: 'Waarschuwing',
                    modalErrorMessage: 'Dit contact heeft nog geen primair e-mail adres.',
                });
            } else {
                hashHistory.push(`/email/nieuw/contact/${this.props.contactDetails.id}`);
            }
        }
    };

    newDocument = type => {
        if (this.props.contactDetails) {
            hashHistory.push(`/document/nieuw/${type}/contact/${this.props.contactDetails.id}`);
        }
    };

    newOrder = () => {
        if (this.props.contactDetails) {
            hashHistory.push(`/order/nieuw/contact/${this.props.contactDetails.id}`);
        }
    };

    toggleAddGroup = () => {
        this.setState({
            showModalAddGroup: !this.state.showModalAddGroup,
        });
    };

    render() {
        return (
            <div className="margin-10-top">
                {this.props.permissions.viewEmail ? (
                    <>
                        <EmailInboxHarmonica
                            toggleShowList={() => this.toggleShowList('emailsInbox')}
                            showEmailsInboxList={this.state.toggleShowList.emailsInbox}
                            newEmail={this.newEmail}
                            emailInboxCount={this.props.contactDetails.emailInboxCount}
                            contactId={this.props.contactDetails.id}
                        />

                        <EmailSentHarmonica
                            toggleShowList={() => this.toggleShowList('emailsSent')}
                            showEmailsSentList={this.state.toggleShowList.emailsSent}
                            newEmail={this.newEmail}
                            emailSentCount={this.props.contactDetails.emailSentCount}
                            contactId={this.props.contactDetails.id}
                        />
                    </>
                ) : null}

                {this.props.permissions.viewTask ? (
                    <TaskHarmonica
                        toggleShowList={() => this.toggleShowList('tasks')}
                        showTasksList={this.state.toggleShowList.tasks}
                        taskCount={this.props.contactDetails.taskCount}
                        newTask={this.newTask}
                    />
                ) : null}

                {this.props.permissions.viewNote ? (
                    <NoteHarmonica
                        toggleShowList={() => this.toggleShowList('notes')}
                        showNotesList={this.state.toggleShowList.notes}
                        noteCount={this.props.contactDetails.noteCount}
                        newNote={this.newNote}
                    />
                ) : null}

                {this.props.permissions.viewParticipation ? (
                    <ParticipationHarmonica
                        toggleShowList={() => this.toggleShowList('participations')}
                        showParticipationsList={this.state.toggleShowList.participations}
                        participationCount={this.props.contactDetails.participationCount}
                        newParticipation={this.newParticipation}
                    />
                ) : null}

                {this.props.permissions.viewIntake ? (
                    <IntakeHarmonica
                        toggleShowList={() => this.toggleShowList('intakes')}
                        showIntakesList={this.state.toggleShowList.intakes}
                        intakeCount={this.props.contactDetails.intakeCount}
                        newIntake={this.newIntake}
                    />
                ) : null}

                {this.props.permissions.viewOpportunity ? (
                    <OpportunityHarmonica
                        toggleShowList={() => this.toggleShowList('opportunities')}
                        showOpportunitiesList={this.state.toggleShowList.opportunities}
                        opportunityCount={this.props.contactDetails.opportunityCount}
                    />
                ) : null}

                {this.props.permissions.viewHousingFile ? (
                    <HousingFileHarmonica
                        toggleShowList={() => this.toggleShowList('housingFiles')}
                        showHousingFilesList={this.state.toggleShowList.housingFiles}
                        housingFileCount={this.props.contactDetails.housingFileCount}
                        newHousingFile={this.newHousingFile}
                    />
                ) : null}

                {this.props.permissions.viewContactGroup ? (
                    <ContactGroupHarmonica
                        toggleShowList={() => this.toggleShowList('contactGroups')}
                        showContactGroupsList={this.state.toggleShowList.contactGroups}
                        toggleAddGroup={this.toggleAddGroup}
                        groupCount={this.props.contactDetails.groupCount}
                    />
                ) : null}

                {this.props.permissions.viewOrder ? (
                    <OrderHarmonica
                        toggleShowList={() => this.toggleShowList('orders')}
                        showOrdersList={this.state.toggleShowList.orders}
                        orderCount={this.props.contactDetails.orderCount}
                        newOrder={this.newOrder}
                    />
                ) : null}

                {this.props.permissions.viewInvoice ? (
                    <InvoiceHarmonica
                        toggleShowList={() => this.toggleShowList('invoices')}
                        showInvoicesList={this.state.toggleShowList.invoices}
                        invoiceCount={this.props.contactDetails.invoiceCount}
                    />
                ) : null}

                {this.props.permissions.viewFinancialOverview ? (
                    <FinancialOverviewContactHarmonica
                        toggleShowList={() => this.toggleShowList('financialOverviewContacts')}
                        showFinancialOverviewContactList={this.state.toggleShowList.financialOverviewContacts}
                        financialOverviewContactCount={this.props.contactDetails.financialOverviewContactCount}
                    />
                ) : null}

                {this.props.permissions.viewDocument ? (
                    <DocumentHarmonica
                        toggleShowList={() => this.toggleShowList('documents')}
                        showDocumentsList={this.state.toggleShowList.documents}
                        newDocument={this.newDocument}
                        documentCount={this.props.contactDetails.documentCount}
                    />
                ) : null}

                {this.state.showModalError && (
                    <ErrorModal
                        closeModal={this.toggleErrorModal}
                        title={this.state.modalErrorTitle}
                        errorMessage={this.state.modalErrorMessage}
                    />
                )}
                {this.state.showModalAddGroup && (
                    <AddContactToGroup
                        toggleAddGroup={this.toggleAddGroup}
                        toggleGroup={() => this.toggleShowList('contactGroups')}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        contactDetails: state.contactDetails,
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(ContactDetailsHarmonica);
