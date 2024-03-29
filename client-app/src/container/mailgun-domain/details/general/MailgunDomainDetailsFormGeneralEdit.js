import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import moment from 'moment';
moment.locale('nl');

import { updateMailgunDomain } from '../../../../actions/mailgun-domain/MailgunDomainDetailsActions';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import InputToggle from '../../../../components/form/InputToggle';

class MailgunDomainDetailsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mailgunDomain: {
                ...props.mailgunDomainDetails,
            },
            errors: {
                domain: false,
            },
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            mailgunDomain: {
                ...this.state.mailgunDomain,
                [name]: value,
            },
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const { mailgunDomain } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(mailgunDomain.domain)) {
            errors.domain = true;
            hasErrors = true;
        }

        // if (validator.isEmpty(mailgunDomain.secret)) {
        //     errors.secret = true;
        //     hasErrors = true;
        // }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors && this.props.updateMailgunDomain(mailgunDomain, this.props.switchToView);
    }

    render() {
        // const { domain, secret, isVerified } = this.state.mailgunDomain;
        const { domain, isVerified } = this.state.mailgunDomain;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label="Domein"
                                name={'domain'}
                                value={domain}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.domain}
                            />
                            {/*<InputText*/}
                            {/*    label="Mailgun API Key"*/}
                            {/*    name={'secret'}*/}
                            {/*    value={secret}*/}
                            {/*    onChangeAction={this.handleInputChange}*/}
                            {/*    required={'required'}*/}
                            {/*    error={this.state.errors.secret}*/}
                            {/*/>*/}
                        </div>
                        <div className="row">
                            <InputToggle
                                label={'Geverifieerd'}
                                name={'isVerified'}
                                value={isVerified}
                                onChangeAction={this.handleInputChange}
                                disabled={true}
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
                            <ButtonText buttonText={'Opslaan'} type={'submit'} value={'Submit'} />
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        mailgunDomainDetails: state.mailgunDomainDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    updateMailgunDomain: (mailgunDomain, switchToView) => {
        dispatch(updateMailgunDomain(mailgunDomain, switchToView));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MailgunDomainDetailsFormGeneralEdit);
