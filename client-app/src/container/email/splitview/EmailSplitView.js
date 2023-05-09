import React, {useEffect, useState} from 'react';
import EmailSplitviewAPI from "../../../api/email/EmailSplitviewAPI";
import EmailSplitViewDetails from "./EmailSplitViewDetails";
import EmailSplitViewSelectList from "./EmailSplitViewSelectList";
import EmailSplitViewFiltersPanel from "./EmailSplitViewFiltersPanel";
import {getJoryFilter, storeFiltersToStorage, getFiltersFromStorage, defaultFilters} from "./EmailFilterHelpers";

export default function EmailSplitView({router}) {
    const perPage = 50;
    const [emails, setEmails] = useState([]);
    const [emailCount, setEmailCount] = useState(0);
    const [selectedEmailId, setSelectedEmailId] = useState(null);
    const [filters, setFilters] = useState({...defaultFilters});

    useEffect(() => {
        setFilters({...getFiltersFromStorage(), fetch: true});
    }, [router.params.folder]);

    useEffect(() => {
        /**
         * We willen niet bij elke letter die je typt de lijst opnieuw ophalen.
         * Daarom zetten we een fetch flag die we op true zetten als je op enter drukt of een select optie selecteert.
         */
        if(!filters.fetch) {
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
            setEmails([...emails, ...response.data.items])
            setEmailCount(response.data.total);
        });
    }

    const refetchCurrentEmails = () => {
        return EmailSplitviewAPI.fetchSelectList({
            filter: getFilter(),
            limit: emails.length,
            offset: 0,
            sorts: getSorts(),
        }).then(response => {
            setEmails(response.data.items)
            setEmailCount(response.data.total);
        });
    }

    const updateEmailAttributes = (emailId, attributes) => {
        const newEmails = emails.map(email => {
            if (email.id === emailId) {
                return {...email, ...attributes};
            }

            return email;
        });

        setEmails(newEmails);
    }

    const getFilter = () => {
        return getJoryFilter(filters, router.params.folder, router.location.query.contact);
    }

    const getSorts = () => {
        return ['-dateSent'];
    }

    const handleFilterKeyUp = e => {
        if (e.keyCode === 13) {
            setFilters({...filters, fetch: true})
        }
    };

    return (
        <div>
            <div className="row">
                <div className="col-md-12" style={{marginTop: '-10px'}}>
                    <form onKeyUp={handleFilterKeyUp}>
                        <EmailSplitViewFiltersPanel filters={filters} setFilters={setFilters}/>
                    </form>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 margin-10-top" style={{paddingRight: '0px'}}>
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
                    <EmailSplitViewDetails emailId={selectedEmailId} updatedEmailHandler={refetchCurrentEmails}/>
                </div>
            </div>
        </div>
    );
}

