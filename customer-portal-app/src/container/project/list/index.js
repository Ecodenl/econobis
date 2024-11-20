import React, { useState, useEffect, useRef } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
import LoadingView from '../../../components/general/LoadingView';
import ContactAPI from '../../../api/contact/ContactAPI';
import { PortalUserConsumer } from '../../../context/PortalUserContext';
import { FaInfoCircle } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';
import rebaseContact from '../../../helpers/RebaseContact';
import PersonalAddressEdit from './address-person/Edit';
import OrganisationAddressEdit from './address-organisation/Edit';

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

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    function handleSubmitContactAddressValues(values, actions) {
        const updatedContact = { ...contact, ...values, projectId: null };
        ContactAPI.updateContact(updatedContact)
            .then(payload => {
                actions.setSubmitting(false);
                callFetchContact();
                callFetchContactProjects();
            })
            .catch(error => {
                actions.setSubmitting(false);
                actions.setStatus({
                    message: error.response.data.message,
                });
            });
    }

    return (
        <div className={'content-section'}>
            <div className="content-container w-container">
                <Row>
                    <Col>
                        <h1 className="content-heading">
                            Overzicht projecten waarop <strong>{props.currentSelectedContact.fullNameFnf}</strong> kan
                            inschrijven.
                        </h1>
                    </Col>
                </Row>
                {sceOrPcrProjectsAvailable && contact.noAddressesFound && contact.typeId === 'person' ? (
                    <PersonalAddressEdit
                        initialContact={contact}
                        handleSubmitContactAddressValues={handleSubmitContactAddressValues}
                    />
                ) : sceOrPcrProjectsAvailable && contact.noAddressesFound && contact.typeId === 'organisation' ? (
                    <OrganisationAddressEdit
                        initialContact={contact}
                        handleSubmitContactAddressValues={handleSubmitContactAddressValues}
                    />
                ) : (
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
                                ) : contactProjectsArray.length === 0 ? (
                                    'Geen projecten beschikbaar om op in te schrijven.'
                                ) : (
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th>Organisatie</th>
                                                <th>Project</th>
                                                <th>Ingeschreven</th>
                                                <th>Start inschrijving</th>
                                                <th>Einde inschrijving</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {contactProjectsArray.map(project => (
                                                <tr key={project.id}>
                                                    <td>{project.administrationName}</td>
                                                    <td>
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
                                                        {/*)}*/}
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
                                            ))}
                                        </tbody>
                                    </Table>
                                )}
                            </Col>
                        </Row>
                    </>
                )}
            </div>
        </div>
    );
}

export default function ProjectListWithContext(props) {
    return (
        <PortalUserConsumer>
            {({ currentSelectedContact }) => <ProjectList {...props} currentSelectedContact={currentSelectedContact} />}
        </PortalUserConsumer>
    );
}
