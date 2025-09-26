import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import 'react-day-picker/lib/style.css';

import {
    setFilterOpportunityAmountOfQuotationRequests,
    setFilterOpportunityCampaign,
    setFilterOpportunityAreaName,
    setFilterOpportunityCreatedAtStart,
    setFilterOpportunityCreatedAtEnd,
    setFilterOpportunityDesiredDateStart,
    setFilterOpportunityDesiredDateEnd,
    setFilterOpportunityMeasureCategory,
    setFilterOpportunityMeasureName,
    setFilterOpportunityName,
    setFilterOpportunityNumber,
    setFilterOpportunityAddress,
    setFilterOpportunityPostalCode,
    setFilterOpportunityStatusId,
} from '../../../actions/opportunity/OpportunitiesFiltersActions';
import DataTableFilterDateStartEndTwoRows from '../../../components/dataTable/DataTableFilterDateStartEndTwoRows';

const OpportunitiesListFilter = props => {
    const onNumberChange = e => {
        props.setFilterOpportunityNumber(e.target.value);
    };

    const onAddressChange = e => {
        props.setFilterOpportunityAddress(e.target.value);
    };

    const onPostalCodeChange = e => {
        props.setFilterOpportunityPostalCode(e.target.value);
    };

    const onCreatedAtStartChange = selectedDay => {
        if (selectedDay === undefined) {
            props.setFilterOpportunityCreatedAtStart('');
        } else {
            props.setFilterOpportunityCreatedAtStart(moment(selectedDay).format('Y-MM-DD'));
        }
    };

    const onCreatedAtEndChange = selectedDay => {
        if (selectedDay === undefined) {
            props.setFilterOpportunityCreatedAtEnd('');
        } else {
            props.setFilterOpportunityCreatedAtEnd(moment(selectedDay).format('Y-MM-DD'));
        }
    };

    const onDesiredDateStartChange = selectedDay => {
        if (selectedDay === undefined) {
            props.setFilterOpportunityDesiredDateStart('');
        } else {
            props.setFilterOpportunityDesiredDateStart(moment(selectedDay).format('Y-MM-DD'));
        }
    };

    const onDesiredDateEndChange = selectedDay => {
        if (selectedDay === undefined) {
            props.setFilterOpportunityDesiredDateEnd('');
        } else {
            props.setFilterOpportunityDesiredDateEnd(moment(selectedDay).format('Y-MM-DD'));
        }
    };

    const onNameChange = e => {
        props.setFilterOpportunityName(e.target.value);
    };

    const onMeasureCategoryChange = e => {
        props.setFilterOpportunityMeasureCategory(e.target.value);
    };

    const onMeasureNameChange = e => {
        props.setFilterOpportunityMeasureName(e.target.value);
    };

    const onCampaignChange = e => {
        props.setFilterOpportunityCampaign(e.target.value);
    };

    const onAreaNameChange = e => {
        props.setFilterOpportunityAreaName(e.target.value);
    };

    const onStatusIdChange = e => {
        props.setFilterOpportunityStatusId(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onAmountOfQuotationRequestsChange = e => {
        props.setFilterOpportunityAmountOfQuotationRequests(e.target.value);
    };

    return (
        <tr className="thead-filter">
            {props.showCheckbox && (
                <th width="3%">
                    <input type="checkbox" onChange={props.toggleCheckedAll} />
                </th>
            )}

            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.number.data}
                    onChange={onNumberChange}
                />
            </th>

            <DataTableFilterDateStartEndTwoRows
                startDate={props.filters.createdAtStart.data && props.filters.createdAtStart.data}
                endDate={props.filters.createdAtEnd.data && props.filters.createdAtEnd.data}
                onChangeActionStart={onCreatedAtStartChange}
                onChangeActionEnd={onCreatedAtEndChange}
            />
            <DataTableFilterDateStartEndTwoRows
                startDate={props.filters.desiredDateStart.data && props.filters.desiredDateStart.data}
                endDate={props.filters.desiredDateEnd.data && props.filters.desiredDateEnd.data}
                onChangeActionStart={onDesiredDateStartChange}
                onChangeActionEnd={onDesiredDateEndChange}
            />
            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.name.data}
                    onChange={onNameChange}
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
                    value={props.filters.postalCode.data}
                    onChange={onPostalCodeChange}
                />
            </th>
            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.measureCategory.data}
                    onChange={onMeasureCategoryChange}
                />
            </th>
            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.measureName.data}
                    onChange={onMeasureNameChange}
                />
            </th>
            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.campaign.data}
                    onChange={onCampaignChange}
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
                    value={props.filters.statusId.data}
                    onChange={onStatusIdChange}
                >
                    <option />
                    {props.opportunityStatusses.map(opportunityStatus => {
                        return (
                            <option key={opportunityStatus.id} value={opportunityStatus.id}>
                                {opportunityStatus.name}
                            </option>
                        );
                    })}
                </select>
            </th>
            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.amountOfQuotationRequests.data}
                    onChange={onAmountOfQuotationRequestsChange}
                />
            </th>
            <th />
            <th />
        </tr>
    );
};

const mapStateToProps = state => ({
    filters: state.opportunities.filters,
    opportunityStatusses: state.systemData.opportunityStatus,
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setFilterOpportunityAmountOfQuotationRequests,
            setFilterOpportunityCampaign,
            setFilterOpportunityAreaName,
            setFilterOpportunityCreatedAtStart,
            setFilterOpportunityCreatedAtEnd,
            setFilterOpportunityDesiredDateStart,
            setFilterOpportunityDesiredDateEnd,
            setFilterOpportunityMeasureCategory,
            setFilterOpportunityMeasureName,
            setFilterOpportunityName,
            setFilterOpportunityNumber,
            setFilterOpportunityAddress,
            setFilterOpportunityPostalCode,
            setFilterOpportunityStatusId,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(OpportunitiesListFilter);
