import React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import InputDate from '../../../../components/form/InputDate';
import { connect } from 'react-redux';

const MutationFormDefault = ({
    editForm,
    typeId,
    type,
    dateCreation,
    entry,
    datePayment,
    description,
    account,
    quantity,
    returns,
    payoutKwh,
    indicationOfRestitutionEnergyTax,
    paidOn,
    createdAt,
    createdBy,
    toggleShow,
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
                        <InputText
                            label={'Boekstuk'}
                            id={'entry'}
                            name={'entry'}
                            value={entry}
                            onChangeAction={handleInputChange}
                        />
                    </div>

                    <div className="row">
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
                                    label={'Omschrijving'}
                                    id={'description'}
                                    name={'description'}
                                    value={description}
                                    onChangeAction={handleInputChange}
                                />
                                <InputText
                                    type={'number'}
                                    label={'Lening rekening'}
                                    id={'account'}
                                    name={'account'}
                                    value={account}
                                    onChangeAction={handleInputChange}
                                />
                            </div>
                            <div className="row">
                                <InputText
                                    label={'Opbrengst'}
                                    id={'returns'}
                                    name={'returns'}
                                    value={returns}
                                    onChangeAction={handleInputChange}
                                />
                                <InputText
                                    label={'Uitgekeerd op of via'}
                                    id={'paidOn'}
                                    name={'paidOn'}
                                    value={paidOn}
                                    onChangeAction={handleInputChange}
                                />
                            </div>
                        </React.Fragment>
                    )}

                    {projectTypeCodeRef === 'obligation' && (
                        <React.Fragment>
                            <div className="row">
                                <InputText
                                    label={'Omschrijving'}
                                    id={'description'}
                                    name={'description'}
                                    value={description}
                                    onChangeAction={handleInputChange}
                                />
                                <InputText
                                    type={'number'}
                                    label={'Obligaties'}
                                    id={'quantity'}
                                    name={'quantity'}
                                    value={quantity}
                                    onChangeAction={handleInputChange}
                                />
                            </div>
                            <div className="row">
                                <InputText
                                    label={'Opbrengst'}
                                    id={'returns'}
                                    name={'returns'}
                                    value={returns}
                                    onChangeAction={handleInputChange}
                                />
                                <InputText
                                    label={'Uitgekeerd op of via'}
                                    id={'paidOn'}
                                    name={'paidOn'}
                                    value={paidOn}
                                    onChangeAction={handleInputChange}
                                />
                            </div>
                        </React.Fragment>
                    )}

                    {projectTypeCodeRef === 'capital' && (
                        <React.Fragment>
                            <div className="row">
                                <InputText
                                    label={'Omschrijving'}
                                    id={'description'}
                                    name={'description'}
                                    value={description}
                                    onChangeAction={handleInputChange}
                                />
                                <InputText
                                    type={'number'}
                                    label={'Kapitaal rekening'}
                                    id={'account'}
                                    name={'account'}
                                    value={account}
                                    onChangeAction={handleInputChange}
                                />
                            </div>
                            <div className="row">
                                <InputText
                                    type={'number'}
                                    label={'Participaties'}
                                    id={'quantity'}
                                    name={'quantity'}
                                    value={quantity}
                                    onChangeAction={handleInputChange}
                                />
                                <InputText
                                    label={'Opbrengst'}
                                    id={'returns'}
                                    name={'returns'}
                                    value={returns}
                                    onChangeAction={handleInputChange}
                                />
                            </div>
                            <div className="row">
                                <InputText
                                    label={'Uitgekeerd op of via'}
                                    id={'paidOn'}
                                    name={'paidOn'}
                                    value={paidOn}
                                    onChangeAction={handleInputChange}
                                />
                            </div>
                        </React.Fragment>
                    )}

                    {projectTypeCodeRef === 'postalcode_link_capital' && (
                        <React.Fragment>
                            <div className="row">
                                <InputText
                                    label={'Omschrijving'}
                                    id={'description'}
                                    name={'description'}
                                    value={description}
                                    onChangeAction={handleInputChange}
                                />
                                <InputText
                                    type={'number'}
                                    label={'Kapitaal rekening'}
                                    id={'account'}
                                    name={'account'}
                                    value={account}
                                    onChangeAction={handleInputChange}
                                />
                            </div>
                            <div className="row">
                                <InputText
                                    type={'number'}
                                    label={'Participaties'}
                                    id={'quantity'}
                                    name={'quantity'}
                                    value={quantity}
                                    onChangeAction={handleInputChange}
                                />
                                <InputText
                                    label={'Opbrengst'}
                                    id={'returns'}
                                    name={'returns'}
                                    value={returns}
                                    onChangeAction={handleInputChange}
                                />
                            </div>
                            <div className="row">
                                <InputText
                                    type={'number'}
                                    label={'kWh'}
                                    id={'payoutKwh'}
                                    name={'payoutKwh'}
                                    value={payoutKwh}
                                    onChangeAction={handleInputChange}
                                />
                                <InputText
                                    label={'Indicatie teruggave EB €'}
                                    id={'indicationOfRestitutionEnergyTax'}
                                    name={'indicationOfRestitutionEnergyTax'}
                                    value={indicationOfRestitutionEnergyTax}
                                    onChangeAction={handleInputChange}
                                />
                            </div>
                            <div className="row">
                                <InputText
                                    label={'Uitgekeerd op of via'}
                                    id={'paidOn'}
                                    name={'paidOn'}
                                    value={paidOn}
                                    onChangeAction={handleInputChange}
                                />
                            </div>
                        </React.Fragment>
                    )}

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
    account: '',
    payoutKwh: '',
    indicationOfRestitutionEnergyTax: '',
    participantMutationTypes: [],
    createdAt: {},
    createdBy: {},
};

MutationFormDefault.propTypes = {
    editForm: PropTypes.bool,
    typeId: PropTypes.number.isRequired,
    type: PropTypes.object,
    dateCreation: PropTypes.string.isRequired,
    entry: PropTypes.string.isRequired,
    datePayment: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    account: PropTypes.number,
    quantity: PropTypes.number,
    returns: PropTypes.number.isRequired,
    payoutKwh: PropTypes.number,
    indicationOfRestitutionEnergyTax: PropTypes.number,
    paidOn: PropTypes.string.isRequired,
    createdAt: PropTypes.object.isRequired,
    createdBy: PropTypes.object.isRequired,
    toggleShow: PropTypes.func.isRequired,
    participantMutationTypes: PropTypes.array,
    errors: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleInputChangeDate: PropTypes.func.isRequired,
    projectTypeCodeRef: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
    return {
        projectTypeCodeRef: state.participantProjectDetails.project.projectType.codeRef,
    };
};

export default connect(
    mapStateToProps,
    null
)(MutationFormDefault);
