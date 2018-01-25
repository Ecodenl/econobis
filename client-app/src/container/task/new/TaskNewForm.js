import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import InputText from '../../../components/form/InputText';
import InputSelect from '../../../components/form/InputSelect';
import InputDate from '../../../components/form/InputDate';
import ButtonText from '../../../components/button/ButtonText';
import InputMultiSelect from "../../../components/form/InputMultiSelect";
import InputReactSelect from "../../../components/form/InputReactSelect";

const TaskNewForm = props => {
    const {
        name,
        description,
        typeId,
        contactId,
        statusId,
        registrationId,
        contactGroupId,
        datePlanned,
        dateStarted,
        dateFinished,
        responsibleUserId,
        finishedById,
        opportunityId,
        campaignId,
    } = props.task;

    return (
        <form className="form-horizontal" onSubmit={props.handleSubmit}>
            <div className="row">
                <InputText
                    label="Naam"
                    name={"name"}
                    value={name}
                    onChangeAction={props.handleInputChange}
                    required={"required"}
                    error={props.errors.name}
                    maxLength={"50"}
                />
            </div>

            <div className="row">
                <div className="form-group col-sm-12">
                    <div className="row">
                        <div className="col-sm-3">
                            <label htmlFor="description" className="col-sm-12">Omschrijving</label>
                        </div>
                        <div className="col-sm-9">
                            <textarea name='description' value={description} onChange={props.handleInputChange}
                                      className="form-control input-sm"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row margin-10-top">
                <InputSelect
                    label={"Type"}
                    size={"col-sm-6"}
                    name={"typeId"}
                    options={props.taskTypes}
                    value={typeId}
                    onChangeAction={props.handleInputChange}
                    required={"required"}
                    error={props.errors.typeId}
                />
                <InputSelect
                    label={"Status"}
                    size={"col-sm-6"}
                    name={"statusId"}
                    options={props.taskStatuses}
                    value={statusId}
                    onChangeAction={props.handleInputChange}
                    required={"required"}
                    error={props.errors.statusId}
                />
            </div>

            <div className="row">
                <InputReactSelect
                    label={"Contact"}
                    name={"contactId"}
                    options={props.contacts}
                    value={contactId}
                    onChangeAction={props.handleReactSelectChange}
                    optionName={'fullName'}
                    multi={false}
                />
                <InputReactSelect
                    label={"Campagne"}
                    name={"campaignId"}
                    options={props.campaigns}
                    value={campaignId}
                    onChangeAction={props.handleReactSelectChange}
                    multi={false}
                />

            </div>

            <div className="row">
                <InputReactSelect
                    label={"Aanmelding"}
                    size={"col-sm-6"}
                    name={"registrationId"}
                    options={props.registrations}
                    value={registrationId}
                    onChangeAction={props.handleReactSelectChange}
                    multi={false}
                />
                <InputReactSelect
                    label={"Kans"}
                    size={"col-sm-6"}
                    name={"opportunityId"}
                    options={props.opportunities}
                    value={opportunityId}
                    onChangeAction={props.handleReactSelectChange}
                    multi={false}
                />
            </div>

            <div className="row">
                <InputReactSelect
                    label={"Groep"}
                    size={"col-sm-6"}
                    name={"contactGroupId"}
                    options={props.contactGroups}
                    value={contactGroupId}
                    onChangeAction={props.handleReactSelectChange}
                    multi={false}
                />
            </div>

            <div className="row margin-10-top">
                <InputDate
                    label="Plan datum"
                    size={"col-sm-6"}
                    name="datePlanned"
                    value={datePlanned}
                    onChangeAction={props.handleChangeDatePlanned}

                />
                <InputDate
                    label="Datum gestart"
                    size={"col-sm-6"}
                    name="dateStarted"
                    value={dateStarted}
                    onChangeAction={props.handleChangeStartedDate}
                />
            </div>

            <div className="row">
                <InputDate
                    label="Datum gereed"
                    size={"col-sm-6"}
                    name="dateFinished"
                    value={dateFinished}
                    onChangeAction={props.handleChangeFinishedDate}

                />
                <InputSelect
                    label={"Afgerond door"}
                    size={"col-sm-6"}
                    name={"finishedById"}
                    options={props.users}
                    value={finishedById}
                    onChangeAction={props.handleInputChange}
                    optionName={'fullName'}
                />
            </div>

            <div className="row">
                <InputSelect
                    label={"Verantwoordelijke"}
                    size={"col-sm-6"}
                    name={"responsibleUserId"}
                    options={props.users}
                    value={responsibleUserId}
                    onChangeAction={props.handleInputChange}
                    optionName={'fullName'}
                    required={"required"}
                    error={props.errors.responsibleUserId}
                />
            </div>

            <div className="row margin-10-top">
                <InputText
                    label={"Gemaakt op"}
                    name={"createdAt"}
                    value={ moment().format('DD-MM-Y') }
                    readOnly={true}
                />
                <InputText
                    label={"Gemaakt door"}
                    name={"createdBy"}
                    value={ props.meDetails.fullName}
                    readOnly={true}
                />
            </div>

            <div className="panel-footer">
                <div className="pull-right btn-group" role="group">
                    <ButtonText buttonText={"Opslaan"} onClickAction={props.handleSubmit}/>
                </div>
            </div>
        </form>
    );
};

const mapStateToProps = (state) => {
    return {
        meDetails: state.meDetails,
        permissions: state.systemData.permissions,
        taskStatuses: state.systemData.taskStatuses,
        taskTypes: state.systemData.taskTypes,
        users: state.systemData.users,
    };
};

export default connect(mapStateToProps, null)(TaskNewForm);
