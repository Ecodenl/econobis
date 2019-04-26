import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { setError } from '../../../actions/general/ErrorActions';

import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import { connect } from 'react-redux';
import InputSelect from '../../../components/form/InputSelect';
import ButtonText from '../../../components/button/ButtonText';
import PanelFooter from '../../../components/panel/PanelFooter';

const validationSchema = Yup.object().shape({
    contactId: Yup.number().required(),
    statusId: Yup.number().required(),
    projectId: Yup.number().required(),
});

const ParticipantNewForm = ({ contacts, contactId, projects, projectId, participantProjectStatuses, handleSubmit }) => {
    const initialValues = {
        contactId: contactId,
        statusId: null,
        projectId: projectId,
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
                            render={({ errors, touched, setFieldValue, isSubmitting }) => {
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
                                                            error={Boolean(errors.contactId)}
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
                                                            options={participantProjectStatuses}
                                                            value={field.value}
                                                            onChangeAction={field.onChange}
                                                            onBlurAction={field.onBlur}
                                                            required={'required'}
                                                            error={Boolean(errors.statusId)}
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
                                                            error={Boolean(errors.projectId)}
                                                        />
                                                    )}
                                                />
                                            </div>

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
        participantProjectStatuses: state.systemData.participantProjectStatus,
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
