import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigate } from 'react-router-dom';
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
import EmailTemplateAPI from '../../../../api/email-template/EmailTemplateAPI';

// Functionele wrapper voor de class component
const FinancialOverviewNewFormWrapper = props => {
    const navigate = useNavigate();
    return <FinancialOverviewNewForm {...props} navigate={navigate} />;
};

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
                emailTemplateFinancialOverviewId: '',
                administrationId: '',
                definitive: false,
                statusId: '',
                dateProcessed: null,
            },
            documentTemplates: [],
            emailTemplates: [],
            peekLoading: {
                documentTemplates: true,
                emailTemplates: true,
            },
            errorMessage: false,
            errors: {
                year: false,
                administrationId: false,
                documentTemplateFinancialOverviewId: false,
                emailTemplateFinancialOverviewId: false,
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
        DocumentTemplateAPI.fetchDocumentTemplatesPeekGeneral()
            .then(payload => {
                let documentTemplates = [];
                payload.forEach(function(documentTemplate) {
                    if (documentTemplate.group == 'financial-overview') {
                        documentTemplates.push({ id: documentTemplate.id, name: documentTemplate.name });
                    }
                });

                this.setState(prevState => ({
                    documentTemplates: documentTemplates,
                    peekLoading: {
                        ...prevState.peekLoading,
                        documentTemplates: false,
                    },
                }));
            })
            .catch(error => {
                console.log(error);
                this.setState(prevState => ({
                    peekLoading: {
                        ...prevState.peekLoading,
                        documentTemplates: false,
                    },
                }));
            });
        EmailTemplateAPI.fetchEmailTemplatesPeek()
            .then(payload => {
                this.setState(prevState => ({
                    emailTemplates: payload,
                    peekLoading: {
                        ...prevState.peekLoading,
                        emailTemplates: false,
                    },
                }));
            })
            .catch(error => {
                console.log(error);
                this.setState(prevState => ({
                    peekLoading: {
                        ...prevState.peekLoading,
                        emailTemplates: false,
                    },
                }));
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
        // e-mail template niet verplicht, indien niet ingevuld, dan standaard ingestelde template bij administratie gebruiken.
        // if (validator.isEmpty(financialOverview.emailTemplateFinancialOverviewId + '')) {
        //     errors.emailTemplateFinancialOverviewId = true;
        //     errorMessage.emailTemplateFinancialOverviewId = 'E-mail template is een verplicht veld.';
        //     hasErrors = true;
        // }

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
                    this.props.navigate(`/waardestaat/${payload.data.data.id}`);
                })
                .catch(error => {
                    alert('Er is iets misgegaan bij opslaan. Herlaad de pagina en probeer het nogmaals.');
                });
    };

    render() {
        const {
            year,
            administrationId,
            documentTemplateFinancialOverviewId,
            emailTemplateFinancialOverviewId,
        } = this.state.financialOverview;

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
                                isLoading={this.state.peekLoading.documentTemplates}
                                error={this.state.errors.documentTemplateFinancialOverviewId}
                                errorMessage={this.state.errorMessage.documentTemplateFinancialOverviewId}
                            />
                        </div>
                        <div className="row">
                            <InputReactSelectLong
                                label="E-mail template"
                                name={'emailTemplateFinancialOverviewId'}
                                options={this.state.emailTemplates}
                                value={emailTemplateFinancialOverviewId}
                                onChangeAction={this.handleReactSelectChange}
                                placeholder={'Gebruik administratie e-mail template'}
                                clearable={true}
                                isLoading={this.state.peekLoading.emailTemplates}
                                error={this.state.errors.emailTemplateFinancialOverviewId}
                                errorMessage={this.state.errorMessage.emailTemplateFinancialOverviewId}
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

export default connect(mapStateToProps, mapDispatchToProps)(FinancialOverviewNewFormWrapper);
