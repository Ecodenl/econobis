import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import {
    setFilterBuildingType,
    clearFilterHousingFiles,
    setFilterFullName,
    setFilterPostalCode,
    setFilterCity,
    setFilterHousingFileAddress,
    setFilterHousingFileEnergyLabel,
    setHousingFileDateFilter,
    setFilterIsHouseForSale,
    setFilterBuildYear,
} from '../../../actions/housing-file/HousingFilesFiltersActions';
import DataTableFilterDate from '../../../components/dataTable/DataTableFilterDate';

const HousingFilesListFilter = props => {
    const onHousingFileDateChange = selectedDay => {
        if (selectedDay === undefined) {
            props.setHousingFileDateFilter('');
        } else {
            props.setHousingFileDateFilter(moment(selectedDay).format('Y-MM-DD'));
        }
    };

    const onAddressChange = e => {
        props.setFilterHousingFileAddress(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onFullNameChange = e => {
        props.setFilterFullName(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onPostalCodeChange = e => {
        props.setFilterPostalCode(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onCityChange = e => {
        props.setFilterCity(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onBuildingTypeChange = e => {
        props.setFilterBuildingType(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onEnergyLabelChange = e => {
        props.setFilterHousingFileEnergyLabel(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onIsHouseForSaleChange = e => {
        props.setFilterIsHouseForSale(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onBuildYearChange = e => {
        props.setFilterBuildYear(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    return (
        <tr className="thead-filter">
            <DataTableFilterDate
                value={props.filters.createdAt.data && props.filters.createdAt.data}
                onChangeAction={onHousingFileDateChange}
            />

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
                    value={props.filters.fullName.data}
                    onChange={onFullNameChange}
                />
            </th>

            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.buildYear.data}
                    onChange={onBuildYearChange}
                />
            </th>

            <th>
                <select
                    className="form-control input-sm"
                    value={props.filters.buildingTypeId.data}
                    onChange={onBuildingTypeChange}
                >
                    <option />
                    {props.buildingTypes.map(buildingType => {
                        return (
                            <option key={buildingType.id} value={buildingType.id}>
                                {buildingType.name}
                            </option>
                        );
                    })}
                </select>
            </th>

            <th>
                <select
                    className="form-control input-sm"
                    value={props.filters.isHouseForSale.data}
                    onChange={onIsHouseForSaleChange}
                >
                    <option />
                    <option key={'1'} value={'1'}>
                        Ja
                    </option>
                    <option key={'0'} value={'0'}>
                        Nee
                    </option>
                    <option key={'2'} value={'2'}>
                        Onbekend
                    </option>
                </select>
            </th>

            <th>
                <select
                    className="form-control input-sm"
                    value={props.filters.energyLabelId.data}
                    onChange={onEnergyLabelChange}
                >
                    <option />
                    {props.energyLabels.map(energyLabel => {
                        return (
                            <option key={energyLabel.id} value={energyLabel.id}>
                                {energyLabel.name}
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
    filters: state.housingFiles.filters,
    energyLabels: state.systemData.energyLabels,
    buildingTypes: state.systemData.buildingTypes,
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setFilterBuildingType,
            clearFilterHousingFiles,
            setFilterFullName,
            setFilterPostalCode,
            setFilterCity,
            setFilterHousingFileAddress,
            setFilterHousingFileEnergyLabel,
            setHousingFileDateFilter,
            setFilterIsHouseForSale,
            setFilterBuildYear,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(HousingFilesListFilter);
