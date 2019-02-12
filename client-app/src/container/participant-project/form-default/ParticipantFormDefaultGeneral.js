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

const ParticipantFormDefaultGeneral = ({
    participation,
    errors,
    readOnlyFields,
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
        statusId,
        projectId,
        dateRegister,
        participationsRequested,
        participationsGranted,
        dateContractSend,
        dateContractRetour,
        didAcceptAgreement,
        giftedByContactId,
        ibanPayout,
        ibanPayoutAttn,
        date,
        dateEnd,
        typeId,
    } = participation;

    return (
        <form className="form-horizontal col-md-12" onSubmit={handleSubmit}>
            <div className="row">
                <InputSelect
                    label={'Contact'}
                    name={'contactId'}
                    options={contacts}
                    optionName={'fullName'}
                    value={contactId}
                    onChangeAction={handleInputChange}
                    required={'required'}
                    error={errors.contactId}
                    readOnly={readOnlyFields.contactId}
                />
                <InputSelect
                    label={'Status'}
                    name={'statusId'}
                    options={participantProjectStatuses}
                    value={statusId}
                    onChangeAction={handleInputChange}
                    required={'required'}
                    error={errors.statusId}
                />
            </div>

            <div className="row">
                <InputSelect
                    label={'Project'}
                    name={'projectId'}
                    options={projects}
                    value={projectId}
                    onChangeAction={handleProjectChange}
                    required={'required'}
                    error={errors.projectId}
                    readOnly={readOnlyFields.contactId}
                />
                <InputDate
                    label={'Contract verstuurd'}
                    name={'dateContractSend'}
                    value={dateContractSend}
                    onChangeAction={handleInputChangeDate}
                />
            </div>

            <div className="row">
                <InputText label={'Datum'} name={'date'} value={date && moment(date).format('L')} readOnly={true} />
                <InputDate
                    label={'Contract retour'}
                    name={'dateContractRetour'}
                    value={dateContractRetour}
                    onChangeAction={handleInputChangeDate}
                />
            </div>

            <div className="row">
                <InputText label={'Administratie'} name={'administration'} value={'???'} />
                <InputDate
                    label={'Einddatum'}
                    name={'dateEnd'}
                    value={dateEnd}
                    onChangeAction={handleInputChangeDate}
                />
            </div>

            <div className="row">
                <InputToggle
                    label={'Akkoord reglement'}
                    name={'didAcceptAgreement'}
                    value={didAcceptAgreement}
                    onChangeAction={handleInputChange}
                />
                <InputDate
                    label={'Inschrijfdatum'}
                    name={'dateRegister'}
                    value={dateRegister}
                    onChangeAction={handleInputChangeDate}
                />
            </div>

            <div className="row">
                <InputSelect
                    label={'Schenker'}
                    name={'giftedByContactId'}
                    options={contacts}
                    optionName={'fullName'}
                    value={giftedByContactId}
                    onChangeAction={handleInputChange}
                />
                <InputText
                    label={'IBAN uitkeren'}
                    name={'ibanPayout'}
                    value={ibanPayout}
                    onChangeAction={handleInputChange}
                    error={errors.ibanPayout}
                />
            </div>

            <div className="row">
                <InputText
                    label={`Huidige saldo ${projectTypeCodeRef === 'loan' ? 'lening' : 'kapitaal'} rekening`}
                    name={'totalWorthParticipations'}
                    value={statusId == 2 ? (participationsGranted - participationsSold) * participationWorth : 0}
                    onChangeAction={() => {}}
                    readOnly={true}
                />
                <InputText
                    label={'IBAN uitkeren t.n.v.'}
                    name={'ibanPayoutAttn'}
                    value={ibanPayoutAttn}
                    onChangeAction={handleInputChange}
                />
            </div>

            <div className="row">
                <InputText
                    label={'Totale opbrengsten'}
                    name={'totalWorthParticipations'}
                    value={statusId == 2 ? (participationsGranted - participationsSold) * participationWorth : 0}
                    readOnly={true}
                />
                <InputSelect
                    label={'Uitkeren op'}
                    name={'typeId'}
                    options={participantProjectPayoutTypes}
                    value={typeId}
                    onChangeAction={handleInputChange}
                    required={'required'}
                    error={errors.typeId}
                />
            </div>

            {projectTypeCodeRef === 'obligation' ? (
                <React.Fragment>
                    <hr style={{ margin: '10px 0' }} />
                    <h4>Obligaties</h4>
                    <div className="row">
                        <InputText
                            type={'number'}
                            label={'Obligaties aangevraagd'}
                            name={'participationsRequested'}
                            value={participationsRequested}
                            onChangeAction={handleInputChange}
                        />
                    </div>
                    <div className="row">
                        <InputText
                            type={'number'}
                            label={'Obligaties toegekend'}
                            name={'participationsGranted'}
                            value={participationsGranted}
                            onChangeAction={handleInputChange}
                        />
                    </div>
                </React.Fragment>
            ) : null}

            {projectTypeCodeRef === 'capital' ? (
                <React.Fragment>
                    <hr style={{ margin: '10px 0' }} />
                    <h4>Kapitaal</h4>
                    <div className="row">
                        <InputText
                            type={'number'}
                            label={'Participaties aangevraagd'}
                            name={'participationsRequested'}
                            value={participationsRequested}
                            onChangeAction={handleInputChange}
                        />
                    </div>
                    <div className="row">
                        <InputText
                            type={'number'}
                            label={'Participaties toegekend'}
                            name={'participationsGranted'}
                            value={participationsGranted}
                            onChangeAction={handleInputChange}
                        />
                    </div>
                </React.Fragment>
            ) : null}

            {projectTypeCodeRef === 'postalcode_link_capital' ? (
                <React.Fragment>
                    <hr style={{ margin: '10px 0' }} />
                    <h4>Postcoderoos</h4>
                </React.Fragment>
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
    errors: {},
    readOnlyFields: {},
    handleProjectChange: () => {},
    contacts: [],
    projectTypeCodeRef: '',
};

ParticipantFormDefaultGeneral.propTypes = {
    buttonClassName: PropTypes.string,
    iconName: PropTypes.string.isRequired,
    onClickAction: PropTypes.func,
    title: PropTypes.string,
    participation: PropTypes.object.isRequired,
    errors: PropTypes.object,
    readOnlyFields: PropTypes.object,
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
