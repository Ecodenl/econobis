import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');

import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import MeasureCategoryDetailsAPI from '../../../../api/measure-category/MeasureCategoryDetailsAPI';
import { bindActionCreators } from 'redux';
import { fetchSystemData } from '../../../../actions/general/SystemDataActions';
import InputToggle from '../../../../components/form/InputToggle';
import InputReactSelect from '../../../../components/form/InputReactSelect';
import ViewText from '../../../../components/form/ViewText';
import MeasureAPI from '../../../../api/measure/MeasureAPI';
import OrganisationAPI from '../../../../api/contact/OrganisationAPI';
import EmailTemplateAPI from '../../../../api/email-template/EmailTemplateAPI';
import validator from 'validator';
import MeasuresOfCategory from '../../../../selectors/MeasuresOfCategory';
import InputTextColorPicker from '../../../../components/form/InputTextColorPicker';

class MeasureCategoryDetailsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            measures: [],
            organisations: [],
            emailTemplates: [],
            measureCategory: {
                ...props.measureCategory,
            },
            errors: {
                usesWfCreateOpportunity: false,
                measureIdWfCreateOpportunity: false,
                opportunityStatusIdWfCreateOpportunity: false,
                usesWfCreateQuotationRequest: false,
                organisationIdWfCreateQuotationRequest: false,
                usesWfEmailQuotationRequest: false,
                emailTemplateIdWfCreateQuotationRequest: false,
                calendarBackgroundColor: false,
                calendarTextColor: false,
            },
            peekLoading: {
                measures: true,
                opportunityStatusses: true,
                organisations: true,
                emailTemplates: true,
            },
        };
        this.handleReactSelectChange = this.handleReactSelectChange.bind(this);
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            measureCategory: {
                ...this.state.measureCategory,
                [name]: value,
            },
        });
    };

    handleReactSelectChange(selectedOption, name) {
        this.setState({
            ...this.state,
            measureCategory: {
                ...this.state.measureCategory,
                [name]: selectedOption,
            },
        });
    }

    componentDidMount() {
        MeasureAPI.peekMeasures().then(measures => {
            this.setState({
                measures,
                peekLoading: {
                    ...this.state.peekLoading,
                    measures: false,
                },
            });
        });
        OrganisationAPI.getOrganisationPeek().then(organisations => {
            this.setState({
                organisations,
                peekLoading: {
                    ...this.state.peekLoading,
                    organisations: false,
                },
            });
        });
        EmailTemplateAPI.fetchEmailTemplatesPeek().then(emailTemplates =>
            this.setState({
                emailTemplates,
                peekLoading: {
                    ...this.state.peekLoading,
                    emailTemplates: false,
                },
            })
        );
    }

    handleSubmit = event => {
        event.preventDefault();

        const { measureCategory } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (measureCategory.usesWfCreateOpportunity == true) {
            if (!measureCategory.measureIdWfCreateOpportunity) {
                errors.measureIdWfCreateOpportunity = true;
                hasErrors = true;
            }
            if (!measureCategory.opportunityStatusIdWfCreateOpportunity) {
                errors.opportunityStatusIdWfCreateOpportunity = true;
                hasErrors = true;
            }
        }
        if (measureCategory.usesWfCreateQuotationRequest == true) {
            if (!measureCategory.organisationIdWfCreateQuotationRequest) {
                errors.organisationIdWfCreateQuotationRequest = true;
                hasErrors = true;
            }
        }
        if (measureCategory.usesWfEmailQuotationRequest == true) {
            if (!measureCategory.emailTemplateIdWfCreateQuotationRequest) {
                errors.emailTemplateIdWfCreateQuotationRequest = true;
                hasErrors = true;
            }
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            MeasureCategoryDetailsAPI.updateMeasureCategory(measureCategory)
                .then(payload => {
                    this.props.updateState(payload.data.data);
                    this.props.fetchSystemData();
                    this.props.switchToView();
                })
                .catch(error => {
                    alert('Er is iets misgegaan bij opslaan. Herlaad de pagina en probeer het nogmaals.');
                });
    };

    render() {
        const {
            name,
            usesWfCreateOpportunity,
            measureIdWfCreateOpportunity,
            opportunityStatusIdWfCreateOpportunity,
            usesWfCreateQuotationRequest,
            organisationIdWfCreateQuotationRequest,
            usesWfEmailQuotationRequest,
            emailTemplateIdWfCreateQuotationRequest,
            calendarBackgroundColor,
            calendarTextColor,
        } = this.state.measureCategory;

        const measuresMatchToCategory = MeasuresOfCategory(this.state.measures, this.state.measureCategory.id);
        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel>
                    <PanelBody>
                        <div className="row">
                            <ViewText
                                label={'Omschrijving'}
                                divSize={'col-sm-10'}
                                value={name}
                                className={'col-sm-10 form-group'}
                            />
                        </div>
                        <div className="row">
                            <InputToggle
                                label={'Gebruikt workflow maak kans'}
                                divSize={'col-sm-10'}
                                name={'usesWfCreateOpportunity'}
                                value={usesWfCreateOpportunity}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        {usesWfCreateOpportunity == true && (
                            <React.Fragment>
                                <div className="row">
                                    <ViewText
                                        label={'Uitleg workflow maak kans'}
                                        divSize={'col-sm-10'}
                                        value={this.props.explanationWfCreateOpportunity}
                                        className={'col-sm-10 form-group'}
                                    />
                                </div>
                                <div className="row">
                                    <InputReactSelect
                                        label={'Voor welke maatregel kans maken?'}
                                        divSize={'col-sm-10'}
                                        name={'measureIdWfCreateOpportunity'}
                                        options={measuresMatchToCategory}
                                        value={measureIdWfCreateOpportunity}
                                        onChangeAction={this.handleReactSelectChange}
                                        isLoading={this.state.peekLoading.measures}
                                        required={usesWfCreateOpportunity}
                                        error={this.state.errors.measureIdWfCreateOpportunity}
                                    />
                                </div>
                                <div className="row">
                                    <InputReactSelect
                                        label={'Zet kans status'}
                                        divSize={'col-sm-10'}
                                        name={'opportunityStatusIdWfCreateOpportunity'}
                                        options={this.props.opportunityStatusses}
                                        value={opportunityStatusIdWfCreateOpportunity}
                                        onChangeAction={this.handleReactSelectChange}
                                        required={usesWfCreateOpportunity}
                                        error={this.state.errors.opportunityStatusIdWfCreateOpportunity}
                                    />
                                </div>

                                <div className="row">
                                    <InputToggle
                                        label={'Maak kansactie'}
                                        divSize={'col-sm-10'}
                                        name={'usesWfCreateQuotationRequest'}
                                        value={usesWfCreateQuotationRequest}
                                        onChangeAction={this.handleInputChange}
                                    />
                                </div>

                                {usesWfCreateQuotationRequest == true && (
                                    <React.Fragment>
                                        <div className="row">
                                            <ViewText
                                                label={'Uitleg workflow maak kansactie'}
                                                divSize={'col-sm-10'}
                                                value={this.props.explanationWfCreateQuotationRequest}
                                                className={'col-sm-10 form-group'}
                                            />
                                        </div>
                                        <div className="row">
                                            <InputReactSelect
                                                label={'Kansactie voor'}
                                                divSize={'col-sm-10'}
                                                name={'organisationIdWfCreateQuotationRequest'}
                                                options={this.state.organisations}
                                                value={organisationIdWfCreateQuotationRequest}
                                                onChangeAction={this.handleReactSelectChange}
                                                isLoading={this.state.peekLoading.organisations}
                                                required={usesWfCreateQuotationRequest}
                                                error={this.state.errors.organisationIdWfCreateQuotationRequest}
                                            />
                                        </div>
                                        <div className="row">
                                            <InputToggle
                                                label={'Stuur kansactie mail'}
                                                divSize={'col-sm-10'}
                                                name={'usesWfEmailQuotationRequest'}
                                                value={usesWfEmailQuotationRequest}
                                                onChangeAction={this.handleInputChange}
                                            />
                                        </div>

                                        {usesWfEmailQuotationRequest == true && (
                                            <React.Fragment>
                                                <div className="row">
                                                    <ViewText
                                                        label={'Uitleg workflow stuur kansactie mail'}
                                                        divSize={'col-sm-10'}
                                                        value={this.props.explanationWfEmailQuotationRequest}
                                                        className={'col-sm-10 form-group'}
                                                    />
                                                </div>
                                                <div className="row">
                                                    <InputReactSelect
                                                        label={'Email template kansactie'}
                                                        divSize={'col-sm-10'}
                                                        name={'emailTemplateIdWfCreateQuotationRequest'}
                                                        options={this.state.emailTemplates}
                                                        value={emailTemplateIdWfCreateQuotationRequest}
                                                        onChangeAction={this.handleReactSelectChange}
                                                        isLoading={this.state.peekLoading.emailTemplates}
                                                        required={usesWfEmailQuotationRequest}
                                                        error={
                                                            this.state.errors.emailTemplateIdWfCreateQuotationRequest
                                                        }
                                                    />
                                                </div>
                                            </React.Fragment>
                                        )}
                                    </React.Fragment>
                                )}
                            </React.Fragment>
                        )}

                        <div className="row">
                            <InputTextColorPicker
                                label="Kalender item achtergrond kleur"
                                divSize={'col-sm-8'}
                                name={'calendarBackgroundColor'}
                                value={calendarBackgroundColor}
                                size={'col-sm-4'}
                                required={'required'}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.calendarBackgroundColor}
                                disabled={'disabled'}
                            />
                            <span
                                className="rc-color-picker-trigger"
                                unselectable="unselectable"
                                style={{
                                    backgroundColor: calendarBackgroundColor,
                                    color: calendarTextColor,
                                    border: '1px solid #999',
                                    display: 'inline-block',
                                    padding: '2px',
                                    borderRadius: '2px',
                                    width: '50px',
                                    height: '30px',
                                    boxShadow: '0 0 0 2px #fff inset',
                                }}
                            >
                                Tekst
                            </span>
                        </div>

                        <div className="row">
                            <InputTextColorPicker
                                label="Kalender item tekst kleur"
                                divSize={'col-sm-8'}
                                name={'calendarTextColor'}
                                value={calendarTextColor}
                                size={'col-sm-4'}
                                required={'required'}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.calendarTextColor}
                                disabled={'disabled'}
                            />
                            <span
                                className="rc-color-picker-trigger"
                                unselectable="unselectable"
                                style={{
                                    backgroundColor: calendarBackgroundColor,
                                    color: calendarTextColor,
                                    border: '1px solid #999',
                                    display: 'inline-block',
                                    padding: '2px',
                                    borderRadius: '2px',
                                    width: '50px',
                                    height: '30px',
                                    boxShadow: '0 0 0 2px #fff inset',
                                }}
                            >
                                Tekst
                            </span>
                        </div>
                    </PanelBody>

                    <PanelBody>
                        <div className="pull-right btn-group" role="group">
                            <ButtonText
                                buttonClassName={'btn-default'}
                                buttonText={'Sluiten'}
                                onClickAction={this.props.switchToView}
                            />
                            <ButtonText buttonText={'Opslaan'} type={'submit'} value={'Submit'} />
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        );
    }
}
const mapStateToProps = state => ({
    opportunityStatusses: state.systemData.opportunityStatus,
});

const mapDispatchToProps = dispatch => bindActionCreators({ fetchSystemData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MeasureCategoryDetailsFormGeneralEdit);
