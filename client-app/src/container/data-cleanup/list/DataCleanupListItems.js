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
            amountOfInvoicesToCleanup: '-',
            amountOfOrdersToCleanup: '-',
            amountOfIntakesToCleanup: '-',
            amountOfOpportunitiesToCleanup: '-',
            amountOfParticipationsWithStatusToCleanup: '-',
            amountOfParticipationsFinishedToCleanup: '-',

            invoicesLastCleanupDate: '-',
            ordersOneoffLastCleanupDate: '-',
            ordersPeriodicLastCleanupDate: '-',
            intakesLastCleanupDate: '-',
            opportunitiesLastCleanupDate: '-',
            participationsWithStatusLastCleanupDate: '-',
            participationsFinishedLastCleanupDate: '-',

            invoicesCleanupYears: '-',
            ordersOneoffCleanupYears: '-',
            ordersPeriodicCleanupYears: '-',
            intakesCleanupYears: '-',
            opportunitiesCleanupYears: '-',
            participationsWithStatusCleanupYears: '-',
            participationsFinishedCleanupYears: '-',

            showModal: false,
            modalCleanupType: null, // Track which cleanup action is triggered
        };
    }

    componentDidMount() {
        DataCleanupAPI.getAmountsToCleanup().then(payload => {
            this.setState({
                amountOfInvoicesToCleanup: payload['invoices'],
                amountOfOrdersToCleanup: payload['orders'],
                amountOfIntakesToCleanup: payload['intakes'],
                amountOfOpportunitiesToCleanup: payload['opportunities'],
                amountOfParticipationsWithStatusToCleanup: payload['participationsWithStatus'],
                amountOfParticipationsFinishedToCleanup: payload['participationsFinished'],
            });
        });

        DataCleanupAPI.getLastCleanupDates().then(payload => {
            this.setState({
                invoicesLastCleanupDate: payload['invoices'],
                ordersOneoffLastCleanupDate: payload['ordersOneOff'],
                ordersPeriodicLastCleanupDate: payload['ordersPeriodic'],
                intakesLastCleanupDate: payload['intakes'],
                opportunitiesLastCleanupDate: payload['opportunities'],
                participationsWithStatusLastCleanupDate: payload['participationsWithStatus'],
                participationsFinishedLastCleanupDate: payload['participationsFinished'],
            });
        });

        DataCleanupAPI.getCleanupYears().then(payload => {
            this.setState({
                invoicesCleanupYears: payload['invoices'],
                ordersOneoffCleanupYears: payload['ordersOneOff'],
                ordersPeriodicCleanupYears: payload['ordersPeriodic'],
                intakesCleanupYears: payload['intakes'],
                opportunitiesCleanupYears: payload['opportunities'],
                participationsWithStatusCleanupYears: payload['participationsWithStatus'],
                participationsFinishedCleanupYears: payload['participationsFinished'],
            });
        });
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
        });
    };

    // Confirm action based on type
    confirmCleanup = () => {
        const { modalCleanupType } = this.state;
        if (!modalCleanupType) return;

        // Call the appropriate cleanup function from props
        switch (modalCleanupType) {
            case 'invoices':
                this.props.cleanupInvoices();
                break;
            case 'orders':
                this.props.cleanupOrders();
                break;
            case 'intakes':
                this.props.cleanupIntakes();
                break;
            case 'opportunities':
                this.props.cleanupOpportunities();
                break;
            case 'participationsWithStatus':
                this.props.cleanupParticipationsWithStatus();
                break;
            case 'participationsFinished':
                this.props.cleanupParticipationsFinished();
                break;
            default:
                break;
        }
        this.closeModal();
    };

    render() {
        const { showModal, modalCleanupType } = this.state;

        // Map cleanupType to readable label for modal
        const cleanupLabels = {
            invoices: "Nota's",
            orders: "Orders",
            intakes: "Intakes",
            opportunities: "Kansen",
            participationsWithStatus: "Deelnames met status interesse, ingeschreven of toegekend",
            participationsFinished: "Deelnames die zijn beëindigd",
        };

        const cleanupYears = {
            invoices: this.state.invoicesCleanupYears,
            orders: this.state.ordersOneoffCleanupYears,
            intakes: this.state.intakesCleanupYears,
            opportunities: this.state.opportunitiesCleanupYears,
            participationsWithStatus: this.state.participationsWithStatusCleanupYears,
            participationsFinished: this.state.participationsFinishedCleanupYears,
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
                                Weet u zeker dat u <strong>{cleanupLabels[modalCleanupType].toLowerCase()}</strong> en <strong>ouder zijn dan {cleanupYears[modalCleanupType]} jaar</strong> wilt opschonen?<br/>
                                <br/>
                                Deze verwijderactie is niet terug te draaien.
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
                        <th className="col-sm-2">Acties</th>
                        <th className="col-sm-1">Laatst opgeschoond</th>
                        <th className="col-sm-2"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="col-sm-2"></td>
                        <td className="col-sm-4">Nota's ouder dan {cleanupYears['invoices']} jaar</td>
                        <td className="col-sm-1">{this.state.amountOfInvoicesToCleanup}</td>
                        <td className="col-sm-2">
                            <a role="button" onClick={() => this.openModal('invoices')}>
                                <Icon size={14} icon={trash} />
                            </a>
                        </td>
                        <td className="col-sm-1">{this.state.invoicesLastCleanupDate}</td>
                        <td className="col-sm-2"></td>
                    </tr>
                    <tr>
                        <td className="col-sm-2"></td>
                        <td className="col-sm-4">Orders ouder dan {cleanupYears['orders']} jaar</td>
                        <td className="col-sm-1">{this.state.amountOfOrdersToCleanup}</td>
                        <td className="col-sm-2">
                            <a role="button" onClick={() => this.openModal('orders')}>
                                <Icon size={14} icon={trash} />
                            </a>
                        </td>
                        <td className="col-sm-1">{this.state.ordersOneoffLastCleanupDate}</td>
                        <td className="col-sm-2"></td>
                    </tr>
                    <tr>
                        <td className="col-sm-2"></td>
                        <td className="col-sm-4">Intakes ouder dan {cleanupYears['intakes']} jaar</td>
                        <td className="col-sm-1">{this.state.amountOfIntakesToCleanup}</td>
                        <td className="col-sm-2">
                            <a role="button" onClick={() => this.openModal('intakes')}>
                                <Icon size={14} icon={trash} />
                            </a>
                        </td>
                        <td className="col-sm-1">{this.state.intakesLastCleanupDate}</td>
                        <td className="col-sm-2"></td>
                    </tr>
                    <tr>
                        <td className="col-sm-2"></td>
                        <td className="col-sm-4">Kansen ouder dan {cleanupYears['opportunities']} jaar</td>
                        <td className="col-sm-1">{this.state.amountOfOpportunitiesToCleanup}</td>
                        <td className="col-sm-2">
                            <a role="button" onClick={() => this.openModal('opportunities')}>
                                <Icon size={14} icon={trash} />
                            </a>
                        </td>
                        <td className="col-sm-1">{this.state.opportunitiesLastCleanupDate}</td>
                        <td className="col-sm-2"></td>
                    </tr>
                    <tr>
                        <td className="col-sm-2"></td>
                        <td className="col-sm-4">Deelnames met status interesse, ingeschreven of toegekend ouder dan {cleanupYears['participationsWithStatus']} jaar</td>
                        <td className="col-sm-1">{this.state.amountOfParticipationsWithStatusToCleanup}</td>
                        <td className="col-sm-2">
                            <a role="button" onClick={() => this.openModal('participationsWithStatus')}>
                                <Icon size={14} icon={trash} />
                            </a>
                        </td>
                        <td className="col-sm-1">{this.state.participationsWithStatusLastCleanupDate}</td>
                        <td className="col-sm-2"></td>
                    </tr>
                    <tr>
                        <td className="col-sm-2"></td>
                        <td className="col-sm-4">Deelnames die zijn beëindigd ouder dan {cleanupYears['participationsFinished']} jaar</td>
                        <td className="col-sm-1">{this.state.amountOfParticipationsFinishedToCleanup}</td>
                        <td className="col-sm-2">
                            <a role="button" onClick={() => this.openModal('participationsFinished')}>
                                <Icon size={14} icon={trash} />
                            </a>
                        </td>
                        <td className="col-sm-1">{this.state.participationsFinishedLastCleanupDate}</td>
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