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
import { Formik } from 'formik';
import ValidationSchemaFreeFields from '../../../helpers/ValidationSchemaFreeFields';
import FormLabel from 'react-bootstrap/FormLabel';
import TextBlock from '../../../components/general/TextBlock';
import MoneyPresenter from '../../../helpers/MoneyPresenter';
import moment from 'moment/moment';

function Index({ match, history }) {
    const { currentSelectedContact } = useContext(PortalUserContext);
    const [contact, setContact] = useState({});
    const [portalFreeFieldsPage, setPortalFreeFieldsPage] = useState({});
    const [portalFreeFieldsFieldRecords, setPortalFreeFieldsFieldRecords] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [showEdit, setShowEdit] = useState(false);

    useEffect(() => {
        if (currentSelectedContact.id) {
            callFetchFreeFieldsPage();
        }
    }, [match, currentSelectedContact]);

    function redirectBack() {
        // hier evt. terug naar dashboard?
        history.push('/dashboard');
    }

    function callFetchFreeFieldsPage() {
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

                    // Set up initial freeFieldsFieldRecords inside contact
                    const initialPortalFreeFieldsFieldRecords = payloadContactPortalFreeFields.data.reduce(
                        (acc, record) => {
                            switch (record.fieldFormatType) {
                                case 'boolean':
                                    acc[`record-${record.id}`] = record.fieldRecordValueBoolean || null;
                                    break;
                                case 'text_short':
                                    acc[`record-${record.id}`] = record.fieldRecordValueText || null;
                                    break;
                                case 'text_long':
                                    acc[`record-${record.id}`] = record.fieldRecordValueText || null;
                                    break;
                                case 'int':
                                    acc[`record-${record.id}`] = record.fieldRecordValueInt || null;
                                    break;
                                case 'double_2_dec':
                                    acc[`record-${record.id}`] = record.fieldRecordValueDouble || null;
                                    break;
                                case 'amount_euro':
                                    acc[`record-${record.id}`] = record.fieldRecordValueDouble || null;
                                    break;
                                case 'date':
                                    acc[`record-${record.id}`] = record.fieldRecordValueDatetime || null;
                                    break;
                                case 'datetime':
                                    acc[`record-${record.id}`] = record.fieldRecordValueDatetime || null;
                                    break;
                            }
                            return acc;
                        },
                        {}
                    );

                    let contactData = { ...currentSelectedContact };
                    contactData.freeFieldsFieldRecords = initialPortalFreeFieldsFieldRecords;
                    setContact(contactData);

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
    }

    function handleSubmitContactValues(values, actions, switchToView) {
        const updatedContact = { ...contact, ...values, projectId: null };
        PortalFreeFieldsPageAPI.update(updatedContact.freeFieldsFieldRecords)
            .then(payload => {
                callFetchFreeFieldsPage();
                actions.setSubmitting(false);
                switchToView();
            })
            .catch(error => {
                actions.setSubmitting(false);
                actions.setStatus({
                    message: error.response.data.message,
                });
                // alert('Er is iets misgegaan met opslaan! Herlaad de pagina opnieuw.');
            });
    }

    // todo WM: opschonen
    // const handleSubmit = (values, actions) => {
    //     PortalFreeFieldsPageAPI.update({
    //         id: match.params.id,
    //         freeFieldValue: values.freeFieldValue,
    //     }).then(response => {
    //         redirectBack();
    //     });
    // };

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

    const validationSchema = ValidationSchemaFreeFields.validationSchemaBasic;

    const editButtonGroup = (
        <ButtonGroup aria-label="free-fields-page" className={'float-right'}>
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
                        <Row>
                            <Col>
                                <h1 className="content-heading mt-0">{portalFreeFieldsPage.name}</h1>
                            </Col>
                            {!showEdit && <Col>{editButtonGroup}</Col>}
                        </Row>
                        <Row>
                            <Col>
                                {!isEmpty(portalFreeFieldsPage.description) ? (
                                    <p className={'text-left'} style={{ whiteSpace: 'break-spaces' }}>
                                        {portalFreeFieldsPage.description}
                                    </p>
                                ) : null}
                            </Col>
                        </Row>
                        <Formik
                            initialValues={contact}
                            enableReinitialize={true}
                            validationSchema={validationSchema}
                            onSubmit={(values, actions) => {
                                actions.setSubmitting(true);
                                handleSubmitContactValues(values, actions, () => setShowEdit(false));
                            }}
                        >
                            {({ errors, touched, setFieldValue, isSubmitting, status, values, handleSubmit }) => {
                                return (
                                    <FreeFields
                                        freeFieldsFieldRecords={portalFreeFieldsFieldRecords}
                                        showEdit={showEdit}
                                        touched={touched}
                                        errors={errors}
                                        setFieldValue={setFieldValue}
                                        values={values}
                                        layout="double" // Renders in two columns
                                    />
                                );
                            }}
                        </Formik>
                        {/*todo WM: opschonen*/}
                        {/*<FreeFields freeFieldsFieldRecords={portalFreeFieldsFieldRecords} showEdit={showEdit} />*/}
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
