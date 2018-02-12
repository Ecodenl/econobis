import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import {
    setFilterBuildingType,
    clearFilterHousingFiles,
    setFilterFullName,
    setFilterHousingFileAddress,
    setFilterHousingFileEnergyLabel,
    setHousingFileDateFilter
} from '../../../actions/housing-file/HousingFilesFiltersActions';
import DataTableFilterDate from "../../../components/dataTable/DataTableFilterDate";

const HousingFilesListFilter = props => {
    const onHousingFileDateChange = (selectedDay) => {
        if(selectedDay === undefined){
            props.setHousingFileDateFilter('');
        }else{
            props.setHousingFileDateFilter(moment(selectedDay).format('Y-MM-DD'));
        }
    };

    const onAddressChange = (e) => {
        props.setFilterHousingFileAddress(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };


    const onFullNameChange = (e) => {
        props.setFilterFullName(e.target.value);
    };

    const onBuildingTypeChange = (e) => {
        props.setFilterBuildingType(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onEnergyLabelChange = (e) => {
        props.setFilterHousingFileEnergyLabel(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    return (
        <tr className="thead-filter">

            <DataTableFilterDate value={ props.filters.createdAt.data && props.filters.createdAt.data } onChangeAction={onHousingFileDateChange} />

            <th><input type="text" className="form-control input-sm" value={ props.filters.address.data} onChange={onAddressChange} /></th>
            <th><input type="text" className="form-control input-sm" value={ props.filters.fullName.data} onChange={onFullNameChange} /></th>

            <th>
                <select className="form-control input-sm" value={ props.filters.buildingType.data } onChange={onBuildingTypeChange}>
                    <option/>
                    {
                        props.buildingTypes.map((buildingType) => {
                            return <option key={buildingType.id } value={ buildingType.id }>{ buildingType.name }</option>
                        })
                    }
                </select>
            </th>

            <th>
                <select className="form-control input-sm" value={ props.filters.energyLabel.data } onChange={onEnergyLabelChange}>
                    <option/>
                    {
                        props.energyLabels.map((energyLabel) => {
                            return <option key={energyLabel.id } value={ energyLabel.id }>{ energyLabel.name }</option>
                        })
                    }
                </select>
            </th>

            <th/>
        </tr>
    );
};

const mapStateToProps = (state) => ({
    filters: state.housingFiles.filters,
    energyLabels: state.systemData.energyLabels,
    buildingTypes: state.systemData.buildingTypes,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setFilterBuildingType,
        clearFilterHousingFiles,
        setFilterFullName,
        setFilterHousingFileAddress,
        setFilterHousingFileEnergyLabel,
        setHousingFileDateFilter
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(HousingFilesListFilter);