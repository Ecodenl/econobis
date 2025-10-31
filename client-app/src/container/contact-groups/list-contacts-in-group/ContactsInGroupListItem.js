import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import { trash } from 'react-icons-kit/fa/trash';
import { FaExclamationCircle } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';

// Functionele wrapper voor de class component
const ContactsInGroupListItemWrapper = props => {
    const navigate = useNavigate();
    return <ContactsInGroupListItem {...props} navigate={navigate} />;
};

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
        this.props.navigate(`/contact/${id}`);
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
            lapostaLastErrorMessage,
            memberToGroupSince,
            permissions,
            isUsedInLaposta,
        } = this.props;

        // Possible states in laposta: active, unsubscribed, unconfirmed of cleaned
        // Possible states in econobis: unknown, inprogress, [emptyString]
        let lapostaMemberStatus = '';
        switch (lapostaMemberState) {
            case 'active':
                lapostaMemberStatus = 'Actief';
                break;
            case 'unsubscribed':
                lapostaMemberStatus = 'Uitgeschreven';
                break;
            case 'unconfirmed':
                lapostaMemberStatus = 'Niet bevestigd';
                break;
            case 'cleaned':
                lapostaMemberStatus = 'Opgeschoond';
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
                {isUsedInLaposta && (
                    <td className="hidden-xs">
                        {lapostaMemberStatus}
                        {lapostaLastErrorMessage ? (
                            <>
                                {' '}
                                <FaExclamationCircle
                                    color={'red'}
                                    size={'15px'}
                                    data-tip={
                                        'Laatste (fout) melding synchronistatie Laposta: ' + lapostaLastErrorMessage
                                    }
                                    data-for={`tooltip-lapostaLastErrorMessage`}
                                />
                                <ReactTooltip
                                    id={`tooltip-lapostaLastErrorMessage`}
                                    effect="float"
                                    place="right"
                                    multiline={true}
                                    aria-haspopup="true"
                                />
                            </>
                        ) : null}
                    </td>
                )}
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
                            <Icon className="mybtn-success" size={14} icon={pencil} />
                        </a>
                    ) : (
                        ''
                    )}
                    &nbsp;
                    {this.state.showActionButtons &&
                    (permissions.updateContactGroupMembers ||
                        (permissions.updatePerson && permissions.updateOrganisation)) &&
                    this.props.contactGroupType &&
                    this.props.contactGroupType.id === 'static' ? (
                        <a role="button" onClick={this.props.showDeleteItemModal.bind(this, id, fullName)}>
                            <Icon className="mybtn-danger" size={14} icon={trash} />
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

export default connect(mapStateToProps)(ContactsInGroupListItemWrapper);
