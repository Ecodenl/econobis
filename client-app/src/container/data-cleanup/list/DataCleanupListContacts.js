import React, { Component } from 'react';
import { connect } from 'react-redux';
import { trash, plus, refresh } from 'react-icons-kit/fa';
import Icon from 'react-icons-kit';
import DataCleanupAPI from '../../../api/data-cleanup/DataCleanupAPI';
import Modal from '../../../components/modal/Modal';
import InputSelect from '../../../components/form/InputSelect';
import GroupAPI from '../../../api/contact-group/ContactGroupAPI';

class DataCleanupListContacts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            showModal2: false,
            modalCleanupType: null,
            modalErrorMessage: '',

            contactGroups: [],
            contactGroupToAttachId: null,
        };
    }

    componentDidMount() {
        GroupAPI.peekActiveContactGroups().then(payload => {
            this.setState({ contactGroups: payload });
        });
    }

    // Open modal and set which cleanup type
    openModal = cleanupType => {
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
        const { modalCleanupType } = this.state;
        DataCleanupAPI.cleanupContacts(modalCleanupType)
            .then(payload => {
                if (payload.length === 0) {
                    this.closeModal();
                    this.props.fetchCleanupData();
                } else {
                    this.setState({
                        modalErrorMessage: payload,
                    });
                }
            })
            .catch(error => {
                // this.props.setError(error.response.status, error.response.data.message);
            });
    };

    deleteExcludedGroup = groupId => {
        DataCleanupAPI.deleteExcludedGroup(groupId)
            .then(payload => {
                this.props.fetchCleanupData();
            })
            .catch(error => {
                // this.props.setError(error.response.status, error.response.data.message);
            });
    };

    addExcludedGroup = groupId => {
        DataCleanupAPI.addExcludedGroup(groupId)
            .then(payload => {
                this.props.fetchCleanupData();
                this.setState({
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
        const {
            showModal,
            showModal2,
            modalCleanupType,
            modalErrorMessage,
            contactGroups,
            contactGroupToAttachId,
        } = this.state;

        const itemsTypes = ['contactsToDelete', 'contactsSoftDeleted'];

        const data = this.props.data;
        const excludedGroups = this.props.excludedGroups;

        return (
            <div>
                {showModal && (
                    <Modal
                        show={showModal}
                        closeModal={this.closeModal}
                        confirmAction={this.confirmCleanup}
                        buttonConfirmText="Opschonen"
                        buttonClassName={'btn-danger'}
                        title={'Bevestig opschonen ' + cleanupLabels[modalCleanupType].toLowerCase()}
                        title={
                            modalCleanupType && data[modalCleanupType]
                                ? `Bevestig opschonen ${data[modalCleanupType]['name']}`
                                : ''
                        }
                    >
                        {modalCleanupType && data[modalCleanupType] ? (
                            <div>
                                Weet u zeker dat u <strong>{data[modalCleanupType]['name']}</strong>,{' '}
                                <strong>ouder dan {data[modalCleanupType]['years_for_delete']} jaar</strong> wilt
                                opschonen?
                                <br />
                                <br />
                                Deze verwijderactie is niet terug te draaien.
                                <br />
                                <br />
                                <div id="cleanupModalWarning" style={{ color: '#e64a4a' }}>
                                    {modalErrorMessage !== '' && Array.isArray(modalErrorMessage) && (
                                        <ul>
                                            {modalErrorMessage.map((item, idx) => (
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
                        confirmAction={() => this.addExcludedGroup(contactGroupToAttachId)}
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
                                    value={contactGroupToAttachId}
                                />
                            </div>
                        </form>
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

                    {this.props.isLoading ? (
                        <tr>
                            <td></td>
                            <td colSpan={5}>
                                Gegevens aan het laden
                            </td>
                            <td></td>
                        </tr>
                    ) : (
                        <tbody>
                            {itemsTypes.map(item => (
                                <tr key={item}>
                                    <td></td>
                                    <td>
                                        {data[item]?.name} ouder dan {data[item]?.years_for_delete} jaar
                                    </td>
                                    <td>{data[item]?.number_of_items_to_delete}</td>
                                    <td>
                                        {item === 'contactsSoftDeleted' ? (
                                            <a
                                                role="button"
                                                onClick={() => this.openModal(item)}
                                                title={`verwijder ${data[item]?.name}`}
                                            >
                                                <Icon size={14} icon={trash} />
                                            </a>
                                        ) : null}
                                        &nbsp;&nbsp;&nbsp;
                                        <a
                                            role="button"
                                            onClick={() => this.props.handleRefresh(item)}
                                            title={`herbereken op te schonen ${data[item]?.name}`}
                                        >
                                            <Icon size={14} icon={refresh} />
                                        </a>
                                    </td>
                                    <td>{data[item]?.date_cleaned_up}</td>
                                    <td>{data[item]?.date_determined}</td>
                                    <td></td>
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td>
                                    Contacten in deze groepen moeten worden uitgezonderd van opschonen
                                </td>
                                <td></td>
                                <td>
                                    <a role="button" onClick={() => this.openModal2()}>
                                        <Icon size={14} icon={plus} />
                                    </a>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>

                            {excludedGroups.length === 0 ? (
                                <tr>
                                    <td></td>
                                    <td>
                                        Geen uitzonderingsgroepen
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            ) : (
                                excludedGroups &&
                                excludedGroups.map((group, idx) => (
                                    <tr>
                                        <td></td>
                                        <td>
                                            {' '}
                                            - {group.name}
                                        </td>
                                        <td></td>
                                        <td>
                                            <a role="button" onClick={() => this.deleteExcludedGroup(group.id)}>
                                                <Icon size={14} icon={trash} />
                                            </a>
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                ))
                            )}
                            <tr>
                                <td></td>
                                <td>
                                    Netto contacten die geen orders, nota's, deelnames, intakes, kansen en
                                    e-mailcorrespondentie hebben
                                </td>
                                {/*<td>{amountOfContactsToCleanupNet}</td>*/}
                                <td>@@nog</td>
                                <td>
                                    <a role="button" onClick={() => this.openModal('contacts')}>
                                        <Icon size={14} icon={trash} />
                                    </a>
                                </td>
                                {/*<td className="col-sm-2">{contactsLastCleanupDate}</td>*/}
                                <td>@@nog</td>
                                <td>@@nog</td>
                                <td></td>
                            </tr>
                        </tbody>
                    )}
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
