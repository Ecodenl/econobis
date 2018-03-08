import React, { Component } from 'react';
import moment from 'moment';
import validator from 'validator';
import { isEmpty } from 'lodash';
import { hashHistory } from 'react-router';

import ParticipantNewToolbar from './ParticipantNewToolbar';
import ParticipantNew from './ParticipantNew';
import {setError} from "../../../../../actions/general/ErrorActions";

import ParticipantProductionProjectDetailsAPI from '../../../../../api/participant-production-project/ParticipantProductionProjectDetailsAPI';
import Panel from "../../../../../components/panel/Panel";
import PanelBody from "../../../../../components/panel/PanelBody";
import * as ibantools from "ibantools/build/ibantools";
import ContactsAPI from "../../../../../api/contact/ContactsAPI";
import ProductionProjectsAPI from "../../../../../api/production-project/ProductionProjectsAPI";
import {connect} from "react-redux";

class ParticipantNewApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contacts: [],
            productionProjects: [],
            participationWorth: 0,
            participation: {
                contactId: props.params.contactId || '',
                statusId: '',
                productionProjectId: props.params.productionProjectId || '',
                dateRegister: '',
                participationsRequested: '',
                participationsGranted: '',
                participationsSold: '',
                participationsRestSale: '',
                dateContractSend: '',
                dateContractRetour: '',
                datePayed: '',
                ibanPayed: '',
                didAcceptAgreement: false,
                ibanAttn: '',
                giftedByContactId: '',
                ibanPayout: '',
                legalRepContactId: '',
                ibanPayoutAttn: '',
                dateEnd: '',
                typeId: '',
            },
            errors: {
                contactId: false,
                statusId: false,
                productionProjectId: false,
                typeId: false,
                ibanPayed: false,
                ibanPayout: false,
            },
        };
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    };

    componentWillMount() {
        ContactsAPI.getContactsPeek().then(payload => {
            this.setState({
                contacts: payload
            });
        });

        ProductionProjectsAPI.peekProductionProjects().then(payload => {
            this.setState({
                productionProjects: payload
            });

            if(this.props.params.productionProjectId){
                const id = this.props.params.productionProjectId;

                let productionProject = payload.find((productionProject) => productionProject.id == id);

                this.setState({
                    ...this.state,
                    participationWorth: productionProject.participationWorth,
                });
            }
        });
    }

    handleProductionProjectChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            participationWorth: this.state.productionProjects[value].participationWorth,
            participation: {
                ...this.state.participation,
                [name]: value
            },
        });
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            participation: {
                ...this.state.participation,
                [name]: value
            },
        });
    };

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            participation: {
                ...this.state.participation,
                [name]: value
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const {participation} = this.state;

        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty(participation.contactId + '')){
            errors.contactId = true;
            hasErrors = true;
        };

        if(validator.isEmpty(participation.statusId + '')){
            errors.statusId = true;
            hasErrors = true;
        };

        if(validator.isEmpty(participation.productionProjectId + '')){
            errors.productionProjectId = true;
            hasErrors = true;
        };

        if(validator.isEmpty(participation.typeId + '')){
            errors.typeId = true;
            hasErrors = true;
        };

        if(!validator.isEmpty(participation.ibanPayed)){
            if (!ibantools.isValidIBAN(participation.ibanPayed)) {
                errors.ibanPayed = true;
                hasErrors = true;
            }
        }

        if(!validator.isEmpty(participation.ibanPayout)){
            if (!ibantools.isValidIBAN(participation.ibanPayout)) {
                errors.ibanPayed = true;
                hasErrors = true;
            }
        }
        
        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
        ParticipantProductionProjectDetailsAPI.checkPostalCodeAllowed(participation.productionProjectId, participation.contactId).then(() => {
            ParticipantProductionProjectDetailsAPI.storeParticipantProductionProject(participation).then(payload => {
                hashHistory.push(`/productie-project/participant/${payload.id}`);
            });
        }).catch((error) => {
            this.props.setError(error.response.status, error.response.data.message)
            }
        );
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <ParticipantNewToolbar />
                    </div>

                    <div className="col-md-12">
                        <Panel>
                            <PanelBody>
                                <div className="col-md-12">
                                    <ParticipantNew
                                        participation={this.state.participation}
                                        errors={this.state.errors}
                                        handleInputChange={this.handleInputChange}
                                        handleInputChangeDate={this.handleInputChangeDate}
                                        handleSubmit={this.handleSubmit}
                                        contacts={this.state.contacts}
                                        productionProjects={this.state.productionProjects}
                                        participationWorth={this.state.participationWorth}
                                        handleProductionProjectChange={this.handleProductionProjectChange}
                                    />
                                </div>
                            </PanelBody>
                        </Panel>
                    </div>
                </div>
                <div className="col-md-3"/>
            </div>
        )
    }
};

const mapDispatchToProps = dispatch => ({
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});

export default connect(null, mapDispatchToProps)(ParticipantNewApp);