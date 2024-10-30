import React from 'react';
import InputText from '../../../components/form/InputText';
import { Field } from 'formik';
import Select from '../../../components/form/Select';
import Countries from '../../../data/Countries';
import EnergySuppliers from '../../../data/EnergySuppliers';
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

const DefaultContactOrganisationEdit = function({
    portalSettings,
    initialContact,
    freeFieldsFieldRecords,
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
        <>
            <Row>
                <Col xs={12} md={6}>
                    <FormLabel className={'field-label required'}>Naam</FormLabel>
                    <Row>
                        <Col xs={12} sm={8}>
                            <Field name="organisation.name">
                                {({ field }) => (
                                    <InputText
                                        field={field}
                                        errors={errors}
                                        touched={touched}
                                        id="name"
                                        placeholder={'Naam'}
                                        disabled={initialContact.disableChangeContactNameOnPortal}
                                    />
                                )}
                            </Field>
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

                    <FormLabel className={'field-label required'}>KvK</FormLabel>
                    <Row>
                        <Col xs={12} sm={8}>
                            <Field name="organisation.chamberOfCommerceNumber">
                                {({ field }) => (
                                    <InputText
                                        field={field}
                                        errors={errors}
                                        touched={touched}
                                        id="chamber_of_commerce_number"
                                        placeholder={'KvK'}
                                    />
                                )}
                            </Field>
                        </Col>
                    </Row>

                    <FormLabel className={'field-label'}>BTW nummer</FormLabel>
                    <Row>
                        <Col xs={12} sm={8}>
                            <Field name="organisation.vatNumber">
                                {({ field }) => (
                                    <InputText
                                        field={field}
                                        errors={errors}
                                        touched={touched}
                                        id="vat_number"
                                        placeholder={'BTW nummer'}
                                    />
                                )}
                            </Field>
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

                    <FormLabel className={'field-label'}>Website</FormLabel>
                    <Row>
                        <Col xs={12} sm={8}>
                            <Field name="organisation.website">
                                {({ field }) => (
                                    <InputText
                                        field={field}
                                        errors={errors}
                                        touched={touched}
                                        id="website"
                                        placeholder={'Website'}
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
                    {(isEmpty(values.visitAddress.number + '') || isEmpty(values.visitAddress.postalCode + '')) &&
                    (!isEmpty(values.visitAddress.street + '') ||
                        !isEmpty(values.visitAddress.number + '') ||
                        !isEmpty(values.visitAddress.addition + '') ||
                        !isEmpty(values.visitAddress.postalCode + '') ||
                        !isEmpty(values.visitAddress.city + '')) ? (
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
                            <Field name="visitAddress.street">
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
                            <Field name="visitAddress.number">
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
                            <Field name="visitAddress.addition">
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
                            <Field name="visitAddress.postalCode">
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
                            <Field name="visitAddress.city">
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
                            <Field name="visitAddress.countryId">
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
                            {(isEmpty(values.visitAddress.number + '') ||
                                isEmpty(values.visitAddress.postalCode + '')) &&
                            !isEmpty(values.visitAddress.eanElectricity + '') ? (
                                <Row>
                                    <Col xs={12} sm={12}>
                                        <small className={'text-danger'}>
                                            EAN nummer elektriciteit wordt alleen opgeslagen als minimaal nummer en
                                            postcode zijn ingevuld bij bezoekadres.
                                        </small>
                                    </Col>
                                </Row>
                            ) : (
                                ''
                            )}
                            <Row>
                                <Col xs={12} sm={12} md={8}>
                                    <Field name="visitAddress.eanElectricity">
                                        {({ field }) => (
                                            <InputText
                                                field={field}
                                                errors={errors}
                                                touched={touched}
                                                id="ean_electricity"
                                                placeholder={'EAN nummer elektriciteit'}
                                            />
                                        )}
                                    </Field>
                                </Col>
                            </Row>

                            <FormLabel htmlFor="ean_gas" className={'field-label'}>
                                EAN nummer gas
                            </FormLabel>
                            {(isEmpty(values.visitAddress.number + '') ||
                                isEmpty(values.visitAddress.postalCode + '')) &&
                            !isEmpty(values.visitAddress.eanGas + '') ? (
                                <Row>
                                    <Col xs={12} sm={12}>
                                        <small className={'text-danger'}>
                                            EAN nummer gas wordt alleen opgeslagen als minimaal nummer en postcode zijn
                                            ingevuld bij bezoekadres.
                                        </small>
                                    </Col>
                                </Row>
                            ) : (
                                ''
                            )}
                            <Row>
                                <Col xs={12} sm={12} md={8}>
                                    <Field name="visitAddress.eanGas">
                                        {({ field }) => (
                                            <InputText
                                                field={field}
                                                errors={errors}
                                                touched={touched}
                                                id="ean_gas"
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
                            {(isEmpty(values.visitAddress.number + '') ||
                                isEmpty(values.visitAddress.postalCode + '')) &&
                            (!isEmpty(
                                values.visitAddress.currentAddressEnergySupplierElectricity.energySupplierId + ''
                            ) ||
                                !isEmpty(values.visitAddress.currentAddressEnergySupplierElectricity.esNumber + '') ||
                                !isEmpty(
                                    values.visitAddress.currentAddressEnergySupplierElectricity.memberSince + ''
                                )) ? (
                                <Row>
                                    <Col xs={12} sm={12}>
                                        <small className={'text-danger'}>
                                            Huidige energie leverancier gegevens wordt alleen opgeslagen als minimaal
                                            nummer en postcode zijn ingevuld bij bezoekadres.
                                        </small>
                                    </Col>
                                </Row>
                            ) : (
                                ''
                            )}
                            {isEmpty(values.visitAddress.currentAddressEnergySupplierElectricity.memberSince + '') &&
                            (!isEmpty(
                                values.visitAddress.currentAddressEnergySupplierElectricity.energySupplierId + ''
                            ) ||
                                !isEmpty(values.visitAddress.currentAddressEnergySupplierElectricity.esNumber + '') ||
                                !isEmpty(
                                    values.visitAddress.currentAddressEnergySupplierElectricity.memberSince + ''
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
                                    <Field name="visitAddress.currentAddressEnergySupplierElectricity.energySupplierId">
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
                                    </Field>
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
                                            <Field name="visitAddress.currentAddressEnergySupplierElectricity.esNumber">
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
                                            <Field name="visitAddress.currentAddressEnergySupplierElectricity.memberSince">
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

                    <FormLabel htmlFor="street" className="field-label">
                        Postadres
                    </FormLabel>
                    {(isEmpty(values.postalAddress.number + '') || isEmpty(values.postalAddress.postalCode + '')) &&
                    (!isEmpty(values.postalAddress.street + '') ||
                        !isEmpty(values.postalAddress.addition + '') ||
                        !isEmpty(values.postalAddress.postalCode + '') ||
                        !isEmpty(values.postalAddress.city + '')) ? (
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
                            <Field name="postalAddress.street">
                                {({ field }) => (
                                    <InputText
                                        field={field}
                                        errors={errors}
                                        touched={touched}
                                        id="street"
                                        placeholder={'Straat'}
                                    />
                                )}
                            </Field>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={4}>
                            <Field name="postalAddress.number">
                                {({ field }) => (
                                    <InputText
                                        field={field}
                                        errors={errors}
                                        touched={touched}
                                        id="street_number"
                                        placeholder={'Nummer'}
                                    />
                                )}
                            </Field>
                        </Col>
                        <Col xs={12} sm={4}>
                            <Field name="postalAddress.addition">
                                {({ field }) => (
                                    <InputText
                                        field={field}
                                        errors={errors}
                                        touched={touched}
                                        id="addition"
                                        placeholder={'Toevoeging'}
                                    />
                                )}
                            </Field>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={4}>
                            <Field name="postalAddress.postalCode">
                                {({ field }) => (
                                    <InputText
                                        field={field}
                                        errors={errors}
                                        touched={touched}
                                        id="postal_code"
                                        placeholder={'Postcode'}
                                    />
                                )}
                            </Field>
                        </Col>
                        <Col xs={12} sm={8}>
                            <Field name="postalAddress.city">
                                {({ field }) => (
                                    <InputText
                                        field={field}
                                        errors={errors}
                                        touched={touched}
                                        id="city"
                                        placeholder={'Plaats'}
                                    />
                                )}
                            </Field>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={8}>
                            <Field name="postalAddress.countryId">
                                {({ field }) => (
                                    <Select
                                        field={field}
                                        errors={errors}
                                        touched={touched}
                                        id="country_id"
                                        placeholder={'Selecteer uw land'}
                                        options={Countries}
                                    />
                                )}
                            </Field>
                        </Col>
                    </Row>
                    <FormLabel htmlFor="street" className="field-label">
                        Nota adres
                    </FormLabel>
                    {(isEmpty(values.invoiceAddress.number + '') || isEmpty(values.invoiceAddress.postalCode + '')) &&
                    (!isEmpty(values.invoiceAddress.street + '') ||
                        !isEmpty(values.invoiceAddress.number + '') ||
                        !isEmpty(values.invoiceAddress.addition + '') ||
                        !isEmpty(values.invoiceAddress.postalCode + '') ||
                        !isEmpty(values.invoiceAddress.city + '')) ? (
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
                            <Field name="invoiceAddress.street">
                                {({ field }) => (
                                    <InputText
                                        field={field}
                                        errors={errors}
                                        touched={touched}
                                        id="street"
                                        placeholder={'Straat'}
                                    />
                                )}
                            </Field>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={4}>
                            <Field name="invoiceAddress.number">
                                {({ field }) => (
                                    <InputText
                                        field={field}
                                        errors={errors}
                                        touched={touched}
                                        id="street_number"
                                        placeholder={'Nummer'}
                                    />
                                )}
                            </Field>
                        </Col>
                        <Col xs={12} sm={4}>
                            <Field name="invoiceAddress.addition">
                                {({ field }) => (
                                    <InputText
                                        field={field}
                                        errors={errors}
                                        touched={touched}
                                        id="addition"
                                        placeholder={'Toevoeging'}
                                    />
                                )}
                            </Field>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={4}>
                            <Field name="invoiceAddress.postalCode">
                                {({ field }) => (
                                    <InputText
                                        field={field}
                                        errors={errors}
                                        touched={touched}
                                        id="postal_code"
                                        placeholder={'Postcode'}
                                    />
                                )}
                            </Field>
                        </Col>
                        <Col xs={12} sm={8}>
                            <Field name="invoiceAddress.city">
                                {({ field }) => (
                                    <InputText
                                        field={field}
                                        errors={errors}
                                        touched={touched}
                                        id="city"
                                        placeholder={'Plaats'}
                                    />
                                )}
                            </Field>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={8}>
                            <Field name="invoiceAddress.countryId">
                                {({ field }) => (
                                    <Select
                                        field={field}
                                        errors={errors}
                                        touched={touched}
                                        id="country_id"
                                        placeholder={'Selecteer uw land'}
                                        options={Countries}
                                    />
                                )}
                            </Field>
                        </Col>
                    </Row>
                </Col>
            </Row>
            {/* FreeFields Section */}
            <Row>
                <Col xs={12}>
                    <FreeFields
                        freeFieldsFieldRecords={freeFieldsFieldRecords}
                        showEdit={true}
                        touched={touched}
                        errors={errors}
                        setFieldValue={setFieldValue}
                        values={values}
                        layout="single"
                    />
                </Col>
            </Row>
        </>
    );
};

export default DefaultContactOrganisationEdit;
