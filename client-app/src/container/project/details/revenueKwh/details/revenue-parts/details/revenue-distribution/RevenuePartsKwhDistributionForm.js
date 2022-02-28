import React, { Component } from 'react';

import Panel from '../../../../../../../../components/panel/Panel';
import PanelBody from '../../../../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../../../../components/panel/PanelHeader';
import { connect } from 'react-redux';
import ButtonText from '../../../../../../../../components/button/ButtonText';
import Modal from '../../../../../../../../components/modal/Modal';
import InputSelect from '../../../../../../../../components/form/InputSelect';
import DocumentTemplateAPI from '../../../../../../../../api/document-template/DocumentTemplateAPI';
import validator from 'validator';
import { hashHistory } from 'react-router';
import ViewText from '../../../../../../../../components/form/ViewText';
import EmailTemplateAPI from '../../../../../../../../api/email-template/EmailTemplateAPI';
import InputText from '../../../../../../../../components/form/InputText';
import {
    fetchRevenuePartsKwh,
    getDistributionPartsKwh,
    previewReportPartsKwh,
} from '../../../../../../../../actions/project/ProjectDetailsActions';
import { setError } from '../../../../../../../../actions/general/ErrorActions';
import moment from 'moment-business-days';
import InputDate from '../../../../../../../../components/form/InputDate';
import ButtonIcon from '../../../../../../../../components/button/ButtonIcon';
import ErrorModal from '../../../../../../../../components/modal/ErrorModal';
import RevenuePartsKwhDistributionFormList from './RevenuePartsKwhDistributionFormList';
import RevenuePartsKwhAPI from '../../../../../../../../api/project/RevenuePartsKwhAPI';

class RevenuePartsKwhDistributionForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            partsId: this.props.revenuePartsKwh.id,
            partsStatus: this.props.revenuePartsKwh.status,
            distributionPartsKwhIds: [],
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

        this.props.getDistributionPartsKwh(this.props.revenuePartsKwh.id, 0);
    }

    reloadDistributions = () => {
        this.props.fetchRevenuePartsKwh(this.props.revenuePartsKwh.id);
        this.props.getDistributionPartsKwh(this.props.revenuePartsKwh.id, 0);
    };

    changePage = event => {
        const page = event.selected;

        this.props.getDistributionPartsKwh(this.props.revenuePartsKwh.id, page);
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
                distributionPartsKwhIds: [],
                createType: '',
            });
        } else {
            this.setState({
                showCheckboxList: true,
                createType: createType,
                distributionPartsKwhIds: this.props.revenuePartsKwh.distributionPartsKwh.meta
                    .distributionPartsKwhIdsTotal,
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

        let distributionPartsKwhIds = [];

        if (isChecked) {
            distributionPartsKwhIds = this.props.revenuePartsKwh.distributionPartsKwh.meta.distributionPartsKwhIdsTotal;
        }

        this.setState({
            distributionPartsKwhIds: distributionPartsKwhIds,
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
        const distributionPartsKwhId = Number(event.target.name);

        if (isChecked) {
            this.setState(
                {
                    distributionPartsKwhIds: [...this.state.distributionPartsKwhIds, distributionPartsKwhId],
                },
                this.checkAllDistributionsAreChecked
            );
        } else {
            this.setState({
                distributionPartsKwhIds: this.state.distributionPartsKwhIds.filter(
                    item => item !== distributionPartsKwhId
                ),
                checkedAll: false,
            });
        }
    };

    checkAllDistributionsAreChecked() {
        this.setState({
            checkedAll:
                this.state.distributionPartsKwhIds.length ===
                this.props.revenuePartsKwh.distributionPartsKwh.meta.distributionPartsKwhIdsTotal.length,
        });
    }

    checkDistributionPartsKwhRevenueReport = () => {
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

        if (this.state.distributionPartsKwhIds.length > 0 && !error) {
            this.props.previewReportPartsKwh({
                templateId: this.state.templateId,
                emailTemplateId: this.state.emailTemplateId,
                subject: this.state.subject,
                distributionPartsKwhIds: this.state.distributionPartsKwhIds,
            });
            hashHistory.push(`/project/opbrengst-deelperiode-kwh/${this.props.revenuePartsKwh.id}/rapportage`);
        } else if (!error) {
            this.setState({
                showModal: true,
                modalText: 'Er zijn geen deelnemers geselecteerd.',
                buttonConfirmText: 'Voeg deelnemers toe',
            });
        }
    };

    checkDistributionPartsKwhRevenueInvoices = () => {
        let lastYearFinancialOverviewDefinitive = 0;
        if (
            this.props &&
            this.props.revenuesKwh &&
            this.props.revenuesKwh.project &&
            this.props.revenuesKwh.project.lastYearFinancialOverviewDefinitive
        ) {
            lastYearFinancialOverviewDefinitive = this.props.revenuesKwh.project.lastYearFinancialOverviewDefinitive;
        } else if (
            this.props &&
            this.props.revenuesKwh &&
            this.props.revenuesKwh.project.administration &&
            this.props.revenuesKwh.project.administration.lastYearFinancialOverviewDefinitive
        ) {
            lastYearFinancialOverviewDefinitive = this.props.revenuesKwh.project.administration
                .lastYearFinancialOverviewDefinitive;
        }
        let disableBeforeEntryDate =
            lastYearFinancialOverviewDefinitive > 0
                ? moment(moment().year(lastYearFinancialOverviewDefinitive + 1)).format('YYYY-01-01')
                : '';
        const $variableDateText = 'uitkeringsdatum';

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
        if (this.state.distributionPartsKwhIds.length) {
            if (!this.props.revenuesKwh.project.administration.canCreatePaymentInvoices['can']) {
                this.props.setError(
                    412,
                    this.props.revenuesKwh.project.administration.canCreatePaymentInvoices['message']
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
                    modalAction: this.processRevenuePartsKwh,
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

    processRevenuePartsKwh = () => {
        this.toggleModal();
        let succesMessageText = `De mutaties van opbrengsten bij de geselecteerde deelnemers worden aangemaakt. De status van de uitkeringen worden veranderd van "Definitief" in "Verwerkt".
                Mutaties die niet verwerkt konden worden, omdat er gegevens ontbreken bij het contact, worden niet aangemaakt bij de deelnemers. Zij behouden de status "Definitief". Maak de gegevens compleet en maak vervolgens opnieuw een opbrengst verdeling van de uitkeringen met de status "Definitief".`;

        document.body.style.cursor = 'wait';
        RevenuePartsKwhAPI.processRevenuePartsKwh(
            this.state.partsId,
            this.state.datePayout,
            this.state.distributionPartsKwhIds
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
            this.props.revenuePartsKwh &&
            this.props.revenuePartsKwh.distributionPartsKwh &&
            this.props.revenuePartsKwh.distributionPartsKwh.meta &&
            this.props.revenuePartsKwh.distributionPartsKwh.meta.distributionPartsKwhIdsTotal
        ) {
            numberSelectedNumberTotal =
                this.state.distributionPartsKwhIds.length +
                '/' +
                this.props.revenuePartsKwh.distributionPartsKwh.meta.distributionPartsKwhIdsTotal.length;
        } else {
            numberSelectedNumberTotal = this.state.distributionPartsKwhIds.length;
        }
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Opbrengstverdeling deelnemers</span>
                    <div className="btn-group pull-right">
                        <ButtonIcon iconName={'glyphicon-refresh'} onClickAction={this.reloadDistributions} />
                        {this.props.revenuePartsKwh &&
                        this.props.revenuePartsKwh.confirmed == 1 &&
                        administrationIds.includes(
                            this.props &&
                                this.props.revenuesKwh &&
                                this.props.revenuesKwh.project &&
                                this.props.revenuesKwh.project.administrationId
                        ) &&
                        this.state.createType === '' ? (
                            <React.Fragment>
                                {/*<ButtonText*/}
                                {/*    buttonText={'Selecteer preview rapportage'}*/}
                                {/*    onClickAction={() => this.toggleShowCheckboxList('createReport')}*/}
                                {/*/>*/}
                                {this.props.revenuePartsKwh.status == 'confirmed' ? (
                                    <ButtonText
                                        buttonText={'Selecteer preview opbrengst verdeling'}
                                        onClickAction={() => this.toggleShowCheckboxList('processRevenues')}
                                        buttonClassName={'btn-primary'}
                                    />
                                ) : null}
                            </React.Fragment>
                        ) : null}
                    </div>
                </PanelHeader>
                <PanelBody>
                    {/*{this.state.showCheckboxList && this.state.createType === 'createReport' ? (*/}
                    {/*    <Panel>*/}
                    {/*        <PanelBody>*/}
                    {/*            <div className="row">*/}
                    {/*                <div className="col-md-12">*/}
                    {/*                    <ViewText label="Documentgroep" value={'Opbrengst'} />*/}
                    {/*                    <InputSelect*/}
                    {/*                        label="Document template"*/}
                    {/*                        name={'templateId'}*/}
                    {/*                        value={this.state.templateId}*/}
                    {/*                        options={this.state.templates}*/}
                    {/*                        onChangeAction={this.handleInputChange}*/}
                    {/*                        required={'required'}*/}
                    {/*                        error={this.state.templateIdError}*/}
                    {/*                    />*/}
                    {/*                </div>*/}
                    {/*                <div className="col-md-12">*/}
                    {/*                    <InputSelect*/}
                    {/*                        label="E-mail template"*/}
                    {/*                        name={'emailTemplateId'}*/}
                    {/*                        value={this.state.emailTemplateId}*/}
                    {/*                        options={this.state.emailTemplates}*/}
                    {/*                        onChangeAction={this.handleEmailTemplateChange}*/}
                    {/*                        required={'required'}*/}
                    {/*                        error={this.state.emailTemplateIdError}*/}
                    {/*                    />*/}
                    {/*                    <InputText*/}
                    {/*                        label={'E-mail onderwerp'}*/}
                    {/*                        name={'subject'}*/}
                    {/*                        value={this.state.subject}*/}
                    {/*                        onChangeAction={this.handleSubjectChange}*/}
                    {/*                    />*/}
                    {/*                </div>*/}
                    {/*                <div className="col-md-12">*/}
                    {/*                    <ViewText label="Geselecteerde deelnemers" value={numberSelectedNumberTotal} />*/}

                    {/*                    <div className="margin-10-top pull-right btn-group" role="group">*/}
                    {/*                        <ButtonText*/}
                    {/*                            buttonClassName={'btn-default'}*/}
                    {/*                            buttonText={'Annuleren'}*/}
                    {/*                            onClickAction={this.toggleShowCheckboxList}*/}
                    {/*                        />*/}
                    {/*                        <ButtonText*/}
                    {/*                            buttonText={'Preview rapportage'}*/}
                    {/*                            onClickAction={this.checkDistributionPartsKwhRevenueReport}*/}
                    {/*                            type={'submit'}*/}
                    {/*                            value={'Submit'}*/}
                    {/*                        />*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </PanelBody>*/}
                    {/*    </Panel>*/}
                    {/*) : null}*/}
                    {this.state.showCheckboxList && this.state.createType === 'processRevenues' ? (
                        <Panel>
                            <PanelBody>
                                <div className="row">
                                    <div className="col-md-12">
                                        <InputDate
                                            label={'Uitkeringsdatum'}
                                            name="datePayout"
                                            value={this.state.datePayout}
                                            onChangeAction={this.handleInputChangeDate}
                                            required={'required'}
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
                                    <div className="col-md-12">
                                        <div className="margin-10-top pull-right btn-group" role="group">
                                            <ButtonText
                                                buttonClassName={'btn-default'}
                                                buttonText={'Annuleren'}
                                                onClickAction={this.toggleShowCheckboxList}
                                            />
                                            <ButtonText
                                                buttonText={'Opbrengst verdelen'}
                                                onClickAction={this.checkDistributionPartsKwhRevenueInvoices}
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
                        <RevenuePartsKwhDistributionFormList
                            changePage={this.changePage}
                            showCheckboxList={this.state.showCheckboxList}
                            toggleCheckedAll={this.toggleCheckedAll}
                            checkedAll={this.state.checkedAll}
                            toggleDistributionCheck={this.toggleDistributionCheck}
                            distributionPartsKwhIds={this.state.distributionPartsKwhIds}
                            createType={this.state.createType}
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
        revenuePartsKwh: state.revenuePartsKwh,
        revenuesKwh: state.revenuesKwh,
        documentGroups: state.systemData.documentGroups,
        administrations: state.meDetails.administrations,
    };
};

const mapDispatchToProps = dispatch => ({
    previewReportPartsKwh: id => {
        dispatch(previewReportPartsKwh(id));
    },
    fetchRevenuePartsKwh: id => {
        dispatch(fetchRevenuePartsKwh(id));
    },
    getDistributionPartsKwh: (id, page) => {
        dispatch(getDistributionPartsKwh({ id, page }));
    },
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(RevenuePartsKwhDistributionForm);
