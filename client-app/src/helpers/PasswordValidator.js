import passwordValidator from 'password-validator';

export default (password) => {
    const passwordValidation = new passwordValidator();

    passwordValidation
        .is().min(8)
        .has().uppercase()
        .has().lowercase()
        .has().digits()
        .has().not().spaces();

    return passwordValidation.validate(password);
};
