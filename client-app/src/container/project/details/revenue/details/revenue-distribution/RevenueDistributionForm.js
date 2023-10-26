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
import ErrorModal from '../../../../../../components/modal/ErrorModal';
import InputToggle from '../../../../../../components/form/InputToggle';

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
            modalText2: '',
            modalAction: this.toggleModal,
            buttonConfirmText: '',
            readyForCreation: false,
            createType: '',
            showErrorModal: false,
            modalErrorMessage: '',
            showOnPortal: true,
            description: '',
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
                distributionIds: this.props.projectRevenue.distribution.meta.distributionIdsTotal,
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
            distributionsIds = this.props.projectRevenue.distribution.meta.distributionIdsTotal;
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
            checkedAll:
                this.state.distributionIds.length ===
                this.props.projectRevenue.distribution.meta.distributionIdsTotal.length,
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
            this.props.previewReport({
                templateId: this.state.templateId,
                emailTemplateId: this.state.emailTemplateId,
                subject: this.state.subject,
                distributionIds: this.state.distributionIds,
                showOnPortal: this.state.showOnPortal,
            });
            hashHistory.push(`/project/opbrengst/${this.props.projectRevenue.id}/rapportage`);
        } else if (!error) {
            this.setState({
                showModal: true,
                modalText: 'Er zijn geen deelnemers geselecteerd.',
                buttonConfirmText: 'Voeg deelnemers toe',
            });
        }
    };

    checkDistributionRevenueInvoices = () => {
        let lastYearFinancialOverviewDefinitive = 0;
        if (
            this.props.projectRevenue.project &&
            this.props.projectRevenue.project.lastYearFinancialOverviewDefinitive
        ) {
            lastYearFinancialOverviewDefinitive = this.props.projectRevenue.project.lastYearFinancialOverviewDefinitive;
        } else if (
            this.props.projectRevenue.project.administration &&
            this.props.projectRevenue.project.administration.lastYearFinancialOverviewDefinitive
        ) {
            lastYearFinancialOverviewDefinitive = this.props.projectRevenue.project.administration
                .lastYearFinancialOverviewDefinitive;
        }
        let disableBeforeEntryDate =
            lastYearFinancialOverviewDefinitive > 0
                ? moment(moment().year(lastYearFinancialOverviewDefinitive + 1)).format('YYYY-01-01')
                : '';
        const $variableDateText =
            'redemptionEuro' === this.props.projectRevenue.category.codeRef ? 'aflossingsdatum' : 'uitkeringsdatum';

        if (
            !validator.isEmpty(disableBeforeEntryDate) &&
            moment(this.state.datePayout).format('YYYY-MM-DD') < disableBeforeEntryDate
        ) {
            this.props.setError(
                412,
                'De ' +
                    $variableDateText +
                    ' valt in jaar waar al een definitive waardestaat voor dit project aanwezig is.'
            );
            this.setState({
                showModal: false,
            });
            return;
        }
        if (this.state.distributionIds.length) {
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
                this.setState({
                    showModal: true,
                    modalText:
                        'De ' +
                        $variableDateText +
                        ' wordt de datum die bij de mutatie komt te staan in de deelname overzichten van de deelnemers.\n' +
                        'In een eventueel te maken Sepa betaalbestand wordt dit de datum waarop het bedrag van jouw rekening wordt afgeschreven, als je het Sepa betaalbestand hebt aangeboden bij je bank. Als je dus een ' +
                        $variableDateText +
                        ' gebruikt, die voor of op de huidige datum ligt, dan kan je het Sepa bestand dus niet gebruiken.\n' +
                        '\n' +
                        'Weet je zeker dat je de goede ' +
                        $variableDateText +
                        ' hebt gekozen ?',
                    modalText2:
                        moment(this.state.datePayout).format('YYYY-MM-DD') <
                        moment()
                            .nextBusinessDay()
                            .format('YYYY-MM-DD')
                            ? 'Gekozen ' +
                              $variableDateText +
                              ' (' +
                              moment(this.state.datePayout).format('L') +
                              ') ligt voor volgende werkdag!'
                            : '',
                    modalAction: this.createPaymentInvoices,
                    buttonConfirmText: 'Ga verder',
                });
            }
        } else {
            this.setState({
                showModal: true,
                modalText: 'Er zijn geen deelnemers geselecteerd.',
                buttonConfirmText: 'Voeg deelnemers toe',
            });
        }
    };

    createPaymentInvoices = () => {
        this.toggleModal();
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
                Mutaties die niet verwerkt konden worden, omdat er gegevens ontbreken bij het contact, zijn niet aangemaakt bij de deelnemers. Zij behouden de status "Definitief". Maak de gegevens compleet en maak vervolgens opnieuw een opbrengst verdeling van de uitkeringen met de status "Definitief".`;
        } else if (this.props.projectRevenue.category.codeRef === 'redemptionEuro') {
            succesMessageText = `De mutaties van aflossing bij de deelnemers zijn aangemaakt. De status van de aflossingen zijn veranderd van "Definitief" in Verwerkt.
                Mutaties die niet verwerkt konden worden, omdat er gegevens ontbreken bij het contact, zijn niet aangemaakt bij de deelnemers. Zij behouden de status "Definitief". Maak de gegevens compleet en maak vervolgens opnieuw een aflossing verdeling van de aflossingen met de status "Definitief".`;
        } else {
            succesMessageText =
                `De mutaties van opbrengsten bij de deelnemers zijn aangemaakt. De status van de uitkeringen zijn veranderd van "Definitief" in Verwerkt.
                Indien er sprake is van uitkeren op rekening, dan is er van de betreffende uitkeringen een Sepa betaalbestand aangemaakt. Deze kan je vinden bij de administratie "` +
                administrationName +
                `". Mutaties die niet verwerkt konden worden, omdat er gegevens ontbreken bij het contact, zijn niet aangemaakt bij de deelnemers. Zij behouden de status "Definitief". Maak de gegevens compleet en maak vervolgens opnieuw een opbrengst verdeling van de uitkeringen met de status "Definitief."`;
        }
        document.body.style.cursor = 'wait';
        ProjectRevenueAPI.createPaymentInvoices(
            this.state.datePayout,
            this.state.distributionIds,
            this.state.description
        )
            .then(payload => {
                document.body.style.cursor = 'default';
                this.setState({
                    showSuccessMessage: true,
                    successMessage: succesMessageText,
                });
            })
            .catch(error => {
                let errorObject = JSON.parse(JSON.stringify(error));
                let errorMessage = 'Er is iets misgegaan bij opslaan. Probeer het opnieuw.';
                if (errorObject.response.status !== 500) {
                    errorMessage = errorObject.response.data.message;
                }
                this.setState({
                    showErrorModal: true,
                    modalErrorMessage: errorMessage,
                });
            });
    };

    closeErrorModal = () => {
        this.setState({ showErrorModal: false, modalErrorMessage: '' });
    };

    render() {
        let administrationIds = [];
        this.props.administrations.forEach(function(administration) {
            administrationIds.push(administration.id);
        });
        let numberSelectedNumberTotal = 0;
        if (
            this.props &&
            this.props.projectRevenue &&
            this.props.projectRevenue.distribution &&
            this.props.projectRevenue.distribution.meta &&
            this.props.projectRevenue.distribution.meta.distributionIdsTotal
        ) {
            numberSelectedNumberTotal =
                this.state.distributionIds.length +
                '/' +
                this.props.projectRevenue.distribution.meta.distributionIdsTotal.length;
        } else {
            numberSelectedNumberTotal = this.state.distributionIds.length;
        }

        let totalToProcess = 0;
        if (
            this.props &&
            this.props.projectRevenue &&
            this.props.projectRevenue.distribution &&
            this.props.projectRevenue.distribution.meta &&
            this.props.projectRevenue.distribution.meta.totalToProcess
        ) {
            totalToProcess = this.props.projectRevenue.distribution.meta.totalToProcess;
        } else {
            totalToProcess = 0;
        }

        let distributionIdsTotalToProcess = [];
        if (
            this.props &&
            this.props.projectRevenue &&
            this.props.projectRevenue.distribution &&
            this.props.projectRevenue.distribution.meta &&
            this.props.projectRevenue.distribution.meta.distributionIdsTotalToProcess
        ) {
            distributionIdsTotalToProcess = this.props.projectRevenue.distribution.meta.distributionIdsTotalToProcess;
        }

        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Opbrengstverdeling deelnemers</span>
                    <div className="btn-group pull-right">
                        <ButtonIcon iconName={'refresh'} onClickAction={this.reloadDistributions} />
                        {this.props.projectRevenue.confirmed == 1 &&
                            administrationIds.includes(this.props.projectRevenue.project.administrationId) &&
                            (this.state.createType === '' ? (
                                <React.Fragment>
                                    <ButtonText
                                        buttonText={'Selecteer preview rapportage'}
                                        onClickAction={() => this.toggleShowCheckboxList('createReport')}
                                    />
                                    <ButtonText
                                        buttonText={
                                            this.props.projectRevenue.category.codeRef === 'redemptionEuro'
                                                ? 'Selecteer preview aflossing verdeling'
                                                : 'Selecteer preview mutaties en sepa bestand uitkeringsdatum'
                                        }
                                        onClickAction={() => this.toggleShowCheckboxList('createInvoices')}
                                        buttonClassName={'btn-primary'}
                                        title={
                                            this.props.projectRevenue.category.codeRef === 'redemptionEuro'
                                                ? ' '
                                                : "De uitkeringsdatum is de datum in het SEPA bestand en de datum van de mutaties in het mutatieoverzicht van de deelnemers. Als je niet gaat uitkeren ('naar kapitaalrekening (niet uitbetalen)') betreft het alleen de mutatiedatum en is de uitkeringsdatum niet van toepassing."
                                        }
                                        disabled={
                                            totalToProcess === 0
                                                ? true
                                                : false
                                        }
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
                                        <ViewText label="Geselecteerde deelnemers" value={numberSelectedNumberTotal} />
                                        <InputToggle
                                            label={'Rapportage tonen op portal'}
                                            name={'showOnPortal'}
                                            value={this.state.showOnPortal}
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
                                    <div className="col-md-6">
                                        <InputDate
                                            label={
                                                this.props.projectRevenue.category.codeRef === 'redemptionEuro'
                                                    ? 'Aflossingsdatum'
                                                    : 'Uitkeringsdatum'
                                            }
                                            name="datePayout"
                                            value={this.state.datePayout}
                                            onChangeAction={this.handleInputChangeDate}
                                            required={'required'}
                                            size={'col-md-5'}
                                            labelSize={'col-md-7'}
                                            divSize={'col-md-12'}
                                            // Ze willen ook datum in verleden kunnen opgeven
                                            // disabledBefore={moment()
                                            //     .nextBusinessDay()
                                            //     .format('YYYY-MM-DD')}
                                            // todo In testfase niet handig, wellicht na in gebruik name wel ?
                                            // disabledAfter={moment()
                                            //     .add(1, 'year')
                                            //     .format('YYYY-MM-DD')}
                                            error={this.state.datePayoutError}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <InputText
                                            label={'Omschrijving transacties'}
                                            name={'description'}
                                            size={'col-md-7'}
                                            labelSize={'col-md-5'}
                                            divSize={'col-md-12'}
                                            maxLength={100}
                                            onChangeAction={this.handleInputChange}
                                            value={this.state.description}
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
                                                        ? 'Mutaties aanmaken'
                                                        : this.props.projectRevenue.category.codeRef ===
                                                          'redemptionEuro'
                                                        ? 'Aflossing verdelen en Sepa bestand maken'
                                                        : 'Mutaties aanmaken en Sepa bestand maken'
                                                }
                                                onClickAction={this.checkDistributionRevenueInvoices}
                                                type={'submit'}
                                                value={'Submit'}
                                                title={
                                                    this.props.projectRevenue.category.codeRef === 'revenueKwh'
                                                        ? ' '
                                                        : this.props.projectRevenue.category.codeRef ===
                                                          'redemptionEuro'
                                                        ? ' '
                                                        : 'Met de knop Mutaties aanmaken en Sepa bestand maak je mutaties aan in het mutatieoverzicht van de individuele deelnemers en genereer je een Sepa bestand om bij de bank te uploaden. Het Sepa bestand vind je na het aanmaken terug bij Instellingen > Administratie > onder de betreffende administratie.'
                                                }
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
                            distributionIdsTotalToProcess={distributionIdsTotalToProcess}
                        />
                    </div>
                </PanelBody>
                {this.state.showModal && (
                    <Modal
                        title={'Deelnemer rapport maken'}
                        closeModal={this.toggleModal}
                        buttonConfirmText={this.state.buttonConfirmText}
                        confirmAction={this.state.modalAction}
                    >
                        {this.state.modalText}
                        <br />
                        <br />
                        {this.state.modalText2}
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
                {this.state.showErrorModal && (
                    <ErrorModal
                        closeModal={this.closeErrorModal}
                        title={'Fout bij opslaan'}
                        errorMessage={this.state.modalErrorMessage}
                    />
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

export default connect(mapStateToProps, mapDispatchToProps)(RevenueDistributionForm);
