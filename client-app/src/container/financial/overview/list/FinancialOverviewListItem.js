import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';

class FinancialOverviewListItem extends Component {
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
        hashHistory.push(`/waardestaat/${id}`);
    }

    render() {
        const { id, description, year, administration, definitive, statusId, dateProcessed, permissions } = this.props;
        let status = '';
        switch (statusId) {
            case 'in-progress':
                status = 'Wordt aangemaakt...';
                break;
            case 'concept':
                status = 'Concept';
                break;
            case 'definitive':
                status = 'Definitief';
                break;
            case 'processed':
                status = 'Verwerkt';
                break;
        }

        const dateProcessedFormated = dateProcessed ? moment(dateProcessed).format('DD-MM-Y') : '';

        return (
            <tr
                className={this.state.highlightRow}
                onDoubleClick={permissions.manageFinancial ? () => this.openItem(id) : null}
                onMouseEnter={() => this.onRowEnter()}
                onMouseLeave={() => this.onRowLeave()}
            >
                <td>{description}</td>
                <td>{year}</td>
                <td>{administration && administration.name}</td>
                <td>{status}</td>
                <td>{dateProcessedFormated}</td>
                <td>
                    {this.state.showActionButtons && permissions.manageFinancial ? (
                        <a role="button" onClick={() => this.openItem(id)}>
                            <span className="glyphicon glyphicon-pencil mybtn-success" />{' '}
                        </a>
                    ) : (
                        ''
                    )}
                    {this.state.showActionButtons &&
                    permissions.manageFinancial &&
                    !definitive &&
                    statusId === 'concept' ? (
                        <a role="button" onClick={this.props.showDeleteItemModal.bind(this, id, description)}>
                            <span className="glyphicon glyphicon-trash mybtn-danger" />{' '}
                        </a>
                    ) : (
                        ''
                    )}
                </td>
            </tr>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(FinancialOverviewListItem);
