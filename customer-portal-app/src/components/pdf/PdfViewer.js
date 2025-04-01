import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FiArrowLeft, FiArrowRight } from 'react-icons/all';

import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = '/js/pdf.worker.min.js';

function PdfViewer(props) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const { file, scale } = props;

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div className="pdf_viewer_wrapper">
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                <Page
                    className={'pdf-viewer-page'}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                    pageNumber={pageNumber}
                    scale={scale}
                />
            </Document>
            <div>
                <div className="text-center">
                    Pagina {pageNumber} van {numPages}
                </div>
            </div>
            {numPages > 1 ? (
                <>
                    <ButtonGroup aria-label="document-preview">
                        <Button
                            className={'w-button btn-sm text-left'}
                            disabled={pageNumber === 1}
                            onClick={() => setPageNumber(pageNumber - 1)}
                        >
                            <FiArrowLeft />
                            &nbsp;Vorige pagina&nbsp;
                        </Button>
                        <Button
                            className={'w-button btn-sm'}
                            disabled={pageNumber === numPages}
                            onClick={() => setPageNumber(pageNumber + 1)}
                        >
                            &nbsp;Volgende pagina&nbsp;
                            <FiArrowRight />
                        </Button>
                    </ButtonGroup>
                </>
            ) : null}
        </div>
    );
}
export default PdfViewer;
