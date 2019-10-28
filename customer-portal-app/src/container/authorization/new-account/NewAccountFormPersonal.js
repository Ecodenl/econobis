import React from 'react';
import InputText from '../../../components/form/InputText';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonText from '../../../components/button/ButtonText';
import Titles from '../../../data/Titles';
import LastNamePrefixes from '../../../data/LastNamePrefixes';
import Select from '../../../components/form/Select';
import { Link } from 'react-router-dom';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email()
        .required('Verplicht'),
    personTitleId: Yup.string()
        .nullable()
        .required('Verplicht'),
    personFirstName: Yup.string()
        .trim()
        .required('Verplicht'),
    personLastName: Yup.string()
        .trim()
        .required('Verplicht'),
});

const NewAccountFormPersonal = ({ handleSubmit, showSuccessMessage }) => (
    <Formik
        initialValues={{
            email: '',
            personTitleId: '',
            personFirstName: '',
            personLastName: '',
        }}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
            actions.setSubmitting(true);
            handleSubmit(values, actions);
        }}
        render={({ isSubmitting, errors, touched }) => (
            <Form>
                <>
                    <Row>
                        <Col xs={12} md={10}>
                            <p className={'text-light'}>Account aanmaken voor je zelf</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={10}>
                            <Field
                                name="email"
                                render={({ field }) => (
                                    <InputText
                                        field={field}
                                        id="email"
                                        className={''}
                                        placeholder={'E-mailadres'}
                                        errors={errors}
                                        touched={touched}
                                    />
                                )}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={10}>
                            <p className={'text-light'}>Gegevens</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={10}>
                            <Field
                                name="personTitleId"
                                render={({ field }) => (
                                    <Select
                                        field={field}
                                        errors={errors}
                                        touched={touched}
                                        id="title_id"
                                        className={''}
                                        placeholder={'Aanhef'}
                                        options={Titles}
                                    />
                                )}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={10}>
                            <Field
                                name="personFirstName"
                                render={({ field }) => (
                                    <InputText
                                        field={field}
                                        errors={errors}
                                        touched={touched}
                                        id="first_name"
                                        className={''}
                                        placeholder={'Voornaam'}
                                    />
                                )}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={10}>
                            <Field
                                name="personLastNamePrefixId"
                                render={({ field }) => (
                                    <Select
                                        field={field}
                                        errors={errors}
                                        touched={touched}
                                        id="last_name_prefix_id"
                                        options={LastNamePrefixes}
                                        className={''}
                                        placeholder={'Tussenvoegsel'}
                                    />
                                )}
                            />
                        </Col>
                        <Col xs={12} md={10}>
                            <Field
                                name="personLastName"
                                render={({ field }) => (
                                    <InputText
                                        field={field}
                                        errors={errors}
                                        touched={touched}
                                        id="last_name"
                                        className={''}
                                        placeholder={'Achternaam'}
                                    />
                                )}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} md={10}>
                            <ButtonText
                                buttonText={'Account aanmaken'}
                                buttonClassName={'authorization-button'}
                                size="sm"
                                type={'submit'}
                                loading={isSubmitting}
                                loadingSpinnerColor={'#034b8c'}
                                disabled={showSuccessMessage}
                            />
                        </Col>
                    </Row>
                </>
            </Form>
        )}
    />
);

export default NewAccountFormPersonal;
