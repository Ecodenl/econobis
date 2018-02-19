import React from 'react';
import { connect } from 'react-redux';

import InputSelect from '../../../components/form/InputSelect';
import InputDate from '../../../components/form/InputDate';
import ButtonText from '../../../components/button/ButtonText';
import InputReactSelect from "../../../components/form/InputReactSelect";
import InputTime from "../../../components/form/InputTime";
import InputTextArea from "../../../components/form/InputTextarea";
import InputToggle from "../../../components/form/InputToggle";
import PanelHeader from "../../../components/panel/PanelHeader";
import TaskNewFormExtraConnections from './extra-connections/TaskNewFormExtraConnections';

const TaskNewForm = props => {
    const {
        note,
        typeId,
        contactId,
        finished,
        dateFinished,
        finishedById,
        datePlannedStart,
        datePlannedFinish,
        startTimePlanned,
        endTimePlanned,
        responsibleUserId,
    } = props.task;

    return (
        <form className="form-horizontal" onSubmit={props.handleSubmit}>
            <div className="row">
                <InputSelect
                    label={"Type taak"}
                    size={"col-sm-6"}
                    name={"typeId"}
                    options={props.taskTypes}
                    value={typeId}
                    onChangeAction={props.handleInputChange}
                    required={"required"}
                    error={props.errors.typeId}
                />
            </div>

            <div className="row">
                <InputTextArea
                    label={"Taak / notitie"}
                    name={"note"}
                    value={note}
                    onChangeAction={props.handleInputChange}
                    required={"required"}
                    error={props.errors.note}
                />
            </div>

            <div className="row margin-20-top">
                <InputDate
                    label="Datum afhandelen"
                    size={"col-sm-6"}
                    name="datePlannedStart"
                    value={datePlannedStart}
                    onChangeAction={props.handleInputChangeDate}

                />
                <InputTime
                    label={"Begin tijd"}
                    name={"startTimePlanned"}
                    value={startTimePlanned}
                    onChangeAction={props.handleInputChangeTime}
                />
            </div>

            <div className="row">
                <InputDate
                    label="Eind datum"
                    size={"col-sm-6"}
                    name="datePlannedFinish"
                    value={datePlannedFinish}
                    onChangeAction={props.handleInputChangeDate}
                />
                <InputTime
                    label={"Eind tijd"}
                    name={"endTimePlanned"}
                    value={endTimePlanned}
                    onChangeAction={props.handleInputChangeTime}
                />
            </div>

            <div className="row">
                <InputToggle
                    label={"Afgehandeld?"}
                    name={"finished"}
                    value={finished}
                    onChangeAction={props.handleInputChange}
                />
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

            <div className="row">
                <InputDate
                    label="Datum gereed"
                    name="dateFinished"
                    value={dateFinished}
                    onChangeAction={props.handleInputChangeDate}
                />
                <InputSelect
                    label={"Afgerond door"}
                    name={"finishedById"}
                    options={props.users}
                    value={finishedById}
                    onChangeAction={props.handleInputChange}
                    optionName={'fullName'}
                />
            </div>

            <div className="row margin-20-top">
                <InputReactSelect
                    label={"Contact"}
                    name={"contactId"}
                    options={props.contacts}
                    value={contactId}
                    onChangeAction={props.handleReactSelectChange}
                    optionName={'fullName'}
                    multi={false}
                />
            </div>

            <div className="margin-10-top">
                <PanelHeader>
                    <div className="row" onClick={props.toggleExtraConnections}>
                        {
                            props.showExtraConnections ?
                                <span className="glyphicon glyphicon-menu-down"/>
                                :
                                <span className="glyphicon glyphicon-menu-right" />
                        }
                        <span className="h5">Overige koppelingen</span>
                    </div>
                </PanelHeader>
                {
                    props.showExtraConnections &&
                        <TaskNewFormExtraConnections
                            task={props.task}
                            intakes={props.intakes}
                            contactGroups={props.contactGroups}
                            opportunities={props.opportunities}
                            campaigns={props.campaigns}
                            handleReactSelectChange={props.handleReactSelectChange}
                        />
                }
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
