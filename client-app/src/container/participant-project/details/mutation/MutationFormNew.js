import React, { Component } from 'react';
import { connect } from 'react-redux';

import ParticipantMutationAPI from '../../../../api/participant-project/ParticipantMutationAPI';
import { fetchParticipantProjectDetails } from '../../../../actions/participants-project/ParticipantProjectDetailsActions';
import validator from 'validator';
import MutationFormDefault from './MutationFormDefault';
import moment from 'moment';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import InputDate from '../../../../components/form/InputDate';
import InputText from '../../../../components/form/InputText';
import InputSelect from '../../../../components/form/InputSelect';
import ButtonText from '../../../../components/button/ButtonText';

class MutationFormNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            participationMutation: {
                participationId: this.props.id,
                dateCreation: moment().format('Y-MM-DD'),
                typeId: '',
                statusId: '',
                datePayment: '',
                amount: '',
                quantity: '',
                returns: '',
            },
            errors: {
                typeId: false,
                dateCreation: false,
                amount: false,
                iban: false,
            },
        };

        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            participationMutation: {
                ...this.state.participationMutation,
                [name]: value,
            },
        });
    };

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            participationMutation: {
                ...this.state.participationMutation,
                [name]: value,
            },
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        const { participationMutation } = this.state;

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(participationMutation.typeId)) {
            errors.typeId = true;
            hasErrors = true;
        }

        if (validator.isEmpty(participationMutation.dateCreation)) {
            errors.dateCreation = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            ParticipantMutationAPI.newParticipantMutation(participationMutation).then(payload => {
                this.props.fetchParticipantProjectDetails(this.props.id);
                this.props.toggleShowNew();
            });
    };

    render() {
        const {
            dateCreation,
            typeId,
            statusId,
            datePayment,
            amount,
            quantity,
            returns,
        } = this.state.participationMutation;

        const { participantMutationStatuses, projectTypeCodeRef } = this.props;

        const participantMutationTypes = this.props.participantMutationTypes.filter(
            participantMutationType => participantMutationType.projectTypeCodeRef === projectTypeCodeRef
        );

        const type = participantMutationTypes.find(participantMutationType => participantMutationType.id == typeId);
        const typeCodeRef = type ? type.codeRef : null;

        const status = participantMutationStatuses.find(
            participantMutationStatus => participantMutationStatus.id == statusId
        );
        const statusCodeRef = status ? status.codeRef : null;

        return (
            <React.Fragment>
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <Panel className={'panel-grey'}>
                        <PanelBody>
                            <div className="row">
                                <InputSelect
                                    label={'Type'}
                                    id="typeId"
                                    name={'typeId'}
                                    options={participantMutationTypes}
                                    value={typeId}
                                    onChangeAction={this.handleInputChange}
                                    required={'required'}
                                    error={this.state.errors.typeId}
                                />
                                <InputSelect
                                    label={'Status'}
                                    id="statusId"
                                    name={'statusId'}
                                    options={participantMutationStatuses}
                                    value={statusId}
                                    onChangeAction={this.handleInputChange}
                                />
                            </div>

                            {typeCodeRef === 'first_deposit' ? (
                                <React.Fragment>
                                    {statusCodeRef === 'interest' ? <div>interest</div> : null}
                                    {statusCodeRef === 'option' ? <div>option</div> : null}
                                    {statusCodeRef === 'granted' ? <div>granted</div> : null}
                                    {statusCodeRef === 'final' ? <div>final</div> : null}
                                </React.Fragment>
                            ) : null}

                            <div className="row">
                                <InputText
                                    type={'number'}
                                    label={'Obligatie'}
                                    id={'quantity'}
                                    name={'quantity'}
                                    value={quantity}
                                    onChangeAction={this.handleInputChange}
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
                        </PanelBody>
                    </Panel>
                </form>

                <MutationFormDefault
                    editForm={false}
                    projectTypeCodeRef={projectTypeCodeRef}
                    typeId={typeId}
                    statusId={statusId}
                    dateCreation={dateCreation}
                    datePayment={datePayment}
                    amount={amount}
                    quantity={quantity}
                    returns={returns}
                    errors={this.state.errors}
                    participantMutationTypes={participantMutationTypes}
                    participantMutationStatuses={participantMutationStatuses}
                    handleSubmit={this.handleSubmit}
                    handleInputChange={this.handleInputChange}
                    handleInputChangeDate={this.handleInputChangeDate}
                    toggleShow={this.props.toggleShowNew}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        participantMutationTypes: state.systemData.participantMutationTypes,
        participantMutationStatuses: state.systemData.participantMutationStatuses,
        id: state.participantProjectDetails.id,
        projectTypeCodeRef: state.participantProjectDetails.project.projectType.codeRef,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchParticipantProjectDetails: id => {
        dispatch(fetchParticipantProjectDetails(id));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MutationFormNew);
