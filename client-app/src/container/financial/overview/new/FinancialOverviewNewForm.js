import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hashHistory } from 'react-router';
import validator from 'validator';
import moment from 'moment';

moment.locale('nl');

import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import PanelBody from '../../../../components/panel/PanelBody';
import Panel from '../../../../components/panel/Panel';
import { fetchSystemData } from '../../../../actions/general/SystemDataActions';
import InputSelect from '../../../../components/form/InputSelect';
import FinancialOverviewDetailsAPI from '../../../../api/financial/overview/FinancialOverviewDetailsAPI';
import FinancialOverviewsAPI from '../../../../api/financial/overview/FinancialOverviewsAPI';
import InputReactSelectLong from '../../../../components/form/InputReactSelectLong';
import DocumentTemplateAPI from '../../../../api/document-template/DocumentTemplateAPI';

class FinancialOverviewNewForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            financialOverviews: [],
            financialOverview: {
                year: moment()
                    .subtract(1, 'year')
                    .format('Y'),
                description: '',
                documentTemplateFinancialOverviewId: '',
                administrationId: '',
                definitive: false,
                statusId: '',
                dateProcessed: null,
            },
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

        this.state.financialOverviews.map(financialOverviewFromMap => {
            if (
                financialOverviewFromMap.year == financialOverview.year &&
                financialOverviewFromMap.administrationId == financialOverview.administrationId
            ) {
                hasErrors = true;
                errors.year = errors.administrationId = true;
                errorMessage.year = errorMessage.administrationId =
                    'Waardestaat voor jaar ' +
                    financialOverviewFromMap.year +
                    ' en administratie ' +
                    financialOverviewFromMap.administration.name +
                    ' bestaat al.';
            }
        });

        this.setState({ ...this.state, errors: errors, errorMessage: errorMessage });

        // If no errors send form
        !hasErrors &&
            FinancialOverviewDetailsAPI.newFinancialOverview(financialOverview)
                .then(payload => {
                    hashHistory.push(`/waardestaat/${payload.data.data.id}`);
                })
                .catch(function(error) {
                    alert('Er is iets mis gegaan met opslaan!');
                });
    };

    render() {
        const { year, administrationId, documentTemplateFinancialOverviewId } = this.state.financialOverview;
        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label="Jaar"
                                type="number"
                                name={'year'}
                                value={year}
                                min={2000}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.year}
                                errorMessage={this.state.errorMessage.year}
                            />
                            <InputSelect
                                label={'Administratie'}
                                name={'administrationId'}
                                value={administrationId}
                                options={this.props.administrations}
                                optionName={'name'}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.administrationId}
                                errorMessage={this.state.errorMessage.administrationId}
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
                                buttonText={'Opslaan'}
                                onClickAction={this.handleSubmit}
                                type={'submit'}
                                value={'Submit'}
                            />
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        administrations: state.meDetails.administrations,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({ fetchSystemData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FinancialOverviewNewForm);
