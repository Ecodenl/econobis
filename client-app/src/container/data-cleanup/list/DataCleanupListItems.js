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
        };
    }

    openModal = (cleanupType) => {
        this.setState({
            showModal: true,
            modalCleanupType: cleanupType,
        });
    };

    closeModal = () => {
        this.setState({
            showModal: false,
            modalCleanupType: null,
            modalErrorMessage: '',
        });
    };

    confirmCleanup = () => {
        const { modalCleanupType } = this.state;
        DataCleanupAPI.cleanupItems(modalCleanupType)
            .then(payload => {
                if (payload.length === 0) {
                    this.closeModal();
                    this.props.fetchCleanupData();
                } else {
                    this.setState({
                        modalErrorMessage: payload
                    });
                }
            })
            .catch(error => {
                // Optionally handle error
            });
    };

    render() {
        const { showModal, modalCleanupType, modalErrorMessage } = this.state;
        const itemsTypes = [
            'invoices',
            'ordersOneoff',
            'ordersPeriodic',
            'intakes',
            'opportunities',
            'participationsWithStatus',
            'participationsFinished'
        ];

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
                                Weet u zeker dat u <strong>{data[modalCleanupType]['name']}</strong>, <strong>ouder dan {data[modalCleanupType]['years_for_delete']} jaar</strong> wilt opschonen?<br />
                                <br />
                                Deze verwijderactie is niet terug te draaien.
                                <br /><br />
                                <div id='cleanupModalWarning' style={{ color: '#e64a4a' }}>
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
                    <tbody>
                    {itemsTypes.map((item) => (
                        <tr key={item}>
                            <td className="col-sm-1"></td>
                            <td className="col-sm-4">
                                {data[item]?.name} ouder dan {data[item]?.years_for_delete} jaar
                            </td>
                            <td className="col-sm-1">{data[item]?.number_of_items_to_delete}</td>
                            <td className="col-sm-1">
                                <a role="button" onClick={() => this.openModal(item)} title={`verwijder ${data[item]?.name}`}>
                                    <Icon size={14} icon={trash} />
                                </a>
                                &nbsp;&nbsp;&nbsp;
                                <a role="button" onClick={() => this.props.handleRefresh(item)} title={`herbereken op te schonen ${data[item]?.name}`}>
                                    <Icon size={14} icon={refresh} />
                                </a>
                            </td>
                            <td className="col-sm-2">{data[item]?.date_cleaned_up}</td>
                            <td className="col-sm-2">{data[item]?.date_determined}</td>
                            <td className="col-sm-1"></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    permissions: state.meDetails.permissions,
});

export default connect(mapStateToProps, null)(DataCleanupListItems);
