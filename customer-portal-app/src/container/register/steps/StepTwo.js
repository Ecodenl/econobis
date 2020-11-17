import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import DefaultContactPersonalEdit from '../../contact-details/default-form-personal/Edit';
import { Form, Formik } from 'formik';
import { ClipLoader } from 'react-spinners';
import ValidationSchemaPersonal from '../../../helpers/ValidationSchemaPersonal';
import ValidationSchemaOrganisation from '../../../helpers/ValidationSchemaOrganisation';
import * as Yup from 'yup';
import DefaultContactOrganisationEdit from '../../contact-details/default-form-organisation/Edit';
import { Alert } from 'react-bootstrap';
import { isEmpty } from 'lodash';

function StepTwo({ portalSettings, previous, next, project, initialContact, handleSubmitContactValues }) {
    initialContact.isParticipant = true;
    const typeContact = initialContact.typeId ? initialContact.typeId : null;
    const validationSchemaPcrPersonal = Yup.object().shape({
        primaryAddress: Yup.object().shape({
            postalCode: Yup.string().test(
                'postal-code-primary-address-in-pcr-area',
                'Helaas je postcode ligt niet binnen het gebied van potentiele deelnemers',
                function(value) {
                    return project.postalcodeLink.includes(value.substring(0, 4));
                }
            ),
        }),
    });
    const validationSchemaPcrOrganisation = Yup.object().shape({
        visitAddress: Yup.object().shape({
            postalCode: Yup.string()
                .test(
                    'postal-code-visit-address-in-pcr-area',
                    'Helaas je postcode ligt niet binnen het gebied van potentiele deelnemers',
                    function(value) {
                        return project.postalcodeLink.includes(value.substring(0, 4));
                    }
                )
                .required('Verplicht'),
        }),
    });

    let validationSchema = null;
    let validationSchemaBasic = null;
    let validationSchemaAdditional = null;
    let validationSchemaPcrAdditional = null;
    switch (typeContact) {
        case 'person':
            validationSchemaBasic = ValidationSchemaPersonal.validationSchemaBasic;
            validationSchemaAdditional = ValidationSchemaPersonal.validationSchemaAdditional;
            validationSchemaPcrAdditional = ValidationSchemaPersonal.validationSchemaPcrAdditional;
            validationSchema = validationSchemaBasic.concat(validationSchemaAdditional);
            if (project.projectType.codeRef === 'postalcode_link_capital') {
                validationSchema = validationSchema.concat(validationSchemaPcrAdditional);
                validationSchema = validationSchema.concat(validationSchemaPcrPersonal);
            }
            break;
        case 'organisation':
            validationSchemaBasic = ValidationSchemaOrganisation.validationSchemaBasic;
            validationSchemaAdditional = ValidationSchemaOrganisation.validationSchemaAdditional;
            validationSchemaPcrAdditional = ValidationSchemaPersonal.validationSchemaPcrAdditional;
            validationSchema = validationSchemaBasic.concat(validationSchemaAdditional);
            if (project.projectType.codeRef === 'postalcode_link_capital') {
                validationSchema = validationSchema.concat(validationSchemaPcrAdditional);
                validationSchema = validationSchema.concat(validationSchemaPcrOrganisation);
            }
            break;
    }
    return (
        <div>
            <Formik
                initialValues={initialContact}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                    actions.setSubmitting(true);
                    handleSubmitContactValues(values, actions, next);
                }}
                render={({ errors, touched, setFieldValue, isSubmitting, values, handleSubmit }) => {
                    console.log(errors);
                    return (
                        <Form>
                            {/* If contact is person */}
                            {initialContact.typeId === 'person' ? (
                                <DefaultContactPersonalEdit
                                    portalSettings={portalSettings}
                                    initialContact={initialContact}
                                    projectTypeCodeRef={project.projectType.codeRef}
                                    setFieldValue={setFieldValue}
                                    values={values}
                                    touched={touched}
                                    errors={errors}
                                />
                            ) : null}

                            {/* If contact is organisation */}
                            {initialContact.typeId === 'organisation' ? (
                                <DefaultContactOrganisationEdit
                                    portalSettings={portalSettings}
                                    initialContact={initialContact}
                                    projectTypeCodeRef={project.projectType.codeRef}
                                    setFieldValue={setFieldValue}
                                    values={values}
                                    touched={touched}
                                    errors={errors}
                                />
                            ) : null}

                            <Row>
                                <Col>
                                    <ButtonGroup aria-label="Steps" className="float-right">
                                        <Button className={'w-button'} size="sm" onClick={previous}>
                                            Terug
                                        </Button>
                                        <Button
                                            className={'w-button'}
                                            size="sm"
                                            onClick={handleSubmit}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <span>
                                                    <ClipLoader color={'white'} size={14} />
                                                    Bezig met opslaan
                                                </span>
                                            ) : (
                                                'Opslaan en doorgaan'
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
                                                Niet alle verplichten velden zijn ingevuld om verder te gaan naar de
                                                volgende stap!
                                            </Alert>
                                        </div>
                                    </Col>
                                </Row>
                            ) : null}
                        </Form>
                    );
                }}
            />
        </div>
    );
}

export default StepTwo;
