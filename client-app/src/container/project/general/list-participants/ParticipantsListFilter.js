import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment/moment';

import {
    clearFilterParticipantsProject,
    setFilterParticipantProjectAddress,
    setFilterParticipantProjectCity,
    setFilterParticipantProjectContactType,
    setFilterParticipantProjectAmountDefinitive,
    setFilterParticipantProjectParticipationsDefinitive,
    setFilterParticipantProjectDateRegister,
    setFilterParticipantProjectEnergySupplierId,
    setFilterParticipantProjectId,
    setFilterParticipantProjectName,
    setFilterParticipantMutationStatusId,
    setFilterParticipantProjectPostalCode,
} from '../../../../actions/participants-project/ParticipantsProjectFiltersActions';
import DataTableFilterDate from '../../../../components/dataTable/DataTableFilterDate';

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

    const onAmountDefinitiveChange = e => {
        props.setFilterParticipantProjectAmountDefinitive(e.target.value);
    };

    const onParticipationsDefinitiveChange = e => {
        props.setFilterParticipantProjectParticipationsDefinitive(e.target.value);
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

    const participantMutationStatusOptions = [
        ...props.participantMutationStatuses,
        { id: 'isTerminated', name: 'Beëindigd' },
    ];

    return (
        <tr className="thead-filter">
            <th>
                {props.showCheckboxList && props.checkedAll && (
                    <input type="checkbox" onChange={props.toggleCheckedAll} checked />
                )}
                {props.showCheckboxList && !props.checkedAll && (
                    <input type="checkbox" onChange={props.toggleCheckedAll} />
                )}
            </th>

            <th>
                {!props.showCheckboxList ? (
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
                ) : null}
            </th>

            <th>
                {!props.showCheckboxList ? (
                    <input
                        type="text"
                        className="form-control input-sm"
                        value={props.filters.name.data}
                        onChange={onNameChange}
                    />
                ) : null}
            </th>
            <th>
                {!props.showCheckboxList ? (
                    <input
                        type="text"
                        className="form-control input-sm"
                        value={props.filters.address.data}
                        onChange={onAddressChange}
                    />
                ) : null}
            </th>
            <th>
                {!props.showCheckboxList ? (
                    <input
                        type="text"
                        className="form-control input-sm"
                        value={props.filters.postalCode.data}
                        onChange={onPostalCodeChange}
                    />
                ) : null}
            </th>
            <th>
                {!props.showCheckboxList ? (
                    <input
                        type="text"
                        className="form-control input-sm"
                        value={props.filters.city.data}
                        onChange={onCityChange}
                    />
                ) : null}
            </th>
            {props.projectTypeRef === 'loan' ? (
                <th>
                    {!props.showCheckboxList ? (
                        <input
                            type="text"
                            className="form-control input-sm"
                            value={props.filters.amountDefinitive.data}
                            onChange={onAmountDefinitiveChange}
                        />
                    ) : null}
                </th>
            ) : (
                <th>
                    {!props.showCheckboxList ? (
                        <input
                            type="text"
                            className="form-control input-sm"
                            value={props.filters.participationsDefinitive.data}
                            onChange={onParticipationsDefinitiveChange}
                        />
                    ) : null}
                </th>
            )}
            <th>
                {!props.showCheckboxList ? (
                    <select
                        className="form-control input-sm"
                        value={props.filters.participantMutationStatusId.data}
                        onChange={onParticipationMutationStatusIdChange}
                    >
                        <option />
                        {participantMutationStatusOptions.map(participantMutationStatus => {
                            return (
                                <option key={participantMutationStatus.id} value={participantMutationStatus.id}>
                                    {participantMutationStatus.name}
                                </option>
                            );
                        })}
                    </select>
                ) : null}
            </th>

            {!props.showCheckboxList ? (
                <DataTableFilterDate
                    value={props.filters.dateRegister.data && props.filters.dateRegister.data}
                    onChangeAction={onDateRegisterChange}
                />
            ) : (
                <th />
            )}
            {props.projectTypeRef === 'postalcode_link_capital' ? (
                <th>
                    {!props.showCheckboxList ? (
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
                    ) : null}
                </th>
            ) : null}

            <th />
        </tr>
    );
};

const mapStateToProps = state => ({
    filters: state.participantsProject.filters,
    contactTypes: state.systemData.contactTypes,
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
            setFilterParticipantProjectAmountDefinitive,
            setFilterParticipantProjectParticipationsDefinitive,
            setFilterParticipantProjectDateRegister,
            setFilterParticipantProjectEnergySupplierId,
            setFilterParticipantProjectId,
            setFilterParticipantProjectName,
            setFilterParticipantMutationStatusId,
            setFilterParticipantProjectPostalCode,
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ParticipantsListFilter);
