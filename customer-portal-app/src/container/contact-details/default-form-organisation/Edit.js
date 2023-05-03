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
import { FaInfoCircle } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';
import InputTextDate from '../../../components/form/InputTextDate';

const DefaultContactOrganisationEdit = function({
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
    if (initialContact.visitAddress.currentAddressEnergySupplierElectricity.energySupplierId) {
        if (
            initialContact.visitAddress.currentAddressEnergySupplierElectricity.memberSince &&
            initialContact.visitAddress.currentAddressEnergySupplierElectricity.energySupplierId !==
                values.visitAddress.currentAddressEnergySupplierElectricity.energySupplierId
        ) {
            memberSinceDisabledBefore = moment(
                initialContact.visitAddress.currentAddressEnergySupplierElectricity.memberSince
            )
                .add(1, 'day')
                .format('YYYY-MM-DD');
        } else if (initialContact.visitAddress.currentAddressEnergySupplierElectricity.endDatePrevious) {
            memberSinceDisabledBefore = moment(
                initialContact.visitAddress.currentAddressEnergySupplierElectricity.endDatePrevious
            )
                .add(1, 'day')
                .format('YYYY-MM-DD');
        }
        if (initialContact.visitAddress.currentAddressEnergySupplierElectricity.memberSinceNext) {
            memberSinceDisabledAfter = moment(
                initialContact.visitAddress.currentAddressEnergySupplierElectricity.memberSinceNext
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
                                    disabled={initialContact.disableChangeContactNameOnPortal}
                                />
                            )}
                        />
                    </Col>
                    <Col xs={12} sm={4}>
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

                <FormLabel className={'field-label'}>Contactnummer</FormLabel>
                <Row>
                    <TextBlock className={'col-12 col-sm-8'}>{values.number}</TextBlock>
                </Row>
            </Col>

            <Col xs={12} md={6}>
                <FormLabel
                    htmlFor="street"
                    className={initialContact.isParticipant ? 'field-label required' : 'field-label'}
                >
                    Bezoekadres
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
                {((!isNaN(values.visitAddress.number) && values.visitAddress.number == 0) ||
                    (isNaN(values.visitAddress.number) && values.visitAddress.number.trim() == '') ||
                    values.visitAddress.postalCode.trim() == '') &&
                (values.visitAddress.street.trim() != '' ||
                    values.visitAddress.number.trim() != '' ||
                    values.visitAddress.addition.trim() != '' ||
                    values.visitAddress.postalCode.trim() != '' ||
                    values.visitAddress.city.trim() != '') ? (
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
                            name="visitAddress.street"
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
                            name="visitAddress.number"
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
                            name="visitAddress.addition"
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
                            name="visitAddress.postalCode"
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
                            name="visitAddress.city"
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
                            name="visitAddress.countryId"
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
                {((!isNaN(values.visitAddress.number) && values.visitAddress.number == 0) ||
                    (isNaN(values.visitAddress.number) && values.visitAddress.number.trim() == '') ||
                    values.visitAddress.postalCode.trim() == '') &&
                values.visitAddress.eanElectricity != null &&
                values.visitAddress.eanElectricity.trim() != '' ? (
                    <Row>
                        <Col xs={12} sm={12}>
                            <small className={'text-danger'}>
                                EAN nummer electriciteit wordt alleen opgeslagen als minimaal nummer en postcode zijn
                                ingevuld bij bezoekadres.
                            </small>
                        </Col>
                    </Row>
                ) : (
                    ''
                )}
                <Row>
                    <Col xs={12} sm={12} md={8}>
                        <Field
                            name="visitAddress.eanElectricity"
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

                <FormLabel htmlFor="ean_gas" className={'field-label'}>
                    EAN nummer gas
                </FormLabel>
                {((!isNaN(values.visitAddress.number) && values.visitAddress.number == 0) ||
                    (isNaN(values.visitAddress.number) && values.visitAddress.number.trim() == '') ||
                    values.visitAddress.postalCode.trim() == '') &&
                values.visitAddress.eanGas != null &&
                values.visitAddress.eanGas.trim() != '' ? (
                    <Row>
                        <Col xs={12} sm={12}>
                            <small className={'text-danger'}>
                                EAN nummer gas wordt alleen opgeslagen als minimaal nummer en postcode zijn ingevuld bij
                                bezoekadres.
                            </small>
                        </Col>
                    </Row>
                ) : (
                    ''
                )}
                <Row>
                    <Col xs={12} sm={12} md={8}>
                        <Field
                            name="visitAddress.eanGas"
                            render={({ field }) => (
                                <InputText
                                    field={field}
                                    errors={errors}
                                    touched={touched}
                                    id="ean_gas"
                                    placeholder={'EAN nummer gas'}
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
                                initialContact.isParticipantPcrProject ||
                                projectTypeCodeRef === 'postalcode_link_capital'
                                    ? 'field-label required'
                                    : 'field-label'
                            }
                        >
                            Huidige energie leverancier
                        </FormLabel>
                        {((!isNaN(values.visitAddress.number) && values.visitAddress.number == 0) ||
                            (isNaN(values.visitAddress.number) && values.visitAddress.number.trim() == '') ||
                            values.visitAddress.postalCode.trim() == '') &&
                        (values.visitAddress.currentAddressEnergySupplierElectricity.energySupplierId != null ||
                            (values.visitAddress.currentAddressEnergySupplierElectricity.esNumber &&
                                values.visitAddress.currentAddressEnergySupplierElectricity.esNumber.trim() != '') ||
                            (values.visitAddress.currentAddressEnergySupplierElectricity.memberSince &&
                                values.visitAddress.currentAddressEnergySupplierElectricity.memberSince.trim() !=
                                    '')) ? (
                            <Row>
                                <Col xs={12} sm={12}>
                                    <small className={'text-danger'}>
                                        Huidige energie leverancier gegevens wordt alleen opgeslagen als minimaal nummer
                                        en postcode zijn ingevuld bij bezoekadres.
                                    </small>
                                </Col>
                            </Row>
                        ) : (
                            ''
                        )}
                        {(!values.visitAddress.currentAddressEnergySupplierElectricity.memberSince ||
                            values.visitAddress.currentAddressEnergySupplierElectricity.memberSince.trim() == '') &&
                        ((values.visitAddress.currentAddressEnergySupplierElectricity.energySupplierId != null &&
                            values.visitAddress.currentAddressEnergySupplierElectricity.energySupplierId != '') ||
                            (values.visitAddress.currentAddressEnergySupplierElectricity.esNumber &&
                                values.visitAddress.currentAddressEnergySupplierElectricity.esNumber.trim() != '') ||
                            (values.visitAddress.currentAddressEnergySupplierElectricity.memberSince &&
                                values.visitAddress.currentAddressEnergySupplierElectricity.memberSince.trim() !=
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
                                    name="visitAddress.currentAddressEnergySupplierElectricity.energySupplierId"
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
                                                    'visitAddress.currentAddressEnergySupplierElectricity.energySupplierId',
                                                    e.target.value
                                                );
                                                setFieldValue(
                                                    'visitAddress.currentAddressEnergySupplierElectricity.esNumber',
                                                    ''
                                                );
                                                setFieldValue(
                                                    'visitAddress.currentAddressEnergySupplierElectricity.memberSince',
                                                    ''
                                                );
                                            }}
                                        />
                                    )}
                                />
                            </Col>
                        </Row>

                        {values.visitAddress.currentAddressEnergySupplierElectricity &&
                        values.visitAddress.currentAddressEnergySupplierElectricity.energySupplierId ? (
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
                                            name="visitAddress.currentAddressEnergySupplierElectricity.esNumber"
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
                                            name="visitAddress.currentAddressEnergySupplierElectricity.memberSince"
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

                <FormLabel htmlFor="street" className="field-label">
                    Postadres
                </FormLabel>
                {((!isNaN(values.postalAddress.number) && values.postalAddress.number == 0) ||
                    (isNaN(values.postalAddress.number) && values.postalAddress.number.trim() == '') ||
                    values.postalAddress.postalCode.trim() == '') &&
                (values.postalAddress.street.trim() != '' ||
                    values.postalAddress.number.trim() != '' ||
                    values.postalAddress.addition.trim() != '' ||
                    values.postalAddress.postalCode.trim() != '' ||
                    values.postalAddress.city.trim() != '') ? (
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
                <FormLabel htmlFor="street" className="field-label">
                    Nota adres
                </FormLabel>
                {((!isNaN(values.invoiceAddress.number) && values.invoiceAddress.number == 0) ||
                    (isNaN(values.invoiceAddress.number) && values.invoiceAddress.number.trim() == '') ||
                    values.invoiceAddress.postalCode.trim() == '') &&
                (values.invoiceAddress.street.trim() != '' ||
                    values.invoiceAddress.number.trim() != '' ||
                    values.invoiceAddress.addition.trim() != '' ||
                    values.invoiceAddress.postalCode.trim() != '' ||
                    values.invoiceAddress.city.trim() != '') ? (
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
            </Col>
        </Row>
    );
};

export default DefaultContactOrganisationEdit;
