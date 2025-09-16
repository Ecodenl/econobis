// PdfViewer.js
import React, { useEffect, useMemo, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = '/js/pdf.worker.min.js';

function isDataUri(str) {
    return typeof str === 'string' && str.startsWith('data:');
}

function base64ToUint8Array(base64) {
    const binary = atob(base64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
}

function dataUriToBytes(dataUri) {
    const [, base64] = dataUri.split(',');
    return base64ToUint8Array(base64);
}

export default function PdfViewer({ file, scale = 1.0 }) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [docFileProp, setDocFileProp] = useState(null); // wat we aan <Document file={...} /> doorgeven
    const [objectUrl, setObjectUrl] = useState(null); // om later te revoken

    // Normaliseer 'file' naar iets wat react-pdf begrijpt:
    // - { url: string } of
    // - { data: Uint8Array | ArrayBuffer }
    useEffect(() => {
        let revoked = false;

        async function normalize() {
            // opruimen vorige blob url
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
                setObjectUrl(null);
            }

            if (!file) {
                setDocFileProp(null);
                return;
            }

            // 1) String URL
            if (typeof file === 'string' && !isDataUri(file)) {
                setDocFileProp({ url: file });
                return;
            }

            // 2) Data-URI string
            if (typeof file === 'string' && isDataUri(file)) {
                const bytes = dataUriToBytes(file);
                setDocFileProp({ data: bytes });
                return;
            }

            // 3) Base64 string (zonder data: prefix) — optioneel, als dat bij jullie voorkomt
            if (typeof file === 'string' && /^[A-Za-z0-9+/=\s]+$/.test(file) && file.length > 100) {
                const bytes = base64ToUint8Array(file.replace(/\s+/g, ''));
                setDocFileProp({ data: bytes });
                return;
            }

            // 4) Blob/File
            if (file instanceof Blob) {
                // Optie A: direct als bytes (meest CSP-onafhankelijk)
                // const bytes = new Uint8Array(await file.arrayBuffer());
                // setDocFileProp({ data: bytes });

                // Optie B: blob: URL (ook prima; let op revoke bij unmount/prop-wijziging)
                const url = URL.createObjectURL(file);
                if (!revoked) {
                    setObjectUrl(url);
                    setDocFileProp({ url });
                }
                return;
            }

            // 5) ArrayBuffer/Uint8Array
            if (file instanceof ArrayBuffer || file?.byteLength) {
                setDocFileProp({ data: file });
                return;
            }

            console.warn('Onbekend PDF file type voor react-pdf:', file);
            setDocFileProp(null);
        }

        normalize();

        return () => {
            revoked = true;
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [file]); // eslint-disable-line react-hooks/exhaustive-deps

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    return (
        <div className="pdf_viewer_wrapper">
            {docFileProp && (
                <>
                    <Document
                        file={docFileProp}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={e => console.error('PDF load error', e)}
                        loading={<div>PDF laden…</div>}
                        error={<div>Kan PDF niet laden.</div>}
                        options={
                            {
                                // eventueel extra pdf.js opties
                                // cMapUrl: '/cmaps/', cMapPacked: true,
                            }
                        }
                    >
                        <Page
                            className="pdf-viewer-page"
                            pageNumber={pageNumber}
                            scale={scale}
                            renderAnnotationLayer={false}
                            renderTextLayer={false}
                        />
                    </Document>

                    <div style={{ marginTop: 8 }}>
                        <h3 style={{ display: 'inline-block', marginTop: 0 }}>
                            Pagina {pageNumber} van {numPages ?? '…'}
                        </h3>
                    </div>

                    <div>
                        <Button
                            disabled={!numPages || pageNumber === 1}
                            onClick={() => setPageNumber(p => p - 1)}
                            title="Ga naar vorige pagina"
                        >
                            &lt;
                        </Button>
                        <Button
                            disabled={!numPages || pageNumber === numPages}
                            onClick={() => setPageNumber(p => p + 1)}
                            title="Ga naar volgende pagina"
                            style={{ marginLeft: 8 }}
                        >
                            &gt;
                        </Button>
                    </div>
                </>
            )}
            {!docFileProp && <div>Geen PDF-bestand beschikbaar.</div>}
        </div>
    );
}
