import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import 'react-day-picker/lib/style.css';

import {
    setFilterContactGroupName,
    setFilterContactGroupStatus
} from '../../../actions/contact/ContactGroupsFiltersActions';

const ContactGroupsListFilter = props => {

    const onNameChange = (e) => {
        props.setFilterContactGroupName(e.target.value);
    };

    const onStatusChange = (e) => {
        props.setFilterContactGroupStatus(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    return (
        <tr className="thead-filter">
            <th><input type="text" className="form-control input-sm" value={ props.filters.name.data} onChange={onNameChange} /></th>
            <th/>

            <th>
                <select className="form-control input-sm" value={ props.filters.status.data } onChange={onStatusChange}>
                    <option/>
                            <option key={1} value={0}>{ 'Open' }</option>
                            <option key={2} value={1}>{ 'Gesloten' }</option>
                </select>
            </th>

            <th/>
        </tr>
    );
};

const mapStateToProps = (state) => ({
    filters: state.contactGroups.filters,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setFilterContactGroupName,
        setFilterContactGroupStatus
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactGroupsListFilter);