import React, { Component } from 'react';
import moment from 'moment';
import validator from 'validator';
import { isEmpty } from 'lodash';
import { hashHistory } from 'react-router';

import OpportunityNewToolbar from './OpportunityNewToolbar';
import OpportunityNew from './OpportunityNew';

import ContactsAPI from '../../../api/contact/ContactsAPI';
import RegistrationsAPI from '../../../api/registration/RegistrationsAPI';
import OpportunityDetailsAPI from '../../../api/opportunity/OpportunityDetailsAPI';
import {connect} from "react-redux";


class OppportunitiesNewApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            opportunity: {
                campaignId:'',
                contactId: '',
                desiredDate: '',
                measureId: '',
                quotationText: '',
                reactionId: '',
                statusId: '',
                ownedById: '',
                registrationId: '',
            },
            contacts: [],
            registrations: [],
            errors: {
                measure: false,
                contact: false,
                status: false,
            },
        }
    };


    componentWillMount() {
        if(!isEmpty(this.props.params)) {
            this.updateStateByChangeParams(this.props.params);
        };

        ContactsAPI.getPerson().then(payload => {
            this.setState({
                contacts: payload
            });
        });

        RegistrationsAPI.peekRegistrations().then(payload => {
            this.setState({
                registrations: payload
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        if ((this.props.params.id !== nextProps.params.id) || (this.props.params.type !== nextProps.params.type)) {
            this.updateStateByChangeParams(nextProps.params);
        }
    };

    updateStateByChangeParams(params) {
        if (!isEmpty(params)) {
            switch (params.type) {
                case 'contact':
                    this.setState({
                        ...this.state,
                        opportunity: {
                            ...this.state.opportunity,
                            contactId: params.id,
                        }
                    });
                    break;
                case 'aanmelding':
                    this.setState({
                        ...this.state,
                        opportunity: {
                            ...this.state.opportunity,
                            registrationId: params.id,
                        }
                    });
                    break;
                default:
                    break;
            }
        }
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            opportunity: {
                ...this.state.opportunity,
                [name]: value
            },
        });
    };

    handleChangeDesiredDate = (date) => {
        const formattedDate = (date ? moment(date).format('Y-MM-DD') : '');

        this.setState({
            ...this.state,
            opportunity: {
                ...this.state.opportunity,
                desiredDate: formattedDate
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const {opportunity} = this.state;

        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty('' + opportunity.contactId)){
            errors.contact = true;
            hasErrors = true;
        };

        if(validator.isEmpty('' + opportunity.statusId)){
            errors.status = true;
            hasErrors = true;
        };

        if(validator.isEmpty('' + opportunity.measureId)){
            errors.measure = true;
            hasErrors = true;
        };

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
        OpportunityDetailsAPI.storeOpportunity(opportunity).then(payload => {
            hashHistory.push('/kans/' + payload.id);
        });
    };

    render() {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="col-md-12 extra-space-above">
                            <OpportunityNewToolbar/>
                        </div>
                        <div className="col-md-12 extra-space-above">
                            <OpportunityNew
                                opportunity={this.state.opportunity}
                                contacts={this.state.contacts}
                                users={this.props.users}
                                registrations={this.state.registrations}
                                errors={this.state.errors}
                                handleInputChange={this.handleInputChange}
                                handleChangeDesiredDate={this.handleChangeDesiredDate}
                                handleSubmit={this.handleSubmit}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        users: state.systemData.users,
    }
};

export default connect(mapStateToProps)(OppportunitiesNewApp);