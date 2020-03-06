import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');

import ContactsAPI from '../../../../api/contact/ContactsAPI';
import TaskDetailsAPI from '../../../../api/task/TaskDetailsAPI';
import { updateTask } from '../../../../actions/task/TaskDetailsActions';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import InputDate from '../../../../components/form/InputDate';
import validator from 'validator';
import IntakesAPI from '../../../../api/intake/IntakesAPI';
import ContactGroupAPI from '../../../../api/contact-group/ContactGroupAPI';
import OpportunitiesAPI from '../../../../api/opportunity/OpportunitiesAPI';
import CampaignsAPI from '../../../../api/campaign/CampaignsAPI';
import InputReactSelect from '../../../../components/form/InputReactSelect';
import InputTime from '../../../../components/form/InputTime';
import TaskDetailsFormGeneralEditExtraConnections from './extra-connections/TaskDetailsFormGeneralEditExtraConnections';
import InputTextArea from '../../../../components/form/InputTextarea';
import InputToggle from '../../../../components/form/InputToggle';
import PanelHeader from '../../../../components/panel/PanelHeader';
import InputSelectGroup from '../../../../components/form/InputSelectGroup';
import ProjectsAPI from '../../../../api/project/ProjectsAPI';
import HousingFilesAPI from '../../../../api/housing-file/HousingFilesAPI';
import ParticipantsProjectAPI from '../../../../api/participant-project/ParticipantsProjectAPI';
import OrdersAPI from '../../../../api/order/OrdersAPI';
import InvoicesAPI from '../../../../api/invoice/InvoicesAPI';

class TaskDetailsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        const {
            id,
            note,
            typeId,
            contactId,
            contact,
            finished,
            intakeId,
            campaignId,
            contactGroupId,
            housingFileId,
            projectId,
            participantId,
            datePlannedStart,
            datePlannedFinish,
            startTimePlanned,
            endTimePlanned,
            dateFinished,
            responsibleUserId,
            responsibleTeamId,
            finishedById,
            opportunityId,
            orderId,
            invoiceId,
        } = props.taskDetails;

        this.state = {
            contacts: contactId ? [{ id: contactId, fullName: contact.fullName }] : [],
            intakes: [],
            contactGroups: [],
            opportunities: [],
            campaigns: [],
            housingFiles: [],
            projects: [],
            participants: [],
            orders: [],
            invoices: [],
            task: {
                id,
                note,
                typeId: typeId ? typeId : '',
                contactId: contactId ? contactId : '',
                campaignId: campaignId ? campaignId : '',
                intakeId: intakeId ? intakeId : '',
                opportunityId: opportunityId ? opportunityId : '',
                contactGroupId: contactGroupId ? contactGroupId : '',
                housingFileId: housingFileId ? housingFileId : '',
                projectId: projectId ? projectId : '',
                participantId: participantId ? participantId : '',
                orderId: orderId ? orderId : '',
                invoiceId: invoiceId ? invoiceId : '',
                datePlannedStart: datePlannedStart ? datePlannedStart : '',
                datePlannedFinish: datePlannedFinish ? datePlannedFinish : '',
                startTimePlanned: startTimePlanned ? startTimePlanned : '',
                endTimePlanned: endTimePlanned ? endTimePlanned : '',
                finished: finished ? true : false,
                dateFinished: dateFinished ? dateFinished : '',
                finishedById: finishedById ? finishedById : '',
                responsibleUserId,
                responsibleTeamId,
                responsible: responsibleUserId ? 'user' + responsibleUserId : 'team' + responsibleTeamId,
            },
            errors: {
                note: false,
                responsible: false,
            },
            peekLoading: {
                contacts: true,
                intakes: true,
                contactGroups: true,
                opportunities: true,
                campaigns: true,
                housingFiles: true,
                projects: true,
                participants: true,
                orders: true,
                invoices: true,
            },
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
        this.handleInputChangeTime = this.handleInputChangeTime.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReactSelectChange = this.handleReactSelectChange.bind(this);
    }

    componentDidMount() {
        ContactsAPI.getContactsPeek().then(payload => {
            this.setState({
                contacts: payload,
                peekLoading: {
                    ...this.state.peekLoading,
                    contacts: false,
                },
            });
        });

        IntakesAPI.peekIntakes().then(payload => {
            this.setState({
                intakes: payload,
                peekLoading: {
                    ...this.state.peekLoading,
                    intakes: false,
                },
            });
        });

        ContactGroupAPI.peekContactGroups().then(payload => {
            this.setState({
                contactGroups: payload,
                peekLoading: {
                    ...this.state.peekLoading,
                    contactGroups: false,
                },
            });
        });

        OpportunitiesAPI.peekOpportunities().then(payload => {
            this.setState({
                opportunities: payload,
                peekLoading: {
                    ...this.state.peekLoading,
                    opportunities: false,
                },
            });
        });

        CampaignsAPI.peekCampaigns().then(payload => {
            this.setState({
                campaigns: payload,
                peekLoading: {
                    ...this.state.peekLoading,
                    campaigns: false,
                },
            });
        });

        HousingFilesAPI.peekHousingFiles().then(payload => {
            this.setState({
                housingFiles: payload,
                peekLoading: {
                    ...this.state.peekLoading,
                    housingFiles: false,
                },
            });
        });

        ProjectsAPI.peekProjects().then(payload => {
            this.setState({
                projects: payload,
                peekLoading: {
                    ...this.state.peekLoading,
                    projects: false,
                },
            });
        });

        ParticipantsProjectAPI.peekParticipantsProjects().then(payload => {
            this.setState({
                participants: payload,
                peekLoading: {
                    ...this.state.peekLoading,
                    participants: false,
                },
            });
        });

        OrdersAPI.peekOrders().then(payload => {
            this.setState({
                orders: payload,
                peekLoading: {
                    ...this.state.peekLoading,
                    orders: false,
                },
            });
        });

        InvoicesAPI.peekInvoices().then(payload => {
            this.setState({
                invoices: payload,
                peekLoading: {
                    ...this.state.peekLoading,
                    invoices: false,
                },
            });
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            task: {
                ...this.state.task,
                [name]: value,
            },
        });
    }

    handleReactSelectChange(selectedOption, name) {
        this.setState({
            ...this.state,
            task: {
                ...this.state.task,
                [name]: selectedOption,
            },
        });
    }

    handleInputChangeTime(value, name) {
        this.setState({
            ...this.state,
            task: {
                ...this.state.task,
                [name]: value,
            },
        });
    }

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            task: {
                ...this.state.task,
                [name]: value,
            },
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const { task } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(task.note)) {
            errors.note = true;
            hasErrors = true;
        }

        if (validator.isEmpty(task.responsible.toString())) {
            errors.responsible = true;
            hasErrors = true;
        }

        if (task.responsible.search('user') >= 0) {
            task.responsibleUserId = task.responsible.replace('user', '');
            task.responsibleTeamId = '';
        }

        if (task.responsible.search('team') >= 0) {
            task.responsibleUserId = '';
            task.responsibleTeamId = task.responsible.replace('team', '');
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            TaskDetailsAPI.updateTask(task).then(payload => {
                this.props.updateTask(payload.data.data);
                this.props.switchToView();
            });
    }

    render() {
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
        } = this.state.task;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputSelect
                        label={'Type taak'}
                        size={'col-sm-6'}
                        name={'typeId'}
                        options={this.props.taskTypes}
                        value={typeId}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputTextArea
                        label={'Taak / notitie'}
                        name={'note'}
                        value={note}
                        onChangeAction={this.handleInputChange}
                        required={'required'}
                        error={this.state.errors.note}
                    />
                </div>

                <div className="row margin-20-top">
                    <InputDate
                        label="Datum afhandelen"
                        size={'col-sm-6'}
                        name="datePlannedStart"
                        value={datePlannedStart}
                        onChangeAction={this.handleInputChangeDate}
                    />
                    <InputTime
                        label={'Begin tijd'}
                        name={'startTimePlanned'}
                        value={startTimePlanned}
                        onChangeAction={this.handleInputChangeTime}
                    />
                </div>

                <div className="row">
                    <InputDate
                        label="Einddatum"
                        size={'col-sm-6'}
                        name="datePlannedFinish"
                        value={datePlannedFinish}
                        onChangeAction={this.handleInputChangeDate}
                    />
                    <InputTime
                        label={'Eind tijd'}
                        name={'endTimePlanned'}
                        value={endTimePlanned}
                        onChangeAction={this.handleInputChangeTime}
                    />
                </div>

                <div className="row">
                    <InputToggle
                        label={'Afgehandeld?'}
                        name={'finished'}
                        value={finished}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputSelectGroup
                        label={'Verantwoordelijke'}
                        size={'col-sm-6'}
                        name={'responsible'}
                        optionsInGroups={[
                            { name: 'user', label: 'Gebruikers', options: this.props.users, optionName: 'fullName' },
                            { name: 'team', label: 'Teams', options: this.props.teams },
                        ]}
                        value={responsible}
                        onChangeAction={this.handleInputChange}
                        required={'required'}
                        error={this.state.errors.responsible}
                    />
                </div>

                <div className="row">
                    <InputDate
                        label="Datum gereed"
                        name="dateFinished"
                        value={dateFinished}
                        onChangeAction={this.handleInputChangeDate}
                    />
                    <InputSelect
                        label={'Afgerond door'}
                        name={'finishedById'}
                        options={this.props.users}
                        value={finishedById}
                        onChangeAction={this.handleInputChange}
                        optionName={'fullName'}
                    />
                </div>

                <div className="row margin-20-top">
                    <InputReactSelect
                        label={'Contact'}
                        name={'contactId'}
                        options={this.state.contacts}
                        value={contactId}
                        onChangeAction={this.handleReactSelectChange}
                        optionName={'fullName'}
                        multi={false}
                        isLoading={this.state.peekLoading.contacts}
                    />
                </div>

                <div className="margin-10-top">
                    <PanelHeader>
                        <div className="row" onClick={this.props.toggleExtraConnections}>
                            {this.props.showExtraConnections ? (
                                <span className="glyphicon glyphicon-menu-down" />
                            ) : (
                                <span className="glyphicon glyphicon-menu-right" />
                            )}
                            <span className="h5">Overige koppelingen</span>
                        </div>
                    </PanelHeader>
                    {this.props.showExtraConnections && (
                        <TaskDetailsFormGeneralEditExtraConnections
                            task={this.state.task}
                            intakes={this.state.intakes}
                            contactGroups={this.state.contactGroups}
                            opportunities={this.state.opportunities}
                            campaigns={this.state.campaigns}
                            housingFiles={this.state.housingFiles}
                            projects={this.state.projects}
                            participants={this.state.participants}
                            orders={this.state.orders}
                            invoices={this.state.invoices}
                            handleReactSelectChange={this.handleReactSelectChange}
                            peekLoading={this.state.peekLoading}
                        />
                    )}
                </div>

                <div className="panel-footer">
                    <div className="pull-right btn-group" role="group">
                        <ButtonText
                            buttonClassName={'btn-default'}
                            buttonText={'Sluiten'}
                            onClickAction={this.props.switchToView}
                        />
                        <ButtonText buttonText={'Opslaan'} onClickAction={this.handleSubmit} />
                    </div>
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        taskDetails: state.taskDetails,
        meDetails: state.meDetails,
        permissions: state.systemData.permissions,
        taskTypes: state.systemData.taskTypes,
        teams: state.systemData.teams,
        users: state.systemData.users,
    };
};

const mapDispatchToProps = dispatch => ({
    updateTask: id => {
        dispatch(updateTask(id));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskDetailsFormGeneralEdit);
3;
