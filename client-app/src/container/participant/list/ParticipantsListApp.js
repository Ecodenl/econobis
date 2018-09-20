import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {previewParticipantReport} from '../../../actions/production-project/ProductionProjectDetailsActions';
import {
    clearParticipantsProductionProject,
    fetchParticipantsProductionProject
} from '../../../actions/participants-production-project/ParticipantsProductionProjectActions';
import {clearFilterParticipantsProductionProject} from '../../../actions/participants-production-project/ParticipantsProductionProjectFiltersActions';
import {setParticipantsProductionProjectPagination} from '../../../actions/participants-production-project/ParticipantsProductionProjectPaginationActions';
import {blockUI, unblockUI} from '../../../actions/general/BlockUIActions';
import ParticipantsList from './ParticipantsList';
import ParticipantsListToolbar from './ParticipantsListToolbar';
import filterHelper from '../../../helpers/FilterHelper';
import Panel from '../../../components/panel/Panel';
import PanelBody from "../../../components/panel/PanelBody";
import EmailTemplateAPI from "../../../api/email-template/EmailTemplateAPI";
import DocumentTemplateAPI from "../../../api/document-template/DocumentTemplateAPI";
import {hashHistory} from "react-router";
import validator from "validator";
import Modal from "../../../components/modal/Modal";
import ButtonText from "../../../components/button/ButtonText";
import InputText from "../../../components/form/InputText";
import InputSelect from "../../../components/form/InputSelect";
import PanelFooter from "../../../components/panel/PanelFooter";
import ViewText from "../../../components/form/ViewText";
import ParticipantsProductionProjectAPI from "../../../api/participant-production-project/ParticipantsProductionProjectAPI";
import fileDownload from "js-file-download";
import moment from "moment/moment";
import ParticipantsListExtraFilters from "./ParticipantsListExtraFilters";
import axios from "axios";
import ProductionProjectsAPI from "../../../api/production-project/ProductionProjectsAPI";
import ContactsAPI from "../../../api/contact/ContactsAPI";

class ParticipantsListApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            participantIds: [],
            templateId: '',
            templateIdError: false,
            templates: [],
            emailTemplateId: '',
            emailTemplateIdError: false,
            emailTemplates: [],
            subject: [],
            documentGroup: '',
            checkedAll: false,
            showCheckboxList: false,
            showModal: false,
            modalText: '',
            buttonConfirmText: '',
            readyForCreation: false,
            showExtraFilters: false,
            filterType: 'and',
            amountOfFilters: 0,
            extraFilters: [],
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleExtraFiltersChange = this.handleExtraFiltersChange.bind(this);
        this.toggleParticipantCheck = this.toggleParticipantCheck.bind(this);
        this.toggleParticipantCheckNoEmail = this.toggleParticipantCheckNoEmail.bind(this);
        this.handleEmailTemplateChange = this.handleEmailTemplateChange.bind(this);
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.toggleShowExtraFilters = this.toggleShowExtraFilters.bind(this);
    }

    componentDidMount() {
        this.fetchParticipantsProductionProjectData();

        DocumentTemplateAPI.fetchDocumentTemplatesPeekGeneral().then((payload) => {
            let templates = [];

            payload.forEach(function (template) {
                if (template.group == 'revenue') {
                    templates.push({id: template.id, name: template.name});
                }
            });

            this.setState({
                templates: templates,
            });
        });

        EmailTemplateAPI.fetchEmailTemplatesPeek().then((payload) => {
            this.setState({
                emailTemplates: payload,
            });
        });

        axios.all([ProductionProjectsAPI.peekProductionProjects(), ContactsAPI.getContactsPeek()])
            .then(axios.spread((productionProjects, contacts) => {
                this.setState({
                    productionProjects: productionProjects,
                    contacts: contacts,
                });
            }));
    };

    componentWillUnmount() {
        this.props.clearParticipantsProductionProject();
    };

    fetchParticipantsProductionProjectData = () => {
        setTimeout(() => {
            const extraFilters = this.state.extraFilters;
            const filters = filterHelper(this.props.participantsProductionProjectFilters);
            const sorts = this.props.participantsProductionProjectSorts;
            const pagination = { limit: 20, offset: this.props.participantsProductionProjectPagination.offset };
            const filterType = this.state.filterType;

            this.props.fetchParticipantsProductionProject(filters, extraFilters, sorts, pagination, filterType);
        },100 );
    };

    resetParticipantProductionProjectFilters = () => {
        this.props.clearFilterParticipantsProductionProject();

        this.setState({
            filterType: 'and',
            amountOfFilters: 0,
            extraFilters: [],
        });

        this.fetchParticipantsProductionProjectData();
    };

    onSubmitFilter() {
        this.props.setParticipantsProductionProjectPagination({page: 0, offset: 0});

        setTimeout(() => {
            this.fetchParticipantsProductionProjectData();
        },100 );
    };

    handlePageClick(data) {
        let page = data.selected;
        let offset = Math.ceil(page * 20);

        this.props.setParticipantsProductionProjectPagination({page, offset});

        setTimeout(() => {
            this.fetchParticipantsProductionProjectData();
        },100 );
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            templateId: value
        });
    };

    handleSubjectChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            subject: value
        });
    };

    handleEmailTemplateChange(event) {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            emailTemplateId: value
        });

        EmailTemplateAPI.fetchEmailTemplateWithUser(value).then((payload) => {
            this.setState({
                subject: payload.subject ? payload.subject : this.state.subject,
            });
        });
    };

    handleExtraFiltersChange(extraFilters, amountOfFilters, filterType){
        this.setState({
            filterType: filterType,
            amountOfFilters: amountOfFilters,
            extraFilters: extraFilters
        });

        this.props.setParticipantsProductionProjectPagination({page: 0, offset: 0});

        setTimeout(() => {
            this.fetchParticipantsProductionProjectData();
        },100 );
    }

    toggleShowCheckboxList = () => {
        if (this.state.showCheckboxList) {
            this.setState({
                showCheckboxList: false,
                participantIds: []
            });
        }
        else {
            this.setState({
                showCheckboxList: true,
            });
        }

    };

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        });
    };

    toggleCheckedAll = () => {
        this.setState({
            participantIds: [],
            checkedAll: !this.state.checkedAll
        });
    };

    toggleParticipantCheck = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let participantIds = this.state.participantIds;

        if (value) {
            participantIds.push(name);
            this.setState({
                participantIds
            });
        }
        else {
            participantIds = participantIds.filter((id) => id != name);
            this.setState({
                participantIds
            });
        }
    };

    toggleParticipantCheckNoEmail = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let participantIds = this.state.participantIds;

        if (value) {
            participantIds.push(name);
            this.setState({
                participantIds,
                showModal: true,
                modalText: 'Waarschuwing: deze participant heeft nog geen primair e-mailadres.',
                buttonConfirmText: 'Ok'
            });
        }
        else {
            participantIds = participantIds.filter((id) => id != name);
            this.setState({
                participantIds
            });
        }
    };

    checkParticipantReport = () => {
        let error = false;

        if (validator.isEmpty(this.state.templateId)) {
            error = true;
            this.setState({
                templateIdError: true,
            });
        }
        else {
            this.setState({
                templateIdError: false,
            });
        }

        if (validator.isEmpty(this.state.emailTemplateId)) {
            error = true;
            this.setState({
                emailTemplateIdError: true,
            });
        }
        else {
            this.setState({
                emailTemplateIdError: false,
            });
        }
        let participantIds = [];

        if (this.state.checkedAll) {

            this.props.participantsProductionProject.data.forEach(function (participant) {
                participantIds.push(participant.id);
            });

            this.setState({
                participantIds: participantIds,
            });
        }

        if ((this.state.participantIds.length > 0 && !error) || participantIds.length > 0 && !error) {
            this.setState({
                showModal: true,
                modalText: 'De rapporten worden per participant gemaakt met het gekozen documenttemplate en per e-mail verzonden.',
                buttonConfirmText: 'Maken',
                readyForCreation: true
            });
        }
        else if (!error) {
            this.setState({
                showModal: true,
                modalText: 'Er zijn geen participanten geselecteerd.',
                buttonConfirmText: 'Voeg participanten toe'
            });
        }
    };

    createParticipantReport = () => {
        if (!this.state.readyForCreation) {
            this.setState({
                showModal: false,
            });
        }
        else {
            this.props.previewParticipantReport({'templateId': this.state.templateId,'emailTemplateId': this.state.emailTemplateId, 'subject': this.state.subject, 'participantIds': this.state.participantIds});
            hashHistory.push(`/productie-project/preview-rapportage`);
        }
    };

    getCSV = () => {
        this.props.blockUI();
        setTimeout(() => {
            const filters = filterHelper(this.props.participantsProductionProjectFilters);
            const extraFilters = this.state.extraFilters;
            const sorts = this.props.participantsProductionProjectSorts;

            ParticipantsProductionProjectAPI.getCsv(filters, extraFilters, sorts).then((payload) => {
                fileDownload(payload.data, 'Participanten-' + moment().format("YYYY-MM-DD HH:mm:ss") +  '.csv');
                this.props.unblockUI();
            }).catch((error) => {
                this.props.unblockUI();
            });
        },100 );
    };

    saveAsGroup = () => {
        const extraFilters = this.state.extraFilters;
        const filters = filterHelper(this.props.participantsProductionProjectFilters);
        const filterType = this.state.filterType;
        ParticipantsProductionProjectAPI.saveAsGroup({filters, extraFilters, filterType}).then((payload) => {
            hashHistory.push(`/contact-groep/${payload.data.data.id}/edit`);
        });
    };

    prefillExtraFilter() {
        this.setState({
            filterType: 'and',
            amountOfFilters: 1,
            extraFilters:  [{
                field: 'name',
                type: 'eq',
                data: '',
            }],
        });
    };

    toggleShowExtraFilters() {
        this.state.extraFilters.length === 0 &&
        !this.state.showExtraFilters &&
        this.prefillExtraFilter();

        this.setState({
            showExtraFilters: !this.state.showExtraFilters
        });
    };

    render() {
        return (
            <Panel>
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        <ParticipantsListToolbar
                            resetParticipantProductionProjectFilters={() => this.resetParticipantProductionProjectFilters()}
                            toggleShowCheckboxList={this.toggleShowCheckboxList}
                            handleExtraFiltersChange={this.handleExtraFiltersChange}
                            getCSV={this.getCSV}
                            saveAsGroup={this.saveAsGroup}
                            toggleShowExtraFilters={this.toggleShowExtraFilters}
                        />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <ParticipantsList
                            participantsProductionProject={this.props.participantsProductionProject}
                            participantsProductionProjectPagination={this.props.participantsProductionProjectPagination}
                            onSubmitFilter={() => this.onSubmitFilter()}
                            refreshParticipantsProductionProjectData={() => this.fetchParticipantsProductionProjectData()}
                            handlePageClick={this.handlePageClick}
                            showCheckboxList={this.state.showCheckboxList}
                            checkedAll={this.state.checkedAll}
                            toggleParticipantCheck={this.toggleParticipantCheck}
                            toggleParticipantCheckNoEmail={this.toggleParticipantCheckNoEmail}
                            toggleCheckedAll={this.toggleCheckedAll}
                        />
                    </div>
                </PanelBody>

                {this.state.showCheckboxList &&
                <PanelFooter>
                    <div className="row">
                        <div className="col-md-12">
                            <ViewText
                                label="Documentgroep"
                                value={'Opbrengst'}
                            />
                            <InputSelect
                                label="Document template"
                                name={"templateId"}
                                value={this.state.templateId}
                                options={this.state.templates}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={this.state.templateIdError}
                            />
                        </div>
                        <div className="col-md-12">
                            <InputSelect
                                label="E-mail template"
                                name={"emailTemplateId"}
                                value={this.state.emailTemplateId}
                                options={this.state.emailTemplates}
                                onChangeAction={this.handleEmailTemplateChange}
                                required={"required"}
                                error={this.state.emailTemplateIdError}
                            />
                            <InputText
                                label={"E-mail onderwerp"}
                                name={"subject"}
                                value={this.state.subject}
                                onChangeAction={this.handleSubjectChange}
                            />
                        </div>
                        <div className="col-md-12">
                            <div className="margin-10-top pull-right btn-group" role="group">
                                <ButtonText buttonClassName={"btn-default"} buttonText={"Annuleren"}
                                            onClickAction={this.toggleShowCheckboxList}/>
                                <ButtonText buttonText={"Maak rapport"} onClickAction={this.checkParticipantReport}
                                            type={"submit"}
                                            value={"Submit"}/>
                            </div>
                        </div>
                    </div>
                </PanelFooter>
                }
                {this.state.showModal &&
                <Modal
                    title={'Participant rapport maken'}
                    closeModal={this.toggleModal}
                    children={this.state.modalText}
                    buttonConfirmText={this.state.buttonConfirmText}
                    confirmAction={this.createParticipantReport}
                />
                }
                {
                    this.state.showExtraFilters &&
                    <ParticipantsListExtraFilters
                        saveAsGroup={this.saveAsGroup}
                        filterType={this.state.filterType}
                        toggleShowExtraFilters={this.toggleShowExtraFilters}
                        handleExtraFiltersChange={this.handleExtraFiltersChange}
                        extraFilters={this.state.extraFilters}
                        amountOfFilters={this.state.amountOfFilters}
                    />
                }
            </Panel>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        participantsProductionProject: state.participantsProductionProject.list,
        participantsProductionProjectFilters: state.participantsProductionProject.filters,
        participantsProductionProjectSorts: state.participantsProductionProject.sorts,
        participantsProductionProjectPagination: state.participantsProductionProject.pagination,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ blockUI, unblockUI, previewParticipantReport, fetchParticipantsProductionProject, clearParticipantsProductionProject, setParticipantsProductionProjectPagination, clearFilterParticipantsProductionProject }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantsListApp);
