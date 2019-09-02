import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProjectAPI from '../../../api/project/ProjectAPI';
import FormLabel from 'react-bootstrap/FormLabel';
import moment from 'moment';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import LoadingView from '../../../components/general/LoadingView';
import TextBlock from '../../../components/general/TextBlock';

function ProjectDetails({ match }) {
    const [project, setProject] = useState({});
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        (function callFetchProject() {
            setLoading(true);
            ProjectAPI.fetchProject(match.params.id)
                .then(payload => {
                    setProject(payload.data.data);
                    setLoading(false);
                })
                .catch(error => {
                    alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                    setLoading(false);
                });
        })();
    }, [match]);

    return (
        <Container className={'content-section'}>
            {isLoading ? (
                <LoadingView />
            ) : (
                <>
                    <Row>
                        <Col>
                            <h1 className="content-heading">Inschrijven project</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={6}>
                            <FormLabel>Project</FormLabel>
                            <TextBlock>{project.name}</TextBlock>
                        </Col>
                        <Col xs={12} md={6}>
                            <FormLabel>Omschrijving project</FormLabel>
                            <TextBlock>{project.description}</TextBlock>
                        </Col>
                        <Col xs={12} md={6}>
                            <FormLabel>Nominale waarde per participatie</FormLabel>
                            <TextBlock>{project.participationWorth}</TextBlock>
                        </Col>
                        <Col xs={12} md={6}>
                            <FormLabel>Aantal participaties</FormLabel>
                            <TextBlock>{project.totalParticipations}</TextBlock>
                        </Col>
                        <Col xs={12} md={6}>
                            <FormLabel>Minimaal aantal participaties per contact</FormLabel>
                            <TextBlock>{project.minParticipations}</TextBlock>
                        </Col>
                        <Col xs={12} md={6}>
                            <FormLabel>Maximaal aantal participaties per contact</FormLabel>
                            <TextBlock>{project.maxParticipations}</TextBlock>
                        </Col>
                        <Col xs={12} md={6}>
                            <FormLabel>Start inschrijving</FormLabel>
                            <TextBlock>
                                {project.dateStartRegistrations
                                    ? moment(project.dateStartRegistrations).format('LL')
                                    : ''}
                            </TextBlock>
                        </Col>
                        <Col xs={12} md={6}>
                            <FormLabel>Eind inschrijving</FormLabel>
                            <TextBlock>
                                {project.dateEndRegistrations ? moment(project.dateEndRegistrations).format('LL') : ''}
                            </TextBlock>
                        </Col>
                    </Row>
                    <Row className={'mt-5'}>
                        <Col>
                            <p>
                                Meer informatie over dit project vind je{' '}
                                <a href={'#'} target={'blank'}>
                                    hier
                                </a>
                            </p>
                            <p>Wil je inschrijven op dit project. Klik dan op "Ga naar inschrijven".</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ButtonGroup className="float-right">
                                <Link to={`/inschrijven/${project.id}`}>
                                    <Button className={'w-button'} size="sm">
                                        Ga naar inschrijven
                                    </Button>
                                </Link>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
}

export default ProjectDetails;
