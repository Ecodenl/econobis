import React from 'react';
import { connect } from 'react-redux';

import InputText from '../../../../../../components/form/InputText';
import ButtonText from '../../../../../../components/button/ButtonText';
import Panel from '../../../../../../components/panel/Panel';
import PanelBody from '../../../../../../components/panel/PanelBody';
import InputDate from '../../../../../../components/form/InputDate';
import moment from 'moment/moment';
moment.locale('nl');

const TransactionFormEdit = props => {
    const {
        type,
        dateTransaction,
        amount,
        iban,
        referral,
        entry,
        dateBooking,
        createdAt,
        createdBy,
    } = props.participantTransaction;

    return (
        <div>
            <form className="form-horizontal" onSubmit={props.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputText label={'Type'} id={'type'} name={'type'} value={type.name} readOnly={true} />
                            <InputDate
                                label="Transactie datum"
                                name="dateTransaction"
                                value={dateTransaction}
                                onChangeAction={props.handleInputChangeDate}
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
                                onChangeAction={props.handleInputChange}
                                required={'required'}
                                error={props.errors.amount}
                            />
                            <InputText
                                label={'IBAN'}
                                id={'iban'}
                                name={'iban'}
                                value={iban ? iban : ''}
                                onChangeAction={props.handleInputChange}
                                error={props.errors.iban}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label={'Kenmerk'}
                                id={'referral'}
                                name={'referral'}
                                value={referral ? referral : ''}
                                onChangeAction={props.handleInputChange}
                            />
                            <InputText
                                label={'Boekstuk'}
                                id={'entry'}
                                name={'entry'}
                                value={entry ? entry : ''}
                                onChangeAction={props.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputDate
                                label="Boek datum"
                                name="dateBooking"
                                value={dateBooking ? dateBooking : ''}
                                onChangeAction={props.handleInputChangeDate}
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
        participantTransactionTypes: state.systemData.participantTransactionTypes,
    };
};

export default connect(
    mapStateToProps,
    null
)(TransactionFormEdit);
