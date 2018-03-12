import React, {Component} from 'react';

import RevenueDistributionFormList from './RevenueDistributionFormList';
import Panel from '../../../../../../components/panel/Panel';
import PanelBody from '../../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../../components/panel/PanelHeader';
import {connect} from "react-redux";
import PanelFooter from "../../../../../../components/panel/PanelFooter";
import ButtonText from "../../../../../../components/button/ButtonText";
import Modal from "../../../../../../components/modal/Modal";
import InputSelect from "../../../../../../components/form/InputSelect";
import DocumentTemplateAPI from "../../../../../../api/document-template/DocumentTemplateAPI";
import ProductionProjectRevenueAPI from "../../../../../../api/production-project/ProductionProjectRevenueAPI";
import validator from "validator";
import {hashHistory} from "react-router";
import ViewText from "../../../../../../components/form/ViewText";

class RevenueDistributionForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            distributionIds: [],
            templateId: '',
            templateIdError: false,
            templates: [],
            documentGroup: '',
            showCheckboxList: false,
            showModal: false,
            modalText: '',
            buttonConfirmText: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        DocumentTemplateAPI.fetchDocumentTemplatesPeekGeneral().then((payload) => {
            let templates = [];

            payload.forEach(function (template) {
                if (template.group == 'revenue') {
                    templates.push({id: template.id, name: template.name});
                }
            });

            this.setState({
                templates: templates,
            });
        });
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            templateId: value
        });
    };

    toggleShowCheckboxList = () => {
        if (this.state.showCheckboxList) {
            this.setState({
                showCheckboxList: false,
                distributionIds: []
            });
        }
        else {
            this.setState({
                showCheckboxList: true,
            });
        }

    };

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        });
    };

    toggleParticipantCheck = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let distributionIds = this.state.distributionIds;

        if (value) {
            distributionIds.push(name);
            this.setState({
                distributionIds
            });
        }
        else {
            distributionIds = distributionIds.filter((id) => id != name);
            this.setState({
                distributionIds
            });
        }
    };

    checkParticipantRapport = () => {
        let error = false;
        if (validator.isEmpty(this.state.templateId)) {
            error = true;
            this.setState({
                templateIdError: true,
            });
        }
        else {
            this.setState({
                templateIdError: false,
            });
        }

        if (this.state.distributionIds.length > 0 && !error) {
            this.setState({
                showModal: true,
                modalText: 'De rapporten worden per participant gemaakt met de gekozen template.',
                buttonConfirmText: 'Maken'
            });
        }
        else if(!error){
            this.setState({
                showModal: true,
                modalText: 'Er zijn geen participanten geselecteerd.',
                buttonConfirmText: 'Voeg participanten toe'
            });
        }
    };

    createParticipantRapport = () => {
        if (!this.state.distributionIds.length > 0) {
            this.setState({
                showModal: false,
            });
        }
        else {
            ProductionProjectRevenueAPI.createParticipantRapport(this.state.templateId, this.state.distributionIds).then((payload) => {
                console.log('hier');
            });
        }
    };


    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Opbrengstverdeling participanten</span>
                    {this.props.productionProjectRevenue.confirmed &&
                    <a role="button" onClick={this.toggleShowCheckboxList} className="pull-right"><span
                        className="glyphicon glyphicon-list-alt"/></a>
                    }
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <RevenueDistributionFormList
                            showCheckboxList={this.state.showCheckboxList}
                            toggleParticipantCheck={this.toggleParticipantCheck}
                        />
                    </div>
                </PanelBody>
                {this.state.showCheckboxList &&
                <PanelFooter>
                    <div className="row">
                        <div className="col-md-12">
                            <ViewText
                                label="Document groep"
                                value={'Opbrengst'}
                            />
                            <InputSelect
                                label="Template"
                                name={"templateId"}
                                value={this.state.templateId}
                                options={this.state.templates}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={this.state.templateIdError}
                            />
                        </div>
                        <div className="col-md-12">
                            <div className="margin-10-top pull-right btn-group" role="group">
                                <ButtonText buttonClassName={"btn-default"} buttonText={"Annuleren"}
                                            onClickAction={this.toggleShowCheckboxList}/>
                                <ButtonText buttonText={"Maak rapport"} onClickAction={this.checkParticipantRapport}
                                            type={"submit"}
                                            value={"Submit"}/>
                            </div>
                        </div>
                    </div>
                </PanelFooter>
                }
                {this.state.showModal &&
                <Modal
                    title={'Participant rapport maken'}
                    closeModal={this.toggleModal}
                    children={this.state.modalText}
                    buttonConfirmText={this.state.buttonConfirmText}
                    confirmAction={this.createParticipantRapport}
                />
                }
            </Panel>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        productionProjectRevenue: state.productionProjectRevenue,
        documentGroups: state.systemData.documentGroups,
    };
};

export default connect(mapStateToProps)(RevenueDistributionForm);
