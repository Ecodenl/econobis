import React, {Component} from 'react';

import RevenueDistributionFormList from './RevenueDistributionFormList';
import Panel from '../../../../../../components/panel/Panel';
import PanelBody from '../../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../../components/panel/PanelHeader';
import {connect} from "react-redux";
import PanelFooter from "../../../../../../components/panel/PanelFooter";
import ButtonText from "../../../../../../components/button/ButtonText";
import Modal from "../../../../../../components/modal/Modal";
import InputSelect from "../../../../../../components/form/InputSelect";
import DocumentTemplateAPI from "../../../../../../api/document-template/DocumentTemplateAPI";
import validator from "validator";
import {hashHistory} from "react-router";
import ViewText from "../../../../../../components/form/ViewText";
import EmailTemplateAPI from "../../../../../../api/email-template/EmailTemplateAPI";
import InputText from "../../../../../../components/form/InputText";
import {
    getDistribution,
    getParticipants,
    previewReport
} from "../../../../../../actions/production-project/ProductionProjectDetailsActions";
import {setError} from "../../../../../../actions/general/ErrorActions";

class RevenueDistributionForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            distributionIds: [],
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
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.toggleParticipantCheck = this.toggleParticipantCheck.bind(this);
        this.toggleParticipantCheckNoEmail = this.toggleParticipantCheckNoEmail.bind(this);
        this.handleEmailTemplateChange = this.handleEmailTemplateChange.bind(this);
    }

    componentDidMount() {
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

        if(this.props.productionProjectRevenue.confirmed == 1){
            this.props.getDistribution(this.props.productionProjectRevenue.id, 0);
        }
        else{
            this.props.getParticipants(this.props.productionProjectRevenue.id, 0);
        }
    }

    changePage = (event) =>{
        const page = event.selected;

        if(this.props.productionProjectRevenue.confirmed == 1){
            this.props.getDistribution(this.props.productionProjectRevenue.id, page);
        }
        else{
            this.props.getParticipants(this.props.productionProjectRevenue.id, page);
        }
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            templateId: value
        });
    };

    handleSubjectChange = (event) => {
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

    toggleShowCheckboxList = () => {
        if (this.state.showCheckboxList) {
            this.setState({
                showCheckboxList: false,
                distributionIds: []
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
            distributionIds: [],
            checkedAll: !this.state.checkedAll
        });
    };

    toggleParticipantCheck = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let distributionIds = this.state.distributionIds;

        if (value) {
            distributionIds.push(name);
            this.setState({
                distributionIds
            });
        }
        else {
            distributionIds = distributionIds.filter((id) => id != name);
            this.setState({
                distributionIds
            });
        }
    };

    toggleParticipantCheckNoEmail = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let distributionIds = this.state.distributionIds;

        if (value) {
            distributionIds.push(name);
            this.setState({
                distributionIds,
                showModal: true,
                modalText: 'Waarschuwing: deze participant heeft nog geen primair e-mailadres.',
                buttonConfirmText: 'Ok'
            });
        }
        else {
            distributionIds = distributionIds.filter((id) => id != name);
            this.setState({
                distributionIds
            });
        }
    };

    checkParticipantRevenueReport = () => {
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

        let distributionIds = [];

        if (this.state.checkedAll) {

            this.props.productionProjectRevenue.distribution.data.forEach(function (distribution) {
                distributionIds.push(distribution.id);
            });

            this.setState({
                distributionIds: distributionIds,
            });
        }

        if ((this.state.distributionIds.length > 0 && !error) || (distributionIds.length > 0 && !error)) {
            this.setState({
                showModal: true,
                modalText: 'Er wordt eerst een preview getoond van de PDF\'s en e-mails.',
                buttonConfirmText: 'Preview',
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

    createParticipantRevenueReport = () => {
        if (!this.state.readyForCreation) {
            this.setState({
                showModal: false,
            });
        }
        else {
            if(!this.props.productionProjectRevenue.productionProject.administration.canCreatePaymentInvoices['can']) {
                this.props.setError(412, this.props.productionProjectRevenue.productionProject.administration.canCreatePaymentInvoices['message']);
                this.setState({
                    showModal: false,
                });
                return;
            }
            else{
                this.props.previewReport({
                    'templateId': this.state.templateId,
                    'emailTemplateId': this.state.emailTemplateId,
                    'subject': this.state.subject,
                    'distributionIds': this.state.distributionIds
                })
                hashHistory.push(`/productie-project/opbrengst/${this.props.productionProjectRevenue.id}/facturen`);
            }
        }
    };


    render() {
        let administrationIds = [];
        this.props.administrations.forEach(function(administration) {
            administrationIds.push(administration.id);
        });
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Opbrengstverdeling participanten</span>
                    <div className="btn-group pull-right">
                        {(this.props.productionProjectRevenue.confirmed == 1 && administrationIds.includes(this.props.productionProjectRevenue.productionProject.administrationId)) &&
                        <ButtonText buttonText={'Rapportage maken'} onClickAction={this.toggleShowCheckboxList}/>
                        }
                    </div>
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <RevenueDistributionFormList
                            changePage={this.changePage}
                            showCheckboxList={this.state.showCheckboxList}
                            checkedAll={this.state.checkedAll}
                            toggleCheckedAll={this.toggleCheckedAll}
                            toggleParticipantCheck={this.toggleParticipantCheck}
                            toggleParticipantCheckNoEmail={this.toggleParticipantCheckNoEmail}
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
                                <ButtonText buttonText={"Maak rapport"} onClickAction={this.checkParticipantRevenueReport}
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
                    confirmAction={this.createParticipantRevenueReport}
                />
                }
            </Panel>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        productionProjectRevenue: state.productionProjectRevenue,
        documentGroups: state.systemData.documentGroups,
        administrations: state.meDetails.administrations,
    };
};

const mapDispatchToProps = dispatch => ({
    previewReport: (id) => {
        dispatch(previewReport(id));
    },
    getParticipants: (id, page) => {
        dispatch(getParticipants({id, page}));
    },
    getDistribution: (id, page) => {
        dispatch(getDistribution({id, page}));
    },
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(RevenueDistributionForm);
