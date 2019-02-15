import React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import InputDate from '../../../../components/form/InputDate';

const MutationFormDefault = ({
    editForm,
    typeId,
    type,
    dateMutation,
    amount,
    iban,
    referral,
    entry,
    dateBooking,
    createdAt,
    createdBy,
    toggleShow,
    participantMutationTypes,
    errors,
    handleSubmit,
    handleInputChange,
    handleInputChangeDate,
}) => {
    return (
        <form className="form-horizontal" onSubmit={handleSubmit}>
            <Panel className={'panel-grey'}>
                <PanelBody>
                    <div className="row">
                        {editForm ? (
                            <InputText label={'Type'} id={'type'} name={'type'} value={type.name} readOnly={true} />
                        ) : (
                            <InputSelect
                                label={'Soort'}
                                id="typeId"
                                name={'typeId'}
                                options={participantMutationTypes}
                                value={typeId}
                                onChangeAction={handleInputChange}
                                required={'required'}
                                error={errors.typeId}
                            />
                        )}
                        <InputDate
                            label="Transactie datum"
                            name="dateMutation"
                            value={dateMutation}
                            onChangeAction={handleInputChangeDate}
                            required={'required'}
                        />
                    </div>

                    <div className="row">
                        <InputText
                            type={'number'}
                            label={'Bedrag'}
                            id={'amount'}
                            name={'amount'}
                            value={amount}
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.amount}
                        />
                        <InputText
                            label={'IBAN'}
                            id={'iban'}
                            name={'iban'}
                            value={iban}
                            onChangeAction={handleInputChange}
                            error={errors.iban}
                        />
                    </div>

                    <div className="row">
                        <InputText
                            label={'Kenmerk'}
                            id={'referral'}
                            name={'referral'}
                            value={referral}
                            onChangeAction={handleInputChange}
                        />
                        <InputText
                            label={'Boekstuk'}
                            id={'entry'}
                            name={'entry'}
                            value={entry}
                            onChangeAction={handleInputChange}
                        />
                    </div>

                    <div className="row">
                        <InputDate
                            label="Boek datum"
                            name="dateBooking"
                            value={dateBooking}
                            onChangeAction={handleInputChangeDate}
                        />
                    </div>

                    {editForm && (
                        <div className="row">
                            <InputText
                                label={'Gemaakt op'}
                                name={'createdAt'}
                                value={createdAt ? moment(createdAt.date).format('L') : ''}
                                readOnly={true}
                            />
                            <InputText
                                label={'Gemaakt door'}
                                name={'createdBy'}
                                value={createdBy ? createdBy.fullName : ''}
                                readOnly={true}
                            />
                        </div>
                    )}

                    <div className="pull-right btn-group" role="group">
                        <ButtonText
                            buttonClassName={'btn-default'}
                            buttonText={'Annuleren'}
                            onClickAction={toggleShow}
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
    );
};

MutationFormDefault.defaultProps = {
    editForm: false,
    type: {},
    createdAt: {},
    createdBy: {},
};

MutationFormDefault.propTypes = {
    editForm: PropTypes.bool,
    typeId: PropTypes.number.isRequired,
    type: PropTypes.object,
    dateMutation: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    iban: PropTypes.string.isRequired,
    referral: PropTypes.string.isRequired,
    entry: PropTypes.string.isRequired,
    dateBooking: PropTypes.string.isRequired,
    createdAt: PropTypes.object.isRequired,
    createdBy: PropTypes.object.isRequired,
    toggleShow: PropTypes.func.isRequired,
    participantMutationTypes: PropTypes.array.isRequired,
    errors: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleInputChangeDate: PropTypes.func.isRequired,
};

export default MutationFormDefault;
