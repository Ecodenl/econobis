import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import moment from "moment/moment";
import {hashHistory} from "react-router";
import validator from "validator";

import ContactsAPI from "../../../api/contact/ContactsAPI";
import CampaignsAPI from "../../../api/campaign/CampaignsAPI";
import TaskDetailsAPI from "../../../api/task/TaskDetailsAPI";
import TaskNewForm from './TaskNewForm';
import TaskNewToolbar from './TaskNewToolbar';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import IntakesAPI from "../../../api/intake/IntakesAPI";
import ContactGroupAPI from "../../../api/contact-group/ContactGroupAPI";
import OpportunitiesAPI from "../../../api/opportunity/OpportunitiesAPI";

class TaskNewApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contacts: [],
            intakes: [],
            contactGroups: [],
            opportunities: [],
            campaigns: [],
            task: {
                id: '',
                name: '',
                description: '',
                typeId: '',
                contactId: '',
                campaignId: '',
                statusId: '',
                intakeId: '',
                contactGroupId: '',
                datePlanned: '',
                startTimePlanned: '',
                endTimePlanned: '',
                dateFinished: '',
                responsibleUserId: '',
                finishedById: '',
                opportunityId: '',
            },
            errors: {
                name: false,
                typeId: false,
                statusId: false,
                responsibleUserId: false,
            },
        };

        this.updateStateByChangeParams = this.updateStateByChangeParams.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChangeDatePlanned = this.handleChangeDatePlanned.bind(this);
        this.handleChangeStartedDate = this.handleChangeStartedDate.bind(this);
        this.handleChangeFinishedDate = this.handleChangeFinishedDate.bind(this);
        this.handleInputChangeTime = this.handleInputChangeTime.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReactSelectChange = this.handleReactSelectChange.bind(this);
    };

    componentDidMount() {
        if(!isEmpty(this.props.params)) {
            this.updateStateByChangeParams(this.props.params);
        };

        ContactsAPI.getContactsPeek().then((payload) => {
            this.setState({ contacts: payload });
        });

        IntakesAPI.peekIntakes().then((payload) => {
            this.setState({ intakes: payload });
        });

        ContactGroupAPI.peekContactGroups().then((payload) => {
            this.setState({ contactGroups: payload });
        });

        OpportunitiesAPI.peekOpportunities().then((payload) => {
            this.setState({ opportunities: payload });
        });

        CampaignsAPI.peekCampaigns().then((payload) => {
            this.setState({ campaigns: payload });
        });
    };

    componentWillReceiveProps(nextProps) {
        if ((this.props.params.id !== nextProps.params.id) || (this.props.params.type !== nextProps.params.type)) {
            this.updateStateByChangeParams(nextProps.params);
        }
    };

    updateStateByChangeParams(params) {
        if (!isEmpty(params)) {
            switch (params.type) {
                case 'contact':
                    this.setState({
                        ...this.state,
                        task: {
                            ...this.state.task,
                            campaignId: '',
                            contactId: params.id,
                            intakeId: '',
                            contactGroupId: '',
                            opportunityId: '',
                        }
                    });
                    break;
                case 'intake':
                    this.setState({
                        ...this.state,
                        task: {
                            ...this.state.task,
                            campaignId: '',
                            contactId: '',
                            intakeId: params.id,
                            contactGroupId: '',
                            opportunityId: '',
                        }
                    });
                    break;
                case 'contact-groep':
                    this.setState({
                        ...this.state,
                        task: {
                            ...this.state.task,
                            campaignId: '',
                            contactId: '',
                            intakeId: '',
                            contactGroupId: params.id,
                            opportunityId: '',
                        }
                    });
                    break;
                case 'kans':
                    this.setState({
                        ...this.state,
                        task: {
                            ...this.state.task,
                            campaignId: '',
                            contactId: '',
                            intakeId: '',
                            contactGroupId: '',
                            opportunityId: params.id,
                        }
                    });
                    break;
                case 'campagne':
                    this.setState({
                        ...this.state,
                        task: {
                            ...this.state.task,
                            campaignId: params.id,
                            contactId: '',
                            intakeId: '',
                            contactGroupId: '',
                            opportunityId: '',
                        }
                    });
                    break;
                default:
                    break;
            }
        }
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

    handleReactSelectChange(selectedOption, name) {
        this.setState({
            ...this.state,
            task: {
                ...this.state.task,
                [name]: selectedOption
            },
        });
    };

    handleInputChangeTime(value, name) {
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

        if(validator.isEmpty(task.typeId)){
            errors.typeId = true;
            hasErrors = true;
        };

        if(validator.isEmpty(task.statusId)){
            errors.statusId = true;
            hasErrors = true;
        };

        if(validator.isEmpty(task.responsibleUserId)){
            errors.responsibleUserId = true;
            hasErrors = true;
        };

        this.setState({ ...this.state, errors: errors })

        // If no errors send form
        !hasErrors &&
        TaskDetailsAPI.newTask(task).then((payload) => {
            const {id} = payload.data.data;
            hashHistory.push(`/taak/${id}`);
        }).catch(function (error) {
            console.log(error);
        });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <TaskNewToolbar task={this.state.task} />
                    </div>

                    <div className="col-md-12">
                        <Panel>
                            <PanelBody>
                                <div className="col-md-12">
                                    <TaskNewForm
                                        task={this.state.task}
                                        contacts={this.state.contacts}
                                        intakes={this.state.intakes}
                                        contactGroups={this.state.contactGroups}
                                        opportunities={this.state.opportunities}
                                        campaigns={this.state.campaigns}
                                        errors={this.state.errors}
                                        meDetails={this.props.meDetails}
                                        handleInputChange={this.handleInputChange}
                                        handleChangeDatePlanned={this.handleChangeDatePlanned}
                                        handleChangeStartedDate={this.handleChangeStartedDate}
                                        handleChangeFinishedDate={this.handleChangeFinishedDate}
                                        handleInputChangeTime={this.handleInputChangeTime}
                                        handleSubmit={this.handleSubmit}
                                        handleReactSelectChange={this.handleReactSelectChange}
                                    />
                                </div>
                            </PanelBody>
                        </Panel>
                    </div>
                </div>
                <div className="col-md-3"/>
            </div>
        )
    }
};

export default TaskNewApp;
