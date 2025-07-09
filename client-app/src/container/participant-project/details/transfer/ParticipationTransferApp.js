import React, { Component } from 'react';
import validator from 'validator';
import { useNavigate, useParams } from 'react-router-dom';

import ParticipationTransferToolbar from './ParticipationTransferToolbar';
import ParticipationTransfer from './ParticipationTransfer';

import ParticipantProjectDetailsAPI from '../../../../api/participant-project/ParticipantProjectDetailsAPI';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

// Functionele wrapper voor de class component
const ParticipationTransferAppWrapper = props => {
    const navigate = useNavigate();
    const params = useParams();
    return <ParticipationTransferApp {...props} navigate={navigate} params={params} />;
};

class ParticipationTransferApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contacts: [],
            participation: {},
            participationTransfer: {
                participationId: props.params.participationId,
                transferToContactId: '',
                projectId: '',
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

    UNSAFE_componentWillMount() {
        ParticipantProjectDetailsAPI.getContactsMembershipPeek(this.state.participationTransfer.participationId).then(
            payload => {
                payload.unshift({ id: '0', fullName: 'Teruggave energieleverancier' });
                this.setState({
                    contacts: payload,
                    peekLoading: {
                        ...this.state.peekLoading,
                        contacts: false,
                    },
                });
            }
        );

        ParticipantProjectDetailsAPI.fetchParticipantProject(this.state.participationTransfer.participationId).then(
            payload => {
                this.setState({
                    participation: payload,
                    participationTransfer: {
                        ...this.state.participationTransfer,
                        projectId: payload.project.id,
                        participationWorth: payload.project.participationWorth,
                    },
                });
            }
        );
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
            ParticipantProjectDetailsAPI.transferParticipation(participationTransfer).then(payload => {
                this.props.navigate(`/project/deelnemer/${participationTransfer.participationId}`);
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

export default ParticipationTransferAppWrapper;
