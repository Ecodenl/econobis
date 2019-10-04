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

const DefaultContactOrganisationEdit = function({ handleSubmit, initialContact, touched, errors, values }) {
    return (
        <Row>
            <Col xs={12} md={6}>
                <FormLabel className={'field-label'}>Contactnummer</FormLabel>
                <Row>
                    <TextBlock className={'col-12 col-sm-8'}>{values.number}</TextBlock>
                </Row>

                <FormLabel className={'field-label'}>Naam</FormLabel>
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
                                <InputText field={field} id="chamber_of_commerce_number" placeholder={'KvK'} />
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
                                <InputText field={field} id="vat_number" placeholder={'BTW nummer'} />
                            )}
                        />
                    </Col>
                </Row>

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

                <FormLabel className={'field-label'}>Website</FormLabel>
                <Row>
                    <Col xs={12} sm={8}>
                        <Field
                            name="organisation.website"
                            render={({ field }) => <InputText field={field} id="website" placeholder={'Website'} />}
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
                                <InputText field={field} id="telephone-number-2" placeholder={'Nummer'} />
                            )}
                        />
                    </Col>
                </Row>
            </Col>

            <Col xs={12} md={6}>
                <FormLabel htmlFor="street" className="field-label">
                    Bezoekadres{values.visitAddress.primary ? ' (primair)' : ''}
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
                            render={({ field }) => <InputText field={field} id="addition" placeholder={'Toevoeging'} />}
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
                    Postadres{values.postalAddress.primary ? ' (primair)' : ''}
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
                            render={({ field }) => <InputText field={field} id="addition" placeholder={'Toevoeging'} />}
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

                <FormLabel htmlFor="street" className="field-label">
                    Factuurdres{values.invoiceAddress.primary ? ' (primair)' : ''}
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
                            render={({ field }) => <InputText field={field} id="addition" placeholder={'Toevoeging'} />}
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
                <FormLabel className={'field-label'}>Contacten</FormLabel>
                {values.primaryOccupations ? (
                    values.primaryOccupations.map(primaryOccupation => (
                        <Row>
                            <TextBlock className={'col-12 col-sm-4'} placeholder={'Contact naam'}>
                                {primaryOccupation.contact.fullName}
                            </TextBlock>
                            <TextBlock className={'col-12 col-sm-4'} placeholder={'Contact verbinding'}>
                                {primaryOccupation.occupation.primaryOccupation}
                            </TextBlock>
                        </Row>
                    ))
                ) : (
                    <Row>
                        <TextBlock className={'col-12 col-sm-8'} />
                    </Row>
                )}
            </Col>
        </Row>
    );
};

export default DefaultContactOrganisationEdit;
