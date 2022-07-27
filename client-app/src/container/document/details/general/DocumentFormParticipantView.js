import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../../components/form/ViewText';

const DocumentDetailsFormParticipantView = props => {
    const {
        id,
        participant,
        contact,
        project,
        documentType,
        description,
        freeText1,
        freeText2,
        documentGroup,
        filename,
        template,
        showOnPortal,
    } = props.documentDetails;

    return (
        <div>
            <div className="row" onClick={props.switchToEdit}>
                <div className="row">
                    <ViewText label={'Deelnemer project'} value={participant && participant.name} />
                    <ViewText label={'Type'} value={documentType && documentType.name} />
                </div>
                <div className="row">
                    <ViewText label={'Contact'} value={contact && contact.fullName} />
                    <ViewText label={'Project'} value={project && project.name} />
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

export default connect(mapStateToProps)(DocumentDetailsFormParticipantView);
