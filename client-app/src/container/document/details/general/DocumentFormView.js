import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../../components/form/ViewText';
import ViewHtmlAsText from '../../../../components/form/ViewHtmlAsText';

const DocumentDetailsFormView = props => {
    const {
        id,
        administration,
        project,
        participant,
        contact,
        contactGroup,
        intake,
        opportunity,
        documentType,
        description,
        documentGroup,
        template,
        htmlBody,
        freeText1,
        freeText2,
        filename,
        task,
        quotationRequest,
        housingFile,
        campaign,
        measure,
        order,
        showOnPortal,
    } = props.documentDetails;

    return (
        <div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Type'} value={documentType && documentType.name} />
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Contact'} value={contact && contact.fullName} />
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Groep'} value={contactGroup && contactGroup.name} />
                <ViewText label={'Intake'} value={intake && intake.fullAddress} />
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={'Kans'}
                    value={opportunity && opportunity.measureCategory.name + ' ' + opportunity.status.name}
                />
                <ViewText label={'Taak'} value={task && task.name} />
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Kansactie'} value={quotationRequest && quotationRequest.name} />
                <ViewText label={'Woningdossier'} value={housingFile && housingFiles.name} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Project'} value={project && project.name} />
                <ViewText label={'Deelnemer project'} value={participant && participant.name} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Order'} value={order && order.name} />
                <ViewText label={'Administratie'} value={administration && administration.name} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Campagne'} value={campaign && campaign.name} />
                <ViewText label={'Maatregel'} value={measure && measure.name} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Tonen op portal'} value={showOnPortal ? 'Ja' : 'Nee'} />
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-3">
                            <label className="col-sm-12">Omschrijving</label>
                        </div>
                        <div className="col-sm-9">{description}</div>
                    </div>
                </div>
            </div>
            {documentType.id === 'upload' ? (
                <>
                    <div className="row margin-30-top" onClick={props.switchToEdit}>
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="col-sm-3">
                                    <label className="col-sm-12">Documentgroep</label>
                                </div>
                                <div className="col-sm-9">{documentGroup && documentGroup.name}</div>
                            </div>
                        </div>
                    </div>
                    <div className="row" onClick={props.switchToEdit}>
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="col-sm-3">
                                    <label className="col-sm-12">Bestandsnaam</label>
                                </div>
                                <div className="col-sm-9">{filename}</div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="row margin-30-top" onClick={props.switchToEdit}>
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="col-sm-3">
                                    <label className="col-sm-12">Documentgroep</label>
                                </div>
                                <div className="col-sm-9">{documentGroup && documentGroup.name}</div>
                            </div>
                        </div>
                    </div>
                    <div className="row" onClick={props.switchToEdit}>
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="col-sm-3">
                                    <label className="col-sm-12">Template</label>
                                </div>
                                <div className="col-sm-9">{template && template.name}</div>
                            </div>
                        </div>
                    </div>

                    {template && template.allowChangeHtmlBody ? (
                        <div className="row" onClick={props.switchToEdit}>
                            <ViewHtmlAsText
                                label={'Template inhoud'}
                                value={htmlBody && htmlBody != '' ? htmlBody : template.htmlBody}
                            />
                        </div>
                    ) : null}

                    <div className="row" onClick={props.switchToEdit}>
                        <div className="col-sm-3">
                            <label className="col-sm-12">Tekst veld 1</label>
                        </div>
                        <div className="col-sm-6">{freeText1}</div>
                    </div>
                    <div className="row" onClick={props.switchToEdit}>
                        <div className="col-sm-3">
                            <label className="col-sm-12">Tekst veld 2</label>
                        </div>
                        <div className="col-sm-6">{freeText2}</div>
                    </div>
                </>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        documentDetails: state.documentDetails,
    };
};

export default connect(mapStateToProps)(DocumentDetailsFormView);
