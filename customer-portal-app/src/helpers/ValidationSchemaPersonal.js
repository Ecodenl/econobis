import * as Yup from 'yup';
import * as ibantools from 'ibantools';
import { isEmpty } from 'lodash';

export default {
    validationSchemaBasic: Yup.object().shape({
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
                    if (!value) {
                        return true;
                    }
                    return Number.isInteger(+value);
                }),
            postalCode: Yup.string()
                .trim()
                .test('postal-code-nl-check', 'Formaat Nederlandse postcode is 1234 AB', function(value) {
                    if (
                        (this.parent.countryId &&
                            this.parent.countryId !== 'NL' &&
                            this.parent.countryId !== null &&
                            this.parent.countryId != '') ||
                        !value ||
                        value.trim() == ''
                    ) {
                        return true;
                    } else {
                        return !value.search(/^[1-9][0-9]{3}[ ]?([A-RT-Za-rt-z][A-Za-z]|[sS][BCbcE-Re-rT-Zt-z])$/);
                    }
                }),
            city: Yup.string().trim(),
            eanElectricity: Yup.string()
                .nullable()
                .trim()
                .matches(/(\d.*){18}|^$/, 'Minimaal 18 cijfers nodig'),
            eanGas: Yup.string()
                .nullable()
                .trim()
                .matches(/(\d.*){18}|^$/, 'Minimaal 18 cijfers nodig'),
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
        iban: Yup.string()
            .nullable()
            .trim()
            .test(
                'iban',
                'Ongeldige IBAN of gebruik geen spaties.',
                value => ibantools.isValidIBAN(value) || isEmpty(value)
            ),
    }),

    validationSchemaAdditional: Yup.object().shape({
        person: Yup.object().shape({
            firstName: Yup.string()
                .trim()
                // .required('Verplicht'),
                .test('initials-and-first-name-check', 'Voornaam of initialen verplicht', function(value) {
                    if ((value && value.trim() != '') || (this.parent.initials && this.parent.initials.trim() != '')) {
                        return true;
                    } else {
                        return false;
                    }
                }),
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
                .test('postal-code-nl-check', 'Formaat Nederlandse postcode is 1234 AB', function(value) {
                    if (
                        (this.parent.countryId &&
                            this.parent.countryId !== 'NL' &&
                            this.parent.countryId !== null &&
                            this.parent.countryId != '') ||
                        !value ||
                        value.trim() == ''
                    ) {
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
        iban: Yup.string()
            .trim()
            .nullable()
            .required('Verplicht')
            .test('iban', 'Ongeldige IBAN of gebruik geen spaties.', value => ibantools.isValidIBAN(value)),
        ibanAttn: Yup.string()
            .trim()
            .nullable()
            .required('Verplicht'),
    }),

    validationSchemaPcrAdditional: Yup.object().shape({
        primaryAddress: Yup.object().shape({
            eanElectricity: Yup.string()
                .nullable()
                .trim()
                .matches(/(\d.*){18}|^$/, 'Minimaal 18 cijfers nodig')
                .required('Verplicht'),
            currentAddressEnergySupplierElectricity: Yup.object().shape({
                energySupplierId: Yup.string()
                    .nullable()
                    .required('Verplicht'),
                esNumber: Yup.string()
                    .nullable()
                    .trim()
                    .required('Verplicht'),
            }),
        }),
    }),

    validationSchemaPostalCodeAndNumber: Yup.object().shape({
        primaryAddress: Yup.object().shape({
            number: Yup.string()
                .nullable()
                .trim()
                .required('Verplicht')
                .test('number', 'Alleen nummers', value => {
                    return Number.isInteger(+value);
                }),
            postalCode: Yup.string()
                .trim()
                .required('Verplicht')
                .test('postal-code-nl-check', 'Formaat Nederlandse postcode is 1234 AB', function(value) {
                    if (
                        (this.parent.countryId &&
                            this.parent.countryId !== 'NL' &&
                            this.parent.countryId !== null &&
                            this.parent.countryId != '') ||
                        !value ||
                        value.trim() == ''
                    ) {
                        return true;
                    } else {
                        return !value.search(/^[1-9][0-9]{3}[ ]?([A-RT-Za-rt-z][A-Za-z]|[sS][BCbcE-Re-rT-Zt-z])$/);
                    }
                }),
        }),
    }),
};
