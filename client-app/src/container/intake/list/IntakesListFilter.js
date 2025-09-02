import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import 'react-day-picker/lib/style.css';

import {
    setIntakeStartDateFilter,
    setIntakeEndDateFilter,
    setFilterFullName,
    setFilterIntakeAddress,
    setFilterIntakeAreaName,
    setFilterIntakeCampaign,
    setFilterMeasureRequested,
    setFilterIntakeSource,
    setFilterIntakeStatus,
} from '../../../actions/intake/IntakesFiltersActions';
import DataTableFilterDateStartEnd from '../../../components/dataTable/DataTableFilterDateStartEnd';

const IntakesListFilter = props => {
    const onIntakeStartDateChange = selectedDay => {
        if (selectedDay === undefined) {
            props.setIntakeStartDateFilter('');
        } else {
            props.setIntakeStartDateFilter(moment(selectedDay).format('Y-MM-DD'));
        }
    };
    const onIntakeEndDateChange = selectedDay => {
        if (selectedDay === undefined) {
            props.setIntakeEndDateFilter('');
        } else {
            props.setIntakeEndDateFilter(moment(selectedDay).format('Y-MM-DD'));
        }
    };

    const onFullNameChange = e => {
        props.setFilterFullName(e.target.value);
    };

    const onAddressChange = e => {
        props.setFilterIntakeAddress(e.target.value);
    };

    const onAreaNameChange = e => {
        props.setFilterIntakeAreaName(e.target.value);
    };

    const onCampaignChange = e => {
        props.setFilterIntakeCampaign(e.target.value);
    };

    const onMeasureRequestedChange = e => {
        props.setFilterMeasureRequested(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onIntakeSourceChange = e => {
        props.setFilterIntakeSource(e.target.value);

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
                    {/*<input type="checkbox" value={props.checkedAllCheckboxes} onChange={props.toggleCheckedAll} />*/}
                    <input type="checkbox" onChange={props.toggleCheckedAll} />
                </td>
            )}
            <DataTableFilterDateStartEnd
                startDate={props.filters.createdAtStart.data && props.filters.createdAtStart.data}
                endDate={props.filters.createdAtEnd.data && props.filters.createdAtEnd.data}
                onChangeActionStart={onIntakeStartDateChange}
                onChangeActionEnd={onIntakeEndDateChange}
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
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.areaName.data}
                    onChange={onAreaNameChange}
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
                <select
                    className="form-control input-sm"
                    value={props.filters.intakeSource.data}
                    onChange={onIntakeSourceChange}
                >
                    <option />
                    {props.intakeSources
                        .filter(intakeSource => intakeSource.visible === 1)
                        .map(intakeSource => {
                            return (
                                <option key={intakeSource.id} value={intakeSource.id}>
                                    {intakeSource.name_custom ? intakeSource.name_custom : intakeSource.name}
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
            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.campaign.data}
                    onChange={onCampaignChange}
                />
            </th>
            <th />
        </tr>
    );
};

const mapStateToProps = state => ({
    filters: state.intakes.filters,
    intakeSources: state.systemData.intakeSources,
    intakeStatuses: state.systemData.intakeStatuses,
    measureCategories: state.systemData.measureCategories,
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setIntakeStartDateFilter,
            setIntakeEndDateFilter,
            setFilterFullName,
            setFilterIntakeAddress,
            setFilterIntakeAreaName,
            setFilterIntakeCampaign,
            setFilterMeasureRequested,
            setFilterIntakeSource,
            setFilterIntakeStatus,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(IntakesListFilter);
