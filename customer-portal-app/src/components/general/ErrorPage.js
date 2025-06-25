import React, { useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { PortalUserConsumer } from '../../context/PortalUserContext';
import { withRouter } from 'react-router-dom';
import { AuthConsumer } from '../../context/AuthContext';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { Alert } from 'react-bootstrap';

function ErrorPage({ history, message = null }) {
    return (
        <AuthConsumer>
            {({ logout }) => {
                return (
                    <PortalUserConsumer>
                        {({ resetCurrentUserToDefault }) => {
                            return (
                                <Row
                                    className="justify-content-center align-content-center flex-wrap"
                                    style={{ height: '40vh' }}
                                >
                                    <Col xs={12} md={10}>
                                        <Row className="mb-2">
                                            <Col>
                                                <Alert key={'form-general-error-alert'} variant={'danger'}>
                                                    {message ? (
                                                        <h3 className={'h3'}>{message}</h3>
                                                    ) : (
                                                        <h1 className="content-heading">
                                                            Oeps... er is helaas iets mis gegaan.
                                                        </h1>
                                                    )}
                                                </Alert>
                                            </Col>
                                        </Row>
                                        {message ? (
                                            <Row className="mb-2">
                                                <Col>
                                                    <ButtonGroup>
                                                        {' '}
                                                        <Button
                                                            className={'w-button'}
                                                            size="sm"
                                                            onClick={() => {
                                                                history.goBack();
                                                                setTimeout(() => {
                                                                    window.location.reload();
                                                                }, 100); // 100ms delay to ensure navigation completes
                                                            }}
                                                        >
                                                            Ga terug
                                                        </Button>
                                                    </ButtonGroup>
                                                </Col>
                                            </Row>
                                        ) : (
                                            <>
                                                <Row className="mb-2">
                                                    <Col>
                                                        <ButtonGroup>
                                                            {' '}
                                                            <Button
                                                                className={'w-button'}
                                                                size="sm"
                                                                onClick={() => window.location.reload()}
                                                            >
                                                                Pagina opnieuw laden
                                                            </Button>
                                                        </ButtonGroup>
                                                    </Col>
                                                </Row>
                                                <Row className="mb-2">
                                                    <Col xs={12} md={10}>
                                                        <ButtonGroup>
                                                            <Button
                                                                className={'w-button'}
                                                                size="sm"
                                                                onClick={() => {
                                                                    logout(true);
                                                                    resetCurrentUserToDefault();
                                                                }}
                                                            >
                                                                Log opnieuw in
                                                            </Button>
                                                        </ButtonGroup>
                                                    </Col>
                                                </Row>
                                            </>
                                        )}
                                    </Col>
                                </Row>
                            );
                        }}
                    </PortalUserConsumer>
                );
            }}
        </AuthConsumer>
    );
}

export default withRouter(ErrorPage);
