import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DefaultContactOrganisationView from './default-form-organisation/View';
import DefaultContactOrganisationEdit from './default-form-organisation/Edit';
import Col from 'react-bootstrap/Col';
import { Form, Formik } from 'formik';
import { ClipLoader } from 'react-spinners';
import ValidationSchemaOrganisation from './../../helpers/ValidationSchemaOrganisation';

function ContactDetailsOrganisation({ initialContact, handleSubmitContactValues }) {
    const [editForm, setEditForm] = useState(false);

    const validationSchema = initialContact.isParticipant
        ? ValidationSchemaOrganisation.validationSchemaBasic.concat(
              ValidationSchemaOrganisation.validationSchemaAdditional
          )
        : ValidationSchemaOrganisation.validationSchemaBasic;

    return (
        <div>
            {editForm ? (
                <Formik
                    initialValues={initialContact}
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                        actions.setSubmitting(true);
                        handleSubmitContactValues(values, actions, () => setEditForm(false));
                    }}
                    render={({ errors, touched, setFieldValue, isSubmitting, values, handleSubmit }) => {
                        // console.log(errors);
                        return (
                            <Form>
                                <DefaultContactOrganisationEdit
                                    initialContact={initialContact}
                                    touched={touched}
                                    errors={errors}
                                    setFieldValue={setFieldValue}
                                    values={values}
                                />
                                <Row>
                                    <Col>
                                        <ButtonGroup aria-label="Steps" className="float-right">
                                            <Button
                                                variant={'outline-dark'}
                                                size="sm"
                                                onClick={function() {
                                                    setEditForm(false);
                                                }}
                                            >
                                                Annuleren
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
                                                    'Opslaan'
                                                )}
                                            </Button>
                                        </ButtonGroup>
                                    </Col>
                                </Row>
                            </Form>
                        );
                    }}
                />
            ) : (
                <>
                    <DefaultContactOrganisationView initialContact={initialContact} />
                    <Row>
                        <Col>
                            <ButtonGroup aria-label="Steps" className="float-right">
                                <Button
                                    className={'w-button'}
                                    size="sm"
                                    onClick={function() {
                                        setEditForm(true);
                                    }}
                                >
                                    Wijzig
                                </Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </>
            )}
        </div>
    );
}

export default ContactDetailsOrganisation;
