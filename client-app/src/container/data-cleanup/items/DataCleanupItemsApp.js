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
            .then(payload => {
                setCleanupData(payload ?? []);
                setIsLoading(false);
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

    const handleDataCleanupCleanupItemsAll = () => {
        const ok = window.confirm(
            'Weet je zeker dat je ALLE opschoon-items wilt uitvoeren?\n\nDeze verwijderactie is niet terug te draaien.'
        );

        if (!ok) return;

        setIsLoading(true);

        DataCleanupAPI.cleanupItemsAll()
            .then(results => {
                setErrorText('');

                // results: [{ codeRef, statusCode, errors, item }]
                (results || []).forEach(r => {
                    if (r?.item) replaceCleanupItem(r.item);
                });

                const failed = (results || []).filter(r => r?.statusCode >= 400);
                if (failed.length) {
                    setErrorText(
                        `Opschonen alles is uitgevoerd, maar ${failed.length} item(s) hadden fouten. ` +
                            `Open een specifiek item voor details (opschoon-knop).`
                    );
                    console.log('cleanup-items-all failures:', failed);
                }

                setIsLoading(false);
            })
            .catch(err => {
                // Bij 412/500 komt axios hier; maar we willen alsnog results verwerken
                const results = err?.response?.data?.data?.results ?? [];
                const message = err?.response?.data?.message;

                (results || []).forEach(r => {
                    if (r?.item) replaceCleanupItem(r.item);
                });

                const failed = (results || []).filter(r => r?.statusCode >= 400);

                setErrorText(
                    message ||
                        (failed.length
                            ? `Opschonen alles is uitgevoerd, maar ${failed.length} item(s) hadden fouten.`
                            : 'Er is iets misgegaan met opschonen van alle items.')
                );

                console.log('cleanup-items-all error response:', err?.response?.data);
                setIsLoading(false);
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
                        handleDataCleanupCleanupItemsAll={handleDataCleanupCleanupItemsAll}
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
