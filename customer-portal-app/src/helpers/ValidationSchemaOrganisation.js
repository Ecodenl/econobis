import * as Yup from 'yup';

export default {
    validationSchemaBasic: Yup.object().shape({
        // TODO set more correct values for validation, only important fields are set now
        organisation: Yup.object().shape({
            name: Yup.string()
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
        postalAddress: Yup.object().shape({
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
        visitAddress: Yup.object().shape({
            number: Yup.number().typeError('Alleen nummers'),
        }),
        invoiceAddress: Yup.object().shape({
            number: Yup.number().typeError('Alleen nummers'),
        }),
    }),

    validationSchemaAdditional: Yup.object().shape({
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
