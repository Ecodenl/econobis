import React from 'react';
import moment from 'moment/moment';
moment.locale('nl');
import { connect } from 'react-redux';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import InputDate from '../../../../components/form/InputDate';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import ViewText from '../../../../components/form/ViewText';
import ParticipantDetailsMutationConclusion from './conclusion';
import ParticipantDetailsMutationStatusLog from './status-log';

const MutationFormEdit = ({
    participantMutation,
    errors,
    handleSubmit,
    handleInputChange,
    handleInputChangeDate,
    projectTypeCodeRef,
    cancelEdit,
}) => {
    const {
        type,
        status,
        quantityInterest,
        dateInterest,
        quantityOption,
        dateOption,
        quantityGranted,
        dateGranted,
        quantityFinal,
        dateContractRetour,
        datePayment,
        dateEntry,
    } = participantMutation;

    return (
        <div>
            <form className="form-horizontal" onSubmit={handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <ViewText label={'Type'} id={'type'} className={'col-sm-6 form-group'} value={type.name} />
                            <ViewText
                                label={'Huidige status'}
                                id={'status'}
                                className={'col-sm-6 form-group'}
                                value={status.name}
                            />
                        </div>

                        <div className="row">
                            <ViewText label={'Bedrag'} id={'amount'} className={'col-sm-6 form-group'} value={0} />
                        </div>

                        <div className="row">
                            <ViewText
                                label={'Aantal interesse'}
                                id={'quantityInterest'}
                                className={'col-sm-6 form-group'}
                                value={quantityInterest}
                            />
                            <ViewText
                                label={'Datum interesse'}
                                id={'dateInterest'}
                                className={'col-sm-6 form-group'}
                                value={dateInterest && moment(dateInterest).format('L')}
                            />
                        </div>

                        {status.codeRef === 'interest' && (
                            <div className="row">
                                <InputText
                                    type={'number'}
                                    label={'Aantal optie'}
                                    id={'quantityOption'}
                                    name={'quantityOption'}
                                    value={quantityOption}
                                    onChangeAction={handleInputChange}
                                    required={'required'}
                                    error={errors.quantityOption}
                                />
                                <InputDate
                                    label={'Optiedatum'}
                                    name={'dateOption'}
                                    value={dateOption}
                                    onChangeAction={handleInputChangeDate}
                                    required={'required'}
                                    error={errors.dateOption}
                                />
                            </div>
                        )}

                        {status.codeRef === 'option' && (
                            <React.Fragment>
                                <div className="row">
                                    <ViewText
                                        label={'Aantal optie'}
                                        id={'quantityOption'}
                                        className={'col-sm-6 form-group'}
                                        value={quantityOption}
                                    />
                                    <ViewText
                                        label={'Optiedatum'}
                                        id={'dateOption'}
                                        className={'col-sm-6 form-group'}
                                        value={dateOption && moment(dateOption).format('L')}
                                    />
                                </div>
                                <div className="row">
                                    <InputText
                                        type={'number'}
                                        label={'Aantal toegekend'}
                                        id={'quantityGranted'}
                                        name={'quantityGranted'}
                                        value={quantityGranted}
                                        onChangeAction={handleInputChange}
                                        required={'required'}
                                        error={errors.quantityGranted}
                                    />
                                    <InputDate
                                        label={'Toewijzingsdatum'}
                                        name={'dateGranted'}
                                        value={dateGranted}
                                        onChangeAction={handleInputChangeDate}
                                        required={'required'}
                                        error={errors.dateGranted}
                                    />
                                </div>
                            </React.Fragment>
                        )}

                        {status.codeRef === 'granted' && (
                            <React.Fragment>
                                <div className="row">
                                    <ViewText
                                        label={'Aantal optie'}
                                        id={'quantityOption'}
                                        className={'col-sm-6 form-group'}
                                        value={quantityOption}
                                    />
                                    <ViewText
                                        label={'Optiedatum'}
                                        id={'dateOption'}
                                        className={'col-sm-6 form-group'}
                                        value={dateOption && moment(dateOption).format('L')}
                                    />
                                </div>
                                <div className="row">
                                    <ViewText
                                        label={'Aantal toegekend'}
                                        id={'quantityGranted'}
                                        className={'col-sm-6 form-group'}
                                        value={quantityGranted}
                                    />
                                    <ViewText
                                        label={'Toewijzingsdatum'}
                                        id={'dateGranted'}
                                        className={'col-sm-6 form-group'}
                                        value={dateGranted && moment(dateGranted).format('L')}
                                    />
                                </div>
                                <div className="row">
                                    <InputText
                                        type={'number'}
                                        label={'Aantal definitief'}
                                        id={'quantityFinal'}
                                        name={'quantityFinal'}
                                        value={quantityFinal}
                                        onChangeAction={handleInputChange}
                                        required={'required'}
                                        error={errors.quantityFinal}
                                    />
                                    <InputDate
                                        label={'Ingangsdatum'}
                                        name={'dateEntry'}
                                        value={dateEntry}
                                        onChangeAction={handleInputChangeDate}
                                        required={'required'}
                                        error={errors.dateEntry}
                                    />
                                </div>
                                <div className="row">
                                    <InputDate
                                        label={'Contract retour'}
                                        name={'dateContractRetour'}
                                        value={dateContractRetour}
                                        onChangeAction={handleInputChangeDate}
                                    />
                                    <InputDate
                                        label={'Betaal datum'}
                                        name={'datePayment'}
                                        value={datePayment}
                                        onChangeAction={handleInputChangeDate}
                                    />
                                </div>
                            </React.Fragment>
                        )}

                        {status.codeRef === 'final' && (
                            <React.Fragment>
                                <div className="row">
                                    <ViewText
                                        label={'Aantal optie'}
                                        id={'quantityOption'}
                                        className={'col-sm-6 form-group'}
                                        value={quantityOption}
                                    />
                                    <ViewText
                                        label={'Optiedatum'}
                                        id={'dateOption'}
                                        className={'col-sm-6 form-group'}
                                        value={dateOption && moment(dateOption).format('L')}
                                    />
                                </div>
                                <div className="row">
                                    <ViewText
                                        label={'Aantal toegekend'}
                                        id={'quantityGranted'}
                                        className={'col-sm-6 form-group'}
                                        value={quantityGranted}
                                    />
                                    <ViewText
                                        label={'Toewijzingsdatum'}
                                        id={'dateGranted'}
                                        className={'col-sm-6 form-group'}
                                        value={dateGranted && moment(dateGranted).format('L')}
                                    />
                                </div>
                                <div className="row">
                                    <ViewText
                                        label={'Aantal definitief'}
                                        id={'quantityFinal'}
                                        className={'col-sm-6 form-group'}
                                        value={quantityFinal}
                                    />
                                    <ViewText
                                        label={'Ingangsdatum'}
                                        id={'dateEntry'}
                                        className={'col-sm-6 form-group'}
                                        value={dateEntry && moment(dateEntry).format('L')}
                                    />
                                </div>
                                <div className="row">
                                    <ViewText
                                        label={'Contract retour'}
                                        id={'dateContractRetour'}
                                        className={'col-sm-6 form-group'}
                                        value={dateContractRetour && moment(dateContractRetour).format('L')}
                                    />
                                    <ViewText
                                        label={'Betaal datum'}
                                        id={'datePayment'}
                                        className={'col-sm-6 form-group'}
                                        value={datePayment && moment(datePayment).format('L')}
                                    />
                                </div>
                            </React.Fragment>
                        )}

                        <ParticipantDetailsMutationStatusLog statusLogs={participantMutation.statusLogs} />

                        <ParticipantDetailsMutationConclusion participantMutation={participantMutation} />

                        <div className="pull-right btn-group" role="group">
                            <ButtonText
                                buttonClassName={'btn-default'}
                                buttonText={'Annuleren'}
                                onClickAction={cancelEdit}
                            />
                            <ButtonText
                                buttonText={'Opslaan'}
                                onClickAction={handleSubmit}
                                type={'submit'}
                                value={'Submit'}
                            />
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        projectTypeCodeRef: state.participantProjectDetails.project.projectType.codeRef,
    };
};

export default connect(mapStateToProps)(MutationFormEdit);
