import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');

import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import QuotationRequestStatusDetailsAPI from '../../../../api/quotation-request-status/QuotationRequestStatusDetailsAPI';
import { bindActionCreators } from 'redux';
import { fetchSystemData } from '../../../../actions/general/SystemDataActions';
import InputToggle from '../../../../components/form/InputToggle';
import InputReactSelect from '../../../../components/form/InputReactSelect';
import ViewText from '../../../../components/form/ViewText';
import EmailTemplateAPI from '../../../../api/email-template/EmailTemplateAPI';
import validator from 'validator';

class QuotationRequestStatusDetailsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            emailTemplates: [],
            quotationRequestStatus: {
                ...props.quotationRequestStatus,
            },
            errors: {
                usesWf: false,
                emailTemplateIdWf: false,
                numberOfDaysToSendEmail: false,
            },
            peekLoading: {
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
            quotationRequestStatus: {
                ...this.state.quotationRequestStatus,
                [name]: value,
            },
        });
    };

    handleReactSelectChange(selectedOption, name) {
        this.setState({
            ...this.state,
            quotationRequestStatus: {
                ...this.state.quotationRequestStatus,
                [name]: selectedOption,
            },
        });
    }

    componentDidMount() {
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

        const { quotationRequestStatus } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (quotationRequestStatus.usesWf == true) {
            if (!quotationRequestStatus.emailTemplateIdWf) {
                errors.emailTemplateIdWf = true;
                hasErrors = true;
            }
            if (validator.isEmpty(quotationRequestStatus.numberOfDaysToSendEmail.toString())) {
                errors.numberOfDaysToSendEmail = true;
                hasErrors = true;
            }
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            QuotationRequestStatusDetailsAPI.updateQuotationRequestStatus(quotationRequestStatus)
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
        const { name, usesWf, emailTemplateIdWf, numberOfDaysToSendEmail } = this.state.quotationRequestStatus;

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
                                label={'Gebruikt workflow email bij deze status'}
                                divSize={'col-sm-10'}
                                name={'usesWf'}
                                value={usesWf}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        {usesWf == true && (
                            <React.Fragment>
                                <div className="row">
                                    <ViewText
                                        label={'Uitleg workflow'}
                                        divSize={'col-sm-10'}
                                        value={this.props.explanationWf}
                                        className={'col-sm-10 form-group'}
                                    />
                                </div>
                                <div className="row">
                                    <InputReactSelect
                                        label={'Template email bij deze status'}
                                        divSize={'col-sm-10'}
                                        name={'emailTemplateIdWf'}
                                        options={this.state.emailTemplates}
                                        value={emailTemplateIdWf}
                                        onChangeAction={this.handleReactSelectChange}
                                        isLoading={this.state.peekLoading.emailTemplates}
                                        multi={false}
                                        required={'required'}
                                        error={this.state.errors.emailTemplateIdWf}
                                    />
                                </div>
                                <div className="row">
                                    <InputText
                                        label={'Aantal dagen email na deze status'}
                                        divSize={'col-sm-10'}
                                        type={'number'}
                                        min={'1'}
                                        id={'numberOfDaysToSendEmail'}
                                        name={'numberOfDaysToSendEmail'}
                                        value={numberOfDaysToSendEmail}
                                        onChangeAction={this.handleInputChange}
                                        required={'required'}
                                        error={this.state.errors.numberOfDaysToSendEmail}
                                    />
                                </div>
                            </React.Fragment>
                        )}
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

const mapDispatchToProps = dispatch => bindActionCreators({ fetchSystemData }, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(QuotationRequestStatusDetailsFormGeneralEdit);
