import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import LoadingView from '../../../components/general/LoadingView';
import { PortalUserConsumer } from '../../../context/PortalUserContext';
import moment from 'moment';
import { Link } from 'react-router-dom';
import QuotationRequestAPI from '../../../api/quotation-request/QuotationRequestAPI';

function Inspectlist(props) {
    const [quotationRequestsArray, setQuotationRequestsArray] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        QuotationRequestAPI.fetchAll(props.user.id).then(response => {
            setQuotationRequestsArray(response.data);

            setIsLoading(false);
        });
    }, [props.user]);

    return (
        <Container className={'content-section'}>
            <Row>
                <Col>
                    <h1 className="content-heading">Overzicht schouwingen</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    {isLoading ? (
                        <LoadingView />
                    ) : quotationRequestsArray.length === 0 ? (
                        'Geen schouwingen beschikbaar.'
                    ) : (
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Naam</th>
                                    <th>Adres</th>
                                    <th>Status</th>
                                    <th>Datum afspraak</th>
                                    <th>Datum opname</th>
                                    <th>Datum akkoord extern</th>
                                    <th>Datum offerte</th>
                                    <th>Akkoord projectleider</th>
                                    <th>Akkoord bewoner</th>
                                </tr>
                            </thead>
                            <tbody>
                                {quotationRequestsArray.map(quotationRequest => (
                                    <tr key={quotationRequest.id}>
                                        <td>{quotationRequest.opportunity.intake.contact.fullName}</td>
                                        <td>
                                            <Link to={`/schouwen/${quotationRequest.id}`}>
                                                {quotationRequest.opportunity.intake.address.streetPostalCodeCity}
                                            </Link>
                                        </td>
                                        <td>{quotationRequest.opportunity.status.name}</td>
                                        <td>
                                            {quotationRequest.datePlanned
                                                ? moment(quotationRequest.datePlanned).format('L HH:mm')
                                                : ''}
                                        </td>
                                        <td>
                                            {quotationRequest.dateRecorded
                                                ? moment(quotationRequest.dateRecorded).format('L HH:mm')
                                                : ''}
                                        </td>
                                        <td>
                                            {quotationRequest.dateApprovedExternal
                                                ? moment(quotationRequest.dateApprovedExternal).format('L')
                                                : ''}
                                        </td>
                                        <td>
                                            {quotationRequest.dateReleased
                                                ? moment(quotationRequest.dateReleased).format('L')
                                                : ''}
                                        </td>
                                        <td>
                                            {quotationRequest.dateApprovedProjectManager
                                                ? moment(quotationRequest.dateApprovedProjectManager).format('L')
                                                : ''}
                                        </td>
                                        <td>
                                            {quotationRequest.dateApprovedClient
                                                ? moment(quotationRequest.dateApprovedClient).format('L')
                                                : ''}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default function InspectlistWithContext(props) {
    return <PortalUserConsumer>{({ user }) => <Inspectlist {...props} user={user} />}</PortalUserConsumer>;
}
