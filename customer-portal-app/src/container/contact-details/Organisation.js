import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DefaultContactOrganisationView from './default-form-organisation/View';
import DefaultContactOrganisationEdit from './default-form-organisation/Edit';
import { Form, Formik } from 'formik';
import { ClipLoader } from 'react-spinners';
import ValidationSchemaOrganisation from './../../helpers/ValidationSchemaOrganisation';

function ContactDetailsOrganisation({
    portalSettings,
    initialContact,
    freeFieldsFieldRecords,
    handleSubmitContactValues,
    editButtonGroup,
    editForm,
    setEditForm,
}) {
    const validationSchema = initialContact.isParticipantPcrProject
        ? ValidationSchemaOrganisation.validationSchemaBasic
              .concat(ValidationSchemaOrganisation.validationSchemaAdditional)
              .concat(ValidationSchemaOrganisation.validationSchemaPcrAdditional)
        : initialContact.isParticipant
        ? ValidationSchemaOrganisation.validationSchemaBasic.concat(
              ValidationSchemaOrganisation.validationSchemaAdditional
          )
        : ValidationSchemaOrganisation.validationSchemaBasic;

    return (
        <div>
            {editForm ? (
                <Formik
                    initialValues={initialContact}
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                        actions.setSubmitting(true);
                        handleSubmitContactValues(values, actions, () => setEditForm(false));
                    }}
                >
                    {({ errors, touched, setFieldValue, isSubmitting, status, values, handleSubmit }) => {
                        const saveButtonGroup = (
                            <ButtonGroup aria-label="organisation" className="float-right">
                                <Button
                                    variant={'outline-dark'}
                                    size="sm"
                                    onClick={function() {
                                        setEditForm(false);
                                    }}
                                >
                                    Annuleren
                                </Button>
                                <Button className={'w-button'} size="sm" onClick={handleSubmit} disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <span>
                                            <ClipLoader color={'white'} size={14} />
                                            Bezig met opslaan
                                        </span>
                                    ) : (
                                        'Opslaan'
                                    )}
                                </Button>
                            </ButtonGroup>
                        );

                        return (
                            <Form>
                                <DefaultContactOrganisationEdit
                                    portalSettings={portalSettings}
                                    initialContact={initialContact}
                                    freeFieldsFieldRecords={freeFieldsFieldRecords}
                                    saveButtonGroup={saveButtonGroup}
                                    setFieldValue={setFieldValue}
                                    values={values}
                                    touched={touched}
                                    errors={errors}
                                    formikStatus={status}
                                    stepTwo={false}
                                />
                            </Form>
                        );
                    }}
                </Formik>
            ) : (
                <>
                    <DefaultContactOrganisationView
                        portalSettings={portalSettings}
                        initialContact={initialContact}
                        freeFieldsFieldRecords={freeFieldsFieldRecords}
                        editButtonGroup={editButtonGroup}
                    />
                </>
            )}
        </div>
    );
}

export default ContactDetailsOrganisation;
