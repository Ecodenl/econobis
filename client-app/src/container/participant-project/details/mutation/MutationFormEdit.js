import React from 'react';
import moment from 'moment/moment';
moment.locale('nl');
import { connect } from 'react-redux';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import InputDate from '../../../../components/form/InputDate';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import ViewText from '../../../../components/form/ViewText';

const MutationFormEdit = ({
    participantMutation,
    errors,
    handleSubmit,
    handleInputChange,
    handleInputChangeDate,
    projectTypeCodeRef,
    cancelEdit,
}) => {
    const {
        type,
        dateCreation,
        status,
        quantityInterest,
        dateInterest,
        quantityOption,
        dateOption,
        quantityGranted,
        dateGranted,
        quantityFinal,
        dateFinal,
        datePayment,
        amount,
        quantity,
        returns,
        updatedAt,
        updatedBy,
    } = participantMutation;

    return (
        <div>
            <form className="form-horizontal" onSubmit={handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <ViewText label={'Type'} id={'type'} className={'col-sm-6 form-group'} value={type.name} />
                            <ViewText
                                label={'Huidige status'}
                                id={'status'}
                                className={'col-sm-6 form-group'}
                                value={status.name}
                            />
                        </div>

                        <div className="row">
                            <ViewText label={'Bedrag'} id={'amount'} className={'col-sm-6 form-group'} value={0} />
                        </div>

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

                        {status.codeRef === 'interest' && (
                            <div className="row">
                                <InputText
                                    type={'number'}
                                    label={'Aantal optie'}
                                    id={'quantityOption'}
                                    name={'quantityOption'}
                                    value={quantityOption}
                                    onChangeAction={handleInputChange}
                                    required={true}
                                />
                                <InputDate
                                    label={'Optiedatum'}
                                    name={'dateOption'}
                                    value={dateOption}
                                    onChangeAction={handleInputChangeDate}
                                    required={true}
                                />
                            </div>
                        )}

                        {status.codeRef === 'option' && (
                            <div className="row">
                                <ViewText label={'Aantal optie'} id={'quantityOption'} value={quantityOption} />
                                <ViewText
                                    label={'Optiedatum'}
                                    name={'dateOption'}
                                    value={dateOption}
                                    onChangeAction={handleInputChangeDate}
                                    required={true}
                                />
                            </div>
                        )}

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
                            />
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        projectTypeCodeRef: state.participantProjectDetails.project.projectType.codeRef,
    };
};

export default connect(mapStateToProps)(MutationFormEdit);
