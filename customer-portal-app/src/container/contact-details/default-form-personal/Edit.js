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
    if (initialContact.primaryAddress.primaryAddressEnergySupplierElectricity.energySupplierId) {
        if (
            initialContact.primaryAddress.primaryAddressEnergySupplierElectricity.memberSince &&
            initialContact.primaryAddress.primaryAddressEnergySupplierElectricity.energySupplierId !==
                values.primaryAddress.primaryAddressEnergySupplierElectricity.energySupplierId
        ) {
            memberSinceDisabledBefore = moment(
                initialContact.primaryAddress.primaryAddressEnergySupplierElectricity.memberSince
            )
                .add(1, 'day')
                .format('YYYY-MM-DD');
        } else if (initialContact.primaryAddress.primaryAddressEnergySupplierElectricity.endDatePrevious) {
            memberSinceDisabledBefore = moment(
                initialContact.primaryAddress.primaryAddressEnergySupplierElectricity.endDatePrevious
            )
                .add(1, 'day')
                .format('YYYY-MM-DD');
        }
        if (initialContact.primaryAddress.primaryAddressEnergySupplierElectricity.memberSinceNext) {
            memberSinceDisabledAfter = moment(
                initialContact.primaryAddress.primaryAddressEnergySupplierElectricity.memberSinceNext
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
                                    disabled={initialContact.disableChangeContactNameOnPortal}
                                />
                            )}
                        />
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
                        <Field
                            name="person.initials"
                            render={({ field }) => (
                                <InputText
                                    field={field}
                                    errors={errors}
                                    touched={touched}
                                    id="initials"
                                    placeholder={'Initialen'}
                                    disabled={initialContact.disableChangeContactNameOnPortal}
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
                                    disabled={initialContact.disableChangeContactNameOnPortal}
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
                                    disabled={initialContact.disableChangeContactNameOnPortal}
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
                                    disabled={initialContact.disableChangeContactNameOnPortal}
                                />
                            )}
                        />
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
                        <Field
                            name="person.dateOfBirth"
                            render={({ field }) => (
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
                {((!isNaN(values.primaryAddress.number) && values.primaryAddress.number == 0) ||
                    (isNaN(values.primaryAddress.number) && values.primaryAddress.number.trim() == '') ||
                    values.primaryAddress.postalCode.trim() == '') &&
                (values.primaryAddress.street.trim() != '' ||
                    values.primaryAddress.number.trim() != '' ||
                    values.primaryAddress.addition.trim() != '' ||
                    values.primaryAddress.postalCode.trim() != '' ||
                    values.primaryAddress.city.trim() != '') ? (
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
                        <Field
                            name="primaryAddress.street"
                            render={({ field }) => (
                                <InputText
                                    field={field}
                                    errors={errors}
                                    touched={touched}
                                    id="street"
                                    placeholder={'Straat'}
                                    disabled={initialContact.blockChangeAddress}
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
                                    disabled={
                                        initialContact.blockChangeAddress || initialContact.blockChangeAddressNumber
                                    }
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
                                    disabled={
                                        initialContact.blockChangeAddress || initialContact.blockChangeAddressNumber
                                    }
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
                                    disabled={
                                        initialContact.blockChangeAddress ||
                                        initialContact.isParticipantSceProject ||
                                        initialContact.isParticipantPcrProject
                                    }
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
                                    disabled={initialContact.blockChangeAddress}
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
                                    disabled={initialContact.blockChangeAddress}
                                />
                            )}
                        />
                    </Col>
                </Row>
                <FormLabel
                    htmlFor="ean_electricity"
                    className={
                        projectTypeCodeRef === 'postalcode_link_capital' ? 'field-label required' : 'field-label'
                    }
                >
                    EAN nummer electriciteit
                </FormLabel>
                {((!isNaN(values.primaryAddress.number) && values.primaryAddress.number == 0) ||
                    (isNaN(values.primaryAddress.number) && values.primaryAddress.number.trim() == '') ||
                    values.primaryAddress.postalCode.trim() == '') &&
                values.primaryAddress.eanElectricity != null &&
                values.primaryAddress.eanElectricity.trim() != '' ? (
                    <Row>
                        <Col xs={12} sm={12}>
                            <small className={'text-danger'}>
                                EAN nummer electriciteit wordt alleen opgeslagen als minimaal nummer en postcode zijn
                                ingevuld bij adres.
                            </small>
                        </Col>
                    </Row>
                ) : (
                    ''
                )}
                <Row>
                    <Col xs={12} sm={10} md={6}>
                        <Field
                            name="primaryAddress.eanElectricity"
                            render={({ field }) => (
                                <InputText
                                    field={field}
                                    errors={errors}
                                    touched={touched}
                                    id="eanElectricity"
                                    placeholder={'EAN nummer electriciteit'}
                                />
                            )}
                        />
                    </Col>
                </Row>
                <FormLabel htmlFor="ean_gas" className={'field-label'}>
                    EAN nummer gas
                </FormLabel>
                {((!isNaN(values.primaryAddress.number) && values.primaryAddress.number == 0) ||
                    (isNaN(values.primaryAddress.number) && values.primaryAddress.number.trim() == '') ||
                    values.primaryAddress.postalCode.trim() == '') &&
                values.primaryAddress.eanGas != null &&
                values.primaryAddress.eanGas.trim() != '' ? (
                    <Row>
                        <Col xs={12} sm={12}>
                            <small className={'text-danger'}>
                                EAN nummer gas wordt alleen opgeslagen als minimaal nummer en postcode zijn ingevuld bij
                                adres.
                            </small>
                        </Col>
                    </Row>
                ) : (
                    ''
                )}
                <Row>
                    <Col xs={12} sm={10} md={6}>
                        <Field
                            name="primaryAddress.eanGas"
                            render={({ field }) => (
                                <InputText
                                    field={field}
                                    errors={errors}
                                    touched={touched}
                                    id="eanGas"
                                    placeholder={'EAN nummer gas'}
                                />
                            )}
                        />
                    </Col>
                </Row>

                <FormLabel className={'field-label'}>Contactnummer</FormLabel>
                <Row>
                    <TextBlock className={'col-12 col-sm-8'}>{values.number}</TextBlock>
                </Row>
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
                        <Field
                            name="iban"
                            render={({ field }) => (
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
                                        value={false}
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
                        {((!isNaN(values.primaryAddress.number) && values.primaryAddress.number == 0) ||
                            (isNaN(values.primaryAddress.number) && values.primaryAddress.number.trim() == '') ||
                            values.primaryAddress.postalCode.trim() == '') &&
                        (values.primaryAddress.primaryAddressEnergySupplierElectricity.energySupplierId != null ||
                            (values.primaryAddress.primaryAddressEnergySupplierElectricity.esNumber &&
                                values.primaryAddress.primaryAddressEnergySupplierElectricity.esNumber.trim() != '') ||
                            (values.primaryAddress.primaryAddressEnergySupplierElectricity.memberSince &&
                                values.primaryAddress.primaryAddressEnergySupplierElectricity.memberSince.trim() !=
                                    '')) ? (
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
                        {(!values.primaryAddress.primaryAddressEnergySupplierElectricity.memberSince ||
                            values.primaryAddress.primaryAddressEnergySupplierElectricity.memberSince.trim() == '') &&
                        ((values.primaryAddress.primaryAddressEnergySupplierElectricity.energySupplierId != null &&
                            values.primaryAddress.primaryAddressEnergySupplierElectricity.energySupplierId != '') ||
                            (values.primaryAddress.primaryAddressEnergySupplierElectricity.esNumber &&
                                values.primaryAddress.primaryAddressEnergySupplierElectricity.esNumber.trim() != '') ||
                            (values.primaryAddress.primaryAddressEnergySupplierElectricity.memberSince &&
                                values.primaryAddress.primaryAddressEnergySupplierElectricity.memberSince.trim() !=
                                    '')) ? (
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
                                <Field
                                    name="primaryAddress.primaryAddressEnergySupplierElectricity.energySupplierId"
                                    render={({ field }) => (
                                        <Select
                                            field={field}
                                            errors={errors}
                                            touched={touched}
                                            id="energy_supplier_id"
                                            placeholder={'Selecteer uw leverancier'}
                                            options={EnergySuppliers}
                                            customOnChange={e => {
                                                setFieldValue(
                                                    'primaryAddress.primaryAddressEnergySupplierElectricity.energySupplierId',
                                                    e.target.value
                                                );
                                                setFieldValue(
                                                    'primaryAddress.primaryAddressEnergySupplierElectricity.esNumber',
                                                    ''
                                                );
                                                setFieldValue(
                                                    'primaryAddress.primaryAddressEnergySupplierElectricity.memberSince',
                                                    ''
                                                );
                                            }}
                                        />
                                    )}
                                />
                            </Col>
                        </Row>

                        {values.primaryAddress.primaryAddressEnergySupplierElectricity &&
                        values.primaryAddress.primaryAddressEnergySupplierElectricity.energySupplierId ? (
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
                                            name="primaryAddress.primaryAddressEnergySupplierElectricity.esNumber"
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

                                <FormLabel htmlFor="member_since" className={'field-label'}>
                                    Klant bij leverancier sinds
                                </FormLabel>
                                <Row>
                                    <Col xs={12} sm={12} md={8}>
                                        <Field
                                            name="primaryAddress.primaryAddressEnergySupplierElectricity.memberSince"
                                            render={({ field }) => (
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

export default DefaultContactPersonalEdit;
