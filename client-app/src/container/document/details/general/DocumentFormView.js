import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../../components/form/ViewText';

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
        freeText1,
        freeText2,
        documentGroup,
        filename,
        template,
        task,
        quotationRequest,
        housingFile,
        campaign,
        measure,
        order,
        showOnPortal,
    } = props.documentDetails;

    console.log(opportunity.measureCategory.name + ' ' + opportunity.status.name);
    console.log(props.documentDetails);
    // console.log(campaign);
    return (
        <div>
            <div className="row" onClick={props.switchToEdit}>
                <div className="row">
                    <ViewText label={'Type'} value={documentType && documentType.name} />
                </div>
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <div className="row">
                    <ViewText label={'Contact'} value={contact && contact.fullName} />
                </div>
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <div className="row">
                    <ViewText label={'Groep'} value={contactGroup && contactGroup.name} />
                    <ViewText label={'Intake'} value={intake && intake.fullAddress} />
                </div>
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <div className="row">
                    <ViewText
                        label={'Kansx'}
                        value={opportunity && opportunity.measureCategory.name + ' ' + opportunity.status.name}
                    />
                    <ViewText label={'Taak'} value={task && task.name} />
                </div>
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <div className="row">
                    <ViewText label={'Kansactie'} value={quotationRequest && quotationRequest.name} />
                    <ViewText label={'Woningdossier'} value={housingFile && housingFiles.name} />
                </div>
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <div className="row">
                    <ViewText label={'Project'} value={project && project.name} />
                    <ViewText label={'Deelnemer project'} value={participant && participant.name} />
                </div>
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <div className="row">
                    <ViewText label={'Order'} value={order && order.name} />
                    <ViewText label={'Administratie'} value={administration && administration.name} />
                </div>
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <div className="row">
                    <ViewText label={'Campagne'} value={campaign && campaign.name} />
                    <ViewText label={'Maatregel'} value={measure && measure.name} />
                </div>
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <div className="row">
                    <ViewText label={'Tonen op portal'} value={showOnPortal ? 'Ja' : 'Nee'} />
                </div>
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <div className="col-sm-3">
                    <label>Omschrijving</label>
                </div>
                <div className="col-sm-6">{description}</div>
            </div>
            {documentType.id === 'upload' ? (
                <div className="row margin-30-top" onClick={props.switchToEdit}>
                    <div className="row">
                        <ViewText label={'Documentgroep'} value={documentGroup && documentGroup.name} />
                        <ViewText label={'Bestandsnaam'} value={filename} />
                    </div>
                </div>
            ) : (
                <>
                    <div className="row margin-30-top" onClick={props.switchToEdit}>
                        <div className="row">
                            <ViewText label={'Documentgroep'} value={documentGroup && documentGroup.name} />
                            <ViewText label={'Template'} value={template && template.name} />
                        </div>
                    </div>
                    <div className="row" onClick={props.switchToEdit}>
                        <div className="col-sm-3">
                            <label>Tekst veld 1</label>
                        </div>
                        <div className="col-sm-6">{freeText1}</div>
                    </div>
                    <div className="row" onClick={props.switchToEdit}>
                        <div className="col-sm-3">
                            <label>Tekst veld 2</label>
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
