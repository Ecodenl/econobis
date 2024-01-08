import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import {
    setNumberFilter,
    setTypeFilter,
    setFullNameFilter,
    setEmailAddressFilter,
    setStatusFilter,
    setCreatedAtFilter,
} from '../../../actions/contact/ContactsFiltersActions';
import DataTableFilterDate from '../../../components/dataTable/DataTableFilterDate';

const ContactsListFilter = props => {
    const onNumberChange = e => {
        props.setNumberFilter(e.target.value);
    };

    const onTypeChange = e => {
        props.setTypeFilter(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onFullNameChange = e => {
        props.setFullNameFilter(e.target.value);
    };

    const onEmailAddressChange = e => {
        props.setEmailAddressFilter(e.target.value);
    };

    const onStatusChange = e => {
        props.setStatusFilter(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onCreatedAtChange = selectedDay => {
        if (selectedDay === undefined) {
            props.setCreatedAtFilter('');
        } else {
            props.setCreatedAtFilter(moment(selectedDay).format('Y-MM-DD'));
        }
    };

    return (
        <tr className="thead-filter">
            {props.showCheckbox && (
                <td>
                    <input type="checkbox" value={props.checkedAllCheckboxes} onChange={props.selectAllCheckboxes} />
                </td>
            )}
            <th className="hidden-xs">
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.number.data}
                    onChange={onNumberChange}
                />
            </th>
            <th className="hidden-xs hidden-sm">
                <select className="form-control input-sm" value={props.filters.typeId.data} onChange={onTypeChange}>
                    <option />
                    {props.contactTypes.map(contactType => {
                        return (
                            <option key={contactType.id} value={contactType.id}>
                                {contactType.name}
                            </option>
                        );
                    })}
                </select>
            </th>
            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.fullName.data}
                    onChange={onFullNameChange}
                />
            </th>
            {/*<th></th>*/}
            <th className="hidden-xs">
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.emailAddress.data}
                    onChange={onEmailAddressChange}
                />
            </th>
            <DataTableFilterDate
                value={props.filters.createdAt.data && props.filters.createdAt.data}
                onChangeAction={onCreatedAtChange}
            />
            <th />
        </tr>
    );
};

const mapStateToProps = state => ({
    filters: state.contacts.filters,
    contactStatuses: state.systemData.contactStatuses,
    contactTypes: state.systemData.contactTypes,
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setNumberFilter,
            setTypeFilter,
            setFullNameFilter,
            setEmailAddressFilter,
            setStatusFilter,
            setCreatedAtFilter,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsListFilter);
