import React from 'react';
import {connect} from 'react-redux';

import { Link } from 'react-router';

import ViewText from '../../../../components/form/ViewText';
import moment from "moment/moment";

const createMarkup = (value) => {
    return {__html: value};
};

const EmailTemplateFormView = props => {
    const {id, contact, contactGroup, registration, opportunity, documentType, description, documentGroup, filename} = props.documentDetails;

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
                        label={"Aanmelding"}
                        value={ registration && registration.fullAddress }
                    />
                </div>
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <div className="row">
                    <ViewText
                        label={"Kans"}
                        value={ opportunity && opportunity.name }
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