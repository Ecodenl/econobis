import React, { Component } from 'react';
import { connect } from 'react-redux';
import { trash } from 'react-icons-kit/fa/trash';
import Icon from 'react-icons-kit';
import DataCleanupAPI from '../../../api/data-cleanup/DataCleanupAPI';
import Modal from '../../../components/modal/Modal';

class DataCleanupListItems extends Component {
    constructor(props) {
        super(props);

        this.state = {
            amountOfOutgoingEmailsToCleanup: '-',
            amountOfIncomingEmailsToCleanup: '-',

            incomingEmailsLastCleanupDate: '-',
            outgoingEmailsLastCleanupDate: '-',

            incomingEmailsCleanupYears: '-',
            outgoingEmailsCleanupYears: '-',

            showModal: false,
            modalCleanupType: null,
            modalErrorMessage: '',
        };
    }

    // New method to fetch all cleanup data
    fetchCleanupData = () => {
        DataCleanupAPI.getAmountsToCleanup('emails').then(payload => {
            this.setState({
                amountOfOutgoingEmailsToCleanup: payload['outgoingMails'],
                amountOfIncomingEmailsToCleanup: payload['incomingMails'],
            });
        });

        DataCleanupAPI.getLastCleanupDates().then(payload => {
            this.setState({
                outgoingEmailsLastCleanupDate: payload['outgoingMails'],
                incomingEmailsLastCleanupDate: payload['incomingMails'],
            });
        });

        DataCleanupAPI.getCleanupYears().then(payload => {
            this.setState({
                outgoingEmailsCleanupYears: payload['outgoingMails'],
                incomingEmailsCleanupYears: payload['incomingMails'],
            });
        });
    };

    componentDidMount() {
        this.fetchCleanupData();
    }

    // Open modal and set which cleanup type
    openModal = (cleanupType) => {
        this.setState({
            showModal: true,
            modalCleanupType: cleanupType,
        });
    };

    // Close modal
    closeModal = () => {
        this.setState({
            showModal: false,
            modalCleanupType: null,
            modalErrorMessage: '',
        });
    };

    // Confirm action based on type
    confirmCleanup = () => {
        DataCleanupAPI.cleanupItems(this.state.modalCleanupType)
            .then(payload => {
                if (payload.length === 0) {
                    this.closeModal();
                    this.fetchCleanupData(); // Refresh the data after cleanup
                } else {
                    this.setState({
                        modalErrorMessage: payload
                    });
                }
            })
            .catch(error => {
                // this.props.setError(error.response.status, error.response.data.message);
            });
    };

    render() {
        const { showModal, modalCleanupType } = this.state;

        // Map cleanupType to readable label for modal
        const cleanupLabels = {
            incomingEmails: "Binnengekomen e-mailcorrespondentie",
            outgoingEmails: "Uitgaande e-mailcorrespondentie",
        };

        const cleanupYears = {
            incomingEmails: this.state.incomingEmailsCleanupYears,
            outgoingEmails: this.state.outgoingEmailsCleanupYears,
        };

        return (
            <div>
                {showModal && (
                    <Modal
                        show={showModal}
                        closeModal={this.closeModal}
                        confirmAction={this.confirmCleanup}
                        buttonConfirmText="Opschonen"
                        buttonClassName={'btn-danger'}
                        title={"Bevestig opschonen " + cleanupLabels[modalCleanupType].toLowerCase()}
                    >
                        {modalCleanupType ? (
                            <div>
                                Weet u zeker dat
                                u <strong>{cleanupLabels[modalCleanupType].toLowerCase()}</strong>, <strong>ouder
                                dan {cleanupYears[modalCleanupType]} jaar</strong> wilt opschonen?<br />
                                <br />
                                Deze verwijderactie is niet terug te draaien.
                                <br /><br />
                                <div id='cleanupModalWarning' style={{ color: '#e64a4a' }}>
                                    {this.state.modalErrorMessage != '' && (
                                        <ul>
                                            {this.state.modalErrorMessage.map((item, idx) => (
                                                <li key={idx}>{item}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        ) : null}
                    </Modal>
                )}
                <table className="table">
                    <thead>
                        <tr>
                            <th className="col-sm-2"></th>
                            <th className="col-sm-4">Onderdeel</th>
                            <th className="col-sm-1">Items</th>
                            <th className="col-sm-1">Acties</th>
                            <th className="col-sm-2">Laatst opgeschoond</th>
                            <th className="col-sm-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="col-sm-2"></td>
                            <td className="col-sm-4">Verplaats binnengekomen e-mailcorrespondentie naar de e-mailarchief map indien deze ouder zijn dan {cleanupYears['outgoingEmails']} jaar</td>
                            <td className="col-sm-1">{this.state.amountOfIncomingEmailsToCleanup}</td>
                            <td className="col-sm-1">
                                <a role="button" onClick={() => this.openModal('incomingEmails')}>
                                    <Icon size={14} icon={trash} />
                                </a>
                            </td>
                            <td className="col-sm-2">{this.state.incomingEmailsLastCleanupDate}</td>
                            <td className="col-sm-2"></td>
                        </tr>

                        <tr>
                            <td className="col-sm-2"></td>
                            <td className="col-sm-4">Verplaats uitgaande e-mailcorrespondentie naar de e-mailarchief map indien deze ouder zijn dan {cleanupYears['incomingEmails']} jaar</td>
                            <td className="col-sm-1">{this.state.amountOfOutgoingEmailsToCleanup}</td>
                            <td className="col-sm-1">
                                <a role="button" onClick={() => this.openModal('outgoingEmails')}>
                                    <Icon size={14} icon={trash} />
                                </a>
                            </td>
                            <td className="col-sm-2">{this.state.outgoingEmailsLastCleanupDate}</td>
                            <td className="col-sm-2"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(DataCleanupListItems);
