import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import moment from 'moment';

import { setCheckedContact } from '../../../actions/contact/ContactsActions';
import Icon from 'react-icons-kit';
import { trash } from 'react-icons-kit/fa/trash';
import { pencil } from 'react-icons-kit/fa/pencil';

class ContactsListItem extends Component {
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

    setCheckedContact(id) {
        this.props.setCheckedContact(id);
    }

    openItem(id) {
        hashHistory.push(`/contact/${id}`);
    }

    render() {
        const {
            showCheckbox,
            showCheckboxMerge,
            checked,
            keepSelected,
            removeSelected,
            blockSelecting,
            id,
            number,
            typeId,
            typeName,
            fullName,
            streetAndNumber,
            postalCode,
            city,
            areaName,
            emailAddress,
            phoneNumber,
            statusName,
            createdAt,
            permissions,
            iban,
            vatNumber,
            chamberOfCommerceNumber,
        } = this.props;
        return (
            <tr
                className={keepSelected ? 'success-row' : removeSelected ? 'error-row' : this.state.highlightRow}
                onDoubleClick={() => (!showCheckbox && !showCheckboxMerge ? this.openItem(id) : void 0)}
                onMouseEnter={() => this.onRowEnter()}
                onMouseLeave={() => this.onRowLeave()}
            >
                {showCheckbox && (
                    <td>
                        <input type="checkbox" checked={checked} onChange={() => this.setCheckedContact(id)} />
                    </td>
                )}
                {showCheckboxMerge && (
                    <td>
                        {!blockSelecting && (
                            <input type="checkbox" checked={checked} onChange={() => this.setCheckedContact(id)} />
                        )}
                    </td>
                )}
                <td className="hidden-xs">{number}</td>
                <td className="hidden-xs hidden-sm">{typeName} </td>
                <td>{fullName}</td>
                <td className="hidden-xs">{streetAndNumber}</td>
                <td className="hidden-xs">{postalCode}</td>
                <td className="hidden-xs" title={'Buurt: ' + (areaName ? areaName : 'onbekend')}>
                    {city}
                </td>
                {/*<td className="hidden-xs">{areaName}</td>*/}
                <td className="hidden-xs">{emailAddress}</td>
                <td> {phoneNumber}</td>
                {this.props.dataControleType === 'zelfde-iban' ? <td className="hidden-xs">{iban}</td> : ''}
                {this.props.dataControleType === 'zelfde-btwnummer' ? <td className="hidden-xs">{vatNumber}</td> : ''}
                {this.props.dataControleType === 'zelfde-kvknummer' ? (
                    <td className="hidden-xs">{chamberOfCommerceNumber}</td>
                ) : (
                    ''
                )}
                <td className="hidden-xs hidden-sm">{moment(createdAt).format('DD-MM-Y')}</td>
                <td>
                    {this.state.showActionButtons ? (
                        <a role="button" onClick={() => this.openItem(id)}>
                            <Icon className="mybtn-success" size={14} icon={pencil} />
                        </a>
                    ) : (
                        ''
                    )}
                    {this.state.showActionButtons ? (
                        <>
                            {typeId === 'organisation' && permissions && permissions.deleteOrganisation && (
                                <a role="button" onClick={this.props.showDeleteItemModal.bind(this, id, fullName)}>
                                    <Icon className="mybtn-danger" size={14} icon={trash} />
                                </a>
                            )}
                            {typeId === 'person' && permissions && permissions.deletePerson && (
                                <a role="button" onClick={this.props.showDeleteItemModal.bind(this, id, fullName)}>
                                    <Icon className="mybtn-danger" size={14} icon={trash} />
                                </a>
                            )}
                        </>
                    ) : (
                        ''
                    )}
                </td>
            </tr>
        );
    }
}

function mapStateToProps(state) {
    return {
        statuses: state.statuses,
        types: state.types,
        permissions: state.meDetails.permissions,
    };
}

const mapDispatchToProps = dispatch => ({
    setCheckedContact: id => {
        dispatch(setCheckedContact(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsListItem);
