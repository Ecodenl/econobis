import React from 'react';
import Col from 'react-bootstrap/Col';
import FormLabel from 'react-bootstrap/FormLabel';
import TextBlock from '../../../components/general/TextBlock';
import Row from 'react-bootstrap/Row';
import moment from 'moment';

function DefaultContactOrganisationView({ initialContact }) {
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

                <FormLabel className={'field-label'}>Website</FormLabel>
                <Row>
                    <TextBlock className={'col-12 col-sm-8'} placeholder={'Website'}>
                        {organisation.website}
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
                            disabled={true}
                        />
                        <span htmlFor="did_agree_avg" className="checkbox-label w-form-label">
                            Akkoord
                        </span>
                    </TextBlock>
                </Row>

                <FormLabel className={'field-label'}>E-mailadres correspondentie</FormLabel>
                <Row>
                    <TextBlock className={'col-12 col-sm-8'} placeholder={'E-mailadres'}>
                        {emailCorrespondence.email}
                    </TextBlock>
                </Row>

                <FormLabel className={'field-label'}>E-mailadres factuur</FormLabel>
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
                <FormLabel className={'field-label'}>Bezoekadres{visitAddress.primary ? ' (primair)' : ''}</FormLabel>
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
                        {visitAddress.countryId}
                    </TextBlock>
                </Row>
                <FormLabel className={'field-label'}>Postadres{postalAddress.primary ? ' (primair)' : ''}</FormLabel>
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
                        {postalAddress.countryId}
                    </TextBlock>
                </Row>
                <FormLabel className={'field-label'}>
                    Factuur adres{invoiceAddress.primary ? ' (primair)' : ''}
                </FormLabel>
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
                        {invoiceAddress.countryId}
                    </TextBlock>
                </Row>
                <FormLabel className={'field-label'}>Energieleverancier</FormLabel>
                {primaryContactEnergySupplier ? (
                    <Row>
                        <div className="current_es_wrapper col-12">
                            <h3 id="current_es_id" className="h3">
                                {primaryContactEnergySupplier.energySupplier.name}
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
                                    {primaryContactEnergySupplier.memberSince
                                        ? moment(primaryContactEnergySupplier.memberSince).format('L')
                                        : ''}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormLabel>EAN nummer electriciteit</FormLabel>
                                </Col>
                                <Col>{primaryContactEnergySupplier.eanElectricity}</Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormLabel>Klant nummer</FormLabel>
                                </Col>
                                <Col>{primaryContactEnergySupplier.esNumber}</Col>
                            </Row>
                        </div>
                    </Row>
                ) : (
                    <Row>
                        <TextBlock className={'col-12 col-sm-8'} />
                    </Row>
                )}
                <FormLabel className={'field-label'}>Contacten</FormLabel>
                {primaryOccupations ? (
                    primaryOccupations.map(primaryOccupation => (
                        <Row>
                            <TextBlock className={'col-12 col-sm-4'} placeholder={'Contact naam'}>
                                {primaryOccupation.contact.fullName}
                                {primaryOccupation.primary ? '*' : ''}
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
                <p>
                    <i>* Primair contact</i>
                </p>
            </Col>
        </Row>
    );
}

export default DefaultContactOrganisationView;
