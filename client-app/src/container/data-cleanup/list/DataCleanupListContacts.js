import React, { Component } from 'react';
import { connect } from 'react-redux';
import { trash } from 'react-icons-kit/fa/trash';
import Icon from 'react-icons-kit';
import DataCleanupAPI from '../../../api/data-cleanup/DataCleanupAPI';
import Modal from '../../../components/modal/Modal';

class DataCleanupListContacts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            amountOfContactsToCleanup: '-',

            contactsLastCleanupDate: '-',

            showModal: false,
            modalCleanupType: null,
            modalErrorMessage: '',
        };
    }

    // New method to fetch all cleanup data
    fetchCleanupData = () => {
        DataCleanupAPI.getAmountsToCleanup('contacts').then(payload => {
            this.setState({
                amountOfContactsToCleanup: payload['contacts'],
            });
        });

        DataCleanupAPI.getLastCleanupDates().then(payload => {
            this.setState({
                contactsLastCleanupDate: payload['contacts'],
            });
        });

        DataCleanupAPI.getExcludedGroups().then(payload => {
            this.setState({
                excludedGroups: payload,
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
        DataCleanupAPI.cleanupContacts(this.state.modalCleanupType)
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
            contacts: "Contacten",
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
                                u <strong>{cleanupLabels[modalCleanupType].toLowerCase()}</strong> wilt opschonen?<br />
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
                            <td className="col-sm-4">Contacten die geen order, nota, deelname, intake, kans en e-mailcorrespondentie hebben</td>
                            <td className="col-sm-1">{this.state.amountOfContactsToCleanup}</td>
                            <td className="col-sm-1"></td>
                            <td className="col-sm-2"></td>
                            <td className="col-sm-2"></td>
                        </tr>

                        <tr>
                            <td className="col-sm-2"></td>
                            <td className="col-sm-4">Groepen met contacten die moeten worden uitgezonderd van opschonen</td>
                            <td colspan="3" className="col-sm-4">

                            </td>
                            <td className="col-sm-2"></td>
                        </tr>

                        <tr>
                            <td className="col-sm-2"></td>
                            <td className="col-sm-4">Netto contacten die geen order, nota, deelname, intake, kans en e-mailcorrespondentie hebben</td>
                            <td className="col-sm-1">{this.state.amountOfContactsToCleanup}</td>
                            <td className="col-sm-1">
                                <a role="button" onClick={() => this.openModal('contacts')}>
                                    <Icon size={14} icon={trash} />
                                </a>
                            </td>
                            <td className="col-sm-2">{this.state.contactsLastCleanupDate}</td>
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

export default connect(mapStateToProps, null)(DataCleanupListContacts);
