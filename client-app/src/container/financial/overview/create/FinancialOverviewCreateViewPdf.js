import React, { useEffect, useState, useCallback } from 'react';
import PdfViewer from '../../../../components/pdf/PdfViewer';
import FinancialOverviewContactAPI from '../../../../api/financial/overview/FinancialOverviewContactAPI';

const FinancialOverviewCreateViewPdf = ({
    financialOverviewContactId,
    isLoading = false,
    amountOfFinancialOverviewContacts = 0,
}) => {
    const [file, setFile] = useState(null);

    const downloadFile = useCallback(
        (id, attempt = 0) => {
            if (!id) return;

            FinancialOverviewContactAPI.download(id)
                .then(payload => {
                    setFile(payload.data);
                })
                .catch(() => {
                    if (attempt < 2) {
                        setTimeout(() => {
                            downloadFile(id, attempt + 1);
                        }, 500);
                    }
                });
        },
        [] // downloadFile zelf heeft geen externe deps
    );

    // telkens als de id verandert → opnieuw downloaden
    useEffect(() => {
        setFile(null); // even leeg zodat we "selecteer links..." kunnen tonen
        if (financialOverviewContactId) {
            downloadFile(financialOverviewContactId, 0);
        }
    }, [financialOverviewContactId, downloadFile]);

    if (isLoading) {
        return <div>Gegevens aan het laden.</div>;
    }

    if (!file) {
        // geen file gedownload
        if (amountOfFinancialOverviewContacts > 0) {
            return <div>Selecteer links in het scherm een contact om een preview te zien.</div>;
        }
        return <div>Geen gegevens gevonden.</div>;
    }

    return (
        <div>
            <PdfViewer file={file} />
        </div>
    );
};

export default FinancialOverviewCreateViewPdf;
