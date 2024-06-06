import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import {
    setNumberFilter,
    setTypeFilter,
    setFullNameFilter,
    setStreetAndNumberFilter,
    setPostalCodeFilter,
    setCityFilter,
    setEmailAddressFilter,
    setPhoneNumberFilter,
    setIbanFilter,
    setVatNumberFilter,
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

    const onStreetAndNumberChange = e => {
        props.setStreetAndNumberFilter(e.target.value);
    };

    const onPostalCodeChange = e => {
        props.setPostalCodeFilter(e.target.value);
    };

    const onCityChange = e => {
        props.setCityFilter(e.target.value);
    };

    const onEmailAddressChange = e => {
        props.setEmailAddressFilter(e.target.value);
    };

    const onPhoneNumberChange = e => {
        props.setPhoneNumberFilter(e.target.value);
    };

    const onIbanChange = e => {
        props.setIbanFilter(e.target.value);
    };

    const onVatNumberChange = e => {
        props.setVatNumberFilter(e.target.value);
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
            {props.showCheckboxMerge && <td />}
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
            <th className="hidden-xs">
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.streetAndNumber.data}
                    onChange={onStreetAndNumberChange}
                />
            </th>
            <th className="hidden-xs">
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.postalCode.data}
                    onChange={onPostalCodeChange}
                />
            </th>
            <th className="hidden-xs">
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.city.data}
                    onChange={onCityChange}
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
            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.phoneNumber.data}
                    onChange={onPhoneNumberChange}
                />
            </th>
            {props.dataControleType === 'zelfde-btwnummer' ? (
                <th>
                    <input
                        type="text"
                        className="form-control input-sm"
                        value={props.filters.vatNumber.data}
                        onChange={onVatNumberChange}
                    />
                </th>
            ) : (
                ''
            )}
            {props.dataControleType === 'zelfde-iban' ? (
                <th>
                    <input
                        type="text"
                        className="form-control input-sm"
                        value={props.filters.iban.data}
                        onChange={onIbanChange}
                    />
                </th>
            ) : (
                ''
            )}
            <DataTableFilterDate
                value={props.filters.createdAt.data && props.filters.createdAt.data}
                onChangeAction={onIbanChange}
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
            setStreetAndNumberFilter,
            setPostalCodeFilter,
            setCityFilter,
            setEmailAddressFilter,
            setPhoneNumberFilter,
            setIbanFilter,
            setStatusFilter,
            setCreatedAtFilter,
            setVatNumberFilter,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsListFilter);
