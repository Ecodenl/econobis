import React, {Component} from 'react';
import { hashHistory } from 'react-router';
import validator from 'validator';
import * as ibantools from "ibantools";

import InputText from '../../../components/form/InputText';
import ButtonText from '../../../components/button/ButtonText';
import PanelBody from "../../../components/panel/PanelBody";
import Panel from "../../../components/panel/Panel";
import AdministrationDetailsAPI from '../../../api/administration/AdministrationDetailsAPI';
import {connect} from "react-redux";
import InputSelect from "../../../components/form/InputSelect";
import AdministrationLogoNew from "./AdministrationLogoNew";

class AdministrationNewForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newLogo: false,
            administration: {
                name: '',
                administrationNumber: '',
                address: '',
                postalCode: '',
                city: '',
                countryId: 'NL',
                kvkNumber: '',
                btwNumber: '',
                IBAN: '',
                email: '',
                website: '',
                bic: '',
                sepaContractName: '',
                sepaCreditorId: '',
                rsinNumber: '',
                defaultPaymentTerm: '',
                attachment: ''
            },
            errors: {
                name: false,
                postalCode: false,
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

    addAttachment(file) {
        this.setState({
            ...this.state,
            administration: {
                ...this.state.administration,
                attachment: [
                    ...this.state.administration.attachment,
                    ...file,
                ]
            },
        });
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            administration: {
                ...this.state.administration,
                [name]: value
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { administration }  = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty(administration.name)){
            errors.name = true;
            hasErrors = true;
        };

        if(!validator.isEmpty(administration.postalCode) && !validator.isPostalCode(administration.postalCode, 'any')){
            errors.postalCode = true;
            hasErrors = true;
        };

        if(validator.isEmpty(administration.btwNumber)){
            errors.btwNumber = true;
            hasErrors = true;
        };

        if(!validator.isEmpty(administration.IBAN)){
            if (!ibantools.isValidIBAN(administration.IBAN)) {
                errors.IBAN = true;
                hasErrors = true;
            }
        }

        if(!validator.isEmpty(administration.email)){
            if (!validator.isEmail(administration.email)) {
                errors.email = true;
                hasErrors = true;
            }
        }

        if(!validator.isEmpty(administration.website)){
            if (!validator.isFQDN(administration.website)) {
                errors.website = true;
                hasErrors = true;
            }
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
        AdministrationDetailsAPI.newAdministration(administration).then((payload) => {
                hashHistory.push(`/administratie/${payload.data.data.id}`);
            }).catch(function (error) {
                console.log(error)
            });
    };

    render() {
        const { name, administrationNumber, address, postalCode, city, countryId, kvkNumber, btwNumber, IBAN, email, website, bic, sepaContractName, sepaCreditorId, rsinNumber, defaultPaymentTerm} = this.state.administration;

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
                                name={"administrationNumber"}
                                value={administrationNumber}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label="Adres"
                                name={"Address"}
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
                                label="BTW nummer"
                                name={"btwNumber"}
                                value={btwNumber}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.btwNumber}
                            />
                            <InputText
                                label="IBAN"
                                name={"IBAN"}
                                value={IBAN}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.IBAN}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label="E-mail"
                                name={"email"}
                                value={email}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.email}
                            />
                            <InputText
                                label="Website"
                                name={"website"}
                                value={website}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.website}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label="Bic"
                                name={"bic"}
                                value={bic}
                                onChangeAction={this.handleInputChange}
                            />
                            <InputText
                                label="Sepa contractnaam"
                                name={"sepaContractName"}
                                value={sepaContractName}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label="Sepa crediteur id"
                                name={"sepaCreditorId"}
                                value={sepaCreditorId}
                                onChangeAction={this.handleInputChange}
                            />
                            <InputText
                                label="RSIN nummer"
                                name={"rsinNumber"}
                                value={rsinNumber}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label="Standaard betalingstermijn(dagen)"
                                type={"number"}
                                min={0}
                                max={9999}
                                name={"defaultPaymentTerm"}
                                value={defaultPaymentTerm}
                                onChangeAction={this.handleInputChange}
                            />
                            <div onClick={this.toggleNewLogo}>
                                <InputText
                                    label="Logo op factuur"
                                    readOnly={true}
                                    value={'test'}
                                    name={'attachment'}
                                />
                            </div>
                        </div>

                        {this.state.newLogo &&
                        <AdministrationLogoNew toggleShowNew={this.toggleNewLogo}
                                               addAttachment={this.props.addAttachment}/>
                        }
                    </PanelBody>

                    <PanelBody>
                        <div className="pull-right btn-group" role="group">
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
    };
};

export default connect(mapStateToProps)(AdministrationNewForm);
