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
            street: Yup.string().trim(),
            number: Yup.string()
                .nullable()
                .trim()
                .test('number', 'Alleen nummers', value => {
                    return Number.isInteger(+value);
                }),
            postalCode: Yup.string()
                .trim()
                .test('postal-code-nl-check', 'Formaat Nederlandse postcode is 1234 AB', function(value) {
                    if (this.parent.countryId !== 'NL' || value.trim() == '') {
                        return true;
                    } else {
                        return !value.search(/^[1-9][0-9]{3}[ ]?([A-RT-Za-rt-z][A-Za-z]|[sS][BCbcE-Re-rT-Zt-z])$/);
                    }
                }),
            city: Yup.string().trim(),
        }),
        visitAddress: Yup.object().shape({
            street: Yup.string().trim(),
            number: Yup.string()
                .nullable()
                .trim()
                .test('number', 'Alleen nummers', value => {
                    return Number.isInteger(+value);
                }),
            postalCode: Yup.string()
                .trim()
                .test('postal-code-nl-check', 'Formaat Nederlandse postcode is 1234 AB', function(value) {
                    if (this.parent.countryId !== 'NL' || value.trim() == '') {
                        return true;
                    } else {
                        return !value.search(/^[1-9][0-9]{3}[ ]?([A-RT-Za-rt-z][A-Za-z]|[sS][BCbcE-Re-rT-Zt-z])$/);
                    }
                }),
            city: Yup.string().trim(),
        }),
        invoiceAddress: Yup.object().shape({
            street: Yup.string().trim(),
            number: Yup.string()
                .nullable()
                .test('number', 'Alleen nummers', value => {
                    return Number.isInteger(+value);
                }),
            postalCode: Yup.string()
                .trim()
                .test('postal-code-nl-check', 'Formaat Nederlandse postcode is 1234 AB', function(value) {
                    if (this.parent.countryId !== 'NL' || value.trim() == '') {
                        return true;
                    } else {
                        return !value.search(/^[1-9][0-9]{3}[ ]?([A-RT-Za-rt-z][A-Za-z]|[sS][BCbcE-Re-rT-Zt-z])$/);
                    }
                }),
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
        phoneNumberPrimary: Yup.object().shape({
            number: Yup.string()
                .trim()
                .matches(/(\d.*){10}/, 'Minimaal 10 cijfers nodig')
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
        visitAddress: Yup.object().shape({
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
                .test('postal-code-nl-check', 'Formaat Nederlandse postcode is 1234 AB', function(value) {
                    if (this.parent.countryId !== 'NL') {
                        return true;
                    } else {
                        return !value.search(/^[1-9][0-9]{3}[ ]?([A-RT-Za-rt-z][A-Za-z]|[sS][BCbcE-Re-rT-Zt-z])$/);
                    }
                })
                .required('Verplicht'),
            city: Yup.string()
                .trim()
                .required('Verplicht'),
        }),
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
