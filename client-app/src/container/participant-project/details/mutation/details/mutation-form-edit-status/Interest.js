import React from 'react';
import ViewText from '../../../../../../components/form/ViewText';
import moment from 'moment';
import InputText from '../../../../../../components/form/InputText';
import InputDate from '../../../../../../components/form/InputDate';
import MoneyPresenter from '../../../../../../helpers/MoneyPresenter';

const MutationFormEditStatusInterest = ({
    originalStatus,
    statusId,
    quantityInterest,
    amountInterest,
    dateInterest,
    quantityOption,
    amountOption,
    dateOption,
    handleInputChange,
    handleInputChangeDate,
    handleBlurAmount,
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
                            value={MoneyPresenter(amountInterest)}
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
                            onBlurAction={handleBlurAmount}
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
        ) : (
            <div className="row">
                {projectTypeCodeRef === 'loan' ? (
                    <InputText
                        type={'number'}
                        label={'Bedrag interesse'}
                        id={'amountInterest'}
                        name={'amountInterest'}
                        value={amountInterest}
                        onChangeAction={handleInputChange}
                        onBlurAction={handleBlurAmount}
                        error={errors.amountInterest}
                    />
                ) : (
                    <InputText
                        type={'number'}
                        label={'Aantal interesse'}
                        id={'quantityInterest'}
                        name={'quantityInterest'}
                        value={quantityInterest}
                        onChangeAction={handleInputChange}
                    />
                )}
                <InputDate
                    label={'Interessedatum'}
                    name={'dateInterest'}
                    value={dateInterest}
                    onChangeAction={handleInputChangeDate}
                />
            </div>
        )}
    </React.Fragment>
);

export default MutationFormEditStatusInterest;
