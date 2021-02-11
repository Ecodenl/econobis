import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function RegistrationDetailsTitle({ contactName, projectName, administrationName }) {
    return (
        <Row>
            <Col>
                <h1 className="content-heading">
                    Deelname van {contactName} in de {projectName}
                </h1>
                <span className="content-subheading">Uitgevende instantie {administrationName}</span>
            </Col>
        </Row>
    );
}

export default RegistrationDetailsTitle;
