import React from 'react';

import InputText from '../../../../../components/form/InputText';
import ButtonText from '../../../../../components/button/ButtonText';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import InputDate from '../../../../../components/form/InputDate';
import moment from 'moment/moment';

moment.locale('nl');

const InvoiceProductsFormEdit = props => {
    const {
        product,
        description,
        amount,
        amountReduction,
        percentageReduction,
        dateLastInvoice,
        variablePrice,
    } = props.invoiceProduct;

    return (
        <div>
            <form className="form-horizontal" onSubmit={props.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label={'Notanummer'}
                                name={'invoice'}
                                value={props.invoiceDetails ? props.invoiceDetails.number : ''}
                                readOnly={true}
                            />
                            <InputText
                                label={'Product'}
                                name={'product'}
                                value={product ? product.name : ''}
                                readOnly={true}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label={'Omschrijving'}
                                id={'description'}
                                name={'description'}
                                value={description}
                                onChangeAction={props.handleInputChange}
                                required={'required'}
                                error={props.errors.description}
                            />
                            <InputText
                                label={'Aantal'}
                                type={'number'}
                                id={'amount'}
                                name={'amount'}
                                value={amount}
                                onChangeAction={props.handleInputChange}
                                required={'required'}
                                error={props.errors.amount}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label={'Kortingspercentage'}
                                type={'number'}
                                id={'percentageReduction'}
                                name={'percentageReduction'}
                                value={percentageReduction}
                                onChangeAction={props.handleInputChange}
                            />
                            {props.productVariablePrice ? (
                                <InputText
                                    label={'Prijs ex. BTW'}
                                    type={'number'}
                                    name={'variablePrice'}
                                    value={variablePrice}
                                    onChangeAction={props.handleInputChangeVariablePrice}
                                />
                            ) : (
                                <InputText
                                    label={'Prijs excl. BTW'}
                                    name={'price'}
                                    value={
                                        '€ ' +
                                        props.invoiceProduct.product.currentPrice.priceInclVat.toLocaleString('nl', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits:
                                                props.invoiceProduct.product.currentPrice.priceNumberOfDecimals,
                                        })
                                    }
                                    readOnly={true}
                                />
                            )}
                        </div>

                        <div className="row">
                            <InputText
                                label={'Kortingsbedrag'}
                                type={'number'}
                                id={'amountReduction'}
                                name={'amountReduction'}
                                value={amountReduction}
                                onChangeAction={props.handleInputChange}
                            />
                            <InputText
                                label={'Totaalbedrag'}
                                name={'totalPrice'}
                                value={
                                    '€ ' +
                                    props.totalPrice.toLocaleString('nl', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })
                                }
                                readOnly={true}
                            />
                        </div>

                        <div className="row">
                            <InputDate
                                label="Begin datum"
                                name="dateLastInvoice"
                                value={dateLastInvoice}
                                onChangeAction={props.handleInputChangeDate}
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

export default InvoiceProductsFormEdit;
