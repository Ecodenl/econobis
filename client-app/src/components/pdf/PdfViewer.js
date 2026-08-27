// PdfViewer.js
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = '/js/pdf.worker.min.js';

export default function PdfViewer({ file, scale = 1.0 }) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        // behoud huidige pagina en clamp binnen bereik
        setPageNumber(p => Math.max(1, Math.min(p || 1, numPages)));
    }

    return (
        <div className="pdf_viewer_wrapper">
            <Document
                file={file} // verwacht een URL (aanrader)
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={e => console.error('PDF load error', e)}
                loading={<div>PDF laden…</div>}
                error={<div>Kan PDF niet laden.</div>}
            >
                <Page
                    key={pageNumber} // forceer remount bij paginawissel
                    className="pdf-viewer-page"
                    pageNumber={pageNumber}
                    scale={scale}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                />
            </Document>

            <div className="text-center" style={{ marginTop: 8 }}>
                Pagina {pageNumber} van {numPages ?? '…'}
            </div>

            {numPages > 1 && (
                <div>
                    <Button
                        className="w-button btn-sm text-left"
                        disabled={!numPages || pageNumber === 1}
                        onClick={() => setPageNumber(p => p - 1)}
                        title="Vorige pagina"
                    >
                        <FiArrowLeft />
                        &nbsp;Vorige pagina&nbsp;
                    </Button>
                    <Button
                        className="w-button btn-sm"
                        disabled={!numPages || pageNumber === numPages}
                        onClick={() => setPageNumber(p => p + 1)}
                        title="Volgende pagina"
                    >
                        &nbsp;Volgende pagina&nbsp;
                        <FiArrowRight />
                    </Button>
                </div>
            )}
        </div>
    );
}
