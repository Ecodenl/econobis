import React from 'react';
import { connect } from 'react-redux';

import InputSelect from '../../../components/form/InputSelect';
import InputDate from '../../../components/form/InputDate';
import ButtonText from '../../../components/button/ButtonText';
import InputReactSelect from '../../../components/form/InputReactSelect';
import InputTime from '../../../components/form/InputTime';
import InputTextArea from '../../../components/form/InputTextArea';
import InputToggle from '../../../components/form/InputToggle';
import PanelHeader from '../../../components/panel/PanelHeader';
import TaskNewFormExtraConnections from './extra-connections/TaskNewFormExtraConnections';
import InputSelectGroup from '../../../components/form/InputSelectGroup';
import Icon from 'react-icons-kit';
import { angleRight } from 'react-icons-kit/fa/angleRight';
import { angleDown } from 'react-icons-kit/fa/angleDown';

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
        responsible,
    } = props.task;

    return (
        <form className="form-horizontal" onSubmit={props.handleSubmit}>
            <div className="row">
                <InputSelect
                    label={finished ? 'Type notitie' : 'Type taak'}
                    size={'col-sm-6'}
                    name={'typeId'}
                    options={props.taskTypes}
                    value={typeId}
                    onChangeAction={props.handleInputChange}
                />
            </div>

            <div className="row">
                <InputTextArea
                    label={finished ? 'Notitie' : 'Taak'}
                    name={'note'}
                    value={note}
                    onChangeAction={props.handleInputChange}
                    required={'required'}
                    error={props.errors.note}
                />
            </div>

            <div className="row margin-20-top">
                <InputDate
                    label="Datum afhandelen"
                    size={'col-sm-6'}
                    name="datePlannedStart"
                    value={datePlannedStart}
                    onChangeAction={props.handleInputChangeDate}
                />
                <InputTime
                    label={'Begin tijd'}
                    name={'startTimePlanned'}
                    value={startTimePlanned}
                    onChangeAction={props.handleInputChangeTime}
                />
            </div>

            <div className="row">
                <InputDate
                    label="Einddatum"
                    size={'col-sm-6'}
                    name="datePlannedFinish"
                    value={datePlannedFinish}
                    onChangeAction={props.handleInputChangeDate}
                />
                <InputTime
                    label={'Eind tijd'}
                    name={'endTimePlanned'}
                    value={endTimePlanned}
                    onChangeAction={props.handleInputChangeTime}
                />
            </div>

            <div className="row">
                <InputToggle
                    label={'Afgehandeld?'}
                    name={'finished'}
                    value={finished}
                    onChangeAction={props.handleInputChange}
                />
                <InputSelectGroup
                    label={'Verantwoordelijke'}
                    size={'col-sm-6'}
                    name={'responsible'}
                    optionsInGroups={[
                        { name: 'user', label: 'Gebruikers', options: props.users, optionName: 'fullName' },
                        { name: 'team', label: 'Teams', options: props.teams },
                    ]}
                    value={responsible}
                    onChangeAction={props.handleInputChange}
                    required={'required'}
                    error={props.errors.responsible}
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
                    label={'Afgerond door'}
                    name={'finishedById'}
                    options={props.users}
                    value={finishedById}
                    onChangeAction={props.handleInputChange}
                    optionName={'fullName'}
                />
            </div>

            <div className="row margin-20-top">
                <InputReactSelect
                    label={'Contact'}
                    name={'contactId'}
                    options={props.contacts}
                    value={contactId}
                    onChangeAction={props.handleReactSelectChange}
                    optionName={'fullName'}
                    isLoading={props.peekLoading.contacts}
                />
            </div>

            <div className="margin-10-top">
                <PanelHeader>
                    <div className="row" onClick={props.toggleExtraConnections}>
                        {props.showExtraConnections ? (
                            <Icon size={21} icon={angleDown} />
                        ) : (
                            <Icon size={21} icon={angleRight} />
                        )}
                        <span className="h5">Overige koppelingen</span>
                    </div>
                </PanelHeader>
                {props.showExtraConnections && (
                    <TaskNewFormExtraConnections
                        task={props.task}
                        intakes={props.intakes}
                        contactGroups={props.contactGroups}
                        opportunities={props.opportunities}
                        housingFiles={props.housingFiles}
                        campaigns={props.campaigns}
                        projects={props.projects}
                        participants={props.participants}
                        orders={props.orders}
                        invoices={props.invoices}
                        handleReactSelectChange={props.handleReactSelectChange}
                        peekLoading={props.peekLoading}
                    />
                )}
            </div>

            <div className="panel-footer">
                <div className="pull-right btn-group" role="group">
                    <ButtonText buttonText={'Opslaan'} onClickAction={props.handleSubmit} />
                </div>
            </div>
        </form>
    );
};

const mapStateToProps = state => {
    return {
        meDetails: state.meDetails,
        permissions: state.systemData.permissions,
        taskStatuses: state.systemData.taskStatuses,
        taskTypes: state.systemData.taskTypes,
        teams: state.systemData.teams,
        users: state.systemData.users,
    };
};

export default connect(mapStateToProps, null)(TaskNewForm);
