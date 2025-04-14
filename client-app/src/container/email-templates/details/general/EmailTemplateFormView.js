import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');
import { Link } from 'react-router-dom';

import ViewHtmlAsText from '../../../../components/form/ViewHtmlAsText';

const createMarkup = value => {
    return { __html: value };
};

const EmailTemplateFormView = props => {
    const { name, subject, htmlBody, defaultAttachmentDocument, createdBy } = props.emailTemplate;

    return (
        <div>
            <div className="row margin-10-top" onClick={props.switchToEdit}>
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-3">
                            <label className="col-sm-12">Naam</label>
                        </div>
                        <div className="col-sm-9">{name}</div>
                    </div>
                </div>
            </div>
            <div className="row margin-10-top" onClick={props.switchToEdit}>
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-3">
                            <label className="col-sm-12">Standaard onderwerp</label>
                        </div>
                        <div className="col-sm-9">{subject}</div>
                    </div>
                </div>
            </div>

            <div className="row margin-10-top" onClick={props.switchToEdit}>
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-3">
                            <label className="col-sm-12">Standaard E-mail bijlage</label>
                        </div>
                        <div className="col-sm-9">
                            {defaultAttachmentDocument ? defaultAttachmentDocument.filename : ''}
                        </div>
                    </div>
                </div>
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewHtmlAsText label={'Tekst'} value={htmlBody} switchToEdit={props.switchToEdit} />
            </div>

            <div className="row margin-10-top" onClick={props.switchToEdit}>
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-3">
                            <label className="col-sm-12">Gemaakt door</label>
                        </div>
                        <div className="col-sm-9">
                            <Link to={createdBy ? 'gebruiker/' + createdBy.id : ''} className="link-underline">
                                {createdBy ? createdBy.fullName : ''}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        emailTemplate: state.emailTemplate,
    };
};

export default connect(mapStateToProps)(EmailTemplateFormView);
