import React, { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProjectAPI from '../../../api/project/ProjectAPI';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
import LoadingView from '../../../components/general/LoadingView';
import ContactAPI from '../../../api/contact/ContactAPI';
import { PortalUserConsumer } from '../../../context/PortalUserContext';

function ProjectList(props) {
    const [contactProjectsArray, setContactProjectsArray] = useState([]);
    const [projectData, setProjectData] = useState({});
    const [isLoading, setLoading] = useState(true);
    const prevCurrentSelectedContact = usePrevious(props.currentSelectedContact);

    useEffect(() => {
        (function callFetchProjects() {
            setLoading(true);
            // Call Api if current selected contact id is filled
            if (props.currentSelectedContact.id) {
                // If there is no previous selected contact OR previous selected contact is not the same as current selected contact
                if (!prevCurrentSelectedContact || prevCurrentSelectedContact.id != props.currentSelectedContact.id) {
                    callFetchContactProjects();
                }
            }
            ProjectAPI.fetchProjects()
                .then(payload => {
                    setProjectData(payload.data.data);
                    setLoading(false);
                })
                .catch(error => {
                    alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                    setLoading(false);
                });
        })();
    }, [props.currentSelectedContact]);

    function callFetchContactProjects() {
        ContactAPI.fetchContactWithParticipants(props.currentSelectedContact.id)
            .then(payload => {
                let contactProjecten = [];
                payload.data.data.participations.map(item => contactProjecten.push(item.project.id));
                setContactProjectsArray(contactProjecten);
            })
            .catch(error => {
                alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                setLoading(false);
            });
    }

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    return (
        <Container className={'content-section'}>
            <Row>
                <Col>
                    <h1 className="content-heading">Overzicht projecten waarop je kan inschrijven.</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>Klik op het project voor meer details.</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    {isLoading ? (
                        <LoadingView />
                    ) : projectData.length === 0 ? (
                        'Geen projecten beschikbaar om op in te schrijven.'
                    ) : (
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Project</th>
                                    <th>Ingeschreven</th>
                                    <th>Start inschrijving</th>
                                    <th>Einde inschrijving</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projectData.map(project => (
                                    <tr key={project.id}>
                                        <td>
                                            {contactProjectsArray.includes(project.id) ? (
                                                project.name
                                            ) : (
                                                <Link to={`/project/${project.id}`}>{project.name}</Link>
                                            )}
                                        </td>
                                        <td>
                                            {contactProjectsArray.includes(project.id) ? (
                                                <div className="text-success text-center">✔</div>
                                            ) : (
                                                ''
                                            )}
                                        </td>
                                        <td>
                                            {project.dateStartRegistrations
                                                ? moment(project.dateStartRegistrations).format('LL')
                                                : ''}
                                        </td>
                                        <td>
                                            {project.dateEndRegistrations
                                                ? moment(project.dateEndRegistrations).format('LL')
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

export default function ProjectListWithContext(props) {
    return (
        <PortalUserConsumer>
            {({ currentSelectedContact }) => <ProjectList {...props} currentSelectedContact={currentSelectedContact} />}
        </PortalUserConsumer>
    );
}
