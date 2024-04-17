import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import 'react-day-picker/lib/style.css';

import {
    setFilterQuotationRequestStatus,
    clearFilterQuotationRequests,
    setQuotationRequestAddressFilter,
    setQuotationRequestAreaNameFilter,
    setQuotationRequestCampaignFilter,
    setQuotationRequestContactFilter,
    setQuotationRequestCreatedAtStartFilter,
    setQuotationRequestCreatedAtEndFilter,
    setQuotationRequestDatePlannedFilter,
    setQuotationRequestDateRecordedFilter,
    setQuotationRequestDateReleasedFilter,
    setQuotationRequestMeasureFilter,
    setQuotationRequestOrganisationOrCoachFilter,
} from '../../../actions/quotation-request/QuotationRequestsFiltersActions';
import DataTableFilterDateStartEnd from '../../../components/dataTable/DataTableFilterDateStartEnd';
import DataTableFilterDate from '../../../components/dataTable/DataTableFilterDate';

const QuotationRequestsListFilter = props => {
    const onStatusChange = e => {
        props.setFilterQuotationRequestStatus(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onAddressChange = e => {
        props.setQuotationRequestAddressFilter(e.target.value);
    };

    const onAreaNameChange = e => {
        props.setQuotationRequestAreaNameFilter(e.target.value);
    };

    const onCampaignChange = e => {
        props.setQuotationRequestCampaignFilter(e.target.value);
    };

    const onContactChange = e => {
        props.setQuotationRequestContactFilter(e.target.value);
    };

    const onQuotationRequestCreatedAtStartChange = selectedDay => {
        if (selectedDay === undefined) {
            props.setQuotationRequestCreatedAtStartFilter('');
        } else {
            props.setQuotationRequestCreatedAtStartFilter(moment(selectedDay).format('Y-MM-DD'));
        }
    };
    const onQuotationRequestCreatedAtEndChange = selectedDay => {
        if (selectedDay === undefined) {
            props.setQuotationRequestCreatedAtEndFilter('');
        } else {
            props.setQuotationRequestCreatedAtEndFilter(moment(selectedDay).format('Y-MM-DD'));
        }
    };

    const onQuotationRequestDatePlannedChange = selectedDay => {
        if (selectedDay === undefined) {
            props.setQuotationRequestDatePlannedFilter('');
        } else {
            props.setQuotationRequestDatePlannedFilter(moment(selectedDay).format('Y-MM-DD'));
        }
    };

    const onQuotationRequestDateRecordedChange = selectedDay => {
        if (selectedDay === undefined) {
            props.setQuotationRequestDateRecordedFilter('');
        } else {
            props.setQuotationRequestDateRecordedFilter(moment(selectedDay).format('Y-MM-DD'));
        }
    };

    const onQuotationRequestDateReleasedChange = selectedDay => {
        if (selectedDay === undefined) {
            props.setQuotationRequestDateReleasedFilter('');
        } else {
            props.setQuotationRequestDateReleasedFilter(moment(selectedDay).format('Y-MM-DD'));
        }
    };

    const onMeasureChange = e => {
        props.setQuotationRequestMeasureFilter(e.target.value);
    };

    const onOrganisationOrCoachChange = e => {
        props.setQuotationRequestOrganisationOrCoachFilter(e.target.value);
    };

    return (
        <tr className="thead-filter">
            {props.showSelectQuotationRequests && (
                <th>
                    <input type="checkbox" onChange={props.toggleCheckedAll} />
                </th>
            )}
            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.organisationOrCoach.data}
                    onChange={onOrganisationOrCoachChange}
                />
            </th>
            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.contact.data}
                    onChange={onContactChange}
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
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.measure.data}
                    onChange={onMeasureChange}
                />
            </th>

            <DataTableFilterDateStartEnd
                startDate={props.filters.createdAtStart.data && props.filters.createdAtStart.data}
                endDate={props.filters.createdAtEnd.data && props.filters.createdAtEnd.data}
                onChangeActionStart={onQuotationRequestCreatedAtStartChange}
                onChangeActionEnd={onQuotationRequestCreatedAtEndChange}
            />
            <DataTableFilterDate
                value={props.filters.datePlanned.data && props.filters.datePlanned.data}
                onChangeAction={onQuotationRequestDatePlannedChange}
            />
            <DataTableFilterDate
                value={props.filters.dateRecorded.data && props.filters.dateRecorded.data}
                onChangeAction={onQuotationRequestDateRecordedChange}
            />

            <th>
                <select className="form-control input-sm" value={props.filters.statusId.data} onChange={onStatusChange}>
                    <option />
                    {props.quotationRequestStatus.map(status => {
                        return (
                            <option key={status.id} value={status.id}>
                                {status.opportunityActionName} - {status.name}
                            </option>
                        );
                    })}
                </select>
            </th>

            <DataTableFilterDate
                value={props.filters.dateReleased.data && props.filters.dateReleased.data}
                onChangeAction={onQuotationRequestDateReleasedChange}
            />
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
    filters: state.quotationRequests.filters,
    quotationRequestStatus: state.systemData.quotationRequestStatus,
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setFilterQuotationRequestStatus,
            clearFilterQuotationRequests,
            setQuotationRequestAddressFilter,
            setQuotationRequestAreaNameFilter,
            setQuotationRequestCampaignFilter,
            setQuotationRequestContactFilter,
            setQuotationRequestCreatedAtStartFilter,
            setQuotationRequestCreatedAtEndFilter,
            setQuotationRequestDatePlannedFilter,
            setQuotationRequestDateRecordedFilter,
            setQuotationRequestDateReleasedFilter,
            setQuotationRequestMeasureFilter,
            setQuotationRequestOrganisationOrCoachFilter,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(QuotationRequestsListFilter);
