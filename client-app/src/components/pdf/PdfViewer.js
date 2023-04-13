import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { Button } from 'react-bootstrap';

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
                <div></div>
                <h3 style={{ display: 'inline-block', marginTop: '0px' }}>
                    Pagina {pageNumber} van {numPages}
                </h3>
            </div>
            <div>
                <Button
                    disabled={pageNumber === 1}
                    onClick={() => setPageNumber(pageNumber - 1)}
                    title={'Ga naar vorige pagina'}
                >
                    &lt;
                </Button>
                <Button
                    disabled={pageNumber === numPages}
                    onClick={() => setPageNumber(pageNumber + 1)}
                    title={'Ga naar volgende pagina'}
                >
                    &gt;
                </Button>
            </div>
        </div>
    );
}
export default PdfViewer;
