import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

moment.locale('nl');
import InputDate from '../../../../components/form/InputDate';
import ButtonText from '../../../../components/button/ButtonText';
import PanelFooter from '../../../../components/panel/PanelFooter';
import InputText from '../../../../components/form/InputText';
import InputToggle from '../../../../components/form/InputToggle';
import InputReactSelect from '../../../../components/form/InputReactSelect';

const ParticipantNew = props => {
    const {
        transferToContactId,
        participationsAmount,
        participationWorth,
        didSign,
        dateBook,
    } = props.participationTransfer;

    const { participation } = props;

    return (
        <form className="form-horizontal col-md-12" onSubmit={props.handleSubmit}>
            <div className="row">
                <InputText
                    label={'Huidige participant'}
                    name={'currentParticipantName'}
                    value={participation.contact ? participation.contact.fullName : ''}
                    readOnly={true}
                />
                <InputReactSelect
                    label={'Contact'}
                    name={'transferToContactId'}
                    options={props.contacts}
                    value={transferToContactId}
                    onChangeAction={props.handleReactSelectChange}
                    optionName={'fullName'}
                    multi={false}
                    isLoading={props.peekLoading.contacts}
                    required={'required'}
                    error={props.errors.transferToContactId}
                />
            </div>

            <div className="row">
                <InputText
                    label={'Project'}
                    name={'projectName'}
                    value={participation.project ? participation.project.name : ''}
                    readOnly={true}
                />
                <InputText
                    type={'number'}
                    min={'0'}
                    max={participation.participationsCurrent + ''}
                    label={'Aantal deelnames overdragen'}
                    name={'participationsAmount'}
                    value={participationsAmount}
                    onChangeAction={props.handleInputChange}
                    required={'required'}
                    error={props.errors.participationsAmount}
                />
            </div>

            <div className="row">
                <InputText
                    label={'Huidig aantal deelnames'}
                    name={'participationsCurrent'}
                    value={participation.participationsCurrent}
                    readOnly={true}
                />
                <InputText
                    type={'number'}
                    min={'0'}
                    label={'Waarde per deelname'}
                    name={'participationWorth'}
                    value={participationWorth}
                    onChangeAction={props.handleInputChange}
                    required={'required'}
                    error={props.errors.participationWorth}
                />
            </div>

            <div className="row">
                <InputText
                    label={'Waarde over te dragen deelnames'}
                    name={'participationsWorthTotal'}
                    value={participationsAmount * participationWorth}
                    readOnly={true}
                />
                <InputDate
                    label={'Overdrachtsdatum'}
                    name={'dateBook'}
                    value={dateBook}
                    onChangeAction={props.handleInputChangeDate}
                />
            </div>

            <div className="row">
                <InputToggle
                    label={'Getekend document'}
                    name={'didSign'}
                    value={didSign}
                    onChangeAction={props.handleInputChange}
                    required={'required'}
                />
                {props.errors.didSign && (
                    <div className="col-sm-10 col-md-offset-1 alert alert-danger">Het document moet getekend zijn.</div>
                )}
            </div>

            <PanelFooter>
                <div className="pull-right btn-group" role="group">
                    <ButtonText
                        buttonText={'Opslaan'}
                        onClickAction={props.handleSubmit}
                        type={'submit'}
                        value={'Submit'}
                    />
                </div>
            </PanelFooter>
        </form>
    );
};

const mapStateToProps = state => {
    return {
        participantProjectStatuses: state.systemData.participantProjectStatus,
        participantProjectPayoutTypes: state.systemData.participantProjectPayoutTypes,
    };
};

export default connect(mapStateToProps)(ParticipantNew);
