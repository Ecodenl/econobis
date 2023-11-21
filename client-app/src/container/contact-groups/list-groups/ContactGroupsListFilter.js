import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import 'react-day-picker/lib/style.css';

import {
    setFilterContactGroupName,
    setFilterContactGroupStatus,
    setFilterContactGroupTypeId,
} from '../../../actions/contact/ContactGroupsFiltersActions';

const ContactGroupsListFilter = props => {
    const onNameChange = e => {
        props.setFilterContactGroupName(e.target.value);
    };

    const onStatusChange = e => {
        props.setFilterContactGroupStatus(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onTypeChange = e => {
        props.setFilterContactGroupTypeId(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    return (
        <tr className="thead-filter">
            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.name.data}
                    onChange={onNameChange}
                />
            </th>
            {props.useLaposta ? <th /> : null}
            <th />

            <th>
                <select className="form-control input-sm" value={props.filters.status.data} onChange={onStatusChange}>
                    <option />
                    <option key={1} value={0}>
                        {'Open'}
                    </option>
                    <option key={2} value={1}>
                        {'Gesloten'}
                    </option>
                </select>
            </th>
            <th className="hidden-xs hidden-sm">
                <select className="form-control input-sm" value={props.filters.typeId.data} onChange={onTypeChange}>
                    <option />
                    {props.contactGroupTypes.map(contactGroupType => {
                        return (
                            <option key={contactGroupType.id} value={contactGroupType.id}>
                                {contactGroupType.name}
                            </option>
                        );
                    })}
                </select>
            </th>
            <th />
            <th />
        </tr>
    );
};

const mapStateToProps = state => ({
    filters: state.contactGroups.filters,
    contactGroupTypes: state.systemData.contactGroupTypes,
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setFilterContactGroupName,
            setFilterContactGroupStatus,
            setFilterContactGroupTypeId,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactGroupsListFilter);
