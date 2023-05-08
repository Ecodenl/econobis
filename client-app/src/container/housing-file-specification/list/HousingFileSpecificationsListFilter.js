import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import moment from 'moment';

import {
    clearFilterHousingFileSpecifications,
    setFilterHousingFileSpecificationFullName,
    setFilterHousingFileSpecificationPostalCode,
    setFilterHousingFileSpecificationCity,
    setFilterHousingFileSpecificationAddress,
    setFilterHousingFileSpecificationMeasureCategoryName,
    setFilterHousingFileSpecificationMeasureName,
    setFilterHousingFileSpecificationStatusName,
    setFilterHousingFileSpecificationMeasureDate,
} from '../../../actions/housing-file-specification/HousingFileSpecificationsFiltersActions';
import DataTableFilterDate from '../../../components/dataTable/DataTableFilterDate';

const HousingFileSpecificationsListFilter = props => {
    const onAddressChange = e => {
        props.setFilterHousingFileSpecificationAddress(e.target.value);

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

    const onStatusNameChange = e => {
        props.setFilterHousingFileSpecificationStatusName(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onMeasureDateChange = selectedDay => {
        if (selectedDay === undefined) {
            props.setFilterHousingFileSpecificationMeasureDate('');
        } else {
            props.setFilterHousingFileSpecificationMeasureDate(moment(selectedDay).format('Y-MM-DD'));
        }
    };

    return (
        <tr className="thead-filter">
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
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.statusName.data}
                    onChange={onStatusNameChange}
                />
            </th>
            <th>
                <DataTableFilterDate
                    value={props.filters.measureDate.data && props.filters.measureDate.data}
                    onChangeAction={onMeasureDateChange}
                />
            </th>

            <th />
        </tr>
    );
};

const mapStateToProps = state => ({
    filters: state.housingFileSpecifications.filters,
    // energyLabels: state.systemData.energyLabels,
    // buildingTypes: state.systemData.buildingTypes,
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            clearFilterHousingFileSpecifications,
            setFilterHousingFileSpecificationFullName,
            setFilterHousingFileSpecificationPostalCode,
            setFilterHousingFileSpecificationCity,
            setFilterHousingFileSpecificationAddress,
            setFilterHousingFileSpecificationMeasureCategoryName,
            setFilterHousingFileSpecificationMeasureName,
            setFilterHousingFileSpecificationStatusName,
            setFilterHousingFileSpecificationMeasureDate,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(HousingFileSpecificationsListFilter);
