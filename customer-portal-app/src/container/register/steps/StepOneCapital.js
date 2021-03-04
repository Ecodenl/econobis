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

function StepOneCapital({ next, project, contactProjectData, initialRegisterValues, handleSubmitRegisterValues }) {
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

    function calculateAmount(values) {
        return values.participationsOptioned ? values.participationsOptioned * project.participationWorth : 0;
    }
    function calculateTransactionCostsAmount(values) {
        let transactionCosts = 0;
        if (project.showQuestionAboutMembership && contactProjectData.belongsToMembershipGroup) {
            return 0;
        }
        if (project.showQuestionAboutMembership && values.choiceMembership === 1) {
            return 0;
        }

        if (project.transactionCostsCodeRef === 'amount') {
            transactionCosts = project.transactionCostsAmount * values.participationsOptioned;
        }
        if (project.transactionCostsCodeRef === 'percentage') {
            transactionCosts = values.participationsOptioned
                ? parseFloat(
                      (
                          (values.participationsOptioned *
                              project.participationWorth *
                              project.transactionCostsPercentage) /
                          100
                      ).toFixed(2)
                  )
                : 0;
            if (transactionCosts < project.transactionCostsAmount) {
                transactionCosts = project.transactionCostsAmount;
            }
        }
        return transactionCosts;
    }
    function calculateTotalAmount(values) {
        return calculateAmount(values) + calculateTransactionCostsAmount(values);
    }

    return (
        <Formik
            validationSchema={validationSchema}
            onSubmit={function(values, actions) {
                handleSubmitRegisterValues({
                    ...values,
                    amount: calculateAmount(values),
                    transactionCostsAmount: calculateTransactionCostsAmount(values),
                    totalAmount: calculateTotalAmount(values),
                });
                next();
            }}
            initialValues={initialRegisterValues}
        >
            {({ handleSubmit, values, touched, errors, setFieldValue }) => (
                <>
                    <Form>
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
                                <Form.Label className={'field-label'}>Gewenst aantal participaties</Form.Label>
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
                                <FormLabel className={'field-label'}>
                                    {project.transactionCostsCodeRef === 'none' ? 'Te betalen bedrag' : 'Bedrag'}
                                </FormLabel>
                                <TextBlock>{MoneyPresenter(calculateAmount(values))}</TextBlock>
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
                                            <Field
                                                name="choiceMembership"
                                                render={({ field }) => (
                                                    <>
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
                                            />
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
                                        <TextBlock>{MoneyPresenter(calculateTransactionCostsAmount(values))}</TextBlock>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <FormLabel className={'field-label'}>Totaal te betalen</FormLabel>
                                        <TextBlock>{MoneyPresenter(calculateTotalAmount(values))}</TextBlock>
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
                                            Niet alle verplichten velden zijn ingevuld om verder te gaan naar de
                                            volgende stap!
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

export default StepOneCapital;
