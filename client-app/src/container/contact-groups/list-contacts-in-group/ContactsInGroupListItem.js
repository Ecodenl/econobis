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
            memberToGroupSince,
            permissions,
            isUsedInLaposta,
        } = this.props;

        let lapostaMemberStatus = '';
        switch (lapostaMemberState) {
            case 'active':
                lapostaMemberStatus = 'Actief';
                break;
            case 'unsubscribed':
                lapostaMemberStatus = 'Uitgeschreven';
                break;
            case 'unknown':
                lapostaMemberStatus = 'Niet bekend in Laposta';
                break;
            case 'inprogress':
                lapostaMemberStatus = 'Wordt bijgewerkt';
                break;
            default:
                lapostaMemberStatus = '';
                break;
        }

        const missingDataClass =
            isUsedInLaposta && (lapostaMemberId === null || lapostaMemberState === 'unknown')
                ? 'missing-data-row'
                : null;
        const missingContactDataMessage =
            isUsedInLaposta && (lapostaMemberId === null || lapostaMemberState === 'unknown')
                ? 'Koppeling niet gevonden in Laposta'
                : '';

        return (
            <tr
                title={missingContactDataMessage}
                className={this.state.highlightRow + ' ' + missingDataClass ? missingDataClass : ''}
                onDoubleClick={() => this.openItem(id)}
                onMouseEnter={() => this.onRowEnter()}
                onMouseLeave={() => this.onRowLeave()}
            >
                <td className="hidden-xs">{number}</td>
                <td className="hidden-xs hidden-sm">{typeName} </td>
                <td>{fullName}</td>
                <td className="hidden-xs">{emailAddress}</td>
                {isUsedInLaposta && <td className="hidden-xs">{lapostaMemberStatus}</td>}
                <td className="hidden-xs hidden-sm">
                    {memberToGroupSince ? moment(memberToGroupSince).format('DD-MM-Y') : ''}
                </td>
                <td>
                    {this.state.showActionButtons &&
                    permissions.updatePerson &&
                    permissions.updateOrganisation &&
                    ((isUsedInLaposta && lapostaMemberId !== null) ||
                        (this.props.contactGroupType && this.props.contactGroupType.id === 'static')) ? (
                        <a
                            role="button"
                            onClick={this.props.showEditItemModal.bind(this, id, emailAddress, memberToGroupSince)}
                        >
                            <span className="glyphicon glyphicon-pencil mybtn-success" />{' '}
                        </a>
                    ) : (
                        ''
                    )}
                    {this.state.showActionButtons &&
                    (permissions.updateContactGroupMembers ||
                        (permissions.updatePerson && permissions.updateOrganisation)) &&
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
