import React, { useEffect, useState } from 'react';

import DataCleanupItemsToolbar from './DataCleanupItemsToolbar';
import DataCleanupItemsList from './DataCleanupItemsList';

import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

import DataCleanupAPI from '../../../api/data-cleanup/DataCleanupAPI';

export default function DataCleanupItemsApp() {
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
    const clearCleanupItem = isBusyItem => {
        setCleanupData(prev => prev.map(item => (item.id === isBusyItem.id ? { ...item, dateCleanedUp: '' } : item)));
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
                console.log(payload);

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
                setErrorText('Er is iets misgegaan met herberekenen van alle opschoon items.');
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
                setErrorText('Er is iets misgegaan met herberekenen van opschoon item ' + cleanupItem.name + '.');
                throw err;
            });
    };
    const confirmCleanup = cleanupItem => {
        isBusyCleanupItem(cleanupItem);

        return DataCleanupAPI.executeCleanupItem(cleanupItem.codeRef)
            .then(updatedItem => {
                setErrorText('');
                if (updatedItem) replaceCleanupItem(updatedItem);
                return updatedItem;
            })
            .catch(err => {
                const updatedItem = err?.response?.data?.data; // <— A1 payload
                if (updatedItem) {
                    replaceCleanupItem(updatedItem);
                } else {
                    clearCleanupItem(cleanupItem);
                }

                setErrorText('Er is iets misgegaan met opschonen van de gegevens.');
                throw err;
            });
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

                {errorText ? (
                    <div className="col-md-12 margin-10-top">
                        <div className="alert alert-danger">{errorText}</div>
                    </div>
                ) : null}

                <div className="col-md-12 margin-10-top">
                    <DataCleanupItemsList
                        cleanupData={cleanupData}
                        handleDataCleanupUpdateItem={handleDataCleanupUpdateItem}
                        confirmCleanup={confirmCleanup}
                        isLoading={isLoading}
                    />
                </div>
            </PanelBody>
        </Panel>
    );
}
