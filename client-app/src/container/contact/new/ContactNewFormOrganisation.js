import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import validator from 'validator';

import OrganisationAPI from '../../../api/contact/OrganisationAPI';
import InputText from '../../../components/form/InputText';
import InputSelect from '../../../components/form/InputSelect';
import ButtonText from '../../../components/button/ButtonText';
import PanelFooter from '../../../components/panel/PanelFooter';
import * as ibantools from 'ibantools';
import InputToggle from '../../../components/form/InputToggle';
import PanelHeader from '../../../components/panel/PanelHeader';
import ContactNewFormAddress from './ContactNewFormAddress';
import ContactNewFormEmail from './ContactNewFormEmail';
import ContactNewFormPhone from './ContactNewFormPhone';
import AddressAPI from '../../../api/contact/AddressAPI';
// import InputReactSelect from '../../../components/form/InputReactSelect';
import Icon from 'react-icons-kit';
import { angleRight } from 'react-icons-kit/fa/angleRight';
import { angleDown } from 'react-icons-kit/fa/angleDown';

// Functionele wrapper voor de class component
const ContactNewFormOrganisationWrapper = props => {
    const navigate = useNavigate();
    return <ContactNewFormOrganisation {...props} navigate={navigate} />;
};

class ContactNewFormOrganisation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            buttonLoading: false,
            showAddress: true,
            showEmail: true,
            showPhone: true,
            showConfirmDuplicate: false,
            duplicateText: '',
            organisation: {
                id: '',
                number: '',
                createdAt: '',
                name: '',
                statutoryName: '',
                chamberOfCommerceNumber: '',
                vatNumber: '',
                memberSince: '',
                memberUntil: '',
                website: '',
                iban: '',
                ibanAttn: '',
                ownerId: props.userId,
                didAgreeAvg: false,
                inspectionPersonTypeId: '',
            },
            address: {
                street: '',
                number: '',
                addition: '',
                postalCode: '',
                city: '',
                typeId: 'visit',
                endDate: '',
                primary: true,
                countryId: '',
            },
            emailAddress: {
                email: '',
                typeId: 'home',
                primary: true,
            },
            phoneNumber: {
                number: '',
                typeId: 'home',
                primary: true,
            },
            errors: {
                name: false,
                iban: false,
            },
            addressErrors: {
                typeId: false,
                endDate: false,
                postalCode: false,
                number: false,
                countryId: false,
            },
            emailErrors: {
                typeId: false,
                email: false,
            },
            phoneErrors: {
                typeId: false,
                number: false,
            },
        };
    }

    toggleAddress = () => {
        this.setState({ showAddress: !this.state.showAddress });
    };

    toggleEmail = () => {
        this.setState({ showEmail: !this.state.showEmail });
    };

    togglePhone = () => {
        this.setState({ showPhone: !this.state.showPhone });
    };

    addressHandleInputLvbagChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            address: {
                ...this.state.address,
                [name]: value,
            },
        });
        setTimeout(() => {
            const { address } = this.state;
            if (
                !validator.isEmpty(address.postalCode) &&
                validator.isPostalCode(address.postalCode, 'NL') &&
                !validator.isEmpty(address.number) &&
                validator.isEmpty(address.city) &&
                validator.isEmpty(address.street)
            ) {
                AddressAPI.getLvbagAddress(address.postalCode, address.number).then(payload => {
                    this.setState({
                        ...this.state,
                        address: {
                            ...this.state.address,
                            street: payload.street,
                            city: payload.city,
                        },
                    });
                });
            }
        }, 100);
    };

    addressHandleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            address: {
                ...this.state.address,
                [name]: value,
            },
        });
    };
    addressHandleInputChangeDate = (value, name) => {
        this.setState({
            ...this.state,
            address: {
                ...this.state.address,
                [name]: value,
            },
        });
    };

    emailAddressHandleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            emailAddress: {
                ...this.state.emailAddress,
                [name]: value,
            },
        });
    };

    phoneHandleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            phoneNumber: {
                ...this.state.phoneNumber,
                [name]: value,
            },
        });
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            organisation: {
                ...this.state.organisation,
                [name]: value,
            },
        });
    };

    handleInputChangeDate = (value, name) => {
        this.setState({
            ...this.state,
            organisation: {
                ...this.state.organisation,
                [name]: value,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { organisation } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(organisation.name)) {
            errors.name = true;
            hasErrors = true;
        }

        if (!validator.isEmpty(organisation.iban)) {
            if (!ibantools.isValidIBAN(organisation.iban)) {
                errors.iban = true;
                hasErrors = true;
            }
        }

        const { address } = this.state;

        // Postalcode always to uppercase
        if (address.postalCode) {
            address.postalCode = address.postalCode.toUpperCase();
        }

        let addressErrors = {};

        if (!validator.isEmpty(address.postalCode)) {
            let countryId = address.countryId;
            if (validator.isEmpty(address.countryId + '')) {
                countryId = 'NL';
            }

            let postalCodeValid = true;
            if (!validator.isEmpty(address.postalCode + '')) {
                if (countryId == 'NL') {
                    postalCodeValid = validator.isPostalCode(address.postalCode, 'NL');
                } else {
                    postalCodeValid = validator.isPostalCode(address.postalCode, 'any');
                }
                if (!postalCodeValid) {
                    addressErrors.postalCode = true;
                    addressErrors.countryId = true;
                    hasErrors = true;
                }
            }

            if (validator.isEmpty(address.number)) {
                addressErrors.number = true;
                hasErrors = true;
            }

            if (validator.isEmpty(address.typeId)) {
                addressErrors.typeId = true;
                hasErrors = true;
            }
        }

        const { phoneNumber } = this.state;
        // Validation
        let phoneErrors = {};

        if (!validator.isEmpty(phoneNumber.number)) {
            if (validator.isEmpty(phoneNumber.number)) {
                phoneErrors.number = true;
                hasErrors = true;
            }
            if (validator.isEmpty(phoneNumber.typeId)) {
                phoneErrors.typeId = true;
                hasErrors = true;
            }
        }

        const { emailAddress } = this.state;

        let emailErrors = {};

        if (!validator.isEmpty(emailAddress.email)) {
            if (!validator.isEmail(emailAddress.email)) {
                emailErrors.email = true;
                hasErrors = true;
            }

            if (validator.isEmpty(emailAddress.typeId)) {
                emailErrors.typeId = true;
                hasErrors = true;
            }
        }

        this.setState({
            ...this.state,
            errors: errors,
            addressErrors: addressErrors,
            phoneErrors: phoneErrors,
            emailErrors: emailErrors,
        });

        // If no errors send form
        if (!hasErrors) {
            if (this.state.buttonLoading) {
                return false;
            }
            this.setState({
                buttonLoading: true,
            });

            OrganisationAPI.newOrganisation({ organisation, address, emailAddress, phoneNumber })
                .then(response => {
                    this.props.navigate(`/contact/${response.data.data.id}`);
                })
                .catch(error => {
                    //409 conflict
                    if (error.response.status === 409) {
                        this.setState({
                            ...this.state,
                            duplicateText: error.response.data.message,
                        });
                        this.toggleShowConfirmDuplicate();
                    }
                });
        }
    };

    render() {
        const {
            name,
            statutoryName,
            chamberOfCommerceNumber,
            vatNumber,
            memberSince,
            website,
            iban,
            ibanAttn,
            ownerId,
            didAgreeAvg,
            inspectionPersonTypeId,
        } = this.state.organisation;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputText label={'Contactnummer'} name={'number'} readOnly={true} value={''} />
                    <InputText
                        label={'Gemaakt op'}
                        name={'createdAt'}
                        value={moment().format('DD-MM-Y')}
                        readOnly={true}
                    />
                </div>
                <div className="row">
                    <InputText
                        label="Naam"
                        name={'name'}
                        value={name}
                        onChangeAction={this.handleInputChange}
                        required={'required'}
                        error={this.state.errors.name}
                    />
                </div>
                <div className="row">
                    <InputText
                        label="Statutaire naam"
                        name={'statutoryName'}
                        value={statutoryName}
                        onChangeAction={this.handleInputChange}
                        error={this.state.errors.statutoryName}
                    />
                </div>
                <div className="row">
                    <InputText
                        label="KvK"
                        size={'col-sm-6'}
                        name="chamberOfCommerceNumber"
                        value={chamberOfCommerceNumber}
                        onChangeAction={this.handleInputChange}
                    />
                </div>
                <div className="row">
                    <InputText
                        label="Btw nummer"
                        name="vatNumber"
                        value={vatNumber}
                        onChangeAction={this.handleInputChange}
                    />
                </div>
                <div className="row">
                    <InputText
                        label="IBAN"
                        name="iban"
                        value={iban}
                        onChangeAction={this.handleInputChange}
                        error={this.state.errors.iban}
                    />
                </div>
                <div className="row">
                    <InputText
                        label="IBAN t.n.v."
                        name="ibanAttn"
                        value={ibanAttn}
                        onChangeAction={this.handleInputChange}
                    />
                </div>
                <div className="row">
                    <InputText
                        label={'Website'}
                        name={'website'}
                        value={website}
                        onChangeAction={this.handleInputChange}
                    />
                </div>
                <div className="row">
                    <InputSelect
                        label={'Eigenaar'}
                        size={'col-sm-6'}
                        name={'ownerId'}
                        options={this.props.users}
                        value={ownerId}
                        optionName={'fullName'}
                        onChangeAction={this.handleInputChange}
                    />
                </div>
                <div className="row">
                    <InputToggle
                        label={'Akkoord privacybeleid'}
                        name={'didAgreeAvg'}
                        value={didAgreeAvg}
                        onChangeAction={this.handleInputChange}
                    />
                </div>
                {/* vooralsnog alleen bij persons, organisations kunnen al gekoppeld worden aan kansactie */}
                {/*<div className="row">*/} {/*<InputReactSelect*/}
                {/*    label={'Rol in buurtaanpak'}*/}
                {/*    divSize={'col-sm-6'}*/}
                {/*    name={'inspectionPersonTypeId'}*/}
                {/*    options={this.props.inspectionPersonTypes}*/}
                {/*    value={inspectionPersonTypeId}*/}
                {/*    onChangeAction={this.handleReactSelectChange}*/}
                {/*    clearable={true}*/}
                {/*/>*/}
                {/*</div>*/}
                <div className="margin-10-top">
                    <PanelHeader>
                        <div className="row" onClick={this.toggleAddress}>
                            {this.state.showAddress ? (
                                <Icon size={21} icon={angleDown} />
                            ) : (
                                <Icon size={21} icon={angleRight} />
                            )}
                            <span className="h5">Adres</span>
                        </div>
                    </PanelHeader>
                    {this.state.showAddress && (
                        <ContactNewFormAddress
                            address={this.state.address}
                            errors={this.state.addressErrors}
                            handleInputLvbagChange={this.addressHandleInputLvbagChange}
                            handleInputChange={this.addressHandleInputChange}
                            handleInputChangeDate={this.addressHandleInputChangeDate}
                        />
                    )}
                </div>
                <div className="margin-10-top">
                    <PanelHeader>
                        <div className="row" onClick={this.toggleEmail}>
                            {this.state.showEmail ? (
                                <Icon size={21} icon={angleDown} />
                            ) : (
                                <Icon size={21} icon={angleRight} />
                            )}
                            <span className="h5">E-mail</span>
                        </div>
                    </PanelHeader>
                    {this.state.showEmail && (
                        <ContactNewFormEmail
                            emailAddress={this.state.emailAddress}
                            errors={this.state.emailErrors}
                            handleInputChange={this.emailAddressHandleInputChange}
                        />
                    )}
                </div>
                <div className="margin-10-top">
                    <PanelHeader>
                        <div className="row" onClick={this.togglePhone}>
                            {this.state.showPhone ? (
                                <Icon size={21} icon={angleDown} />
                            ) : (
                                <Icon size={21} icon={angleRight} />
                            )}
                            <span className="h5">Telefoonnummer</span>
                        </div>
                    </PanelHeader>
                    {this.state.showPhone && (
                        <ContactNewFormPhone
                            phoneNumber={this.state.phoneNumber}
                            errors={this.state.phoneErrors}
                            handleInputChange={this.phoneHandleInputChange}
                        />
                    )}
                </div>
                <PanelFooter>
                    <div className="pull-right btn-group" role="group">
                        <ButtonText
                            loading={this.state.buttonLoading}
                            loadText={'Organisatie wordt aangemaakt.'}
                            buttonText={'Opslaan'}
                            onClickAction={this.handleSubmit}
                            type={'submit'}
                            value={'Submit'}
                        />
                    </div>
                </PanelFooter>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.systemData.users,
        userId: state.meDetails.id,
    };
};

export default connect(mapStateToProps)(ContactNewFormOrganisationWrapper);
