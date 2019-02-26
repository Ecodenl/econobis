import React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';

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
    statusId,
    dateCreation,
    datePayment,
    account,
    quantity,
    updatedAt,
    updatedBy,
    toggleShow,
    participantMutationStatuses,
    participantMutationTypes,
    errors,
    handleSubmit,
    handleInputChange,
    handleInputChangeDate,
    projectTypeCodeRef,
}) => {
    return (
        <form className="form-horizontal" onSubmit={handleSubmit}>
            <Panel className={'panel-grey'}>
                <PanelBody>
                    <div className="row">
                        <InputDate
                            label="Aanmaakdatum"
                            name="dateCreation"
                            value={dateCreation}
                            onChangeAction={handleInputChangeDate}
                            required={'required'}
                        />
                        {editForm ? (
                            <InputText label={'Type'} id={'type'} name={'type'} value={type.name} readOnly={true} />
                        ) : (
                            <InputSelect
                                label={'Type'}
                                id="typeId"
                                name={'typeId'}
                                options={participantMutationTypes}
                                value={typeId}
                                onChangeAction={handleInputChange}
                                required={'required'}
                                error={errors.typeId}
                            />
                        )}
                    </div>

                    <div className="row">
                        <InputSelect
                            label={'Status'}
                            id="statusId"
                            name={'statusId'}
                            options={participantMutationStatuses}
                            value={statusId}
                            onChangeAction={handleInputChange}
                        />
                        <InputDate
                            label="Betaal datum"
                            name="datePayment"
                            value={datePayment}
                            onChangeAction={handleInputChangeDate}
                        />
                    </div>

                    {projectTypeCodeRef === 'loan' && (
                        <React.Fragment>
                            <div className="row">
                                <InputText
                                    type={'number'}
                                    label={'Lening rekening'}
                                    id={'account'}
                                    name={'account'}
                                    value={account}
                                    onChangeAction={handleInputChange}
                                />
                            </div>
                        </React.Fragment>
                    )}

                    {projectTypeCodeRef === 'obligation' && (
                        <React.Fragment>
                            <div className="row">
                                <InputText
                                    type={'number'}
                                    label={'Obligaties'}
                                    id={'quantity'}
                                    name={'quantity'}
                                    value={quantity}
                                    onChangeAction={handleInputChange}
                                />
                            </div>
                        </React.Fragment>
                    )}

                    {projectTypeCodeRef === 'capital' && (
                        <React.Fragment>
                            <div className="row">
                                <InputText
                                    type={'number'}
                                    label={'Kapitaal rekening'}
                                    id={'account'}
                                    name={'account'}
                                    value={account}
                                    onChangeAction={handleInputChange}
                                />
                                <InputText
                                    type={'number'}
                                    label={'Participaties'}
                                    id={'quantity'}
                                    name={'quantity'}
                                    value={quantity}
                                    onChangeAction={handleInputChange}
                                />
                            </div>
                        </React.Fragment>
                    )}

                    {projectTypeCodeRef === 'postalcode_link_capital' && (
                        <React.Fragment>
                            <div className="row">
                                <InputText
                                    type={'number'}
                                    label={'Kapitaal rekening'}
                                    id={'account'}
                                    name={'account'}
                                    value={account}
                                    onChangeAction={handleInputChange}
                                />
                                <InputText
                                    type={'number'}
                                    label={'Participaties'}
                                    id={'quantity'}
                                    name={'quantity'}
                                    value={quantity}
                                    onChangeAction={handleInputChange}
                                />
                            </div>
                        </React.Fragment>
                    )}

                    {editForm && (
                        <div className="row">
                            <InputText
                                label={'Gewijzigd op'}
                                name={'updatedAt'}
                                value={updatedAt ? moment(updatedAt.date).format('L') : ''}
                                readOnly={true}
                            />
                            <InputText
                                label={'Gewijzigd door'}
                                name={'updatedBy'}
                                value={updatedBy ? updatedBy.fullName : ''}
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
    status: {},
    account: '',
    participantMutationStatuses: [],
    participantMutationTypes: [],
    updatedAt: {},
    updatedBy: {},
};

MutationFormDefault.propTypes = {
    editForm: PropTypes.bool,
    typeId: PropTypes.number.isRequired,
    type: PropTypes.object,
    statusId: PropTypes.number.isRequired,
    status: PropTypes.object,
    dateCreation: PropTypes.string.isRequired,
    datePayment: PropTypes.string.isRequired,
    account: PropTypes.number,
    quantity: PropTypes.number,
    updatedAt: PropTypes.object,
    updatedBy: PropTypes.object,
    toggleShow: PropTypes.func.isRequired,
    participantMutationStatuses: PropTypes.array,
    participantMutationTypes: PropTypes.array,
    errors: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleInputChangeDate: PropTypes.func.isRequired,
    projectTypeCodeRef: PropTypes.string.isRequired,
};

export default MutationFormDefault;
