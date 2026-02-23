import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import moment from 'moment';

moment.locale('nl');

import InputText from '../../../components/form/InputText';
import ButtonText from '../../../components/button/ButtonText';
import PanelBody from '../../../components/panel/PanelBody';
import Panel from '../../../components/panel/Panel';
import MailgunDomainDetailsAPI from '../../../api/mailgun-domain/MailgunDomainDetailsAPI';
import { fetchSystemData } from '../../../actions/general/SystemDataActions';

// Functionele wrapper voor de class component
const MailgunDomainNewFormWrapper = props => {
    const navigate = useNavigate();
    return <MailgunDomainNewForm {...props} navigate={navigate} />;
};

class MailgunDomainNewForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mailgunDomain: {
                id: '',
                domain: '',
                secret: '',
                isSystemMailgunDomain: '',
            },
            errors: {
                name: false,
                maxRequestsPerMinute: false,
                responsible: false,
            },
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
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

    handleInputChangeDate(value, name) {
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

        if (validator.isEmpty(mailgunDomain.secret)) {
            errors.secret = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            MailgunDomainDetailsAPI.newMailgunDomain(mailgunDomain)
                .then(payload => {
                    this.props.fetchSystemData();

                    this.props.navigate(`/mailgun-domein/${payload.data.data.id}`);
                })
                .catch(function(error) {
                    alert('Er is iets mis gegaan met opslaan!');
                });
    }

    render() {
        const { domain, secret, isVerified, isSystemMailgunDomain } = this.state.mailgunDomain;

        const manageSystemMailgunDomain =
            this.props.meDetails.email == 'support@econobis.nl' || this.props.meDetails.email == 'software@xaris.nl'
                ? true
                : false;

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
                            <InputText
                                label="Mailgun API Key"
                                name={'secret'}
                                value={secret}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.secret}
                            />
                        </div>
                        <div className="row">
                            <InputToggle
                                label={'Markeer als systeem mailgun domain'}
                                name={'isSystemMailgunDomain'}
                                value={isSystemMailgunDomain}
                                onChangeAction={this.handleInputChange}
                                size={'col-sm-5'}
                                textToolTip={`Een systeem mailgun domain is alleen voor support gebruiker en is vooral bedoeld voor een initiele mailbox
                                 bij het opzetten van een nieuwe cooperatie. Mailgun logs (events), bounches en complaints zullen niet opgehaald worden 
                                 voor systeem mailgun domains.`}
                                disabled={!manageSystemMailgunDomain}
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
        meDetails: state.meDetails,
    };
};
const mapDispatchToProps = dispatch => bindActionCreators({ fetchSystemData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MailgunDomainNewFormWrapper);
