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
    statusId,
    status,
    dateCreation,
    datePayment,
    account,
    quantity,
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
                            options={[
                                { id: 1, name: 'Interesse' },
                                { id: 2, name: 'Aangevraagd' },
                                { id: 3, name: 'Toegekend' },
                                { id: 4, name: 'Definitief' },
                            ]}
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
    status: {},
    account: '',
    participantMutationTypes: [],
    createdAt: {},
    createdBy: {},
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
