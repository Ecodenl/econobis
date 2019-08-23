import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MasterForm from './MasterForm';

function RegisterCapital({ match }) {
    // TODO search for project name or maybe id
    const projectName = match.params.project;

    // TODO project example
    const project = {
        name: 'Zonneweide (voorbeeld)',
        minimumQuantity: 1,
        maximumQuantity: 5,
        participationWorth: 200,
    };

    return (
        <Container className={'content-section'}>
            <Row>
                <Col>
                    <h1 className="content-heading">
                        Schrijf je in voor project <strong>{project.name}</strong>
                    </h1>
                    <MasterForm />
                </Col>
            </Row>
        </Container>
    );
}

export default RegisterCapital;
