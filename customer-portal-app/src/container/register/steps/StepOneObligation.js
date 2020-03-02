import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import FormLabel from 'react-bootstrap/FormLabel';
import MoneyPresenter from '../../../helpers/MoneyPresenter';
import TextBlock from '../../../components/general/TextBlock';
import Form from 'react-bootstrap/Form';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import InputText from '../../../components/form/InputText';
import { Alert } from 'react-bootstrap';
import { isEmpty } from 'lodash';

function StepOneObligation({ next, project, initialRegisterValues, handleSubmitRegisterValues }) {
    const validationSchema = Yup.object({
        participationsOptioned: Yup.number()
            .typeError('Alleen nummers')
            .test(
                'participationsOptioned',
                'Minimum van ' + project.minParticipations + ' nodig',
                value => value >= project.minParticipations
            )
            .max(project.maxParticipations, 'Maximum van ${max} bereikt')
            .positive('Getal moet groter zijn dan 0')
            .required('Verplicht'),
    });

    return (
        <Formik
            validationSchema={validationSchema}
            onSubmit={function(values, actions) {
                handleSubmitRegisterValues(values);
                next();
            }}
            initialValues={initialRegisterValues}
        >
            {({ handleSubmit, values, touched, errors }) => (
                <>
                    <Form>
                        <Row>
                            <Col xs={12} md={6}>
                                <FormLabel className={'field-label'}>Minimale aantal obligaties</FormLabel>
                                <TextBlock>{project.minParticipations}</TextBlock>
                            </Col>
                            <Col xs={12} md={6}>
                                <FormLabel className={'field-label'}>Maximale aantal obligaties</FormLabel>
                                <TextBlock>{project.maxParticipations}</TextBlock>
                            </Col>

                            <Col xs={12} md={6}>
                                <FormLabel className={'field-label'}>Nominale waarde per obligatie</FormLabel>
                                <TextBlock>{MoneyPresenter(project.participationWorth)}</TextBlock>
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Label className={'field-label'}>Gewenst aantal obligaties</Form.Label>
                                <Field
                                    name="participationsOptioned"
                                    render={({ field }) => (
                                        <InputText
                                            field={field}
                                            errors={errors}
                                            touched={touched}
                                            id="participations_optioned"
                                        />
                                    )}
                                />
                            </Col>
                            <Col xs={12} md={6}>
                                <FormLabel className={'field-label'}>Te betalen bedrag</FormLabel>
                                <TextBlock>
                                    {MoneyPresenter(values.participationsOptioned * project.participationWorth)}
                                </TextBlock>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <ButtonGroup aria-label="Steps" className="float-right">
                                    <Button className={'w-button'} size="sm" onClick={handleSubmit}>
                                        Ga naar gegevens
                                    </Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                        {!isEmpty(errors) ? (
                            <Row>
                                <Col>
                                    <Alert key={'form-general-error-alert'} variant={'warning'}>
                                        Niet alle verplichten velden zijn ingevuld om verder te gaan naar de volgende
                                        stap!
                                    </Alert>
                                </Col>
                            </Row>
                        ) : null}
                    </Form>
                </>
            )}
        </Formik>
    );
}

export default StepOneObligation;
