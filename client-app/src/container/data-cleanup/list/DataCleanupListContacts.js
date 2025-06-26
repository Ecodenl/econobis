import React, { Component } from 'react';
import { connect } from 'react-redux';
import { trash } from 'react-icons-kit/fa/trash';
import { plus } from 'react-icons-kit/fa/plus';
import Icon from 'react-icons-kit';
import DataCleanupAPI from '../../../api/data-cleanup/DataCleanupAPI';
import Modal from '../../../components/modal/Modal';
import InputSelect from '../../../components/form/InputSelect';
import GroupAPI from '../../../api/contact-group/ContactGroupAPI';

class DataCleanupListContacts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            amountOfContactsToCleanup: '-',
            amountOfContactsToCleanupNet: '-',

            contactsLastCleanupDate: '-',

            showModal: false,
            showModal2: false,
            modalCleanupType: null,
            modalErrorMessage: '',
            excludedGroups: [],
            contactGroups: [],
            contactGroupToAttachId: null,
        };
    }

    // New method to fetch all cleanup data
    fetchCleanupData = () => {
        DataCleanupAPI.getAmountsToCleanup().then(payload => {
            this.setState({
                amountOfContactsToCleanup: payload['contacts'],
                amountOfContactsToCleanupNet: payload['contactsNet'],
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

        GroupAPI.peekActiveContactGroups().then(payload => {
            this.setState({ contactGroups: payload });
        });

    }

    // Open modal and set which cleanup type
    openModal = (cleanupType) => {
        this.setState({
            showModal: true,
            modalCleanupType: cleanupType,
        });
    };

    // Open modal and set which cleanup type
    openModal2 = () => {
        this.setState({
            showModal2: true,
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

    // Close modal
    closeModal2 = () => {
        this.setState({
            showModal2: false,
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

    deleteExcludedGroup = (groupId) => {
        DataCleanupAPI.deleteExcludedGroup(groupId)
            .then(payload => {
                this.setState({
                    excludedGroups: payload,
                });
            })
            .catch(error => {
                // this.props.setError(error.response.status, error.response.data.message);
            });
    };

    addExcludedGroup = (groupId) => {
        DataCleanupAPI.addExcludedGroup(groupId)
            .then(payload => {
                this.setState({
                    excludedGroups: payload,
                    showModal2: false,
                });
            })
            .catch(error => {
                // this.props.setError(error.response.status, error.response.data.message);
            });
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };

    render() {
        const { showModal, showModal2, modalCleanupType, contactGroups, contactGroupToAttachId } = this.state;

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

                {showModal2 && (
                    <Modal
                        buttonConfirmText="Toevoegen"
                        closeModal={this.closeModal2}
                        confirmAction={() => this.addExcludedGroup(this.state.contactGroupToAttachId)}
                        title={`Groep toevoegen aan uitzonderingen`}
                    >
                        <form className="form-horizontal">
                            <div className="row">
                                <InputSelect
                                    size={'col-md-12'}
                                    label={'Groep'}
                                    name="contactGroupToAttachId"
                                    options={contactGroups}
                                    onChangeAction={this.handleInputChange}
                                    required={'required'}
                                    value={this.state.contactGroupToAttachId}
                                />
                            </div>
                        </form>
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
                        <td className="col-sm-4">Contacten die geen orders, nota's, deelnames, intakes, kansen en
                            e-mailcorrespondentie hebben
                        </td>
                        <td className="col-sm-1">{this.state.amountOfContactsToCleanup}</td>
                        <td className="col-sm-1"></td>
                        <td className="col-sm-2"></td>
                        <td className="col-sm-2"></td>
                    </tr>

                    <tr>
                        <td className="col-sm-2"></td>
                        <td className="col-sm-4">Contacten in deze groepen moeten worden uitgezonderd van opschonen</td>
                        <td className="col-sm-1"></td>
                        <td className="col-sm-1">
                            <a role="button" onClick={() => this.openModal2()}>
                                <Icon size={14} icon={plus} />
                            </a>
                        </td>
                        <td className="col-sm-2"></td>
                        <td className="col-sm-2"></td>
                    </tr>

                    {this.state.excludedGroups.map((group, idx) => (
                        <tr>
                            <td className="col-sm-2" style={{ borderTop: '0px' }}></td>
                            <td className="col-sm-4" style={{ borderTop: '0px' }}> - {group.name}</td>
                            <td className="col-sm-1" style={{ borderTop: '0px' }}></td>
                            <td className="col-sm-1" style={{ borderTop: '0px' }}>
                                <a role="button" onClick={() => this.deleteExcludedGroup(group.id)}>
                                    <Icon size={14} icon={trash} />
                                </a>
                            </td>
                            <td className="col-sm-2" style={{ borderTop: '0px' }}></td>
                            <td className="col-sm-2" style={{ borderTop: '0px' }}></td>
                        </tr>
                    ))}

                    <tr>
                        <td className="col-sm-2"></td>
                        <td className="col-sm-4">Netto contacten die geen orders, nota's, deelnames, intakes, kansen en
                            e-mailcorrespondentie hebben
                        </td>
                        <td className="col-sm-1">{this.state.amountOfContactsToCleanupNet}</td>
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
