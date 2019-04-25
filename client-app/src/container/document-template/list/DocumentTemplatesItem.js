import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import moment from 'moment';
import { connect } from 'react-redux';
moment.locale('nl');

class DocumentTemplatesItem extends Component {
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
        hashHistory.push(`/document-template/${id}`);
    }

    render() {
        const { id, number, createdAt, name, documentGroup, active } = this.props;

        return (
            <tr
                className={this.state.highlightRow}
                onDoubleClick={() => this.openItem(id)}
                onMouseEnter={() => this.onRowEnter()}
                onMouseLeave={() => this.onRowLeave()}
            >
                <td>{number}</td>
                <td>{createdAt ? moment(createdAt.date).format('L') : 'Onbekend'}</td>
                <td>{name}</td>
                <td>{documentGroup ? documentGroup.name : 'Onbekend'}</td>
                <td>{active ? 'Ja' : 'Nee'}</td>
                <td>
                    {this.state.showActionButtons ? (
                        <a role="button" onClick={() => this.openItem(id)}>
                            <span className="glyphicon glyphicon-pencil mybtn-success" />{' '}
                        </a>
                    ) : (
                        ''
                    )}
                    {this.state.showActionButtons && this.props.permissions.createDocumentTemplate && false ? (
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

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(DocumentTemplatesItem);
