import React, { useContext, useEffect, useState } from 'react';
import EmailSplitviewAPI from '../../../api/email/EmailSplitviewAPI';
import EmailSplitViewDetails from './EmailSplitViewDetails';
import EmailSplitViewSelectList from './EmailSplitViewSelectList';
import EmailSplitViewFiltersPanel from './EmailSplitViewFiltersPanel';
import { getJoryFilter, storeFiltersToStorage, getFiltersFromStorage, defaultFilters } from './EmailFilterHelpers';
import { EmailModalContext } from '../../../context/EmailModalContext';
import EmailGenericAPI from '../../../api/email/EmailGenericAPI';
import MailboxAPI from '../../../api/mailbox/MailboxAPI';
import ButtonIcon from '../../../components/button/ButtonIcon';
import getAxiosInstance from '../../../api/default-setup/AxiosInstance';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
// import queryString from 'query-string';
import Icon from 'react-icons-kit';
import { undo } from 'react-icons-kit/fa/undo';
import Modal from '../../../components/modal/Modal';
import EmailMailboxStatuses from './EmailMailboxStatuses';
import axios from 'axios';

export default function EmailSplitView() {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    const query = Object.fromEntries(new URLSearchParams(location.search));

    const perPage = 50;
    const [emails, setEmails] = useState([]);
    const [isLoadingMailboxes, setIsLoadingMailboxes] = useState(false);
    const [activeMailboxes, setActiveMailboxes] = useState([]);
    const [emailCount, setEmailCount] = useState(0);
    const [selectedEmailId, setSelectedEmailId] = useState(null);
    const [isRefreshingData, setIsRefreshingData] = useState(false);
    const [isFetchingEmails, setIsFetchingEmails] = useState(false);
    const [contact, setContact] = useState(null);
    const [filters, setFilters] = useState({ ...defaultFilters });
    const [eigenOpenstaand, setEigenOpenstaand] = useState(false);

    const { isEmailDetailsModalOpen, isEmailSendModalOpen, openEmailSendModal } = useContext(EmailModalContext);
    const hasMailboxes = activeMailboxes.length > 0;

    const [multiselectEnabled, setMultiselectEnabled] = useState(false);
    const [message, setMessage] = useState('Nieuwe e-mails worden opgehaald ...');

    useEffect(() => {
        fetchActiveMailboxes(true);
    }, []);

    useEffect(() => {
        if (!isEmailDetailsModalOpen && emailCount > 0) {
            refetchCurrentEmails();
        }
    }, [isEmailDetailsModalOpen]);

    useEffect(() => {
        // if (!isEmailSendModalOpen && emails.length > 0) {
        if (!isEmailSendModalOpen && emailCount > 0) {
            refetchCurrentEmails();
        }
    }, [isEmailSendModalOpen]);

    useEffect(() => {
        setFilters({ ...getFiltersFromStorage(), fetch: true });
        setSelectedEmailId(null);
    }, [params.folder]);

    useEffect(() => {
        setFilters({ ...getFiltersFromStorage(), fetch: true });

        if (query.contact) {
            fetchContactName(query.contact).then(response => {
                setContact(response.data.data);
            });
        } else {
            setContact(null);
        }
    }, [query.contact]);

    useEffect(() => {
        setFilters({ ...getFiltersFromStorage(), fetch: true });

        setEigenOpenstaand(query.eigen === '1');
        // if (query.eigen) {
        //     setEigenOpenstaand(true);
        // } else {
        //     setEigenOpenstaand(false);
        // }
    }, [query.eigen]);

    useEffect(() => {
        /**
         * We willen niet bij elke letter die je typt de lijst opnieuw ophalen.
         * Daarom zetten we een fetch flag die we op true zetten als je op enter drukt of een select optie selecteert.
         */
        if (!filters.fetch) {
            return;
        }

        setFilters({ ...filters, fetch: false });

        storeFiltersToStorage(filters);

        setIsFetchingEmails(true);
        EmailSplitviewAPI.fetchSelectList({
            filter: getFilter(),
            limit: perPage,
            offset: 0,
            sorts: getSorts(),
        }).then(response => {
            setEmails(response.data.items);
            setEmailCount(response.data.total);
            setIsFetchingEmails(false);
        });
    }, [filters.fetch]);

    const fetchMoreEmails = () => {
        if (isFetchingEmails) {
            return;
        }

        setIsFetchingEmails(true);
        return EmailSplitviewAPI.fetchSelectList({
            filter: getFilter(),
            limit: perPage,
            offset: emails.length,
            sorts: getSorts(),
        }).then(response => {
            setEmails([...emails, ...response.data.items]);
            setIsFetchingEmails(false);
        });
    };

    const refetchCurrentEmails = () => {
        if (isFetchingEmails) {
            return;
        }

        setIsFetchingEmails(true);
        return EmailSplitviewAPI.fetchSelectList({
            filter: getFilter(),
            limit: Math.max(emails.length, perPage),
            offset: 0,
            sorts: getSorts(),
        }).then(response => {
            setEmails(response.data.items);
            setEmailCount(response.data.total);
            setIsFetchingEmails(false);
        });
    };
    const fetchActiveMailboxes = doRefreshData => {
        setIsLoadingMailboxes(true);
        axios
            .all([MailboxAPI.fetchMailboxesLoggedInUser()])
            .then(
                axios.spread(payloadActiveMailboxes => {
                    setActiveMailboxes(payloadActiveMailboxes.data.data);
                    if (doRefreshData && payloadActiveMailboxes.data.meta.activateAutomaticRefreshEmailData) {
                        refreshData();
                    }
                    setIsLoadingMailboxes(false);
                })
            )
            .catch(error => {
                console.log(error);
                setIsLoadingMailboxes(false);
            });
    };
    const updateEmailAttributes = (emailId, attributes) => {
        const newEmails = emails.map(email => {
            if (email.id === emailId) {
                return { ...email, ...attributes };
            }

            return email;
        });

        setEmails(newEmails);
    };

    const getFilter = () => {
        return getJoryFilter(filters, params.folder, query.contact, query.eigen === '1');
    };

    const getSorts = () => {
        if (params.folder === 'concept') {
            return ['-createdAt'];
        }

        return ['-dateSent'];
    };

    const handleFilterKeyUp = e => {
        if (e.keyCode === 13) {
            setFilters({ ...filters, fetch: true });
        }
    };

    const resetFilters = () => {
        if (query.contact || query.eigen) {
            /**
             * Als er nog een contactfilter of eigen filter is via de querystring dan willen we die ook wissen.
             * Dus redirecten naar dezelfde pagina zonder querystring en zorgen dat filters gereset worden.
             */
            storeFiltersToStorage(defaultFilters);

            navigate(location.pathname);

            return;
        }

        setFilters({
            ...defaultFilters,
            fetch: true,
        });
    };

    const createMail = () => {
        EmailGenericAPI.storeNew().then(payload => {
            openEmailSendModal(payload.data.id);
        });
    };

    const refreshData = () => {
        if (isRefreshingData) {
            return;
        }

        setIsRefreshingData(true);

        MailboxAPI.receiveMailFromMailboxesUser()
            .then(() => {
                setMessage('Ophalen nieuwe e-mails is voltooid.');
                refetchCurrentEmails();
                fetchActiveMailboxes(false);
                setTimeout(closeModal, 5000);
            })
            .catch(error => {
                setMessage('Er ging iets mis bij ophalen nieuwe e-mails.');
            });
    };

    function closeModal() {
        setIsRefreshingData(false);
    }
    const hasFilters = () => {
        return eigenOpenstaand || Object.keys(filters).some(key => !!filters[key] && key !== 'fetch');
    };

    return (
        <div>
            {isLoadingMailboxes ? (
                <div className={'row'}>
                    <div className="col-xs-12">
                        <div className="alert alert-info" role="alert">
                            Bezig met ophalen mailbox statussen ...
                        </div>
                    </div>
                </div>
            ) : !hasMailboxes ? (
                <div className={'row'}>
                    <div className="col-xs-12">
                        <div className="alert alert-info" role="alert">
                            U heeft nog geen toegang tot een mailbox toegekend gekregen.
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <EmailMailboxStatuses activeMailboxes={activeMailboxes} />
                    <div className="row">
                        <div
                            className="col-md-4"
                            style={{ paddingLeft: '17px', marginTop: '-10px', marginBottom: '5px' }}
                        >
                            <div className="btn-group" role="group">
                                <ButtonIcon
                                    iconName={'refresh'}
                                    onClickAction={refreshData}
                                    title={'Alle mappen ontvangen'}
                                />
                                <ButtonIcon iconName={'plus'} onClickAction={createMail} title={'Nieuwe e-mail'} />
                                <ButtonIcon
                                    iconName={'check'}
                                    onClickAction={() => setMultiselectEnabled(!multiselectEnabled)}
                                    title="Contactselectie maken"
                                />
                            </div>
                        </div>
                        <div className="col-md-4" style={{ marginTop: '-10px', marginBottom: '5px' }}>
                            {(contact || eigenOpenstaand) && (
                                <span style={{ marginLeft: '6px' }}>
                                    {eigenOpenstaand ? <strong>Eigen openstaande e-mails</strong> : 'E-mails'}{' '}
                                    {contact && (
                                        <span>
                                            voor contact <strong>{contact?.fullName}</strong>
                                        </span>
                                    )}
                                    <a
                                        role="button"
                                        style={{ marginLeft: '10px' }}
                                        className="btn btn-success btn-sm"
                                        onClick={() => navigate(location.pathname)}
                                    >
                                        Filter wissen
                                    </a>
                                </span>
                            )}
                        </div>
                        <div className="col-md-4" style={{ marginTop: '-10px', marginBottom: '5px' }}>
                            {hasFilters() && (
                                <button
                                    type="button"
                                    className="btn btn-success pull-right btn-sm"
                                    style={{ marginRight: '4px' }}
                                    onClick={resetFilters}
                                >
                                    Wis alle filters
                                </button>
                            )}
                        </div>
                        {isRefreshingData && (
                            <Modal
                                buttonClassName={'btn-danger'}
                                closeModal={closeModal}
                                buttonCancelText={'Sluiten'}
                                showConfirmAction={false}
                                title="Alle mappen ontvangen"
                            >
                                <p>{message}</p>
                                {/*{errors.length ? (*/}
                                {/*    <ul>*/}
                                {/*        {errors.map(item => (*/}
                                {/*            <li>{item}</li>*/}
                                {/*        ))}*/}
                                {/*    </ul>*/}
                                {/*) : null}*/}
                            </Modal>
                        )}
                    </div>
                </>
            )}
            <div className="row">
                <div className="col-md-12">
                    <form onKeyUp={handleFilterKeyUp}>
                        <EmailSplitViewFiltersPanel
                            filters={filters}
                            setFilters={setFilters}
                            activeMailboxes={activeMailboxes}
                            eigenOpenstaand={eigenOpenstaand}
                        />
                    </form>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 margin-10-top" style={{ paddingRight: '0px' }}>
                    {isFetchingEmails ? (
                        <div className="alert alert-info" role="alert">
                            Let op: bezig met ophalen/bijwerken lijst met emails...
                        </div>
                    ) : (
                        hasFilters() && (
                            <div className="alert alert-info" role="alert">
                                Let op: filters actief &nbsp;
                                <a role="button" onClick={resetFilters}>
                                    <Icon size={16} icon={undo} />
                                </a>
                            </div>
                        )
                    )}
                    <EmailSplitViewSelectList
                        emails={emails}
                        folder={params.folder}
                        emailCount={emailCount}
                        fetchMoreEmails={fetchMoreEmails}
                        selectedEmailId={selectedEmailId}
                        setSelectedEmailId={setSelectedEmailId}
                        updateEmailAttributes={updateEmailAttributes}
                        onUpdated={refetchCurrentEmails}
                        multiselectEnabled={multiselectEnabled}
                        setMultiselectEnabled={setMultiselectEnabled}
                    />
                </div>
                <div className="col-md-8 margin-10-top">
                    <EmailSplitViewDetails
                        emailId={selectedEmailId}
                        folder={params.folder}
                        updatedEmailHandler={refetchCurrentEmails}
                        revertFromRemovedHandler={() => {
                            localStorage.setItem('lastOpenedEmailId', null);
                            setSelectedEmailId(null);
                            refetchCurrentEmails();
                        }}
                        deletedHandler={() => {
                            localStorage.setItem('lastOpenedEmailId', null);
                            setSelectedEmailId(null);
                            refetchCurrentEmails();
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

const fetchContactName = contactId => {
    return getAxiosInstance().get('/jory/contact/' + contactId, {
        params: {
            jory: {
                fld: ['fullName'],
            },
        },
    });
};
