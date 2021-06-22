import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import moment from 'moment';
import { connect } from 'react-redux';

class ContactsInGroupListItem extends Component {
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
        hashHistory.push(`/contact/${id}`);
    }

    render() {
        const {
            id,
            number,
            typeName,
            fullName,
            emailAddress,
            lapostaMemberId,
            lapostaMemberState,
            lapostaMemberSince,
            permissions,
        } = this.props;

        let lapostaMemberStatus = '';
        switch (lapostaMemberState) {
            case 'active':
                lapostaMemberStatus = 'Actief';
            case 'unsubscribed':
                lapostaMemberStatus = 'Uitgeschreven';
            default:
                lapostaMemberStatus = '';
        }

        return (
            <tr
                className={this.state.highlightRow}
                onDoubleClick={() => this.openItem(id)}
                onMouseEnter={() => this.onRowEnter()}
                onMouseLeave={() => this.onRowLeave()}
            >
                <td className="hidden-xs">{number}</td>
                <td className="hidden-xs hidden-sm">{typeName} </td>
                <td>{fullName}</td>
                <td className="hidden-xs">{emailAddress}</td>
                <td className="hidden-xs">{lapostaMemberId}</td>
                <td className="hidden-xs">{lapostaMemberStatus}</td>
                <td className="hidden-xs hidden-sm">
                    {lapostaMemberSince ? moment(lapostaMemberSince).format('DD-MM-Y') : ''}
                </td>
                <td>
                    {this.state.showActionButtons ? (
                        <a role="button" onClick={() => this.openItem(id)}>
                            <span className="glyphicon glyphicon-pencil mybtn-success" />{' '}
                        </a>
                    ) : (
                        ''
                    )}
                    {this.state.showActionButtons &&
                    permissions.updatePerson &&
                    permissions.updateOrganisation &&
                    this.props.contactGroupType &&
                    this.props.contactGroupType.id === 'static' ? (
                        <a role="button" onClick={this.props.showDeleteItemModal.bind(this, id, fullName)}>
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
        contactGroupType: state.contactGroupDetails.type,
    };
};

export default connect(mapStateToProps)(ContactsInGroupListItem);
