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

function StepOneLoan({ next, project, initialRegisterValues, handleSubmitRegisterValues }) {
    const validationSchema = Yup.object({
        amountInteressed: Yup.string()
            .required('Verplicht')
            .test(
                'amountInteressed',
                'Minimum van ' + project.minAmountLoan + ' nodig',
                value => value.replace(',', '.') > project.minAmountLoan
            )
            .test(
                'amountInteressed',
                'Maximum van ' + project.maxAmountLoan + ' bereikt',
                value => value.replace(',', '.') <= project.maxAmountLoan
            )
            .matches(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/, 'Fout bedrag'),
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
                            <FormLabel className={'field-label'}>Minimaal bedrag</FormLabel>
                            <TextBlock>{project.minAmountLoan}</TextBlock>
                        </Col>
                        <Col xs={12} md={6}>
                            <FormLabel className={'field-label'}>Maximaal bedrag</FormLabel>
                            <TextBlock>{project.maxAmountLoan}</TextBlock>
                        </Col>

                        <Col xs={12} md={6}>
                            <Form>
                                <Form.Label className={'field-label'}>In te leggen bedrag</Form.Label>
                                <Field
                                    name="amountInteressed"
                                    render={({ field }) => (
                                        <InputText
                                            field={field}
                                            errors={errors}
                                            touched={touched}
                                            id="amount_interessed"
                                        />
                                    )}
                                />
                            </Form>
                        </Col>
                        <Col xs={12} md={6}>
                            <FormLabel className={'field-label'}>Te betalen bedrag</FormLabel>
                            <TextBlock>{MoneyPresenter(values.amountInteressed)}</TextBlock>
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

export default StepOneLoan;
