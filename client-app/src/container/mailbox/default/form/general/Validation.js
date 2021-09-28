import * as Yup from 'yup';

export const MailboxValidation = Yup.object().shape({
    name: Yup.string().required('Verplicht'),
    email: Yup.string()
        .email('Ongeldige e-mail')
        .required('Verplicht'),
});

export const MailboxValidationImap = Yup.object().shape({
    imapHost: Yup.string().required('Verplicht'),
    username: Yup.string().required('Verplicht'),
    password: Yup.string().required('Verplicht'),
});

export const MailboxValidationSmtp = Yup.object().shape({
    smtpHost: Yup.string().required('Verplicht'),
    username: Yup.string().required('Verplicht'),
    password: Yup.string().required('Verplicht'),
});

export const MailboxValidationMailgun = Yup.object().shape({
    mailgunDomainId: Yup.string().required('Verplicht'),
});

export const MailboxValidationGmail = Yup.object().shape({
    gmailApiSettings: Yup.object().shape({
        clientId: Yup.string()
            .trim()
            .required('Verplicht'),
        clientSecret: Yup.string()
            .trim()
            .required('Verplicht'),
    }),
});
