import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DataCleanupItemsToolbar from './DataCleanupItemsToolbar';
import DataCleanupItemsList from './DataCleanupItemsList';

import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

import DataCleanupAPI from '../../../api/data-cleanup/DataCleanupAPI';

export default function DataCleanupItemsApp() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [cleanupData, setCleanupData] = useState([]);
    const [errorText, setErrorText] = useState('');

    const isBusyUpdateItem = isBusyItem => {
        setCleanupData(prev =>
            prev.map(item => (item.id === isBusyItem.id ? { ...item, dateDetermined: 'Bezig...' } : item))
        );
    };

    const isBusyCleanupItem = isBusyItem => {
        setCleanupData(prev =>
            prev.map(item => (item.id === isBusyItem.id ? { ...item, dateCleanedUp: 'Bezig...' } : item))
        );
    };
    const replaceCleanupItem = updatedItem => {
        setCleanupData(prev => prev.map(item => (item.id === updatedItem.id ? updatedItem : item)));
    };

    useEffect(() => {
        fetchCleanupData();
    }, []);

    const fetchCleanupData = () => {
        setIsLoading(true);

        DataCleanupAPI.getCleanupItems()
            .then(payload => {
                setErrorText('');
                setCleanupData(payload ?? []);
                setIsLoading(false);
            })
            .catch(() => {
                setErrorText('Er is iets misgegaan met ophalen van de opschoon gegevens.');
                setIsLoading(false);
            });
    };

    const handleDataCleanupUpdateItemsAll = () => {
        setIsLoading(true);

        DataCleanupAPI.updateItemsAll()
            .then(data => {
                fetchCleanupData();
            })
            .catch(() => {
                setErrorText('Er is iets misgegaan met herberekenen van de opschoon gegevens.');
            });
    };

    const handleDataCleanupUpdateItem = cleanupItem => {
        isBusyUpdateItem(cleanupItem);
        return DataCleanupAPI.updateItem(cleanupItem.codeRef)
            .then(updatedItem => {
                setErrorText('');
                if (updatedItem) {
                    replaceCleanupItem(updatedItem);
                }
                return updatedItem;
            })
            .catch(err => {
                setErrorText('Er is iets misgegaan met herberekenen van de opschoon gegevens.');
                throw err;
            });
    };
    const confirmCleanup = cleanupItem => {
        isBusyCleanupItem(cleanupItem);
        return DataCleanupAPI.executeCleanupItem(cleanupItem.codeRef)
            .then(updatedItem => {
                setErrorText('');
                if (updatedItem) {
                    replaceCleanupItem(updatedItem);
                }
                return updatedItem;
            })
            .catch(err => {
                setErrorText('Er is iets misgegaan met opschonen van de gegevens.');
                throw err;
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
                    <DataCleanupItemsToolbar
                        fetchCleanupData={fetchCleanupData}
                        handleDataCleanupUpdateItemsAll={handleDataCleanupUpdateItemsAll}
                    />
                </div>
                <div className="col-md-12 margin-10-top">
                    <DataCleanupItemsList
                        cleanupData={cleanupData}
                        handleDataCleanupUpdateItem={handleDataCleanupUpdateItem}
                        confirmCleanup={confirmCleanup}
                        isLoading={isLoading}
                        loadingText={loadingText}
                    />
                </div>
            </PanelBody>
        </Panel>
    );
}
