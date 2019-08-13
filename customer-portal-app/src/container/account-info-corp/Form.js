import React from 'react';
import InputText from '../../components/form/InputText';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import ButtonText from '../../components/button/ButtonText';
import Select from '../../components/form/Select';
import Countries from '../../data/Countries';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email()
        .required('Verplicht'),
    website: Yup.string().url(),
});

const AccountInfoCorpForm = function({ handleSubmit, initialValues }) {
    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
                actions.setSubmitting(true);
                console.log(values);
            }}
            render={({ errors, touched, setFieldValue, isSubmitting, values }) => {
                return (
                    <Form id="email-form" name="email-form">
                        <div className="w-row">
                            <div className="w-col w-col-6">
                                <h6 className="heading-content">Contactnummer</h6>
                                <div className="text-block">{initialValues.number}</div>
                                <label htmlFor="email" className="field-label">
                                    Inloggegevens
                                </label>
                                <div className="text-block">{initialValues.email}</div>
                                <a href="change-password.html" className="link-content">
                                    wijzig wachtwoord
                                </a>

                                <label htmlFor="company_name" className="field-label">
                                    Bedrijfsnaam
                                </label>
                                <Field
                                    name="companyName"
                                    render={({ field }) => (
                                        <InputText field={field} id="company_name" placeholder={'Bedrijfsnaam'} />
                                    )}
                                />
                                <label htmlFor="chamber_of_commerce_number" className="field-label">
                                    KvK
                                </label>
                                <Field
                                    name="chamberOfCommerceNumber"
                                    render={({ field }) => (
                                        <InputText field={field} id="chamber_of_commerce_number" placeholder={'KvK'} />
                                    )}
                                />
                                <label htmlFor="vat_number" className="field-label">
                                    BTW nummer
                                </label>
                                <Field
                                    name="vatNumber"
                                    render={({ field }) => (
                                        <InputText field={field} id="vat_number" placeholder={'BTW nummer'} />
                                    )}
                                />
                                <label htmlFor="iban" className="field-label">
                                    IBAN
                                </label>
                                <Field
                                    name="iban"
                                    render={({ field }) => <InputText field={field} id="iban" placeholder={'IBAN'} />}
                                />
                                <label htmlFor="website" className="field-label">
                                    Website
                                </label>
                                <Field
                                    name="website"
                                    render={({ field }) => (
                                        <InputText field={field} id="website" placeholder={'Website'} />
                                    )}
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

                                <label htmlFor="e-mail-address-1" className="field-label">
                                    E-mail adres 1
                                </label>
                                <Field
                                    name="emailAddress1"
                                    render={({ field }) => (
                                        <InputText field={field} id="e-mail-address-1" placeholder={'E-mail'} />
                                    )}
                                />

                                <label htmlFor="e-mail-address-2" className="field-label">
                                    E-mail adres 2
                                </label>
                                <Field
                                    name="emailAddress2"
                                    render={({ field }) => (
                                        <InputText field={field} id="e-mail-address-2" placeholder={'E-mail'} />
                                    )}
                                />

                                <label htmlFor="telephone-number-1" className="field-label">
                                    Telefoonnummer 1
                                </label>
                                <Field
                                    name="telephoneNumber1"
                                    render={({ field }) => (
                                        <InputText field={field} id="telephone-number-1" placeholder={'Nummer'} />
                                    )}
                                />

                                <label htmlFor="telephone-number-2" className="field-label">
                                    Telefoonnummer 2
                                </label>
                                <Field
                                    name="telephoneNumber2"
                                    render={({ field }) => (
                                        <InputText field={field} id="telephone-number-2" placeholder={'Nummer'} />
                                    )}
                                />
                            </div>

                            <div className="w-col w-col-6">
                                <h6 className="heading-content">Primair contactpersoon</h6>
                                <div className="w-col w-col-6">
                                    <div className="text-block">{initialValues.primaryOccupationContactName}</div>
                                </div>
                                <div className="w-col w-col-6">
                                    <div className="text-block">{initialValues.primaryOccupationContactRole}</div>
                                </div>

                                <label htmlFor="street" className="field-label">
                                    Bezoekadres
                                </label>
                                <Field
                                    name="visitStreet"
                                    render={({ field }) => (
                                        <InputText field={field} id="visit_street" placeholder={'Straat'} />
                                    )}
                                />
                                <Field
                                    name="visitStreetNumber"
                                    render={({ field }) => (
                                        <InputText
                                            field={field}
                                            id="visit_street_number"
                                            placeholder={'Nummer'}
                                            className={'text-input content _w-40 w-input'}
                                        />
                                    )}
                                />
                                <Field
                                    name="visitStreetAddition"
                                    render={({ field }) => (
                                        <InputText
                                            field={field}
                                            id="visit_street_addition"
                                            placeholder={'Toevoeging'}
                                            className={'text-input content _w-70 w-input'}
                                        />
                                    )}
                                />
                                <Field
                                    name="visitPostalCode"
                                    render={({ field }) => (
                                        <InputText
                                            field={field}
                                            id="visit_postal_code"
                                            placeholder={'Postcode'}
                                            className={'text-input content _w-40 w-input'}
                                        />
                                    )}
                                />
                                <Field
                                    name="visitCity"
                                    render={({ field }) => (
                                        <InputText
                                            field={field}
                                            id="visit_city"
                                            placeholder={'Plaats'}
                                            className={'text-input content _w-70 w-input'}
                                        />
                                    )}
                                />
                                <Field
                                    name="visitCountryId"
                                    render={({ field }) => (
                                        <Select
                                            field={field}
                                            id="visit_country_id"
                                            placeholder={'Selecteer uw land'}
                                            options={Countries}
                                        />
                                    )}
                                />

                                <label htmlFor="street" className="field-label">
                                    Postadres
                                </label>
                                <Field
                                    name="postalStreet"
                                    render={({ field }) => (
                                        <InputText field={field} id="postal_street" placeholder={'Straat'} />
                                    )}
                                />
                                <Field
                                    name="postalStreetNumber"
                                    render={({ field }) => (
                                        <InputText
                                            field={field}
                                            id="postal_street_number"
                                            placeholder={'Nummer'}
                                            className={'text-input content _w-40 w-input'}
                                        />
                                    )}
                                />
                                <Field
                                    name="postalStreetAddition"
                                    render={({ field }) => (
                                        <InputText
                                            field={field}
                                            id="postal_street_addition"
                                            placeholder={'Toevoeging'}
                                            className={'text-input content _w-70 w-input'}
                                        />
                                    )}
                                />
                                <Field
                                    name="postalPostalCode"
                                    render={({ field }) => (
                                        <InputText
                                            field={field}
                                            id="postal_postal_code"
                                            placeholder={'Postcode'}
                                            className={'text-input content _w-40 w-input'}
                                        />
                                    )}
                                />
                                <Field
                                    name="postalCity"
                                    render={({ field }) => (
                                        <InputText
                                            field={field}
                                            id="postal_city"
                                            placeholder={'Plaats'}
                                            className={'text-input content _w-70 w-input'}
                                        />
                                    )}
                                />
                                <Field
                                    name="postalCountryId"
                                    render={({ field }) => (
                                        <Select
                                            field={field}
                                            id="postal_country_id"
                                            placeholder={'Selecteer uw land'}
                                            options={Countries}
                                        />
                                    )}
                                />

                                <label htmlFor="street" className="field-label">
                                    Factuuradres
                                </label>
                                <Field
                                    name="invoiceStreet"
                                    render={({ field }) => (
                                        <InputText field={field} id="invoice_street" placeholder={'Straat'} />
                                    )}
                                />
                                <Field
                                    name="invoiceStreetNumber"
                                    render={({ field }) => (
                                        <InputText
                                            field={field}
                                            id="invoice_street_number"
                                            placeholder={'Nummer'}
                                            className={'text-input content _w-40 w-input'}
                                        />
                                    )}
                                />
                                <Field
                                    name="invoiceStreetAddition"
                                    render={({ field }) => (
                                        <InputText
                                            field={field}
                                            id="invoice_street_addition"
                                            placeholder={'Toevoeging'}
                                            className={'text-input content _w-70 w-input'}
                                        />
                                    )}
                                />
                                <Field
                                    name="invoicePostalCode"
                                    render={({ field }) => (
                                        <InputText
                                            field={field}
                                            id="invoice_postal_code"
                                            placeholder={'Postcode'}
                                            className={'text-input content _w-40 w-input'}
                                        />
                                    )}
                                />
                                <Field
                                    name="invoiceCity"
                                    render={({ field }) => (
                                        <InputText
                                            field={field}
                                            id="invoice_city"
                                            placeholder={'Plaats'}
                                            className={'text-input content _w-70 w-input'}
                                        />
                                    )}
                                />
                                <Field
                                    name="invoiceCountryId"
                                    render={({ field }) => (
                                        <Select
                                            field={field}
                                            id="invoice_country_id"
                                            placeholder={'Selecteer uw land'}
                                            options={Countries}
                                        />
                                    )}
                                />

                                <label htmlFor="telephone-number-2" className="field-label">
                                    Overige contacten
                                </label>
                                {initialValues.occupations.map(occupation => (
                                    <React.Fragment>
                                        <div className="w-col w-col-6">
                                            <div className="text-block">{occupation.name}</div>
                                        </div>
                                        <div className="w-col w-col-6">
                                            <div className="text-block">{occupation.role}</div>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        <div className="w-row">
                            <div className="w-col w-col-6">
                                <ButtonText
                                    buttonText={'Opslaan'}
                                    buttonClassName={'save-btn w-button'}
                                    type={'submit'}
                                    loading={isSubmitting}
                                />
                            </div>
                            <div className="w-col w-col-6" />
                        </div>
                    </Form>
                );
            }}
        />
    );
};

export default AccountInfoCorpForm;
