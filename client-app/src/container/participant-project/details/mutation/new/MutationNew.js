import React, { Component } from 'react';
import { connect } from 'react-redux';

import ParticipantMutationAPI from '../../../../../api/participant-project/ParticipantMutationAPI';
import { fetchParticipantProjectDetails } from '../../../../../actions/participants-project/ParticipantProjectDetailsActions';
import moment from 'moment/moment';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import InputSelect from '../../../../../components/form/InputSelect';
import ButtonText from '../../../../../components/button/ButtonText';
import MutationNewDeposit from './MutationNewDeposit';
import MutationNewValidateForm from './MutationNewValidateForm';
import MutationNewSubmitHelper from './MutationNewSubmitHelper';
import MutationNewWithDrawal from './MutationNewWithDrawal';
import ViewText from '../../../../../components/form/ViewText';

class MutationFormNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            participationMutation: {
                participationId: this.props.id,
                typeId: '',
                statusId: '',
                quantityInterest: 0,
                amountInterest: 0,
                dateInterest: moment().format('YYYY-MM-DD'),
                quantityOption: 0,
                amountOption: 0,
                dateOption: moment().format('YYYY-MM-DD'),
                quantityGranted: 0,
                amountGranted: 0,
                dateGranted: moment().format('YYYY-MM-DD'),
                quantityFinal: 0,
                amountFinal: 0,
                dateContractRetour: null,
                datePayment: null,
                dateEntry: this.props.projectDateEntry
                    ? moment(this.props.projectDateEntry).format('YYYY-MM-DD')
                    : moment().format('YYYY-MM-DD'),
            },
            errors: {},
        };
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState(
            {
                ...this.state,
                participationMutation: {
                    ...this.state.participationMutation,
                    [name]: value,
                },
            },
            () => this.linkedValueAdjustment(name)
        );
    };

    linkedValueAdjustment = name => {
        // If field statusId is changed then change dateGranted when applicable
        if (name === 'statusId') {
            const currentStatusId = Number(this.state.participationMutation.statusId);
            const checkStatusId = this.props.participantMutationStatuses.find(
                participantMutationStatuses => participantMutationStatuses.codeRef === 'final'
            ).id;
            const dateGranted = currentStatusId === checkStatusId ? null : moment().format('YYYY-MM-DD');

            this.setState({
                ...this.state,
                participation: {
                    ...this.state.participation,
                    dateGranted,
                },
            });
        }
    };

    handleInputChangeDate = (value, name) => {
        this.setState({
            ...this.state,
            participationMutation: {
                ...this.state.participationMutation,
                [name]: value,
            },
        });
    };

    handleBlurAmount = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            participationMutation: {
                ...this.state.participationMutation,
                [name]: parseFloat(value).toFixed(2),
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { participationMutation } = this.state;

        let errors = {};
        let hasErrors = false;

        const type = this.props.participantMutationTypes.find(
            participantMutationType => participantMutationType.id == participationMutation.typeId
        );
        const typeCodeRef = type ? type.codeRef : null;

        // On type 'withDrawal' default status is 'final'
        if (typeCodeRef === 'withDrawal') {
            participationMutation.statusId = this.props.participantMutationStatuses.find(
                participantMutationStatus => participantMutationStatus.codeRef === 'final'
            ).id;
        }

        const status = this.props.participantMutationStatuses.find(
            participantMutationStatus => participantMutationStatus.id == participationMutation.statusId
        );
        const statusCodeRef = status ? status.codeRef : null;

        const validatedForm = MutationNewValidateForm(
            participationMutation,
            errors,
            hasErrors,
            statusCodeRef,
            typeCodeRef,
            this.props.projectTypeCodeRef
        );

        this.setState({ ...this.state, errors: validatedForm.errors });

        // If no errors send form
        if (!validatedForm.hasErrors) {
            const values = MutationNewSubmitHelper(
                participationMutation,
                statusCodeRef,
                typeCodeRef,
                this.props.projectTypeCodeRef
            );

            ParticipantMutationAPI.newParticipantMutation(values).then(payload => {
                this.props.fetchParticipantProjectDetails(this.props.id);
                this.props.toggleShowNew();
            });
        }
    };

    render() {
        const { typeId, statusId } = this.state.participationMutation;

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

        const participantMutationTypesOptions = participantMutationTypes.filter(
            participantMutationType =>
                participantMutationType.codeRef === 'first_deposit' ||
                participantMutationType.codeRef === 'deposit' ||
                participantMutationType.codeRef === 'withDrawal' ||
                participantMutationType.codeRef === 'sell'
        );

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
                                    options={participantMutationTypesOptions}
                                    value={typeId}
                                    onChangeAction={this.handleInputChange}
                                    required={'required'}
                                    error={this.state.errors.typeId}
                                />
                                {typeCodeRef === 'first_deposit' || typeCodeRef === 'deposit' ? (
                                    <InputSelect
                                        label={'Status'}
                                        id="statusId"
                                        name={'statusId'}
                                        options={participantMutationStatuses}
                                        value={statusId}
                                        onChangeAction={this.handleInputChange}
                                        required={'required'}
                                        error={this.state.errors.statusId}
                                    />
                                ) : null}

                                {typeCodeRef === 'withDrawal' ? (
                                    <ViewText
                                        className={'form-group col-sm-6'}
                                        label={'Status'}
                                        value={
                                            participantMutationStatuses.find(
                                                participantMutationStatus =>
                                                    participantMutationStatus.codeRef === 'final'
                                            ).name
                                        }
                                    />
                                ) : null}
                            </div>

                            {typeCodeRef === 'first_deposit' || typeCodeRef === 'deposit' ? (
                                <MutationNewDeposit
                                    statusCodeRef={statusCodeRef}
                                    {...this.state.participationMutation}
                                    errors={this.state.errors}
                                    handleInputChange={this.handleInputChange}
                                    handleInputChangeDate={this.handleInputChangeDate}
                                    projectTypeCodeRef={this.props.projectTypeCodeRef}
                                />
                            ) : null}

                            {typeCodeRef === 'withDrawal' ? (
                                <MutationNewWithDrawal
                                    statusCodeRef={statusCodeRef}
                                    {...this.state.participationMutation}
                                    errors={this.state.errors}
                                    handleInputChange={this.handleInputChange}
                                    handleInputChangeDate={this.handleInputChangeDate}
                                    projectTypeCodeRef={this.props.projectTypeCodeRef}
                                />
                            ) : null}

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
        projectDateEntry: state.participantProjectDetails.project.dateEntry,
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
