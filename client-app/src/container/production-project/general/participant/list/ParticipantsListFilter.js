import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import {
    clearFilterParticipantsProductionProject,
    setFilterParticipantProductionProjectAddress,
    setFilterParticipantProductionProjectCity,
    setFilterParticipantProductionProjectContactType,
    setFilterParticipantProductionProjectCurrentParticipations,
    setFilterParticipantProductionProjectDateRegister,
    setFilterParticipantProductionProjectEnergySupplierId,
    setFilterParticipantProductionProjectId,
    setFilterParticipantProductionProjectName,
    setFilterParticipantProductionProjectParticipationStatusId,
    setFilterParticipantProductionProjectPostalCode,
    setFilterParticipantProductionProjectStatusId
} from '../../../../../actions/participants-production-project/ParticipantsProductionProjectFiltersActions';
import DataTableFilterDate from "../../../../../components/dataTable/DataTableFilterDate";

const ParticipantsListFilter = props => {
    const onIdChange = (e) => {
        props.setFilterParticipantProductionProjectId(e.target.value);
    };

    const onContactTypeChange = (e) => {
        props.setFilterParticipantProductionProjectContactType(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);

    };

    const onNameChange = (e) => {
        props.setFilterParticipantProductionProjectName(e.target.value);
    };

    const onAddressChange = (e) => {
        props.setFilterParticipantProductionProjectAddress(e.target.value);
    };

    const onPostalCodeChange = (e) => {
        props.setFilterParticipantProductionProjectPostalCode(e.target.value);
    };

    const onCityChange = (e) => {
        props.setFilterParticipantProductionProjectCity(e.target.value);
    };

    const onStatusIdChange = (e) => {
        props.setFilterParticipantProductionProjectStatusId(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);

    };

    const onCurrentParticipationsChange = (e) => {
        props.setFilterParticipantProductionProjectCurrentParticipations(e.target.value);
    };

    const onParticipationStatusIdChange = (e) => {
        props.setFilterParticipantProductionProjectParticipationStatusId(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);

    };

    const onDateRegisterChange = (selectedDay) => {
        if(selectedDay === undefined){
            props.setFilterParticipantProductionProjectDateRegister('');
        }else{
            props.setFilterParticipantProductionProjectDateRegister(moment(selectedDay).format('Y-MM-DD'));
        }
    };

    const onEnergySupplierIdChange = (e) => {
        props.setFilterParticipantProductionProjectEnergySupplierId(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);

    };

    return (
        <tr className="thead-filter">
            <th>
                {props.showCheckboxList && props.checkedAll && <input type="checkbox" onChange={props.toggleCheckedAll} checked/>}
                {props.showCheckboxList && !props.checkedAll && <input type="checkbox" onChange={props.toggleCheckedAll}/>}
                {!props.showCheckboxList && <input type="text" className="form-control input-sm" value={ props.filters.id.data} onChange={onIdChange} />}

            </th>

            <th>
                <select className="form-control input-sm" value={ props.filters.contactType.data } onChange={onContactTypeChange}>
                    <option/>
                    {
                        props.contactTypes.map((contactType) => {
                            return <option key={contactType.id } value={ contactType.id }>{ contactType.name }</option>
                        })
                    }
                </select>
            </th>

            <th><input type="text" className="form-control input-sm" value={ props.filters.name.data} onChange={onNameChange} /></th>
            <th><input type="text" className="form-control input-sm" value={ props.filters.address.data} onChange={onAddressChange} /></th>
            <th><input type="text" className="form-control input-sm" value={ props.filters.postalCode.data} onChange={onPostalCodeChange} /></th>
            <th><input type="text" className="form-control input-sm" value={ props.filters.city.data} onChange={onCityChange} /></th>

            <th><input type="text" className="form-control input-sm" value={ props.filters.currentParticipations.data} onChange={onCurrentParticipationsChange} /></th>

            <th>
                <select className="form-control input-sm" value={ props.filters.participationStatusId.data } onChange={onParticipationStatusIdChange}>
                    <option/>
                    {
                        props.participantProductionProjectStatuses.map((participantProductionProjectStatus) => {
                            return <option key={participantProductionProjectStatus.id } value={ participantProductionProjectStatus.id }>{ participantProductionProjectStatus.name }</option>
                        })
                    }
                </select>
            </th>

            <DataTableFilterDate value={ props.filters.dateRegister.data && props.filters.dateRegister.data } onChangeAction={onDateRegisterChange} />

            <th>
                <select className="form-control input-sm" value={ props.filters.energySupplierId.data } onChange={onEnergySupplierIdChange}>
                    <option/>
                    {
                        props.energySuppliers.map((energySupplier) => {
                            return <option key={energySupplier.id } value={ energySupplier.id }>{ energySupplier.name }</option>
                        })
                    }
                </select>
            </th>

            <th/>
        </tr>
    );
};

const mapStateToProps = (state) => ({
    filters: state.participantsProductionProject.filters,
    contactTypes: state.systemData.contactTypes,
    contactStatuses: state.systemData.contactStatuses,
    participantProductionProjectStatuses: state.systemData.participantProductionProjectStatus,
    energySuppliers: state.systemData.energySuppliers,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        clearFilterParticipantsProductionProject,
        setFilterParticipantProductionProjectAddress,
        setFilterParticipantProductionProjectCity,
        setFilterParticipantProductionProjectContactType,
        setFilterParticipantProductionProjectCurrentParticipations,
        setFilterParticipantProductionProjectDateRegister,
        setFilterParticipantProductionProjectEnergySupplierId,
        setFilterParticipantProductionProjectId,
        setFilterParticipantProductionProjectName,
        setFilterParticipantProductionProjectParticipationStatusId,
        setFilterParticipantProductionProjectPostalCode,
        setFilterParticipantProductionProjectStatusId
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantsListFilter);