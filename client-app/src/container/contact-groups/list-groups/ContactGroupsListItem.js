import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import LapostaIcon from '../../../images/logo/laposta-16x16.png';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import { trash } from 'react-icons-kit/fa/trash';

class ContactGroupsListItem extends Component {
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
        hashHistory.push(`/contact-groep/${id}`);
    }

    openContactsInGroup(id) {
        hashHistory.push(`/contacten-in-groep/${id}`);
    }

    render() {
        const {
            id,
            name,
            numberOfContacts,
            closedStatus,
            permissions,
            type,
            isUsedInComposedGroup,
            isUsedInLaposta,
            groupUpToDateWithLaposta,
            numberOfLapostaMembers,
            useLaposta,
        } = this.props;

        const style = {
            height: '16px',
            width: 'auto',
        };
        const missingDataClass =
            isUsedInLaposta && (!groupUpToDateWithLaposta || numberOfLapostaMembers != numberOfContacts)
                ? 'missing-data-row'
                : null;
        const missingContactDataMessage =
            isUsedInLaposta && (!groupUpToDateWithLaposta || numberOfLapostaMembers != numberOfContacts)
                ? 'Niet actueel met Laposta'
                : '';

        return (
            <tr
                title={missingContactDataMessage}
                className={this.state.highlightRow + ' ' + missingDataClass ? missingDataClass : ''}
                onDoubleClick={() => this.openItem(id)}
                onMouseEnter={() => this.onRowEnter()}
                onMouseLeave={() => this.onRowLeave()}
            >
                <td>{name}</td>
                {useLaposta ? (
                    <td>
                        {isUsedInLaposta ? (
                            <>
                                <img src={LapostaIcon} className="laposta-icon" alt="In laposta" style={style} />
                                {' (' + numberOfLapostaMembers + ')'}
                            </>
                        ) : null}
                    </td>
                ) : null}
                <td className="link-underline" onClick={() => this.openContactsInGroup(id)}>
                    {numberOfContacts}
                </td>
                <td>{closedStatus}</td>
                <td>{type ? type.name : ''}</td>
                <td>
                    {this.state.showActionButtons && permissions.manageGroup ? (
                        <a role="button" onClick={() => this.openItem(id)}>
                            <Icon className="mybtn-success" size={14} icon={pencil} />
                        </a>
                    ) : (
                        ''
                    )}
                    &nbsp;
                    {this.state.showActionButtons && permissions.manageGroup && !isUsedInComposedGroup ? (
                        <a role="button" onClick={this.props.showDeleteItemModal.bind(this, id, name, type.id)}>
                            <Icon className="mybtn-danger" size={14} icon={trash} />
                        </a>
                    ) : (
                        this.state.showActionButtons && permissions.manageGroup && isUsedInComposedGroup ? (
                            <Icon className="mybtn-grey" size={14} icon={trash} title={"Je kan deze groep niet verwijderen omdat deze groep onderdeel is van een samengestelde groep. Verwijder eerst deze groep uit de samengestelde groep(en)"} />
                        ) : (
                            ''
                        )
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

export default connect(mapStateToProps)(ContactGroupsListItem);
