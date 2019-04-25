import React, { Component } from 'react';
import { connect } from 'react-redux';

import { hashHistory } from 'react-router';
import moment from 'moment';

class NotesListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightRow: '',
        };

        this.openItem = this.openItem.bind(this);
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

    openItem() {
        hashHistory.push(`/taak/${this.props.id}`);
    }

    render() {
        const { id, createdAt, typeName, noteSummary, contactFullName, datePlannedStart, responsibleName } = this.props;

        return (
            <tr
                className={this.state.highlightRow}
                onDoubleClick={() => this.openItem(id)}
                onMouseEnter={() => this.onRowEnter()}
                onMouseLeave={() => this.onRowLeave()}
            >
                <td>{moment(createdAt.date).format('L')}</td>
                <td>{typeName}</td>
                <td>{noteSummary}</td>
                <td>{contactFullName}</td>
                <td>{datePlannedStart && moment(datePlannedStart.date).format('L')}</td>
                <td>{responsibleName}</td>
                <td>
                    {this.state.showActionButtons ? (
                        <a role="button" onClick={this.openItem}>
                            <span className="glyphicon glyphicon-pencil mybtn-success" />{' '}
                        </a>
                    ) : (
                        ''
                    )}
                    {this.state.showActionButtons && this.props.permissions.manageNote ? (
                        <a role="button" onClick={this.props.showDeleteItemModal.bind(this, id, name)}>
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

const mapStateToProps = state => ({
    permissions: state.meDetails.permissions,
});

export default connect(
    mapStateToProps,
    null
)(NotesListItem);
