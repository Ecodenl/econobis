import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');

import ButtonText from '../../../../components/button/ButtonText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import QuotationRequestStatusDetailsAPI from '../../../../api/quotation-request-status/QuotationRequestStatusDetailsAPI';
import { bindActionCreators } from 'redux';
import { fetchSystemData } from '../../../../actions/general/SystemDataActions';
import InputToggle from '../../../../components/form/InputToggle';
import ViewText from '../../../../components/form/ViewText';

class QuotationRequestStatusDetailsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quotationRequestStatus: {
                ...props.quotationRequestStatus,
            },
            errors: {
                usesWf: false,
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

    handleSubmit = event => {
        event.preventDefault();

        const { quotationRequestStatus } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

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
        const { name, usesWf, sendEmailReminder } = this.state.quotationRequestStatus;

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
                        <div className="row">
                            <InputToggle
                                label={'Verstuur herinnering'}
                                divSize={'col-sm-10'}
                                name={'sendEmailReminder'}
                                value={sendEmailReminder}
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

export default connect(null, mapDispatchToProps)(QuotationRequestStatusDetailsFormGeneralEdit);
