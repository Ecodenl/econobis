import React, {Component} from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import moment from 'moment';
import validator from 'validator';

import PersonAPI from '../../../api/contact/PersonAPI';
import InputText from '../../../components/form/InputText';
import InputSelect from '../../../components/form/InputSelect';
import InputDate from '../../../components/form/InputDate';
import ButtonText from '../../../components/button/ButtonText';
import PanelFooter from "../../../components/panel/PanelFooter";
import InputToggle from "../../../components/form/InputToggle";
import PanelHeader from "../../../components/panel/PanelHeader";
import ContactNewFormAddress from "./ContactNewFormAddress";
import ContactNewFormEmail from "./ContactNewFormEmail";
import ContactNewFormPhone from "./ContactNewFormPhone";
import AddressAPI from "../../../api/contact/AddressAPI";
import ContactNewFormPersonalDuplicateModal from "./ContactNewFormPersonalDuplicateModal";

class ContactNewFormPersonal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            buttonLoading: false,
            showAddress: false,
            showEmail: false,
            showPhone: false,
            showConfirmDuplicate: false,
            duplicateText:  '',
            person: {
                id: '',
                number: '',
                createdAt: '',
                titleId: '',
                statusId: 'interested',
                initials: '',
                firstName: '',
                lastNamePrefixId: '',
                lastName: '',
                memberSince: '',
                memberUntil: '',
                typeId: '',
                dateOfBirth: '',
                newsletter: false,
                ownerId: props.userId,
                didAgreeAvg: false,
            },
            address: {
                street: '',
                number: '',
                addition: '',
                postalCode: '',
                city: '',
                typeId: 'visit',
                primary: true,
                countryId: 'NL',
            },
            emailAddress: {
                email: '',
                typeId: 'home',
                primary: true,
            },
            phoneNumber: {
                number: '',
                typeId: '',
                primary: true,
            },
            errors: {
                name: false,
            },
            addressErrors: {
                typeId: false,
                postalCode: false,
                number: false,
            },
            emailErrors: {
                typeId: false,
                email: false,
            },
            phoneErrors: {
                typeId: false,
                number: false,
            },
        }
    };

    toggleAddress = () => {
        this.setState({showAddress: !this.state.showAddress});
    };

    toggleEmail = () => {
        this.setState({showEmail: !this.state.showEmail});
    };

    togglePhone = () => {
        this.setState({showPhone: !this.state.showPhone});
    };

    toggleShowConfirmDuplicate = () => {
        this.setState(
            {
                showConfirmDuplicate: !this.state.showConfirmDuplicate,
                buttonLoading: false
            });
    };

    addressHandleInputPicoChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            address: {
                ...this.state.address,
                [name]: value
            },
        });
        setTimeout(() => {
            const {address} = this.state;
            if (!validator.isEmpty(address.postalCode) && validator.isPostalCode(address.postalCode, 'NL') && !validator.isEmpty(address.number) && validator.isEmpty(address.city) && validator.isEmpty(address.street)) {
                AddressAPI.getPicoAddress(address.postalCode, address.number).then((payload) => {
                    this.setState({
                        ...this.state,
                        address: {
                            ...this.state.address,
                            street: payload.street,
                            city: payload.city
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
                [name]: value
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
                [name]: value
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
                [name]: value
            },
        });
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            person: {
                ...this.state.person,
                [name]: value
            },
        });
    };

    handleChangeMemberSince = (date) => {
        const formattedDate = (date ? moment(date).format('Y-MM-DD') : '');

        this.setState({
            ...this.state,
            person: {
                ...this.state.person,
                memberSince: formattedDate
            },
        });
    };

    handleChangeDateOfBirth = (date) => {
        const formattedDate = (date ? moment(date).format('Y-MM-DD') : '');

        this.setState({
            ...this.state,
            person: {
                ...this.state.person,
                dateOfBirth: formattedDate
            },
        });
    };

    confirmDuplicate = () => {
        this.handleSubmit('dontCheckDuplicates')
    };

    handleSubmit = event => {
        let checkDuplicates = true;
        if(event === 'dontCheckDuplicates'){
            checkDuplicates = false;
        }
        else if(event) {
            event.preventDefault();
        }

        const {person} = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(person.firstName) && validator.isEmpty(person.lastName)) {
            errors.name = true;
            hasErrors = true;
        };

        const {address} = this.state;

        // Postalcode always to uppercase
        address.postalCode = address.postalCode.toUpperCase();

        let addressErrors = {};

        if (!validator.isEmpty(address.postalCode)) {
            if (!validator.isPostalCode(address.postalCode, 'any')) {
                addressErrors.postalCode = true;
                hasErrors = true;
            } ;

            if (validator.isEmpty(address.number)) {
                addressErrors.number = true;
                hasErrors = true;
            };

            if (validator.isEmpty(address.typeId)) {
                addressErrors.typeId = true;
                hasErrors = true;
            };

        }

        const {phoneNumber} = this.state;
        // Validation
        let phoneErrors = {};

        if (!validator.isEmpty(phoneNumber.number)) {
            if (validator.isEmpty(phoneNumber.number)) {
                phoneErrors.number = true;
                hasErrors = true;
            };
            if (validator.isEmpty(phoneNumber.typeId)) {
                phoneErrors.typeId = true;
                hasErrors = true;
            };
        }

        const {emailAddress} = this.state;

        let emailErrors = {};

        if (!validator.isEmpty(emailAddress.email)) {
            if (!validator.isEmail(emailAddress.email)) {
                emailErrors.email = true;
                hasErrors = true;
            };

            if (validator.isEmpty(emailAddress.typeId)) {
                emailErrors.typeId = true;
                hasErrors = true;
            };
        }

        this.setState({...this.state,
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
                buttonLoading: true
            });

            PersonAPI.newPerson({person, address, emailAddress, phoneNumber, checkDuplicates}).then((response) => {
                hashHistory.push(`/contact/${response.data.data.id}`);
            })
                .catch((error) => {
                    //409 conflict
                    if(error.response.status === 409){
                        this.setState({
                            ...this.state,
                            duplicateText: error.response.data.message
                        });
                        this.toggleShowConfirmDuplicate();
                    }
                });
            };
    };

    render() {
        const {typeId, statusId, titleId, initials, firstName, lastNamePrefixId, lastName, memberSince, dateOfBirth, newsletter, ownerId, didAgreeAvg} = this.state.person;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputText
                        label={"Contactnummer"}
                        name={"number"}
                        readOnly={true}
                        value={''}
                    />
                    <InputText
                        label={"Gemaakt op"}
                        name={"createdAt"}
                        value={moment().format('DD-MM-Y')}
                        readOnly={true}
                    />
                </div>

                <div className="row">
                    <InputSelect
                        label="Aanspreektitel"
                        name={"titleId"}
                        options={this.props.titles}
                        value={titleId}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputSelect
                        label={"Status"}
                        size={"col-sm-6"}
                        name={"statusId"}
                        divClassName={'field-to-be-removed'}
                        options={this.props.contactStatuses}
                        value={statusId}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputText
                        label="Voorletters"
                        size={"col-sm-6"}
                        name="initials"
                        value={initials}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputDate
                        label={"Lid sinds"}
                        name="memberSince"
                        value={memberSince}
                        onChangeAction={this.handleChangeMemberSince}
                    />
                </div>

                <div className="row">
                    <InputText
                        label="Voornaam"
                        size={"col-sm-6"}
                        name="firstName"
                        value={firstName}
                        onChangeAction={this.handleInputChange}
                        required={lastName === '' && "required"}
                        error={this.state.errors.name}
                    />
                    <InputText
                        label={"Opzegdatum"}
                        name={"memberUntil"}
                        value={''}
                        readOnly={true}
                    />
                </div>

                <div className="row">
                    <InputSelect
                        label="Tussenvoegsel"
                        name="lastNamePrefixId"
                        options={this.props.lastNamePrefixes}
                        value={lastNamePrefixId}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputSelect
                        label={"Soort contact"}
                        size={"col-sm-6"}
                        name={"typeId"}
                        divClassName={'field-to-be-removed'}
                        options={this.props.personTypes}
                        value={typeId}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputText
                        label={"Achternaam"}
                        size={"col-sm-6"}
                        name="lastName"
                        value={lastName}
                        onChangeAction={this.handleInputChange}
                        required={firstName === '' && "required"}
                        error={this.state.errors.name}
                    />
                    <InputDate
                        label={"Geboortedatum"}
                        name={"dateOfBirth"}
                        value={dateOfBirth}
                        onChangeAction={this.handleChangeDateOfBirth}
                    />
                </div>

                <div className="row">
                    <InputSelect
                        label={"Eigenaar"}
                        size={"col-sm-6"}
                        name={"ownerId"}
                        options={this.props.users}
                        value={ownerId}
                        optionName={"fullName"}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputToggle
                        label={"Nieuwsbrief"}
                        name={"newsletter"}
                        value={newsletter}
                        className={'field-to-be-removed'}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputToggle
                        label={"Akkoord privacybeleid"}
                        name={"didAgreeAvg"}
                        value={didAgreeAvg}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="margin-10-top">
                    <PanelHeader>
                        <div className="row" onClick={this.toggleAddress}>
                            {
                                this.state.showAddress ?
                                    <span className="glyphicon glyphicon-menu-down"/>
                                    :
                                    <span className="glyphicon glyphicon-menu-right"/>
                            }
                            <span className="h5">Adres</span>
                        </div>
                    </PanelHeader>
                    {
                        this.state.showAddress &&
                        <ContactNewFormAddress
                            address={this.state.address}
                            errors={this.state.addressErrors}
                            handleInputPicoChange={this.addressHandleInputPicoChange}
                            handleInputChange={this.addressHandleInputChange}

                        />
                    }
                </div>

                <div className="margin-10-top">
                    <PanelHeader>
                        <div className="row" onClick={this.toggleEmail}>
                            {
                                this.state.showEmail ?
                                    <span className="glyphicon glyphicon-menu-down"/>
                                    :
                                    <span className="glyphicon glyphicon-menu-right"/>
                            }
                            <span className="h5">E-mail</span>
                        </div>
                    </PanelHeader>
                    {
                        this.state.showEmail &&
                        <ContactNewFormEmail
                            emailAddress={this.state.emailAddress}
                            errors={this.state.emailErrors}
                            handleInputChange={this.emailAddressHandleInputChange}
                        />
                    }
                </div>

                <div className="margin-10-top">
                    <PanelHeader>
                        <div className="row" onClick={this.togglePhone}>
                            {
                                this.state.showPhone ?
                                    <span className="glyphicon glyphicon-menu-down"/>
                                    :
                                    <span className="glyphicon glyphicon-menu-right"/>
                            }
                            <span className="h5">Telefoonnummer</span>
                        </div>
                    </PanelHeader>
                    {
                        this.state.showPhone &&
                        <ContactNewFormPhone
                            phoneNumber={this.state.phoneNumber}
                            errors={this.state.phoneErrors}
                            handleInputChange={this.phoneHandleInputChange}
                        />
                    }
                </div>

                <PanelFooter>
                    <div className="pull-right btn-group" role="group">
                        <ButtonText loading={this.state.buttonLoading} loadText={"Persoon wordt aangemaakt."}
                                    buttonText={"Opslaan"} onClickAction={this.handleSubmit} type={"submit"}
                                    value={"Submit"}/>
                    </div>
                </PanelFooter>

                {this.state.showConfirmDuplicate &&
                    <ContactNewFormPersonalDuplicateModal
                    closeModal={this.toggleShowConfirmDuplicate}
                    confirmAction={this.confirmDuplicate}
                    duplicateText={this.state.duplicateText}
                    />
                }
            </form>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        lastNamePrefixes: state.systemData.lastNamePrefixes,
        personTypes: state.systemData.personTypes,
        contactStatuses: state.systemData.contactStatuses,
        occupations: state.systemData.occupations,
        users: state.systemData.users,
        titles: state.systemData.titles,
        userId: state.meDetails.id,
    };
};

export default connect(mapStateToProps)(ContactNewFormPersonal);
