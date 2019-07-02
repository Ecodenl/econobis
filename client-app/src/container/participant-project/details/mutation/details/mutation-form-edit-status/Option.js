import React from 'react';
import ViewText from '../../../../../../components/form/ViewText';
import moment from 'moment';
import InputText from '../../../../../../components/form/InputText';
import InputDate from '../../../../../../components/form/InputDate';

const MutationFormEditStatusOption = ({
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
    handleInputChange,
    handleInputChangeDate,
    errors,
    projectTypeCodeRef,
}) => (
    <React.Fragment>
        {originalStatus.id !== Number(statusId) ? (
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
                        label={'Interessedatum'}
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
                        label={'Inschrijvingsdatum'}
                        id={'dateOption'}
                        className={'col-sm-6 form-group'}
                        value={dateOption && moment(dateOption).format('L')}
                    />
                </div>
                <div className="row">
                    {projectTypeCodeRef === 'loan' ? (
                        <InputText
                            type={'number'}
                            label={'Bedrag toegekend'}
                            id={'amountGranted'}
                            name={'amountGranted'}
                            value={amountGranted}
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.amountGranted}
                        />
                    ) : (
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
                    )}
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
        ) : (
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
                        label={'Interessedatum'}
                        id={'dateInterest'}
                        className={'col-sm-6 form-group'}
                        value={dateInterest && moment(dateInterest).format('L')}
                    />
                </div>
                <div className="row">
                    {projectTypeCodeRef === 'loan' ? (
                        <InputText
                            type={'number'}
                            label={'Bedrag inschrijving'}
                            id={'amountOption'}
                            name={'amountOption'}
                            value={amountOption}
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.amountOption}
                        />
                    ) : (
                        <InputText
                            type={'number'}
                            label={'Aantal inschrijving'}
                            id={'quantityOption'}
                            name={'quantityOption'}
                            value={quantityOption}
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.quantityOption}
                        />
                    )}
                    <InputDate
                        label={'Inschrijvingsdatum'}
                        name={'dateOption'}
                        value={dateOption}
                        onChangeAction={handleInputChangeDate}
                        required={'required'}
                        error={errors.dateOption}
                    />
                </div>
            </React.Fragment>
        )}
    </React.Fragment>
);

export default MutationFormEditStatusOption;
