import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaFileDownload, FiZoomIn, FaTrash } from 'react-icons/all';
import fileDownload from 'js-file-download';
import QuotationRequestAPI from '../../../../api/quotation-request/QuotationRequestAPI';
import Modal from '../../../../components/modal/Modal';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import DropZone from '../../../../components/dropzone/DropZone';

function InspectDetailsDocumentTable({ quotationRequestId, documents, previewDocument, setReloadDocumenten }) {
    const [showDelete, setShowDelete] = useState(false);
    const [documentToDelete, setDocumentToDelete] = useState({});
    const [showUpload, setShowUpload] = useState(false);
    const toggleShowUpload = () => {
        setShowUpload(!showUpload);
    };
    const addUpload = files => {
        const data = new FormData();
        files.map((file, key) => {
            data.append('uploads[' + key + ']', file);
        });

        QuotationRequestAPI.addUploads(quotationRequestId, data)
            .then(() => {
                setReloadDocumenten(true);
            })
            .catch(function(error) {});
    };

    const hideShowDelete = () => {
        setShowDelete(false);
    };

    function showDeleteModal(e, id, filename) {
        e.preventDefault();
        setShowDelete(true);
        setDocumentToDelete({ id: id, filename: filename });
    }
    function downloadFile(e, id, filename) {
        e.preventDefault();

        QuotationRequestAPI.quotationRequestDownloadDocument(quotationRequestId, id)
            .then(payload => {
                fileDownload(payload.data, filename);
            })
            .catch(() => {
                alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
            });
    }
    function deleteFile(e, id) {
        e.preventDefault();

        QuotationRequestAPI.quotationRequestDeleteDocument(quotationRequestId, id)
            .then(payload => {
                setShowDelete(false);
                setReloadDocumenten(true);
            })
            .catch(() => {
                setShowDelete(false);
                alert('Er is iets misgegaan met verwijderen. Herlaad de pagina opnieuw.');
            });
    }

    return (
        <>
            <Row>
                <Col>
                    <div className="content-subheading">Documenten</div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ButtonGroup className="float-right">
                        <Button className={'w-button'} size="sm" onClick={toggleShowUpload}>
                            Upload PDF of afbeelding
                        </Button>
                    </ButtonGroup>
                    <br />
                    <br />
                </Col>
            </Row>
            {documents && documents.length !== 0 ? (
                <Table>
                    <thead>
                        <tr>
                            <th>Naam</th>
                            <th>Omschrijving</th>
                            <th>Downloaden</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents.map(item => (
                            <tr key={item.id}>
                                <td>{item.filename}</td>
                                <td>{item.description}</td>
                                <td>
                                    {item.filename && item.filename.toLowerCase().endsWith('.pdf') ? (
                                        <>
                                            <a href="#" onClick={e => previewDocument(e, item.id)}>
                                                <FiZoomIn /> preview
                                            </a>
                                            <br />
                                        </>
                                    ) : null}
                                    <>
                                        <a href="#" onClick={e => downloadFile(e, item.id, item.filename)}>
                                            <FaFileDownload /> downloaden
                                        </a>
                                        <br />
                                    </>
                                    {item.allowDelete ? (
                                        <>
                                            <a href="#" onClick={e => showDeleteModal(e, item.id, item.filename)}>
                                                <FaTrash color={'red'} /> verwijderen
                                            </a>
                                            <br />
                                        </>
                                    ) : null}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <Row>
                    <Col>Geen documenten gevonden.</Col>
                </Row>
            )}
            {showDelete ? (
                <Modal
                    closeModal={hideShowDelete}
                    confirmAction={e => deleteFile(e, documentToDelete.id)}
                    buttonConfirmText="Verwijderen"
                    title="Verwijderen document"
                >
                    Verwijderen document "{documentToDelete.filename}" ?
                </Modal>
            ) : null}
            {showUpload && (
                <DropZone
                    maxSize={5767168}
                    maxSizeText={'5MB'}
                    toggleShowUpload={toggleShowUpload}
                    addUpload={addUpload}
                />
            )}
        </>
    );
}

export default InspectDetailsDocumentTable;
