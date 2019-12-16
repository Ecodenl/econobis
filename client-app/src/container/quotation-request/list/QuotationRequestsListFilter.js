import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import 'react-day-picker/lib/style.css';

import {
    setFilterQuotationRequestStatus,
    clearFilterQuotationRequests,
    setQuotationRequestAddressFilter,
    setQuotationRequestContactFilter,
    setQuotationRequestCreatedAtStartFilter,
    setQuotationRequestCreatedAtEndFilter,
    setQuotationRequestDateRecordedFilter,
    setQuotationRequestDateReleasedFilter,
    setQuotationRequestDateValidFilter,
    setQuotationRequestMeasureFilter,
    setQuotationRequestOrganisationFilter,
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

    const onQuotationRequestDateValidChange = selectedDay => {
        if (selectedDay === undefined) {
            props.setQuotationRequestDateValidFilter('');
        } else {
            props.setQuotationRequestDateValidFilter(moment(selectedDay).format('Y-MM-DD'));
        }
    };

    const onMeasureChange = e => {
        props.setQuotationRequestMeasureFilter(e.target.value);
    };

    const onOrganisationChange = e => {
        props.setQuotationRequestOrganisationFilter(e.target.value);
    };

    return (
        <tr className="thead-filter">
            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.organisation.data}
                    onChange={onOrganisationChange}
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
                value={props.filters.dateRecorded.data && props.filters.dateRecorded.data}
                onChangeAction={onQuotationRequestDateRecordedChange}
            />

            <th>
                <select className="form-control input-sm" value={props.filters.statusId.data} onChange={onStatusChange}>
                    <option />
                    {props.quotationRequestStatus.map(status => {
                        return (
                            <option key={status.id} value={status.id}>
                                {status.name}
                            </option>
                        );
                    })}
                </select>
            </th>

            <DataTableFilterDate
                value={props.filters.dateReleased.data && props.filters.dateReleased.data}
                onChangeAction={onQuotationRequestDateReleasedChange}
            />
            <DataTableFilterDate
                value={props.filters.dateValid.data && props.filters.dateValid.data}
                onChangeAction={onQuotationRequestDateValidChange}
            />

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
            setQuotationRequestContactFilter,
            setQuotationRequestCreatedAtStartFilter,
            setQuotationRequestCreatedAtEndFilter,
            setQuotationRequestDateRecordedFilter,
            setQuotationRequestDateReleasedFilter,
            setQuotationRequestDateValidFilter,
            setQuotationRequestMeasureFilter,
            setQuotationRequestOrganisationFilter,
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QuotationRequestsListFilter);
