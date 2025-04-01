import * as Yup from 'yup';

export const CreatePortalFreeFieldsFieldValidation = Yup.object().shape({
    fieldId: Yup.string().required('Verplicht'),
});
export const UpdatePortalFreeFieldsFieldValidation = Yup.object().shape({});
