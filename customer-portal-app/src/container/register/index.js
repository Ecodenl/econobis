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

    const [project, setProject] = useState({});
    const [contact, setContact] = useState({});
    const [portalSettings, setPortalSettings] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [isSucces, setSucces] = useState(false);
    const [contactProjectData, setContactProjectData] = useState({});

    useEffect(() => {
        if (currentSelectedContact.id) {
            (function fetchContactAndProject() {
                setLoading(true);

                axios
                    .all([
                        ProjectAPI.fetchProject(match.params.id),
                        ContactAPI.fetchContact(currentSelectedContact.id),
                        ContactAPI.fetchContactProjectData(currentSelectedContact.id, match.params.id),
                    ])
                    .then(
                        axios.spread((payloadProject, payloadContact, payloadContactProjectData) => {
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
                                    pcrPostalCode = contactData.primaryAddress
                                        ? contactData.primaryAddress.postalCode
                                        : '';
                                }
                                setRegisterValues({
                                    ...registerValues,
                                    projectId: match.params.id,
                                    contactId: currentSelectedContact.id,
                                    // choiceMembership: payloadContactProjectData.data.belongsToMembershipGroup ? 0 : 1,
                                    ...initialPcrValues,
                                    pcrPostalCode,
                                });
                            } else {
                                setRegisterValues({
                                    ...registerValues,
                                    projectId: match.params.id,
                                    contactId: currentSelectedContact.id,
                                    // choiceMembership: payloadContactProjectData.data.belongsToMembershipGroup ? 0 : 1,
                                });
                            }

                            if (
                                payloadContactProjectData.data.projectRegisterIndicators.allowChangeParticipation &&
                                payloadContactProjectData.data.projectRegisterIndicators.allowPayMollie
                            ) {
                                /**
                                 * Er is wel ingeschreven maar nog niet betaald, dan mag het formulier
                                 * wel geopend worden en stellen we de eerder ingevoerde gegevens in. projectRegisterIndicators
                                 */
                                setRegisterValues(current => {
                                    return {
                                        ...current,
                                        participationsOptioned:
                                            payloadContactProjectData.data.projectRegisterIndicators
                                                .participationsOptioned,
                                        amountOptioned:
                                            payloadContactProjectData.data.projectRegisterIndicators.amountOptioned,
                                        pcrYearlyPowerKwhConsumption:
                                            payloadContactProjectData.data.projectRegisterIndicators
                                                .powerKwhConsumption,
                                        didAcceptAgreement: true,
                                        didUnderstandInfo: true,
                                    };
                                });
                            }

                            setLoading(false);
                        })
                    )
                    .catch(error => {
                        alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                        setLoading(false);
                    });
            })();
        }

        (function callFetchPortalSettings() {
            setLoading(true);
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
                })
                .catch(error => {
                    this.setState({ isLoading: false, hasError: true });
                });
        })();
    }, [match, currentSelectedContact]);

    function handleSubmitRegisterValues(values) {
        setRegisterValues({ ...registerValues, ...values });
    }

    function handleSubmitContactValues(values, actions, nextStep) {
        const updatedContact = { ...contact, ...values, projectId: project.id };
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
                actions.setStatus({
                    message: error.response.data.message,
                });
                // alert('Er is iets misgegaan met opslaan! Herlaad de pagina opnieuw.');
            });
    }

    return (
        <div className={'content-section'}>
            <div className="content-container w-container">
                {isLoading ? (
                    <LoadingView />
                ) : !contactProjectData.projectRegisterIndicators.hasParticipation &&
                  !contactProjectData.projectRegisterIndicators.allowRegisterToProject ? (
                    <>
                        <Row>
                            <Col>
                                <h1 className="content-heading">
                                    Inschrijving voor project <strong>{project.name}</strong>
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
                  !contactProjectData.projectRegisterIndicators.allowChangeParticipation ? (
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
                                    Ingeschreven voor project <strong>{project.name}</strong>
                                </h1>
                            ) : (
                                <>
                                    <Row>
                                        <ButtonGroup aria-label="register" className="w-button-group-left">
                                            <Link to={`/inschrijven-projecten`}>
                                                <Button className={'w-button'} size="sm">
                                                    Ga terug
                                                </Button>
                                            </Link>
                                        </ButtonGroup>
                                    </Row>
                                    <h1 className="content-heading">
                                        Schrijf <strong>{contact.fullNameFnf}</strong> in voor{' '}
                                        <strong>{project.name}</strong>
                                    </h1>
                                </>
                            )}
                            <MasterForm
                                portalSettings={portalSettings}
                                project={project}
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
