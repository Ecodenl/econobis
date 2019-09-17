import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ContactAPI from '../../../../api/contact/ContactAPI';
import ViewHtmlAsText from '../../../../components/general/ViewHtmlAsText';
import Col from 'react-bootstrap/Col';
import LoadingView from '../../../../components/general/LoadingView';

function StepFour({ previous, contactId, projectId }) {
    const [contactDocument, setContactDocument] = useState('');
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        // If there is an id and is not the same as previous id
        // then call api
        if (contactId) {
            (function callFetchContact() {
                setLoading(true);
                ContactAPI.previewDocument(contactId, projectId)
                    .then(payload => {
                        setContactDocument(payload.data);
                        setLoading(false);
                    })
                    .catch(error => {
                        alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                        setLoading(false);
                    });
            })();
        }
    }, [contactId]);

    return (
        <>
            {isLoading ? (
                <LoadingView />
            ) : (
                <div>
                    <Row>
                        <Col xs={12} md={10}>
                            <ViewHtmlAsText value={contactDocument} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={10}>
                            <ButtonGroup aria-label="Steps" className="float-right">
                                <Button className={'w-button'} size="sm" onClick={previous}>
                                    Terug
                                </Button>
                                <Button className={'w-button'} size="sm">
                                    Bevestigen inschrijving
                                </Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </div>
            )}
        </>
    );
}

export default StepFour;
