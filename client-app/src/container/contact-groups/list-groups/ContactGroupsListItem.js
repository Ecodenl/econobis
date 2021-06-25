import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import LapostaIcon from '../../../images/logo/laposta-16x16.png';

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
            simulatedGroupUpToDate,
            numberOfLapostaMembers,
            useLaposta,
        } = this.props;

        const style = {
            height: '16px',
            width: 'auto',
        };
        const missingDataClass = isUsedInLaposta && !simulatedGroupUpToDate ? 'missing-data-row' : null;

        return (
            <tr
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
                            <span className="glyphicon glyphicon-pencil mybtn-success" />{' '}
                        </a>
                    ) : (
                        ''
                    )}
                    {this.state.showActionButtons && permissions.manageGroup && !isUsedInComposedGroup ? (
                        <a role="button" onClick={this.props.showDeleteItemModal.bind(this, id, name, type.id)}>
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

export default connect(mapStateToProps)(ContactGroupsListItem);
