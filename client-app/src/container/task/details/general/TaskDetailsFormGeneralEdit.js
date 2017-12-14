import React, {Component} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');

import ContactsAPI from "../../../../api/ContactsAPI";
import TaskDetailsAPI from '../../../../api/task/TaskDetailsAPI';
import { updateTask } from '../../../../actions/task/TaskDetailsActions';
import ButtonText from '../../../../components/button/ButtonText';
import InputText from '../../../../components/form/InputText';
import InputSelect from '../../../../components/form/InputSelect';
import InputDate from '../../../../components/form/InputDate';
import validator from "validator";

class TaskDetailsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        const { id, name, description, typeId, contactId, statusId, registrationId, contactGroupId, datePlanned, dateStarted, dateFinished, responsibleUserId, finishedById, createdAt, createdBy} = props.taskDetails;

        this.state = {
            contacts: [],
            task: {
                id,
                name,
                description,
                typeId,
                contactId,
                statusId,
                registrationId,
                contactGroupId,
                datePlanned: datePlanned ? datePlanned.date : '',
                dateStarted: dateStarted ? dateStarted.date : '',
                dateFinished: dateFinished ? dateFinished.date : '',
                responsibleUserId,
                finishedById,
                createdAt: createdAt ? createdAt.date : '',
                createdBy,
            },
            errors: {
                name: false,
                typeId: false,
                statusId: false,
                responsibleUserId: false,
            },
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChangeDatePlanned = this.handleChangeDatePlanned.bind(this);
        this.handleChangeStartedDate = this.handleChangeStartedDate.bind(this);
        this.handleChangeFinishedDate = this.handleChangeFinishedDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        ContactsAPI.getContactsPeek().then((payload) => {
            this.setState({ contacts: payload });
        });
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            task: {
                ...this.state.task,
                [name]: value
            },
        });
    };

    handleChangeDatePlanned(date) {
        const formattedDate = (date ? moment(date).format('Y-MM-DD') : '');

        this.setState({
            ...this.state,
            task: {
                ...this.state.task,
                datePlanned: formattedDate
            },
        });
    };

    handleChangeStartedDate(date) {
        const formattedDate = (date ? moment(date).format('Y-MM-DD') : '');

        this.setState({
            ...this.state,
            task: {
                ...this.state.task,
                dateStarted: formattedDate
            },
        });
    };

    handleChangeFinishedDate(date)  {
        const formattedDate = (date ? moment(date).format('Y-MM-DD') : '');

        this.setState({
            ...this.state,
            task: {
                ...this.state.task,
                dateFinished: formattedDate
            },
        });
    };

    handleSubmit(event) {
        event.preventDefault();

        const { task }  = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty(task.name)){
            errors.name = true;
            hasErrors = true;
        };

        if(validator.isEmpty(task.typeId.toString())){
            errors.typeId = true;
            hasErrors = true;
        };

        if(validator.isEmpty(task.statusId.toString())){
            errors.statusId = true;
            hasErrors = true;
        };

        if(validator.isEmpty(task.responsibleUserId.toString())){
            errors.responsibleUserId = true;
            hasErrors = true;
        };

        this.setState({ ...this.state, errors: errors })

        // If no errors send form
        !hasErrors &&
        TaskDetailsAPI.updateTask(task).then((payload) => {
            this.props.updateTask(payload.data.data);
            this.props.switchToView();
        });
    };

    render() {
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
            createdAt,
            createdBy
        } = this.state.task;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputText
                        label="Naam"
                        name={"name"}
                        value={name}
                        onChangeAction={this.handleInputChange}
                        required={"required"}
                        error={this.state.errors.name}
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
                            <textarea name='description' value={description} onChange={this.handleInputChange}
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
                        options={this.props.taskTypes}
                        value={typeId}
                        onChangeAction={this.handleInputChange}
                        required={"required"}
                        error={this.state.errors.typeId}
                    />
                </div>

                <div className="row">
                    <InputSelect
                        label={"Contact"}
                        size={"col-sm-6"}
                        name={"contactId"}
                        options={this.state.contacts}
                        value={contactId}
                        onChangeAction={this.handleInputChange}
                        optionName={'fullName'}
                    />
                    <InputSelect
                        label={"Status"}
                        size={"col-sm-6"}
                        name={"statusId"}
                        options={this.props.taskStatuses}
                        value={statusId}
                        onChangeAction={this.handleInputChange}
                        required={"required"}
                        error={this.state.errors.statusId}
                    />
                </div>

                <div className="row">
                    <InputSelect
                        label={"Aanmelding"}
                        size={"col-sm-6"}
                        name={"registrationId"}
                        options={[]}
                        value={registrationId}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputSelect
                        label={"Groep"}
                        size={"col-sm-6"}
                        name={"contactGroupId"}
                        options={[]}
                        value={contactGroupId}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row margin-10-top">
                    <InputDate
                        label="Plan datum"
                        size={"col-sm-6"}
                        name="datePlanned"
                        value={datePlanned}
                        onChangeAction={this.handleChangeDatePlanned}

                    />
                    <InputDate
                        label="Datum gestart"
                        size={"col-sm-6"}
                        name="dateStarted"
                        value={dateStarted}
                        onChangeAction={this.handleChangeStartedDate}
                    />
                </div>

                <div className="row">
                    <InputDate
                        label="Datum gereed"
                        size={"col-sm-6"}
                        name="dateFinished"
                        value={dateFinished}
                        onChangeAction={this.handleChangeFinishedDate}

                    />
                    <InputSelect
                        label={"Afgerond door"}
                        size={"col-sm-6"}
                        name={"finishedById"}
                        options={this.props.users}
                        value={finishedById}
                        onChangeAction={this.handleInputChange}
                        optionName={'fullName'}
                    />
                </div>

                <div className="row">
                    <InputSelect
                        label={"Verantwoordelijke"}
                        size={"col-sm-6"}
                        name={"responsibleUserId"}
                        options={this.props.users}
                        value={responsibleUserId}
                        onChangeAction={this.handleInputChange}
                        optionName={'fullName'}
                        required={"required"}
                        error={this.state.errors.responsibleUserId}
                    />
                </div>

                <div className="row margin-10-top">
                    <InputText
                        label={"Gemaakt op"}
                        name={"createdAt"}
                        value={ moment(createdAt).format('DD-MM-Y') }
                        readOnly={true}
                    />
                    <InputText
                        label={"Gemaakt door"}
                        name={"createdBy"}
                        value={ createdBy.fullName}
                        readOnly={true}
                    />
                </div>

                <div className="panel-footer">
                    <div className="pull-right btn-group" role="group">
                        <ButtonText buttonClassName={"btn-default"} buttonText={"Sluiten"} onClickAction={this.props.switchToView}/>
                        <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit}/>
                    </div>
                </div>
            </form>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        taskDetails: state.taskDetails,
        meDetails: state.meDetails,
        permissions: state.systemData.permissions,
        taskStatuses: state.systemData.taskStatuses,
        taskTypes: state.systemData.taskTypes,
        users: state.systemData.users,
    };
};

const mapDispatchToProps = dispatch => ({
    updateTask: (id) => {
        dispatch(updateTask(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetailsFormGeneralEdit);
