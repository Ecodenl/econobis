import React from 'react';

import InputText from '../../../../../components/form/InputText';
import ButtonText from '../../../../../components/button/ButtonText';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import InputDate from '../../../../../components/form/InputDate';
import moment from 'moment/moment';

moment.locale('nl');

const InvoicePaymentsFormEdit = props => {
    const { amount, datePaid, paymentReference } = props.payment;

    return (
        <div>
            <form className="form-horizontal" onSubmit={props.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label={'Bedrag'}
                                id={'amount'}
                                name={'amount'}
                                value={amount}
                                onChangeAction={props.handleInputChange}
                                required={'required'}
                                error={props.errors.amount}
                            />
                            <InputDate
                                label="Datum betaald"
                                name="datePaid"
                                value={datePaid}
                                onChangeAction={props.handleInputChangeDate}
                                required={'required'}
                                error={props.errors.datePaid}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="Betalingskenmerk"
                                name="paymentReference"
                                value={paymentReference}
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

export default InvoicePaymentsFormEdit;
