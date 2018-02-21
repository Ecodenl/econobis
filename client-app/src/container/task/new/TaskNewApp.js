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
import HousingFilesAPI from "../../../api/housing-file/HousingFilesAPI";

class TaskNewApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contacts: [],
            intakes: [],
            contactGroups: [],
            opportunities: [],
            campaigns: [],
            housingFiles: [],
            task: {
                id: '',
                note: '',
                typeId: '',
                contactId: '',
                campaignId: '',
                intakeId: '',
                opportunityId: '',
                contactGroupId: '',
                housingFileId: '',
                datePlannedStart: '',
                datePlannedFinish: '',
                startTimePlanned: '',
                endTimePlanned: '',
                finished: false,
                dateFinished: '',
                finishedById: '',
                responsible: '',
            },
            errors: {
                note: false,
                responsible: false,
            },
            showExtraConnections: false,
        };

        this.updateStateByChangeParams = this.updateStateByChangeParams.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
        this.handleInputChangeTime = this.handleInputChangeTime.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReactSelectChange = this.handleReactSelectChange.bind(this);
        this.toggleExtraConnections = this.toggleExtraConnections.bind(this);
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

        HousingFilesAPI.peekHousingFiles().then((payload) => {
            this.setState({ housingFiles: payload });
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

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            task: {
                ...this.state.task,
                [name]: value
            },
        });
    };

    handleSubmit(event) {
        event.preventDefault();

        const { task }  = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty(task.note)){
            errors.note = true;
            hasErrors = true;
        };

        if(validator.isEmpty(task.responsible)){
            errors.responsible = true;
            hasErrors = true;
        };

        if(task.responsible.search('user') >= 0 ) {
            task.responsibleUserId = task.responsible.replace('user', '');
            task.responsibleTeamId = '';
        };

        if(task.responsible.search("team") >= 0) {
            task.responsibleUserId = '';
            task.responsibleTeamId = task.responsible.replace('team', '');
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

    toggleExtraConnections() {
        this.setState({showExtraConnections: !this.state.showExtraConnections});
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
                                        handleInputChangeDate={this.handleInputChangeDate}
                                        handleInputChangeTime={this.handleInputChangeTime}
                                        handleSubmit={this.handleSubmit}
                                        handleReactSelectChange={this.handleReactSelectChange}
                                        toggleExtraConnections={this.toggleExtraConnections}
                                        showExtraConnections={this.state.showExtraConnections}
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
