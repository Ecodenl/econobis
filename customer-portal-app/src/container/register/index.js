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
import PortalSettingsAPI from '../../api/portal-settings/PortalSettingsAPI';

function RegisterProject({ match, currentSelectedContact }) {
    const initialRegisterValues = {
        contactId: null,
        projectId: null,
        participationsOptioned: 0,
        powerKwhConsumption: 0,
        amountOptioned: 0,
        didAcceptAgreement: false,
        didUnderstandInfo: false,
    };

    const initialPcrValues = {
        pcrYearlyPowerKwhConsumption: 0,
        pcrPostalCode: '',
        pcrHasSolarPanels: 'N',
        pcrInputGeneratedNumberOfKwh: 0,
        pcrEstimatedRevenueOk: 'Y',
    };

    const [registerValues, setRegisterValues] = useState(initialRegisterValues);

    const [project, setProject] = useState({});
    const [contact, setContact] = useState({});
    const [portalSettings, setPortalSettings] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [isSucces, setSucces] = useState(false);
    const [isRegistered, setRegistered] = useState(false);

    useEffect(() => {
        (function callFetchProject() {
            setLoading(true);

            const keys =
                '?keys[]=portalWebsite&keys[]=portalUrl&keys[]=backgroundColor&keys[]=responsibleUserId&keys[]=checkContactTaskResponsibleUserId&keys[]=documentTemplateAgreementId&keys[]=emailTemplateAgreementId&keys[]=linkPrivacyPolicy&keys[]=linkAgreeTerms&keys[]=linkUnderstandInfo';
            PortalSettingsAPI.fetchPortalSettings(keys)
                .then(payload => {
                    setPortalSettings({ ...payload.data });
                })
                .catch(error => {
                    this.setState({ isLoading: false, hasError: true });
                });

            ProjectAPI.fetchProject(match.params.id)
                .then(payload => {
                    setProject(payload.data.data);
                    // setLoading(false);
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

                        console.log(project.projectType.codeRef);
                        if (
                            project &&
                            project.projectType &&
                            project.projectType.codeRef === 'postalcode_link_capital'
                        ) {
                            let pcrPostalCode = '';
                            if (contactData.typeId === 'organisation') {
                                pcrPostalCode = contactData.visitAddress ? contactData.visitAddress.postalCode : '';
                            } else {
                                pcrPostalCode = contactData.primaryAddress ? contactData.primaryAddress.postalCode : '';
                            }
                            setRegisterValues({
                                ...registerValues,
                                projectId: match.params.id,
                                contactId: currentSelectedContact.id,
                                ...initialPcrValues,
                                pcrPostalCode,
                            });
                        } else {
                            setRegisterValues({
                                ...registerValues,
                                projectId: match.params.id,
                                contactId: currentSelectedContact.id,
                            });
                        }

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

    // function handleSubmitAdditionalPcrValues(values) {
    //     setAdditionalPcrValues({ ...additionalPcrValues, ...values });
    // }

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
                            portalSettings={portalSettings}
                            project={project}
                            initialRegisterValues={registerValues}
                            handleSubmitRegisterValues={handleSubmitRegisterValues}
                            // initialAdditionalPcrValues={additionalPcrValues}
                            // handleSubmitAdditionalPcrValues={handleSubmitAdditionalPcrValues}
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

export default function RegisterProjectWithContext(props) {
    return (
        <PortalUserConsumer>
            {({ currentSelectedContact }) => (
                <RegisterProject {...props} currentSelectedContact={currentSelectedContact} />
            )}
        </PortalUserConsumer>
    );
}
