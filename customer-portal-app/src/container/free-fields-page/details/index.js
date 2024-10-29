import React, { useState, useEffect, useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoadingView from '../../../components/general/LoadingView';
import { PortalUserContext } from '../../../context/PortalUserContext';
import PortalFreeFieldsPageAPI from '../../../api/portal-free-fields-page/PortalFreeFieldsPageAPI';
import { isEmpty } from 'lodash';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import ContactAPI from '../../../api/contact/ContactAPI';
import axios from 'axios';
import FreeFields from '../../../components/freeFields/FreeFields';

function Index({ match, history }) {
    const { currentSelectedContact } = useContext(PortalUserContext);
    const [portalFreeFieldsPage, setPortalFreeFieldsPage] = useState({});
    const [portalFreeFieldsFieldRecords, setPortalFreeFieldsFieldRecords] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [showEdit, setShowEdit] = useState(false);

    useEffect(() => {
        if (currentSelectedContact.id) {
            (function callFetchFreeFieldsPage() {
                setLoading(true);

                axios
                    .all([
                        PortalFreeFieldsPageAPI.fetchFreeFieldsPage(currentSelectedContact.id, match.params.urlPageRef),
                        ContactAPI.fetchContactPortalFreeFields(currentSelectedContact.id, match.params.urlPageRef),
                    ])
                    .then(
                        axios.spread((payloadFreeFieldsPage, payloadContactPortalFreeFields) => {
                            setPortalFreeFieldsPage(payloadFreeFieldsPage.data.data);
                            setPortalFreeFieldsFieldRecords(payloadContactPortalFreeFields.data);
                            setLoading(false);
                        })
                    )
                    .catch(error => {
                        setErrorMessage(
                            error?.response?.data?.message
                                ? error.response.data.message
                                : 'Er is iets misgegaan met laden. Herlaad de pagina opnieuw.'
                        );
                        setLoading(false);
                    });
            })();
        }
    }, [match, currentSelectedContact]);

    function redirectBack() {
        // hier evt. terug naar dashboard?
        history.push('/dashboard');
    }

    const handleSubmit = (values, actions) => {
        PortalFreeFieldsPageAPI.update({
            id: match.params.id,
            freeFieldValue: values.freeFieldValue,
        }).then(response => {
            redirectBack();
        });
    };

    if (errorMessage) {
        return (
            <div className={'content-section'}>
                <div className="content-container w-container">
                    {isLoading ? (
                        <LoadingView />
                    ) : (
                        <Row>
                            <Col>
                                <p>{errorMessage}</p>
                            </Col>
                        </Row>
                    )}
                </div>
            </div>
        );
    }

    const editButtonGroup = (
        <ButtonGroup aria-label="free-fields-page]" className={'float-right'}>
            <Button
                className={'w-button'}
                size="sm"
                onClick={function() {
                    setShowEdit(true);
                }}
            >
                Wijzig
            </Button>
        </ButtonGroup>
    );

    return (
        <div className={'content-section'}>
            {isLoading ? (
                <LoadingView />
            ) : (
                <>
                    <div className="content-container w-container">
                        {showEdit ? (
                            <Row>
                                <Col>
                                    <h1 className="content-heading mt-0">{portalFreeFieldsPage.name} EDIT !</h1>
                                </Col>
                            </Row>
                        ) : (
                            <Row>
                                <Col>
                                    <h1 className="content-heading mt-0">{portalFreeFieldsPage.name}</h1>
                                </Col>
                                <Col>{editButtonGroup}</Col>
                            </Row>
                        )}
                        <Row>
                            <Col>
                                {!isEmpty(portalFreeFieldsPage.description) ? (
                                    <p className={'text-left'} style={{ whiteSpace: 'break-spaces' }}>
                                        {portalFreeFieldsPage.description}
                                    </p>
                                ) : null}
                            </Col>
                        </Row>
                        <FreeFields freeFieldsFieldRecords={portalFreeFieldsFieldRecords} showEdit={showEdit} />
                        {/*<Row className={'mt-5'}>*/}
                        {/*    <Col>*/}
                        {/*        <FreeFieldsPageDetailsFieldsList*/}
                        {/*            redirectBack={redirectBack}*/}
                        {/*            initialPortalFreeFieldsPage={portalFreeFieldsPage}*/}
                        {/*            handleSubmit={{}}*/}
                        {/*            // handleSubmit={handleSubmit}*/}
                        {/*        />*/}
                        {/*    </Col>*/}
                        {/*</Row>*/}
                        {/*<Row>*/}
                        {/*    <Col>*/}
                        {/*        <ButtonGroup className="float-right">*/}
                        {/*            <Link to={`/inschrijven/${project.id}`}>*/}
                        {/*                <Button className={'w-button'} size="sm">*/}
                        {/*                    Ga naar inschrijven*/}
                        {/*                </Button>*/}
                        {/*            </Link>*/}
                        {/*        </ButtonGroup>*/}
                        {/*    </Col>*/}
                        {/*</Row>*/}
                    </div>
                </>
            )}
        </div>
    );
}

export default Index;
