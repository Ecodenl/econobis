import React from 'react';
import Col from 'react-bootstrap/Col';
import FormLabel from 'react-bootstrap/FormLabel';
import TextBlock from '../../../components/general/TextBlock';
import Row from 'react-bootstrap/Row';
import moment from 'moment';

function DefaultContactOrganisationView({ portalSettings, initialContact }) {
    const {
        organisation = {},
        emailCorrespondence,
        emailInvoice,
        phoneNumberPrimary,
        phoneNumberTwo,
        visitAddress,
        postalAddress,
        invoiceAddress,
        iban,
        ibanAttn,
        didAgreeAvg,
        dateDidAgreeAvg,
        number,
        primaryContactEnergySupplier,
        primaryOccupations,
    } = initialContact;

    return (
        <Row>
            <Col xs={12} md={6}>
                <FormLabel className={'field-label'}>Contactnummer</FormLabel>
                <Row>
                    <TextBlock className={'col-12 col-sm-8'}>{number}</TextBlock>
                </Row>

                <FormLabel className={'field-label'}>Bedrijfsnaam</FormLabel>
                <Row>
                    <TextBlock className={'col-12 col-sm-8'} placeholder={'Bedrijfsnaam'}>
                        {organisation.name}
                    </TextBlock>
                </Row>

                <FormLabel className={'field-label'}>KvK</FormLabel>
                <Row>
                    <TextBlock className={'col-12 col-sm-8'} placeholder={'KvK'}>
                        {organisation.chamberOfCommerceNumber}
                    </TextBlock>
                </Row>

                <FormLabel className={'field-label'}>BTW nummer</FormLabel>
                <Row>
                    <TextBlock className={'col-12 col-sm-8'} placeholder={'BTW nummer'}>
                        {organisation.vatNumber}
                    </TextBlock>
                </Row>

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

                <FormLabel className={'field-label'}>Website</FormLabel>
                <Row>
                    <TextBlock className={'col-12 col-sm-8'} placeholder={'Website'}>
                        {organisation.website}
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
                                <em>({dateDidAgreeAvg ? moment(dateDidAgreeAvg.date).format('L') : ''})</em>
                            ) : (
                                ''
                            )}
                        </span>
                    </div>
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
            </Col>
            <Col xs={12} md={6}>
                <FormLabel className={'field-label'}>Postadres</FormLabel>
                <Row>
                    <TextBlock className={'col-12 col-sm-8'} placeholder={'Straat'}>
                        {postalAddress.street}
                    </TextBlock>
                </Row>
                <Row>
                    <TextBlock className={'col-12 col-sm-4'} placeholder={'Nummer'}>
                        {postalAddress.number}
                    </TextBlock>
                    <TextBlock className={'col-6 col-sm-4 '} placeholder={'Toevoeging'}>
                        {postalAddress.addition}
                    </TextBlock>
                </Row>
                <Row>
                    <TextBlock className={'col-12 col-sm-4'} placeholder={'Postcode'}>
                        {postalAddress.postalCode}
                    </TextBlock>
                    <TextBlock className={'col-12 col-sm-6'} placeholder={'Plaats'}>
                        {postalAddress.city}
                    </TextBlock>
                </Row>
                <Row>
                    <TextBlock className={'col-12 col-sm-8'} placeholder={'Land'}>
                        {postalAddress.country ? postalAddress.country.name : ''}
                    </TextBlock>{' '}
                </Row>
                <FormLabel className={'field-label'}>Bezoekadres</FormLabel>
                <Row>
                    <TextBlock className={'col-12 col-sm-8'} placeholder={'Straat'}>
                        {visitAddress.street}
                    </TextBlock>
                </Row>
                <Row>
                    <TextBlock className={'col-12 col-sm-4'} placeholder={'Nummer'}>
                        {visitAddress.number}
                    </TextBlock>
                    <TextBlock className={'col-6 col-sm-4 '} placeholder={'Toevoeging'}>
                        {visitAddress.addition}
                    </TextBlock>
                </Row>
                <Row>
                    <TextBlock className={'col-12 col-sm-4'} placeholder={'Postcode'}>
                        {visitAddress.postalCode}
                    </TextBlock>
                    <TextBlock className={'col-12 col-sm-6'} placeholder={'Plaats'}>
                        {visitAddress.city}
                    </TextBlock>
                </Row>
                <Row>
                    <TextBlock className={'col-12 col-sm-8'} placeholder={'Land'}>
                        {visitAddress.country ? visitAddress.country.name : ''}
                    </TextBlock>
                </Row>
                <FormLabel className={'field-label'}>Nota adres</FormLabel>
                <Row>
                    <TextBlock className={'col-12 col-sm-8'} placeholder={'Straat'}>
                        {invoiceAddress.street}
                    </TextBlock>
                </Row>
                <Row>
                    <TextBlock className={'col-12 col-sm-4'} placeholder={'Nummer'}>
                        {invoiceAddress.number}
                    </TextBlock>
                    <TextBlock className={'col-6 col-sm-4 '} placeholder={'Toevoeging'}>
                        {invoiceAddress.addition}
                    </TextBlock>
                </Row>
                <Row>
                    <TextBlock className={'col-12 col-sm-4'} placeholder={'Postcode'}>
                        {invoiceAddress.postalCode}
                    </TextBlock>
                    <TextBlock className={'col-12 col-sm-6'} placeholder={'Plaats'}>
                        {invoiceAddress.city}
                    </TextBlock>
                </Row>
                <Row>
                    <TextBlock className={'col-12 col-sm-8'} placeholder={'Land'}>
                        {invoiceAddress.country ? invoiceAddress.country.name : ''}
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

                {/*<FormLabel className={'field-label'}>Contacten</FormLabel>*/}
                {/*{primaryOccupations ? (*/}
                {/*primaryOccupations.map(primaryOccupation => (*/}
                {/*<Row>*/}
                {/*<TextBlock className={'col-12 col-sm-4'} placeholder={'Contact naam'}>*/}
                {/*{primaryOccupation.contact.fullName}*/}
                {/*</TextBlock>*/}
                {/*<TextBlock className={'col-12 col-sm-4'} placeholder={'Contact verbinding'}>*/}
                {/*{primaryOccupation.occupation.primaryOccupation}*/}
                {/*</TextBlock>*/}
                {/*</Row>*/}
                {/*))*/}
                {/*) : (*/}
                {/*<Row>*/}
                {/*<TextBlock className={'col-12 col-sm-8'} />*/}
                {/*</Row>*/}
                {/*)}*/}
            </Col>
        </Row>
    );
}

export default DefaultContactOrganisationView;
