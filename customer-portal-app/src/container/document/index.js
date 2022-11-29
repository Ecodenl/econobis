import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import LoadingView from '../../components/general/LoadingView';
import fileDownload from 'js-file-download';
import { FaFileDownload, FiZoomIn, FiZoomOut } from 'react-icons/all';
import DocumentAPI from '../../api/document/DocumentAPI';
import PdfViewer from '../../components/pdf/PdfViewer';

function DocumentPreview({ match, history }) {
    const [isLoading, setLoading] = useState(true);
    const [scale, setScale] = useState(1);
    const [file, setFile] = useState(null);
    const [initialDocument, setInitialDocument] = useState({});

    useEffect(() => {
        DocumentAPI.fetchDocumentDetails(match.params.id).then(payload => {
            console.log('fetch document');
            console.log(payload);
            setInitialDocument(payload.data.data);
            console.log(initialDocument);
        });

        DocumentAPI.downloadDocument(match.params.id).then(payload => {
            setFile(payload);
            console.log('download document');
        });
        // .catch(() => {
        //     if (i < 2) {
        //         setTimeout(() => {
        //             this.downloadFile(i);
        //         }, 500);
        //     }
        //     i++;
        // });

        // DocumentAPI.fetchById(match.params.id).then(response => {
        //     setInitialDocument(response.data);
        setLoading(false);
        // });
    }, []);

    function zoomIn() {
        setScale(scale + 0.2);
    }

    function zoomOut() {
        setScale(scale - 0.2);
    }

    function downloadFile(e) {
        e.preventDefault();

        DocumentAPI.downloadDocument(match.params.id)
            .then(payload => {
                fileDownload(payload.data, initialDocument.filename);
            })
            .catch(() => {
                alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
            });
    }

    return (
        <Container className={'content-section'}>
            {isLoading ? (
                <LoadingView />
            ) : (
                <>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="col-md-12 margin-10-top">
                                <a href="#" onClick={e => zoomIn()}>
                                    <FiZoomIn /> inzoomen
                                </a>
                                <a href="#" onClick={e => zoomOut()}>
                                    <FiZoomOut /> uitzoomen
                                </a>
                                <a href="#" onClick={e => downloadFile(e)}>
                                    <FaFileDownload /> downloaden
                                </a>
                            </div>

                            <div className="col-md-12 margin-10-top">
                                <PdfViewer file={file} scale={scale} />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Container>
    );
}

export default DocumentPreview;
