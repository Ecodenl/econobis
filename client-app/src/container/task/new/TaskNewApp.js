import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import moment from 'moment/moment';
import { hashHistory } from 'react-router';
import validator from 'validator';

import ContactsAPI from '../../../api/contact/ContactsAPI';
import CampaignsAPI from '../../../api/campaign/CampaignsAPI';
import TaskDetailsAPI from '../../../api/task/TaskDetailsAPI';
import TaskNewForm from './TaskNewForm';
import TaskNewToolbar from './TaskNewToolbar';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import IntakesAPI from '../../../api/intake/IntakesAPI';
import ContactGroupAPI from '../../../api/contact-group/ContactGroupAPI';
import OpportunitiesAPI from '../../../api/opportunity/OpportunitiesAPI';
import HousingFilesAPI from '../../../api/housing-file/HousingFilesAPI';
import ProductionProjectsAPI from '../../../api/production-project/ProductionProjectsAPI';
import ParticipantsProductionProjectAPI from '../../../api/participant-production-project/ParticipantsProductionProjectAPI';
import OrdersAPI from '../../../api/order/OrdersAPI';
import InvoicesAPI from '../../../api/invoice/InvoicesAPI';

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
            productionProjects: [],
            participants: [],
            orders: [],
            invoices: [],
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
                productionProjectId: '',
                participantId: '',
                orderId: '',
                invoiceId: '',
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
            peekLoading: {
                contacts: true,
                intakes: true,
                contactGroups: true,
                opportunities: true,
                campaigns: true,
                housingFiles: true,
                productionProjects: true,
                participants: true,
                orders: true,
                invoices: true,
            },
        };

        this.updateStateByChangeParams = this.updateStateByChangeParams.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
        this.handleInputChangeTime = this.handleInputChangeTime.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReactSelectChange = this.handleReactSelectChange.bind(this);
        this.toggleExtraConnections = this.toggleExtraConnections.bind(this);
    }

    componentDidMount() {
        if (!isEmpty(this.props.params)) {
            this.updateStateByChangeParams(this.props.params);
        }

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

        ProductionProjectsAPI.peekProductionProjects().then(payload => {
            this.setState({
                productionProjects: payload,
                peekLoading: {
                    ...this.state.peekLoading,
                    productionProjects: false,
                },
            });
        });

        ParticipantsProductionProjectAPI.peekParticipantsProductionProjects().then(payload => {
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

    componentWillReceiveProps(nextProps) {
        if (this.props.params.id !== nextProps.params.id || this.props.params.type !== nextProps.params.type) {
            this.updateStateByChangeParams(nextProps.params);
        }
    }

    updateStateByChangeParams(params) {
        if (!isEmpty(params)) {
            let finished = false;

            if (params.closed === 'afgehandeld') {
                finished = true;

                this.setState({
                    ...this.state,
                    task: {
                        ...this.state.task,
                        finished: finished,
                    },
                });
            }

            if (params.contactId && params.productionProjectId && params.participantId) {
                this.setState({
                    ...this.state,
                    task: {
                        ...this.state.task,
                        finished: finished,
                        campaignId: '',
                        contactId: params.contactId,
                        intakeId: '',
                        contactGroupId: '',
                        opportunityId: '',
                        productionProjectId: params.productionProjectId,
                        participantId: params.participantId,
                        orderId: '',
                        invoiceId: '',
                    },
                });
            } else if (params.contactId && params.opportunityId) {
                this.setState({
                    ...this.state,
                    task: {
                        ...this.state.task,
                        finished: finished,
                        campaignId: '',
                        contactId: params.contactId,
                        intakeId: '',
                        contactGroupId: '',
                        opportunityId: params.opportunityId,
                        productionProjectId: '',
                        participantId: '',
                        orderId: '',
                        invoiceId: '',
                    },
                });
            } else {
                switch (params.type) {
                    case 'contact':
                        this.setState({
                            ...this.state,
                            task: {
                                ...this.state.task,
                                finished: finished,
                                campaignId: '',
                                contactId: params.id,
                                intakeId: '',
                                contactGroupId: '',
                                opportunityId: '',
                                productionProjectId: '',
                                participantId: '',
                                orderId: '',
                                invoiceId: '',
                            },
                        });
                        break;
                    case 'intake':
                        this.setState({
                            ...this.state,
                            task: {
                                ...this.state.task,
                                finished: finished,
                                campaignId: '',
                                contactId: '',
                                intakeId: params.id,
                                contactGroupId: '',
                                opportunityId: '',
                                productionProjectId: '',
                                participantId: '',
                                orderId: '',
                                invoiceId: '',
                            },
                        });
                        break;
                    case 'contact-groep':
                        this.setState({
                            ...this.state,
                            task: {
                                ...this.state.task,
                                finished: finished,
                                campaignId: '',
                                contactId: '',
                                intakeId: '',
                                contactGroupId: params.id,
                                opportunityId: '',
                                productionProjectId: '',
                                participantId: '',
                                orderId: '',
                                invoiceId: '',
                            },
                        });
                        break;
                    case 'kans':
                        this.setState({
                            ...this.state,
                            task: {
                                ...this.state.task,
                                finished: finished,
                                campaignId: '',
                                contactId: '',
                                intakeId: '',
                                contactGroupId: '',
                                opportunityId: params.id,
                                productionProjectId: '',
                                participantId: '',
                                orderId: '',
                                invoiceId: '',
                            },
                        });
                        break;
                    case 'campagne':
                        this.setState({
                            ...this.state,
                            task: {
                                ...this.state.task,
                                finished: finished,
                                campaignId: params.id,
                                contactId: '',
                                intakeId: '',
                                contactGroupId: '',
                                opportunityId: '',
                                productionProjectId: '',
                                participantId: '',
                                orderId: '',
                                invoiceId: '',
                            },
                        });
                        break;
                    case 'productie-project':
                        this.setState({
                            ...this.state,
                            task: {
                                ...this.state.task,
                                finished: finished,
                                campaignId: '',
                                contactId: '',
                                intakeId: '',
                                contactGroupId: '',
                                opportunityId: '',
                                productionProjectId: params.id,
                                participantId: '',
                                orderId: '',
                                invoiceId: '',
                            },
                        });
                        break;
                    case 'participant':
                        this.setState({
                            ...this.state,
                            task: {
                                ...this.state.task,
                                finished: finished,
                                campaignId: '',
                                contactId: '',
                                intakeId: '',
                                contactGroupId: '',
                                opportunityId: '',
                                productionProjectId: '',
                                participantId: params.id,
                                orderId: '',
                                invoiceId: '',
                            },
                        });
                        break;
                    case 'order':
                        this.setState({
                            ...this.state,
                            task: {
                                ...this.state.task,
                                finished: finished,
                                campaignId: '',
                                contactId: '',
                                intakeId: '',
                                contactGroupId: '',
                                opportunityId: '',
                                productionProjectId: '',
                                participantId: '',
                                orderId: params.id,
                                invoiceId: '',
                            },
                        });
                        break;
                    case 'factuur':
                        this.setState({
                            ...this.state,
                            task: {
                                ...this.state.task,
                                finished: finished,
                                campaignId: '',
                                contactId: '',
                                intakeId: '',
                                contactGroupId: '',
                                opportunityId: '',
                                productionProjectId: '',
                                participantId: '',
                                orderId: '',
                                invoiceId: params.id,
                            },
                        });
                        break;
                    case 'woningdossier':
                        this.setState({
                            ...this.state,
                            task: {
                                ...this.state.task,
                                finished: finished,
                                campaignId: '',
                                contactId: '',
                                intakeId: '',
                                contactGroupId: '',
                                opportunityId: '',
                                productionProjectId: '',
                                participantId: '',
                                orderId: '',
                                invoiceId: '',
                                housingFileId: params.id,
                            },
                        });
                        break;
                    default:
                        break;
                }
            }
        }
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

        if (validator.isEmpty(task.responsible)) {
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
            TaskDetailsAPI.newTask(task)
                .then(payload => {
                    const { id } = payload.data.data;
                    hashHistory.push(`/taak/${id}`);
                })
                .catch(function(error) {
                    console.log(error);
                });
    }

    toggleExtraConnections() {
        this.setState({ showExtraConnections: !this.state.showExtraConnections });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <TaskNewToolbar finished={this.state.task.finished} />
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
                                        housingFiles={this.state.housingFiles}
                                        productionProjects={this.state.productionProjects}
                                        participants={this.state.participants}
                                        orders={this.state.orders}
                                        invoices={this.state.invoices}
                                        errors={this.state.errors}
                                        meDetails={this.props.meDetails}
                                        handleInputChange={this.handleInputChange}
                                        handleInputChangeDate={this.handleInputChangeDate}
                                        handleInputChangeTime={this.handleInputChangeTime}
                                        handleSubmit={this.handleSubmit}
                                        handleReactSelectChange={this.handleReactSelectChange}
                                        toggleExtraConnections={this.toggleExtraConnections}
                                        showExtraConnections={this.state.showExtraConnections}
                                        peekLoading={this.state.peekLoading}
                                    />
                                </div>
                            </PanelBody>
                        </Panel>
                    </div>
                </div>
                <div className="col-md-3" />
            </div>
        );
    }
}

export default TaskNewApp;
