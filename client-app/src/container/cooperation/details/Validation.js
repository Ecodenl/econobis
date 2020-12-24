import * as Yup from 'yup';
import * as ibantools from 'ibantools';

export const CooperationValidation = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Verplicht'),
    iban: Yup.string()
        .trim()
        .nullable()
        .test('iban', 'Ongeldige IBAN !', value => (value ? ibantools.isValidIBAN(value) : true)),
    email: Yup.string().email('Ongeldige e-mail'),
    website: Yup.string().url('Ongeldige url'),
    hoomLink: Yup.string().url('Ongeldige url'),
});
