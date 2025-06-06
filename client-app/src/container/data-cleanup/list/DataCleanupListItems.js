import React, { Component } from 'react';
import { connect } from 'react-redux';
import { trash } from 'react-icons-kit/fa/trash';
import Icon from 'react-icons-kit';
import DataCleanupAPI from '../../../api/data-cleanup/DataCleanupAPI';

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

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };

    render() {
        return (
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
                        <td className="col-sm-4">Nota's ouder dan {this.state.invoicesCleanupYears} jaar</td>
                        <td className="col-sm-1">{this.state.amountOfInvoicesToCleanup}</td>
                        <td className="col-sm-2">
                            <a role="button" onClick={() => props.cleanupInvoices()}>
                                <Icon size={14} icon={trash} />
                            </a>
                        </td>
                        <td className="col-sm-1">{this.state.invoicesLastCleanupDate}</td>
                        <td className="col-sm-2"></td>
                    </tr>

                    <tr>
                        <td className="col-sm-2"></td>
                        <td className="col-sm-4">Orders ouder dan {this.state.ordersOneoffCleanupYears} jaar</td>
                        <td className="col-sm-1">{this.state.amountOfOrdersToCleanup}</td>
                        <td className="col-sm-2">
                            <a role="button" onClick={() => props.cleanupOrders()}>
                                <Icon size={14} icon={trash} />
                            </a>
                        </td>
                        <td className="col-sm-1">{this.state.ordersOneoffLastCleanupDate}</td>
                        <td className="col-sm-2"></td>
                    </tr>

                    <tr>
                        <td className="col-sm-2"></td>
                        <td className="col-sm-4">Intakes ouder dan {this.state.intakesCleanupYears} jaar</td>
                        <td className="col-sm-1">{this.state.amountOfIntakesToCleanup}</td>
                        <td className="col-sm-2">
                            <a role="button" onClick={() => props.cleanupIntakes()}>
                                <Icon size={14} icon={trash} />
                            </a>
                        </td>
                        <td className="col-sm-1">{this.state.intakesLastCleanupDate}</td>
                        <td className="col-sm-2"></td>
                    </tr>

                    <tr>
                        <td className="col-sm-2"></td>
                        <td className="col-sm-4">Kansen ouder dan {this.state.opportunitiesCleanupYears} jaar</td>
                        <td className="col-sm-1">{this.state.amountOfOpportunitiesToCleanup}</td>
                        <td className="col-sm-2">
                            <a role="button" onClick={() => props.cleanupOpportunities()}>
                                <Icon size={14} icon={trash} />
                            </a>
                        </td>
                        <td className="col-sm-1">{this.state.opportunitiesLastCleanupDate}</td>
                        <td className="col-sm-2"></td>
                    </tr>

                    <tr>
                        <td className="col-sm-2"></td>
                        <td className="col-sm-4">Deelnames met status interesse, ingeschreven of toegekend ouder dan {this.state.participationsWithStatusCleanupYears} jaar</td>
                        <td className="col-sm-1">{this.state.participationsWithStatusCleanupYears}</td>
                        <td className="col-sm-2">
                            <a role="button" onClick={() => props.cleanupParticipationsWithStatus()}>
                                <Icon size={14} icon={trash} />
                            </a>
                        </td>
                        <td className="col-sm-1">{this.state.participationsWithStatusLastCleanupDate}</td>
                        <td className="col-sm-2"></td>
                    </tr>

                    <tr>
                        <td className="col-sm-2"></td>
                        <td className="col-sm-4">Deelnames die zijn beëindigd ouder dan {this.state.participationsFinishedCleanupYears} jaar</td>
                        <td className="col-sm-1">{this.state.amountOfParticipationsFinishedToCleanup}</td>
                        <td className="col-sm-2">
                            <a role="button" onClick={() => props.cleanupParticipationsFinished()}>
                                <Icon size={14} icon={trash} />
                            </a>
                        </td>
                        <td className="col-sm-1">{this.state.participationsFinishedLastCleanupDate}</td>
                        <td className="col-sm-2"></td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(DataCleanupListItems);
