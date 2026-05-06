import React, { useState } from 'react';
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
import textMethodeTransactionCosts from '../../../helpers/TextMethodeTransactionCosts';
import { capitalizeFirstLetter, lowerCaseFirstLetter } from '../../../helpers/ModifyText';

function StepOnePcr({
    portalSettings,
    next,
    project,
    contactProjectData,
    initialContact,
    initialRegisterValues,
    handleSubmitRegisterValues,
}) {
    const textRegisterCurrentBookWorth = project.textRegisterCurrentBookWorth ?? 'Huidige boekwaarde';
    const textRegisterParticipationSingular = project.textRegisterParticipationSingular ?? 'participatie';
    const textRegisterParticipationPlural = project.textRegisterParticipationPlural ?? 'participaties';

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
        pcrYearlyPowerKwhConsumption: Yup.number()
            .typeError('Alleen nummers')
            .positive('Getal moet groter zijn dan 0')
            .required('Verplicht'),
        pcrPostalCode: Yup.string()
            .min(4, 'Minimum van ${min} postcode cijfers nodig')
            .required('Verplicht')
            .test(
                'pcrPostalCode',
                'Helaas je postcode ligt niet binnen het gebied van potentiele deelnemers',
                value =>
                    value &&
                    (!project.checkPostalcodeLink ||
                        (project.postalcodeLink && project.postalcodeLink.includes(value.substring(0, 4))))
            ),
        pcrNumberOfSolarPanels: Yup.number().typeError('Alleen nummers'),
        pcrInputGeneratedNumberOfKwh: Yup.number().typeError('Alleen nummers'),
        choiceMembership: Yup.number().test(
            'choiceMembership',
            'Verplicht',
            value => !project.showQuestionAboutMembership || contactProjectData.belongsToMembershipGroup || value != 0
        ),
    });

    const PCR_POWER_KWH_CONSUMPTION_PERCENTAGE = portalSettings['pcrPowerKwhConsumptionPercentage'];
    const PCR_POWER_KWH_CONSUMPTION_FACTOR = portalSettings['pcrPowerKwhConsumptionPercentage'] / 100;
    const PCR_GENERATING_CAPACITY_ONE_SOLAR_PANEL = portalSettings['pcrGeneratingCapacityOneSolorPanel'];

    function calculateEstimatedGeneratedNumberOfKwh(values) {
        return values.pcrNumberOfSolarPanels
            ? values.pcrNumberOfSolarPanels * PCR_GENERATING_CAPACITY_ONE_SOLAR_PANEL
            : 0;
    }
    function calculateGeneratedNumberOfKwh(values) {
        return values.pcrInputGeneratedNumberOfKwh && values.pcrInputGeneratedNumberOfKwh > 0
            ? values.pcrInputGeneratedNumberOfKwh
            : calculateEstimatedGeneratedNumberOfKwh(values)
            ? calculateEstimatedGeneratedNumberOfKwh(values)
            : 0;
    }
    function calculatePowerKwhConsumption(values) {
        let extraPowerKwhConsumption =
            values.pcrYearlyPowerKwhConsumption - calculateGeneratedNumberOfKwh(values) > 0
                ? values.pcrYearlyPowerKwhConsumption - calculateGeneratedNumberOfKwh(values)
                : 0;
        return extraPowerKwhConsumption;
    }
    function calculateAdviseMaxNumberOfParticipations(values) {
        let pcrAdviseMaxNumberOfParticipations =
            calculatePowerKwhConsumption(values) > 0
                ? Math.ceil(
                      (calculatePowerKwhConsumption(values) * PCR_POWER_KWH_CONSUMPTION_FACTOR) /
                          PCR_GENERATING_CAPACITY_ONE_SOLAR_PANEL
                  )
                : 0;

        if (pcrAdviseMaxNumberOfParticipations < project.minParticipations) {
            pcrAdviseMaxNumberOfParticipations = project.minParticipations;
        } else if (pcrAdviseMaxNumberOfParticipations > project.maxParticipations) {
            pcrAdviseMaxNumberOfParticipations = project.maxParticipations;
        }
        return pcrAdviseMaxNumberOfParticipations;
    }

    function calculateAmount(participationsOptioned) {
        return participationsOptioned ? participationsOptioned * project.currentBookWorth : 0;
    }

    function getMethodeTransactionCosts(participationsOptioned, choiceMembership) {
        if (!project.useTransactionCostsWithMembership) {
            if (project.showQuestionAboutMembership && contactProjectData.belongsToMembershipGroup) {
                return [project.textTransactionCosts + ': geen'];
            }
            if (project.showQuestionAboutMembership && choiceMembership === 1) {
                return [project.textTransactionCosts + ': geen'];
            }
        }
        return textMethodeTransactionCosts(
            project,
            calculateTransactionCostsAmount(participationsOptioned, choiceMembership)
        );
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
                    powerKwhConsumption: calculatePowerKwhConsumption(values),
                    amount: calculateAmount(values.participationsOptioned),
                    transactionCostsAmount: calculateTransactionCostsAmount(
                        values.participationsOptioned,
                        values.choiceMembership
                    ),
                    totalAmount: calculateTotalAmount(values.participationsOptioned, values.choiceMembership),
                });
                next();
            }}
            initialValues={{
                ...initialRegisterValues,
            }}
            enableReinitialize={true}
        >
            {({ handleSubmit, values, touched, errors, setFieldValue }) => {
                let pcrEstimatedGeneratedNumberOfKwh = calculateEstimatedGeneratedNumberOfKwh(values);
                let powerKwhConsumption = Math.ceil(
                    calculatePowerKwhConsumption(values) * PCR_POWER_KWH_CONSUMPTION_FACTOR
                );
                let pcrAdviseMaxNumberOfParticipations = calculateAdviseMaxNumberOfParticipations(values);
                return (
                    <>
                        <Form>
                            <Row>
                                <Col xs={12} md={6}>
                                    <FormLabel className={'field-label'}>
                                        Minimale aantal {lowerCaseFirstLetter(textRegisterParticipationPlural)}
                                    </FormLabel>
                                    <TextBlock>{project.minParticipations}</TextBlock>
                                </Col>
                                <Col xs={12} md={6}>
                                    <FormLabel className={'field-label'}>
                                        Maximale aantal {lowerCaseFirstLetter(textRegisterParticipationPlural)}
                                    </FormLabel>
                                    <TextBlock>{project.maxParticipations}</TextBlock>
                                </Col>

                                <Col xs={12} md={6}>
                                    <FormLabel className={'field-label'}>
                                        {capitalizeFirstLetter(textRegisterCurrentBookWorth)} per{' '}
                                        {lowerCaseFirstLetter(textRegisterParticipationSingular)}
                                    </FormLabel>
                                    <TextBlock>{MoneyPresenter(project.currentBookWorth)}</TextBlock>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12} md={6}>
                                    <Form.Label className={'field-label required'}>Je postcode</Form.Label>
                                    <Field name="pcrPostalCode">
                                        {({ field }) => (
                                            <InputText
                                                field={field}
                                                errors={errors}
                                                touched={touched}
                                                id="pcr_postal_code"
                                            />
                                        )}
                                    </Field>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Label className={'field-label'}>Deelnemende postcodes</Form.Label>
                                    <TextBlock>{project.postalcodeLink}</TextBlock>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Label className={'field-label required'}>
                                        Je (geschatte) jaarlijks verbruik (in kWh)
                                    </Form.Label>
                                    <Field name="pcrYearlyPowerKwhConsumption">
                                        {({ field }) => (
                                            <InputText
                                                field={field}
                                                errors={errors}
                                                touched={touched}
                                                id="pcr_yearly_power_kwh_consumption"
                                            />
                                        )}
                                    </Field>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12} md={10}>
                                    <Form.Label className={'field-label'}>
                                        Heb je al zonnepanelen op je eigen dak of doe je mee in een ander project?
                                    </Form.Label>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12} md={10}>
                                    <Field name="pcrHasSolarPanels">
                                        {({ field }) => (
                                            <>
                                                <div className="form-check form-check-inline">
                                                    <label className="radio-inline">
                                                        <input
                                                            type="radio"
                                                            {...field}
                                                            id="pcr_has_solar_panels_yes"
                                                            checked={field.value === 'Y'}
                                                            value={'Y'}
                                                            onChange={() => setFieldValue('pcrHasSolarPanels', 'Y')}
                                                        />
                                                        &nbsp;Ja
                                                    </label>
                                                    &nbsp;&nbsp;
                                                    <label className="radio-inline">
                                                        <input
                                                            type="radio"
                                                            {...field}
                                                            id="pcr_has_solar_panels_no"
                                                            checked={field.value === 'N'}
                                                            value={'N'}
                                                            onChange={() => {
                                                                setFieldValue('pcrHasSolarPanels', 'N');
                                                                setFieldValue('pcrNumberOfSolarPanels', 0);
                                                            }}
                                                        />
                                                        &nbsp;Nee
                                                    </label>
                                                </div>
                                            </>
                                        )}
                                    </Field>
                                </Col>
                            </Row>

                            {values.pcrHasSolarPanels === 'Y' ? (
                                <Row>
                                    <Col xs={12} md={6}>
                                        <Form.Label className={'field-label'}>
                                            Hoeveel zonnepanelen wekken al stroom voor je op
                                        </Form.Label>
                                        <Field name="pcrNumberOfSolarPanels">
                                            {({ field }) => (
                                                <InputText
                                                    field={field}
                                                    errors={errors}
                                                    touched={touched}
                                                    id="pcr_number_of_solar_panels"
                                                />
                                            )}
                                        </Field>
                                    </Col>
                                </Row>
                            ) : (
                                ''
                            )}
                            <Row>
                                <Col xs={12} md={6}>
                                    <Form.Label className={'field-label'}>
                                        Wij schatten in dat je panelen jaarlijks opwekken
                                    </Form.Label>
                                    <TextBlock id="pcr_input_estimated_generated_number_of_kwh">
                                        {pcrEstimatedGeneratedNumberOfKwh} kWh
                                    </TextBlock>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12} md={10}>
                                    <Form.Label className={'field-label'}>Klopt het geschatte opbrengst?</Form.Label>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12} md={10}>
                                    <Field name="pcrEstimatedRevenueOk">
                                        {({ field }) => (
                                            <>
                                                <div className="form-check form-check-inline">
                                                    <label className="radio-inline">
                                                        <input
                                                            type="radio"
                                                            {...field}
                                                            id="pcr_estimated_revenue_ok_yes"
                                                            checked={field.value === 'Y'}
                                                            value={'Y'}
                                                            onChange={() => {
                                                                setFieldValue('pcrEstimatedRevenueOk', 'Y');
                                                                setFieldValue('pcrInputGeneratedNumberOfKwh', 0);
                                                            }}
                                                        />
                                                        &nbsp;Ja
                                                    </label>
                                                    &nbsp;&nbsp;
                                                    <label className="radio-inline">
                                                        <input
                                                            type="radio"
                                                            {...field}
                                                            id="pcr_estimated_revenue_ok_no"
                                                            checked={field.value === 'N'}
                                                            value={'N'}
                                                            onChange={() => setFieldValue('pcrEstimatedRevenueOk', 'N')}
                                                        />
                                                        &nbsp;Nee
                                                    </label>
                                                </div>
                                            </>
                                        )}
                                    </Field>
                                </Col>
                            </Row>

                            {values.pcrEstimatedRevenueOk === 'N' ? (
                                <>
                                    <Row>
                                        <Col xs={12} md={6}>
                                            <Form.Label className={'field-label'}>
                                                Wat is de jaarlijkse opbrengst van jouw panelen (in kWh)
                                            </Form.Label>
                                            <Field name="pcrInputGeneratedNumberOfKwh">
                                                {({ field }) => (
                                                    <InputText
                                                        field={field}
                                                        errors={errors}
                                                        touched={touched}
                                                        id="pcr_input_generated_number_of_kwh"
                                                    />
                                                )}
                                            </Field>
                                        </Col>
                                    </Row>
                                </>
                            ) : (
                                ''
                            )}

                            <Row>
                                <Col xs={12} md={6}>
                                    <p>
                                        We adviseren tot {PCR_POWER_KWH_CONSUMPTION_PERCENTAGE}% van je jaarlijks
                                        verbruik minus de jaarlijkse opbrengsten (in jouw geval {powerKwhConsumption}{' '}
                                        kWh) te dekken met {lowerCaseFirstLetter(textRegisterParticipationPlural)}. In
                                        het veld hier direct onder is voor je uitgerekend hoeveel{' '}
                                        {lowerCaseFirstLetter(textRegisterParticipationPlural)} dat zijn. Het is een
                                        advies, je mag er ook meer kopen. Dit kan echter slecht zijn voor je rendement.
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={6}>
                                    <Form.Label className={'field-label'}>
                                        Advies maximaal aantal {lowerCaseFirstLetter(textRegisterParticipationPlural)}
                                    </Form.Label>
                                    <TextBlock>{pcrAdviseMaxNumberOfParticipations}</TextBlock>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12} md={6}>
                                    <Form.Label className={'field-label required'}>
                                        Gewenst aantal {lowerCaseFirstLetter(textRegisterParticipationPlural)}
                                    </Form.Label>
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
                                    <TextBlock>
                                        {MoneyPresenter(calculateAmount(values.participationsOptioned))}
                                    </TextBlock>
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
                                            <FormLabel className={'field-label'}>
                                                {getMethodeTransactionCosts(
                                                    values.participationsOptioned,
                                                    values.choiceMembership
                                                ).map((line, index) => (
                                                    <React.Fragment key={index}>
                                                        {line}
                                                        <br />
                                                    </React.Fragment>
                                                ))}
                                            </FormLabel>
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
                                                Niet alle verplichte velden zijn ingevuld om verder te gaan naar de
                                                volgende stap!
                                            </Alert>
                                        </div>
                                    </Col>
                                </Row>
                            ) : null}
                        </Form>
                    </>
                );
            }}
        </Formik>
    );
}

export default StepOnePcr;
