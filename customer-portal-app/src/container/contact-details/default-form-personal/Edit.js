import React from 'react';
import InputText from '../../../components/form/InputText';
import { Field } from 'formik';
import Select from '../../../components/form/Select';
import Countries from '../../../data/Countries';
import Titles from '../../../data/Titles';
import LastNamePrefixes from '../../../data/LastNamePrefixes';
import Col from 'react-bootstrap/Col';
import FormLabel from 'react-bootstrap/FormLabel';
import Row from 'react-bootstrap/Row';
import TextBlock from '../../../components/general/TextBlock';
import moment from 'moment';
import InputDate from '../../../components/form/InputDate';

const DefaultContactPersonalEdit = function({ handleSubmit, initialContact, touched, errors, values, setFieldValue }) {
    return (
        <Row>
            <Col xs={12} md={6}>
                <FormLabel className={'field-label'}>Contactnummer</FormLabel>
                <Row>
                    <TextBlock className={'col-12 col-sm-8'}>{values.number}</TextBlock>
                </Row>

                <FormLabel className={'field-label'}>Naam</FormLabel>
                <Row>
                    <Col xs={12} sm={6}>
                        <Field
                            name="person.titleId"
                            render={({ field }) => (
                                <Select field={field} id="title_id" placeholder={'Aanhef'} options={Titles} />
                            )}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={8}>
                        <Field
                            name="person.firstName"
                            render={({ field }) => <InputText field={field} id="first_name" placeholder={'Voornaam'} />}
                        />
                    </Col>
                    <Col xs={12} sm={4}>
                        <Field
                            name="person.initials"
                            render={({ field }) => <InputText field={field} id="initials" placeholder={'Initialen'} />}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={4}>
                        <Field
                            name="person.lastNamePrefixId"
                            render={({ field }) => (
                                <Select
                                    field={field}
                                    id="last_name_prefix_id"
                                    options={LastNamePrefixes}
                                    placeholder={'Tussenvoegsel'}
                                />
                            )}
                        />
                    </Col>
                    <Col xs={12} sm={8}>
                        <Field
                            name="person.lastName"
                            render={({ field }) => (
                                <InputText
                                    field={field}
                                    error={
                                        touched.person &&
                                        touched.person.lastName &&
                                        (errors.person && errors.person.lastName)
                                    }
                                    id="last_name"
                                    placeholder={'Achternaam'}
                                />
                            )}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={6}>
                        <Field
                            name="person.dateOfBirth"
                            render={({ field }) => (
                                <InputDate
                                    {...field}
                                    onChangeAction={setFieldValue}
                                    id="last_name"
                                    placeholder={'Geboortedatum'}
                                />
                            )}
                        />
                    </Col>
                </Row>

                <FormLabel htmlFor="email-correspondence" className={'field-label'}>
                    E-mailadres correspondentie
                </FormLabel>
                <Row>
                    <Col xs={12} sm={12} md={8}>
                        <Field
                            name="emailCorrespondence.email"
                            render={({ field }) => (
                                <InputText
                                    field={field}
                                    error={
                                        touched.emailCorrespondence &&
                                        touched.emailCorrespondence.email &&
                                        (errors.emailCorrespondence && errors.emailCorrespondence.email)
                                    }
                                    id="email-correspondence"
                                    placeholder={'E-mail'}
                                />
                            )}
                        />
                    </Col>
                </Row>

                <FormLabel htmlFor="email-invoice" className="field-label">
                    E-mailadres factuur
                </FormLabel>
                <Row>
                    <Col xs={12} sm={12} md={8}>
                        <Field
                            name="emailInvoice.email"
                            render={({ field }) => (
                                <InputText
                                    field={field}
                                    error={
                                        touched.emailInvoice &&
                                        touched.emailInvoice.email &&
                                        (errors.emailInvoice && errors.emailInvoice.email)
                                    }
                                    id="email-invoice"
                                    placeholder={'E-mail'}
                                />
                            )}
                        />
                    </Col>
                </Row>

                <FormLabel htmlFor="telephone-number-1" className={'field-label'}>
                    Telefoonnummer 1
                </FormLabel>
                <Row>
                    <Col xs={12} sm={10} md={6}>
                        <Field
                            name="phoneNumberPrimary.number"
                            render={({ field }) => (
                                <InputText
                                    field={field}
                                    error={
                                        touched.phoneNumberPrimary &&
                                        touched.phoneNumberPrimary.number &&
                                        (errors.phoneNumberPrimary && errors.phoneNumberPrimary.number)
                                    }
                                    id="telephone-number-1"
                                    placeholder={'Nummer'}
                                />
                            )}
                        />
                    </Col>
                </Row>

                <FormLabel htmlFor="telephone-number-2" className={'field-label'}>
                    Telefoonnummer 2
                </FormLabel>
                <Row>
                    <Col xs={12} sm={10} md={6}>
                        <Field
                            name="phoneNumberTwo.number"
                            render={({ field }) => (
                                <InputText field={field} id="telephone-number-2" placeholder={'Nummer'} />
                            )}
                        />
                    </Col>
                </Row>

                <FormLabel htmlFor="street" className="field-label">
                    Adres
                </FormLabel>
                <Row>
                    <Col xs={12} sm={12}>
                        <Field
                            name="primaryAddress.street"
                            render={({ field }) => (
                                <InputText
                                    field={field}
                                    error={
                                        touched.primaryAddress &&
                                        touched.primaryAddress.street &&
                                        (errors.primaryAddress && errors.primaryAddress.street)
                                    }
                                    id="street"
                                    placeholder={'Straat'}
                                />
                            )}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} sm={4}>
                        <Field
                            name="primaryAddress.number"
                            render={({ field }) => (
                                <InputText
                                    field={field}
                                    error={
                                        touched.primaryAddress &&
                                        touched.primaryAddress.number &&
                                        (errors.primaryAddress && errors.primaryAddress.number)
                                    }
                                    id="street_number"
                                    placeholder={'Nummer'}
                                />
                            )}
                        />
                    </Col>
                    <Col xs={12} sm={4}>
                        <Field
                            name="primaryAddress.addition"
                            render={({ field }) => <InputText field={field} id="addition" placeholder={'Toevoeging'} />}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={4}>
                        <Field
                            name="primaryAddress.postalCode"
                            render={({ field }) => (
                                <InputText
                                    field={field}
                                    error={
                                        touched.primaryAddress &&
                                        touched.primaryAddress.postalCode &&
                                        (errors.primaryAddress && errors.primaryAddress.postalCode)
                                    }
                                    id="postal_code"
                                    placeholder={'Postcode'}
                                />
                            )}
                        />
                    </Col>
                    <Col xs={12} sm={8}>
                        <Field
                            name="primaryAddress.city"
                            render={({ field }) => (
                                <InputText
                                    field={field}
                                    error={
                                        touched.primaryAddress &&
                                        touched.primaryAddress.city &&
                                        (errors.primaryAddress && errors.primaryAddress.city)
                                    }
                                    id="city"
                                    placeholder={'Plaats'}
                                />
                            )}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={8}>
                        <Field
                            name="primaryAddress.countryId"
                            render={({ field }) => (
                                <Select
                                    field={field}
                                    error={
                                        touched.primaryAddress &&
                                        touched.primaryAddress.countryId &&
                                        (errors.primaryAddress && errors.primaryAddress.countryId)
                                    }
                                    id="country_id"
                                    placeholder={'Selecteer uw land'}
                                    options={Countries}
                                />
                            )}
                        />
                    </Col>
                </Row>
            </Col>

            <Col xs={12} md={6}>
                <FormLabel htmlFor="iban" className="field-label">
                    Rekeningnummer
                </FormLabel>
                <Row>
                    <Col xs={12} sm={8}>
                        <Field
                            name="iban"
                            render={({ field }) => (
                                <InputText field={field} id="iban" placeholder={'Rekeningnummer (IBAN)'} />
                            )}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={8}>
                        <Field
                            name="ibanAttn"
                            render={({ field }) => (
                                <InputText field={field} id="iban_attn" placeholder={'IBAN te name van'} />
                            )}
                        />
                    </Col>
                </Row>

                <FormLabel htmlFor="did_agree_avg" className={'field-label'}>
                    Akkoord privacy beleid
                </FormLabel>
                <Row>
                    <Col xs={12} sm={8}>
                        <Field
                            name="didAgreeAvg"
                            render={({ field }) => (
                                <label className="w-checkbox checkbox-fld">
                                    <input
                                        type="checkbox"
                                        {...field}
                                        id="did_agree_avg"
                                        checked={field.value}
                                        className="w-checkbox-input checkbox"
                                        disabled={initialContact.didAgreeAvg}
                                    />
                                    <span htmlFor="did_agree_avg" className="checkbox-label w-form-label">
                                        Akkoord
                                    </span>
                                </label>
                            )}
                        />
                    </Col>
                </Row>

                <FormLabel className={'field-label'}>Energieleverancier</FormLabel>
                {values.primaryContactEnergySupplier ? (
                    <Row>
                        <div className="current_es_wrapper col-12">
                            <h3 id="current_es_id" className="h3">
                                {values.primaryContactEnergySupplier.energySupplier.name}
                            </h3>
                            <Row>
                                <Col>
                                    <FormLabel>Nummer leverancier</FormLabel>
                                </Col>
                                <Col>-</Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormLabel>Klant sinds</FormLabel>
                                </Col>
                                <Col>
                                    {values.primaryContactEnergySupplier.memberSince
                                        ? moment(values.primaryContactEnergySupplier.memberSince).format('L')
                                        : ''}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormLabel>EAN nummer electriciteit</FormLabel>
                                </Col>
                                <Col>{values.primaryContactEnergySupplier.eanElectricity}</Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormLabel>Klant nummer</FormLabel>
                                </Col>
                                <Col>{values.primaryContactEnergySupplier.esNumber}</Col>
                            </Row>
                        </div>
                    </Row>
                ) : (
                    <Row>
                        <TextBlock className={'col-12 col-sm-8'} />
                    </Row>
                )}
            </Col>
        </Row>
    );
};

export default DefaultContactPersonalEdit;
