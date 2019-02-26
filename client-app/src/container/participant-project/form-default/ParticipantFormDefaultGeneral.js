import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

moment.locale('nl');
import InputSelect from '../../../components/form/InputSelect';
import InputDate from '../../../components/form/InputDate';
import ButtonText from '../../../components/button/ButtonText';
import PanelFooter from '../../../components/panel/PanelFooter';
import InputText from '../../../components/form/InputText';
import InputToggle from '../../../components/form/InputToggle';
import ParticipantFormDefaultObligation from './ParticipantFormDefaultObligation';
import ParticipantFormDefaultCapital from './ParticipantFormDefaultCapital';
import ParticipantFormDefaultPostalcodeLinkCapital from './ParticipantFormDefaultPostalcodeLinkCapital';

const ParticipantFormDefaultGeneral = ({
    editForm,
    participation,
    participationWorth,
    valueCourses,
    errors,
    handleInputChange,
    handleInputChangeDate,
    handleProjectChange,
    handleSubmit,
    handleCancel,
    contacts,
    projects,
    participantProjectStatuses,
    participantProjectPayoutTypes,
    projectTypeCodeRef,
}) => {
    const {
        contactId,
        contactName,
        statusId,
        projectId,
        projectName,
        projectAdministrationName,
        dateRegister,
        participationsRequested,
        participationsGranted,
        participationsSold,
        participationsWorthTotal,
        dateContractSend,
        dateContractRetour,
        didAcceptAgreement,
        giftedByContactId,
        ibanPayout,
        ibanPayoutAttn,
        updatedAt,
        dateEnd,
        typeId,
        powerKwhConsumption,
    } = participation;

    return (
        <form className="form-horizontal col-md-12" onSubmit={handleSubmit}>
            <div className="row">
                {editForm ? (
                    <InputText
                        label={'Contact'}
                        name={'contactName'}
                        id={'contactName'}
                        value={contactName}
                        onChangeAction={() => {}}
                        readOnly={true}
                    />
                ) : (
                    <InputSelect
                        label={'Contact'}
                        name={'contactId'}
                        id={'contactId'}
                        options={contacts}
                        optionName={'fullName'}
                        value={contactId}
                        onChangeAction={handleInputChange}
                        required={'required'}
                        error={errors.contactId}
                    />
                )}
                <InputSelect
                    label={'Status'}
                    name={'statusId'}
                    id={'statusId'}
                    options={participantProjectStatuses}
                    value={statusId}
                    onChangeAction={handleInputChange}
                    required={'required'}
                    error={errors.statusId}
                />
            </div>

            <div className="row">
                {editForm ? (
                    <InputText
                        label={'Project'}
                        name={'projectName'}
                        id={'projectName'}
                        value={projectName}
                        onChangeAction={() => {}}
                        readOnly={true}
                    />
                ) : (
                    <InputSelect
                        label={'Project'}
                        name={'projectId'}
                        id={'projectId'}
                        options={projects}
                        value={projectId}
                        onChangeAction={handleProjectChange}
                        required={'required'}
                        error={errors.projectId}
                    />
                )}
                <InputDate
                    label={'Contract verstuurd'}
                    name={'dateContractSend'}
                    id={'dateContractSend'}
                    value={dateContractSend}
                    onChangeAction={handleInputChangeDate}
                />
            </div>

            <div className="row">
                <InputText
                    label={'Datum'}
                    name={'updatedAt'}
                    id={'updatedAt'}
                    value={updatedAt && moment(updatedAt.date).format('L')}
                    onChangeAction={() => {}}
                    readOnly={true}
                />
                <InputDate
                    label={'Contract retour'}
                    name={'dateContractRetour'}
                    id={'dateContractRetour'}
                    value={dateContractRetour}
                    onChangeAction={handleInputChangeDate}
                />
            </div>

            <div className="row">
                <InputText
                    label={'Administratie'}
                    name={'administration'}
                    value={projectAdministrationName}
                    readOnly={true}
                    onChangeAction={() => {}}
                />
                <InputDate
                    label={'Einddatum'}
                    name={'dateEnd'}
                    id={'dateEnd'}
                    value={dateEnd}
                    onChangeAction={handleInputChangeDate}
                />
            </div>

            <div className="row">
                <InputToggle
                    label={'Akkoord reglement'}
                    name={'didAcceptAgreement'}
                    id={'didAcceptAgreement'}
                    value={didAcceptAgreement}
                    onChangeAction={handleInputChange}
                />
                <InputDate
                    label={'Inschrijfdatum'}
                    name={'dateRegister'}
                    id={'dateRegister'}
                    value={dateRegister}
                    onChangeAction={handleInputChangeDate}
                />
            </div>

            <div className="row">
                <InputSelect
                    label={'Schenker'}
                    name={'giftedByContactId'}
                    id={'giftedByContactId'}
                    options={contacts}
                    optionName={'fullName'}
                    value={giftedByContactId}
                    onChangeAction={handleInputChange}
                />
                <InputText
                    label={'IBAN uitkeren'}
                    name={'ibanPayout'}
                    id={'ibanPayout'}
                    value={ibanPayout}
                    onChangeAction={handleInputChange}
                    error={errors.ibanPayout}
                />
            </div>

            <div className="row">
                {projectTypeCodeRef === 'obligation' ? (
                    <div className={'form-group col-md-6'} />
                ) : (
                    <InputText
                        label={`Huidige saldo ${projectTypeCodeRef === 'loan' ? 'lening' : 'kapitaal'} rekening`}
                        name={'totalWorthParticipations'}
                        id={'totalWorthParticipations'}
                        value={statusId == 2 ? (participationsGranted - participationsSold) * participationWorth : 0}
                        onChangeAction={() => {}}
                        readOnly={true}
                    />
                )}
                <InputText
                    label={'IBAN uitkeren t.n.v.'}
                    name={'ibanPayoutAttn'}
                    id={'ibanPayoutAttn'}
                    value={ibanPayoutAttn}
                    onChangeAction={handleInputChange}
                />
            </div>

            <div className="row">
                <InputText
                    label={'Totale opbrengsten'}
                    name={'totalWorthParticipations'}
                    id={'totalWorthParticipations'}
                    value={statusId == 2 ? (participationsGranted - participationsSold) * participationWorth : 0}
                    readOnly={true}
                    onChangeAction={() => {}}
                />
                <InputSelect
                    label={'Uitkeren op'}
                    name={'typeId'}
                    id={'typeId'}
                    options={participantProjectPayoutTypes}
                    value={typeId}
                    onChangeAction={handleInputChange}
                    required={'required'}
                    error={errors.typeId}
                />
            </div>

            {projectTypeCodeRef === 'obligation' ? (
                <ParticipantFormDefaultObligation
                    participationWorth={participationWorth}
                    participationsGranted={participationsGranted}
                    participationsWorthTotal={participationsWorthTotal}
                    valueCourses={valueCourses}
                />
            ) : null}

            {projectTypeCodeRef === 'capital' ? (
                <ParticipantFormDefaultCapital
                    participationWorth={participationWorth}
                    participationsGranted={participationsGranted}
                    participationsWorthTotal={participationsWorthTotal}
                    valueCourses={valueCourses}
                />
            ) : null}

            {projectTypeCodeRef === 'postalcode_link_capital' ? (
                <ParticipantFormDefaultPostalcodeLinkCapital
                    participationWorth={participationWorth}
                    participationsGranted={participationsGranted}
                    participationsWorthTotal={participationsWorthTotal}
                    valueCourses={valueCourses}
                    powerKwhConsumption={powerKwhConsumption}
                    handleInputChange={handleInputChange}
                />
            ) : null}

            <PanelFooter>
                <div className="pull-right btn-group" role="group">
                    <ButtonText buttonClassName={'btn-default'} buttonText={'Annuleren'} onClickAction={handleCancel} />
                    <ButtonText buttonText={'Opslaan'} onClickAction={handleSubmit} type={'submit'} value={'Submit'} />
                </div>
            </PanelFooter>
        </form>
    );
};

ParticipantFormDefaultGeneral.defaultProps = {
    editForm: false,
    errors: {},
    handleProjectChange: () => {},
    contacts: [],
    projects: [],
    projectTypeCodeRef: '',
};

ParticipantFormDefaultGeneral.propTypes = {
    editForm: PropTypes.bool,
    buttonClassName: PropTypes.string,
    iconName: PropTypes.string.isRequired,
    onClickAction: PropTypes.func,
    title: PropTypes.string,
    participation: PropTypes.object.isRequired,
    participationWorth: PropTypes.number.isRequired,
    errors: PropTypes.object,
    handleInputChange: PropTypes.func.isRequired,
    handleInputChangeDate: PropTypes.func.isRequired,
    handleProjectChange: PropTypes.func,
    handleSubmit: PropTypes.func.isRequired,
    handleCancel: PropTypes.func,
    contacts: PropTypes.array,
    projects: PropTypes.array,
    participantProjectStatuses: PropTypes.array.isRequired,
    participantProjectPayoutTypes: PropTypes.array.isRequired,
    projectTypeCodeRef: PropTypes.string,
};

const mapStateToProps = state => {
    return {
        participantProjectStatuses: state.systemData.participantProjectStatus,
        participantProjectPayoutTypes: state.systemData.participantProjectPayoutTypes,
    };
};

export default connect(mapStateToProps)(ParticipantFormDefaultGeneral);
