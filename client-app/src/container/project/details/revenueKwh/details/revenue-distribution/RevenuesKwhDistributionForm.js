import React, { Component } from 'react';

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
import {
    fetchRevenuesKwh,
    getDistributionKwh,
    previewReportKwh,
} from '../../../../../../actions/project/ProjectDetailsActions';
import { setError } from '../../../../../../actions/general/ErrorActions';
import moment from 'moment-business-days';
import ButtonIcon from '../../../../../../components/button/ButtonIcon';
import ErrorModal from '../../../../../../components/modal/ErrorModal';
import RevenuesKwhDistributionFormList from './RevenuesKwhDistributionFormList';
import InputToggle from '../../../../../../components/form/InputToggle';
import RevenuesKwhAPI from '../../../../../../api/project/RevenuesKwhAPI';

class RevenuesKwhDistributionForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            distributionKwhIds: [],
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
            modalText3: '',
            modalAction: this.toggleModal,
            buttonConfirmText: '',
            readyForCreation: false,
            createType: '',
            showErrorModal: false,
            modalErrorMessage: '',
            showOnPortal: true,
            isBusy: false,
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

        this.props.getDistributionKwh(this.props.revenuesKwh.id, 0);
    }

    reloadDistributions = () => {
        this.props.fetchRevenuesKwh(this.props.revenuesKwh.id);
        this.props.getDistributionKwh(this.props.revenuesKwh.id, 0);
    };

    changePage = event => {
        const page = event.selected;

        this.props.getDistributionKwh(this.props.revenuesKwh.id, page);
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
                distributionKwhIds: [],
                createType: '',
            });
        } else {
            this.setState({
                showCheckboxList: true,
                createType: createType,
                distributionKwhIds: this.props.revenuesKwh.distributionKwh.meta.distributionKwhIdsTotal,
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

        let distributionKwhIds = [];

        if (isChecked) {
            distributionKwhIds = this.props.revenuesKwh.distributionKwh.meta.distributionKwhIdsTotal;
        }

        this.setState({
            distributionKwhIds: distributionKwhIds,
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
        const distributionKwhId = Number(event.target.name);

        if (isChecked) {
            this.setState(
                {
                    distributionKwhIds: [...this.state.distributionKwhIds, distributionKwhId],
                },
                this.checkAllDistributionsAreChecked
            );
        } else {
            this.setState({
                distributionKwhIds: this.state.distributionKwhIds.filter(item => item !== distributionKwhId),
                checkedAll: false,
            });
        }
    };

    checkAllDistributionsAreChecked() {
        this.setState({
            checkedAll:
                this.state.distributionKwhIds.length ===
                this.props.revenuesKwh.distributionKwh.meta.distributionKwhIdsTotal.length,
        });
    }

    checkDistributionKwhRevenueReport = () => {
        let error = false;

        // document template not longer required
        // if (validator.isEmpty(this.state.templateId)) {
        //     error = true;
        //     this.setState({
        //         templateIdError: true,
        //     });
        // } else {
        //     this.setState({
        //         templateIdError: false,
        //     });
        // }

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

        if (this.state.distributionKwhIds.length > 0 && !error) {
            this.props.previewReportKwh({
                templateId: this.state.templateId,
                emailTemplateId: this.state.emailTemplateId,
                subject: this.state.subject,
                distributionKwhIds: this.state.distributionKwhIds,
                showOnPortal: this.state.showOnPortal,
            });
            hashHistory.push(`/project/opbrengst-kwh/${this.props.revenuesKwh.id}/rapportage`);
        } else if (!error) {
            this.setState({
                showModal: true,
                modalText: 'Er zijn geen deelnemers geselecteerd.',
                buttonConfirmText: 'Voeg deelnemers toe',
            });
        }
    };

    closeErrorModal = () => {
        this.setState({ showErrorModal: false, modalErrorMessage: '' });
    };

    recalculateRevenuesKwhDistributions = () => {
        document.body.style.cursor = 'wait';
        this.setState({
            isBusy: true,
        });
        RevenuesKwhAPI.recalculateRevenuesDistribution(this.props.revenuesKwh.id)
            .then(payload => {
                this.reloadDistributions();
                document.body.style.cursor = 'default';
                this.setState({
                    isBusy: false,
                });
            })
            .catch(error => {
                console.log(error);
                document.body.style.cursor = 'default';
                this.setState({
                    isBusy: false,
                });
            });
    };

    render() {
        let administrationIds = [];
        this.props.administrations.forEach(function(administration) {
            administrationIds.push(administration.id);
        });
        let numberSelectedNumberTotal = 0;
        if (
            this.props &&
            this.props.revenuesKwh &&
            this.props.revenuesKwh.distributionKwh &&
            this.props.revenuesKwh.distributionKwh.meta &&
            this.props.revenuesKwh.distributionKwh.meta.distributionKwhIdsTotal
        ) {
            numberSelectedNumberTotal =
                this.state.distributionKwhIds.length +
                '/' +
                this.props.revenuesKwh.distributionKwh.meta.distributionKwhIdsTotal.length;
        } else {
            numberSelectedNumberTotal = this.state.distributionKwhIds.length;
        }

        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Opbrengstverdeling deelnemers</span>

                    {this.state.isBusy ? (
                        <div className="btn-group pull-right">
                            <div>Bezig met herbepalen deelnames (aantallen)...</div>
                        </div>
                    ) : (
                        <div className="btn-group pull-right">
                            <ButtonIcon iconName={'refresh'} onClickAction={this.reloadDistributions} />
                            {/*{this.props.revenuesKwh.confirmed == 1 &&*/}
                            {administrationIds.includes(this.props.revenuesKwh.project.administrationId) &&
                            this.props.revenuesKwh.hasConfirmedPartsKwh === true &&
                            this.state.createType === '' ? (
                                <React.Fragment>
                                    <ButtonText
                                        buttonText={'Selecteer preview rapportage'}
                                        buttonClassName={
                                            this.props.revenuesKwh.confirmed == 0 ? 'btn-danger' : 'btn-success'
                                        }
                                        title={
                                            this.props.revenuesKwh.confirmed == 0
                                                ? 'Totale opbrengstverdeling is nog niet definitief'
                                                : ''
                                        }
                                        onClickAction={() => this.toggleShowCheckboxList('createReport')}
                                    />
                                </React.Fragment>
                            ) : null}

                            {administrationIds.includes(this.props.revenuesKwh.project.administrationId) &&
                            this.state.createType === '' &&
                            this.props.revenuesKwh.confirmed == 0 ? (
                                <React.Fragment>
                                    <ButtonText
                                        buttonText={'Deelnames (aantallen) herbepalen'}
                                        buttonClassName="btn-success"
                                        onClickAction={() => this.recalculateRevenuesKwhDistributions()}
                                    />
                                </React.Fragment>
                            ) : null}
                        </div>
                    )}
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
                                            // required={'required'}
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
                                                onClickAction={this.checkDistributionKwhRevenueReport}
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
                        <RevenuesKwhDistributionFormList
                            changePage={this.changePage}
                            showCheckboxList={this.state.showCheckboxList}
                            toggleCheckedAll={this.toggleCheckedAll}
                            checkedAll={this.state.checkedAll}
                            toggleDistributionCheck={this.toggleDistributionCheck}
                            distributionKwhIds={this.state.distributionKwhIds}
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
                        {this.state.modalText2 ? (
                            <>
                                <br />
                                <br />
                                {this.state.modalText2}
                            </>
                        ) : null}
                        {this.state.modalText3 ? (
                            <>
                                <br />
                                <br />
                                {this.state.modalText3}
                            </>
                        ) : null}
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
        revenuesKwh: state.revenuesKwh,
        documentGroups: state.systemData.documentGroups,
        administrations: state.meDetails.administrations,
    };
};

const mapDispatchToProps = dispatch => ({
    previewReportKwh: id => {
        dispatch(previewReportKwh(id));
    },
    fetchRevenuesKwh: id => {
        dispatch(fetchRevenuesKwh(id));
    },
    getDistributionKwh: (id, page) => {
        dispatch(getDistributionKwh({ id, page }));
    },
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(RevenuesKwhDistributionForm);
