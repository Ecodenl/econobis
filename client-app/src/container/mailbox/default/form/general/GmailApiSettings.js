import React from 'react';
import PanelHeader from '../../../../../components/panel/PanelHeader';
import PanelBody from '../../../../../components/panel/PanelBody';
import InputText from '../../../../../components/form/InputText';
import CopyToClipboard from 'react-copy-to-clipboard';
import { REDIRECT_URL } from '../../../../../constants';

function MailboxDefaultFormGeneralGmailApiSettings({ values, handleChange, handleBlur }) {
    return (
        <>
            <PanelHeader>
                <span className="h5">
                    <strong>Gmail api instellingen</strong>
                </span>
            </PanelHeader>
            <PanelBody>
                <div className="row">
                    <InputText
                        label={'Project id'}
                        name={'gmailApiSettings.projectId'}
                        value={values.gmailApiSettings?.projectId}
                        onChangeAction={handleChange}
                        onBlurAction={handleBlur}
                    />
                    <div className="form-group col-sm-6">
                        <label className="col-sm-6">Redirect url</label>
                        <div className="col-sm-6" style={{ paddingRight: '5px' }} onClick={null}>
                            {REDIRECT_URL}
                            <CopyToClipboard text={REDIRECT_URL}>
                                <span
                                    className="glyphicon glyphicon-copy mybtn-success pull-right"
                                    style={{ top: '5px' }}
                                    role="button"
                                    onClick={null}
                                    title={'Kopieer sleutel'}
                                />
                            </CopyToClipboard>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <InputText
                        label={'Client id'}
                        name={'gmailApiSettings.clientId'}
                        value={values.gmailApiSettings?.clientId}
                        onChangeAction={handleChange}
                        onBlurAction={handleBlur}
                    />
                    <InputText
                        label={'Client secret'}
                        name={'gmailApiSettings.clientSecret'}
                        value={values.gmailApiSettings?.clientSecret}
                        onChangeAction={handleChange}
                        onBlurAction={handleBlur}
                    />
                </div>
            </PanelBody>
        </>
    );
}

export default MailboxDefaultFormGeneralGmailApiSettings;