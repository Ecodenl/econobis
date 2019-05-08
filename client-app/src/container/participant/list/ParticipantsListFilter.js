import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import {
    clearFilterParticipantsProject,
    setFilterParticipantProjectAddress,
    setFilterParticipantProjectCity,
    setFilterParticipantProjectContactType,
    setFilterParticipantProjectCurrentParticipations,
    setFilterParticipantProjectDateRegister,
    setFilterParticipantProjectEnergySupplierId,
    setFilterParticipantProjectId,
    setFilterParticipantProjectName,
    setFilterParticipantMutationStatusId,
    setFilterParticipantProjectPostalCode,
    setFilterProjectId,
} from '../../../actions/participants-project/ParticipantsProjectFiltersActions';
import DataTableFilterDate from '../../../components/dataTable/DataTableFilterDate';

const ParticipantsListFilter = props => {
    const onIdChange = e => {
        props.setFilterParticipantProjectId(e.target.value);
    };

    const onContactTypeChange = e => {
        props.setFilterParticipantProjectContactType(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onNameChange = e => {
        props.setFilterParticipantProjectName(e.target.value);
    };

    const onAddressChange = e => {
        props.setFilterParticipantProjectAddress(e.target.value);
    };

    const onPostalCodeChange = e => {
        props.setFilterParticipantProjectPostalCode(e.target.value);
    };

    const onCityChange = e => {
        props.setFilterParticipantProjectCity(e.target.value);
    };

    const onProjectIdChange = e => {
        props.setFilterProjectId(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onCurrentParticipationsChange = e => {
        props.setFilterParticipantProjectCurrentParticipations(e.target.value);
    };

    const onParticipationMutationStatusIdChange = e => {
        props.setFilterParticipantMutationStatusId(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onDateRegisterChange = selectedDay => {
        if (selectedDay === undefined) {
            props.setFilterParticipantProjectDateRegister('');
        } else {
            props.setFilterParticipantProjectDateRegister(moment(selectedDay).format('Y-MM-DD'));
        }
    };

    const onEnergySupplierIdChange = e => {
        props.setFilterParticipantProjectEnergySupplierId(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    return (
        <tr className="thead-filter">
            <th>
                {props.showCheckboxList && props.checkedAll && (
                    <input type="checkbox" onChange={props.toggleCheckedAll} checked />
                )}
                {props.showCheckboxList && !props.checkedAll && (
                    <input type="checkbox" onChange={props.toggleCheckedAll} />
                )}
                {!props.showCheckboxList && (
                    <input
                        type="text"
                        className="form-control input-sm"
                        value={props.filters.id.data}
                        onChange={onIdChange}
                    />
                )}
            </th>

            <th>
                <select
                    className="form-control input-sm"
                    value={props.filters.contactType.data}
                    onChange={onContactTypeChange}
                >
                    <option />
                    {props.contactTypes.map(contactType => {
                        return (
                            <option key={contactType.id} value={contactType.id}>
                                {contactType.name}
                            </option>
                        );
                    })}
                </select>
            </th>

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
                    value={props.filters.city.data}
                    onChange={onCityChange}
                />
            </th>

            <th>
                <select
                    className="form-control input-sm"
                    value={props.filters.projectId.data}
                    onChange={onProjectIdChange}
                >
                    <option />
                    {props.projects.map(project => {
                        return (
                            <option key={project.id} value={project.id}>
                                {project.name}
                            </option>
                        );
                    })}
                </select>
            </th>

            <th>
                <input
                    type="text"
                    className="form-control input-sm"
                    value={props.filters.currentParticipations.data}
                    onChange={onCurrentParticipationsChange}
                />
            </th>

            <th>
                <select
                    className="form-control input-sm"
                    value={props.filters.participantMutationStatusId.data}
                    onChange={onParticipationMutationStatusIdChange}
                >
                    <option />
                    {props.participantMutationStatuses.map(participantMutationStatus => {
                        return (
                            <option key={participantMutationStatus.id} value={participantMutationStatus.id}>
                                {participantMutationStatus.name}
                            </option>
                        );
                    })}
                </select>
            </th>

            <DataTableFilterDate
                value={props.filters.dateRegister.data && props.filters.dateRegister.data}
                onChangeAction={onDateRegisterChange}
            />

            <th>
                <select
                    className="form-control input-sm"
                    value={props.filters.energySupplierId.data}
                    onChange={onEnergySupplierIdChange}
                >
                    <option />
                    {props.energySuppliers.map(energySupplier => {
                        return (
                            <option key={energySupplier.id} value={energySupplier.id}>
                                {energySupplier.name}
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
    filters: state.participantsProject.filters,
    contactTypes: state.systemData.contactTypes,
    contactStatuses: state.systemData.contactStatuses,
    participantMutationStatuses: state.systemData.participantMutationStatuses,
    energySuppliers: state.systemData.energySuppliers,
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            clearFilterParticipantsProject,
            setFilterParticipantProjectAddress,
            setFilterParticipantProjectCity,
            setFilterParticipantProjectContactType,
            setFilterParticipantProjectCurrentParticipations,
            setFilterParticipantProjectDateRegister,
            setFilterParticipantProjectEnergySupplierId,
            setFilterParticipantProjectId,
            setFilterParticipantProjectName,
            setFilterParticipantMutationStatusId,
            setFilterParticipantProjectPostalCode,
            setFilterProjectId,
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ParticipantsListFilter);
