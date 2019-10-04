import * as Yup from 'yup';

export default {
    validationSchemaBasic: Yup.object().shape({
        // TODO set more correct values for validation, only important fields are set now
        person: Yup.object().shape({
            lastName: Yup.string()
                .trim()
                .required('Verplicht'),
        }),
        emailCorrespondence: Yup.object().shape({
            email: Yup.string()
                .trim()
                .email('Ongeldig e-mail adres')
                .required('Verplicht'),
        }),
        emailInvoice: Yup.object().shape({
            email: Yup.string()
                .trim()
                .email('Ongeldig e-mail adres'),
        }),
        primaryAddress: Yup.object().shape({
            street: Yup.string()
                .trim()
                .required('Verplicht'),
            number: Yup.number()
                .typeError('Alleen nummers')
                .required('Verplicht'),
            postalCode: Yup.string()
                .trim()
                .required('Verplicht'),
            city: Yup.string()
                .trim()
                .required('Verplicht'),
            countryId: Yup.string().required('Verplicht'),
        }),
    }),

    validationSchemaAdditional: Yup.object().shape({
        person: Yup.object().shape({
            titleId: Yup.string().required('Verplicht'),
            firstName: Yup.string()
                .trim()
                .required('Verplicht'),
            dateOfBirth: Yup.date('Ongeldige datum').required('Verplicht'),
        }),
        phoneNumberPrimary: Yup.object().shape({
            number: Yup.string()
                .trim()
                .required('Verplicht'),
        }),
        iban: Yup.string()
            .trim()
            .nullable()
            .required('Verplicht'),
        ibanAttn: Yup.string()
            .trim()
            .nullable()
            .required('Verplicht'),
    }),
};
