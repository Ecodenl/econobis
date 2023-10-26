import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { previewParticipantReport } from '../../../../actions/project/ProjectDetailsActions';
import {
    clearParticipantsProject,
    fetchParticipantsProject,
} from '../../../../actions/participants-project/ParticipantsProjectActions';
import { clearFilterParticipantsProject } from '../../../../actions/participants-project/ParticipantsProjectFiltersActions';
import { setParticipantsProjectPagination } from '../../../../actions/participants-project/ParticipantsProjectPaginationActions';
import { blockUI, unblockUI } from '../../../../actions/general/BlockUIActions';
import ParticipantsList from './ParticipantsList';
import ParticipantsListToolbar from './ParticipantsListToolbar';
import filterHelper from '../../../../helpers/FilterHelper';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import EmailTemplateAPI from '../../../../api/email-template/EmailTemplateAPI';
import DocumentTemplateAPI from '../../../../api/document-template/DocumentTemplateAPI';
import { hashHistory } from 'react-router';
import validator from 'validator';
import Modal from '../../../../components/modal/Modal';
import ButtonText from '../../../../components/button/ButtonText';
import InputText from '../../../../components/form/InputText';
import InputSelect from '../../../../components/form/InputSelect';
import ViewText from '../../../../components/form/ViewText';
import ParticipantsProjectAPI from '../../../../api/participant-project/ParticipantsProjectAPI';
import fileDownload from 'js-file-download';
import moment from 'moment/moment';
import ParticipantsListExtraFilters from './ParticipantsListExtraFilters';
import InputToggle from '../../../../components/form/InputToggle';

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
            amountOfFilters: 1,
            extraFilters: [{ field: 'projectId', type: 'eq', data: props.filterProjectId + '', readOnly: true }],
            showOnPortal: true,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleExtraFiltersChange = this.handleExtraFiltersChange.bind(this);
        this.toggleParticipantCheck = this.toggleParticipantCheck.bind(this);
        this.handleEmailTemplateChange = this.handleEmailTemplateChange.bind(this);
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.toggleShowExtraFilters = this.toggleShowExtraFilters.bind(this);
    }

    componentDidMount() {
        this.fetchParticipantsProjectData();

        DocumentTemplateAPI.fetchDocumentTemplatesPeekGeneral().then(payload => {
            let templates = [];

            payload.forEach(function(template) {
                // if (template.group == 'participation' || template.group == 'revenue') {
                    templates.push({ id: template.id, name: template.name });
                // }
            });

            this.setState({
                templates: templates,
            });
        });

        EmailTemplateAPI.fetchEmailTemplatesPeek().then(payload => {
            this.setState({
                emailTemplates: payload,
            });
        });
    }

    componentWillUnmount() {
        this.props.clearParticipantsProject();
    }

    fetchParticipantsProjectData = () => {
        setTimeout(() => {
            const extraFilters = this.state.extraFilters;
            const filters = filterHelper(this.props.participantsProjectFilters);
            const sorts = this.props.participantsProjectSorts;
            // todo Hier juiste records per page nog zetten (origineel 20: voor testen op 4)!
            const pagination = { limit: 20, offset: this.props.participantsProjectPagination.offset };
            const filterType = this.state.filterType;
            const fetchFromProject = true;

            this.props.fetchParticipantsProject(filters, extraFilters, sorts, pagination, filterType, fetchFromProject);
        }, 100);
    };

    resetParticipantProjectFilters = () => {
        this.props.clearFilterParticipantsProject();

        this.setState({
            filterType: 'and',
            amountOfFilters: 1,
            extraFilters: [{ field: 'projectId', type: 'eq', data: this.props.projectId + '', readOnly: true }],
        });

        this.fetchParticipantsProjectData();
    };

    onSubmitFilter() {
        const filters = filterHelper(this.props.participantsProjectFilters);
        const sorts = this.props.participantsProjectSorts;

        this.props.setParticipantsProjectPagination({ page: 0, offset: 0 });

        setTimeout(() => {
            this.fetchParticipantsProjectData();
        }, 100);
    }

    handlePageClick(data) {
        let page = data.selected;
        // todo Hier juiste records per page nog zetten (origineel 20: voor testen op 4)!
        let offset = Math.ceil(page * 20);

        this.props.setParticipantsProjectPagination({ page, offset });

        setTimeout(() => {
            this.fetchParticipantsProjectData();
        }, 100);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    handleSubjectChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            subject: value,
        });
    }

    handleEmailTemplateChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            emailTemplateId: value,
        });

        EmailTemplateAPI.fetchEmailTemplateWithUser(value).then(payload => {
            this.setState({
                subject: payload.subject ? payload.subject : this.state.subject,
            });
        });
    }

    handleExtraFiltersChange(extraFilters, amountOfFilters, filterType) {
        this.setState({
            filterType: filterType,
            amountOfFilters: amountOfFilters,
            extraFilters: extraFilters,
        });

        this.props.setParticipantsProjectPagination({ page: 0, offset: 0 });

        setTimeout(() => {
            this.fetchParticipantsProjectData();
        }, 100);
    }

    toggleShowCheckboxList = () => {
        if (this.state.showCheckboxList) {
            this.setState({
                showCheckboxList: false,
                participantIds: [],
            });
        } else {
            this.setState({
                showCheckboxList: true,
                participantIds: this.props.participantsProject.meta.participantIdsTotal,
                checkedAll: true,
            });
        }
    };

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal,
        });
    };

    toggleCheckedAll = () => {
        const isChecked = event.target.checked;

        let participantIds = [];

        if (isChecked) {
            participantIds = this.props.participantsProject.meta.participantIdsTotal;
        }

        this.setState({
            participantIds: participantIds,
            checkedAll: isChecked,
        });
    };

    toggleParticipantCheck = event => {
        const isChecked = event.target.checked;
        const participantId = Number(event.target.name);

        if (isChecked) {
            this.setState(
                {
                    participantIds: [...this.state.participantIds, participantId],
                },
                this.checkAllParticipantsAreChecked
            );
        } else {
            this.setState({
                participantIds: this.state.participantIds.filter(item => item !== participantId),
                checkedAll: false,
            });
        }
    };

    checkAllParticipantsAreChecked() {
        this.setState({
            checkedAll:
                this.state.participantIds.length === this.props.participantsProject.meta.participantIdsTotal.length,
        });
    }

    checkParticipantReport = () => {
        let error = false;

        if (validator.isEmpty(this.state.templateId)) {
            error = true;
            this.setState({
                templateIdError: true,
            });
        } else {
            this.setState({
                templateIdError: false,
            });
        }

        if (validator.isEmpty(this.state.emailTemplateId)) {
            error = true;
            this.setState({
                emailTemplateIdError: true,
            });
        } else {
            this.setState({
                emailTemplateIdError: false,
            });
        }

        if (this.state.participantIds.length > 0 && !error) {
            this.props.previewParticipantReport({
                templateId: this.state.templateId,
                emailTemplateId: this.state.emailTemplateId,
                subject: this.state.subject,
                participantIds: this.state.participantIds,
                showOnPortal: this.state.showOnPortal,
            });
            hashHistory.push(`/project/preview-rapportage`);
        } else if (!error) {
            this.setState({
                showModal: true,
                modalText: 'Er zijn geen deelnemers geselecteerd.',
                buttonConfirmText: 'Voeg deelnemers toe',
            });
        }
    };

    getExcel = () => {
        this.props.blockUI();

        const maxParticipants = 1000;
        const amountFiles = Math.ceil(this.props.participantsProject.meta.total / maxParticipants);
        const splitsExcel = this.props.participantsProject.meta.total > maxParticipants;
        var counter = 1;
        for (var i = 1; i <= amountFiles; i++) {
            var offset = i * maxParticipants - maxParticipants;
            var pagination = { limit: maxParticipants, offset: offset };
            const filters = filterHelper(this.props.participantsProjectFilters);
            const extraFilters = this.state.extraFilters;
            const sorts = this.props.participantsProjectSorts;
            ParticipantsProjectAPI.getExcel(filters, extraFilters, sorts, pagination, true, this.props.filterProjectId)
                .then(payload => {
                    excelFileName = `Deelnemers-${moment().format('YYYY-MM-DD HH:mm:ss')}.xlsx`;
                    if (splitsExcel) {
                        var excelFileName = `Deelnemers-${moment().format(
                            'YYYY-MM-DD HH:mm:ss'
                        )} (${counter} van ${amountFiles}).xlsx`;
                    }
                    fileDownload(payload.data, excelFileName);
                    counter = counter + 1;
                    this.props.unblockUI();
                })
                .catch(error => {
                    this.props.unblockUI();
                });
        }
    };

    getExcelParticipants = () => {
        this.props.blockUI();

        const maxParticipants = 1000;
        const amountFiles = Math.ceil(this.props.participantsProject.meta.total / maxParticipants);
        const splitsExcel = this.props.participantsProject.meta.total > maxParticipants;
        var counter = 1;
        for (var i = 1; i <= amountFiles; i++) {
            var offset = i * maxParticipants - maxParticipants;
            var pagination = { limit: maxParticipants, offset: offset };
            const filters = filterHelper(this.props.participantsProjectFilters);
            const extraFilters = this.state.extraFilters;
            const sorts = this.props.participantsProjectSorts;
            ParticipantsProjectAPI.getExcelParticipants(
                filters,
                extraFilters,
                sorts,
                pagination,
                true,
                this.props.filterProjectId
            )
                .then(payload => {
                    excelFileName = `Deelnemers-${moment().format('YYYY-MM-DD HH:mm:ss')}.xlsx`;
                    if (splitsExcel) {
                        var excelFileName = `Deelnemers-${moment().format(
                            'YYYY-MM-DD HH:mm:ss'
                        )} (${counter} van ${amountFiles}).xlsx`;
                    }
                    fileDownload(payload.data, excelFileName);
                    counter = counter + 1;
                    this.props.unblockUI();
                })
                .catch(error => {
                    this.props.unblockUI();
                });
        }
    };

    saveAsGroup = () => {
        const extraFilters = this.state.extraFilters;
        const filters = filterHelper(this.props.participantsProjectFilters);
        const filterType = this.state.filterType;
        const saveFromProject = true;
        ParticipantsProjectAPI.saveAsGroup({
            filters,
            extraFilters,
            filterType,
            saveFromProject,
        }).then(payload => {
            hashHistory.push(`/contact-groep/${payload.data.data.id}/edit`);
        });
    };

    toggleShowExtraFilters() {
        this.setState({
            showExtraFilters: !this.state.showExtraFilters,
        });
    }

    render() {
        let numberSelectedNumberTotal = 0;

        if (this.state.participantIds) {
            if (
                this.props &&
                this.props.participantsProject &&
                this.props.participantsProject.meta &&
                this.props.participantsProject.meta.participantIdsTotal
            ) {
                numberSelectedNumberTotal =
                    this.state.participantIds.length +
                    '/' +
                    this.props.participantsProject.meta.participantIdsTotal.length;
            } else {
                numberSelectedNumberTotal = this.state.participantIds.length;
            }
        }

        return (
            <Panel>
                <PanelBody>
                    {!this.state.showCheckboxList ? (
                        <div className="col-md-12 margin-10-top">
                            <ParticipantsListToolbar
                                resetParticipantProjectFilters={() => this.resetParticipantProjectFilters()}
                                toggleShowCheckboxList={this.toggleShowCheckboxList}
                                handleExtraFiltersChange={this.handleExtraFiltersChange}
                                toggleShowExtraFilters={this.toggleShowExtraFilters}
                                getExcel={this.getExcel}
                                getExcelParticipants={this.getExcelParticipants}
                                saveAsGroup={this.saveAsGroup}
                            />
                        </div>
                    ) : null}
                    {this.state.showCheckboxList ? (
                        <Panel>
                            <PanelBody>
                                <div className="row">
                                    <div className="col-md-12">
                                        <ViewText label="Documentgroep" value={'Deelname / Opbrengst'} />
                                        <InputSelect
                                            label="Document template"
                                            name={'templateId'}
                                            value={this.state.templateId}
                                            options={this.state.templates}
                                            onChangeAction={this.handleInputChange}
                                            required={'required'}
                                            error={this.state.templateIdError}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <InputSelect
                                            label="E-mail template"
                                            name={'emailTemplateId'}
                                            value={this.state.emailTemplateId}
                                            options={this.state.emailTemplates}
                                            onChangeAction={this.handleEmailTemplateChange}
                                            required={'required'}
                                            error={this.state.emailTemplateIdError}
                                        />
                                        <InputText
                                            label={'E-mail onderwerp'}
                                            name={'subject'}
                                            value={this.state.subject}
                                            onChangeAction={this.handleSubjectChange}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <ViewText label="Geselecteerde deelnemers" value={numberSelectedNumberTotal} />
                                        <InputToggle
                                            label={'Rapportage tonen op portal'}
                                            name={'showOnPortal'}
                                            value={Boolean(this.state.showOnPortal)}
                                            onChangeAction={this.handleInputChange}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <div className="margin-10-top pull-right btn-group" role="group">
                                            <ButtonText
                                                buttonClassName={'btn-default'}
                                                buttonText={'Annuleren'}
                                                onClickAction={this.toggleShowCheckboxList}
                                            />
                                            <ButtonText
                                                buttonText={'Preview rapportage'}
                                                onClickAction={this.checkParticipantReport}
                                                type={'submit'}
                                                value={'Submit'}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </PanelBody>
                        </Panel>
                    ) : null}
                    <div className="col-md-12 margin-10-top">
                        <ParticipantsList
                            participantsProject={this.props.participantsProject}
                            participantsProjectPagination={this.props.participantsProjectPagination}
                            onSubmitFilter={() => this.onSubmitFilter()}
                            refreshParticipantsProjectData={() => this.fetchParticipantsProjectData()}
                            handlePageClick={this.handlePageClick}
                            showCheckboxList={this.state.showCheckboxList}
                            toggleCheckedAll={this.toggleCheckedAll}
                            checkedAll={this.state.checkedAll}
                            toggleParticipantCheck={this.toggleParticipantCheck}
                            participantIds={this.state.participantIds}
                            projectTypeRef={this.props.projectTypeRef}
                        />
                    </div>
                </PanelBody>

                {this.state.showModal && (
                    <Modal
                        title={'Deelnemer rapport maken'}
                        closeModal={this.toggleModal}
                        buttonConfirmText={this.state.buttonConfirmText}
                        confirmAction={this.createParticipantReport}
                    >
                        {this.state.modalText}
                    </Modal>
                )}
                {this.state.showExtraFilters && (
                    <ParticipantsListExtraFilters
                        toggleShowExtraFilters={this.toggleShowExtraFilters}
                        handleExtraFiltersChange={this.handleExtraFiltersChange}
                        extraFilters={this.state.extraFilters}
                        amountOfFilters={this.state.amountOfFilters}
                        filterType={this.state.filterType}
                        saveAsGroup={this.saveAsGroup}
                    />
                )}
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        projectId: state.projectDetails.id,
        projectTypeRef: state.projectDetails.projectType?.codeRef,
        participantsProject: state.participantsProject.list,
        participantsProjectFilters: state.participantsProject.filters,
        participantsProjectSorts: state.participantsProject.sorts,
        participantsProjectPagination: state.participantsProject.pagination,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            blockUI,
            unblockUI,
            previewParticipantReport,
            fetchParticipantsProject,
            clearParticipantsProject,
            setParticipantsProjectPagination,
            clearFilterParticipantsProject,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantsListApp);
