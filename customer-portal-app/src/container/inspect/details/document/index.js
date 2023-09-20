import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import LoadingView from '../../../../components/general/LoadingView';
import fileDownload from 'js-file-download';
import { FaFileDownload, FiZoomIn, FiZoomOut } from 'react-icons/all';
import DocumentAPI from '../../../../api/document/DocumentAPI';
import PdfViewer from '../../../../components/pdf/PdfViewer';
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';
import QuotationRequestAPI from '../../../../api/quotation-request/QuotationRequestAPI';

function DocumentPreview({ match, history }) {
    const [isLoading, setLoading] = useState(true);
    const [scale, setScale] = useState(1);
    const [file, setFile] = useState(null);
    const [initialDocument, setInitialDocument] = useState({});

    useEffect(() => {
        DocumentAPI.fetchDocumentDetails(match.params.id)
            .then(payload => {
                setInitialDocument(payload.data.data);
            })
            .catch(error => {
                if (error.response.status === 403) {
                    alert('Niet geautoriseerd voor dit document.');
                } else {
                    alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuwd.');
                }
            });
        QuotationRequestAPI.quotationRequestDownloadDocument(match.params.quotationRequestId, match.params.id)
            .then(payload => {
                setFile(payload.data);
            })
            .catch(error => {
                if (error.response.status === 403) {
                    alert('Niet geautoriseerd voor dit document.');
                } else {
                    alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuwd.');
                }
            });

        setLoading(false);
    }, []);

    function zoomIn() {
        setScale(scale + 0.2);
    }

    function zoomOut() {
        setScale(scale - 0.2);
    }

    function downloadFile(e) {
        e.preventDefault();

        QuotationRequestAPI.quotationRequestDownloadDocument(match.params.quotationRequestId, match.params.id)
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
                    {file && initialDocument.filename && initialDocument.filename.toLowerCase().endsWith('.pdf') ? (
                        <>
                            <Row className={'mb-1'}>
                                <Col xs={12} md={10}>
                                    <ButtonGroup aria-label="document-preview" className="w-button-group-left">
                                        <Button className={'w-button btn-sm'} onClick={() => zoomIn()}>
                                            <FiZoomIn />
                                            &nbsp;Inzoomen
                                        </Button>
                                        <Button className={'w-button btn-sm'} onClick={() => zoomOut()}>
                                            <FiZoomOut />
                                            &nbsp;Uitzoomen
                                        </Button>
                                        <Button className={'w-button btn-sm'} onClick={e => downloadFile(e)}>
                                            <FaFileDownload />
                                            &nbsp;Downloaden
                                        </Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={10}>
                                    <PdfViewer file={file} scale={scale} />
                                </Col>
                            </Row>
                        </>
                    ) : null}
                </>
            )}
        </Container>
    );
}

export default DocumentPreview;
