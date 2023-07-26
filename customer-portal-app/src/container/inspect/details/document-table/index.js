import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaFileDownload, FiZoomIn, FaTrash } from 'react-icons/all';
import fileDownload from 'js-file-download';
import QuotationRequestAPI from '../../../../api/quotation-request/QuotationRequestAPI';
import Modal from '../../../../components/modal/Modal';

function InspectDetailsDocumentTable({ quotationRequestId, documents, previewDocument, setReload }) {
    const [showDelete, setShowDelete] = useState(false);
    const [documentToDelete, setDocumentToDelete] = useState({});

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
                setReload(true);
            })
            .catch(() => {
                setShowDelete(false);
                alert('Er is iets misgegaan met verwijderen. Herlaad de pagina opnieuw.');
            });
    }

    if (documents && documents.length !== 0) {
        return (
            <>
                <Row>
                    <Col>
                        <div className="content-subheading">Documenten</div>
                    </Col>
                </Row>
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
            </>
        );
    }

    return null;
}

export default InspectDetailsDocumentTable;
