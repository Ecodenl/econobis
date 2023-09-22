import React from 'react';
import PanelHeader from '../../../../../components/panel/PanelHeader';
import PanelBody from '../../../../../components/panel/PanelBody';
import InputText from '../../../../../components/form/InputText';
// import CopyToClipboard from 'react-copy-to-clipboard';
import { REDIRECT_URL_MS_OAUTH } from '../../../../../constants';
import ViewText from '../../../../../components/form/ViewText';

function MailboxDefaultFormGeneralMsOauthApiSettings({ values, errors, touched, handleChange, handleBlur }) {
    return (
        <>
            <PanelHeader>
                <span className="h5">
                    <strong>Microsoft Azure api instellingen</strong>
                </span>
            </PanelHeader>
            <PanelBody>
                <div className="row">
                    <InputText
                        label={'Client id'}
                        name={'gmailApiSettings.clientId'}
                        value={values.gmailApiSettings?.clientId}
                        onChangeAction={handleChange}
                        onBlurAction={handleBlur}
                        required={'required'}
                        error={errors.gmailApiSettings?.clientId && touched.gmailApiSettings?.clientId}
                        errorMessage={errors.gmailApiSettings?.clientId}
                    />
                    <InputText
                        label={'Object ID'}
                        name={'gmailApiSettings.projectId'}
                        value={values.gmailApiSettings?.projectId}
                        onChangeAction={handleChange}
                        onBlurAction={handleBlur}
                        required={'required'}
                        error={errors.gmailApiSettings?.projectId && touched.gmailApiSettings?.projectId}
                        errorMessage={errors.gmailApiSettings?.projectId}
                    />
                </div>
                <div className="row">
                    <ViewText className="form-group col-sm-6" label={'Redirect url'} value={REDIRECT_URL_MS_OAUTH} />
                    <InputText
                        type={'text'}
                        label={'Client secret waarde'}
                        name={'gmailApiSettings.clientSecret'}
                        value={values.gmailApiSettings?.clientSecret}
                        className={'numeric-password'}
                        placeholder="**********"
                        onChangeAction={handleChange}
                        onBlurAction={handleBlur}
                        required={'required'}
                        error={errors.gmailApiSettings?.clientSecret && touched.gmailApiSettings?.clientSecret}
                        errorMessage={errors.gmailApiSettings?.clientSecret}
                    />
                </div>
                <div className="row">
                    <InputText
                        label={'Tenant ID'}
                        name={'gmailApiSettings.tenantId'}
                        value={values.gmailApiSettings?.tenantId}
                        onChangeAction={handleChange}
                        onBlurAction={handleBlur}
                        required={'required'}
                        error={errors.gmailApiSettings?.tenantId && touched.gmailApiSettings?.tenantId}
                        errorMessage={errors.gmailApiSettings?.tenantId}
                    />
                </div>
            </PanelBody>
        </>
    );
}

export default MailboxDefaultFormGeneralMsOauthApiSettings;
