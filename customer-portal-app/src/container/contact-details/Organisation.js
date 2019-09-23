import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DefaultContactOrganisationEdit from './default-form-organisation/Edit';
import DefaultContactOrganisationView from './default-form-organisation/View';
import Col from 'react-bootstrap/Col';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { ClipLoader } from 'react-spinners';

const validationSchema = Yup.object().shape({
    // TODO set correct values for validation
    // email: Yup.string()
    //     .email()
    //     .required('Verplicht'),
});

function ContactDetailsOrganisation({ initialContact, handleSubmitContactValues }) {
    const [editForm, setEditForm] = useState(false);

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
                        return (
                            <Form>
                                <DefaultContactOrganisationEdit initialContact={initialContact} values={values} />
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
