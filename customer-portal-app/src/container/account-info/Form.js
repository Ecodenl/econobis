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
});

const AccountInfoForm = function({ handleSubmit, initialValues, energySuppliers, handleEnergySupplierChange }) {
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

                                <label htmlFor="first_name" className="field-label">
                                    Naam
                                </label>
                                <Field
                                    name="titleId"
                                    render={({ field }) => (
                                        <Select
                                            field={field}
                                            id="title_id"
                                            placeholder={'Selecteer uw aanhef'}
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
                                    name="firstName"
                                    render={({ field }) => (
                                        <InputText field={field} id="first_name" placeholder={'Voornaam'} />
                                    )}
                                />
                                <Field
                                    name="lastNamePrefixId"
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
                                    name="lastName"
                                    render={({ field }) => (
                                        <InputText
                                            field={field}
                                            id="last_name"
                                            placeholder={'Achternaam'}
                                            className={'text-input content _w-70 _w-70-mob w-input'}
                                        />
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

                                <label htmlFor="street" className="field-label">
                                    Adres
                                </label>
                                <Field
                                    name="street"
                                    render={({ field }) => (
                                        <InputText field={field} id="street" placeholder={'Straat'} />
                                    )}
                                />
                                <Field
                                    name="streetNumber"
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
                                    name="streetAddition"
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
                                    name="postalCode"
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
                                    name="city"
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
                                    name="countryId"
                                    render={({ field }) => (
                                        <Select
                                            field={field}
                                            id="country_id"
                                            placeholder={'Selecteer uw land'}
                                            options={Countries}
                                        />
                                    )}
                                />
                            </div>

                            <div className="w-col w-col-6">
                                <h6 className="heading-content">Primair contactpersoon van</h6>
                                <div className="text-block">{initialValues.contactName}</div>
                                <label htmlFor="email-2" className="field-label">
                                    Rekeningnummer
                                </label>
                                <Field
                                    name="iban"
                                    render={({ field }) => (
                                        <InputText field={field} id="iban" placeholder={'Rekeningnummer (IBAN)'} />
                                    )}
                                />
                                <Field
                                    name="ibanName"
                                    render={({ field }) => (
                                        <InputText field={field} id="iban_name" placeholder={'Tenaamstelling IBAN'} />
                                    )}
                                />

                                <label htmlFor="did_agree_avg" className="field-label">
                                    Akkoord privacy beleid
                                </label>
                                <Field
                                    name="didAgreeAvg"
                                    render={({ field }) => (
                                        <input
                                            type="checkbox"
                                            id="did_agree_avg"
                                            {...field}
                                            checked=""
                                            className="w-checkbox-input checkbox"
                                        />
                                    )}
                                />

                                <label htmlFor="energy_supplier_id" className="field-label">
                                    Energie leverancier
                                </label>
                                <Field
                                    name="energySupplierId"
                                    render={({ field }) => (
                                        <Select
                                            field={{
                                                ...field,
                                                onChange: e => handleEnergySupplierChange(e, setFieldValue),
                                            }}
                                            id="energy_supplier_id"
                                            options={energySuppliers}
                                            placeholder={'Selecteer uw energieleverancier'}
                                        />
                                    )}
                                />

                                {/* Energy supplier details */}
                                {values.energySupplierId ? (
                                    <div className="current_es_wrapper">
                                        <h3 id="current_es_id" className="h3">
                                            {
                                                energySuppliers.find(
                                                    energySupplier =>
                                                        energySupplier.id === Number(values.energySupplierId)
                                                ).name
                                            }
                                        </h3>
                                        <div className="w-row">
                                            <div className="w-col w-col-6">
                                                <h6 className="heading-content inline">Nummer leverancier</h6>
                                            </div>
                                            <div className="w-col w-col-6">
                                                <Field
                                                    name="esNumber"
                                                    render={({ field }) => (
                                                        <InputText
                                                            field={field}
                                                            id="es_number"
                                                            className={'text-input content _w-90 w-input'}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-row">
                                            <div className="w-col w-col-6">
                                                <h6 className="heading-content inline">Lid sinds</h6>
                                            </div>
                                            <div className="w-col w-col-6">
                                                <Field
                                                    name="memberSince"
                                                    render={({ field }) => (
                                                        <InputText
                                                            field={field}
                                                            id="member_since"
                                                            className={'text-input content _w-90 w-input'}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-row">
                                            <div className="w-col w-col-6">
                                                <h6 className="heading-content inline">EAN nummer electriciteit</h6>
                                            </div>
                                            <div className="w-col w-col-6">
                                                <Field
                                                    name="eanElectricity"
                                                    render={({ field }) => (
                                                        <InputText
                                                            field={field}
                                                            id="ean_electricity"
                                                            className={'text-input content _w-90 w-input'}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-row">
                                            <div className="w-col w-col-6">
                                                <h6 className="heading-content inline">Klant nummer </h6>
                                            </div>
                                            <div className="w-col w-col-6">
                                                <Field
                                                    name="clientNr"
                                                    render={({ field }) => (
                                                        <InputText
                                                            field={field}
                                                            id="client_nr"
                                                            className={'text-input content _w-90 w-input'}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-row">
                                            <div className="w-col w-col-6">
                                                <h6 className="heading-content inline">Klant sinds</h6>
                                            </div>
                                            <div className="w-col w-col-6">
                                                <Field
                                                    name="clientSince"
                                                    render={({ field }) => (
                                                        <InputText
                                                            field={field}
                                                            id="client_since"
                                                            className={'text-input content _w-90 w-input'}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ) : null}
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

export default AccountInfoForm;
