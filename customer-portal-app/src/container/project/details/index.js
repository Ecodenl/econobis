import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProjectAPI from '../../../api/project/ProjectAPI';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import LoadingView from '../../../components/general/LoadingView';
import LoanDetails from './LoanDetails';
import ObligationDetails from './ObligationDetails';
import CapitalDetails from './CapitalDetails';
import PcrDetails from './PcrDetails';
import PortalSettingsAPI from '../../../api/portal-settings/PortalSettingsAPI';

function ProjectDetails({ match }) {
    const [portalSettings, setPortalSettings] = useState({});
    const [project, setProject] = useState({});
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const keys =
            '?keys[]=portalName&keys[]=portalWebsite&keys[]=portalUrl&keys[]=backgroundColor&keys[]=responsibleUserId&keys[]=checkContactTaskResponsibleUserId&keys[]=linkPrivacyPolicy';
        PortalSettingsAPI.fetchPortalSettings(keys)
            .then(payload => {
                setPortalSettings({ ...payload.data });
            })
            .catch(error => {
                this.setState({ isLoading: false, hasError: true });
            });

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

    function renderDetails() {
        switch (project.projectType.codeRef) {
            case 'loan':
                return <LoanDetails project={project} />;
            case 'obligation':
                return <ObligationDetails project={project} />;
            case 'capital':
                return <CapitalDetails project={project} />;
            case 'postalcode_link_capital':
                return <PcrDetails project={project} />;
            default:
                return null;
        }
    }

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

                    {renderDetails()}

                    <Row className={'mt-5'}>
                        <Col>
                            <p>
                                Meer informatie over dit project vind je{' '}
                                <a href={`${project.linkUnderstandInfo`} target="_blank">
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
