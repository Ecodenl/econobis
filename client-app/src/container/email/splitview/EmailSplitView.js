import React, {useContext, useEffect, useState} from 'react';
import EmailSplitviewAPI from '../../../api/email/EmailSplitviewAPI';
import EmailSplitViewDetails from './EmailSplitViewDetails';
import EmailSplitViewSelectList from './EmailSplitViewSelectList';
import EmailSplitViewFiltersPanel from './EmailSplitViewFiltersPanel';
import {getJoryFilter, storeFiltersToStorage, getFiltersFromStorage, defaultFilters} from './EmailFilterHelpers';
import {EmailModalContext} from '../../../context/EmailModalContext';
import EmailGenericAPI from '../../../api/email/EmailGenericAPI';
import MailboxAPI from '../../../api/mailbox/MailboxAPI';
import ButtonIcon from '../../../components/button/ButtonIcon';
import axiosInstance from '../../../api/default-setup/AxiosInstance';
import {hashHistory, Link} from 'react-router';
import Icon from 'react-icons-kit';
import {trash} from 'react-icons-kit/fa/trash';
import {useSelector} from "react-redux";

export default function EmailSplitView({router}) {
    const perPage = 50;
    const [emails, setEmails] = useState([]);
    const [emailCount, setEmailCount] = useState(0);
    const [selectedEmailId, setSelectedEmailId] = useState(null);
    const [contact, setContact] = useState(null);
    const [filters, setFilters] = useState({...defaultFilters});
    const {isEmailDetailsModalOpen, isEmailSendModalOpen, openEmailSendModal} = useContext(EmailModalContext);
    const hasMailboxes = useSelector((state) => state.meDetails.mailboxes.length > 0);

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
        setFilters({...getFiltersFromStorage(), fetch: true});
    }, [router.params.folder]);

    useEffect(() => {
        setFilters({...getFiltersFromStorage(), fetch: true});

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

        setFilters({...filters, fetch: false});

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
        return EmailSplitviewAPI.fetchSelectList({
            filter: getFilter(),
            limit: perPage,
            offset: emails.length,
            sorts: getSorts(),
        }).then(response => {
            setEmails([...emails, ...response.data.items]);
            setEmailCount(response.data.total);
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
                return {...email, ...attributes};
            }

            return email;
        });

        setEmails(newEmails);
    };

    const getFilter = () => {
        return getJoryFilter(filters, router.params.folder, router.location.query.contact, router.location.query.eigen);
    };

    const getSorts = () => {
        return ['-dateSent'];
    };

    const handleFilterKeyUp = e => {
        if (e.keyCode === 13) {
            setFilters({...filters, fetch: true});
        }
    };

    const createMail = () => {
        EmailGenericAPI.storeNew().then(payload => {
            openEmailSendModal(payload.data.id);
        });
    };

    const refreshData = () => {
        MailboxAPI.receiveMailFromMailboxesUser().then(() => {
            refetchCurrentEmails();
        });
    };

    const hasFilters = () => {
        return Object.keys(filters).some(key => !!filters[key] && key !== 'fetch');
    };

    return (
        <div>
            {!hasMailboxes ? (
                <div className={'row'}>
                    <div className="col-xs-12">
                        <div
                            className="alert alert-info"
                            role="alert"
                        >
                            U heeft nog geen toegang tot een mailbox toegekend gekregen.
                        </div>
                    </div>
                </div>
            ) : (
                <div className="row">
                    <div className="col-md-6" style={{paddingLeft: '20px'}}>
                        {contact && (
                            <p>
                                Email voor contact <strong>{contact?.fullName}</strong>
                                <a role="button" onClick={() => hashHistory.push(router.location.pathname)}>
                                    <Icon className="mybtn-danger" size={14} icon={trash}/>
                                </a>
                            </p>
                        )}
                    </div>
                    <div className="col-md-6" style={{marginTop: '-10px', marginBottom: '5px'}}>
                        <button
                            type="button"
                            className="btn btn-success pull-right"
                            style={{marginLeft: '4px'}}
                            onClick={createMail}
                        >
                            Nieuwe e-mail
                        </button>
                        <ButtonIcon
                            iconName={'refresh'}
                            onClickAction={refreshData}
                            title={'Alle mappen verzenden/ontvangen'}
                            buttonClassName={'btn-success btn pull-right'}
                        />
                    </div>
                </div>
            )}
            <div className="row">
                <div className="col-md-12">
                    <form onKeyUp={handleFilterKeyUp}>
                        <EmailSplitViewFiltersPanel filters={filters} setFilters={setFilters}/>
                    </form>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 margin-10-top" style={{paddingRight: '0px'}}>
                    {
                        hasFilters() && (
                            <div className="panel panel-default">
                                <div className="panel-body panel-small">
                                    Er worden e-mail filters toegepast, klik <Link className="link-underline"
                                                                                   onClick={() => setFilters({
                                                                                       ...defaultFilters,
                                                                                       fetch: true
                                                                                   })}
                                                                                   style={{cursor: 'pointer'}}>hier</Link> om
                                    deze uit te zetten.
                                </div>
                            </div>
                        )
                    }
                    <EmailSplitViewSelectList
                        emails={emails}
                        folder={router.params.folder}
                        emailCount={emailCount}
                        fetchMoreEmails={fetchMoreEmails}
                        selectedEmailId={selectedEmailId}
                        setSelectedEmailId={setSelectedEmailId}
                        updateEmailAttributes={updateEmailAttributes}
                        onUpdated={refetchCurrentEmails}
                    />
                </div>
                <div className="col-md-8 margin-10-top">
                    <EmailSplitViewDetails emailId={selectedEmailId} updatedEmailHandler={refetchCurrentEmails} folder={router.params.folder} deleted={() => {
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
