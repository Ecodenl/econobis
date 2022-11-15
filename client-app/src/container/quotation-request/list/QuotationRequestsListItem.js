import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import moment from 'moment';

class QuotationRequestsListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightRow: '',
        };
    }

    onRowEnter() {
        this.setState({
            showActionButtons: true,
            highlightRow: 'highlight-row',
        });
    }

    onRowLeave() {
        this.setState({
            showActionButtons: false,
            highlightRow: '',
        });
    }

    openItem(id) {
        hashHistory.push(`/offerteverzoek/${id}`);
    }

    render() {
        const {
            id,
            organisationOrCoach,
            opportunity,
            createdAt,
            dateRecorded,
            status,
            datePlanned,
            dateReleased,
        } = this.props;

        return (
            <tr
                className={this.state.highlightRow}
                onDoubleClick={() => this.openItem(id)}
                onMouseEnter={() => this.onRowEnter()}
                onMouseLeave={() => this.onRowLeave()}
            >
                <td>{organisationOrCoach && organisationOrCoach.fullName}</td>
                <td>{opportunity && opportunity.intake.contact.fullName}</td>
                <td>{opportunity && opportunity.intake.fullAddress}</td>
                <td>{opportunity && opportunity.measureCategory.name}</td>
                <td>{moment(createdAt).format('DD-MM-Y')}</td>
                <td>{datePlanned && moment(datePlanned).format('DD-MM-Y HH:mm')}</td>
                <td>{dateRecorded && moment(dateRecorded).format('DD-MM-Y HH:mm')}</td>
                <td>{status ? status.name : 'Onbekend'}</td>
                <td>{dateReleased && moment(dateReleased).format('DD-MM-Y')}</td>
                <td>{opportunity && opportunity.intake.campaign.name}</td>
                <td>
                    {this.state.showActionButtons ? (
                        <a role="button" onClick={() => this.openItem(id)}>
                            <span className="glyphicon glyphicon-pencil mybtn-success" />{' '}
                        </a>
                    ) : (
                        ''
                    )}
                </td>
            </tr>
        );
    }
}

export default QuotationRequestsListItem;
