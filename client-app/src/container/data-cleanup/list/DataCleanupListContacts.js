import React, { Component } from 'react';
import { connect } from 'react-redux';
import { trash, plus, refresh } from 'react-icons-kit/fa';
import Icon from 'react-icons-kit';
import DataCleanupAPI from '../../../api/data-cleanup/DataCleanupAPI';
import Modal from '../../../components/modal/Modal';
import CooperationDetailsAPI from '../../../api/cooperation/CooperationDetailsAPI';

class DataCleanupListContacts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            modalCleanupType: null,
            modalErrorMessage: '',

            excludedGroups: [],
        };
    }

    componentDidMount() {
        CooperationDetailsAPI.getExcludedGroups().then(payload => {
            // console.log(payload);
            this.setState({ excludedGroups: payload.data.data });
        });
    }

    // Open modal and set which cleanup type
    openModal = cleanupType => {
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
            modalCleanupType,
            modalErrorMessage,
            excludedGroups,
        } = this.state;

        const itemsTypes = ['contactsToDelete', 'contactsSoftDeleted'];

        const data = this.props.data;

        return (
            <div>
                {showModal && (
                    <Modal
                        show={showModal}
                        closeModal={this.closeModal}
                        confirmAction={this.confirmCleanup}
                        buttonConfirmText="Opschonen"
                        buttonClassName={'btn-danger'}
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
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>

                            {!excludedGroups ? (
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
                                            - {group.contactGroupName}
                                        </td>
                                        <td></td>
                                        <td></td>
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
