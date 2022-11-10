import React from 'react';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaFileDownload } from 'react-icons/all';
import fileDownload from 'js-file-download';
import QuotationRequestAPI from '../../../../api/quotation-request/QuotationRequestAPI';

function InspectDetailsDocumentTable({ quotationRequestId, documents }) {
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
                                    <a href="#" onClick={e => downloadFile(e, item.id, item.filename)}>
                                        <FaFileDownload /> downloaden
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </>
        );
    }

    return null;
}

export default InspectDetailsDocumentTable;
