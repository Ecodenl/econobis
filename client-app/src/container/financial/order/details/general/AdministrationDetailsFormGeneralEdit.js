import React, {Component} from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import { updateOrder } from '../../../../actions/order/OrderDetailsActions';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import Panel from "../../../../components/panel/Panel";
import PanelBody from "../../../../components/panel/PanelBody";
import * as ibantools from "ibantools/build/ibantools";
import OrderLogoNew from "../../new/OrderLogoNew";
import InputSelect from "../../../../components/form/InputSelect";

class OrderDetailsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        const { id, name, orderNumber, address, postalCode, city, countryId, kvkNumber, btwNumber, IBAN, email, website, bic, sepaContractName,
            sepaCreditorId, rsinNumber, defaultPaymentTerm, logoName} = props.orderDetails;

        this.state = {
            newLogo: false,
            order: {
                id,
                name: name ? name : '',
                orderNumber: orderNumber ? orderNumber : '',
                address: address ? address : '',
                postalCode: postalCode ? postalCode : '',
                city: city ? city : '',
                countryId: countryId ? countryId : '',
                kvkNumber: kvkNumber ? kvkNumber : '',
                btwNumber: btwNumber ? btwNumber : '',
                IBAN: IBAN ? IBAN : '',
                email: email ? email : '',
                website: website ? website : '',
                bic: bic ? bic : '',
                sepaContractName: sepaContractName ? sepaContractName : '',
                sepaCreditorId: sepaCreditorId ? sepaCreditorId : '',
                rsinNumber: rsinNumber ? rsinNumber : '',
                defaultPaymentTerm: defaultPaymentTerm ? defaultPaymentTerm : '',
                logoName: logoName ? logoName : '',
                attachment: ''
            },
            errors: {
                name: false,
                postalCode: false,
                kvkNumber: false,
                btwNumber: false,
                IBAN: false,
                email: false,
                website: false,
            },
        };
    };

    toggleNewLogo = () => {
        this.setState({
            newLogo: !this.state.newLogo,
        })
    };

    addAttachment = (file) =>  {
        this.setState({
            ...this.state,
            order: {
                ...this.state.order,
                attachment: file[0],
                filename: file[0].name,
            },
        });
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            order: {
                ...this.state.order,
                [name]: value
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const {order} = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(order.name + '')) {
            errors.name = true;
            hasErrors = true;
        }


        if (!validator.isEmpty(order.postalCode + '') && !validator.isPostalCode(order.postalCode + '', 'any')) {
            errors.postalCode = true;
            hasErrors = true;
        }

        if (!validator.isEmpty(order.kvkNumber + '')) {
            if (!validator.isInt(order.kvkNumber + '')) {
                errors.kvkNumber = true;
                hasErrors = true;
            }
        }

        if (validator.isEmpty(order.btwNumber + '')) {
            errors.btwNumber = true;
            hasErrors = true;
        }

        if (!ibantools.isValidIBAN(order.IBAN + '')) {
            errors.IBAN = true;
            hasErrors = true;
        }

        if (!validator.isEmpty(order.email + '')) {
            if (!validator.isEmail(order.email + '')) {
                errors.email = true;
                hasErrors = true;
            }
        }

        if (!validator.isEmpty(order.website + '')) {
            if (!validator.isFQDN(order.website + '')) {
                errors.website = true;
                hasErrors = true;
            }
        }

        this.setState({...this.state, errors: errors});

        // If no errors send form
        if(!hasErrors) {
            const data = new FormData();

            data.append('id', order.id);
            data.append('name', order.name);
            data.append('orderNumber', order.orderNumber);
            data.append('address', order.address);
            data.append('postalCode', order.postalCode);
            data.append('city', order.city);
            data.append('countryId', order.countryId);
            data.append('kvkNumber', order.kvkNumber);
            data.append('btwNumber', order.btwNumber);
            data.append('IBAN', order.IBAN);
            data.append('email', order.email);
            data.append('website', order.website);
            data.append('bic', order.bic);
            data.append('sepaContractName', order.sepaContractName);
            data.append('sepaCreditorId', order.sepaCreditorId);
            data.append('rsinNumber', order.rsinNumber);
            data.append('defaultPaymentTerm', order.defaultPaymentTerm);
            data.append('attachment', order.attachment);

            this.props.updateOrder(data, order.id, this.props.switchToView);
        }
    };

    render() {
        const { name, orderNumber, address, postalCode, city, countryId, kvkNumber, btwNumber, IBAN, email, website, bic, sepaContractName,
            sepaCreditorId, rsinNumber, defaultPaymentTerm, attachment, logoName} = this.state.order;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label="Naam"
                                name={"name"}
                                value={name}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={this.state.errors.name}
                            />
                            <InputText
                                label="Administratie nummer"
                                name={"orderNumber"}
                                value={orderNumber}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label="Adres"
                                name={"address"}
                                value={address}
                                onChangeAction={this.handleInputChange}
                            />
                            <InputText
                                label="Postcode"
                                name={"postalCode"}
                                value={postalCode}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.postalCode}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label="Plaats"
                                name={"city"}
                                value={city}
                                onChangeAction={this.handleInputChange}
                            />
                            <InputSelect
                                label={"Land"}
                                id="countryId"
                                size={"col-sm-6"}
                                name={"countryId"}
                                options={this.props.countries}
                                value={countryId}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label="KvK"
                                name={"kvkNumber"}
                                value={kvkNumber}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.kvkNumber}
                            />
                            <InputText
                                label="BTW nummer"
                                name={"btwNumber"}
                                value={btwNumber}
                                required={"required"}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.btwNumber}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label="IBAN"
                                name={"IBAN"}
                                value={IBAN}
                                required={"required"}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.IBAN}
                            />
                            <InputText
                                label="E-mail"
                                name={"email"}
                                value={email}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.email}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label="Website"
                                name={"website"}
                                value={website}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.website}
                            />
                            <InputText
                                label="Bic"
                                name={"bic"}
                                value={bic}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label="Sepa contractnaam"
                                name={"sepaContractName"}
                                value={sepaContractName}
                                onChangeAction={this.handleInputChange}
                            />
                            <InputText
                                label="Sepa crediteur id"
                                name={"sepaCreditorId"}
                                value={sepaCreditorId}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label="RSIN nummer"
                                name={"rsinNumber"}
                                value={rsinNumber}
                                onChangeAction={this.handleInputChange}
                            />
                            <InputText
                                label="Standaard betalingstermijn(dagen)"
                                type={"number"}
                                min={'0'}
                                max={'9999'}
                                name={"defaultPaymentTerm"}
                                value={defaultPaymentTerm}
                                onChangeAction={this.handleInputChange}
                            />

                        </div>

                        <div className="row">
                            <div className="form-group col-sm-6">
                                <label className="col-sm-6">Kies logo</label>
                                <div className="col-sm-6">
                                    <input
                                        type="text"
                                        className="form-control input-sm col-sm-6"
                                        value={attachment ? attachment.name : logoName }
                                        onClick={this.toggleNewLogo}
                                    />
                                </div>
                            </div>
                        </div>

                        {this.state.newLogo &&
                        <OrderLogoNew toggleShowNew={this.toggleNewLogo}
                                               addAttachment={this.addAttachment}/>
                        }
                    </PanelBody>

                    <PanelBody>
                        <div className="pull-right btn-group" role="group">
                            <ButtonText buttonClassName={"btn-default"} buttonText={"Sluiten"} onClickAction={this.props.switchToView}/>
                            <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit} type={"submit"} value={"Submit"}/>
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        countries: state.systemData.countries,
        orderDetails: state.orderDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    updateOrder: (order, orderId, switchToView) => {
        dispatch(updateOrder(order, orderId, switchToView));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailsFormGeneralEdit);
