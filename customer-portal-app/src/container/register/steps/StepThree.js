import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Col from 'react-bootstrap/Col';
import { Alert } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import ProjectAPI from '../../../api/project/ProjectAPI';
import fileDownload from 'js-file-download';
import { FaFileDownload } from 'react-icons/all';

function StepThree({
    project,
    registerType,
    contactProjectData,
    previous,
    next,
    initialRegisterValues,
    handleSubmitRegisterValues,
}) {
    const validationSchema = Yup.object({
        didAcceptAgreement: Yup.bool().test(
            'didAcceptAgreement',
            'Je dient akkoord te gaan met de voorwaarden!',
            value => value === true
        ),
        didUnderstandInfo: Yup.bool().test(
            'didUnderstandInfo',
            'Je dient te bevestigen, dat de project informatie gelezen en begrepen is!',
            value => value === true
        ),
    });

    function downloadFile(e, id, filename) {
        e.preventDefault();

        ProjectAPI.documentDownload(project.id, id)
            .then(payload => {
                fileDownload(payload.data, filename);
            })
            .catch(() => {
                alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
            });
    }

    return (
        <div>
            <Formik
                validationSchema={validationSchema}
                onSubmit={function(values, actions) {
                    handleSubmitRegisterValues(values);
                    next();
                }}
                initialValues={initialRegisterValues}
            >
                {({ handleSubmit, touched, errors }) => (
                    <>
                        <Form>
                            <Row>
                                <Col xs={12} md={10}>
                                    <p>
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: contactProjectData.textAgreeTermsMerged.replace(
                                                    /\n/g,
                                                    '<br />'
                                                ),
                                            }}
                                        />
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={10}>
                                    <Field name="didAcceptAgreement">
                                        {({ field }) => (
                                            <label className="w-checkbox checkbox-fld">
                                                <input
                                                    type="checkbox"
                                                    {...field}
                                                    id="did_accept_agreement"
                                                    checked={field.value}
                                                    className="w-checkbox-input checkbox"
                                                />
                                                <span
                                                    htmlFor="did_accept_agreement"
                                                    className="checkbox-label w-form-label"
                                                    dangerouslySetInnerHTML={{
                                                        __html: contactProjectData.textLinkAgreeTermsMerged.replace(
                                                            /\n/g,
                                                            '<br />'
                                                        ),
                                                    }}
                                                />
                                                {project.documentAgreeTerms ? (
                                                    <>
                                                        {' '}
                                                        <a
                                                            href="#"
                                                            onClick={e =>
                                                                downloadFile(
                                                                    e,
                                                                    project.documentAgreeTerms.id,
                                                                    project.documentAgreeTerms.filename
                                                                )
                                                            }
                                                        >
                                                            <FaFileDownload /> downloaden
                                                        </a>
                                                    </>
                                                ) : null}
                                                {touched[field.name] && errors[field.name] ? (
                                                    <div className={'error-message text-danger'}>
                                                        {errors[field.name]}
                                                    </div>
                                                ) : null}
                                            </label>
                                        )}
                                    </Field>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={10}>
                                    <Field name="didUnderstandInfo">
                                        {({ field }) => (
                                            <label className="w-checkbox checkbox-fld">
                                                <input
                                                    type="checkbox"
                                                    {...field}
                                                    id="did_understand_info"
                                                    checked={field.value}
                                                    className="w-checkbox-input checkbox"
                                                />
                                                <span
                                                    htmlFor="did_understand_info"
                                                    className="checkbox-label w-form-label"
                                                    dangerouslySetInnerHTML={{
                                                        __html: contactProjectData.textLinkUnderstandInfoMerged.replace(
                                                            /\n/g,
                                                            '<br />'
                                                        ),
                                                    }}
                                                />
                                                {project.documentUnderstandInfo ? (
                                                    <>
                                                        {' '}
                                                        <a
                                                            href="#"
                                                            onClick={e =>
                                                                downloadFile(
                                                                    e,
                                                                    project.documentUnderstandInfo.id,
                                                                    project.documentUnderstandInfo.filename
                                                                )
                                                            }
                                                        >
                                                            <FaFileDownload /> downloaden
                                                        </a>
                                                    </>
                                                ) : null}{' '}
                                                {touched[field.name] && errors[field.name] ? (
                                                    <div className={'error-message text-danger'}>
                                                        {errors[field.name]}
                                                    </div>
                                                ) : null}
                                            </label>
                                        )}
                                    </Field>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={10}>
                                    <ButtonGroup aria-label="Steps" className="float-right">
                                        <Button className={'w-button'} size="sm" onClick={previous}>
                                            Terug
                                        </Button>
                                        <Button className={'w-button'} size="sm" onClick={handleSubmit}>
                                            {project.usesMollie ? (
                                                <>Ga naar bevestigen en betalen</>
                                            ) : (
                                                <>Ga naar bevestigen</>
                                            )}
                                        </Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                            {!isEmpty(errors) ? (
                                <Row>
                                    <Col>
                                        <div className="alert-wrapper">
                                            <Alert key={'form-general-error-alert'} variant={'warning'}>
                                                Niet alle verplichte velden zijn ingevuld om verder te gaan naar de
                                                volgende stap!
                                            </Alert>
                                        </div>
                                    </Col>
                                </Row>
                            ) : null}
                        </Form>
                    </>
                )}
            </Formik>
        </div>
    );
}

export default StepThree;
