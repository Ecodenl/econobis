import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Alert } from 'react-bootstrap';

function ErrorUnauthorized() {
    return (
        <Row className="justify-content-center align-content-center flex-wrap" style={{ height: '40vh' }}>
            <Col xs={12} md={10}>
                <Row className="mb-2">
                    <Col>
                        <Alert key={'form-general-error-alert'} variant={'danger'}>
                            <h1 className="content-heading">Geen toegang.</h1>
                            <h3 className={'h3'}>U heeft geen rechten voor deze pagina en/of actie.</h3>
                        </Alert>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default ErrorUnauthorized;
