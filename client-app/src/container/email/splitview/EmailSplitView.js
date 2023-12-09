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
import axiosInstance from '../../../api/default-setup/AxiosInstance';
import { hashHistory } from 'react-router';
import Icon from 'react-icons-kit';
import { undo } from 'react-icons-kit/fa/undo';
import { useSelector } from 'react-redux';
import ContactGroupDetailsLapostaListDeActivate from '../../contact-groups/details/ContactGroupDetailsLapostaListDeActivate';
import Modal from '../../../components/modal/Modal';

export default function EmailSplitView({ router }) {
    const perPage = 50;
    const [emails, setEmails] = useState([]);
    const [emailCount, setEmailCount] = useState(0);
    const [selectedEmailId, setSelectedEmailId] = useState(null);
    const [isRefreshingData, setIsRefreshingData] = useState(false);
    const [isFetchingMoreEmails, setIsFetchingMoreEmails] = useState(false);
    const [contact, setContact] = useState(null);
    const [filters, setFilters] = useState({ ...defaultFilters });
    const { isEmailDetailsModalOpen, isEmailSendModalOpen, openEmailSendModal } = useContext(EmailModalContext);
    const hasMailboxes = useSelector(state => state.meDetails.mailboxes.length > 0);
    const [multiselectEnabled, setMultiselectEnabled] = useState(false);
    const [message, setMessage] = useState('Nieuwe e-mails worden opgehaald ...');

    useEffect(() => {
        if (!isEmailDetailsModalOpen && emailCount > 0) {
            refetchCurrentEmails();
        }
    }, [isEmailDetailsModalOpen]);

    useEffect(() => {
        if (!isEmailSendModalOpen && emailCount > 0) {
            refetchCurrentEmails();
        }
    }, [isEmailSendModalOpen]);

    useEffect(() => {
        setFilters({ ...getFiltersFromStorage(), fetch: true });
        setSelectedEmailId(null);
    }, [router.params.folder]);

    useEffect(() => {
        setFilters({ ...getFiltersFromStorage(), fetch: true });

        if (router.location.query.contact) {
            fetchContactName(router.location.query.contact).then(response => {
                setContact(response.data.data);
            });
        } else {
            setContact(null);
        }
    }, [router.location.query.contact]);

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

        EmailSplitviewAPI.fetchSelectList({
            filter: getFilter(),
            limit: perPage,
            offset: 0,
            sorts: getSorts(),
        }).then(response => {
            setEmails(response.data.items);
            setEmailCount(response.data.total);
        });
    }, [filters.fetch]);

    const fetchMoreEmails = () => {
        if (isFetchingMoreEmails) {
            return;
        }

        setIsFetchingMoreEmails(true);
        return EmailSplitviewAPI.fetchSelectList({
            filter: getFilter(),
            limit: perPage,
            offset: emails.length,
            sorts: getSorts(),
        }).then(response => {
            setEmails([...emails, ...response.data.items]);
            setIsFetchingMoreEmails(false);
        });
    };

    const refetchCurrentEmails = () => {
        return EmailSplitviewAPI.fetchSelectList({
            filter: getFilter(),
            limit: Math.max(emails.length, perPage),
            offset: 0,
            sorts: getSorts(),
        }).then(response => {
            setEmails(response.data.items);
            setEmailCount(response.data.total);
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
        return getJoryFilter(filters, router.params.folder, router.location.query.contact, router.location.query.eigen);
    };

    const getSorts = () => {
        if (router.params.folder === 'concept') {
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
        if (router.location.query.contact) {
            /**
             * Als er nog een contactfilter is via de querystring dan willen we die ook wissen.
             * Dus redirecten naar dezelfde pagina zonder querystring en zorgen dat filters gereset worden.
             */
            storeFiltersToStorage(defaultFilters);

            hashHistory.push(router.location.pathname);

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
        return Object.keys(filters).some(key => !!filters[key] && key !== 'fetch');
    };

    return (
        <div>
            {!hasMailboxes ? (
                <div className={'row'}>
                    <div className="col-xs-12">
                        <div className="alert alert-info" role="alert">
                            U heeft nog geen toegang tot een mailbox toegekend gekregen.
                        </div>
                    </div>
                </div>
            ) : (
                <div className="row">
                    <div className="col-xs-12">
                        <div className="alert alert-info" role="alert">
                            Uitvoeren mappen ontvangen wordt tijdelijk alleen 's ochtends rond 8.00 automatisch gedaan
                            en niet meer elke 10 minuten (tussen 08.00 en 20.00). Gebruik knop "Alle mappen ontvangen"
                            op deze pagina om nieuwe e-mails te ontvangen.
                        </div>
                    </div>
                    <div className="col-md-4" style={{ paddingLeft: '17px', marginTop: '-10px', marginBottom: '5px' }}>
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
                        {contact && (
                            <span style={{ marginLeft: '6px' }}>
                                Email voor contact <strong>{contact?.fullName}</strong>
                                <a
                                    role="button"
                                    style={{ marginLeft: '10px' }}
                                    className="btn btn-success btn-sm"
                                    onClick={() => hashHistory.push(router.location.pathname)}
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
            )}
            <div className="row">
                <div className="col-md-12">
                    <form onKeyUp={handleFilterKeyUp}>
                        <EmailSplitViewFiltersPanel filters={filters} setFilters={setFilters} />
                    </form>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 margin-10-top" style={{ paddingRight: '0px' }}>
                    {hasFilters() && (
                        <div className="panel panel-default">
                            <div className="panel-body panel-small">
                                Let op: filters actief &nbsp;
                                <a role="button" onClick={resetFilters}>
                                    <Icon size={16} icon={undo} />
                                </a>
                            </div>
                        </div>
                    )}
                    <EmailSplitViewSelectList
                        emails={emails}
                        folder={router.params.folder}
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
                        updatedEmailHandler={refetchCurrentEmails}
                        folder={router.params.folder}
                        deleted={() => {
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
    return axiosInstance.get('/jory/contact/' + contactId, {
        params: {
            jory: {
                fld: ['fullName'],
            },
        },
    });
};
