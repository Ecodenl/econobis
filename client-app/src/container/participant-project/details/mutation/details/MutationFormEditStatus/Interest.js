import React from 'react';
import ViewText from '../../../../../../components/form/ViewText';
import moment from 'moment';
import InputText from '../../../../../../components/form/InputText';
import InputDate from '../../../../../../components/form/InputDate';

const MutationFormEditStatusInterest = ({
    originalStatus,
    statusId,
    quantityInterest,
    dateInterest,
    quantityOption,
    dateOption,
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
            </React.Fragment>
        ) : (
            <div className="row">
                <InputText
                    type={'number'}
                    label={'Aantal interesse'}
                    id={'quantityInterest'}
                    name={'quantityInterest'}
                    value={quantityInterest}
                    onChangeAction={handleInputChange}
                />
                <InputDate
                    label={'Datum interesse'}
                    name={'dateInterest'}
                    value={dateInterest}
                    onChangeAction={handleInputChangeDate}
                />
            </div>
        )}
    </React.Fragment>
);

export default MutationFormEditStatusInterest;
