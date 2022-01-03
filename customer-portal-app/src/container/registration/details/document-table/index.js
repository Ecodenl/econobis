import React from 'react';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaFileDownload } from 'react-icons/all';
import fileDownload from 'js-file-download';
import ParticipantProjectAPI from '../../../../api/participant-project/ParticipantProjectAPI';

function RegistrationDetailsDocumentTable({ participantId, documents }) {
    console.log('participantId');
    console.log(participantId);
    console.log('documents');
    console.log(documents);
    function downloadFile(e, id, filename) {
        e.preventDefault();

        ParticipantProjectAPI.participantDocumentDownload(participantId, id)
            .then(payload => {
                fileDownload(payload.data, filename);
            })
            .catch(() => {
                alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
            });
    }

    if (
        (documents && documents.relatedDocumentsOnPortal && documents.relatedDocumentsOnPortal.length !== 0) ||
        (documents && documents.relatedDocumentsOnPortal && documents.relatedDocumentsOnPortal.length !== 0)
    ) {
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
                    {documents &&
                    documents.relatedDocumentsOnPortal &&
                    documents.relatedDocumentsOnPortal.length !== 0 ? (
                        <tbody>
                            {documents.relatedDocumentsOnPortal.map(item => (
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
                    ) : null}
                    {documents &&
                    documents.relatedDocumentsProjectOnPortal &&
                    documents.relatedDocumentsProjectOnPortal.length !== 0 ? (
                        <tbody>
                            {documents.relatedDocumentsProjectOnPortal.map(item => (
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
                    ) : null}
                </Table>
            </>
        );
    }

    return null;
}

export default RegistrationDetailsDocumentTable;
