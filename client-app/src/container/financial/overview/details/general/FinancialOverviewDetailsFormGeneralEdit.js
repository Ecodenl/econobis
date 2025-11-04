import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import moment from 'moment';
moment.locale('nl');

import ButtonText from '../../../../../components/button/ButtonText';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import FinancialOverviewsAPI from '../../../../../api/financial/overview/FinancialOverviewsAPI';
import DocumentTemplateAPI from '../../../../../api/document-template/DocumentTemplateAPI';
import ViewText from '../../../../../components/form/ViewText';
import InputReactSelectLong from '../../../../../components/form/InputReactSelectLong';
import FinancialOverviewDetailsAPI from '../../../../../api/financial/overview/FinancialOverviewDetailsAPI';

class FinancialOverviewDetailsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            financialOverviews: [],
            financialOverview: {
                id: props.id ? props.id : '',
                year: props.year
                    ? props.year
                    : moment()
                          .subtract(1, 'year')
                          .format('Y'),
                description: props.description ? props.description : '',
                documentTemplateFinancialOverviewId: props.documentTemplateFinancialOverviewId
                    ? props.documentTemplateFinancialOverviewId
                    : '',
                administrationId: props.administrationId ? props.administrationId : '',
                definitive: props.definitive ? props.definitive : false,
                statusId: props.statusId ? props.statusId : '',
                dateProcessed: props.dateProcessed ? props.dateProcessed : null,
                hasInterimFinancialOverviewContacts: props.hasInterimFinancialOverviewContacts
                    ? props.hasInterimFinancialOverviewContacts
                    : false,
            },
            administrations: props.administrations ? props.administrations : null,
            documentTemplates: [],
            errorMessage: false,
            errors: {
                year: false,
                administrationId: false,
                documentTemplateFinancialOverviewId: false,
            },
        };
    }

    componentDidMount() {
        FinancialOverviewsAPI.fetchFinancialOverviews()
            .then(payload => {
                this.setState({ ...this.state, financialOverviews: payload.data.data });
            })
            .catch(error => {
                this.setState({ ...this.state, hasError: true });
            });
        DocumentTemplateAPI.fetchDocumentTemplatesPeekGeneral().then(payload => {
            let documentTemplates = [];

            payload.forEach(function(documentTemplate) {
                if (documentTemplate.group == 'financial-overview') {
                    documentTemplates.push({ id: documentTemplate.id, name: documentTemplate.name });
                }
            });

            this.setState({
                documentTemplates: documentTemplates,
            });
        });
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            financialOverview: {
                ...this.state.financialOverview,
                [name]: value,
            },
        });
    };

    handleInputChangeDate = (value, name) => {
        this.setState({
            ...this.state,
            financialOverview: {
                ...this.state.financialOverview,
                [name]: value,
            },
        });
    };

    handleReactSelectChange = (selectedOption, name) => {
        this.setState({
            ...this.state,
            financialOverview: {
                ...this.state.financialOverview,
                [name]: selectedOption,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        const { financialOverview } = this.state;

        // Validation
        let errors = {};
        let errorMessage = {};
        let hasErrors = false;

        if (validator.isEmpty(financialOverview.year + '')) {
            errors.year = true;
            errorMessage.year = 'Jaar is een verplicht veld.';
            hasErrors = true;
        }
        if (financialOverview.year < 2000) {
            errors.year = true;
            errorMessage.year = 'Jaar mag niet voor 2000 liggen.';
            hasErrors = true;
        }
        if (validator.isEmpty(financialOverview.administrationId + '')) {
            errors.administrationId = true;
            errorMessage.administrationId = 'Administratie is een verplicht veld.';
            hasErrors = true;
        }
        if (validator.isEmpty(financialOverview.documentTemplateFinancialOverviewId + '')) {
            errors.documentTemplateFinancialOverviewId = true;
            errorMessage.documentTemplateFinancialOverviewId = 'Document template is een verplicht veld.';
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors, errorMessage: errorMessage });

        // If no errors send form
        !hasErrors &&
            FinancialOverviewDetailsAPI.updateFinancialOverview(financialOverview)
                .then(payload => {
                    this.props.callFetchFinancialOverviewDetails();
                    this.props.switchToView();
                })
                .catch(error => {
                    alert('Er is iets misgegaan bij opslaan. Herlaad de pagina en probeer het nogmaals.');
                });
    };

    render() {
        const {
            year,
            administrationId,
            statusId,
            dateProcessed,
            hasInterimFinancialOverviewContacts,
            documentTemplateFinancialOverviewId,
        } = this.state.financialOverview;

        let status = '';
        switch (statusId) {
            case 'in-progress':
                status = 'Wordt aangemaakt...';
                break;
            case 'concept':
                if (hasInterimFinancialOverviewContacts) {
                    status = 'Concept / Verwerkt';
                } else {
                    status = 'Concept';
                }
                break;
            case 'definitive':
                status = 'Definitief';
                break;
            case 'processed':
                status = 'Verwerkt';
                break;
        }
        const dateProcessedFormated = dateProcessed ? moment(dateProcessed).format('DD-MM-Y') : '';

        return (
            <>
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <Panel>
                        <PanelBody>
                            <div className="row">
                                <ViewText className={'form-group col-md-6'} label={'Jaar'} value={year} />
                                <ViewText className={'form-group col-md-6'} label={'Status'} value={status} />
                            </div>
                            <div className="row">
                                <ViewText
                                    className={'form-group col-md-6'}
                                    label={'Administratie'}
                                    value={
                                        administrationId
                                            ? this.state.administrations &&
                                              this.state.administrations.find(
                                                  administration => administration.id == administrationId
                                              ).name
                                            : ''
                                    }
                                />
                                <ViewText
                                    className={'form-group col-md-6'}
                                    label={'Datum verwerkt'}
                                    value={dateProcessedFormated}
                                />
                            </div>
                            <div className="row">
                                <InputReactSelectLong
                                    label="Document template"
                                    name={'documentTemplateFinancialOverviewId'}
                                    options={this.state.documentTemplates}
                                    value={documentTemplateFinancialOverviewId}
                                    onChangeAction={this.handleReactSelectChange}
                                    required={'required'}
                                    // isLoading={peekLoading.documentTemplates}
                                    error={this.state.errors.documentTemplateFinancialOverviewId}
                                    errorMessage={this.state.errorMessage.documentTemplateFinancialOverviewId}
                                />
                            </div>
                        </PanelBody>

                        <PanelBody>
                            <div className="pull-right btn-group" role="group">
                                <ButtonText
                                    buttonClassName={'btn-default'}
                                    buttonText={'Sluiten'}
                                    onClickAction={this.props.switchToView}
                                />
                                <ButtonText
                                    buttonText={'Opslaan'}
                                    type={'submit'}
                                    value={'Submit'}
                                    onClickAction={this.handleSubmit}
                                />
                            </div>
                        </PanelBody>
                    </Panel>
                </form>
                {statusId === 'concept' && hasInterimFinancialOverviewContacts ? (
                    <div>
                        <Panel>
                            <PanelBody>
                                <div className="col-md-12 margin-10-top">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="alert alert-warning">
                                                Er zijn reeds verwerkte tussentijdse waardestaten gemaakt!
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </PanelBody>
                        </Panel>
                    </div>
                ) : null}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        administrations: state.meDetails.administrations,
    };
};

export default connect(mapStateToProps, null)(FinancialOverviewDetailsFormGeneralEdit);
