import React, { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
import LoadingView from '../../../components/general/LoadingView';
import ContactAPI from '../../../api/contact/ContactAPI';
import { PortalUserConsumer } from '../../../context/PortalUserContext';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { FaInfoCircle } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';
import rebaseContact from '../../../helpers/RebaseContact';
import { Alert } from 'react-bootstrap';

function ProjectList(props) {
    const [contact, setContact] = useState({});
    const [contactProjectsArray, setContactProjectsArray] = useState([]);
    const [sceOrPcrProjectsAvailable, setSceOrPcrProjectsAvailable] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const prevCurrentSelectedContact = usePrevious(props.currentSelectedContact);

    useEffect(() => {
        (function callFetchProjects() {
            setLoading(true);
            // Call Api if current selected contact id is filled
            if (props.currentSelectedContact.id) {
                // If there is no previous selected contact OR previous selected contact is not the same as current selected contact
                if (!prevCurrentSelectedContact || prevCurrentSelectedContact.id != props.currentSelectedContact.id) {
                    callFetchContact();
                    callFetchContactProjects();
                }
            }
        })();
    }, [props.currentSelectedContact]);

    useEffect(() => {
        (function determineSceOrPcrProjectsAvailable() {
            if (contactProjectsArray.length > 0) {
                contactProjectsArray.find(function(project) {
                    return project.isSceOrPcrProject && setSceOrPcrProjectsAvailable(true);
                });
            }
        })();
    }, [contactProjectsArray.length > 0]);

    function callFetchContact() {
        setLoading(true);
        ContactAPI.fetchContact(props.currentSelectedContact.id)
            .then(payload => {
                const contactData = rebaseContact(payload.data.data);

                setContact(contactData);
            })
            .catch(error => {
                alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                setLoading(false);
            });
    }

    function callFetchContactProjects() {
        ContactAPI.fetchContactProjects(props.currentSelectedContact.id)
            .then(payload => {
                setContactProjectsArray(payload.data);
                setLoading(false);
            })
            .catch(error => {
                alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                setLoading(false);
            });
    }

    function formatFullName(fullName) {
        if (fullName) {
            if (fullName.search(',') < 0) {
                return fullName;
            } else {
                const firstName = fullName.slice(fullName.search(',') + 2);
                const lastName = fullName.slice(0, fullName.search(','));
                return firstName + ' ' + lastName;
            }
        } else {
            return ' ';
        }
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
                <ButtonGroup aria-label="Steps" className="float-left">
                    <Link to={`/gegevens`}>
                        <Button className={'w-button'} size="sm">
                            Gegevens
                        </Button>
                    </Link>
                    &nbsp;
                    <Link to={`/inschrijvingen-projecten`}>
                        <Button className={'w-button'} size="sm">
                            Huidige deelnames
                        </Button>
                    </Link>
                </ButtonGroup>
            </Row>
            <Row>
                <Col>
                    <h1 className="content-heading">
                        Overzicht projecten waarop{' '}
                        <strong>{formatFullName(props.currentSelectedContact.fullName)}</strong> kan inschrijven.
                    </h1>
                </Col>
            </Row>

            {sceOrPcrProjectsAvailable && contact.noAddressesFound && (
                <>
                    <Row>
                        <Col>
                            <div className="alert-wrapper">
                                <Alert key={'form-general-error-alert'} variant={'warning'}>
                                    Op dit moment zijn je adresgegevens nog niet bij ons bekend.
                                    <br />
                                    Er zijn projecten waarop je kan inschrijven die afhankelijk van je adres zijn.
                                </Alert>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ButtonGroup aria-label="Steps" className="float-right">
                                <Link to={`/gegevens`}>
                                    <Button className={'w-button'} size="sm">
                                        Adresgegevens toevoegen
                                    </Button>
                                </Link>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </>
            )}
            <>
                <Row>
                    <Col>
                        <p>Klik op het project voor meer details.</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {isLoading ? (
                            <LoadingView />
                        ) : contactProjectsArray.length === 0 ||
                          contactProjectsArray.find(
                              project =>
                                  project.allowRegisterToProject ||
                                  (!project.allowRegisterToProject && !project.hideWhenNotMatchingPostalCheck)
                          ) === undefined ? (
                            'Geen projecten beschikbaar om op in te schrijven.'
                        ) : (
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Uitgevende instantie</th>
                                        <th>Project</th>
                                        <th>Ingeschreven</th>
                                        <th>Start inschrijving</th>
                                        <th>Einde inschrijving</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contactProjectsArray.map(project => (
                                        <>
                                            {project.allowRegisterToProject ? (
                                                <tr key={project.id}>
                                                    <td>{project.administrationName}</td>
                                                    <td>
                                                        {project.allowChangeParticipation ? (
                                                            <>
                                                                {project.name} (
                                                                <Link to={`/project/${project.id}`}>
                                                                    wijzig inschrijving
                                                                </Link>
                                                                )
                                                            </>
                                                        ) : (
                                                            <>
                                                                {!project.hasParticipation &&
                                                                project.allowRegisterToProject ? (
                                                                    <Link to={`/project/${project.id}`}>
                                                                        {project.name}
                                                                    </Link>
                                                                ) : (
                                                                    <span className={'text-muted'}>{project.name}</span>
                                                                )}
                                                            </>
                                                        )}
                                                    </td>
                                                    <td>
                                                        {project.hasParticipation ? (
                                                            <>
                                                                {project.allowPayMollie ? (
                                                                    <div className="text-center">
                                                                        Nog niet betaald,
                                                                        <br />
                                                                        <a href={project.econobisPaymentLink}>
                                                                            betaal nu
                                                                        </a>
                                                                    </div>
                                                                ) : (
                                                                    <div className="text-success text-center">✔</div>
                                                                )}
                                                            </>
                                                        ) : (
                                                            <div className="text-center">
                                                                {!project.allowRegisterToProject ? (
                                                                    <>
                                                                        <FaInfoCircle
                                                                            color={'blue'}
                                                                            size={'15px'}
                                                                            data-tip={`${project.textNotAllowedRegisterToProject}`}
                                                                            data-for={`project-${project.id}`}
                                                                        />
                                                                        <ReactTooltip
                                                                            id={`project-${project.id}`}
                                                                            effect="float"
                                                                            place="bottom"
                                                                            multiline={true}
                                                                            aria-haspopup="true"
                                                                        />
                                                                    </>
                                                                ) : (
                                                                    ''
                                                                )}
                                                            </div>
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
                                            ) : !project.allowRegisterToProject &&
                                              !project.hideWhenNotMatchingPostalCheck ? (
                                                <tr key={project.id}>
                                                    <td>{project.administrationName}</td>
                                                    <td>
                                                        {project.allowChangeParticipation ? (
                                                            <>
                                                                {project.name} (
                                                                <Link to={`/project/${project.id}`}>
                                                                    wijzig inschrijving
                                                                </Link>
                                                                )
                                                            </>
                                                        ) : (
                                                            <>
                                                                {!project.hasParticipation &&
                                                                project.allowRegisterToProject ? (
                                                                    <Link to={`/project/${project.id}`}>
                                                                        {project.name}
                                                                    </Link>
                                                                ) : (
                                                                    <span className={'text-muted'}>{project.name}</span>
                                                                )}
                                                            </>
                                                        )}
                                                    </td>
                                                    <td>
                                                        {project.hasParticipation ? (
                                                            <>
                                                                {project.allowPayMollie ? (
                                                                    <div className="text-center">
                                                                        Nog niet betaald,
                                                                        <br />
                                                                        <a href={project.econobisPaymentLink}>
                                                                            betaal nu
                                                                        </a>
                                                                    </div>
                                                                ) : (
                                                                    <div className="text-success text-center">✔</div>
                                                                )}
                                                            </>
                                                        ) : (
                                                            <div className="text-center">
                                                                <FaInfoCircle
                                                                    color={'blue'}
                                                                    size={'15px'}
                                                                    data-tip={`${project.textNotAllowedRegisterToProject}`}
                                                                    data-for={`project-${project.id}`}
                                                                />
                                                                <ReactTooltip
                                                                    id={`project-${project.id}`}
                                                                    effect="float"
                                                                    place="bottom"
                                                                    multiline={true}
                                                                    aria-haspopup="true"
                                                                />
                                                            </div>
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
                                            ) : (
                                                <></>
                                            )}
                                        </>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </Col>
                </Row>
            </>
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
