import React from 'react';
import { connect } from 'react-redux';

import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import InputDate from '../../../../components/form/InputDate';
import moment from 'moment/moment';
import InputToggle from '../../../../components/form/InputToggle';
import InputReactSelect from '../../../../components/form/InputReactSelect';
moment.locale('nl');

const ContactDetailsFormOccupationsEdit = props => {
    const {
        primaryContactId,
        contactId,
        occupationId,
        startDate,
        endDate,
        primary,
        allowManageInPortal,
    } = props.occupation;

    return (
        <div>
            <form className="form-horizontal" onSubmit={props.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            {props.primaryOccupation ? (
                                <InputReactSelect
                                    label={'Verbonden met'}
                                    name={'contactId'}
                                    options={props.contacts}
                                    value={contactId}
                                    onChangeAction={props.handleReactSelectChange}
                                    optionName={'fullName'}
                                    isLoading={props.peekLoading.contacts}
                                />
                            ) : (
                                <InputReactSelect
                                    label={'Verbonden met'}
                                    name={'primaryContactId'}
                                    options={props.contacts}
                                    value={primaryContactId}
                                    onChangeAction={props.handleReactSelectChange}
                                    optionName={'fullName'}
                                    isLoading={props.peekLoading.contacts}
                                />
                            )}
                            <InputSelect
                                label={'Rol'}
                                size={'col-sm-6'}
                                name={'occupationId'}
                                optionName={'primaryOccupation'}
                                options={props.occupations}
                                value={occupationId}
                                onChangeAction={props.handleInputChange}
                                required={'required'}
                                error={props.occupationIdError}
                            />
                        </div>

                        <div className="row">
                            <InputDate
                                label={'Begindatum'}
                                size={'col-sm-6'}
                                name={'startDate'}
                                value={startDate}
                                onChangeAction={props.handleStartDate}
                            />
                            <InputDate
                                label={'Einddatum'}
                                size={'col-sm-6'}
                                name={'endDate'}
                                value={endDate}
                                onChangeAction={props.handleEndDate}
                            />
                        </div>

                        <div className="row">
                            <InputToggle
                                label={'Primair'}
                                name={'primary'}
                                value={primary}
                                onChangeAction={props.handleInputChangePrimary}
                            />
                            <InputToggle
                                label={'Beheer in portaal'}
                                name={'allowManageInPortal'}
                                value={allowManageInPortal}
                                onChangeAction={props.handleInputChange}
                            />
                        </div>

                        <div className="pull-right btn-group" role="group">
                            <ButtonText
                                buttonClassName={'btn-default'}
                                buttonText={'Annuleren'}
                                onClickAction={props.cancelEdit}
                            />
                            <ButtonText
                                buttonText={'Opslaan'}
                                onClickAction={props.handleSubmit}
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
        occupations: state.systemData.occupations,
    };
};

export default connect(mapStateToProps, null)(ContactDetailsFormOccupationsEdit);
