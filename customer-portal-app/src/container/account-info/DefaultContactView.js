import React from 'react';
import Col from 'react-bootstrap/Col';
import FormLabel from 'react-bootstrap/FormLabel';
import TextBlock from '../../components/general/TextBlock';
import Row from 'react-bootstrap/Row';
import moment from 'moment';

function DefaultContactView({ initialContact }) {
    const {
        person = {},
        emailAddresses,
        phoneNumbers,
        addresses = [],
        iban,
        ibanAttn,
        didAgreeAvg,
        number,
        contactEnergySuppliers = [],
    } = initialContact;

    const emailCorrespondence = emailAddresses.find(emailAddress => emailAddress.primary);
    const emailInvoice = emailAddresses.find(emailAddress => emailAddress.type === 'invoice');

    const phoneNumberPrimary = phoneNumbers.find(phoneNumber => phoneNumber.primary);
    const phoneNumberTwo = phoneNumbers.filter(phoneNumber => phoneNumber.primary)[0];

    const addressPrimary = addresses ? addresses[0] : {};
    const energySupplierCurrent = contactEnergySuppliers ? contactEnergySuppliers[0] : {};

    return (
        <Row>
            <Col xs={12} md={6}>
                <FormLabel className={'field-label'}>Naam</FormLabel>
                <Row>
                    <TextBlock className={'col-12 col-sm-4'} placeholder={'Aanhef'}>
                        {person.titleId}
                    </TextBlock>
                </Row>
                <Row>
                    <TextBlock className={'col-12 col-sm-6'} placeholder={'Voornaam'}>
                        {person.firstName}
                    </TextBlock>
                    <TextBlock className={'col-12 col-sm-4 '} placeholder={'Initialen'}>
                        {person.initials}
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
                <Row>
                    <TextBlock className={'col-12 col-sm-4'} placeholder={'Geboortedatum'}>
                        {person.dateOfBirth}
                    </TextBlock>
                </Row>

                <FormLabel className={'field-label'}>E-mailadres correspondentie</FormLabel>
                <Row>
                    <TextBlock className={'col-12 col-sm-8'}>
                        {emailCorrespondence ? emailCorrespondence.email : ''}
                    </TextBlock>
                </Row>

                <FormLabel className={'field-label'}>E-mailadres factuur</FormLabel>
                <Row>
                    <TextBlock className={'col-12 col-sm-8'}>{emailInvoice ? emailInvoice.email : ''}</TextBlock>
                </Row>

                <FormLabel className={'field-label'}>Telefoonnummer 1</FormLabel>
                <Row>
                    <TextBlock className={'col-12 col-sm-6'}>
                        {phoneNumberPrimary ? phoneNumberPrimary.number : ''}
                    </TextBlock>
                </Row>

                <FormLabel className={'field-label'}>Telefoonnummer 2</FormLabel>
                <Row>
                    <TextBlock className={'col-12 col-sm-6'}>{phoneNumberTwo ? phoneNumberTwo.number : ''}</TextBlock>
                </Row>

                <FormLabel className={'field-label'}>Adres</FormLabel>
                <Row>
                    <TextBlock className={'col-12 col-sm-4'} placeholder={'Straat'}>
                        {addressPrimary.street}
                    </TextBlock>
                </Row>
                <Row>
                    <TextBlock className={'col-12 col-sm-4'} placeholder={'Nummer'}>
                        {addressPrimary.number}
                    </TextBlock>
                    <TextBlock className={'col-6 col-sm-4 '} placeholder={'Toevoeging'}>
                        {addressPrimary.addition}
                    </TextBlock>
                </Row>
                <Row>
                    <TextBlock className={'col-12 col-sm-4'} placeholder={'Postcode'}>
                        {addressPrimary.postalCode}
                    </TextBlock>
                    <TextBlock className={'col-12 col-sm-6'} placeholder={'Plaats'}>
                        {addressPrimary.city}
                    </TextBlock>
                </Row>
                <Row>
                    <TextBlock className={'col-12 col-sm-8'} placeholder={'Land'}>
                        {addressPrimary.countryId}
                    </TextBlock>
                </Row>
            </Col>
            <Col xs={12} md={6}>
                <FormLabel className={'field-label'}>Rekeningnummer</FormLabel>
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

                <FormLabel className={'field-label'}>Akkoord privacy beleid</FormLabel>
                <Row>
                    <TextBlock className={'col-12 col-sm-8'}>
                        <input
                            type="checkbox"
                            id="did_agree_avg"
                            checked={didAgreeAvg}
                            className="w-checkbox-input checkbox"
                        />
                        <span htmlFor="did_agree_avg" className="checkbox-label w-form-label">
                            Akkoord
                        </span>
                    </TextBlock>
                </Row>

                <FormLabel className={'field-label'}>Contactnummer</FormLabel>
                <Row>
                    <TextBlock className={'col-12 col-sm-8'}>{number}</TextBlock>
                </Row>

                <FormLabel className={'field-label'}>Energieleverancier</FormLabel>
                {energySupplierCurrent ? (
                    <Row>
                        <div className="current_es_wrapper col-12">
                            <h3 id="current_es_id" className="h3">
                                {energySupplierCurrent.energySupplier.name}
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
                                    {energySupplierCurrent.memberSince
                                        ? moment(energySupplierCurrent.memberSince).format('L')
                                        : ''}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormLabel>EAN nummer electriciteit</FormLabel>
                                </Col>
                                <Col>{energySupplierCurrent.eanElectricity}</Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormLabel>Klant nummer</FormLabel>
                                </Col>
                                <Col>{energySupplierCurrent.esNumber}</Col>
                            </Row>
                        </div>
                    </Row>
                ) : (
                    <Row>
                        <TextBlock className={'col-12 col-sm-8'} />
                    </Row>
                )}
            </Col>
        </Row>
    );
}

export default DefaultContactView;
