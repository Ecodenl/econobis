import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProjectAPI from '../../api/project/ProjectAPI';
import LoadingView from '../../components/general/LoadingView';
import ContactAPI from '../../api/contact/ContactAPI';
import rebaseContact from '../../helpers/RebaseContact';
import { PortalUserConsumer } from '../../context/PortalUserContext';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import MasterForm from './MasterForm';

function RegisterCapital({ match, currentSelectedContact }) {
    const [registerValues, setRegisterValues] = useState({
        contactId: null,
        projectId: null,
        participationsOptioned: 0,
        amountOptioned: 0,
        didAgreeTerms: false,
        didUnderstandInfo: false,
    });
    const [project, setProject] = useState({});
    const [contact, setContact] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [isSucces, setSucces] = useState(false);
    const [isRegistered, setRegistered] = useState(false);

    useEffect(() => {
        (function callFetchProject() {
            setLoading(true);
            ProjectAPI.fetchProject(match.params.id)
                .then(payload => {
                    setProject(payload.data.data);
                    setRegisterValues({
                        ...registerValues,
                        projectId: payload.data.data.id,
                        contactId: currentSelectedContact.id,
                    });
                    setLoading(false);
                })
                .catch(error => {
                    alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                    setLoading(false);
                });
        })();

        // If there is an id and is not the same as previous id
        // then call api
        if (currentSelectedContact.id) {
            (function callFetchContact() {
                setLoading(true);
                ContactAPI.fetchContact(currentSelectedContact.id)
                    .then(payload => {
                        const contactData = rebaseContact(payload.data.data);
                        setContact(contactData);
                        callFetchContactProjects();
                        setLoading(false);
                    })
                    .catch(error => {
                        alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                        setLoading(false);
                    });
            })();
        }
    }, [match, currentSelectedContact]);

    function callFetchContactProjects() {
        ContactAPI.fetchContactWithParticipants(currentSelectedContact.id)
            .then(payload => {
                let contactProjecten = [];
                payload.data.data.participations.map(item => contactProjecten.push(item.project.id));

                const projectId = match.params.id;

                if (contactProjecten.includes(Number(projectId))) {
                    setRegistered(true);
                } else {
                    setRegistered(false);
                }
            })
            .catch(error => {
                alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                setLoading(false);
            });
    }

    function handleSubmitRegisterValues(values) {
        setRegisterValues({ ...registerValues, ...values });
    }

    function handleSubmitContactValues(values, actions, nextStep) {
        const updatedContact = { ...contact, ...values };
        ContactAPI.updateContact(updatedContact)
            .then(payload => {
                ContactAPI.fetchContact(currentSelectedContact.id)
                    .then(payload => {
                        const contactData = rebaseContact(payload.data.data);

                        setContact(contactData);
                        nextStep();
                    })
                    .catch(error => {
                        alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                        setLoading(false);
                    });
            })
            .catch(error => {
                actions.setSubmitting(false);
                alert('Er is iets misgegaan met opslaan! Herlaad de pagina opnieuw.');
            });
    }

    return (
        <Container className={'content-section'}>
            {isLoading ? (
                <LoadingView />
            ) : isRegistered ? (
                <>
                    <Row>
                        <Col>
                            <h1 className="content-heading">
                                Je bent al ingeschreven voor project <strong>{project.name}</strong>
                            </h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={10}>
                            <ButtonGroup className="float-right">
                                <Link to={`/inschrijvingen-projecten`}>
                                    <Button className={'w-button'} size="sm">
                                        Naar mijn inschrijvingen
                                    </Button>
                                </Link>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </>
            ) : (
                <Row>
                    <Col>
                        {isSucces ? (
                            <h1 className="content-heading">
                                Ingeschreven voor project <strong>{project.name}</strong>
                            </h1>
                        ) : (
                            <h1 className="content-heading">
                                Schrijf je in voor project <strong>{project.name}</strong>
                            </h1>
                        )}
                        <MasterForm
                            project={project}
                            initialRegisterValues={registerValues}
                            handleSubmitRegisterValues={handleSubmitRegisterValues}
                            initialContact={contact}
                            handleSubmitContactValues={handleSubmitContactValues}
                            setSucces={setSucces}
                        />
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default function RegisterCapitalWithContext(props) {
    return (
        <PortalUserConsumer>
            {({ currentSelectedContact }) => (
                <RegisterCapital {...props} currentSelectedContact={currentSelectedContact} />
            )}
        </PortalUserConsumer>
    );
}
