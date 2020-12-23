import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import { addProductPriceHistory } from '../../../../actions/product/ProductDetailsActions';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import InputDate from '../../../../components/form/InputDate';
import InputToggle from '../../../../components/form/InputToggle';

class PriceHistoryNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            priceHistory: {
                productId: props.productId,
                dateStart: '',
                inputInclVat: false,
                priceNumberOfDecimals: 2,
                price: '',
                priceInclVat: '',
                vatPercentage: props.ledger ? props.ledger.vatCode && props.ledger.vatCode.percentage : null,
                hasVariablePrice: props.hasVariablePrice === 'variable',
            },
            errors: {
                dateStart: false,
                priceNumberOfDecimals: false,
                price: false,
                priceInclVat: false,
            },
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState(
            {
                ...this.state,
                priceHistory: {
                    ...this.state.priceHistory,
                    [name]: value,
                },
            },
            this.updatePrice
        );
    };

    handleInputChangeDate = (value, name) => {
        this.setState({
            ...this.state,
            priceHistory: {
                ...this.state.priceHistory,
                [name]: value,
            },
        });
    };

    handleBlurProductPrice = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            priceHistory: {
                ...this.state.priceHistory,
                [name]: parseFloat(value).toFixed(this.state.priceHistory.priceNumberOfDecimals),
            },
        });
    };

    handleBlurDecimals = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let priceNumberOfDecimals = value;

        if(priceNumberOfDecimals < 2){
            priceNumberOfDecimals = 2;
        }
        if(priceNumberOfDecimals > 6){
            priceNumberOfDecimals = 6;
        }

        this.setState(
            {
                ...this.state,
                priceHistory: {
                    ...this.state.priceHistory,
                    priceNumberOfDecimals: priceNumberOfDecimals,
                    price: parseFloat(this.state.priceHistory.price).toFixed(priceNumberOfDecimals),
                    priceInclVat: parseFloat(this.state.priceHistory.priceInclVat).toFixed(priceNumberOfDecimals),

                },
            },
            this.updatePrice
        );
    };

    updatePrice = () => {
        let inputInclVat = this.state.priceHistory.inputInclVat ? this.state.priceHistory.inputInclVat : false;
        let price = validator.isFloat(this.state.priceHistory.price + '') ? this.state.priceHistory.price : 0;
        let priceInclVat = validator.isFloat(this.state.priceHistory.priceInclVat + '')
            ? this.state.priceHistory.priceInclVat
            : 0;
        let vatPercentage = validator.isFloat(this.state.priceHistory.vatPercentage + '')
            ? this.state.priceHistory.vatPercentage
            : 0;
        const vatFactor = (parseFloat(100) + parseFloat(vatPercentage)) / 100;

        if (inputInclVat) {
            price = priceInclVat / vatFactor;
            this.setState({
                ...this.state,
                priceHistory: {
                    ...this.state.priceHistory,
                    price: parseFloat(price).toFixed(this.state.priceHistory.priceNumberOfDecimals),
                },
            });
        } else {
            priceInclVat = price * vatFactor;
            this.setState({
                ...this.state,
                priceHistory: {
                    ...this.state.priceHistory,
                    priceInclVat: parseFloat(priceInclVat).toFixed(this.state.priceHistory.priceNumberOfDecimals),
                },
            });
        }
    };

    handleSubmit(event) {
        event.preventDefault();

        const { priceHistory } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(priceHistory.dateStart)) {
            errors.dateStart = true;
            hasErrors = true;
        }

        if (!priceHistory.hasVariablePrice) {
            if (!priceHistory.inputInclVat) {
                if (validator.isEmpty(priceHistory.price)) {
                    errors.price = true;
                    hasErrors = true;
                }
            } else {
                if (validator.isEmpty(priceHistory.priceInclVat)) {
                    errors.priceInclVat = true;
                    hasErrors = true;
                }
            }
        }

        this.setState({ ...this.state, errors: errors });

        if (!hasErrors) {
            this.props.addProductPriceHistory(priceHistory);
            this.props.toggleShowNew();
        }
    }

    render() {
        const {
            dateStart,
            inputInclVat,
            priceNumberOfDecimals,
            price,
            priceInclVat,
            vatPercentage,
            hasVariablePrice,
        } = this.state.priceHistory;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        {this.props.hasVariablePrice === 'none' && (
                            <div className={'row'}>
                                <InputToggle
                                    label={'Variabele prijs'}
                                    name={'hasVariablePrice'}
                                    value={hasVariablePrice}
                                    onChangeAction={this.handleInputChange}
                                />
                            </div>
                        )}

                        <div className="row">
                            <InputText
                                label={'Productcode'}
                                id={'code'}
                                name={'code'}
                                value={this.props.productCode}
                                readOnly={true}
                            />
                            <InputText
                                label={'Product'}
                                id={'name'}
                                name={'name'}
                                value={this.props.productName}
                                readOnly={true}
                            />
                        </div>

                        <div className="row">
                            <InputDate
                                label="Startdatum"
                                name="dateStart"
                                value={dateStart}
                                onChangeAction={this.handleInputChangeDate}
                                required={'required'}
                                error={this.state.errors.dateStart}
                            />
                            <InputSelect
                                label={'BTW percentage'}
                                name={'vatPercentage'}
                                options={this.props.vatCodes}
                                optionValue={'percentage'}
                                optionName={'description'}
                                value={vatPercentage}
                                onChangeAction={this.props.usesTwinfield ? null : this.handleInputChange}
                                placeholder={'Geen'}
                                readOnly={this.props.usesTwinfield}
                            />
                        </div>

                        <div className="row">
                            <InputToggle
                                label={'Invoer inclusief BTW'}
                                name={'inputInclVat'}
                                value={inputInclVat}
                                onChangeAction={this.handleInputChange}
                            />
                            <InputText
                                label={'Aantal decimalen'}
                                type="number"
                                min={'2'}
                                max={'6'}
                                name={'priceNumberOfDecimals'}
                                value={priceNumberOfDecimals}
                                onChangeAction={this.handleInputChange}
                                onBlurAction={this.handleBlurDecimals}
                                required={'required'}
                                error={this.state.errors.priceNumberOfDecimals}
                            />
                        </div>

                        <div className="row">
                            {this.props.hasVariablePrice === 'variable' || hasVariablePrice ? (
                                <React.Fragment>
                                    <InputText
                                        label={'Prijs excl. BTW'}
                                        id={'price'}
                                        name={'price'}
                                        value={'Variabel'}
                                        readOnly={true}
                                        required={'required'}
                                    />
                                    <InputText
                                        label={'Prijs incl. BTW'}
                                        id={'priceInclVat'}
                                        name={'priceInclVat'}
                                        value={'Variabel'}
                                        readOnly={true}
                                        required={'required'}
                                    />
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    {inputInclVat ? (
                                        <React.Fragment>
                                            <InputText
                                                label={'Prijs excl. BTW'}
                                                id={'price'}
                                                name={'price'}
                                                value={price}
                                                readOnly={true}
                                                required={'required'}
                                            />
                                            <InputText
                                                label={'Prijs incl. BTW'}
                                                id={'priceInclVat'}
                                                name={'priceInclVat'}
                                                type={'number'}
                                                min={'0'}
                                                max={'1000000'}
                                                value={priceInclVat}
                                                onChangeAction={this.handleInputChange}
                                                onBlurAction={this.handleBlurProductPrice}
                                                required={'required'}
                                                error={this.state.errors.priceInclVat}
                                            />
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            <InputText
                                                label={'Prijs excl. BTW'}
                                                id={'price'}
                                                name={'price'}
                                                type={'number'}
                                                min={'0'}
                                                max={'1000000'}
                                                value={price}
                                                onChangeAction={this.handleInputChange}
                                                onBlurAction={this.handleBlurProductPrice}
                                                required={'required'}
                                                error={this.state.errors.price}
                                            />
                                            <InputText
                                                label={'Prijs incl. BTW'}
                                                id={'priceInclVat'}
                                                name={'priceInclVat'}
                                                value={priceInclVat}
                                                readOnly={true}
                                                required={'required'}
                                            />
                                        </React.Fragment>
                                    )}
                                </React.Fragment>
                            )}
                        </div>

                        <div className="pull-right btn-group" role="group">
                            <ButtonText
                                buttonClassName={'btn-default'}
                                buttonText={'Annuleren'}
                                onClickAction={this.props.toggleShowNew}
                            />
                            <ButtonText
                                buttonText={'Opslaan'}
                                onClickAction={this.handleSubmit}
                                type={'submit'}
                                value={'Submit'}
                            />
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        productId: state.productDetails.id,
        productName: state.productDetails.name,
        productCode: state.productDetails.code,
        hasVariablePrice: state.productDetails.hasVariablePrice,
        ledger: state.productDetails.ledger,
        users: state.systemData.users,
        vatCodes: state.systemData.vatCodes,
        usesTwinfield: state.systemData.usesTwinfield,
    };
};

const mapDispatchToProps = dispatch => ({
    addProductPriceHistory: priceHistory => {
        dispatch(addProductPriceHistory(priceHistory));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PriceHistoryNew);
