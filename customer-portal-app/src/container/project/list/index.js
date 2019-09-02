import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProjectAPI from '../../../api/project/ProjectAPI';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
import LoadingView from '../../../components/general/LoadingView';

function ProjectList() {
    const [projectData, setProjectData] = useState({});
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        (function callFetchProjects() {
            setLoading(true);
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
    }, []);

    return (
        <Container className={'content-section'}>
            <Row>
                <Col>
                    <h1 className="content-heading">Overzicht projecten</h1>
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
                                    <th>Start inschrijving</th>
                                    <th>Einde inschrijving</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projectData.map(project => (
                                    <tr>
                                        <td>
                                            <Link to={`/project/${project.id}`}>{project.name}</Link>
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

export default ProjectList;
