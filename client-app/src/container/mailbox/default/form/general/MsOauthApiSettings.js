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
                        name={'oauthApiSettings.clientId'}
                        value={values.oauthApiSettings?.clientId}
                        onChangeAction={handleChange}
                        onBlurAction={handleBlur}
                        required={'required'}
                        error={errors.oauthApiSettings?.clientId && touched.oauthApiSettings?.clientId}
                        errorMessage={errors.oauthApiSettings?.clientId}
                    />
                    <InputText
                        label={'Object ID'}
                        name={'oauthApiSettings.projectId'}
                        value={values.oauthApiSettings?.projectId}
                        onChangeAction={handleChange}
                        onBlurAction={handleBlur}
                        required={'required'}
                        error={errors.oauthApiSettings?.projectId && touched.oauthApiSettings?.projectId}
                        errorMessage={errors.oauthApiSettings?.projectId}
                    />
                </div>
                <div className="row">
                    <ViewText className="form-group col-sm-6" label={'Redirect url'} value={REDIRECT_URL_MS_OAUTH} />
                    <InputText
                        type={'text'}
                        label={'Client secret waarde'}
                        name={'oauthApiSettings.clientSecret'}
                        value={values.oauthApiSettings?.clientSecret}
                        className={'numeric-password'}
                        placeholder="**********"
                        onChangeAction={handleChange}
                        onBlurAction={handleBlur}
                        required={'required'}
                        error={errors.oauthApiSettings?.clientSecret && touched.oauthApiSettings?.clientSecret}
                        errorMessage={errors.oauthApiSettings?.clientSecret}
                    />
                </div>
                <div className="row">
                    <InputText
                        label={'Tenant ID'}
                        name={'oauthApiSettings.tenantId'}
                        value={values.oauthApiSettings?.tenantId}
                        onChangeAction={handleChange}
                        onBlurAction={handleBlur}
                        required={'required'}
                        error={errors.oauthApiSettings?.tenantId && touched.oauthApiSettings?.tenantId}
                        errorMessage={errors.oauthApiSettings?.tenantId}
                    />
                </div>
            </PanelBody>
        </>
    );
}

export default MailboxDefaultFormGeneralMsOauthApiSettings;
