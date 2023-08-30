import * as Yup from 'yup';
import * as ibantools from 'ibantools';

export const CooperationValidation = Yup.object().shape({
    name: Yup.string().required('Verplicht'),
    iban: Yup.string()
        .trim()
        .nullable()
        .test('iban', 'Ongeldige IBAN !', value => (value ? ibantools.isValidIBAN(value) : true)),
    kvkNumber: Yup.string()
        .nullable()
        .trim()
        .test('number', 'Alleen nummers', value => {
            return value ? Number.isInteger(+value) : true;
        }),
    email: Yup.string().email('Ongeldige e-mail'),
    emailReportTableProblems: Yup.string().email('Ongeldige Email bij problemen vullen report tabel'),
    website: Yup.string().url('Ongeldige url'),
    hoomLink: Yup.string().url('Ongeldige url'),
    hoomConnectCoachLink: Yup.string().url('Ongeldige url'),
});

export const CreateCooperationHoomCampaignValidation = Yup.object().shape({
    campaignId: Yup.string().required('Verplicht'),
});
export const UpdateCooperationHoomCampaignValidation = Yup.object().shape({});
