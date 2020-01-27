import React from 'react';
import InputText from '../../../components/form/InputText';
import { Field } from 'formik';
import Select from '../../../components/form/Select';
import Countries from '../../../data/Countries';
import Col from 'react-bootstrap/Col';
import FormLabel from 'react-bootstrap/FormLabel';
import Row from 'react-bootstrap/Row';
import TextBlock from '../../../components/general/TextBlock';
import moment from 'moment';
import EnergySuppliers from '../../../data/EnergySuppliers';
import InputDate from '../../../components/form/InputDate';

const DefaultContactOrganisationEdit = function({
    portalSettings,
    initialContact,
    projectTypeCodeRef,
    errors,
    touched,
    values,
    setFieldValue,
}) {
    // Handy to know: Edit person/organisation is done directly or in step 2 of register steps.
    // When Edit person/organisation directly (not in step 2 of register steps) then projectTypeCodeRef = undefined
    return (
        <Row>
            <Col xs={12} md={6}>
                <FormLabel className={'field-label'}>Contactnummer</FormLabel>
                <Row>
                    <TextBlock className={'col-12 col-sm-8'}>{values.number}</TextBlock>
                </Row>

                <FormLabel className={'field-label required'}>Naam</FormLabel>
                <Row>
                    <Col xs={12} sm={8}>
                        <Field
                            name="organisation.name"
                            render={({ field }) => (
                                <InputText
                                    field={field}
                                    errors={errors}
                                    touched={touched}
                                    id="name"
                                    placeholder={'Naam'}
                                />
                            )}
                        />
                    </Col>
                </Row>

                <FormLabel className={'field-label'}>KvK</FormLabel>
                <Row>
                    <Col xs={12} sm={8}>
                        <Field
                            name="organisation.chamberOfCommerceNumber"
                            render={({ field }) => (
                                <InputText
                                    field={field}
                                    errors={errors}
                                    touched={touched}
                                    id="chamber_of_commerce_number"
                                    placeholder={'KvK'}
                                />
                            )}
                        />
                    </Col>
                </Row>

                <FormLabel className={'field-label'}>BTW nummer</FormLabel>
                <Row>
                    <Col xs={12} sm={8}>
                        <Field
                            name="organisation.vatNumber"
                            render={({ field }) => (
                                <InputText
                                    field={field}
                                    errors={errors}
                                    touched={touched}
                                    id="vat_number"
                                    placeholder={'BTW nummer'}
                                />
                            )}
                        />
                    </Col>
                </Row>

                <FormLabel
                    htmlFor="iban"
                    className={initialContact.isParticipant ? 'field-label required' : 'field-label'}
                >
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

                <FormLabel className={'field-label'}>Website</FormLabel>
                <Row>
                    <Col xs={12} sm={8}>
                        <Field
                            name="organisation.website"
                            render={({ field }) => (
                                <InputText
                                    field={field}
                                    errors={errors}
                                    touched={touched}
                                    id="website"
                                    placeholder={'Website'}
                                />
                            )}
                        />
                    </Col>
                </Row>

                <FormLabel htmlFor="did_agree_avg" className={'field-label required'}>
                    Akkoord privacybeleid
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
                                            privacybeleid
                                        </a>{' '}
                                        {values.didAgreeAvg ? (
                                            <em>
                                                (
                                                {initialContact.dateDidAgreeAvg
                                                    ? moment(initialContact.dateDidAgreeAvg).format('L')
                                                    : moment().format('L')}
                                                )
                                            </em>
                                        ) : (
                                            ''
                                        )}
                                    </span>
                                    {touched[field.name] && errors[field.name] ? (
                                        <div className={'error-message text-danger'}>{errors[field.name]}</div>
                                    ) : null}
                                </label>
                            )}
                        />
                    </Col>
                </Row>

                <FormLabel htmlFor="email-correspondence" className={'field-label required'}>
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
                                    placeholder={'E-mailadres'}
                                />
                            )}
                        />
                    </Col>
                </Row>

                <FormLabel htmlFor="email-invoice" className="field-label">
                    E-mailadres nota
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
                                    placeholder={'E-mailadres'}
                                />
                            )}
                        />
                    </Col>
                </Row>

                <FormLabel
                    htmlFor="telephone-number-1"
                    className={initialContact.isParticipant ? 'field-label required' : 'field-label'}
                >
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
            </Col>

            <Col xs={12} md={6}>
                <FormLabel htmlFor="street" className="field-label required">
                    Postadres
                </FormLabel>
                <Row>
                    <Col xs={12} sm={12}>
                        <Field
                            name="postalAddress.street"
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
                            name="postalAddress.number"
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
                            name="postalAddress.addition"
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
                            name="postalAddress.postalCode"
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
                            name="postalAddress.city"
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
                            name="postalAddress.countryId"
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
                <FormLabel
                    htmlFor="street"
                    className={
                        projectTypeCodeRef === 'postalcode_link_capital' ? 'field-label required' : 'field-label'
                    }
                >
                    Bezoekadres
                </FormLabel>
                <Row>
                    <Col xs={12} sm={12}>
                        <Field
                            name="visitAddress.street"
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
                            name="visitAddress.number"
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
                            name="visitAddress.addition"
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
                            name="visitAddress.postalCode"
                            render={({ field }) => (
                                <InputText
                                    field={field}
                                    errors={errors}
                                    touched={touched}
                                    id="postal_code"
                                    placeholder={'Postcode'}
                                    disabled={initialContact.isParticipantPcrProject}
                                />
                            )}
                        />
                    </Col>
                    <Col xs={12} sm={8}>
                        <Field
                            name="visitAddress.city"
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
                            name="visitAddress.countryId"
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
                <FormLabel htmlFor="street" className="field-label">
                    Nota adres
                </FormLabel>
                <Row>
                    <Col xs={12} sm={12}>
                        <Field
                            name="invoiceAddress.street"
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
                            name="invoiceAddress.number"
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
                            name="invoiceAddress.addition"
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
                            name="invoiceAddress.postalCode"
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
                            name="invoiceAddress.city"
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
                            name="invoiceAddress.countryId"
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
                {projectTypeCodeRef === 'postalcode_link_capital' || projectTypeCodeRef === undefined ? (
                    <>
                        <FormLabel
                            htmlFor="energy_supplier_id"
                            className={
                                projectTypeCodeRef === 'postalcode_link_capital'
                                    ? 'field-label required'
                                    : 'field-label'
                            }
                        >
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
                                            // disabled={
                                            //     initialContact.primaryContactEnergySupplier &&
                                            //     initialContact.primaryContactEnergySupplier.energySupplierId &&
                                            //     initialContact.isParticipant
                                            // }
                                        />
                                    )}
                                />
                            </Col>
                        </Row>
                        {values.primaryContactEnergySupplier && values.primaryContactEnergySupplier.energySupplierId ? (
                            <>
                                <FormLabel
                                    htmlFor="es_number"
                                    className={
                                        projectTypeCodeRef === 'postalcode_link_capital'
                                            ? 'field-label required'
                                            : 'field-label'
                                    }
                                >
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
                                                    // disabled={
                                                    //     initialContact.primaryContactEnergySupplier &&
                                                    //     initialContact.primaryContactEnergySupplier.energySupplierId &&
                                                    //     initialContact.primaryContactEnergySupplier.esNumber &&
                                                    //     initialContact.isParticipant
                                                    // }
                                                />
                                            )}
                                        />
                                    </Col>
                                </Row>

                                <FormLabel htmlFor="member_since" className={'field-label'}>
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
                                                    // readOnly={
                                                    //     initialContact.primaryContactEnergySupplier &&
                                                    //     initialContact.primaryContactEnergySupplier.energySupplierId &&
                                                    //     initialContact.primaryContactEnergySupplier.memberSince
                                                    // }
                                                />
                                            )}
                                        />
                                    </Col>
                                </Row>

                                <FormLabel
                                    htmlFor="ean_electricity"
                                    className={
                                        projectTypeCodeRef === 'postalcode_link_capital'
                                            ? 'field-label required'
                                            : 'field-label'
                                    }
                                >
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
                                                    // disabled={
                                                    //     initialContact.primaryContactEnergySupplier &&
                                                    //     initialContact.primaryContactEnergySupplier.energySupplierId &&
                                                    //     initialContact.primaryContactEnergySupplier.eanElectricity &&
                                                    //     initialContact.isParticipant
                                                    // }
                                                />
                                            )}
                                        />
                                    </Col>
                                </Row>

                                <FormLabel htmlFor="ean_gas" className={'field-label'}>
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
                                                    placeholder={'EAN nummer gas'}
                                                    // disabled={
                                                    //     initialContact.primaryContactEnergySupplier &&
                                                    //     initialContact.primaryContactEnergySupplier.energySupplierId &&
                                                    //     initialContact.primaryContactEnergySupplier.eanGas
                                                    // }
                                                />
                                            )}
                                        />
                                    </Col>
                                </Row>
                            </>
                        ) : (
                            ''
                        )}
                    </>
                ) : null}
            </Col>
        </Row>
    );
};

export default DefaultContactOrganisationEdit;
