import React, { Component } from 'react';

import RevenueDistributionFormList from './RevenueDistributionFormList';
import Panel from '../../../../../../components/panel/Panel';
import PanelBody from '../../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../../components/panel/PanelHeader';
import { connect } from 'react-redux';
import ButtonText from '../../../../../../components/button/ButtonText';
import Modal from '../../../../../../components/modal/Modal';
import InputSelect from '../../../../../../components/form/InputSelect';
import DocumentTemplateAPI from '../../../../../../api/document-template/DocumentTemplateAPI';
import validator from 'validator';
import { hashHistory } from 'react-router';
import ViewText from '../../../../../../components/form/ViewText';
import EmailTemplateAPI from '../../../../../../api/email-template/EmailTemplateAPI';
import InputText from '../../../../../../components/form/InputText';
import { getDistribution, previewReport } from '../../../../../../actions/project/ProjectDetailsActions';
import { setError } from '../../../../../../actions/general/ErrorActions';
import ProjectRevenueAPI from '../../../../../../api/project/ProjectRevenueAPI';
import moment from 'moment-business-days';
import InputDate from '../../../../../../components/form/InputDate';
import ButtonIcon from '../../../../../../components/button/ButtonIcon';

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
            datePayout: moment()
                .nextBusinessDay()
                .format('YYYY-MM-DD'),
            datePayoutError: false,
            subject: [],
            documentGroup: '',
            checkedAll: false,
            showCheckboxList: false,
            showModal: false,
            showSuccessMessage: false,
            modalText: '',
            buttonConfirmText: '',
            readyForCreation: false,
            createType: '',
        };
    }

    componentDidMount() {
        DocumentTemplateAPI.fetchDocumentTemplatesPeekGeneral().then(payload => {
            let templates = [];

            payload.forEach(function(template) {
                if (template.group == 'revenue') {
                    templates.push({ id: template.id, name: template.name });
                }
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

        this.props.getDistribution(this.props.projectRevenue.id, 0);
    }

    reloadDistributions = () => {
        this.props.getDistribution(this.props.projectRevenue.id, 0);
    };

    changePage = event => {
        const page = event.selected;

        this.props.getDistribution(this.props.projectRevenue.id, page);
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };
    handleInputChangeDate = (value, name) => {
        this.setState({
            [name]: value,
        });
    };

    handleSubjectChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            subject: value,
        });
    };

    handleEmailTemplateChange = event => {
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
    };

    toggleShowCheckboxList = createType => {
        if (this.state.showCheckboxList) {
            this.setState({
                showCheckboxList: false,
                distributionIds: [],
                createType: '',
            });
        } else {
            this.setState({
                showCheckboxList: true,
                createType: createType,
                distributionIds: this.props.projectRevenue.distribution.data.map(distribution => distribution.id),
                checkedAll: true,
            });
        }
    };

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal,
        });
    };

    toggleCheckedAll = event => {
        const isChecked = event.target.checked;

        let distributionsIds = [];

        if (isChecked) {
            distributionsIds = this.props.projectRevenue.distribution.data.map(distribution => distribution.id);
        }

        this.setState({
            distributionIds: distributionsIds,
            checkedAll: isChecked,
        });
    };

    closeSuccesMessage = () => {
        this.toggleShowCheckboxList();
        this.setState({
            showSuccessMessage: '',
            createType: '',
        });
        this.reloadDistributions();
    };

    toggleDistributionCheck = event => {
        const isChecked = event.target.checked;
        const distributionId = Number(event.target.name);

        if (isChecked) {
            this.setState(
                {
                    distributionIds: [...this.state.distributionIds, distributionId],
                },
                this.checkAllDistributionsAreChecked
            );
        } else {
            this.setState({
                distributionIds: this.state.distributionIds.filter(item => item !== distributionId),
                checkedAll: false,
            });
        }
    };

    checkAllDistributionsAreChecked() {
        this.setState({
            checkedAll: this.state.distributionIds.length === this.props.projectRevenue.distribution.data.length,
        });
    }

    checkDistributionRevenueReport = () => {
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

        if (validator.isEmpty(this.state.datePayout + '')) {
            error = true;
            this.setState({
                datePayoutError: true,
            });
        } else {
            this.setState({
                datePayoutError: false,
            });
        }

        if (this.state.distributionIds.length > 0 && !error) {
            if (!this.props.projectRevenue.project.administration.canCreatePaymentInvoices['can']) {
                this.props.setError(
                    412,
                    this.props.projectRevenue.project.administration.canCreatePaymentInvoices['message']
                );
                this.setState({
                    showModal: false,
                });
                return;
            } else {
                this.props.previewReport({
                    templateId: this.state.templateId,
                    emailTemplateId: this.state.emailTemplateId,
                    subject: this.state.subject,
                    distributionIds: this.state.distributionIds,
                });
                hashHistory.push(`/project/opbrengst/${this.props.projectRevenue.id}/facturen`);
            }
        } else if (!error) {
            this.setState({
                showModal: true,
                modalText: 'Er zijn geen deelnemers geselecteerd.',
                buttonConfirmText: 'Voeg deelnemers toe',
            });
        }
    };

    checkDistributionRevenueInvoices = () => {
        if (this.state.distributionIds.length) {
            this.createPaymentInvoices();
        } else {
            this.setState({
                showModal: true,
                modalText: 'Er zijn geen deelnemers geselecteerd.',
                buttonConfirmText: 'Voeg deelnemers toe',
            });
        }
    };

    createPaymentInvoices = () => {
        let administrationName = '**onbekend**';
        if (
            this.props.projectRevenue &&
            this.props.projectRevenue.project &&
            this.props.projectRevenue.project.administration
        ) {
            administrationName = this.props.projectRevenue.project.administration.name;
        }

        let succesMessageText = '';
        if (this.props.projectRevenue.category.codeRef === 'revenueKwh') {
            succesMessageText = `De mutaties van opbrengsten bij de deelnemers zijn aangemaakt. De status van de uitkeringen zijn veranderd van "Definitief" in Verwerkt.
                Mutaties die niet verwerkt konden worden, omdat er gegevens ontbreken bij het contact, zijn niet aangemaakt bij de deelnemers. Zij behouden de status "Definitief". Maak de gegevens compleet en maak vervolgens opnieuw een opbrengst verdeling van de uitkering met de status "Definitief".`;
        } else {
            succesMessageText =
                `De mutaties van opbrengsten bij de deelnemers zijn aangemaakt. De status van de uitkeringen zijn veranderd van "Definitief" in Verwerkt.
                Indien er sprake is van uitkeren op rekening, dan is er van de betreffende uitkeringen een Sepa betaalbestand aangemaakt. Deze kan je vinden bij de administratie "` +
                administrationName +
                `". Mutaties die niet verwerkt konden worden, omdat er gegevens ontbreken bij het contact, zijn niet aangemaakt bij de deelnemers. Zij behouden de status "Definitief". Maak de gegevens compleet en maak vervolgens opnieuw een opbrengst verdeling van de uitkering met de status "Definitief."`;
        }

        document.body.style.cursor = 'wait';
        ProjectRevenueAPI.createPaymentInvoices(this.state.datePayout, this.state.distributionIds).then(payload => {
            document.body.style.cursor = 'default';
            this.setState({
                showSuccessMessage: true,
                successMessage: succesMessageText,
            });
        });
    };
    render() {
        let administrationIds = [];
        this.props.administrations.forEach(function(administration) {
            administrationIds.push(administration.id);
        });
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Opbrengstverdeling deelnemers</span>
                    <div className="btn-group pull-right">
                        <ButtonIcon iconName={'glyphicon-refresh'} onClickAction={this.reloadDistributions} />
                        {this.props.projectRevenue.confirmed == 1 &&
                            administrationIds.includes(this.props.projectRevenue.project.administrationId) &&
                            (this.state.createType === '' ? (
                                <React.Fragment>
                                    <ButtonText
                                        buttonText={'Selecteer preview rapportage'}
                                        onClickAction={() => this.toggleShowCheckboxList('createReport')}
                                    />
                                    <ButtonText
                                        buttonText={'Selecteer preview opbrengst verdeling'}
                                        onClickAction={() => this.toggleShowCheckboxList('createInvoices')}
                                        buttonClassName={'btn-primary'}
                                    />
                                </React.Fragment>
                            ) : null)}
                    </div>
                </PanelHeader>
                <PanelBody>
                    {this.state.showCheckboxList && this.state.createType === 'createReport' ? (
                        <Panel>
                            <PanelBody>
                                <div className="row">
                                    <div className="col-md-12">
                                        <ViewText label="Documentgroep" value={'Opbrengst'} />
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
                                        <div className="margin-10-top pull-right btn-group" role="group">
                                            <ButtonText
                                                buttonClassName={'btn-default'}
                                                buttonText={'Annuleren'}
                                                onClickAction={this.toggleShowCheckboxList}
                                            />
                                            <ButtonText
                                                buttonText={'Preview rapportage'}
                                                onClickAction={this.checkDistributionRevenueReport}
                                                type={'submit'}
                                                value={'Submit'}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </PanelBody>
                        </Panel>
                    ) : null}
                    {this.state.showCheckboxList && this.state.createType === 'createInvoices' ? (
                        <Panel>
                            <PanelBody>
                                <div className="row">
                                    <div className="col-md-12">
                                        <InputDate
                                            label="Uitkeringsdatum"
                                            name="datePayout"
                                            value={this.state.datePayout}
                                            onChangeAction={this.handleInputChangeDate}
                                            required={'required'}
                                            disabledBefore={moment()
                                                .nextBusinessDay()
                                                .format('YYYY-MM-DD')}
                                            // todo In testfase niet handig, wellicht na in gebruik name wel ?
                                            // disabledAfter={moment()
                                            //     .add(1, 'year')
                                            //     .format('YYYY-MM-DD')}
                                            error={this.state.datePayoutError}
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
                                                buttonText={
                                                    this.props.projectRevenue.category.codeRef === 'revenueKwh'
                                                        ? 'Opbrengst verdelen'
                                                        : 'Opbrengst verdelen en Sepa bestand maken'
                                                }
                                                onClickAction={this.checkDistributionRevenueInvoices}
                                                type={'submit'}
                                                value={'Submit'}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </PanelBody>
                        </Panel>
                    ) : null}
                    <div className="col-md-12">
                        <RevenueDistributionFormList
                            changePage={this.changePage}
                            showCheckboxList={this.state.showCheckboxList}
                            toggleCheckedAll={this.toggleCheckedAll}
                            checkedAll={this.state.checkedAll}
                            toggleDistributionCheck={this.toggleDistributionCheck}
                            distributionIds={this.state.distributionIds}
                            createType={this.state.createType}
                        />
                    </div>
                </PanelBody>
                {this.state.showModal && (
                    <Modal
                        title={'Deelnemer rapport maken'}
                        closeModal={this.toggleModal}
                        buttonConfirmText={this.state.buttonConfirmText}
                        confirmAction={this.createDistributionRevenueReport}
                    >
                        {this.state.modalText}
                    </Modal>
                )}
                {this.state.showSuccessMessage && (
                    <Modal
                        title={'Succes'}
                        closeModal={this.closeSuccesMessage}
                        buttonCancelText={'Ok'}
                        showConfirmAction={false}
                    >
                        {this.state.successMessage}
                    </Modal>
                )}
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        projectRevenue: state.projectRevenue,
        documentGroups: state.systemData.documentGroups,
        administrations: state.meDetails.administrations,
    };
};

const mapDispatchToProps = dispatch => ({
    previewReport: id => {
        dispatch(previewReport(id));
    },
    getDistribution: (id, page) => {
        dispatch(getDistribution({ id, page }));
    },
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RevenueDistributionForm);
