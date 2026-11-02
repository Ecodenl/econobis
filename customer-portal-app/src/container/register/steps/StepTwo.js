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
import DefaultContactOrganisationEdit from '../../contact-details/default-form-organisation/Edit';
import { Alert } from 'react-bootstrap';
import { isEmpty } from 'lodash';

function StepTwo({ portalSettings, previous, next, project, initialContact, handleSubmitContactValues }) {
    initialContact.isParticipant = true;
    const typeContact = initialContact.typeId ? initialContact.typeId : null;

    let validationSchema = null;
    let validationSchemaBasic = null;
    let validationSchemaAdditional = null;
    let validationSchemaPcrAdditional = null;
    let validationSchemaEnergySupplierRequired = null;

    const isEnergySupplierRequired =
        project.projectType.codeRef === 'energy_community' && project.energySupplierRegistrationRequired;

    switch (typeContact) {
        case 'person':
            validationSchemaBasic = ValidationSchemaPersonal.validationSchemaBasic;
            validationSchemaAdditional = ValidationSchemaPersonal.validationSchemaAdditional;
            validationSchema = validationSchemaBasic.concat(validationSchemaAdditional);
            if (project.projectType.codeRef === 'postalcode_link_capital') {
                validationSchemaPcrAdditional = ValidationSchemaPersonal.validationSchemaPcrAdditional;
                validationSchema = validationSchema.concat(validationSchemaPcrAdditional);
            }
            if (isEnergySupplierRequired) {
                validationSchemaEnergySupplierRequired =
                    ValidationSchemaPersonal.validationSchemaEnergySupplierRequired;
                validationSchema = validationSchema.concat(validationSchemaEnergySupplierRequired);
            }
            break;
        case 'organisation':
            validationSchemaBasic = ValidationSchemaOrganisation.validationSchemaBasic;
            validationSchemaAdditional = ValidationSchemaOrganisation.validationSchemaAdditional;
            validationSchema = validationSchemaBasic.concat(validationSchemaAdditional);
            if (project.projectType.codeRef === 'postalcode_link_capital') {
                validationSchemaPcrAdditional = ValidationSchemaOrganisation.validationSchemaPcrAdditional;
                validationSchema = validationSchema.concat(validationSchemaPcrAdditional);
            }
            if (isEnergySupplierRequired) {
                validationSchemaEnergySupplierRequired =
                    ValidationSchemaOrganisation.validationSchemaEnergySupplierRequired;
                validationSchema = validationSchema.concat(validationSchemaEnergySupplierRequired);
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
            >
                {({
                    errors,
                    touched,
                    submitCount,
                    setFieldValue,
                    setFieldError,
                    setFieldTouched,
                    isSubmitting,
                    status,
                    values,
                    handleSubmit,
                }) => {
                    return (
                        <Form>
                            {/* If contact is person */}
                            {initialContact.typeId === 'person' ? (
                                <DefaultContactPersonalEdit
                                    portalSettings={portalSettings}
                                    initialContact={initialContact}
                                    projectTypeCodeRef={project.projectType.codeRef}
                                    energySupplierRegistrationRequired={isEnergySupplierRequired}
                                    setFieldValue={setFieldValue}
                                    setFieldError={setFieldError}
                                    setFieldTouched={setFieldTouched}
                                    values={values}
                                    touched={
                                        isEnergySupplierRequired && submitCount > 0
                                            ? {
                                                  ...touched,
                                                  [initialContact.typeId === 'person'
                                                      ? 'primaryAddress'
                                                      : 'visitAddress']: {
                                                      ...(touched[
                                                          initialContact.typeId === 'person'
                                                              ? 'primaryAddress'
                                                              : 'visitAddress'
                                                      ] || {}),
                                                      currentAddressEnergySupplierElectricity: {
                                                          ...(touched[
                                                              initialContact.typeId === 'person'
                                                                  ? 'primaryAddress'
                                                                  : 'visitAddress'
                                                          ]?.currentAddressEnergySupplierElectricity || {}),
                                                          energySupplierId: true,
                                                          memberSince: true,
                                                      },
                                                  },
                                              }
                                            : touched
                                    }
                                    errors={errors}
                                    stepTwo={true}
                                />
                            ) : null}

                            {/* If contact is organisation */}
                            {initialContact.typeId === 'organisation' ? (
                                <DefaultContactOrganisationEdit
                                    portalSettings={portalSettings}
                                    initialContact={initialContact}
                                    projectTypeCodeRef={project.projectType.codeRef}
                                    energySupplierRegistrationRequired={isEnergySupplierRequired}
                                    setFieldValue={setFieldValue}
                                    setFieldError={setFieldError}
                                    setFieldTouched={setFieldTouched}
                                    values={values}
                                    touched={
                                        isEnergySupplierRequired && submitCount > 0
                                            ? {
                                                  ...touched,
                                                  [initialContact.typeId === 'person'
                                                      ? 'primaryAddress'
                                                      : 'visitAddress']: {
                                                      ...(touched[
                                                          initialContact.typeId === 'person'
                                                              ? 'primaryAddress'
                                                              : 'visitAddress'
                                                      ] || {}),
                                                      currentAddressEnergySupplierElectricity: {
                                                          ...(touched[
                                                              initialContact.typeId === 'person'
                                                                  ? 'primaryAddress'
                                                                  : 'visitAddress'
                                                          ]?.currentAddressEnergySupplierElectricity || {}),
                                                          energySupplierId: true,
                                                          memberSince: true,
                                                      },
                                                  },
                                              }
                                            : touched
                                    }
                                    errors={errors}
                                    stepTwo={true}
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
                                                Niet alle verplichte velden zijn ingevuld om verder te gaan naar de
                                                volgende stap!
                                            </Alert>
                                        </div>
                                    </Col>
                                </Row>
                            ) : null}
                            {status && status.message ? (
                                <Row>
                                    <Col>
                                        <div className="alert-wrapper">
                                            <Alert key={'form-general-error-alert'} variant={'danger'}>
                                                {status.message}
                                            </Alert>
                                        </div>
                                    </Col>
                                </Row>
                            ) : null}
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
}

export default StepTwo;
