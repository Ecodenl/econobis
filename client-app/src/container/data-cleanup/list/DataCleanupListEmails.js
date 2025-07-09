import React, { Component } from 'react';
import { connect } from 'react-redux';
import { trash } from 'react-icons-kit/fa/trash';
import { refresh } from 'react-icons-kit/fa/refresh';
import Icon from 'react-icons-kit';
import DataCleanupAPI from '../../../api/data-cleanup/DataCleanupAPI';
import Modal from '../../../components/modal/Modal';

class DataCleanupListItems extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            modalCleanupType: null,
            modalErrorMessage: '',

            incomingEmails: [],
            outgoingEmails: [],
        };
    }

    // New method to fetch all cleanup data
    fetchCleanupData = () => {
        DataCleanupAPI.getCleanupItems().then(payload => {
            this.setState({
                incomingEmails: payload['incomingEmails'],
                outgoingEmails: payload['outgoingEmails'],
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

    handleRefresh = (cleanupType) => {
        DataCleanupAPI.updateAmounts(cleanupType)
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
    }

    render() {
        const { showModal, modalCleanupType } = this.state;

        const itemsTypes = [
            'incomingEmails',
            'outgoingEmails'
        ];

        return (
            <div>
                {showModal && (
                    <Modal
                        show={showModal}
                        closeModal={this.closeModal}
                        confirmAction={this.confirmCleanup}
                        buttonConfirmText="Opschonen"
                        buttonClassName={'btn-danger'}
                        title={`Bevestig opschonen ${this.state[modalCleanupType]['name']}`}
                    >
                        {modalCleanupType ? (
                            <div>
                                Weet u zeker dat
                                u <strong>{this.state[modalCleanupType]['name']}</strong>, <strong>ouder
                                dan {this.state[modalCleanupType]['years_for_delete']} jaar</strong> wilt opschonen?<br />
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
                        <th className="col-sm-1"></th>
                        <th className="col-sm-4">Onderdeel</th>
                        <th className="col-sm-1">Items</th>
                        <th className="col-sm-1">Acties</th>
                        <th className="col-sm-2">Laatst opgeschoond</th>
                        <th className="col-sm-2">Laatst bepaald</th>
                        <th className="col-sm-1"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {itemsTypes.map((item) => (
                        <tr>
                            <td className="col-sm-1"></td>
                            <td className="col-sm-4">{this.state[item]['name']} ouder dan {this.state[item]['years_for_delete']} jaar</td>
                            <td className="col-sm-1">{this.state[item]['number_of_items_to_delete']}</td>
                            <td className="col-sm-1">
                                <a role="button" onClick={() => this.openModal(item)} title={`verwijder ${this.state[item]['name']}`}>
                                    <Icon size={14} icon={trash} />
                                </a>
                                &nbsp;&nbsp;&nbsp;
                                <a role="button" onClick={() => this.handleRefresh(item)} title={`herbereken op te schonen ${this.state[item]['name']}`}>
                                    <Icon size={14} icon={refresh} />
                                </a>
                            </td>
                            <td className="col-sm-2">{this.state[item]['date_cleaned_up']}</td>
                            <td className="col-sm-2">{this.state[item]['date_determined']}</td>
                            <td className="col-sm-1"></td>
                        </tr>
                    ))}
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
