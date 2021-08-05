import * as Yup from 'yup';

export const MailboxValidation = Yup.object().shape({
    name: Yup.string().required('Verplicht'),
    email: Yup.string()
        .email('Ongeldige e-mail')
        .required('Verplicht'),
});
