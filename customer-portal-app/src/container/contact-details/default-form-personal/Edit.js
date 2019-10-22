import React from 'react';
import InputText from '../../../components/form/InputText';
import { Field } from 'formik';
import Select from '../../../components/form/Select';
import Countries from '../../../data/Countries';
import EnergySuppliers from '../../../data/EnergySuppliers';
import Titles from '../../../data/Titles';
import LastNamePrefixes from '../../../data/LastNamePrefixes';
import Col from 'react-bootstrap/Col';
import FormLabel from 'react-bootstrap/FormLabel';
import Row from 'react-bootstrap/Row';
import TextBlock from '../../../components/general/TextBlock';
import moment from 'moment';
import InputDate from '../../../components/form/InputDate';

const DefaultContactPersonalEdit = function({
    portalSettings,
    initialContact,
    errors,
    touched,
    values,
    setFieldValue,
}) {
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
                                <Select
                                    field={field}
                                    errors={errors}
                                    touched={touched}
                                    id="title_id"
                                    placeholder={'Aanhef'}
                                    options={Titles}
                                />
                            )}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={4}>
                        <Field
                            name="person.initials"
                            render={({ field }) => (
                                <InputText
                                    field={field}
                                    errors={errors}
                                    touched={touched}
                                    id="initials"
                                    placeholder={'Initialen'}
                                />
                            )}
                        />
                    </Col>
                    <Col xs={12} sm={8}>
                        <Field
                            name="person.firstName"
                            render={({ field }) => (
                                <InputText
                                    field={field}
                                    errors={errors}
                                    touched={touched}
                                    id="first_name"
                                    placeholder={'Voornaam'}
                                />
                            )}
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
                                    errors={errors}
                                    touched={touched}
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
                                    errors={errors}
                                    touched={touched}
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
                                    errors={errors}
                                    touched={touched}
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
                                    errors={errors}
                                    touched={touched}
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
                                    errors={errors}
                                    touched={touched}
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
                                    errors={errors}
                                    touched={touched}
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
                                <InputText
                                    field={field}
                                    errors={errors}
                                    touched={touched}
                                    id="telephone-number-2"
                                    placeholder={'Nummer'}
                                />
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
                                    errors={errors}
                                    touched={touched}
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
                                    errors={errors}
                                    touched={touched}
                                    id="street_number"
                                    placeholder={'Nummer'}
                                />
                            )}
                        />
                    </Col>
                    <Col xs={12} sm={4}>
                        <Field
                            name="primaryAddress.addition"
                            render={({ field }) => (
                                <InputText
                                    field={field}
                                    errors={errors}
                                    touched={touched}
                                    id="addition"
                                    placeholder={'Toevoeging'}
                                />
                            )}
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
                                    errors={errors}
                                    touched={touched}
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
                                    errors={errors}
                                    touched={touched}
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
                                    errors={errors}
                                    touched={touched}
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
                    IBAN gegevens
                </FormLabel>
                <Row>
                    <Col xs={12} sm={8}>
                        <Field
                            name="iban"
                            render={({ field }) => (
                                <InputText
                                    field={field}
                                    errors={errors}
                                    touched={touched}
                                    id="iban"
                                    placeholder={'Rekeningnummer (IBAN)'}
                                />
                            )}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={8}>
                        <Field
                            name="ibanAttn"
                            render={({ field }) => (
                                <InputText
                                    field={field}
                                    errors={errors}
                                    touched={touched}
                                    id="iban_attn"
                                    placeholder={'IBAN te name van'}
                                />
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
                                        Ik ga akkoord met{' '}
                                        <a href={portalSettings['linkPrivacyPolicy']} target="_blank">
                                            privacy beleid
                                        </a>{' '}
                                        {values.didAgreeAvg ? (
                                            <em>
                                                (
                                                {initialContact.dateDidAgreeAvg
                                                    ? moment(initialContact.dateDidAgreeAvg.date).format('L')
                                                    : moment().format('L')}
                                                )
                                            </em>
                                        ) : (
                                            ''
                                        )}
                                    </span>
                                </label>
                            )}
                        />
                    </Col>
                </Row>

                {values.primaryContactEnergySupplier ? (
                    <>
                        <FormLabel htmlFor="current_es_id" className={'field-label'}>
                            Energieleverancier
                        </FormLabel>
                        <Row>
                            <Col xs={12} sm={12} md={8}>
                                <Field
                                    name="primaryContactEnergySupplier.energySupplierId"
                                    render={({ field }) => (
                                        <Select
                                            field={field}
                                            errors={errors}
                                            touched={touched}
                                            id="energy_supplier_id"
                                            placeholder={'Selecteer uw leverancier'}
                                            options={EnergySuppliers}
                                        />
                                    )}
                                />
                            </Col>
                        </Row>

                        <FormLabel htmlFor="es_number" className={'field-label'}>
                            Klant nummer bij leverancier
                        </FormLabel>
                        <Row>
                            <Col xs={12} sm={12} md={8}>
                                <Field
                                    name="primaryContactEnergySupplier.esNumber"
                                    render={({ field }) => (
                                        <InputText
                                            field={field}
                                            errors={errors}
                                            touched={touched}
                                            id="es_number"
                                            placeholder={'Klant nummer bij leverancier'}
                                        />
                                    )}
                                />
                            </Col>
                        </Row>

                        <FormLabel htmlFor="memberSince" className={'field-label'}>
                            Klant bij leverancier sinds
                        </FormLabel>
                        <Row>
                            <Col xs={12} sm={12} md={8}>
                                <Field
                                    name="primaryContactEnergySupplier.memberSince"
                                    render={({ field }) => (
                                        <InputDate
                                            {...field}
                                            errors={errors}
                                            touched={touched}
                                            onChangeAction={setFieldValue}
                                            id="member_since"
                                            placeholder={'Klant sinds'}
                                        />
                                    )}
                                />
                            </Col>
                        </Row>

                        <FormLabel htmlFor="eanElectricity" className={'field-label'}>
                            EAN nummer electriciteit
                        </FormLabel>
                        <Row>
                            <Col xs={12} sm={12} md={8}>
                                <Field
                                    name="primaryContactEnergySupplier.eanElectricity"
                                    render={({ field }) => (
                                        <InputText
                                            field={field}
                                            errors={errors}
                                            touched={touched}
                                            id="ean_electricity"
                                            placeholder={'EAN nummer electriciteit'}
                                        />
                                    )}
                                />
                            </Col>
                        </Row>

                        <FormLabel htmlFor="eanGas" className={'field-label'}>
                            EAN nummer gas
                        </FormLabel>
                        <Row>
                            <Col xs={12} sm={12} md={8}>
                                <Field
                                    name="primaryContactEnergySupplier.eanGas"
                                    render={({ field }) => (
                                        <InputText
                                            field={field}
                                            errors={errors}
                                            touched={touched}
                                            id="ean_gas"
                                            placeholder={'EAN nummer electriciteit'}
                                        />
                                    )}
                                />
                            </Col>
                        </Row>
                    </>
                ) : (
                    <>
                        <FormLabel htmlFor="current_es_id" className={'field-label'}>
                            Energieleverancier
                        </FormLabel>
                        <Row>
                            <Col xs={12} sm={8}>
                                <Field
                                    name="primaryContactEnergySupplier.energySupplierId"
                                    render={({ field }) => (
                                        <Select
                                            field={field}
                                            errors={errors}
                                            touched={touched}
                                            id="energy_supplier_id"
                                            placeholder={'Selecteer uw leverancier'}
                                            options={EnergySuppliers}
                                        />
                                    )}
                                />
                            </Col>
                        </Row>
                    </>
                )}
            </Col>
        </Row>
    );
};

export default DefaultContactPersonalEdit;
