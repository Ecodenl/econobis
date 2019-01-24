import React, { Component } from 'react';
import moment from 'moment';
import validator from 'validator';
import { isEmpty } from 'lodash';
import { hashHistory } from 'react-router';

import ParticipationTransferToolbar from './ParticipationTransferToolbar';
import ParticipationTransfer from './ParticipationTransfer';

import ParticipantProductionProjectDetailsAPI from '../../../../../../api/participant-production-project/ParticipantProductionProjectDetailsAPI';
import Panel from '../../../../../../components/panel/Panel';
import PanelBody from '../../../../../../components/panel/PanelBody';

class ParticipationTransferApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contacts: [],
            participation: {},
            participationTransfer: {
                participationId: props.params.participationId,
                transferToContactId: '',
                productionProjectId: '',
                participationsAmount: 0,
                participationWorth: '',
                didSign: false,
                dateBook: '',
            },
            errors: {
                transferToContactId: false,
                participationsAmount: false,
                participationWorth: false,
                didSign: false,
            },
            peekLoading: {
                contacts: true,
            },
        };

        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
        this.handleReactSelectChange = this.handleReactSelectChange.bind(this);
    }

    componentWillMount() {
        ParticipantProductionProjectDetailsAPI.getContactsMembershipPeek(
            this.state.participationTransfer.participationId
        ).then(payload => {
            payload.unshift({ id: '0', fullName: 'Teruggave energieleverancier' });
            this.setState({
                contacts: payload,
                peekLoading: {
                    ...this.state.peekLoading,
                    contacts: false,
                },
            });
        });

        ParticipantProductionProjectDetailsAPI.fetchParticipantProductionProject(
            this.state.participationTransfer.participationId
        ).then(payload => {
            this.setState({
                participation: payload,
                participationTransfer: {
                    ...this.state.participationTransfer,
                    productionProjectId: payload.productionProject.id,
                    participationWorth: payload.productionProject.participationWorth,
                },
            });
        });
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            participationTransfer: {
                ...this.state.participationTransfer,
                [name]: value,
            },
        });
    };

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            participationTransfer: {
                ...this.state.participationTransfer,
                [name]: value,
            },
        });
    }

    handleReactSelectChange(selectedOption, name) {
        this.setState({
            ...this.state,
            participationTransfer: {
                ...this.state.participationTransfer,
                [name]: selectedOption,
            },
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        const { participationTransfer } = this.state;

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(participationTransfer.transferToContactId + '')) {
            errors.transferToContactId = true;
            hasErrors = true;
        }

        if (validator.isEmpty(participationTransfer.participationsAmount + '')) {
            errors.participationsAmount = true;
            hasErrors = true;
        }

        if (participationTransfer.participationsAmount > this.state.participation.participationsCurrent) {
            errors.participationsAmount = true;
            hasErrors = true;
        }

        if (participationTransfer.participationsAmount <= 0) {
            errors.participationsAmount = true;
            hasErrors = true;
        }

        if (validator.isEmpty(participationTransfer.participationWorth + '')) {
            errors.participationWorth = true;
            hasErrors = true;
        }

        if (participationTransfer.participationWorth < 0) {
            errors.participationWorth = true;
            hasErrors = true;
        }

        if (participationTransfer.didSign === false) {
            errors.didSign = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
            ParticipantProductionProjectDetailsAPI.transferParticipation(participationTransfer).then(payload => {
                hashHistory.push(`/productie-project/participant/${participationTransfer.participationId}`);
            });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <ParticipationTransferToolbar />
                    </div>

                    <div className="col-md-12">
                        <Panel>
                            <PanelBody>
                                <div className="col-md-12">
                                    <ParticipationTransfer
                                        participationTransfer={this.state.participationTransfer}
                                        errors={this.state.errors}
                                        handleInputChange={this.handleInputChange}
                                        handleInputChangeDate={this.handleInputChangeDate}
                                        handleSubmit={this.handleSubmit}
                                        contacts={this.state.contacts}
                                        participation={this.state.participation}
                                        peekLoading={this.state.peekLoading}
                                        handleReactSelectChange={this.handleReactSelectChange}
                                    />
                                </div>
                            </PanelBody>
                        </Panel>
                    </div>
                </div>
                <div className="col-md-3" />
            </div>
        );
    }
}

export default ParticipationTransferApp;
