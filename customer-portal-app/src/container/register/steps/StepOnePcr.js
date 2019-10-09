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
import * as ibantools from 'ibantools';

function StepOnePcr({ next, project, initialContact, initialRegisterValues, handleSubmitRegisterValues }) {
    const validationSchema = Yup.object({
        participationsOptioned: Yup.number()
            .typeError('Alleen nummers')
            .min(1, 'Minimum van ${min} nodig')
            .max(project.maxParticipations, 'Maximum van ${max} bereikt')
            .positive('Getal moet groter zijn dan 0')
            .required('Verplicht'),
        powerKwhConsumption: Yup.number()
            .typeError('Alleen nummers')
            .positive('Getal moet groter zijn dan 0')
            .required('Verplicht'),
        pcrPostalCode: Yup.string()
            .min(4, 'Minimum van ${min} postcode cijfers nodig')
            .required('Verplicht')
            .test('pcrPostalCode', 'Helaas je postcode ligt niet binnen het gebied van potentiele deelnemers', value =>
                project.postalcodeLink.includes(value.substring(0, 4))
            ),
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
                    </Row>

                    <Row>
                        <Col xs={12} md={6}>
                            <Form>
                                <Form.Label className={'field-label'}>Je postcode</Form.Label>
                                <Field
                                    name="pcrPostalCode"
                                    render={({ field }) => (
                                        <InputText
                                            field={field}
                                            errors={errors}
                                            touched={touched}
                                            id="pcr_postal_code"
                                        />
                                    )}
                                />
                            </Form>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form>
                                <Form.Label className={'field-label'}>Deelnemende postcodes</Form.Label>
                                <TextBlock>{project.postalcodeLink}</TextBlock>
                            </Form>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form>
                                <Form.Label className={'field-label'}>
                                    Je (geschatte) jaarlijks verbruik (in kWh)
                                </Form.Label>
                                <Field
                                    name="powerKwhConsumption"
                                    render={({ field }) => (
                                        <InputText
                                            field={field}
                                            errors={errors}
                                            touched={touched}
                                            id="power_kwh_consumption"
                                        />
                                    )}
                                />
                            </Form>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} md={10}>
                            <Field
                                name="prcHasSolarPanels"
                                render={({ field }) => (
                                    <label className="w-checkbox checkbox-fld">
                                        <input
                                            type="checkbox"
                                            {...field}
                                            id="prc_has_solar_panels"
                                            checked={field.value}
                                            className="w-checkbox-input checkbox"
                                        />
                                        <span htmlFor="prc_has_solar_panels" className="checkbox-label w-form-label">
                                            <strong>
                                                Heb je al zonnepanelen op je eigen dak of doe je mee in een ander
                                                project?
                                            </strong>
                                        </span>
                                        {touched[field.name] && errors[field.name] ? (
                                            <div className={'error-message text-danger'}>{errors[field.name]}</div>
                                        ) : null}
                                    </label>
                                )}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} md={10}>
                            <Field
                                name="prcEstimatedRevenueOk"
                                render={({ field }) => (
                                    <label className="w-checkbox checkbox-fld">
                                        <input
                                            type="checkbox"
                                            {...field}
                                            id="prc_estimated_revenue_ok"
                                            checked={field.value}
                                            className="w-checkbox-input checkbox"
                                        />
                                        <span
                                            htmlFor="prc_estimated_revenue_ok"
                                            className="checkbox-label w-form-label"
                                        >
                                            <strong>Klopt het geschatte opbrengst?</strong>
                                        </span>
                                        {touched[field.name] && errors[field.name] ? (
                                            <div className={'error-message text-danger'}>{errors[field.name]}</div>
                                        ) : null}
                                    </label>
                                )}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} md={6}>
                            <Form>
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
                            </Form>
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
                </>
            )}
        </Formik>
    );
}

export default StepOnePcr;
