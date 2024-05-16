import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import PdfViewer from '../../../../components/pdf/PdfViewer';
import InvoiceDetailsAPI from '../../../../api/invoice/InvoiceDetailsAPI';

function InvoiceViewForm(props) {
    const [file, setFile] = useState(null);
    const [isLoadingFile, setLoadingFile] = useState(false);
    const invoiceDetails = useSelector(state => state.invoiceDetails);

    useEffect(() => {
        downloadFile();
    }, [invoiceDetails.id]);

    function downloadFile() {
        setLoadingFile(true);
        InvoiceDetailsAPI.download(invoiceDetails.id)
            .then(payload => {
                setFile(payload.data);
                setLoadingFile(false);
            })
            .catch(error => {
                console.log(error);
                setLoadingFile(false);
            });
    }

    return isEmpty(invoiceDetails) ? (
        <div>Geen gegevens gevonden.</div>
    ) : isLoadingFile ? (
        <div>Document aan het ophalen...</div>
    ) : (
        <div>
            <PdfViewer file={file} scale={props.scale} />
        </div>
    );
}

export default InvoiceViewForm;
