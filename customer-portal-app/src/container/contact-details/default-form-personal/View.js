import React from 'react';
import Col from 'react-bootstrap/Col';
import FormLabel from 'react-bootstrap/FormLabel';
import TextBlock from '../../../components/general/TextBlock';
import Row from 'react-bootstrap/Row';
import moment from 'moment';

function DefaultContactPersonalView({ portalSettings, initialContact }) {
    const {
        person = {},
        emailCorrespondence,
        emailInvoice,
        phoneNumberPrimary,
        phoneNumberTwo,
        primaryAddress,
        iban,
        ibanAttn,
        didAgreeAvg,
        dateDidAgreeAvg,
        number,
        primaryContactEnergySupplier,
    } = initialContact;
    return (
        <Row>
            <Col xs={12} md={6}>
                <FormLabel className={'field-label'}>Contactnummer</FormLabel>
                <Row>
                    <TextBlock className={'col-12 col-sm-8'}>{number}</TextBlock>
                </Row>

                <FormLabel className={'field-label'}>Naam</FormLabel>
                <Row>
                    <TextBlock className={'col-12 col-sm-6'} placeholder={'Aanhef'}>
                        {person.title ? person.title.name : ''}
                    </TextBlock>
                </Row>
                <Row>
                    <TextBlock className={'col-12 col-sm-4'} placeholder={'Initialen'}>
                        {person.initials}
                    </TextBlock>
                    <TextBlock className={'col-12 col-sm-8'} placeholder={'Voornaam'}>
                        {person.firstName}
                    </TextBlock>
                </Row>
                <Row>
                    <TextBlock className={'col-12 col-sm-4'} placeholder={'Tussenvoegsel'}>
                        {person.lastNamePrefix}
                    </TextBlock>
                    <TextBlock className={'col-12 col-sm-6'} placeholder={'Achternaam'}>
                        {person.lastName}
                    </TextBlock>
                </Row>
                <FormLabel className={'field-label'}>Geboortedatum</FormLabel>
                <Row>
                    <TextBlock className={'col-12 col-sm-6 col-md-4'} placeholder={'Geboortedatum'}>
                        {person.dateOfBirth ? moment(person.dateOfBirth).format('L') : ''}
                    </TextBlock>
                </Row>

                <FormLabel className={'field-label'}>E-mailadres correspondentie</FormLabel>
                <Row>
                    <TextBlock className={'col-12 col-sm-8'} placeholder={'E-mailadres'}>
                        {emailCorrespondence.email}
                    </TextBlock>
                </Row>

                <FormLabel className={'field-label'}>E-mailadres nota</FormLabel>
                <Row>
                    <TextBlock className={'col-12 col-sm-8'} placeholder={'E-mailadres'}>
                        {emailInvoice.email}
                    </TextBlock>
                </Row>

                <FormLabel className={'field-label'}>Telefoonnummer 1</FormLabel>
                <Row>
                    <TextBlock className={'col-12 col-sm-6'} placeholder={'Telefoonnummer'}>
                        {phoneNumberPrimary.number}
                    </TextBlock>
                </Row>

                <FormLabel className={'field-label'}>Telefoonnummer 2</FormLabel>
                <Row>
                    <TextBlock className={'col-12 col-sm-6'} placeholder={'Telefoonnummer'}>
                        {phoneNumberTwo.number}
                    </TextBlock>
                </Row>

                <FormLabel className={'field-label'}>Adres</FormLabel>
                <Row>
                    <TextBlock className={'col-12 col-sm-8'} placeholder={'Straat'}>
                        {primaryAddress.street}
                    </TextBlock>
                </Row>
                <Row>
                    <TextBlock className={'col-12 col-sm-4'} placeholder={'Nummer'}>
                        {primaryAddress.number}
                    </TextBlock>
                    <TextBlock className={'col-6 col-sm-4 '} placeholder={'Toevoeging'}>
                        {primaryAddress.addition}
                    </TextBlock>
                </Row>
                <Row>
                    <TextBlock className={'col-12 col-sm-4'} placeholder={'Postcode'}>
                        {primaryAddress.postalCode}
                    </TextBlock>
                    <TextBlock className={'col-12 col-sm-6'} placeholder={'Plaats'}>
                        {primaryAddress.city}
                    </TextBlock>
                </Row>
                <Row>
                    <TextBlock className={'col-12 col-sm-8'} placeholder={'Land'}>
                        {primaryAddress.countryId}
                    </TextBlock>
                </Row>
            </Col>
            <Col xs={12} md={6}>
                <FormLabel className={'field-label'}>IBAN gegevens</FormLabel>
                <Row>
                    <TextBlock className={'col-12 col-sm-8'} placeholder={'Rekeningnummer (IBAN)'}>
                        {iban}
                    </TextBlock>
                </Row>
                <Row>
                    <TextBlock className={'col-12 col-sm-8'} placeholder={'IBAN te name van'}>
                        {ibanAttn}
                    </TextBlock>
                </Row>

                <FormLabel className={'field-label'}>Akkoord privacybeleid</FormLabel>
                <Row>
                    <TextBlock className={'col-12 col-sm-8'}>
                        <input
                            type="checkbox"
                            id="did_agree_avg"
                            checked={didAgreeAvg}
                            className="w-checkbox-input checkbox"
                            disabled={true}
                        />
                        <span htmlFor="did_agree_avg" className="checkbox-label w-form-label">
                            Ik ga akkoord met{' '}
                            <a href={portalSettings['linkPrivacyPolicy']} target="_blank">
                                privacybeleid
                            </a>{' '}
                            {didAgreeAvg ? (
                                <em>({dateDidAgreeAvg ? ' ' + moment(dateDidAgreeAvg.date).format('L') : ''})</em>
                            ) : (
                                ''
                            )}
                        </span>
                    </TextBlock>
                </Row>

                <FormLabel className={'field-label'}>Energieleverancier</FormLabel>
                <Row>
                    <TextBlock className={'col-12 col-sm-8'} placeholder={'Energieleverancier'}>
                        {primaryContactEnergySupplier.energySupplier
                            ? primaryContactEnergySupplier.energySupplier.name
                            : ''}
                    </TextBlock>
                </Row>

                {primaryContactEnergySupplier && primaryContactEnergySupplier.energySupplierId ? (
                    <>
                        <FormLabel className={'field-label'}>Klant nummer bij leverancier</FormLabel>
                        <Row>
                            <TextBlock className={'col-12 col-sm-8'} placeholder={'Klant nummer'}>
                                {primaryContactEnergySupplier.esNumber}
                            </TextBlock>
                        </Row>

                        <FormLabel className={'field-label'}>Klant bij leverancier sinds</FormLabel>
                        <Row>
                            <TextBlock className={'col-12 col-sm-8'} placeholder={'Klant sinds'}>
                                {primaryContactEnergySupplier.memberSince
                                    ? moment(primaryContactEnergySupplier.memberSince).format('L')
                                    : ''}
                            </TextBlock>
                        </Row>

                        <FormLabel className={'field-label'}>EAN nummer electriciteit</FormLabel>
                        <Row>
                            <TextBlock className={'col-12 col-sm-8'} placeholder={'EAN nummer electriciteit'}>
                                {primaryContactEnergySupplier.eanElectricity}
                            </TextBlock>
                        </Row>

                        <FormLabel className={'field-label'}>EAN nummer gas</FormLabel>
                        <Row>
                            <TextBlock className={'col-12 col-sm-8'} placeholder={'EAN nummer gas'}>
                                {primaryContactEnergySupplier.eanGas}
                            </TextBlock>
                        </Row>
                    </>
                ) : (
                    ''
                )}
            </Col>
        </Row>
    );
}

export default DefaultContactPersonalView;
