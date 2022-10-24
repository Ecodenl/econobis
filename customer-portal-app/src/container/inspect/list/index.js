import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import LoadingView from '../../../components/general/LoadingView';
import {PortalUserConsumer} from '../../../context/PortalUserContext';
import ContactAPI from "../../../api/contact/ContactAPI";

function ProjectList(props) {
    const [quotationRequestsArray, setQuotationRequestsArray] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        ContactAPI.fetchQuotationRequests(props.user.id).then((response) => {
            setQuotationRequestsArray(response.data);

            setIsLoading(false);
        });
    }, [props.user]);

    return (
        <Container className={'content-section'}>
            <Row>
                <Col>
                    <h1 className="content-heading">
                        Overzicht schouwingen
                    </h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    {isLoading ? (
                        <LoadingView/>
                    ) : quotationRequestsArray.length === 0 ? (
                        'Geen schouwingen beschikbaar.'
                    ) : (
                        <Table responsive>
                            <thead>
                            <tr>
                                <th>Naam</th>
                                <th>Adres</th>
                                <th>Datum afspraak</th>
                                <th>Datum opname</th>
                                <th>Status</th>
                                <th>Datum akkoord extern</th>
                                <th>Datum offerte</th>
                                <th>Akkoord projectleider</th>
                                <th>Akkoord bewoner</th>
                            </tr>
                            </thead>
                            <tbody>
                            {quotationRequestsArray.map(quotationRequest => (
                                <tr key={quotationRequest.id} >
                                    <td>{ quotationRequest.opportunity.intake.contact.fullName }</td>
                                    <td>{ quotationRequest.opportunity.intake.address.streetPostalCodeCity }</td>
                                    <td></td>
                                    <td></td>
                                    <td>{ quotationRequest.opportunity.status.name }</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
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

export default function ProjectListWithContext(props) {
    return (
        <PortalUserConsumer>
            {({user}) => <ProjectList {...props} user={user}/>}
        </PortalUserConsumer>
    );
}
