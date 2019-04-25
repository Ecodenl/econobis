import React, { Component } from 'react';
import { connect } from 'react-redux';

import ParticipantObligationNumberAPI from '../../../../../../api/participant-production-project/ParticipantObligationNumberAPI';
import ProductionProjectDetailsAPI from '../../../../../../api/production-project/ProductionProjectDetailsAPI';
import { newObligationNumber } from '../../../../../../actions/participants-production-project/ParticipantProductionProjectDetailsActions';
import InputText from '../../../../../../components/form/InputText';
import ButtonText from '../../../../../../components/button/ButtonText';
import Panel from '../../../../../../components/panel/Panel';
import PanelBody from '../../../../../../components/panel/PanelBody';
import validator from 'validator';
import ErrorModal from '../../../../../../components/modal/ErrorModal';

class ObligationNumberFormNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            obligationNumbers: [],
            obligationNumber: {
                participationId: this.props.id,
                number: '',
            },
            errors: {
                number: false,
            },
        };
    }

    componentDidMount() {
        ProductionProjectDetailsAPI.fetchObligationNumbers(this.props.productionProjectId).then(payload => {
            this.setState({
                obligationNumbers: payload,
            });
        });
    }

    toggleErrorModal = () => {
        this.setState({
            showModalError: !this.state.showModalError,
        });
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            obligationNumber: {
                ...this.state.obligationNumber,
                [name]: value,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { obligationNumber } = this.state;

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(obligationNumber.number)) {
            errors.number = true;
            hasErrors = true;
        } else {
            if (this.state.obligationNumbers.includes(obligationNumber.number)) {
                this.setState({
                    showModalError: !this.state.showModalError,
                    modalErrorTitle: 'Waarschuwing',
                    modalErrorMessage: 'Dit obligatienummer bestaat al.',
                });

                errors.number = true;
                hasErrors = true;
            }
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            ParticipantObligationNumberAPI.newObligationNumber(obligationNumber).then(payload => {
                this.props.newObligationNumber(payload);
                this.props.toggleShowNew();
            });
    };

    render() {
        const { number } = this.state.obligationNumber;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label={'Nummer'}
                                id={'number'}
                                name={'number'}
                                value={number}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.number}
                            />
                        </div>

                        <div className="pull-right btn-group" role="group">
                            <ButtonText
                                buttonClassName={'btn-default'}
                                buttonText={'Annuleren'}
                                onClickAction={this.props.toggleShowNew}
                            />
                            <ButtonText
                                buttonText={'Opslaan'}
                                onClickAction={this.handleSubmit}
                                type={'submit'}
                                value={'Submit'}
                            />
                        </div>

                        {this.state.showModalError && (
                            <ErrorModal
                                closeModal={this.toggleErrorModal}
                                title={this.state.modalErrorTitle}
                                errorMessage={this.state.modalErrorMessage}
                            />
                        )}
                    </PanelBody>
                </Panel>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        id: state.participantProductionProjectDetails.id,
        productionProjectId: state.participantProductionProjectDetails.productionProjectId,
    };
};

const mapDispatchToProps = dispatch => ({
    newObligationNumber: obligationNumber => {
        dispatch(newObligationNumber(obligationNumber));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ObligationNumberFormNew);
