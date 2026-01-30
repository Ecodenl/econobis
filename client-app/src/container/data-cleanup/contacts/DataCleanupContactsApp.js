import React, { useEffect, useState } from 'react';

import DataCleanupContactsToolbar from './DataCleanupContactsToolbar';

import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

import DataCleanupAPI from '../../../api/data-cleanup/DataCleanupAPI';
import DataCleanupContactsExcludedGroupList from './DataCleanupContactsExcludedGroupList';
import DataCleanupContactsDetails from './DataCleanupContactsDetails';

export default function DataCleanupContactsApp() {
    const [isLoading, setLoading] = useState(true);
    const [contactsToDeleteData, setContactsToDeleteData] = useState({});
    const [contactsSoftDeletedData, setContactsSoftDeletedData] = useState({});
    const [cleanupContactsExcludedGroupsData, setCleanupContactsExcludedGroupsData] = useState([]);
    const [errorText, setErrorText] = useState('');

    useEffect(() => {
        fetchCleanupData();
    }, []);

    const fetchCleanupData = () => {
        setLoading(true);

        DataCleanupAPI.getCleanupContacts()
            .then(payload => {
                console.log('payload getCleanupContacts');
                console.log(payload);

                setErrorText('');
                setContactsToDeleteData(payload?.contactsToDelete ?? {});
                setContactsSoftDeletedData(payload?.contactsSoftDeleted ?? {});
                setCleanupContactsExcludedGroupsData(payload?.cleanupContactsExcludedGroups ?? []);
                setLoading(false);
            })
            .catch(() => {
                setErrorText('Er is iets misgegaan met ophalen van de opschoon gegevens.');
                setLoading(false);
            });
    };

    return (
        <Panel>
            <PanelBody>
                <div className="col-md-12 margin-10-top">
                    <DataCleanupContactsToolbar fetchCleanupData={fetchCleanupData} />
                </div>

                {errorText ? (
                    <div className="col-md-12 margin-10-top">
                        <div className="alert alert-danger">{errorText}</div>
                    </div>
                ) : null}

                <div className="col-md-12 margin-10-top">
                    <DataCleanupContactsDetails
                        contactsToDeleteData={contactsToDeleteData}
                        contactsSoftDeletedData={contactsSoftDeletedData}
                        isLoading={isLoading}
                    />
                </div>
                <div className="col-md-12 margin-10-top">
                    <DataCleanupContactsExcludedGroupList
                        cleanupContactsExcludedGroupsData={cleanupContactsExcludedGroupsData}
                        isLoading={isLoading}
                    />
                </div>
            </PanelBody>
        </Panel>
    );
}
