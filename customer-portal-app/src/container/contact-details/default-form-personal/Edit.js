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
import { FaInfoCircle } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';
import InputTextDate from '../../../components/form/InputTextDate';
import { isEmpty } from 'lodash';
import FreeFields from '../../../components/freeFields/FreeFields';

const DefaultContactPersonalEdit = function({
    portalSettings,
    initialContact,
    projectTypeCodeRef,
    errors,
    touched,
    values,
    setFieldValue,
}) {
    // determine memberSince disabledBefore and after
    let memberSinceDisabledBefore = '';
    let memberSinceDisabledAfter = '';
    if (initialContact.primaryAddress.currentAddressEnergySupplierElectricity.energySupplierId) {
        if (
            initialContact.primaryAddress.currentAddressEnergySupplierElectricity.memberSince &&
            initialContact.primaryAddress.currentAddressEnergySupplierElectricity.energySupplierId !==
                values.primaryAddress.currentAddressEnergySupplierElectricity.energySupplierId
        ) {
            memberSinceDisabledBefore = moment(
                initialContact.primaryAddress.currentAddressEnergySupplierElectricity.memberSince
            )
                .add(1, 'day')
                .format('YYYY-MM-DD');
        } else if (initialContact.primaryAddress.currentAddressEnergySupplierElectricity.endDatePrevious) {
            memberSinceDisabledBefore = moment(
                initialContact.primaryAddress.currentAddressEnergySupplierElectricity.endDatePrevious
            )
                .add(1, 'day')
                .format('YYYY-MM-DD');
        }
        if (initialContact.primaryAddress.currentAddressEnergySupplierElectricity.memberSinceNext) {
            memberSinceDisabledAfter = moment(
                initialContact.primaryAddress.currentAddressEnergySupplierElectricity.memberSinceNext
            )
                .subtract(1, 'day')
                .format('YYYY-MM-DD');
        }
    }

    // Handy to know: Edit person/organisation is done directly or in step 2 of register steps.
    // When Edit person/organisation directly (not in step 2 of register steps) then projectTypeCodeRef = undefined
    return (
        <Row>
            <Col xs={12} md={6}>
                <FormLabel className={'field-label required'}>Naam</FormLabel>
                <Row>
                    <Col xs={12} sm={6}>
                        <Field name="person.titleId">
                            {({ field }) => (
                                <Select
                                    field={field}
                                    errors={errors}
                                    touched={touched}
                                    id="title_id"
                                    placeholder={'Aanhef'}
                                    options={Titles}
                                    disabled={initialContact.disableChangeContactNameOnPortal}
                                />
                            )}
                        </Field>
                    </Col>
                    <Col xs={12} sm={6}>
                        {initialContact.disableChangeContactNameOnPortal ? (
                            <>
                                <FaInfoCircle
                                    color={'blue'}
                                    size={'15px'}
                                    data-tip={
                                        'Je neemt deel aan een project waarvan de deelnemingen op naam zijn uitgegeven.<br />' +
                                        'Daarom kun je jouw naam niet zelf wijzigen.<br />' +
                                        'Overige contactgegevens kun je wel zelf aanpassen.<br />' +
                                        'Een wijziging van rekeningnummer wordt door ons gecontroleerd.<br />' +
                                        'Heb je vragen of wil je jouw gegevens door de beheerder laten wijzigen?<br />' +
                                        'Kijk in het menu onder "Over ons" voor contact gegevens.'
                                    }
                                    data-for={`contact-${initialContact.id}`}
                                />
                                <ReactTooltip
                                    id={`contact-${initialContact.id}`}
                                    effect="float"
                                    place="right"
                                    multiline={true}
                                    aria-haspopup="true"
                                />
                            </>
                        ) : (
                            ''
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={4}>
                        <Field name="person.initials">
                            {({ field }) => (
                                <InputText
                                    field={field}
                                    errors={errors}
                                    touched={touched}
                                    id="initials"
                                    placeholder={'Initialen'}
                                    disabled={initialContact.disableChangeContactNameOnPortal}
                                />
                            )}
                        </Field>
                    </Col>
                    <Col xs={12} sm={8}>
                        <Field name="person.firstName">
                            {({ field }) => (
                                <InputText
                                    field={field}
                                    errors={errors}
                                    touched={touched}
                                    id="first_name"
                                    placeholder={'Voornaam'}
                                    disabled={initialContact.disableChangeContactNameOnPortal}
                                />
                            )}
                        </Field>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={4}>
                        <Field name="person.lastNamePrefixId">
                            {({ field }) => (
                                <Select
                                    field={field}
                                    errors={errors}
                                    touched={touched}
                                    id="last_name_prefix_id"
                                    options={LastNamePrefixes}
                                    placeholder={'Tussenvoegsel'}
                                    disabled={initialContact.disableChangeContactNameOnPortal}
                                />
                            )}
                        </Field>
                    </Col>
                    <Col xs={12} sm={8}>
                        <Field name="person.lastName">
                            {({ field }) => (
                                <InputText
                                    field={field}
                                    errors={errors}
                                    touched={touched}
                                    id="last_name"
                                    placeholder={'Achternaam'}
                                    disabled={initialContact.disableChangeContactNameOnPortal}
                                />
                            )}
                        </Field>
                    </Col>
                </Row>
                <FormLabel
                    htmlFor="date_of_birth"
                    className={initialContact.isParticipant ? 'field-label required' : 'field-label'}
                >
                    Geboortedatum
                </FormLabel>
                <Row>
                    <Col xs={12} sm={12} md={8}>
                        <Field name="person.dateOfBirth">
                            {({ field }) => (
                                <InputTextDate
                                    field={field}
                                    type="date"
                                    errors={errors}
                                    touched={touched}
                                    onChangeAction={setFieldValue}
                                    id="date_of_birth"
                                    placeholder={'Geboortedatum'}
                                />
                            )}
                        </Field>
                    </Col>
                </Row>

                <FormLabel htmlFor="email-correspondence" className={'field-label required'}>
                    E-mailadres correspondentie
                </FormLabel>
                <Row>
                    <Col xs={12} sm={12} md={8}>
                        <Field name="emailCorrespondence.email">
                            {({ field }) => (
                                <InputText
                                    field={field}
                                    errors={errors}
                                    touched={touched}
                                    id="email-correspondence"
                                    placeholder={'E-mailadres'}
                                />
                            )}
                        </Field>
                    </Col>
                </Row>

                <FormLabel htmlFor="email-invoice" className="field-label">
                    E-mailadres nota
                </FormLabel>
                <Row>
                    <Col xs={12} sm={12} md={8}>
                        <Field name="emailInvoice.email">
                            {({ field }) => (
                                <InputText
                                    field={field}
                                    errors={errors}
                                    touched={touched}
                                    id="email-invoice"
                                    placeholder={'E-mailadres'}
                                />
                            )}
                        </Field>
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
                        <Field name="phoneNumberPrimary.number">
                            {({ field }) => (
                                <InputText
                                    field={field}
                                    errors={errors}
                                    touched={touched}
                                    id="telephone-number-1"
                                    placeholder={'Nummer'}
                                />
                            )}
                        </Field>
                    </Col>
                </Row>

                <FormLabel htmlFor="telephone-number-2" className={'field-label'}>
                    Telefoonnummer 2
                </FormLabel>
                <Row>
                    <Col xs={12} sm={10} md={6}>
                        <Field name="phoneNumberTwo.number">
                            {({ field }) => (
                                <InputText
                                    field={field}
                                    errors={errors}
                                    touched={touched}
                                    id="telephone-number-2"
                                    placeholder={'Nummer'}
                                />
                            )}
                        </Field>
                    </Col>
                </Row>

                <FormLabel
                    htmlFor="street"
                    className={initialContact.isParticipant ? 'field-label required' : 'field-label'}
                >
                    Adres
                    {initialContact.blockChangeAddress ? (
                        <>
                            {' '}
                            <FaInfoCircle
                                color={'blue'}
                                size={'15px'}
                                data-tip={`Adres kan momenteel niet worden aangepast. Geef jouw adreswijziging per e-mail aan ons door.`}
                                data-for={`participant-${initialContact.id}`}
                            />
                            <ReactTooltip
                                id={`participant-${initialContact.id}`}
                                effect="float"
                                place="bottom"
                                multiline={true}
                                aria-haspopup="true"
                            />
                        </>
                    ) : initialContact.blockChangeAddressNumber ? (
                        <>
                            {' '}
                            <FaInfoCircle
                                color={'blue'}
                                size={'15px'}
                                data-tip={`Postcode en huisnummer is niet meer wijzigen vanwege deelname aan project op een specifiek postcodegebied met huisnummerreeks`}
                                data-for={`participant-${initialContact.id}`}
                            />
                            <ReactTooltip
                                id={`participant-${initialContact.id}`}
                                effect="float"
                                place="bottom"
                                multiline={true}
                                aria-haspopup="true"
                            />
                        </>
                    ) : initialContact.isParticipantSceProject || initialContact.isParticipantPcrProject ? (
                        <>
                            {' '}
                            <FaInfoCircle
                                color={'blue'}
                                size={'15px'}
                                data-tip={`Postcode is niet meer wijzigen vanwege deelname aan project op een specifiek postcodegebied`}
                                data-for={`participant-${initialContact.id}`}
                            />
                            <ReactTooltip
                                id={`participant-${initialContact.id}`}
                                effect="float"
                                place="bottom"
                                multiline={true}
                                aria-haspopup="true"
                            />
                        </>
                    ) : (
                        ''
                    )}
                </FormLabel>
                {(isEmpty(values.primaryAddress.number + '') || isEmpty(values.primaryAddress.postalCode + '')) &&
                (!isEmpty(values.primaryAddress.street + '') ||
                    !isEmpty(values.primaryAddress.number + '') ||
                    !isEmpty(values.primaryAddress.addition + '') ||
                    !isEmpty(values.primaryAddress.postalCode + '') ||
                    !isEmpty(values.primaryAddress.city + '')) ? (
                    <Row>
                        <Col xs={12} sm={12}>
                            <small className={'text-danger'}>
                                Adres wordt alleen opgeslagen als minimaal nummer en postcode zijn ingevuld.
                            </small>
                        </Col>
                    </Row>
                ) : (
                    ''
                )}
                <Row>
                    <Col xs={12} sm={12}>
                        <Field name="primaryAddress.street">
                            {({ field }) => (
                                <InputText
                                    field={field}
                                    errors={errors}
                                    touched={touched}
                                    id="street"
                                    placeholder={'Straat'}
                                    disabled={initialContact.blockChangeAddress}
                                />
                            )}
                        </Field>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={4}>
                        <Field name="primaryAddress.number">
                            {({ field }) => (
                                <InputText
                                    field={field}
                                    errors={errors}
                                    touched={touched}
                                    id="street_number"
                                    placeholder={'Nummer'}
                                    disabled={
                                        initialContact.blockChangeAddress || initialContact.blockChangeAddressNumber
                                    }
                                />
                            )}
                        </Field>
                    </Col>
                    <Col xs={12} sm={4}>
                        <Field name="primaryAddress.addition">
                            {({ field }) => (
                                <InputText
                                    field={field}
                                    errors={errors}
                                    touched={touched}
                                    id="addition"
                                    placeholder={'Toevoeging'}
                                    disabled={
                                        initialContact.blockChangeAddress || initialContact.blockChangeAddressNumber
                                    }
                                />
                            )}
                        </Field>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={4}>
                        <Field name="primaryAddress.postalCode">
                            {({ field }) => (
                                <InputText
                                    field={field}
                                    errors={errors}
                                    touched={touched}
                                    id="postal_code"
                                    placeholder={'Postcode'}
                                    disabled={
                                        initialContact.blockChangeAddress ||
                                        initialContact.isParticipantSceProject ||
                                        initialContact.isParticipantPcrProject
                                    }
                                />
                            )}
                        </Field>
                    </Col>
                    <Col xs={12} sm={8}>
                        <Field name="primaryAddress.city">
                            {({ field }) => (
                                <InputText
                                    field={field}
                                    errors={errors}
                                    touched={touched}
                                    id="city"
                                    placeholder={'Plaats'}
                                    disabled={initialContact.blockChangeAddress}
                                />
                            )}
                        </Field>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={8}>
                        <Field name="primaryAddress.countryId">
                            {({ field }) => (
                                <Select
                                    field={field}
                                    errors={errors}
                                    touched={touched}
                                    id="country_id"
                                    placeholder={'Selecteer uw land'}
                                    options={Countries}
                                    disabled={initialContact.blockChangeAddress}
                                />
                            )}
                        </Field>

                        <FreeFields
                            freeFieldsFieldRecords={initialContact.primaryAddress.freeFieldsFieldRecords}
                            showEdit={false}
                        />
                    </Col>
                </Row>
                {initialContact.isParticipantPcrProject || projectTypeCodeRef === 'postalcode_link_capital' ? (
                    <>
                        <FormLabel
                            htmlFor="ean_electricity"
                            className={
                                projectTypeCodeRef === 'postalcode_link_capital'
                                    ? 'field-label required'
                                    : 'field-label'
                            }
                        >
                            EAN nummer elektriciteit
                        </FormLabel>

                        {(isEmpty(values.primaryAddress.number + '') ||
                            isEmpty(values.primaryAddress.postalCode + '')) &&
                        !isEmpty(values.primaryAddress.eanElectricity + '') ? (
                            <Row>
                                <Col xs={12} sm={12}>
                                    <small className={'text-danger'}>
                                        EAN nummer elektriciteit wordt alleen opgeslagen als minimaal nummer en postcode
                                        zijn ingevuld bij adres.
                                    </small>
                                </Col>
                            </Row>
                        ) : (
                            ''
                        )}

                        <Row>
                            <Col xs={12} sm={10} md={6}>
                                <Field name="primaryAddress.eanElectricity">
                                    {({ field }) => (
                                        <InputText
                                            field={field}
                                            errors={errors}
                                            touched={touched}
                                            id="eanElectricity"
                                            placeholder={'EAN nummer elektriciteit'}
                                        />
                                    )}
                                </Field>
                            </Col>
                        </Row>
                        <FormLabel htmlFor="ean_gas" className={'field-label'}>
                            EAN nummer gas
                        </FormLabel>

                        {(isEmpty(values.primaryAddress.number + '') ||
                            isEmpty(values.primaryAddress.postalCode + '')) &&
                        !isEmpty(values.primaryAddress.eanGas + '') ? (
                            <Row>
                                <Col xs={12} sm={12}>
                                    <small className={'text-danger'}>
                                        EAN nummer gas wordt alleen opgeslagen als minimaal nummer en postcode zijn
                                        ingevuld bij adres.
                                    </small>
                                </Col>
                            </Row>
                        ) : (
                            ''
                        )}

                        <Row>
                            <Col xs={12} sm={10} md={6}>
                                <Field name="primaryAddress.eanGas">
                                    {({ field }) => (
                                        <InputText
                                            field={field}
                                            errors={errors}
                                            touched={touched}
                                            id="eanGas"
                                            placeholder={'EAN nummer gas'}
                                        />
                                    )}
                                </Field>
                            </Col>
                        </Row>
                    </>
                ) : (
                    ''
                )}

                <FormLabel className={'field-label'}>Contactnummer</FormLabel>
                <Row>
                    <TextBlock className={'col-12 col-sm-8'}>{values.number}</TextBlock>
                </Row>

                <FreeFields freeFieldsFieldRecords={initialContact.freeFieldsFieldRecords} showEdit={true} />
            </Col>

            <Col xs={12} md={6}>
                <FormLabel
                    htmlFor="iban"
                    className={initialContact.isParticipant ? 'field-label required' : 'field-label'}
                >
                    IBAN gegevens
                </FormLabel>
                <Row>
                    <Col xs={12} sm={8}>
                        <Field name="iban">
                            {({ field }) => (
                                <InputText
                                    field={field}
                                    errors={errors}
                                    touched={touched}
                                    id="iban"
                                    placeholder={'Rekeningnummer (IBAN)'}
                                    customOnChange={e => {
                                        setFieldValue('iban', ('' + e.target.value).toUpperCase());
                                    }}
                                />
                            )}
                        </Field>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={8}>
                        <Field name="ibanAttn">
                            {({ field }) => (
                                <InputText
                                    field={field}
                                    errors={errors}
                                    touched={touched}
                                    id="iban_attn"
                                    placeholder={'IBAN te name van'}
                                />
                            )}
                        </Field>
                    </Col>
                </Row>
                <FormLabel htmlFor="did_agree_avg" className={'field-label required'}>
                    Akkoord privacybeleid
                </FormLabel>
                <Row>
                    <Col xs={12} sm={8}>
                        <Field name="didAgreeAvg">
                            {({ field }) => (
                                <label className="w-checkbox checkbox-fld">
                                    <input
                                        type="checkbox"
                                        {...field}
                                        id="did_agree_avg"
                                        checked={field.value}
                                        className="w-checkbox-input checkbox"
                                        disabled={initialContact.didAgreeAvg}
                                        value={false}
                                    />
                                    <span htmlFor="did_agree_avg" className="checkbox-label w-form-label">
                                        Ik ga akkoord met{' '}
                                        <a href={portalSettings['linkPrivacyPolicy']} target="_blank" rel="noreferrer">
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
                        </Field>
                    </Col>
                </Row>
                {projectTypeCodeRef === 'postalcode_link_capital' || projectTypeCodeRef === undefined ? (
                    <>
                        <FormLabel
                            htmlFor="energy_supplier_id"
                            className={
                                initialContact.isParticipantPcrProject ||
                                projectTypeCodeRef === 'postalcode_link_capital'
                                    ? 'field-label required'
                                    : 'field-label'
                            }
                        >
                            Huidige energie leverancier
                        </FormLabel>

                        {(isEmpty(values.primaryAddress.number + '') ||
                            isEmpty(values.primaryAddress.postalCode + '')) &&
                        (!isEmpty(
                            values.primaryAddress.currentAddressEnergySupplierElectricity.energySupplierId + ''
                        ) ||
                            !isEmpty(values.primaryAddress.currentAddressEnergySupplierElectricity.esNumber + '') ||
                            !isEmpty(
                                values.primaryAddress.currentAddressEnergySupplierElectricity.memberSince + ''
                            )) ? (
                            <Row>
                                <Col xs={12} sm={12}>
                                    <small className={'text-danger'}>
                                        Huidige energie leverancier gegevens wordt alleen opgeslagen als minimaal nummer
                                        en postcode zijn ingevuld bij adres.
                                    </small>
                                </Col>
                            </Row>
                        ) : (
                            ''
                        )}
                        {isEmpty(values.primaryAddress.currentAddressEnergySupplierElectricity.memberSince + '') &&
                        (!isEmpty(
                            values.primaryAddress.currentAddressEnergySupplierElectricity.energySupplierId + ''
                        ) ||
                            !isEmpty(values.primaryAddress.currentAddressEnergySupplierElectricity.esNumber + '') ||
                            !isEmpty(
                                values.primaryAddress.currentAddressEnergySupplierElectricity.memberSince + ''
                            )) ? (
                            <Row>
                                <Col xs={12} sm={12}>
                                    <small className={'text-danger'}>
                                        Huidige energie leverancier gegevens wordt alleen opgeslagen als Klant bij
                                        leverancier sinds is ingevuld.
                                    </small>
                                </Col>
                            </Row>
                        ) : (
                            ''
                        )}
                        <Row>
                            <Col xs={12} sm={12} md={8}>
                                <Field name="primaryAddress.currentAddressEnergySupplierElectricity.energySupplierId">
                                    {({ field }) => (
                                        <Select
                                            field={field}
                                            errors={errors}
                                            touched={touched}
                                            id="energy_supplier_id"
                                            placeholder={'Selecteer uw leverancier'}
                                            options={EnergySuppliers}
                                            customOnChange={e => {
                                                setFieldValue(
                                                    'primaryAddress.currentAddressEnergySupplierElectricity.energySupplierId',
                                                    e.target.value
                                                );
                                                setFieldValue(
                                                    'primaryAddress.currentAddressEnergySupplierElectricity.esNumber',
                                                    ''
                                                );
                                                setFieldValue(
                                                    'primaryAddress.currentAddressEnergySupplierElectricity.memberSince',
                                                    ''
                                                );
                                            }}
                                        />
                                    )}
                                </Field>
                            </Col>
                        </Row>

                        {values.primaryAddress.currentAddressEnergySupplierElectricity &&
                        values.primaryAddress.currentAddressEnergySupplierElectricity.energySupplierId ? (
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
                                        <Field name="primaryAddress.currentAddressEnergySupplierElectricity.esNumber">
                                            {({ field }) => (
                                                <InputText
                                                    field={field}
                                                    errors={errors}
                                                    touched={touched}
                                                    id="es_number"
                                                    placeholder={'Klant nummer bij leverancier'}
                                                />
                                            )}
                                        </Field>
                                    </Col>
                                </Row>

                                <FormLabel htmlFor="member_since" className={'field-label'}>
                                    Klant bij leverancier sinds
                                </FormLabel>
                                <Row>
                                    <Col xs={12} sm={12} md={8}>
                                        <Field name="primaryAddress.currentAddressEnergySupplierElectricity.memberSince">
                                            {({ field }) => (
                                                <InputTextDate
                                                    field={field}
                                                    type="date"
                                                    errors={errors}
                                                    touched={touched}
                                                    onChangeAction={setFieldValue}
                                                    min={memberSinceDisabledBefore}
                                                    max={memberSinceDisabledAfter}
                                                    id="member_since"
                                                    placeholder={'Klant sinds'}
                                                />
                                            )}
                                        </Field>
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

export default DefaultContactPersonalEdit;
