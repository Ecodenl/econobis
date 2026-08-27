import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');

import ViewHtmlAsText from '../../../../components/form/ViewHtmlAsText';
import ViewText from '../../../../components/form/ViewText';

const createMarkup = value => {
    return { __html: value };
};

const DocumentTemplateFormView = props => {
    const {
        name,
        number,
        htmlBody,
        allowChangeHtmlBody,
        characteristic,
        roles,
        documentGroup,
        documentTemplateType,
        baseTemplate,
        headerTemplate,
        footerTemplate,
        active,
        createdAt,
        createdBy,
    } = props.documentTemplate;
    return (
        <div>
            <div className="row margin-10-top" onClick={props.switchToEdit}>
                <ViewText label={'Template'} value={name} />
                <ViewText label={'Template nummer'} value={number} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Documentgroep'} value={documentGroup ? documentGroup.name : ''} />
                <ViewText label={'Documenttype'} value={documentTemplateType ? documentTemplateType.name : ''} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Kenmerk'} value={characteristic} />
                {documentTemplateType.id == 'general' && (
                    <ViewText label={'Rollen'} value={roles && roles.map(roles => roles.name).join(', ')} />
                )}
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewHtmlAsText label={'Tekst'} value={htmlBody} switchToEdit={props.switchToEdit} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Tekst wijzigbaar bij document'} value={allowChangeHtmlBody ? 'Ja' : 'Nee'} />
            </div>

            {documentTemplateType.id == 'general' && (
                <div className="row">
                    <ViewText
                        label={'Basis template'}
                        value={baseTemplate ? baseTemplate.name : ''}
                        link={baseTemplate ? '/document-template/' + baseTemplate.id : ''}
                    />
                </div>
            )}
            {documentTemplateType.id == 'general' && (
                <div className="row">
                    <ViewText
                        label={'Koptekst'}
                        value={headerTemplate ? headerTemplate.name : ''}
                        link={headerTemplate ? '/document-template/' + headerTemplate.id : ''}
                    />
                </div>
            )}
            {documentTemplateType.id == 'general' && (
                <div className="row">
                    <ViewText
                        label={'Voettekst'}
                        value={footerTemplate ? footerTemplate.name : ''}
                        link={footerTemplate ? '/document-template/' + footerTemplate.id : ''}
                    />
                </div>
            )}
            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Actief'} value={active ? 'Ja' : 'Nee'} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Gemaakt op'} value={createdAt ? moment(createdAt).format('L') : 'Onbekend'} />
                <ViewText
                    label={'Gemaakt door'}
                    value={createdBy ? createdBy.fullName : 'Onbekend'}
                    link={createdBy ? '/gebruiker/' + createdBy.id : ''}
                />
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        documentTemplate: state.documentTemplateDetails,
    };
};

export default connect(mapStateToProps)(DocumentTemplateFormView);
