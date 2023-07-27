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
    organisationName: Yup.string()
        .trim()
        .required('Verplicht'),
    personFirstName: Yup.string()
        .trim()
        .required('Verplicht'),
    personLastName: Yup.string()
        .trim()
        .required('Verplicht'),
});

const NewAccountFormOrganisation = ({ handleSubmit, showSuccessMessage }) => (
    <Formik
        initialValues={{ email: '', organisationName: '', personTitleId: '', personFirstName: '', personLastName: '' }}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
            actions.setSubmitting(true);
            handleSubmit(values, actions);
        }}
    >
        {({ isSubmitting, errors, touched }) => (
            <Form>
                <>
                    <Row className="justify-content-center">
                        <p className={'authorization-text'}>Account aanmaken voor je organisatie</p>
                    </Row>
                    <Row className="justify-content-center">
                        <Field name="organisationName">
                            {({ field }) => (
                                <InputText
                                    field={field}
                                    id="name-new-acount"
                                    className={''}
                                    placeholder={'Naam Organisatie'}
                                    errors={errors}
                                    touched={touched}
                                />
                            )}
                        </Field>
                    </Row>
                    <Row className="justify-content-center">
                        <p className={'authorization-text'}>Gegevens contactpersoon</p>
                    </Row>
                    <Row className="justify-content-center">
                        <Field name="personTitleId">
                            {({ field }) => (
                                <Select
                                    field={field}
                                    errors={errors}
                                    touched={touched}
                                    id="title_id"
                                    className={'select-field-transparent'}
                                    placeholder={'Aanhef'}
                                    options={Titles}
                                />
                            )}
                        </Field>
                    </Row>
                    <Row className="justify-content-center">
                        <Field name="personFirstName">
                            {({ field }) => (
                                <InputText
                                    field={field}
                                    errors={errors}
                                    touched={touched}
                                    id="first_name-new-acount"
                                    className={''}
                                    placeholder={'Voornaam'}
                                />
                            )}
                        </Field>
                    </Row>
                    <Row className="justify-content-center">
                        <Field name="personLastNamePrefixId">
                            {({ field }) => (
                                <Select
                                    field={field}
                                    errors={errors}
                                    touched={touched}
                                    id="last_name_prefix_id"
                                    options={LastNamePrefixes}
                                    className={'select-field-transparent'}
                                    placeholder={'Tussenvoegsel'}
                                />
                            )}
                        </Field>
                        <Field name="personLastName">
                            {({ field }) => (
                                <InputText
                                    field={field}
                                    errors={errors}
                                    touched={touched}
                                    id="last_name-new-acount"
                                    className={''}
                                    placeholder={'Achternaam'}
                                />
                            )}
                        </Field>
                    </Row>
                    <Row className="justify-content-center">
                        <Field name="email">
                            {({ field }) => (
                                <InputText
                                    field={field}
                                    id="email-new-acount"
                                    className={''}
                                    placeholder={'E-mailadres'}
                                    errors={errors}
                                    touched={touched}
                                />
                            )}
                        </Field>
                    </Row>

                    <Row className="justify-content-center">
                        <ButtonText
                            buttonText={'Account aanmaken'}
                            buttonClassName={'authorization-button'}
                            size="sm"
                            type={'submit'}
                            loading={isSubmitting}
                            loadingSpinnerColor={'#034b8c'}
                            disabled={showSuccessMessage}
                        />
                    </Row>
                </>
            </Form>
        )}
    </Formik>
);

export default NewAccountFormOrganisation;
