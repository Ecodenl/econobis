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
import OpportunityStatusAPI from "../../../api/opportunity-status/OpportunityStatusAPI";
import {get} from "lodash";

function Inspectlist(props) {
    const [quotationRequestsArray, setQuotationRequestsArray] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [statuses, setStatuses] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');

    useEffect(() => {
        QuotationRequestAPI.fetchAll(props.user.id).then(response => {
            setQuotationRequestsArray(response.data);

            setIsLoading(false);
        });

        OpportunityStatusAPI.fetchOpportunityStatus()
            .then(payload => {
                setStatuses(payload.data.data);
            });
    }, [props.user]);

    const getFilteredQuotationRequests = () => {
        if (statusFilter) {
            return quotationRequestsArray.filter(quotationRequest => {
                return quotationRequest.opportunity.status.id === parseInt(statusFilter);
            });
        }

        return quotationRequestsArray;
    }

    return (
        <Container className={'content-section'}>
            <Row>
                <Col>
                    <h1 className="content-heading">Overzicht buurtaanpak</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    {isLoading ? (
                        <LoadingView />
                    ) : quotationRequestsArray.length === 0 ? (
                        'Geen gegevens beschikbaar.'
                    ) : (
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Naam</th>
                                    <th>Adres</th>
                                    <th>Status</th>
                                    <th>Datum afspraak</th>
                                    <th>Datum opname</th>
                                    <th>Akkoord projectleider</th>
                                    <th>Datum uitgebracht</th>
                                    <th>Akkoord bewoner</th>
                                    <th>Datum akkoord extern</th>
                                </tr>
                                <tr>
                                    <th colSpan={2}></th>
                                    <th colSpan={1}>
                                        <select
                                            className="select-field w-select content"
                                            value={statusFilter}
                                            onChange={e => setStatusFilter(e.target.value)}
                                            style={{width: '150px'}}
                                        >
                                            <option/>
                                            {statuses.filter(status => {
                                                return status.active;
                                            }).map(option => {
                                                return (
                                                    <option key={option.id} value={option.id}>
                                                        {option.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </th>
                                    <th colSpan={6}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {getFilteredQuotationRequests().map(quotationRequest => (
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
                                            {quotationRequest.dateApprovedProjectManager
                                                ? moment(quotationRequest.dateApprovedProjectManager).format('L')
                                                : ''}
                                        </td>
                                        <td>
                                            {quotationRequest.dateReleased
                                                ? moment(quotationRequest.dateReleased).format('L HH:mm')
                                                : ''}
                                        </td>
                                        <td>
                                            {quotationRequest.dateApprovedClient
                                                ? moment(quotationRequest.dateApprovedClient).format('L')
                                                : ''}
                                        </td>
                                        <td>
                                            {quotationRequest.dateApprovedExternal
                                                ? moment(quotationRequest.dateApprovedExternal).format('L')
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
