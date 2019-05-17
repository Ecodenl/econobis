import React from 'react';
import ViewText from '../../../../../../components/form/ViewText';
import moment from 'moment';
import InputText from '../../../../../../components/form/InputText';
import InputDate from '../../../../../../components/form/InputDate';

const MutationFormEditStatusOption = ({
    originalStatus,
    statusId,
    quantityInterest,
    dateInterest,
    quantityOption,
    dateOption,
    quantityGranted,
    dateGranted,
    handleInputChange,
    handleInputChangeDate,
    errors,
}) => (
    <React.Fragment>
        {originalStatus.id !== Number(statusId) ? (
            <React.Fragment>
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
        ) : (
            <React.Fragment>
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
                        label={'Datum optie'}
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
