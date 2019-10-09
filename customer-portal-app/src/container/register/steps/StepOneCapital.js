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

function StepOneCapital({ next, project, initialRegisterValues, handleSubmitRegisterValues }) {
    const validationSchema = Yup.object({
        participationsInteressed: Yup.number()
            .typeError('Alleen nummers')
            .min(1, 'Minimum van ${min} nodig')
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
                    <Row>
                        <Col xs={12} md={6}>
                            <FormLabel className={'field-label'}>Minimale aantal participaties</FormLabel>
                            <TextBlock>{project.minParticipations}</TextBlock>
                        </Col>
                        <Col xs={12} md={6}>
                            <FormLabel className={'field-label'}>Maximale aantal participaties</FormLabel>
                            <TextBlock>{project.maxParticipations}</TextBlock>
                        </Col>

                        <Col xs={12} md={6}>
                            <FormLabel className={'field-label'}>Nominale waarde per participatie</FormLabel>
                            <TextBlock>{MoneyPresenter(project.participationWorth)}</TextBlock>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form>
                                <Form.Label className={'field-label'}>Gewenst aantal participaties</Form.Label>
                                <Field
                                    name="participationsInteressed"
                                    render={({ field }) => (
                                        <InputText
                                            field={field}
                                            errors={errors}
                                            touched={touched}
                                            id="participations_interessed"
                                        />
                                    )}
                                />
                            </Form>
                        </Col>
                        <Col xs={12} md={6}>
                            <FormLabel className={'field-label'}>Te betalen bedrag</FormLabel>
                            <TextBlock>
                                {MoneyPresenter(values.participationsInteressed * project.participationWorth)}
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
                </>
            )}
        </Formik>
    );
}

export default StepOneCapital;
