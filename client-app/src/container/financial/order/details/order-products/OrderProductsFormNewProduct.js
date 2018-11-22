import React, {Component} from 'react';
import {connect} from 'react-redux';

import OrderDetailsAPI from '../../../../../api/order/OrderDetailsAPI';
import {fetchOrderDetails} from '../../../../../actions/order/OrderDetailsActions';
import InputText from '../../../../../components/form/InputText';
import ButtonText from '../../../../../components/button/ButtonText';
import InputSelect from "../../../../../components/form/InputSelect";
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import validator from "validator";
import InputDate from "../../../../../components/form/InputDate";
import moment from "moment/moment";
import InputReactSelect from "../../../../../components/form/InputReactSelect";

class OrderProductsFormNewProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            vatPercentages:[
                {'id':  '0', name: '0'},
                {'id':  '6', name: '6'},
                {'id':  '21', name: '21'},
            ],
            errorMessage: false,
            price: '0',
            totalPrice: '0',
            orderProduct: {
                orderId: this.props.orderDetails.id,
                amount: 1,
                amountReduction: 0,
                percentageReduction: 0,
                dateStart: moment().format('YYYY-MM-DD'),
                dateEnd: '',
                datePeriodStartFirstInvoice: moment().format('YYYY-MM-DD'),
            },
            product: {
                code: '',
                name: '',
                durationId: 'none',
                description: '',
                administrationId: this.props.orderDetails.administrationId,
                invoiceFrequencyId: this.props.orderDetails.collectionFrequencyId ? this.props.orderDetails.collectionFrequencyId : 'once',
                vatPercentage: '',
                price: '',
                administrationLedgerTwinfieldId: '',
                isOneTime: false
            },
            errors: {
                amount: false,
                dateStart: false,
                dateEnd: false,
                code: false,
                name: false,
                price: false,
                datePeriodStartFirstInvoice: false,
            },
        };

        this.handleReactSelectChange = this.handleReactSelectChange.bind(this);
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
        this.handleInputChangeStartDate = this.handleInputChangeStartDate.bind(this);
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
                ...this.state,
                orderProduct: {
                    ...this.state.orderProduct,
                    [name]: value
                },

            },
            this.updatePrice
        );

    };

    handleReactSelectChange(selectedOption, name) {
        this.setState({
            ...this.state,
            product: {
                ...this.state.product,
                [name]: selectedOption
            },
        });
    };

    handleInputChangeProduct = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
                ...this.state,
                product: {
                    ...this.state.product,
                    [name]: value
                },

            },
        );
    };

    handleInputChangeProductDuration = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let dateEnd;

        if(this.state.orderProduct.dateStart) {
            switch (value) {
                case 'none':
                    dateEnd = '';
                    break;
                case 'month':
                    dateEnd = moment(this.state.orderProduct.dateStart).add(1, 'M').format('YYYY-MM-DD');
                    break;
                case 'quarter':
                    dateEnd = moment(this.state.orderProduct.dateStart).add(1, 'Q').format('YYYY-MM-DD');
                    break;
                case 'half_year':
                    dateEnd = moment(this.state.orderProduct.dateStart).add(6, 'M').format('YYYY-MM-DD');
                    break;
                case 'year':
                    dateEnd = moment(this.state.orderProduct.dateStart).add(1, 'y').format('YYYY-MM-DD');
                    break;
                case 'until_cancellation':
                    dateEnd = '';
                    break;
                default:
                    dateEnd = ''
            }
        }

        this.setState({
                ...this.state,
                product: {
                    ...this.state.product,
                    [name]: value
                },
                orderProduct: {
                    ...this.state.orderProduct,
                    dateEnd: dateEnd
                },
            },
        );
    };


    handleInputChangeProductPrice = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let price;

        if(this.state.vatPercentage && this.state.vatPercentage.id == '6'){
            price = value * 1.06
        }
        else if(this.state.vatPercentage && this.state.vatPercentage.id == '21'){
            price = value * 1.21;
        }
        else{
            price = value;
        }

        this.setState({
                ...this.state,
                price: price,
                product: {
                    ...this.state.product,
                    [name]: value
                },

            },
            this.updatePrice
        );
    };

    handleInputChangeProductVat = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let price;

        if(value == '6'){
            price = this.state.product.price * 1.06;
        }
        else if(value == '21'){
            price = this.state.product.price * 1.21;
        }
        else{
            price = this.state.product.price;
        }

        this.setState({
                ...this.state,
                price: price,
                product: {
                    ...this.state.product,
                    [name]: value
                },

            },
            this.updatePrice
        );
    };

    updatePrice = () => {
        let price = validator.isFloat(this.state.price + '') ? this.state.price : 0;
        let amount = validator.isFloat(this.state.orderProduct.amount + '') ? this.state.orderProduct.amount : 0;
        let percentageReduction = validator.isFloat(this.state.orderProduct.percentageReduction + '') ? this.state.orderProduct.percentageReduction : 0;
        let amountReduction = validator.isFloat(this.state.orderProduct.amountReduction + '') ? this.state.orderProduct.amountReduction : 0;

        let totalPrice = ((price * amount) * ((100 - percentageReduction) / 100)) - amountReduction;

        this.setState({
            ...this.state,
            price: parseFloat(price).toFixed(2),
            totalPrice: parseFloat(totalPrice).toFixed(2),
        });
    };

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            orderProduct: {
                ...this.state.orderProduct,
                [name]: value
            },
        });
    };

    handleInputChangeStartDate(value, name) {
        let dateEnd = '';

        if(this.state.orderProduct.dateStart){
            let durationId = this.state.product.durationId;

            switch (durationId) {
                case 'none':
                    dateEnd = '';
                    break;
                case 'month':
                    dateEnd = moment(value).add(1, 'M').format('YYYY-MM-DD');
                    break;
                case 'quarter':
                    dateEnd = moment(value).add(1, 'Q').format('YYYY-MM-DD');
                    break;
                case 'half_year':
                    dateEnd = moment(value).add(6, 'M').format('YYYY-MM-DD');
                    break;
                case 'year':
                    dateEnd = moment(value).add(1, 'y').format('YYYY-MM-DD');
                    break;
                case 'until_cancellation':
                    dateEnd = '';
                    break;
                default:
                    dateEnd = ''
            }
        }

        this.setState({
            ...this.state,
            orderProduct: {
                ...this.state.orderProduct,
                [name]: value,
                dateEnd: dateEnd
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const {orderProduct} = this.state;

        let errors = {};
        let hasErrors = false;
        let errorMessage = false;

        if (validator.isEmpty(orderProduct.amount + '')) {
            errors.amount = true;
            hasErrors = true;
        }

        if (validator.isEmpty(orderProduct.dateStart + '')) {
            errors.dateStart = true;
            hasErrors = true;
        }

        if (!validator.isEmpty(orderProduct.dateStart + '') && moment(orderProduct.dateEnd).isSameOrBefore(moment(orderProduct.dateStart))) {
            errors.dateEnd = true;
            hasErrors = true;
        }

        if (!validator.isEmpty(orderProduct.dateEnd + '') && moment(orderProduct.dateStart).isSameOrAfter(moment(orderProduct.dateEnd))) {
            errors.dateStart = true;
            hasErrors = true;
        }

        if (validator.isEmpty(orderProduct.datePeriodStartFirstInvoice + '')) {
            errors.datePeriodStartFirstInvoice = true;
            hasErrors = true;
        }

        const {product} = this.state;

        let productCodeNotUnique = false;
        this.props.products.map((existingProduct) => ((existingProduct.code == product.code) && (productCodeNotUnique = true)));

        if (productCodeNotUnique) {
            errorMessage = "Productcode moet uniek zijn.";
            errors.code = true;
            hasErrors = true;
        }

        if (validator.isEmpty(product.code + '')) {
            errors.code = true;
            hasErrors = true;
        }

        let productNameNotUnique = false;
        this.props.products.map((existingProduct) => ((existingProduct.name == product.name) && (productNameNotUnique = true)));

        if (productNameNotUnique) {
            errorMessage = "Productnaam moet uniek zijn.";
            errors.name = true;
            hasErrors = true;
        }

        if(productCodeNotUnique && productNameNotUnique){
            errorMessage = "Productcode en productnaam moeten uniek zijn.";
        }

        if (validator.isEmpty(product.name + '')) {
            errors.name = true;
            hasErrors = true;
        }

        if (validator.isEmpty(product.administrationId + '')) {
            errors.administrationId = true;
            hasErrors = true;
        }

        if (validator.isEmpty(product.price + '')) {
            errors.price = true;
            hasErrors = true;
        }

        this.setState({...this.state,
            errors: errors,
            errorMessage: errorMessage,
        });

        // If no errors send form
        !hasErrors &&
        OrderDetailsAPI.newProductAndOrderProduct(orderProduct, product).then((payload) => {
            this.props.fetchOrderDetails(orderProduct.orderId);
            this.props.toggleShowNewProduct();
        });
    };

    render() {

        const {amount, amountReduction, percentageReduction, dateStart, dateEnd, datePeriodStartFirstInvoice} = this.state.orderProduct;
        const {description, code, name, durationId, vatPercentage, price, administrationLedgerTwinfieldId } = this.state.product;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <div className={'panel-heading'}>
                                <span className={'h5 text-bold'}>Product</span>
                            </div>
                        </div>
                        <div className="row">
                            <InputText
                                label="Productcode"
                                name={"code"}
                                value={code}
                                onChangeAction={this.handleInputChangeProduct}
                                required={"required"}
                                error={this.state.errors.code}
                            />
                            <InputText
                                label="Naam"
                                name={"name"}
                                value={name}
                                onChangeAction={this.handleInputChangeProduct}
                                required={"required"}
                                error={this.state.errors.name}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label={"Prijs ex. BTW"}
                                id={"price"}
                                name={"price"}
                                type={"number"}
                                min={"0"}
                                max={"1000000"}
                                value={price}
                                onChangeAction={this.handleInputChangeProductPrice}
                                required={"required"}
                                error={this.state.errors.price}
                            />
                            <InputSelect
                                label={"BTW percentage"}
                                name={"vatPercentage"}
                                options={this.state.vatPercentages}
                                value={vatPercentage}
                                onChangeAction={this.handleInputChangeProductVat}
                                placeholder={"Geen"}
                            />
                        </div>

                        <div className="row">
                            <InputSelect
                                label={"Looptijd"}
                                id="durationId"
                                name={"durationId"}
                                options={this.props.productDurations}
                                value={durationId}
                                onChangeAction={this.handleInputChangeProductDuration}
                                emptyOption={false}
                            />
                            {this.props.orderDetails.administration.usesTwinfield == true && this.props.orderDetails.administration.twinfieldIsValid == true &&
                            <InputReactSelect
                                label={"Groetboek"}
                                name={"administrationLedgerTwinfieldId"}
                                options={this.props.orderDetails.administration.ledgers}
                                value={administrationLedgerTwinfieldId}
                                onChangeAction={this.handleReactSelectChange}
                                multi={false}
                            />
                            }
                        </div>

                        <div className="row">
                            <div className={'panel-part panel-heading'}>
                                <span className={'h5 text-bold'}>Orderregel</span>
                            </div>
                        </div>

                        <div className="row">
                            <InputText
                                label={"Omschrijving"}
                                id={"description"}
                                name={"description"}
                                value={description}
                                onChangeAction={this.handleInputChangeProduct}
                                required={"required"}
                                error={this.state.errors.description}
                            />
                            <InputText
                                label={"Aantal"}
                                type={'number'}
                                id={"amount"}
                                name={"amount"}
                                value={amount}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={this.state.errors.amount}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label={"Kortingspercentage"}
                                type={'number'}
                                id={"percentageReduction"}
                                name={"percentageReduction"}
                                value={percentageReduction}
                                onChangeAction={this.handleInputChange}
                            />
                            <InputText
                                label={"Bedrag"}
                                name={"price"}
                                value={'€' + this.state.price.toLocaleString('nl', {
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
                                onChangeAction={this.handleInputChange}
                            />
                            <InputText
                                label={"Totaalbedrag"}
                                name={"totalPrice"}
                                value={'€' + this.state.totalPrice.toLocaleString('nl', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}
                                readOnly={true}
                            />
                        </div>

                        <div className="row">
                            <InputDate
                                label="Begin datum"
                                name="dateStart"
                                value={dateStart}
                                onChangeAction={this.handleInputChangeStartDate}
                                required={"required"}
                                error={this.state.errors.dateStart}
                            />

                            <InputDate
                                label="Eind datum"
                                name="dateEnd"
                                value={dateEnd}
                                onChangeAction={this.handleInputChangeDate}
                                error={this.state.errors.dateEnd}
                                readOnly={durationId === 'none'}
                            />

                        </div>
                        {durationId !== 'none' &&
                        <div className="row">
                            <InputDate
                                label="1ste factuurperiode start op"
                                name="datePeriodStartFirstInvoice"
                                value={datePeriodStartFirstInvoice}
                                onChangeAction={this.handleInputChangeDate}
                                error={this.state.errors.datePeriodStartFirstInvoice}
                                required={"required"}
                            />
                        </div>
                        }
                        {this.state.errorMessage &&
                        <div className="col-sm-10 col-md-offset-1 alert alert-danger">
                            {this.state.errorMessage}
                        </div>
                        }

                        <div className="pull-right btn-group" role="group">
                            <ButtonText buttonClassName={"btn-default"} buttonText={"Annuleren"}
                                        onClickAction={this.props.toggleShowNewProduct}/>
                            <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit} type={"submit"}
                                        value={"Submit"}/>
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        orderDetails: state.orderDetails,
        productDurations: state.systemData.productDurations,
        productInvoiceFrequencies: state.systemData.productInvoiceFrequencies,
        productPaymentTypes: state.systemData.productPaymentTypes,
        products: state.systemData.products,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchOrderDetails: (id) => {
        dispatch(fetchOrderDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderProductsFormNewProduct);
