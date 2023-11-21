import * as Yup from 'yup';

export const MailboxValidation = Yup.object().shape({
    name: Yup.string().required('Verplicht'),
    email: Yup.string()
        .email('Ongeldige e-mail')
        .required('Verplicht'),
});

export const MailboxValidationImap = Yup.object().shape({
    imapHost: Yup.string().required('Verplicht'),
    imapPort: Yup.string().required('Verplicht'),
    username: Yup.string().required('Verplicht'),
});

export const MailboxValidationSmtp = Yup.object().shape({
    smtpHost: Yup.string().required('Verplicht'),
    smtpPort: Yup.string().required('Verplicht'),
    username: Yup.string().required('Verplicht'),
});

export const MailboxValidationPassword = Yup.object().shape({
    password: Yup.string().required('Verplicht'),
});

export const MailboxValidationMailgun = Yup.object().shape({
    mailgunDomainId: Yup.string()
        .required('Verplicht')
        .typeError('Verplicht'),
});

export const MailboxValidationMsOauth = Yup.object().shape({
    oauthApiSettings: Yup.object().shape({
        clientId: Yup.string()
            .trim()
            .required('Verplicht'),
        projectId: Yup.string()
            .trim()
            .required('Verplicht'),
        tenantId: Yup.string()
            .trim()
            .required('Verplicht'),
    }),
});
export const MailboxValidationClientSecret = Yup.object().shape({
    oauthApiSettings: Yup.object().shape({
        clientSecret: Yup.string()
            .trim()
            .required('Verplicht'),
    }),
});
