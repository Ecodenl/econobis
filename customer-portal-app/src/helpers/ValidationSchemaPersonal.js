import * as Yup from 'yup';
import * as ibantools from 'ibantools';

export default {
    validationSchemaBasic: Yup.object().shape({
        // TODO set more correct values for validation, only important fields are set now
        didAgreeAvg: Yup.bool().test(
            'didAgreeAvg',
            'Je dient akkoord te gaan met privacybeleid!',
            value => value === true
        ),
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
            street: Yup.string().trim(),
            number: Yup.string()
                .nullable()
                .trim()
                .test('number', 'Alleen nummers', value => {
                    return Number.isInteger(+value);
                }),
            postalCode: Yup.string()
                .trim()
                .matches(/(\d.*){4}|^$/, 'Minimum van 4 postcode cijfers nodig'),
            city: Yup.string().trim(),
        }),
        phoneNumberPrimary: Yup.object().shape({
            number: Yup.string()
                .trim()
                .matches(/(\d.*){10}|^$/, 'Minimaal 10 cijfers nodig'),
        }),
        phoneNumberTwo: Yup.object().shape({
            number: Yup.string()
                .trim()
                .matches(/(\d.*){10}|^$/, 'Minimaal 10 cijfers nodig'),
        }),
        primaryContactEnergySupplier: Yup.object().shape({
            eanElectricity: Yup.string()
                .nullable()
                .trim()
                .matches(/(\d.*){18}|^$/, 'Minimaal 18 cijfers nodig'),
            eanGas: Yup.string()
                .nullable()
                .trim()
                .matches(/(\d.*){18}|^$/, 'Minimaal 18 cijfers nodig'),
        }),
    }),

    validationSchemaAdditional: Yup.object().shape({
        person: Yup.object().shape({
            titleId: Yup.string()
                .nullable()
                .required('Verplicht'),
            firstName: Yup.string()
                .trim()
                .required('Verplicht'),
            dateOfBirth: Yup.date()
                .typeError('Verplicht of ongeldige datum')
                .required('Verplicht'),
        }),
        phoneNumberPrimary: Yup.object().shape({
            number: Yup.string()
                .trim()
                .matches(/(\d.*){10}/, 'Minimaal 10 cijfers nodig')
                .required('Verplicht'),
        }),
        phoneNumberTwo: Yup.object().shape({
            number: Yup.string()
                .trim()
                .matches(/(\d.*){10}|^$/, 'Minimaal 10 cijfers nodig'),
        }),
        primaryAddress: Yup.object().shape({
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
                .matches(/(\d.*){4}|^$/, 'Minimum van 4 postcode cijfers nodig')
                .required('Verplicht'),
            city: Yup.string()
                .trim()
                .required('Verplicht'),
        }),
        iban: Yup.string()
            .trim()
            .nullable()
            .required('Verplicht')
            .test('iban', 'Ongeldige IBAN !', value => ibantools.isValidIBAN(value)),
        ibanAttn: Yup.string()
            .trim()
            .nullable()
            .required('Verplicht'),
    }),

    validationSchemaPcrAdditional: Yup.object().shape({
        primaryContactEnergySupplier: Yup.object().shape({
            energySupplierId: Yup.string()
                .nullable()
                .required('Verplicht'),
            esNumber: Yup.string()
                .nullable()
                .trim()
                .required('Verplicht'),
            eanElectricity: Yup.string()
                .nullable()
                .trim()
                .matches(/(\d.*){18}|^$/, 'Minimaal 18 cijfers nodig')
                .required('Verplicht'),
            eanGas: Yup.string()
                .nullable()
                .trim()
                .matches(/(\d.*){18}|^$/, 'Minimaal 18 cijfers nodig'),
        }),
    }),
};
