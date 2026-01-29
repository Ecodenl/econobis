import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DataCleanupContactsToolbar from './DataCleanupContactsToolbar';

import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

import DataCleanupAPI from '../../../api/data-cleanup/DataCleanupAPI';
import DataCleanupContactsExcludedGroupList from './DataCleanupContactsExcludedGroupList';

export default function DataCleanupContactsApp() {
    const navigate = useNavigate();

    const [isLoading, setLoading] = useState(true);
    const [contactsToDeleteData, setContactsToDeleteData] = useState([]);
    const [contactsSoftDeletedData, setContactsSoftDeletedData] = useState([]);
    const [cleanupContactsExcludedGroupsData, setCleanupContactsExcludedGroupsData] = useState([]);
    const [errorText, setErrorText] = useState('');

    useEffect(() => {
        fetchCleanupData();
    }, []);

    const fetchCleanupData = () => {
        setLoading(true);

        DataCleanupAPI.getCleanupContacts()
            .then(payload => {
                setContactsToDeleteData(payload?.data?.contactsToDeleteData ?? []);
                setContactsSoftDeletedData(payload?.data?.contactsSoftDeletedData ?? []);
                setCleanupContactsExcludedGroupsData(payload?.data?.cleanupContactsExcludedGroups ?? []);
                setLoading(false);
            })
            .catch(() => {
                setErrorText('Er is iets misgegaan met ophalen van de opschoon gegevens.');
                setLoading(false);
            });
    };

    const handleDataCleanupUpdateItemAll = () => {
        setLoading(true);

        DataCleanupAPI.updateItemsAll()
            .then(data => {
                fetchCleanupData();
                setLoading(false);
            })
            .catch(() => {
                setErrorText('Er is iets misgegaan met herberekenen van de opschoon gegevens.');
                setLoading(false);
            });
    };
    const handleDataCleanupUpdateItem = cleanupType => {
        setLoading(true);

        DataCleanupAPI.updateItem(cleanupType)
            .then(data => {
                fetchCleanupData();
                setLoading(false);
            })
            .catch(() => {
                setErrorText('Er is iets misgegaan met herberekenen van de opschoon gegevens.');
                setLoading(false);
            });
    };

    const confirmCleanup = cleanupType => {
        setLoading(true);

        DataCleanupAPI.executeCleanupItem(cleanupType)
            .then(data => {
                fetchCleanupData();
                setLoading(false);
            })
            .catch(() => {
                setErrorText('Er is iets misgegaan met opschonen van de gegevens.');
                setLoading(false);
            });
    };

    const loadingText = () => {
        if (errorText) {
            return errorText;
        }

        if (isLoading) {
            return 'Gegevens aan het laden.';
        }

        if (cleanupData.length === 0) {
            return 'Geen opschoon gegevens gevonden!';
        }

        return '';
    };

    return (
        <Panel>
            <PanelBody>
                <div className="col-md-12 margin-10-top">
                    <DataCleanupContactsToolbar
                        setLoading={setLoading}
                        fetchCleanupData={fetchCleanupData}
                        handleDataCleanupUpdateItemAll={handleDataCleanupUpdateItemAll}
                    />
                </div>
                <div className="col-md-12 margin-10-top">
                    <DataCleanupContactsExcludedGroupList
                        cleanupContactsExcludedGroupsData={cleanupContactsExcludedGroupsData}
                        isLoading={isLoading}
                        loadingText={loadingText}
                    />
                </div>
            </PanelBody>
        </Panel>
    );
}
