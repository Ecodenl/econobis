import React from 'react';
import Col from 'react-bootstrap/Col';
import FormLabel from 'react-bootstrap/FormLabel';
import TextBlock from '../../../components/general/TextBlock';
import Row from 'react-bootstrap/Row';
import moment from 'moment';
import FreeFields from '../../../components/freeFields/FreeFields';

function DefaultContactPersonalView({ portalSettings, initialContact }) {
    const {
        id,
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
        isParticipantPcrProject,
        freeFieldsFieldRecords,
    } = initialContact;
    return (
        <Row>
            <Col xs={12} md={6}>
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
                    <TextBlock className={'col-12 col-sm-8'} placeholder={'Geboortedatum (dd-mm-jjjj)'}>
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
                        {primaryAddress.country ? primaryAddress.country.name : ''}
                    </TextBlock>
                </Row>

                <FreeFields freeFieldsFieldRecords={primaryAddress.freeFieldsFieldRecords} showEdit={false} />

                {isParticipantPcrProject ? (
                    <>
                        <FormLabel className={'field-label'}>EAN nummer elektriciteit</FormLabel>
                        <Row>
                            <TextBlock className={'col-12 col-sm-8'} placeholder={'EAN nummer elektriciteit'}>
                                {primaryAddress.eanElectricity}
                            </TextBlock>
                        </Row>
                        <FormLabel className={'field-label'}>EAN nummer gas</FormLabel>
                        <Row>
                            <TextBlock className={'col-12 col-sm-8'} placeholder={'EAN nummer gas'}>
                                {primaryAddress.eanGas}
                            </TextBlock>
                        </Row>
                    </>
                ) : (
                    ''
                )}
                <FormLabel className={'field-label'}>Contactnummer</FormLabel>
                <Row>
                    <TextBlock className={'col-12 col-sm-8'}>{number}</TextBlock>
                </Row>

                <FreeFields freeFieldsFieldRecords={freeFieldsFieldRecords} showEdit={false} />
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
                    <div className={'col-12 col-sm-8'}>
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
                                <em>({dateDidAgreeAvg ? ' ' + moment(dateDidAgreeAvg).format('L') : ''})</em>
                            ) : (
                                ''
                            )}
                        </span>
                    </div>
                </Row>

                <FormLabel className={'field-label'}>Huidige energie leverancier</FormLabel>
                <Row>
                    <TextBlock className={'col-12 col-sm-8'} placeholder={'Energieleverancier'}>
                        {primaryAddress.currentAddressEnergySupplierElectricity.energySupplier
                            ? primaryAddress.currentAddressEnergySupplierElectricity.energySupplier.name
                            : ''}
                    </TextBlock>
                </Row>

                {primaryAddress.currentAddressEnergySupplierElectricity &&
                primaryAddress.currentAddressEnergySupplierElectricity.energySupplierId ? (
                    <>
                        <FormLabel className={'field-label'}>Klant nummer bij leverancier</FormLabel>
                        <Row>
                            <TextBlock className={'col-12 col-sm-8'} placeholder={'Klant nummer'}>
                                {primaryAddress.currentAddressEnergySupplierElectricity.esNumber}
                            </TextBlock>
                        </Row>

                        <FormLabel className={'field-label'}>Klant bij leverancier sinds</FormLabel>
                        <Row>
                            <TextBlock className={'col-12 col-sm-8'} placeholder={'Klant sinds'}>
                                {primaryAddress.currentAddressEnergySupplierElectricity.memberSince
                                    ? moment(primaryAddress.currentAddressEnergySupplierElectricity.memberSince).format(
                                          'L'
                                      )
                                    : ''}
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
