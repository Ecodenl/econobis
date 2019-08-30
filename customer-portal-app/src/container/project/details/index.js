import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProjectAPI from '../../../api/project/ProjectAPI';
import FormLabel from 'react-bootstrap/FormLabel';
import moment from 'moment';
import Skeleton from 'react-loading-skeleton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import LoadingBarRef from 'react-top-loading-bar';

function ProjectDetails({ match }) {
    const [project, setProject] = useState({});
    const [isLoading, setLoading] = useState(true);
    let LoadingBar = LoadingBarRef;

    function startFetch() {
        LoadingBar.continuousStart();
    }

    function onFinishFetch() {
        LoadingBar.complete();
    }

    useEffect(() => {
        (function callFetchProject() {
            setLoading(true);
            startFetch();
            ProjectAPI.fetchProject(match.params.id)
                .then(payload => {
                    setProject(payload.data.data);
                    setLoading(false);
                    onFinishFetch();
                })
                .catch(error => {
                    alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                    setLoading(false);
                    onFinishFetch();
                });
        })();
    }, [match]);

    return (
        <Container className={'content-section'}>
            <LoadingBar onRef={ref => (LoadingBar = ref)} height={3} color="orangered" />
            <Row>
                <Col>
                    <h1 className="content-heading">Inschrijven project</h1>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={6}>
                    <FormLabel>Project</FormLabel>
                    <p>{isLoading ? <Skeleton /> : project.name}</p>
                </Col>
                <Col xs={12} md={6}>
                    <FormLabel>Omschrijving project</FormLabel>
                    <p>{isLoading ? <Skeleton count={2} /> : project.description}</p>
                </Col>
                <Col xs={12} md={6}>
                    <FormLabel>Nominale waarde per participatie</FormLabel>
                    <p>{isLoading ? <Skeleton width={50} /> : project.participationWorth}</p>
                </Col>
                <Col xs={12} md={6}>
                    <FormLabel>Aantal participaties</FormLabel>
                    <p>{isLoading ? <Skeleton width={50} /> : project.totalParticipations}</p>
                </Col>
                <Col xs={12} md={6}>
                    <FormLabel>Minimaal aantal participaties per contact</FormLabel>
                    <p>{isLoading ? <Skeleton width={50} /> : project.minParticipations}</p>
                </Col>
                <Col xs={12} md={6}>
                    <FormLabel>Maximaal aantal participaties per contact</FormLabel>
                    <p>{isLoading ? <Skeleton width={50} /> : project.maxParticipations}</p>
                </Col>
                <Col xs={12} md={6}>
                    <FormLabel>Start inschrijving</FormLabel>

                    <p>
                        {isLoading ? (
                            <Skeleton width={100} />
                        ) : project.dateStartRegistrations ? (
                            moment(project.dateStartRegistrations).format('LL')
                        ) : (
                            ''
                        )}
                    </p>
                </Col>
                <Col xs={12} md={6}>
                    <FormLabel>Eind inschrijving</FormLabel>
                    <p>
                        {isLoading ? (
                            <Skeleton width={100} />
                        ) : project.dateEndRegistrations ? (
                            moment(project.dateEndRegistrations).format('LL')
                        ) : (
                            ''
                        )}
                    </p>
                </Col>
            </Row>
            <Row>
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
            <Row className="justify-content-end">
                <ButtonGroup aria-label="Steps">
                    <Link to={`/inschrijven/${project.id}`}>
                        <Button className={'w-button'} size="sm">
                            Ga naar inschrijven
                        </Button>
                    </Link>
                </ButtonGroup>
            </Row>
        </Container>
    );
}

export default ProjectDetails;
