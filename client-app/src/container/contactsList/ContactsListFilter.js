import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import { setCheckedContactAll } from '../../actions/ContactsActions';

import {
    setNumberFilter,
    setTypeFilter,
    setFullNameFilter,
    setStreetAndNumberFilter,
    setPostalCodeFilter,
    setCityFilter,
    setEmailAddressFilter,
    setPhoneNumberFilter,
    setStatusFilter,
    setCreatedAtFilter
} from '../../actions/ContactsFiltersActions';

const ContactsListFilter = props => {
    const onNumberChange = (e) => {
        props.setNumberFilter(e.target.value);
    };

    const onTypeChange = (e) => {
        props.setTypeFilter(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onFullNameChange = (e) => {
        props.setFullNameFilter(e.target.value);
    };

    const onStreetAndNumberChange = (e) => {
        props.setStreetAndNumberFilter(e.target.value);
    };

    const onPostalCodeChange = (e) => {
        props.setPostalCodeFilter(e.target.value);
    };

    const onCityChange = (e) => {
        props.setCityFilter(e.target.value);
    };

    const onEmailAddressChange = (e) => {
        props.setEmailAddressFilter(e.target.value);
    };

    const onPhoneNumberChange = (e) => {
        props.setPhoneNumberFilter(e.target.value);
    };

    const onStatusChange = (e) => {
        props.setStatusFilter(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onCreatedAtChange = (selectedDay) => {
        if(selectedDay === undefined){
            props.setCreatedAtFilter('');
        }else{
            props.setCreatedAtFilter(moment(selectedDay).format('Y-MM-DD'));
        }
    };

    return (
        <tr className="thead-filter">
            { props.showCheckbox && <td><input type="checkbox" value={ props.checkedAllCheckboxes } onChange={props.selectAllCheckboxes} /></td> }
            <th className="hidden-xs"><input type="text" className="form-control input-sm" value={ props.filters.number.data } onChange={onNumberChange} /></th>
            <th className="hidden-xs hidden-sm">
                <select className="form-control input-sm" value={ props.filters.typeId.data } onChange={onTypeChange}>
                    <option/>
                    { props.contactTypes.map((contactType) => {
                        return <option key={ contactType.id } value={ contactType.id }>{ contactType.name }</option>
                    }) }
                </select>
            </th>
            <th><input type="text" className="form-control input-sm" value={ props.filters.fullName.data} onChange={onFullNameChange} /></th>
            <th className="hidden-xs"><input type="text" className="form-control input-sm" value={ props.filters.streetAndNumber.data } onChange={onStreetAndNumberChange} /></th>
            <th className="hidden-xs"><input type="text" className="form-control input-sm" value={ props.filters.postalCode.data } onChange={onPostalCodeChange} /></th>
            <th className="hidden-xs"><input type="text" className="form-control input-sm" value={ props.filters.city.data } onChange={onCityChange} /></th>
            <th className="hidden-xs"><input type="text" className="form-control input-sm" value={ props.filters.emailAddress.data } onChange={onEmailAddressChange} /></th>
            <th><input type="text" className="form-control input-sm" value={ props.filters.phoneNumber.data } onChange={onPhoneNumberChange} /></th>
            <th className="hidden-xs hidden-sm">
                <select className="form-control input-sm" value={ props.filters.statusId.data } onChange={onStatusChange}>
                    <option/>
                    { props.contactStatuses.map((contactStatus) => {
                        return <option key={contactStatus.id } value={ contactStatus.id }>{ contactStatus.name }</option>
                    }) }
                </select>
            </th>
            <th className="DayPicker-overflow hidden-xs hidden-sm">
                <DayPickerInput className={"form-control input-sm"} value={ props.filters.createdAt.data && moment(props.filters.createdAt.data).format('DD-MM-Y') } onDayChange={onCreatedAtChange} />
            </th>
            <th/>
        </tr>
    );
};

const mapStateToProps = (state) => ({
    filters: state.contactsFilters,
    contactStatuses: state.systemData.contactStatuses,
    contactTypes: state.systemData.contactTypes,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setNumberFilter,
        setTypeFilter,
        setFullNameFilter,
        setStreetAndNumberFilter,
        setPostalCodeFilter,
        setCityFilter,
        setEmailAddressFilter,
        setPhoneNumberFilter,
        setStatusFilter,
        setCreatedAtFilter
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsListFilter);