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

function StepTwo({ portalSettings, previous, next, project, initialContact, handleSubmitContactValues }) {
    const typeContact = initialContact.typeId ? initialContact.typeId : null;
    const validationSchemaPcrPersonal = Yup.object().shape({
        primaryAddress: Yup.object().shape({
            postalCode: Yup.string().test(
                'test-compare a few values',
                'Helaas je postcode ligt niet binnen het gebied van potentiele deelnemers',
                function(value) {
                    return project.postalcodeLink.includes(value.substring(0, 4));
                }
            ),
        }),
        primaryContactEnergySupplier: Yup.object().shape({
            energySupplierId: Yup.string()
                .nullable()
                .required('Verplicht'),
            esNumber: Yup.string()
                .nullable()
                .trim()
                .required('Verplicht'),
            eanElectricity: Yup.string()
                .nullable()
                .trim()
                .required('Verplicht'),
        }),
    });
    const validationSchemaPcrOrganisation = Yup.object().shape({
        visitAddress: Yup.object().shape({
            postalCode: Yup.string()
                .test(
                    'test-compare a few values',
                    'Helaas je postcode ligt niet binnen het gebied van potentiele deelnemers',
                    function(value) {
                        return project.postalcodeLink.includes(value.substring(0, 4));
                    }
                )
                .required('Verplicht'),
        }),
        primaryContactEnergySupplier: Yup.object().shape({
            energySupplierId: Yup.string()
                .nullable()
                .required('Verplicht'),
            esNumber: Yup.string()
                .nullable()
                .trim()
                .required('Verplicht'),
            eanElectricity: Yup.string()
                .nullable()
                .trim()
                .required('Verplicht'),
        }),
    });

    let validationSchema = null;
    let validationSchemaBasic = null;
    let validationSchemaAdditional = null;
    switch (typeContact) {
        case 'person':
            validationSchemaBasic = ValidationSchemaPersonal.validationSchemaBasic;
            validationSchemaAdditional = ValidationSchemaPersonal.validationSchemaAdditional;
            validationSchema = validationSchemaBasic.concat(validationSchemaAdditional);
            if (project.projectType.codeRef === 'postalcode_link_capital') {
                validationSchema = validationSchema.concat(validationSchemaPcrPersonal);
            }
            break;
        case 'organisation':
            validationSchemaBasic = ValidationSchemaOrganisation.validationSchemaBasic;
            validationSchemaAdditional = ValidationSchemaOrganisation.validationSchemaAdditional;
            validationSchema = validationSchemaBasic.concat(validationSchemaAdditional);
            if (project.projectType.codeRef === 'postalcode_link_capital') {
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
                    return (
                        <Form>
                            {/* If contact is person */}
                            {initialContact.typeId === 'person' ? (
                                <DefaultContactPersonalEdit
                                    portalSettings={portalSettings}
                                    initialContact={initialContact}
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
                        </Form>
                    );
                }}
            />
        </div>
    );
}

export default StepTwo;
