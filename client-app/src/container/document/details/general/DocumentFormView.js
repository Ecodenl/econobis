import React from 'react';
import {connect} from 'react-redux';

import ViewText from '../../../../components/form/ViewText';

const createMarkup = (value) => {
    return {__html: value};
};

const EmailTemplateFormView = props => {
    const {id, contact, contactGroup, intake, opportunity, documentType, description, documentGroup, filename, template, task, quotationRequest, housingFile, campaign , measure} = props.documentDetails;

    return (
        <div>
            <div className="row" onClick={props.switchToEdit}>
                <div className="row">
                    <ViewText
                        label={"Contact"}
                        value={ contact && contact.fullName }
                    />
                    <ViewText
                        label={"Type"}
                        value={ documentType && documentType.name }
                    />
                </div>
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <div className="row">
                    <ViewText
                        label={"Groep"}
                        value={ contactGroup && contactGroup.name }
                    />
                    <ViewText
                        label={"Intake"}
                        value={ intake && intake.fullAddress }
                    />
                </div>
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <div className="row">
                    <ViewText
                        label={"Kans"}
                        value={ opportunity && (opportunity.measureCategory.name + ' ' + opportunity.status.name) }
                    />
                    <ViewText
                        label={"Taak"}
                        value={ task && task.name }
                    />
                </div>
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <div className="row">
                    <ViewText
                        label={"Offerteverzoek"}
                        value={ quotationRequest && quotationRequest.name }
                    />
                    <ViewText
                        label={"Woningdossier"}
                        value={ housingFile && housingFiles.name }
                    />
                </div>
            </div>
            {documentType === 'upload' &&
            <div className="row" onClick={props.switchToEdit}>
                <div className="row">
                    <ViewText
                        label={"Campagne"}
                        value={campaign && campaign.name}
                    />
                    <ViewText
                        label={"Maatregel"}
                        value={measure && measure.name}
                    />
                </div>
            </div>
            }
            <div className="row" onClick={props.switchToEdit}>
                <div className="row">
                    <ViewText
                        label={"Template"}
                        value={ template && template.name }
                    />
                </div>
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <div className="col-sm-3">
                    <label>Omschrijving</label>
                </div>
                <div className="col-sm-6">
                    {description}
                </div>
            </div>
            <div className="row margin-30-top" onClick={props.switchToEdit}>
                <div className="row">
                    <ViewText
                        label={"Document groep"}
                        value={ documentGroup && documentGroup.name }
                    />
                    <ViewText
                        label={"Filenaam"}
                        value={ filename }
                    />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        documentDetails: state.documentDetails,
    }
};

export default connect(mapStateToProps)(EmailTemplateFormView);