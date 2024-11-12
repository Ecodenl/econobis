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
import { get, isEmpty } from 'lodash';
import calculateTransactionCosts from '../../../helpers/CalculateTransactionCosts';

function StepOneObligation({
    next,
    project,
    registerType,
    contactProjectData,
    initialRegisterValues,
    handleSubmitRegisterValues,
}) {
    const validationSchema = Yup.object({
        participationsOptioned: Yup.number()
            .integer('Alleen gehele aantallen')
            .typeError('Alleen nummers')
            .test(
                'participationsOptioned',
                'Minimum van ' + project.minParticipations + ' nodig',
                value => value >= project.minParticipations
            )
            .max(project.maxParticipations, 'Maximum van ${max} bereikt')
            .positive('Getal moet groter zijn dan 0')
            .required('Verplicht'),
        choiceMembership: Yup.number().test(
            'choiceMembership',
            'Verplicht',
            value => !project.showQuestionAboutMembership || contactProjectData.belongsToMembershipGroup || value != 0
        ),
    });

    function calculateAmount(participationsOptioned) {
        return participationsOptioned ? participationsOptioned * project.currentBookWorth : 0;
    }
    function calculateTransactionCostsAmount(participationsOptioned, choiceMembership) {
        if (!project.useTransactionCostsWithMembership) {
            if (project.showQuestionAboutMembership && contactProjectData.belongsToMembershipGroup) {
                return 0;
            }
            if (project.showQuestionAboutMembership && choiceMembership === 1) {
                return 0;
            }
        }
        return calculateTransactionCosts(project, null, participationsOptioned);
    }
    function calculateTotalAmount(participationsOptioned, choiceMembership) {
        return (
            calculateAmount(participationsOptioned) +
            calculateTransactionCostsAmount(participationsOptioned, choiceMembership)
        ).toFixed(2);
    }

    return (
        <Formik
            validationSchema={validationSchema}
            onSubmit={function(values, actions) {
                handleSubmitRegisterValues({
                    ...values,
                    amount: calculateAmount(values.participationsOptioned),
                    transactionCostsAmount: calculateTransactionCostsAmount(
                        values.participationsOptioned,
                        values.choiceMembership
                    ),
                    totalAmount: calculateTotalAmount(values.participationsOptioned, values.choiceMembership),
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
                                <FormLabel className={'field-label'}>Minimale aantal obligaties</FormLabel>
                                <TextBlock>{project.minParticipations}</TextBlock>
                            </Col>
                            <Col xs={12} md={6}>
                                <FormLabel className={'field-label'}>Maximale aantal obligaties</FormLabel>
                                <TextBlock>{project.maxParticipations}</TextBlock>
                            </Col>

                            <Col xs={12} md={6}>
                                <FormLabel className={'field-label'}>Huidige hoofdsom per obligatie</FormLabel>
                                <TextBlock>{MoneyPresenter(project.currentBookWorth)}</TextBlock>
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Label className={'field-label'}>Gewenst aantal obligaties</Form.Label>
                                <Field name="participationsOptioned">
                                    {({ field }) => (
                                        <InputText
                                            field={field}
                                            errors={errors}
                                            touched={touched}
                                            id="participations_optioned"
                                        />
                                    )}
                                </Field>
                            </Col>
                            <Col xs={12} md={6}>
                                <FormLabel className={'field-label'}>
                                    {project.transactionCostsCodeRef === 'none' ? 'Te betalen bedrag' : 'Bedrag'}
                                </FormLabel>
                                <TextBlock>{MoneyPresenter(calculateAmount(values.participationsOptioned))}</TextBlock>
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
                                                    values.participationsOptioned,
                                                    values.choiceMembership
                                                )
                                            )}
                                        </TextBlock>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <FormLabel className={'field-label'}>Totaal te betalen</FormLabel>
                                        <TextBlock>
                                            {MoneyPresenter(
                                                calculateTotalAmount(
                                                    values.participationsOptioned,
                                                    values.choiceMembership
                                                )
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

export default StepOneObligation;
