import React, {Component} from 'react';
import {connect} from 'react-redux';
import validator from "validator";

import ButtonText from '../../../../components/button/ButtonText';
import PanelFooter from "../../../../components/panel/PanelFooter";
import InputSelect from '../../../../components/form/InputSelect';
import InputText from '../../../../components/form/InputText';
import { updateDocument } from '../../../../actions/document/DocumentDetailsActions';
import DocumentDetailsAPI from "../../../../api/document/DocumentDetailsAPI";
import ContactGroupAPI from "../../../../api/contact-group/ContactGroupAPI";
import IntakesAPI from "../../../../api/intake/IntakesAPI";
import OpportunitiesAPI from "../../../../api/opportunity/OpportunitiesAPI";
import ContactsAPI from "../../../../api/contact/ContactsAPI";
import ViewText from "../../../../components/form/ViewText";
import TasksAPI from "../../../../api/task/TasksAPI";
import HousingFileAPI from "../../../../api/housing-file/HousingFilesAPI";
import MeasureAPI from "../../../../api/measure/MeasureAPI";
import CampaignAPI from "../../../../api/campaign/CampaignsAPI";
import QuotationRequestsAPI from "../../../../api/quotation-request/QuotationRequestsAPI";
import ParticipantsProductionProjectAPI from "../../../../api/participant-production-project/ParticipantsProductionProjectAPI";
import ProductionProjectsAPI from "../../../../api/production-project/ProductionProjectsAPI";
import OrdersAPI from "../../../../api/order/OrdersAPI";

class DocumentFormEdit extends Component {
    constructor(props) {
        super(props);

        const {id, orderId, productionProjectId, participantId, contactId, contactGroupId, intakeId, opportunityId, campaignId, housingFileId, quotationRequestId, measureId, taskId, documentType, description, documentGroup, filename} = props.documentDetails;

        this.state = {
            contacts: [],
            contactGroups: [],
            intakes: [],
            opportunities: [],
            campaigns: [],
            housingFiles: [],
            quotationRequests: [],
            measures: [],
            tasks: [],
            participants: [],
            productionProjects: [],
            orders: [],
            document: {
                id: id,
                contactId: contactId || '',
                contactGroupId: contactGroupId || '',
                intakeId: intakeId || '',
                opportunityId: opportunityId || '',
                campaignId: campaignId || '',
                housingFileId: housingFileId || '',
                quotationRequestId: quotationRequestId || '',
                measureId: measureId || '',
                taskId: taskId || '',
                productionProjectId: productionProjectId || '',
                participantId: participantId || '',
                orderId: orderId || '',
                documentType: documentType && documentType.id,
                description: description,
                documentGroup: documentGroup && documentGroup.id
            },
            errors: {
                docLinkedAtAny: false,
                documentGroup: false,
            },
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        ContactsAPI.getContactsPeek().then((payload) => {
            this.setState({ contacts: payload });
        });

        IntakesAPI.peekIntakes().then((payload) => {
            this.setState({ intakes: payload });
        });

        ContactGroupAPI.peekContactGroups().then((payload) => {
            this.setState({ contactGroups: payload });
        });

        OpportunitiesAPI.peekOpportunities().then((payload) => {
            this.setState({ opportunities: payload });
        });

        CampaignAPI.peekCampaigns().then((payload) => {
            this.setState({ campaigns: payload });
        });

        HousingFileAPI.peekHousingFiles().then((payload) => {
            this.setState({ housingFiles: payload });
        });

        QuotationRequestsAPI.peekQuotationRequests().then((payload) => {
            this.setState({ quotationRequests: payload });
        });

        TasksAPI.peekTasks().then((payload) => {
            this.setState({ tasks: payload });
        });

        MeasureAPI.peekMeasures().then((payload) => {
            this.setState({ measures: payload });
        });

        ProductionProjectsAPI.peekProductionProjects().then((payload) => {
            this.setState({ productionProjects: payload });
        });

        ParticipantsProductionProjectAPI.peekParticipantsProductionProjects().then((payload) => {
            this.setState({ participants: payload });
        });

        OrdersAPI.peekOrders().then((payload) => {
            this.setState({ orders: payload });
        });
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            document: {
                ...this.state.document,
                [name]: value
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const {document} = this.state;

        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty(document.contactId + '') && validator.isEmpty(document.contactGroupId + '') && validator.isEmpty(document.intakeId + '') && validator.isEmpty(document.opportunityId + '') && validator.isEmpty(document.orderId + '') && validator.isEmpty(document.participantId + '') && validator.isEmpty(document.productionProjectId + '')){
            errors.docLinkedAtAny = true;
            hasErrors = true;
        };

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
        DocumentDetailsAPI.updateDocument(document).then(payload => {
            this.props.updateDocument(payload.data.data);

            this.props.switchToView();
        });
    };

    render() {
        const { document, errors, orders, contacts, contactGroups, intakes, opportunities, campaigns, housingFiles, quotationRequests, measures, tasks, productionProjects, participants } = this.state;
        const { orderId, contactId, contactGroupId, intakeId, opportunityId, campaignId, housingFileId, quotationRequestId, measureId, taskId, documentType, description, participantId, productionProjectId } = document;
        const oneOfFieldRequired = contactId === '' && orderId === '' && contactGroupId === '' && intakeId === '' && opportunityId === '' && taskId === '' && quotationRequestId === '' && housingFileId === '' && participantId === '' && productionProjectId === '';

        return (
            <div>
                <div>
                    <div className="row">
                        <InputSelect
                            label="Contact"
                            name={"contactId"}
                            value={contactId}
                            options={contacts}
                            optionName={'fullName'}
                            onChangeAction={this.handleInputChange}
                            required={oneOfFieldRequired && "required"}
                            error={errors.docLinkedAtAny}
                        />
                        <InputText
                            label="Type"
                            name={"documentType"}
                            value={this.props.documentDetails.documentType && this.props.documentDetails.documentType.name}
                            readOnly={true}
                        />
                    </div>
                    <div className="row">
                        <InputSelect
                            label="Groep"
                            name={"contactGroupId"}
                            value={contactGroupId}
                            options={contactGroups}
                            onChangeAction={this.handleInputChange}
                            required={oneOfFieldRequired && "required"}
                            error={errors.docLinkedAtAny}
                        />
                        <InputSelect
                            label="Intake"
                            name={"intakeId"}
                            value={intakeId}
                            options={intakes}
                            onChangeAction={this.handleInputChange}
                            required={oneOfFieldRequired && "required"}
                            error={errors.docLinkedAtAny}
                        />
                    </div>
                    <div className="row">
                        <InputSelect
                            label="Kans"
                            name={"opportunityId"}
                            value={opportunityId}
                            options={opportunities}
                            onChangeAction={this.handleInputChange}
                            required={oneOfFieldRequired && "required"}
                            error={errors.docLinkedAtAny}
                        />
                        <InputSelect
                            label="Taak"
                            name={"taskId"}
                            value={taskId}
                            options={tasks}
                            onChangeAction={this.handleInputChange}
                            required={oneOfFieldRequired && "required"}
                            error={errors.docLinkedAtAny}
                        />
                    </div>
                    <div className="row">
                        <InputSelect
                            label="Offerteverzoek"
                            name={"quotationRequestId"}
                            value={quotationRequestId}
                            options={quotationRequests}
                            onChangeAction={this.handleInputChange}
                            required={oneOfFieldRequired && "required"}
                            error={errors.docLinkedAtAny}
                        />
                        <InputSelect
                            label="Woningdossier"
                            name={"housingFileId"}
                            value={housingFileId}
                            options={housingFiles}
                            onChangeAction={this.handleInputChange}
                            required={oneOfFieldRequired && "required"}
                            error={errors.docLinkedAtAny}
                        />
                    </div>

                    <div className="row">
                        <InputSelect
                            label="Productieproject"
                            name={"productionProjectId"}
                            value={productionProjectId}
                            options={productionProjects}
                            onChangeAction={this.handleInputChange}
                            required={oneOfFieldRequired && "required"}
                            error={errors.docLinkedAtAny}
                        />
                        <InputSelect
                            label="Participant productieproject"
                            name={"participantId"}
                            value={participantId}
                            options={participants}
                            onChangeAction={this.handleInputChange}
                            required={oneOfFieldRequired && "required"}
                            error={errors.docLinkedAtAny}
                        />
                    </div>

                    <div className="row">
                        <InputSelect
                            label="Order"
                            name={"orderId"}
                            value={orderId}
                            options={orders}
                            onChangeAction={this.handleInputChange}
                            required={oneOfFieldRequired && "required"}
                            error={errors.docLinkedAtAny}
                        />
                    </div>

                    {documentType === 'upload' &&
                    <div className="row">
                        <InputSelect
                            label="Maatregel"
                            name={"measureId"}
                            value={measureId}
                            options={measures}
                            onChangeAction={this.handleInputChange}
                        />
                        <InputSelect
                            label="Campagne"
                            name={"campaignId"}
                            value={campaignId}
                            options={campaigns}
                            onChangeAction={this.handleInputChange}
                        />
                    </div>
                    }
                    <div className="row">
                        <ViewText
                            label={"Template"}
                            value={ this.props.documentDetails.template ? this.props.documentDetails.template.name : 'Geen'}
                        />
                    </div>
                    <div className="row">
                        <div className="form-group col-sm-12">
                            <div className="row">
                                <div className="col-sm-3">
                                    <label className="col-sm-12">Omschrijving</label>
                                </div>
                                <div className="col-sm-6">
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        name="description"
                                        value={description}
                                        onChange={ this.handleInputChange }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row margin-30-top">
                        <InputText
                            label="Documentgroep"
                            name={"documentGroup"}
                            value={this.props.documentDetails.documentGroup && this.props.documentDetails.documentGroup.name}
                            readOnly={true}
                        />
                        <InputText
                            label="Bestandsnaam"
                            name={"filename"}
                            value={this.props.documentDetails.filename}
                            readOnly={true}
                        />
                    </div>
                </div>

                <PanelFooter>
                    <div className="pull-right btn-group" role="group">
                        <ButtonText buttonClassName={"btn-default"} buttonText={"Annuleren"}
                                    onClickAction={this.props.switchToView}/>
                        <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit} type={"submit"}
                                    value={"Submit"}/>
                    </div>
                </PanelFooter>

            </div>
        );
    };
};

const mapDispatchToProps = dispatch => ({
    updateDocument: (document) => {
        dispatch(updateDocument(document));
    },
});

const mapStateToProps = (state) => {
    return {
        documentDetails: state.documentDetails,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentFormEdit);
