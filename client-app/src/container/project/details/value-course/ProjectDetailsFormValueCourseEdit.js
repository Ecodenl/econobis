import React from 'react';
import { connect } from 'react-redux';

import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import InputDate from '../../../../components/form/InputDate';
import moment from 'moment/moment';
import InputToggle from '../../../../components/form/InputToggle';

const ProjectDetailsFormValueCourseEdit = ({
    valueCourse,
    handleInputChangeDate,
    handleInputChange,
    handleSubmit,
    cancelEdit,
    errors,
    projectType,
    isSaving,
}) => {
    const { project, date, bookWorth, transferWorth, active, createdAt, createdBy } = valueCourse;

    return (
        <form className="form-horizontal" onSubmit={handleSubmit}>
            <Panel className={'panel-grey'}>
                <PanelBody>
                    <div className="row">
                        <InputText
                            label={'Project'}
                            id={'project'}
                            name={'project'}
                            value={project ? project.name : ''}
                            readOnly={true}
                        />

                        <InputDate
                            label={'Datum'}
                            id="date"
                            name={'date'}
                            value={date}
                            onChangeAction={handleInputChangeDate}
                            required={'required'}
                            error={errors.date}
                        />
                    </div>

                    <div className="row">
                        <InputText
                            type={'number'}
                            label={projectType.codeRef !== 'obligation' ? 'Boekwaarde' : 'Hoofdsom'}
                            id={'bookWorth'}
                            name={'bookWorth'}
                            value={bookWorth}
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.bookWorth}
                        />
                        <InputText
                            type={'number'}
                            label={'Overdrachtswaarde'}
                            id={'transferWorth'}
                            name={'transferWorth'}
                            value={transferWorth ? transferWorth : ''}
                            onChangeAction={handleInputChange}
                            error={errors.transferWorth}
                        />
                    </div>

                    <div className="row">
                        <InputToggle
                            label={'Actief'}
                            name={'active'}
                            value={active}
                            onChangeAction={handleInputChange}
                        />
                    </div>

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

                    <div className="pull-right btn-group" role="group">
                        <ButtonText
                            buttonClassName={'btn-default'}
                            buttonText={'Annuleren'}
                            onClickAction={cancelEdit}
                        />
                        <ButtonText
                            buttonText={'Opslaan'}
                            onClickAction={handleSubmit}
                            type={'submit'}
                            value={'Submit'}
                            loading={isSaving}
                        />
                    </div>
                </PanelBody>
            </Panel>
        </form>
    );
};

const mapStateToProps = state => {
    return {
        phoneNumberTypes: state.systemData.phoneNumberTypes,
        projectType: state.projectDetails.projectType,
    };
};

export default connect(
    mapStateToProps,
    null
)(ProjectDetailsFormValueCourseEdit);
