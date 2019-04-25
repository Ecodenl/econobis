import React from 'react';
import moment from 'moment';

import ButtonText from '../../../components/button/ButtonText';
import PanelFooter from '../../../components/panel/PanelFooter';
import InputTinyMCE from '../../../components/form/InputTinyMCE';

const EmailTemplateNew = props => {
    const { name, subject, htmlBody } = props.emailTemplate;

    return (
        <form className="form-horizontal col-md-12" onSubmit={props.handleSubmit}>
            <div className="row">
                <div className="form-group col-sm-12">
                    <div className="row">
                        <div className="col-sm-3">
                            <label htmlFor="name" className="col-sm-12 required">
                                Naam
                            </label>
                        </div>
                        <div className="col-sm-8">
                            <input
                                name="name"
                                value={name}
                                onChange={props.handleInputChange}
                                className={`form-control input-sm ` + (props.errors.name ? 'has-error' : '')}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="form-group col-sm-12">
                    <div className="row">
                        <div className="col-sm-3">
                            <label htmlFor="subject" className="col-sm-12">
                                Standaard onderwerp
                            </label>
                        </div>
                        <div className="col-sm-8">
                            <input
                                name="subject"
                                value={subject}
                                onChange={props.handleInputChange}
                                className="form-control input-sm"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="form-group col-sm-12">
                    <div className="row">
                        <InputTinyMCE label={'Tekst'} value={htmlBody} onChangeAction={props.handleTextChange} />
                    </div>
                </div>
            </div>

            <PanelFooter>
                <div className="pull-right btn-group" role="group">
                    <ButtonText
                        buttonText={'Opslaan'}
                        onClickAction={props.handleSubmit}
                        type={'submit'}
                        value={'Submit'}
                    />
                </div>
            </PanelFooter>
        </form>
    );
};

export default EmailTemplateNew;
