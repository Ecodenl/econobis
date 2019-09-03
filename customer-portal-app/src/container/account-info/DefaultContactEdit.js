import React from 'react';
import InputText from '../../components/form/InputText';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Select from '../../components/form/Select';
import Countries from '../../data/Countries';
import Col from 'react-bootstrap/Col';
import FormLabel from 'react-bootstrap/FormLabel';
import Row from 'react-bootstrap/Row';
import TextBlock from '../../components/general/TextBlock';
import moment from 'moment';

const DefaultContactEdit = function({
    handleSubmit,
    initialContact,
    energySuppliers,
    handleEnergySupplierChange,
    values,
    setFieldValue,
}) {
    const energySupplierCurrent = values.contactEnergySuppliers ? values.contactEnergySuppliers[0] : {};

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
                            options={[
                                { id: 1, name: 'Dhr' },
                                { id: 2, name: 'Mevr' },
                                { id: 3, name: 'De heer, Mevrouw' },
                                { id: 4, name: 'Familie' },
                                { id: 5, name: 'De heer of mevrouw' },
                                { id: 6, name: 'De heren' },
                                { id: 7, name: 'De dames' },
                            ]}
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
                            options={[
                                { id: 1, name: 'van' },
                                { id: 2, name: 'de' },
                                { id: 3, name: 'van der' },
                                { id: 4, name: 'van de' },
                                { id: 5, name: 'van den' },
                                { id: 6, name: 'den' },
                                { id: 7, name: 'ten' },
                                { id: 8, name: 'ter' },
                                { id: 9, name: 'te' },
                            ]}
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

                <FormLabel htmlFor="e-mail-address-1" className={'field-label'}>
                    E-mailadres correspondentie
                </FormLabel>
                <Field
                    name="emailAddress1"
                    render={({ field }) => <InputText field={field} id="e-mail-address-1" placeholder={'E-mail'} />}
                />

                <label htmlFor="e-mail-address-2" className="field-label">
                    E-mail adres 2
                </label>
                <Field
                    name="emailAddress2"
                    render={({ field }) => <InputText field={field} id="e-mail-address-2" placeholder={'E-mail'} />}
                />

                <FormLabel htmlFor="telephone-number-1" className={'field-label'}>
                    Telefoonnummer 1
                </FormLabel>
                <Field
                    name="telephoneNumber1"
                    render={({ field }) => <InputText field={field} id="telephone-number-1" placeholder={'Nummer'} />}
                />

                <FormLabel htmlFor="telephone-number-2" className={'field-label'}>
                    Telefoonnummer 2
                </FormLabel>
                <Field
                    name="telephoneNumber2"
                    render={({ field }) => <InputText field={field} id="telephone-number-2" placeholder={'Nummer'} />}
                />

                <label htmlFor="street" className="field-label">
                    Adres
                </label>
                <Field
                    name="addresses[0].street"
                    render={({ field }) => <InputText field={field} id="street" placeholder={'Straat'} />}
                />
                <Field
                    name="addresses[0].number"
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
                    name="addresses[0].addition"
                    render={({ field }) => (
                        <InputText
                            field={field}
                            id="street_addition"
                            placeholder={'Toevoeging'}
                            className={'text-input content _w-70 w-input'}
                        />
                    )}
                />
                <Field
                    name="addresses[0].postalCode"
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
                    name="addresses[0].city"
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
                    name="addresses[0].countryId"
                    render={({ field }) => (
                        <Select field={field} id="country_id" placeholder={'Selecteer uw land'} options={Countries} />
                    )}
                />
            </Col>

            <Col xs={12} md={6}>
                <label htmlFor="email-2" className="field-label">
                    Rekeningnummer
                </label>
                <Field
                    name="iban"
                    render={({ field }) => <InputText field={field} id="iban" placeholder={'Rekeningnummer (IBAN)'} />}
                />
                <Field
                    name="ibanName"
                    render={({ field }) => <InputText field={field} id="iban_name" placeholder={'IBAN te name van'} />}
                />

                <label htmlFor="did_agree_avg" className="field-label">
                    Akkoord privacy beleid
                </label>
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
                {energySupplierCurrent ? (
                    <Row>
                        <div className="current_es_wrapper col-12">
                            <h3 id="current_es_id" className="h3">
                                {energySupplierCurrent.energySupplier.name}
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
                                    {energySupplierCurrent.memberSince
                                        ? moment(energySupplierCurrent.memberSince).format('L')
                                        : ''}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormLabel>EAN nummer electriciteit</FormLabel>
                                </Col>
                                <Col>{energySupplierCurrent.eanElectricity}</Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormLabel>Klant nummer</FormLabel>
                                </Col>
                                <Col>{energySupplierCurrent.esNumber}</Col>
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
