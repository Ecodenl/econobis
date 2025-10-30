import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';

import ParticipantNewToolbar from './ParticipantNewToolbar';
import ParticipantProjectDetailsAPI from '../../../api/participant-project/ParticipantProjectDetailsAPI';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ProjectsAPI from '../../../api/project/ProjectsAPI';
import MultipleMessagesModal from '../../../components/modal/MultipleMessagesModal';
import ParticipantNewForm from './ParticipantNewForm';
import ParticipantSubmitHelper from './ParticipantSubmitHelper';
import ParticipantValidateForm from './ParticipantValidateForm';
import ContactDetailsAPI from '../../../api/contact/ContactDetailsAPI';

export default function ParticipantNewApp() {
    const navigate = useNavigate();
    const params = useParams();

    // Redux selectors (vervanger van connect/mapStateToProps)
    const participantMutationStatuses = useSelector(state => state.systemData.participantMutationStatuses);
    const administrations = useSelector(state => state.meDetails.administrations);

    // UI state
    const [showModal, setShowModal] = useState(false);
    const [showModalError, setShowModalError] = useState(false);
    const [modalText, setModalText] = useState([]);
    const [modalRedirectTask, setModalRedirectTask] = useState('');
    const [modalRedirectParticipation, setModalRedirectParticipation] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Data state
    const [selectedContact, setSelectedContact] = useState({});
    const [addresses, setAddresses] = useState([]);
    const [projects, setProjects] = useState([]);
    const [projectTypeCodeRef, setProjectTypeCodeRef] = useState('');
    const [isSceProject, setIsSceProject] = useState(false);
    const [disableClientSelection] = useState(!params.contactId ? false : true);
    const [disableProjectSelection] = useState(!params.projectId ? false : true);

    const [participation, setParticipation] = useState({
        contactId: params.contactId || '',
        addressId: '',
        statusId: '',
        projectId: params.projectId || '',
        quantityInterest: 0,
        amountInterest: 0,
        dateInterest: moment().format('YYYY-MM-DD'),
        quantityOption: 0,
        amountOption: 0,
        dateOption: moment().format('YYYY-MM-DD'),
        quantityGranted: 0,
        amountGranted: 0,
        dateGranted: moment().format('YYYY-MM-DD'),
        quantityFinal: 0,
        amountFinal: 0,
        dateContractRetour: null,
        datePayment: null,
        paymentReference: null,
        dateEntry: '',
        disableBeforeEntryDate: '',
    });

    const [errors, setErrors] = useState({
        contactId: false,
        addressId: false,
        statusId: false,
        projectId: false,
        amountOption: false,
        dateOption: false,
        amountGranted: false,
        dateGranted: false,
        amountFinal: false,
        dateEntry: false,
    });

    function getValidEntryDate(projectDate, disableBeforeEntryDate) {
        const today = moment();
        const disable = disableBeforeEntryDate ? moment(disableBeforeEntryDate) : null;
        const proj = projectDate ? moment(projectDate) : null;

        // kies de eerste geldige (ondergrens): max(proj, disable)
        let candidate = null;
        if (proj && disable) {
            candidate = proj.isAfter(disable, 'day') ? proj : disable;
        } else if (proj) {
            candidate = proj;
        } else if (disable) {
            candidate = disable;
        } else {
            // geen constraints → val terug op vandaag
            candidate = today;
        }
        return candidate.format('YYYY-MM-DD');
    }

    // Helper: bepaal disableBeforeEntryDate (zelfde logica als class versie)
    const getDisableBeforeEntryDate = useCallback(
        (project, contact) => {
            let lastYearFinancialOverviewDefinitive = 0;
            if (project && project.lastYearFinancialOverviewDefinitive) {
                lastYearFinancialOverviewDefinitive = project.lastYearFinancialOverviewDefinitive;
            } else if (project) {
                let administration = administrations?.find(
                    administrationItem => administrationItem.id == project.administrationId
                );
                if (administration && administration.lastYearFinancialOverviewDefinitive) {
                    lastYearFinancialOverviewDefinitive = administration.lastYearFinancialOverviewDefinitive;
                }
            }

            let disableBeforeEntryDate =
                lastYearFinancialOverviewDefinitive > 0
                    ? moment(moment().year(lastYearFinancialOverviewDefinitive + 1)).format('YYYY-01-01')
                    : '';

            // Neem contact.sent mee als die bestaat en vóór definitive ligt
            if (contact?.lastYearFinancialOverviewSent > 0) {
                const sentYear = contact.lastYearFinancialOverviewSent;
                // alleen meenemen als sent < definitive; als definitive 0/unknown is, meenemen
                const isBeforeDef =
                    lastYearFinancialOverviewDefinitive > 0 ? sentYear < lastYearFinancialOverviewDefinitive : true;
                if (isBeforeDef) {
                    const contactDate = moment(moment().year(sentYear + 1)).format('YYYY-01-01');
                    if (!disableBeforeEntryDate || contactDate > disableBeforeEntryDate) {
                        disableBeforeEntryDate = contactDate;
                    }
                }
            }

            if (project && project.typeCodeRef === 'postalcode_link_capital') {
                if (
                    project.dateInterestBearingKwh &&
                    (!disableBeforeEntryDate ||
                        moment(project.dateInterestBearingKwh).format('YYYY-MM-DD') > disableBeforeEntryDate)
                ) {
                    disableBeforeEntryDate = moment(project.dateInterestBearingKwh).format('YYYY-MM-DD');
                }
            }

            return disableBeforeEntryDate;
        },
        [administrations]
    );

    // Initial load
    useEffect(() => {
        let isCancelled = false;

        const loadContact = async () => {
            if (!params.contactId) return;
            const contact = await ContactDetailsAPI.getContactDetailsWithAddresses(params.contactId);
            if (isCancelled) return;
            setSelectedContact(contact);
            setParticipation(participationItem => ({
                ...participationItem,
                contactId: contact.id,
                addressId: contact ? contact.primaryAddressId : 0,
            }));
            setAddresses(contact ? contact.addresses : []);
        };

        const loadProjects = async () => {
            const list = await ProjectsAPI.peekProjects();
            if (isCancelled) return;
            setProjects(list);

            if (params.projectId) {
                const proj = list.find(projectItem => projectItem.id == params.projectId);
                if (proj) {
                    const disableBeforeEntryDate = getDisableBeforeEntryDate(proj, selectedContact);
                    setProjectTypeCodeRef(proj.typeCodeRef);
                    setIsSceProject(proj.isSceProject);
                    setParticipation(participationItem => ({
                        ...participationItem,
                        dateEntry: getValidEntryDate(proj.dateEntry, disableBeforeEntryDate),
                        disableBeforeEntryDate,
                    }));
                }
            }
        };

        loadContact();
        loadProjects();

        return () => {
            isCancelled = true;
        };
    }, [params.contactId, params.projectId, getDisableBeforeEntryDate]);

    useEffect(() => {
        const proj = projects.find(projectItem => projectItem.id == participation.projectId);
        if (!proj) return;

        const disableBeforeEntryDateReNewed = getDisableBeforeEntryDate(proj, selectedContact);
        const defaultDate = getValidEntryDate(proj.dateEntry, disableBeforeEntryDateReNewed);

        setParticipation(prev => {
            const userKeepsDate =
                prev.dateEntry &&
                (!disableBeforeEntryDateReNewed ||
                    moment(prev.dateEntry).isSameOrAfter(disableBeforeEntryDateReNewed, 'day'));

            const next = {
                ...prev,
                disableBeforeEntryDate: disableBeforeEntryDateReNewed,
                dateEntry: userKeepsDate ? prev.dateEntry : defaultDate,
            };

            // no-op als niets verandert
            if (next.disableBeforeEntryDate === prev.disableBeforeEntryDate && next.dateEntry === prev.dateEntry) {
                return prev;
            }
            return next;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projects, participation.projectId, selectedContact, getDisableBeforeEntryDate]);

    // Handlers
    const handleInputChange = useCallback(e => {
        const { name, type, checked, value } = e.target;
        setParticipation(participationItem => ({
            ...participationItem,
            [name]: type === 'checkbox' ? checked : value,
        }));
    }, []);

    const handleInputChangeDate = useCallback((value, name) => {
        setParticipation(participationItem => ({ ...participationItem, [name]: value }));
    }, []);

    const handleInputChangeContactId = useCallback(
        async selectedOption => {
            const selectedContactId = selectedOption ? selectedOption.id : null;
            if (!selectedContactId) return;
            const contact = await ContactDetailsAPI.getContactDetailsWithAddresses(selectedContactId);
            setSelectedContact(contact);
            setParticipation(participationItem => ({
                ...participationItem,
                contactId: contact.id,
                addressId: contact ? contact.primaryAddressId : 0,
            }));
            setAddresses(contact ? contact.addresses : []);

            const proj = projects.find(projectItem => projectItem.id == participation.projectId);
            if (proj) {
                const disableBeforeEntryDateReNewed = getDisableBeforeEntryDate(proj, contact);
                const defaultDate = getValidEntryDate(proj.dateEntry, disableBeforeEntryDateReNewed);

                setParticipation(participationItem => {
                    const userKeepsDate =
                        participationItem.dateEntry &&
                        (!disableBeforeEntryDateReNewed ||
                            moment(participationItem.dateEntry).isSameOrAfter(disableBeforeEntryDateReNewed, 'day'));
                    return {
                        ...participationItem,
                        disableBeforeEntryDate: disableBeforeEntryDateReNewed,
                        dateEntry: userKeepsDate ? participationItem.dateEntry : defaultDate,
                    };
                });
            }
        },
        [projects, participation.projectId, getDisableBeforeEntryDate]
    );

    const handleInputChangeAddressId = useCallback(selectedOption => {
        setParticipation(participationItem => ({ ...participationItem, addressId: selectedOption }));
    }, []);

    const handleInputChangeProjectId = useCallback(
        selectedOption => {
            const projectId = selectedOption;
            const proj = projects.find(projectItem => projectItem.id == projectId);
            if (!proj) return;

            const disableBeforeEntryDate = getDisableBeforeEntryDate(proj, selectedContact);

            setProjectTypeCodeRef(proj.typeCodeRef);
            setIsSceProject(proj.isSceProject);
            setParticipation(participationItem => ({
                ...participationItem,
                projectId,
                dateEntry: getValidEntryDate(proj.dateEntry, disableBeforeEntryDate),
                disableBeforeEntryDate,
            }));
        },
        [projects, selectedContact, getDisableBeforeEntryDate]
    );

    const handleInputChangeStatusId = useCallback(
        e => {
            const statusId = e.target.value;
            const finalId = participantMutationStatuses.find(
                participantMutationStatusItem => participantMutationStatusItem.codeRef === 'final'
            )?.id;
            const dateGranted = Number(statusId) === finalId ? null : moment().format('YYYY-MM-DD');
            setParticipation(participationItem => ({ ...participationItem, statusId, dateGranted }));
        },
        [participantMutationStatuses]
    );

    const handleSubmit = useCallback(
        async e => {
            e.preventDefault();

            const status = participantMutationStatuses.find(
                participantMutationStatusItem => participantMutationStatusItem.id == participation.statusId
            );
            const statusCodeRef = status ? status.codeRef : null;

            const validated = ParticipantValidateForm(participation, {}, false, statusCodeRef, projectTypeCodeRef);

            setErrors(validated.errors);
            if (validated.hasErrors) return;

            const values = ParticipantSubmitHelper(participation, statusCodeRef, projectTypeCodeRef);

            setIsLoading(true);
            try {
                const payload = await ParticipantProjectDetailsAPI.storeParticipantProject(values);
                const { data } = payload;
                if (data?.message?.length > 0 && data.id == 0) {
                    setModalText(data.message);
                    setShowModalError(true);
                } else if (data?.message?.length > 0) {
                    setModalText(data.message);
                    setShowModal(true);
                    setModalRedirectTask(
                        `/taak/nieuw/contact/${participation.contactId}/project/${participation.projectId}/deelnemer/${data.id}`
                    );
                    setModalRedirectParticipation(`/project/deelnemer/${data.id}`);
                } else {
                    navigate(`/project/deelnemer/${data.id}`);
                }
            } finally {
                setIsLoading(false);
            }
        },
        [participantMutationStatuses, participation, projectTypeCodeRef, navigate]
    );

    const redirectTask = useCallback(() => {
        navigate(modalRedirectTask);
    }, [navigate, modalRedirectTask]);

    const redirectParticipation = useCallback(() => {
        navigate(modalRedirectParticipation);
    }, [navigate, modalRedirectParticipation]);

    return (
        <div className="row">
            <div className="col-md-9">
                <div className="col-md-12">
                    <ParticipantNewToolbar />
                </div>

                <div className="col-md-12">
                    <Panel>
                        <PanelBody>
                            <div className="col-md-12">
                                <ParticipantNewForm
                                    editForm={false}
                                    participation={participation}
                                    errors={errors}
                                    handleInputChange={handleInputChange}
                                    handleInputChangeDate={handleInputChangeDate}
                                    handleSubmit={handleSubmit}
                                    selectedContact={selectedContact}
                                    addresses={addresses}
                                    projects={projects}
                                    projectTypeCodeRef={projectTypeCodeRef}
                                    isSceProject={isSceProject}
                                    disableProjectSelection={disableProjectSelection}
                                    disableClientSelection={disableClientSelection}
                                    participantMutationStatuses={participantMutationStatuses}
                                    handleInputChangeContactId={handleInputChangeContactId}
                                    handleInputChangeAddressId={handleInputChangeAddressId}
                                    handleInputChangeProjectId={handleInputChangeProjectId}
                                    handleInputChangeStatusId={handleInputChangeStatusId}
                                    isLoading={isLoading}
                                />
                            </div>
                        </PanelBody>
                    </Panel>
                </div>
            </div>
            <div className="col-md-3" />

            {showModalError && (
                <MultipleMessagesModal
                    title={'Melding'}
                    closeModal={() => setShowModalError(false)}
                    buttonCancelText={'Sluiten'}
                    showConfirmAction={false}
                    closingText={'De deelname is niet aangemaakt!'}
                >
                    {modalText}
                </MultipleMessagesModal>
            )}

            {showModal && (
                <MultipleMessagesModal
                    title={'Waarschuwing'}
                    closeModal={redirectParticipation}
                    buttonCancelText={'Nee'}
                    confirmAction={redirectTask}
                    buttonConfirmText={'Ja'}
                    closingText={
                        'De deelname is aangemaakt, maar de gegevens zijn niet compleet. Wil je ook een taak aanmaken om je daar aan te herinneren ?'
                    }
                >
                    {modalText}
                </MultipleMessagesModal>
            )}
        </div>
    );
}
