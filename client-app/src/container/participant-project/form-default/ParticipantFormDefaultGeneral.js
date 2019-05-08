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
import ViewText from '../../../components/form/ViewText';
import moneyPresenter from '../../../helpers/MoneyPresenter';

const ParticipantFormDefaultGeneral = ({
    editForm,
    participation,
    participationWorth,
    valueCourses,
    errors,
    handleInputChange,
    handleSubmit,
    handleCancel,
    contacts,
    participantProjectPayoutTypes,
    projectTypeCodeRef,
}) => {
    const {
        contactName,
        uniqueMutationStatuses,
        projectName,
        projectAdministrationName,
        participationsDefinitive,
        participationsDefinitiveWorth,
        didAcceptAgreement,
        giftedByContactId,
        ibanPayout,
        ibanPayoutAttn,
        typeId,
        powerKwhConsumption,
        amountDefinitive,
    } = participation;

    return (
        <form className="form-horizontal col-md-12" onSubmit={handleSubmit}>
            <div className="row">
                <ViewText label={'Contact'} id={'contactName'} className={'col-sm-6 form-group'} value={contactName} />
                <ViewText label={'Status'} value={uniqueMutationStatuses.map(item => item.name).join(', ')} />
            </div>

            <div className="row">
                <ViewText label={'Project'} id={'projectName'} className={'col-sm-6 form-group'} value={projectName} />
                <ViewText
                    label={'Administratie'}
                    name={'administration'}
                    className={'col-sm-6 form-group'}
                    value={projectAdministrationName}
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
                        label={`Huidig saldo ${projectTypeCodeRef === 'loan' ? 'lening' : 'kapitaal'} rekening`}
                        name={'amountDefinitive'}
                        id={'amountDefinitive'}
                        value={amountDefinitive}
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
                <ViewText
                    label={'Totale opbrengsten'}
                    id={'totalWorthParticipations'}
                    className={'col-sm-6 form-group'}
                    value={moneyPresenter(0)}
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
                    participationsDefinitive={participationsDefinitive}
                    participationsDefinitiveWorth={participationsDefinitiveWorth}
                    valueCourses={valueCourses}
                />
            ) : null}

            {projectTypeCodeRef === 'capital' ? (
                <ParticipantFormDefaultCapital
                    participationWorth={participationWorth}
                    participationsDefinitive={participationsDefinitive}
                    participationsDefinitiveWorth={participationsDefinitiveWorth}
                    valueCourses={valueCourses}
                />
            ) : null}

            {projectTypeCodeRef === 'postalcode_link_capital' ? (
                <ParticipantFormDefaultPostalcodeLinkCapital
                    participationWorth={participationWorth}
                    participationsDefinitive={participationsDefinitive}
                    participationsDefinitiveWorth={participationsDefinitiveWorth}
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
    participantProjectPayoutTypes: PropTypes.array.isRequired,
    projectTypeCodeRef: PropTypes.string,
};

const mapStateToProps = state => {
    return {
        participantProjectPayoutTypes: state.systemData.participantProjectPayoutTypes,
    };
};

export default connect(mapStateToProps)(ParticipantFormDefaultGeneral);
