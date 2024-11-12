import React, { useState, useEffect, useContext } from 'react';
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
import { ThemeSettingsContext } from '../../../context/ThemeSettingsContext';
import { PortalUserContext } from '../../../context/PortalUserContext';
import { isEmpty } from 'lodash';
import fileDownload from 'js-file-download';
import { FaFileDownload } from 'react-icons/all';

function ProjectDetails({ match }) {
    const { setCurrentThemeSettings } = useContext(ThemeSettingsContext);
    const { currentSelectedContact } = useContext(PortalUserContext);
    const [project, setProject] = useState({});
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (currentSelectedContact.id) {
            (function callFetchProject() {
                setLoading(true);
                ProjectAPI.fetchProject(match.params.id)
                    .then(payload => {
                        setProject(payload.data.data);
                        setCurrentThemeSettings(payload.data.data.administration.portalSettingsLayoutAssigned);
                        setLoading(false);
                    })
                    .catch(error => {
                        alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                        setLoading(false);
                    });
            })();
        }
    }, [match, currentSelectedContact]);

    function downloadFile(e, id, filename) {
        e.preventDefault();

        ProjectAPI.documentDownload(project.id, id)
            .then(payload => {
                fileDownload(payload.data, filename);
            })
            .catch(() => {
                alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
            });
    }

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
    if (isEmpty(project)) {
        return (
            <div className={'content-section'}>
                <div className="content-container w-container">
                    {isLoading ? (
                        <LoadingView />
                    ) : (
                        <Row>
                            <Col>
                                <p>Geen projectdetails bekend</p>
                            </Col>
                        </Row>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className={'content-section'}>
            {isLoading ? (
                <LoadingView />
            ) : (
                <>
                    <div className="content-container w-container">
                        <Row>
                            <ButtonGroup aria-label="project-details" className="w-button-group-left">
                                <Link to={`/inschrijven-projecten`}>
                                    <Button className={'w-button'} size="sm">
                                        Inschrijven projecten
                                    </Button>
                                </Link>
                            </ButtonGroup>
                        </Row>

                        <Row>
                            <Col>
                                <h1 className="content-heading">Inschrijven project</h1>
                                <div className="content-subheading">Organisatie {project.administration.name}</div>
                            </Col>
                        </Row>

                        {renderDetails()}

                        <Row className={'mt-5'}>
                            <Col>
                                <p>
                                    {project.documentProjectInfo ? (
                                        <>
                                            {'Meer informatie over dit project kan je hier '}
                                            <a
                                                href="#"
                                                onClick={e =>
                                                    downloadFile(
                                                        e,
                                                        project.documentProjectInfo.id,
                                                        project.documentProjectInfo.filename
                                                    )
                                                }
                                            >
                                                <FaFileDownload /> downloaden
                                            </a>
                                        </>
                                    ) : project.linkProjectInfo != null ? (
                                        <>
                                            {'Meer informatie over dit project vind je '}
                                            <a href={`${project.linkProjectInfo}`} target="_blank">
                                                hier
                                            </a>
                                        </>
                                    ) : null}
                                </p>
                                <p>Wil je inschrijven op dit project. Klik dan op "Ga naar inschrijven".</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <ButtonGroup className="float-right">
                                    <Link to={`/inschrijven/nieuw/${project.id}`}>
                                        <Button className={'w-button'} size="sm">
                                            Ga naar inschrijven
                                        </Button>
                                    </Link>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </div>
                </>
            )}
        </div>
    );
}

export default ProjectDetails;
