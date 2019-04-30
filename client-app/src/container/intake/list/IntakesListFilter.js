import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import {
    setIntakeDateFilter,
    setFilterFullName,
    setFilterIntakeAddress,
    setFilterMeasureRequested,
    setFilterIntakeStatus,
} from '../../../actions/intake/IntakesFiltersActions';
import DataTableFilterDate from '../../../components/dataTable/DataTableFilterDate';

const IntakesListFilter = props => {
    const onIntakeDateChange = selectedDay => {
        if (selectedDay === undefined) {
            props.setIntakeDateFilter('');
        } else {
            props.setIntakeDateFilter(moment(selectedDay).format('Y-MM-DD'));
        }
    };

    const onFullNameChange = e => {
        props.setFilterFullName(e.target.value);
    };

    const onAddressChange = e => {
        props.setFilterIntakeAddress(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onMeasureRequestedChange = e => {
        props.setFilterMeasureRequested(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onStatusChange = e => {
        props.setFilterIntakeStatus(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    return (
        <tr className="thead-filter">
            {props.showCheckbox && (
                <td>
                    <input type="checkbox" value={props.checkedAllCheckboxes} onChange={props.selectAllCheckboxes} />
                </td>
            )}
            <DataTableFilterDate
                value={props.filters.createdAt.data && props.filters.createdAt.data}
                onChangeAction={onIntakeDateChange}
            />

            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.fullName.data}
                    onChange={onFullNameChange}
                />
            </th>
            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.address.data}
                    onChange={onAddressChange}
                />
            </th>

            <th>
                <select
                    className="form-control input-sm"
                    value={props.filters.measureRequested.data}
                    onChange={onMeasureRequestedChange}
                >
                    <option />
                    {props.measureCategories.map(measureCategory => {
                        return (
                            <option key={measureCategory.id} value={measureCategory.id}>
                                {measureCategory.name}
                            </option>
                        );
                    })}
                </select>
            </th>

            <th>
                <select className="form-control input-sm" value={props.filters.statusId.data} onChange={onStatusChange}>
                    <option />
                    {props.intakeStatuses.map(intakeStatus => {
                        return (
                            <option key={intakeStatus.id} value={intakeStatus.id}>
                                {intakeStatus.name}
                            </option>
                        );
                    })}
                </select>
            </th>
            <th />
        </tr>
    );
};

const mapStateToProps = state => ({
    filters: state.intakes.filters,
    intakeStatuses: state.systemData.intakeStatuses,
    measureCategories: state.systemData.measureCategories,
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setIntakeDateFilter,
            setFilterFullName,
            setFilterIntakeAddress,
            setFilterMeasureRequested,
            setFilterIntakeStatus,
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IntakesListFilter);
