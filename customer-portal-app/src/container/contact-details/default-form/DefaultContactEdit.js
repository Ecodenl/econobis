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

const DefaultContactEdit = function({ handleSubmit, initialContact, values, setFieldValue }) {
    return (
        <Row>
            <Col xs={12} md={6}>
                <FormLabel className={'field-label'}>Naam</FormLabel>
                <Field
                    name="person.titleId"
                    render={({ field }) => (
                        <Select
                            field={field}
                            id="title_id"
                            placeholder={'Aanhef'}
                            className={'col-12 col-sm-8'}
                            options={Titles}
                        />
                    )}
                />
                <Field
                    name="person.firstName"
                    render={({ field }) => <InputText field={field} id="first_name" placeholder={'Voornaam'} />}
                />
                <Field
                    name="person.lastNamePrefixId"
                    render={({ field }) => (
                        <Select
                            field={field}
                            id="last_name_prefix_id"
                            options={LastNamePrefixes}
                            className={'select-field w-select content _w-40 _w-40-mob'}
                        />
                    )}
                />
                <Field
                    name="person.lastName"
                    render={({ field }) => (
                        <InputText
                            field={field}
                            id="last_name"
                            placeholder={'Achternaam'}
                            className={'text-input content _w-70 _w-70-mob w-input'}
                        />
                    )}
                />
                <Field
                    name="person.dateOfBirth"
                    render={({ field }) => (
                        <InputDate
                            {...field}
                            onChangeAction={setFieldValue}
                            id="last_name"
                            placeholder={'Geboortedatum'}
                            className={'text-input content _w-70 _w-70-mob w-input'}
                        />
                    )}
                />

                <FormLabel htmlFor="email-correspondence" className={'field-label'}>
                    E-mailadres correspondentie
                </FormLabel>
                <Field
                    name="emailCorrespondence.email"
                    render={({ field }) => <InputText field={field} id="email-correspondence" placeholder={'E-mail'} />}
                />

                <FormLabel htmlFor="email-invoice" className="field-label">
                    E-mail adres 2
                </FormLabel>
                <Field
                    name="emailInvoice.email"
                    render={({ field }) => <InputText field={field} id="email-invoice" placeholder={'E-mail'} />}
                />

                <FormLabel htmlFor="telephone-number-1" className={'field-label'}>
                    Telefoonnummer 1
                </FormLabel>
                <Field
                    name="phoneNumberPrimary.number"
                    render={({ field }) => <InputText field={field} id="telephone-number-1" placeholder={'Nummer'} />}
                />

                <FormLabel htmlFor="telephone-number-2" className={'field-label'}>
                    Telefoonnummer 2
                </FormLabel>
                <Field
                    name="phoneNumberTwo.number"
                    render={({ field }) => <InputText field={field} id="telephone-number-2" placeholder={'Nummer'} />}
                />

                <FormLabel htmlFor="street" className="field-label">
                    Adres
                </FormLabel>
                <Field
                    name="primaryAddress.street"
                    render={({ field }) => <InputText field={field} id="street" placeholder={'Straat'} />}
                />
                <Field
                    name="primaryAddress.number"
                    render={({ field }) => (
                        <InputText
                            field={field}
                            id="street_number"
                            placeholder={'Nummer'}
                            className={'text-input content _w-40 w-input'}
                        />
                    )}
                />
                <Field
                    name="primaryAddress.addition"
                    render={({ field }) => (
                        <InputText
                            field={field}
                            id="addition"
                            placeholder={'Toevoeging'}
                            className={'text-input content _w-70 w-input'}
                        />
                    )}
                />
                <Field
                    name="primaryAddress.postalCode"
                    render={({ field }) => (
                        <InputText
                            field={field}
                            id="postal_code"
                            placeholder={'Postcode'}
                            className={'text-input content _w-40 w-input'}
                        />
                    )}
                />
                <Field
                    name="primaryAddress.city"
                    render={({ field }) => (
                        <InputText
                            field={field}
                            id="city"
                            placeholder={'Plaats'}
                            className={'text-input content _w-70 w-input'}
                        />
                    )}
                />
                <Field
                    name="primaryAddress.countryId"
                    render={({ field }) => (
                        <Select field={field} id="country_id" placeholder={'Selecteer uw land'} options={Countries} />
                    )}
                />
            </Col>

            <Col xs={12} md={6}>
                <FormLabel htmlFor="iban" className="field-label">
                    Rekeningnummer
                </FormLabel>
                <Field
                    name="iban"
                    render={({ field }) => <InputText field={field} id="iban" placeholder={'Rekeningnummer (IBAN)'} />}
                />
                <Field
                    name="ibanName"
                    render={({ field }) => <InputText field={field} id="iban_name" placeholder={'IBAN te name van'} />}
                />

                <FormLabel htmlFor="did_agree_avg" className={'field-label'}>
                    Akkoord privacy beleid
                </FormLabel>
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
                                disabled={field.value}
                            />
                            <span htmlFor="did_agree_avg" className="checkbox-label w-form-label">
                                Akkoord
                            </span>
                        </label>
                    )}
                />

                <FormLabel className={'field-label'}>Contactnummer</FormLabel>
                <Row>
                    <TextBlock className={'col-12 col-sm-8'}>{values.number}</TextBlock>
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

export default DefaultContactEdit;
