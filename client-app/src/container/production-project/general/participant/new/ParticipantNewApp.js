import React, { Component } from 'react';
import moment from 'moment';
import validator from 'validator';
import { isEmpty } from 'lodash';
import { hashHistory } from 'react-router';

import ParticipantNewToolbar from './ParticipantNewToolbar';
import ParticipantNew from './ParticipantNew';
import { setError } from '../../../../../actions/general/ErrorActions';

import ParticipantProductionProjectDetailsAPI from '../../../../../api/participant-production-project/ParticipantProductionProjectDetailsAPI';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import * as ibantools from 'ibantools';
import ContactsAPI from '../../../../../api/contact/ContactsAPI';
import ProductionProjectsAPI from '../../../../../api/production-project/ProductionProjectsAPI';
import { connect } from 'react-redux';
import MultipleMessagesModal from '../../../../../components/modal/MultipleMessagesModal';

class ParticipantNewApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            modalText: [],
            modalRedirectTask: '',
            modalRedirectParticipation: '',

            contacts: [],
            productionProjects: [],
            participationWorth: 0,
            isPCR: false,
            participation: {
                contactId: props.params.contactId || '',
                statusId: 1,
                productionProjectId: props.params.productionProjectId || '',
                dateRegister: '',
                participationsRequested: '',
                participationsGranted: '',
                participationsSold: '',
                participationsRestSale: '',
                dateContractSend: '',
                dateContractRetour: '',
                datePayed: '',
                didAcceptAgreement: false,
                giftedByContactId: '',
                ibanPayout: '',
                legalRepContactId: '',
                ibanPayoutAttn: '',
                dateEnd: '',
                typeId: '',
                powerKwhConsumption: '',
            },
            errors: {
                contactId: false,
                statusId: false,
                productionProjectId: false,
                typeId: false,
                ibanPayout: false,
                powerKwhConsumption: false,
            },
        };
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    }

    componentWillMount() {
        ContactsAPI.getContactsPeek().then(payload => {
            this.setState({
                contacts: payload,
            });
        });

        ProductionProjectsAPI.peekProductionProjects().then(payload => {
            this.setState({
                productionProjects: payload,
            });

            if (this.props.params.productionProjectId) {
                const id = this.props.params.productionProjectId;

                let productionProject = payload.find(productionProject => productionProject.id == id);
                let isPCR = false;

                if (productionProject.typeId == 2) {
                    //pcr
                    isPCR = true;
                    this.setState({
                        ...this.state,
                        participation: {
                            ...this.state.participation,
                            typeId: 3, //energieleverancier
                        },
                    });
                } else {
                    this.setState({
                        ...this.state,
                        participation: {
                            ...this.state.participation,
                            typeId: 1, //op rekening
                        },
                    });
                }

                this.setState({
                    ...this.state,
                    participationWorth: productionProject.participationWorth,
                    isPCR: isPCR,
                });
            }
        });
    }

    redirectTask = () => {
        hashHistory.push(this.state.modalRedirectTask);
    };

    redirectParticipation = () => {
        hashHistory.push(this.state.modalRedirectParticipation);
    };

    handleProductionProjectChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let selectedProductionProject = this.state.productionProjects.find(
            productionProject => productionProject.id == value
        );

        let isPCR = false;

        if (selectedProductionProject.typeId == 2) {
            isPCR = true;
        }

        this.setState({
            ...this.state,
            isPCR: isPCR,
            participationWorth: selectedProductionProject.participationWorth,
            participation: {
                ...this.state.participation,
                [name]: value,
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
                [name]: value,
            },
        });
    };

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            participation: {
                ...this.state.participation,
                [name]: value,
            },
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        const { participation } = this.state;

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(participation.contactId + '')) {
            errors.contactId = true;
            hasErrors = true;
        }
        if (validator.isEmpty(participation.statusId + '')) {
            errors.statusId = true;
            hasErrors = true;
        }
        if (validator.isEmpty(participation.productionProjectId + '')) {
            errors.productionProjectId = true;
            hasErrors = true;
        }
        if (validator.isEmpty(participation.typeId + '')) {
            errors.typeId = true;
            hasErrors = true;
        }
        if (validator.isEmpty(participation.powerKwhConsumption + '') && this.state.isPCR) {
            errors.powerKwhConsumption = true;
            hasErrors = true;
        }
        if (!validator.isEmpty(participation.ibanPayout)) {
            if (!ibantools.isValidIBAN(participation.ibanPayout)) {
                errors.ibanPayout = true;
                hasErrors = true;
            }
        }

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
            ParticipantProductionProjectDetailsAPI.storeParticipantProductionProject(participation).then(payload => {
                if (payload.data.message !== undefined && payload.data.message.length > 0) {
                    this.setState({
                        showModal: true,
                        modalText: payload.data.message,
                    });
                    this.setState({
                        modalRedirectTask: `/taak/nieuw/contact/${participation.contactId}/productie-project/${
                            participation.productionProjectId
                        }/participant/${payload.data.id}`,
                        modalRedirectParticipation: `/productie-project/participant/${payload.data.id}`,
                    });
                } else {
                    hashHistory.push(`/productie-project/participant/${payload.data.id}`);
                }
            });
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
                                        isPCR={this.state.isPCR}
                                    />
                                </div>
                            </PanelBody>
                        </Panel>
                    </div>
                </div>
                <div className="col-md-3" />
                {this.state.showModal && (
                    <MultipleMessagesModal
                        closeModal={this.redirectParticipation}
                        buttonCancelText={'Ga naar participatie'}
                        children={this.state.modalText}
                        confirmAction={this.redirectTask}
                        buttonConfirmText={'Maak taak aan'}
                    />
                )}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});

export default connect(
    null,
    mapDispatchToProps
)(ParticipantNewApp);
