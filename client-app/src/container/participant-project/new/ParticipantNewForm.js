import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { setError } from '../../../actions/general/ErrorActions';

import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import InputSelect from '../../../components/form/InputSelect';
import ButtonText from '../../../components/button/ButtonText';
import PanelFooter from '../../../components/panel/PanelFooter';
import InputText from '../../../components/form/InputText';
import InputDate from '../../../components/form/InputDate';

const validationSchema = Yup.object().shape({
    contactId: Yup.number().required(true),
    statusId: Yup.number().required(true),
    projectId: Yup.number().required(true),
    amountOption: Yup.number()
        .moreThan(0)
        .required(true),
    optionDate: Yup.string().required(true),
});

const ParticipantNewForm = ({
    contacts,
    contactId,
    projects,
    projectId,
    participantMutationStatuses,
    handleSubmit,
}) => {
    const initialValues = {
        contactId: contactId,
        statusId: null,
        projectId: projectId,
        amountOption: 0,
        optionDate: null,
    };

    return (
        <div className="col-md-12">
            <Panel>
                <PanelBody>
                    <div className="col-md-12">
                        <Formik
                            initialValues={initialValues}
                            enableReinitialize={true}
                            validationSchema={validationSchema}
                            onSubmit={(values, actions) => {
                                actions.setSubmitting(true);
                                handleSubmit(values);
                            }}
                            render={({ errors, touched, setFieldValue, isSubmitting, values }) => {
                                const status = participantMutationStatuses.find(
                                    participantMutationStatus => participantMutationStatus.id == values.statusId
                                );
                                const statusCodeRef = status ? status.codeRef : null;

                                return (
                                    <React.Fragment>
                                        <Form className="form-horizontal col-md-12">
                                            <div className="row">
                                                <Field
                                                    name="contactId"
                                                    render={({ field /* _form */ }) => (
                                                        <InputSelect
                                                            label={'Contact'}
                                                            name={field.name}
                                                            id={'contactId'}
                                                            options={contacts}
                                                            optionName={'fullName'}
                                                            value={field.value}
                                                            onChangeAction={field.onChange}
                                                            onBlurAction={field.onBlur}
                                                            required={'required'}
                                                            error={errors.contactId}
                                                        />
                                                    )}
                                                />
                                                <Field
                                                    name="statusId"
                                                    render={({ field /* _form */ }) => (
                                                        <InputSelect
                                                            label={'Status'}
                                                            name={field.name}
                                                            id={'statusId'}
                                                            options={participantMutationStatuses}
                                                            value={field.value}
                                                            onChangeAction={field.onChange}
                                                            onBlurAction={field.onBlur}
                                                            required={'required'}
                                                            error={errors.statusId}
                                                        />
                                                    )}
                                                />
                                            </div>

                                            <div className="row">
                                                <Field
                                                    name="projectId"
                                                    render={({ field /* _form */ }) => (
                                                        <InputSelect
                                                            label={'Project'}
                                                            name={field.name}
                                                            id={'projectId'}
                                                            options={projects}
                                                            value={field.value}
                                                            onChangeAction={field.onChange}
                                                            onBlurAction={field.onBlur}
                                                            required={'required'}
                                                            error={errors.projectId}
                                                        />
                                                    )}
                                                />
                                            </div>

                                            {statusCodeRef === 'option' ? (
                                                <div className="row">
                                                    <Field
                                                        name="amountOption"
                                                        render={({ field /* _form */ }) => (
                                                            <InputText
                                                                label={'Aantal optie'}
                                                                name={field.name}
                                                                id={'amountOption'}
                                                                value={field.value}
                                                                onChangeAction={field.onChange}
                                                                onBlurAction={field.onBlur}
                                                                required={'required'}
                                                                error={errors.amountOption}
                                                            />
                                                        )}
                                                    />
                                                    <Field
                                                        name="optionDate"
                                                        render={({ field /* _form */ }) => (
                                                            <InputDate
                                                                label={'Optiedatum'}
                                                                name={field.name}
                                                                id={'optionDate'}
                                                                value={field.value}
                                                                onChangeAction={field.onChange}
                                                                onBlurAction={field.onBlur}
                                                                required={'required'}
                                                                error={errors.optionDate}
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            ) : null}

                                            {statusCodeRef === 'granted' ? (
                                                <div className="row">
                                                    <Field
                                                        name="amountOption"
                                                        render={({ field /* _form */ }) => (
                                                            <InputText
                                                                label={'Aantal optie'}
                                                                name={field.name}
                                                                id={'amountOption'}
                                                                value={field.value}
                                                                onChangeAction={field.onChange}
                                                                onBlurAction={field.onBlur}
                                                                required={'required'}
                                                                error={errors.amountOption}
                                                            />
                                                        )}
                                                    />
                                                    <Field
                                                        name="optionDate"
                                                        render={({ field /* _form */ }) => (
                                                            <InputDate
                                                                label={'Optiedatum'}
                                                                name={field.name}
                                                                id={'optionDate'}
                                                                value={field.value}
                                                                onChangeAction={field.onChange}
                                                                onBlurAction={field.onBlur}
                                                                required={'required'}
                                                                error={errors.optionDate}
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            ) : null}

                                            <PanelFooter>
                                                <div className="pull-right btn-group" role="group">
                                                    <ButtonText
                                                        buttonText={'Opslaan'}
                                                        type={'submit'}
                                                        value={'Submit'}
                                                        loading={isSubmitting}
                                                    />
                                                </div>
                                            </PanelFooter>
                                        </Form>
                                    </React.Fragment>
                                );
                            }}
                        />
                    </div>
                </PanelBody>
            </Panel>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        participantMutationStatuses: state.systemData.participantMutationStatuses,
    };
};

const mapDispatchToProps = dispatch => ({
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ParticipantNewForm);
