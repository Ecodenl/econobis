import React, { useState, useEffect, useContext } from 'react';
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
import axios from 'axios';
import { ThemeSettingsContext } from '../../context/ThemeSettingsContext';
import { Alert } from 'react-bootstrap';
import ErrorPage from '../../components/general/ErrorPage';
import moment from 'moment';
import ParticipantProjectAPI from '../../api/participant-project/ParticipantProjectAPI';

function RegisterProject({ match, currentSelectedContact }) {
    const { setCurrentThemeSettings } = useContext(ThemeSettingsContext);

    const initialRegisterValues = {
        contactId: null,
        projectId: null,
        participationsOptioned: 0,
        powerKwhConsumption: 0,
        amountOptioned: 0,
        didAcceptAgreement: false,
        didUnderstandInfo: false,
        choiceMembership: 0,
    };

    const initialPcrValues = {
        pcrYearlyPowerKwhConsumption: 0,
        pcrPostalCode: '',
        pcrHasSolarPanels: 'N',
        pcrInputGeneratedNumberOfKwh: 0,
        pcrEstimatedRevenueOk: 'Y',
    };

    const [registerValues, setRegisterValues] = useState(initialRegisterValues);

    const [registerType, setRegisterType] = useState(null);
    const [projectId, setProjectId] = useState(null);
    const [participantId, setParticipantId] = useState(null);
    const [project, setProject] = useState({});
    const [contact, setContact] = useState({});
    const [portalSettings, setPortalSettings] = useState({});
    const [isLoading1, setIsLoading1] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);
    const [isLoading3, setIsLoading3] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isSucces, setSucces] = useState(false);
    const [contactProjectData, setContactProjectData] = useState({});

    const [currentStep, setStep] = useState(1);

    useEffect(() => {
        if (match.params) {
            const { registerType, id: projectId, participantId } = match.params;
            setRegisterType(registerType || null);
            setProjectId(projectId || null);
            setParticipantId(participantId || null);
        } else {
            setRegisterType(null);
            setProjectId(null);
            setParticipantId(null);
        }

        if (projectId && currentSelectedContact?.id) {
            callFetchPortalSettings();
            fetchContactAndProject();
        }
    }, [match, currentSelectedContact]);

    function goToPreviousStep() {
        setStep(currentStep <= 2 ? 1 : currentStep - 1);
    }

    function goToNextStep() {
        setStep(currentStep >= 4 ? 5 : currentStep + 1);
    }

    function callFetchPortalSettings() {
        setIsLoading1(true);

        const keys =
            '?keys[]=portalName' +
            '&keys[]=portalWebsite' +
            '&keys[]=portalUrl' +
            '&keys[]=responsibleUserId' +
            '&keys[]=checkContactTaskResponsibleUserId' +
            '&keys[]=linkPrivacyPolicy' +
            '&keys[]=pcrPowerKwhConsumptionPercentage' +
            '&keys[]=pcrGeneratingCapacityOneSolorPanel';
        PortalSettingsAPI.fetchPortalSettings(keys)
            .then(payload => {
                setPortalSettings({ ...payload.data });
                setIsLoading1(false);
            })
            .catch(error => {
                setHasError(true);
                setErrorMessage('Fout bij ophalen gegevens');
                setIsLoading1(false);
            });
    }

    function fetchContactAndProject() {
        setHasError(false);
        setErrorMessage(null);
        setIsLoading2(true);

        axios
            .all([
                ProjectAPI.fetchProject(projectId),
                ContactAPI.fetchContact(currentSelectedContact.id),
                ContactAPI.fetchContactProjectData(currentSelectedContact.id, projectId),
            ])
            .then(
                axios.spread((payloadProject, payloadContact, payloadContactProjectData) => {
                    if (
                        payloadProject.data.data.dateStartRegistrations === null ||
                        payloadProject.data.data.dateStartRegistrations > moment().format('YYYY-MM-DD') ||
                        (payloadProject.data.data.dateEndRegistrations !== null &&
                            payloadProject.data.data.dateEndRegistrations < moment().format('YYYY-MM-DD'))
                    ) {
                        setHasError(true);
                        setErrorMessage('Inschrijving niet mogelijk op dit moment');
                    } else {
                        const contact = payloadContact.data.data;
                        const project = payloadProject.data.data;
                        setProject(project);
                        setCurrentThemeSettings(project.administration.portalSettingsLayoutAssigned);
                        const contactData = rebaseContact(contact);
                        setContact(contactData);
                        setContactProjectData(payloadContactProjectData.data);

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
                                projectId: projectId,
                                contactId: currentSelectedContact.id,
                                // choiceMembership: payloadContactProjectData.data.belongsToMembershipGroup ? 0 : 1,
                                ...initialPcrValues,
                                pcrPostalCode,
                            });
                        } else {
                            setRegisterValues({
                                ...registerValues,
                                projectId: projectId,
                                contactId: currentSelectedContact.id,
                                // choiceMembership: payloadContactProjectData.data.belongsToMembershipGroup ? 0 : 1,
                            });
                        }
                    }
                    setIsLoading2(false);
                })
            )
            .catch(error => {
                // console.log('error');
                // console.log(error);
                setHasError(true);
                setErrorMessage('Fout bij ophalen gegevens');
                setIsLoading2(false);
            });

        if (registerType === 'verhogen' && participantId) {
            setIsLoading3(true);
            ParticipantProjectAPI.show(participantId)
                .then(payload => {
                    if (!payload.data.data.basicInformation.allowIncreaseParticipations) {
                        setHasError(true);
                        setErrorMessage('Verhogen niet mogelijk op dit moment');
                    }
                    setIsLoading3(false);
                })
                .catch(() => {
                    // alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                    setHasError(true);
                    setErrorMessage('Fout bij ophalen gegevens');
                    setIsLoading3(false);
                });
        } else {
            setIsLoading3(false);
        }
    }

    function handleSubmitRegisterValues(values) {
        setRegisterValues({ ...registerValues, ...values });
    }

    function handleSubmitContactValues(values, actions, nextStep) {
        const updatedContact = { ...contact, ...values, projectId: project.id };
        ContactAPI.updateContact(updatedContact)
            .then(payload => {
                setIsLoading2(true);
                ContactAPI.fetchContact(currentSelectedContact.id)
                    .then(payload => {
                        const contactData = rebaseContact(payload.data.data);

                        setContact(contactData);
                        setIsLoading2(false);

                        nextStep();
                    })
                    .catch(error => {
                        // alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                        setHasError(true);
                        setErrorMessage('Fout bij ophalen gegevens');
                        setIsLoading2(false);
                    });
            })
            .catch(error => {
                actions.setSubmitting(false);
                actions.setStatus({
                    message: error.response.data.message,
                });
                // alert('Er is iets misgegaan met opslaan! Herlaad de pagina opnieuw.');
                setHasError(true);
                setErrorMessage('Fout bij opslaan gegevens');
            });
    }

    return (
        <div className={'content-section'}>
            <div className="content-container w-container">
                {isLoading1 || isLoading2 || isLoading3 ? (
                    <LoadingView />
                ) : hasError ? (
                    <ErrorPage message={errorMessage} />
                ) : (!contactProjectData.projectRegisterIndicators.hasParticipation ||
                      contactProjectData.projectRegisterIndicators.allowIncreaseParticipations) &&
                  !contactProjectData.projectRegisterIndicators.allowRegisterToProject ? (
                    <>
                        <Row>
                            <Col>
                                <h1 className="content-heading">
                                    {registerType === 'verhogen' ? 'Bijschrijving' : 'Inschrijving'} voor project{' '}
                                    <strong>{project.name}</strong>
                                </h1>
                                <Row className={'mb-4'}>
                                    <Col>
                                        <div className="alert-wrapper">
                                            <Alert key={'form-general-error-alert'} variant={'warning'}>
                                                {contactProjectData.projectRegisterIndicators.textNotAllowedRegisterToProject
                                                    .split('<br />')
                                                    .map((item, key) => {
                                                        return (
                                                            <span key={key}>
                                                                {item}
                                                                <br />
                                                            </span>
                                                        );
                                                    })}
                                            </Alert>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={10}>
                                <ButtonGroup className="float-right">
                                    <Link to={`/inschrijvingen-projecten`}>
                                        <Button className={'w-button'} size="sm">
                                            Naar huidige deelnames
                                        </Button>
                                    </Link>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </>
                ) : contactProjectData.projectRegisterIndicators.hasParticipation &&
                  (registerType !== 'verhogen' ||
                      !contactProjectData.projectRegisterIndicators.allowIncreaseParticipations) ? (
                    <>
                        <Row>
                            <Col>
                                <h1 className="content-heading">
                                    <strong>{contact.fullNameFnf}</strong> is al ingeschreven voor project{' '}
                                    <strong>{project.name}</strong>
                                </h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={10}>
                                <ButtonGroup className="float-right">
                                    <Link to={`/inschrijvingen-projecten`}>
                                        <Button className={'w-button'} size="sm">
                                            Naar huidige deelnames
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
                                    {registerType === 'verhogen' ? 'Bijgeschreven' : 'Ingeschreven'} voor project{' '}
                                    <strong>{project.name}</strong>
                                </h1>
                            ) : (
                                <>
                                    <Row>
                                        <ButtonGroup aria-label="register" className="w-button-group-left">
                                            <Link to={`/inschrijven-projecten`}>
                                                <Button className={'w-button'} size="sm">
                                                    Inschrijven projecten
                                                </Button>
                                            </Link>
                                        </ButtonGroup>
                                    </Row>
                                    <h1 className="content-heading">
                                        Schrijf <strong>{contact.fullNameFnf}</strong>{' '}
                                        {registerType === 'verhogen' ? 'bij' : 'in'} voor project{' '}
                                        <strong>{project.name}</strong>
                                    </h1>
                                </>
                            )}
                            <MasterForm
                                currentStep={currentStep}
                                goToNextStep={goToNextStep}
                                goToPreviousStep={goToPreviousStep}
                                portalSettings={portalSettings}
                                project={project}
                                participantId={participantId}
                                registerType={registerType}
                                contactProjectData={contactProjectData}
                                initialRegisterValues={registerValues}
                                handleSubmitRegisterValues={handleSubmitRegisterValues}
                                initialContact={contact}
                                handleSubmitContactValues={handleSubmitContactValues}
                                setSucces={setSucces}
                            />
                        </Col>
                    </Row>
                )}
            </div>
        </div>
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
