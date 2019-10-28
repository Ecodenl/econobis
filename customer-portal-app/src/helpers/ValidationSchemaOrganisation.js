import * as Yup from 'yup';
import * as ibantools from 'ibantools';

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
            number: Yup.string()
                .nullable()
                .trim()
                .test('number', 'Alleen nummers', value => {
                    return Number.isInteger(+value);
                })
                .required('Verplicht'),
            postalCode: Yup.string()
                .trim()
                .required('Verplicht'),
            city: Yup.string()
                .trim()
                .required('Verplicht'),
        }),
        visitAddress: Yup.object().shape({
            number: Yup.string()
                .nullable()
                .test('number', 'Alleen nummers', value => {
                    return Number.isInteger(+value);
                }),
        }),
        invoiceAddress: Yup.object().shape({
            number: Yup.string()
                .nullable()
                .test('number', 'Alleen nummers', value => {
                    return Number.isInteger(+value);
                }),
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
