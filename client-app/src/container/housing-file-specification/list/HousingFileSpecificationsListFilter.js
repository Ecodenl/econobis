import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import {
    clearFilterHousingFileSpecifications,
    setFilterHousingFileSpecificationTypeBrand,
    setFilterHousingFileSpecificationFullName,
    setFilterHousingFileSpecificationPostalCode,
    setFilterHousingFileSpecificationCity,
    setFilterHousingFileSpecificationAddress,
    setFilterHousingFileSpecificationMeasureCategoryName,
    setFilterHousingFileSpecificationMeasureName,
    setFilterHousingFileSpecificationStatus,
    setFilterHousingFileSpecificationMeasureDateStart,
    setFilterHousingFileSpecificationMeasureDateEnd,
} from '../../../actions/housing-file-specification/HousingFileSpecificationsFiltersActions';
import DataTableFilterDateStartEndTwoRows from '../../../components/dataTable/DataTableFilterDateStartEndTwoRows';

const HousingFileSpecificationsListFilter = props => {
    const onAddressChange = e => {
        props.setFilterHousingFileSpecificationAddress(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onTypeBrandChange = e => {
        props.setFilterHousingFileSpecificationTypeBrand(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onFullNameChange = e => {
        props.setFilterHousingFileSpecificationFullName(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onPostalCodeChange = e => {
        props.setFilterHousingFileSpecificationPostalCode(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onCityChange = e => {
        props.setFilterHousingFileSpecificationCity(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onMeasureCategoryNameChange = e => {
        props.setFilterHousingFileSpecificationMeasureCategoryName(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onMeasureNameChange = e => {
        props.setFilterHousingFileSpecificationMeasureName(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onStatusChange = e => {
        props.setFilterHousingFileSpecificationStatus(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onMeasureDateStartChange = selectedDay => {
        if (selectedDay === undefined) {
            props.setFilterHousingFileSpecificationMeasureDateStart('');
        } else {
            props.setFilterHousingFileSpecificationMeasureDateStart(moment(selectedDay).format('Y-MM-DD'));
        }
    };
    const onMeasureDateEndChange = selectedDay => {
        if (selectedDay === undefined) {
            props.setFilterHousingFileSpecificationMeasureDateEnd('');
        } else {
            props.setFilterHousingFileSpecificationMeasureDateEnd(moment(selectedDay).format('Y-MM-DD'));
        }
    };

    return (
        <tr className="thead-filter">
            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.typeBrand.data}
                    onChange={onTypeBrandChange}
                />
            </th>
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
                    value={props.filters.postalCode.data}
                    onChange={onPostalCodeChange}
                />
            </th>
            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.city.data}
                    onChange={onCityChange}
                />
            </th>
            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.measureCategoryName.data}
                    onChange={onMeasureCategoryNameChange}
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
                <select className="form-control input-sm" value={props.filters.statusId.data} onChange={onStatusChange}>
                    <option />
                    {props.housingFileSpecificationStatuses.map(status => {
                        return (
                            <option key={status.id} value={status.id}>
                                {status.name}
                            </option>
                        );
                    })}
                </select>
            </th>
            <DataTableFilterDateStartEndTwoRows
                startDate={props.filters.measureDateStart.data && props.filters.measureDateStart.data}
                endDate={props.filters.measureDateEnd.data && props.filters.measureDateEnd.data}
                onChangeActionStart={onMeasureDateStartChange}
                onChangeActionEnd={onMeasureDateEndChange}
            />

            <th />
        </tr>
    );
};

const mapStateToProps = state => ({
    filters: state.housingFileSpecifications.filters,
    housingFileSpecificationStatuses: state.systemData.housingFileSpecificationStatuses,
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            clearFilterHousingFileSpecifications,
            setFilterHousingFileSpecificationTypeBrand,
            setFilterHousingFileSpecificationFullName,
            setFilterHousingFileSpecificationPostalCode,
            setFilterHousingFileSpecificationCity,
            setFilterHousingFileSpecificationAddress,
            setFilterHousingFileSpecificationMeasureCategoryName,
            setFilterHousingFileSpecificationMeasureName,
            setFilterHousingFileSpecificationStatus,
            setFilterHousingFileSpecificationMeasureDateStart,
            setFilterHousingFileSpecificationMeasureDateEnd,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(HousingFileSpecificationsListFilter);
