import React, { useState, useEffect, useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoadingView from '../../../components/general/LoadingView';
import { PortalUserContext } from '../../../context/PortalUserContext';
import { Card, Table } from 'react-bootstrap';
import AdministrationAPI from '../../../api/administration/AdministrationAPI';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import AboutUsDocumentTable from './document-table';

function AboutUsAdministration({ match }) {
    const { currentSelectedContact } = useContext(PortalUserContext);
    const [administration, setAdministration] = useState({});
    const [websiteLink, setWebsiteLink] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (currentSelectedContact.id) {
            (function callFetchAdministration() {
                setLoading(true);
                // console.log(match);
                AdministrationAPI.fetchAdministration(match.params.id)
                    .then(payload => {
                        setAdministration(payload.data.data);
                        setLoading(false);
                    })
                    .catch(error => {
                        alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                        setLoading(false);
                    });
            })();
        }
    }, [match, currentSelectedContact]);

    useEffect(() => {
        if (administration.id && administration.website) {
            if (
                administration.website.toLowerCase().startsWith('http') ||
                administration.website.toLowerCase().startsWith('https')
            ) {
                setWebsiteLink(administration.website);
            } else {
                setWebsiteLink('https://' + administration.website);
            }
        }
    }, [administration]);

    return (
        <div className={'content-section'}>
            {isLoading ? (
                <LoadingView />
            ) : (
                <>
                    <div className="content-container w-container">
                        <Row>
                            <ButtonGroup aria-label="about-us" className="w-button-group-left">
                                <Link to={`/over-ons`}>
                                    <Button className={'w-button'} size="sm">
                                        Over ons
                                    </Button>
                                </Link>
                            </ButtonGroup>
                        </Row>

                        <Row className={'justify-content-center align-content-center flex-wrap'}>
                            <Col xs={12} lg={6} className={'mb-3'}>
                                <Card>
                                    <Card.Header className={'card-header_title'}>
                                        Informatie over {administration.name}
                                    </Card.Header>
                                    <Card.Body>
                                        <Table responsive>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <strong>Naam</strong>
                                                    </td>
                                                    <td>{administration.name}</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <strong>Adres</strong>
                                                    </td>
                                                    <td>{administration.address}</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <strong>Postcode / Plaats</strong>
                                                    </td>
                                                    <td>
                                                        {administration.postalCode} {administration.city}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <strong>Kvk</strong>
                                                    </td>
                                                    <td>{administration.kvkNumber}</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <strong>Website</strong>
                                                    </td>
                                                    <td>
                                                        {administration.website && (
                                                            <a href={websiteLink} target="_blank">
                                                                <button className="w-button btn btn-primary btn-sm">
                                                                    {administration.website}
                                                                </button>
                                                            </a>
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <strong>E-mail</strong>
                                                    </td>
                                                    <td>{administration.email}</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <strong>IBAN</strong>
                                                    </td>
                                                    <td>{administration.iBAN}</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <strong>IBAN t.n.v.</strong>
                                                    </td>
                                                    <td>{administration.ibanAttn}</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <strong>BTW nummer</strong>
                                                    </td>
                                                    <td>{administration.btwNumber}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                        <AboutUsDocumentTable
                            administrationId={match.params.id}
                            documents={administration.documentsOnPortal}
                        />
                    </div>
                </>
            )}
        </div>
    );
}

export default AboutUsAdministration;
