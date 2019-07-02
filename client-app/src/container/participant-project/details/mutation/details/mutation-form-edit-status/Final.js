import React from 'react';
import ViewText from '../../../../../../components/form/ViewText';
import moment from 'moment';
import InputText from '../../../../../../components/form/InputText';
import InputDate from '../../../../../../components/form/InputDate';

const MutationFormEditStatusFinal = ({
    originalStatus,
    statusId,
    quantityInterest,
    amountInterest,
    dateInterest,
    quantityOption,
    amountOption,
    dateOption,
    quantityGranted,
    amountGranted,
    dateGranted,
    quantityFinal,
    amountFinal,
    dateEntry,
    dateContractRetour,
    datePayment,
    handleInputChange,
    handleInputChangeDate,
    errors,
    projectTypeCodeRef,
}) => (
    <React.Fragment>
        <div className="row">
            {projectTypeCodeRef === 'loan' ? (
                <ViewText
                    label={'Bedrag interesse'}
                    id={'amountInterest'}
                    className={'col-sm-6 form-group'}
                    value={amountInterest}
                />
            ) : (
                <ViewText
                    label={'Aantal interesse'}
                    id={'quantityInterest'}
                    className={'col-sm-6 form-group'}
                    value={quantityInterest}
                />
            )}
            <ViewText
                label={'Datum interesse'}
                id={'dateInterest'}
                className={'col-sm-6 form-group'}
                value={dateInterest && moment(dateInterest).format('L')}
            />
        </div>
        <div className="row">
            {projectTypeCodeRef === 'loan' ? (
                <ViewText
                    label={'Bedrag inschrijving'}
                    id={'amountOption'}
                    className={'col-sm-6 form-group'}
                    value={amountOption}
                />
            ) : (
                <ViewText
                    label={'Aantal inschrijving'}
                    id={'quantityOption'}
                    className={'col-sm-6 form-group'}
                    value={quantityOption}
                />
            )}
            <ViewText
                label={'Inschrijvingdatum'}
                id={'dateOption'}
                className={'col-sm-6 form-group'}
                value={dateOption && moment(dateOption).format('L')}
            />
        </div>
        <div className="row">
            {projectTypeCodeRef === 'loan' ? (
                <ViewText
                    label={'Bedrag toegekend'}
                    id={'amountGranted'}
                    className={'col-sm-6 form-group'}
                    value={amountGranted}
                />
            ) : (
                <ViewText
                    label={'Aantal toegekend'}
                    id={'quantityGranted'}
                    className={'col-sm-6 form-group'}
                    value={quantityGranted}
                />
            )}
            <ViewText
                label={'Toewijzingsdatum'}
                id={'dateGranted'}
                className={'col-sm-6 form-group'}
                value={dateGranted && moment(dateGranted).format('L')}
            />
        </div>
        <div className="row">
            {projectTypeCodeRef === 'loan' ? (
                <InputText
                    type={'number'}
                    label={'Bedrag definitief'}
                    id={'amountFinal'}
                    name={'amountFinal'}
                    value={amountFinal}
                    onChangeAction={handleInputChange}
                    required={'required'}
                    error={errors.amountFinal}
                />
            ) : (
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
            )}
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
);

export default MutationFormEditStatusFinal;
