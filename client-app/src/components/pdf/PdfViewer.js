import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

// oud
// const {Document, Page} = supportsPdfViewer ? require('react-pdf/dist/esm/entry.webpack') : {};
// pdfjs.GlobalWorkerOptions.workerSrc = '/js/pdf.worker.min.js';

//nieuw
// ChatGPT: The error occurs because recent versions of react-pdf have changed their package structure and no longer
// export react-pdf/dist/esm/entry.webpack. Instead, you should import react-pdf directly from the main package.
import { Document, Page, pdfjs } from 'react-pdf';
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc = '/js/pdf.worker.min.js';

//customer portal app
// import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack';
// pdfjs.GlobalWorkerOptions.workerSrc = '/js/pdf.worker.min.js';

/**
 * Import pdf library dynamically based on support
 */
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const supportsPdfViewer = !isSafari;

function PdfViewer(props) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [base64, setBase64] = useState(null);
    const { file, scale } = props;

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const blobToBase64 = function(blob, callback) {
        var reader = new FileReader();
        reader.onload = function() {
            var dataUrl = reader.result;
            var base64 = dataUrl.split(',')[1];
            callback(base64);
        };
        reader.readAsDataURL(blob);
    };

    useEffect(() => {
        if (!file || supportsPdfViewer) {
            return;
        }

        blobToBase64(file, function(base64) {
            setBase64(base64);
        });
    }, [file]);

    return (
        <div className="pdf_viewer_wrapper">
            {isSafari && base64 && (
                <iframe
                    src={'data:application/pdf;base64,' + base64}
                    style={{ height: 'calc(100vh - 500px)' }}
                    title={'PDF viewer'}
                />
            )}

            {supportsPdfViewer && (
                <>
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
                </>
            )}
        </div>
    );
}

export default PdfViewer;
