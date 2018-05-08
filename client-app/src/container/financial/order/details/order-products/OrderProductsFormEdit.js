import React from 'react';

import InputText from '../../../../../components/form/InputText';
import ButtonText from '../../../../../components/button/ButtonText';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import InputDate from "../../../../../components/form/InputDate";
import moment from "moment/moment";

moment.locale('nl');

const OrderProductsFormEdit = props => {
    const {product, description, amount, amountReduction, percentageReduction, dateStart, dateEnd} = props.orderProduct;

    return (
        <div>
            <form className="form-horizontal" onSubmit={props.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label={"Order nummer"}
                                name={"order"}
                                value={props.orderDetails ? props.orderDetails.number : ''}
                                readOnly={true}
                            />
                            <InputText
                                label={"Product"}
                                name={"product"}
                                value={product ? product.name : ''}
                                readOnly={true}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label={"Omschrijving"}
                                id={"description"}
                                name={"description"}
                                value={description}
                                onChangeAction={props.handleInputChange}
                                required={"required"}
                                error={props.errors.description}
                            />
                            <InputText
                                label={"Aantal"}
                                type={'number'}
                                id={"amount"}
                                name={"amount"}
                                value={amount}
                                onChangeAction={props.handleInputChange}
                                required={"required"}
                                error={props.errors.amount}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label={"Kortingspercentage"}
                                type={'number'}
                                id={"percentageReduction"}
                                name={"percentageReduction"}
                                value={percentageReduction}
                                onChangeAction={props.handleInputChange}
                            />
                            <InputText
                                label={"Bedrag"}
                                name={"price"}
                                value={'€' + props.orderProduct.product.priceInclVat.toLocaleString('nl', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}
                                readOnly={true}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label={"Kortingsbedrag"}
                                type={'number'}
                                id={"amountReduction"}
                                name={"amountReduction"}
                                value={amountReduction}
                                onChangeAction={props.handleInputChange}
                            />
                            <InputText
                                label={"Totaalbedrag"}
                                name={"totalPrice"}
                                value={'€' + props.totalPrice.toLocaleString('nl', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}
                                readOnly={true}
                            />
                        </div>

                        <div className="row">
                            <InputDate
                                label="Datum in"
                                name="dateStart"
                                value={dateStart}
                                onChangeAction={props.handleInputChangeDate}
                                required={"required"}
                                error={props.errors.dateStart}
                            />
                            <InputDate
                                label="Datum uit"
                                name="dateEnd"
                                value={dateEnd}
                                onChangeAction={props.handleInputChangeDate}
                            />
                        </div>

                        <div className="pull-right btn-group" role="group">
                            <ButtonText buttonClassName={"btn-default"} buttonText={"Annuleren"} onClickAction={props.cancelEdit}/>
                            <ButtonText buttonText={"Opslaan"} onClickAction={props.handleSubmit} type={"submit"} value={"Submit"}/>
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        </div>
    );
};

export default OrderProductsFormEdit;
