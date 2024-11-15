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
import { Alert } from 'react-bootstrap';
import { get, isEmpty } from 'lodash';
import calculateTransactionCosts from '../../../helpers/CalculateTransactionCosts';
import InputTextCurrency from '../../../components/form/InputTextCurrency';

function StepOneLoan({
    next,
    project,
    registerType,
    contactProjectData,
    initialRegisterValues,
    handleSubmitRegisterValues,
}) {
    console.log(initialRegisterValues);
    const validationSchema = Yup.object({
        amountOptioned: Yup.string()
            .required('Verplicht')
            .transform(function(value, originalvalue) {
                return value ? value.replace(',', '.') : 0;
            })
            .test(
                'amountOptioned',
                'Minimum van ' + project.minAmountLoan + ' nodig',
                value => value >= project.minAmountLoan
            )
            .test(
                'amountOptioned',
                'Maximum van ' + project.maxAmountLoan + ' bereikt',
                value => value <= project.maxAmountLoan
            )
            .matches(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/, 'Fout bedrag'),
        choiceMembership: Yup.number().test(
            'choiceMembership',
            'Verplicht',
            value => !project.showQuestionAboutMembership || contactProjectData.belongsToMembershipGroup || value != 0
        ),
    });

    function setAmountOptioned(amountOptioned) {
        return amountOptioned ? amountOptioned.toString().replace(',', '.') : '';
    }
    function calculateAmount(amountOptioned) {
        return amountOptioned ? parseFloat(amountOptioned.toString().replace(',', '.')) : 0;
    }
    function calculateTransactionCostsAmount(amountOptioned, choiceMembership) {
        if (!project.useTransactionCostsWithMembership) {
            if (project.showQuestionAboutMembership && contactProjectData.belongsToMembershipGroup) {
                return 0;
            }
            if (project.showQuestionAboutMembership && choiceMembership === 1) {
                return 0;
            }
        }
        return calculateTransactionCosts(project, amountOptioned, null);
    }
    function calculateTotalAmount(amountOptioned, choiceMembership) {
        return (
            calculateAmount(amountOptioned) + calculateTransactionCostsAmount(amountOptioned, choiceMembership)
        ).toFixed(2);
    }

    return (
        <Formik
            validationSchema={validationSchema}
            onSubmit={function(values, actions) {
                handleSubmitRegisterValues({
                    ...values,
                    amountOptioned: setAmountOptioned(values.amountOptioned),
                    amount: calculateAmount(values.amountOptioned),
                    transactionCostsAmount: calculateTransactionCostsAmount(
                        values.amountOptioned,
                        values.choiceMembership
                    ),
                    totalAmount: calculateTotalAmount(values.amountOptioned, values.choiceMembership),
                });
                next();
            }}
            initialValues={initialRegisterValues}
            enableReinitialize={true}
        >
            {({ handleSubmit, values, touched, errors, setFieldValue }) => (
                <>
                    <Form>
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
                                <Form.Label className={'field-label'}>In te leggen bedrag</Form.Label>
                                <Field name="amountOptioned">
                                    {({ field }) => (
                                        <InputTextCurrency
                                            field={field}
                                            errors={errors}
                                            touched={touched}
                                            id="amount_optioned"
                                        />
                                    )}
                                </Field>
                            </Col>
                            <Col xs={12} md={6}>
                                <FormLabel className={'field-label'}>
                                    {project.transactionCostsCodeRef === 'none' ? 'Te betalen bedrag' : 'Bedrag'}
                                </FormLabel>
                                <TextBlock>{MoneyPresenter(calculateAmount(values.amountOptioned))}</TextBlock>
                            </Col>
                        </Row>
                        {project.showQuestionAboutMembership ? (
                            <>
                                <hr />
                                <Row>
                                    <Col xs={12} md={10}>
                                        <p>
                                            {contactProjectData.belongsToMembershipGroup
                                                ? contactProjectData.textIsMemberMerged
                                                : contactProjectData.textIsNoMemberMerged}
                                        </p>
                                    </Col>
                                </Row>
                                {!contactProjectData.belongsToMembershipGroup ? (
                                    <Row>
                                        <Col xs={12} md={10}>
                                            <Field name="choiceMembership">
                                                {({ field }) => (
                                                    <>
                                                        {get(errors, field.name, '') &&
                                                            get(touched, field.name, '') && (
                                                                <small className="text-danger">
                                                                    {get(errors, field.name, '')}
                                                                </small>
                                                            )}
                                                        <div className="form-check">
                                                            <label className="radio-inline">
                                                                <input
                                                                    type="radio"
                                                                    {...field}
                                                                    id="choice_membership_yes"
                                                                    checked={field.value === 1}
                                                                    value={1}
                                                                    onChange={() =>
                                                                        setFieldValue('choiceMembership', 1)
                                                                    }
                                                                />
                                                                &nbsp;{contactProjectData.textBecomeMemberMerged}
                                                            </label>
                                                            <label className="radio-inline">
                                                                <input
                                                                    type="radio"
                                                                    {...field}
                                                                    id="choice_membership_no"
                                                                    checked={field.value === 2}
                                                                    value={2}
                                                                    onChange={() => {
                                                                        setFieldValue('choiceMembership', 2);
                                                                    }}
                                                                />
                                                                &nbsp;{contactProjectData.textBecomeNoMemberMerged}
                                                            </label>
                                                        </div>
                                                    </>
                                                )}
                                            </Field>
                                        </Col>
                                    </Row>
                                ) : null}
                            </>
                        ) : null}

                        {project.transactionCostsCodeRef !== 'none' ? (
                            <>
                                <hr />
                                <Row>
                                    <Col xs={12} md={6}>
                                        <FormLabel className={'field-label'}>{project.textTransactionCosts}</FormLabel>
                                        <TextBlock>
                                            {MoneyPresenter(
                                                calculateTransactionCostsAmount(
                                                    values.amountOptioned,
                                                    values.choiceMembership
                                                )
                                            )}
                                        </TextBlock>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <FormLabel className={'field-label'}>Totaal te betalen</FormLabel>
                                        <TextBlock>
                                            {MoneyPresenter(
                                                calculateTotalAmount(values.amountOptioned, values.choiceMembership)
                                            )}
                                        </TextBlock>
                                    </Col>
                                </Row>
                            </>
                        ) : null}

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
                                    <div className="alert-wrapper">
                                        <Alert key={'form-general-error-alert'} variant={'warning'}>
                                            Niet alle verplichte velden zijn ingevuld om verder te gaan naar de volgende
                                            stap!
                                        </Alert>
                                    </div>
                                </Col>
                            </Row>
                        ) : null}
                    </Form>
                </>
            )}
        </Formik>
    );
}

export default StepOneLoan;
