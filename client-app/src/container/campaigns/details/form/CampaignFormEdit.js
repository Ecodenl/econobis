import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
moment.locale('nl');
import validator from 'validator';

import InputText from '../../../../components/form/InputText';
import InputSelect from '../../../../components/form/InputSelect';
import InputDate from '../../../../components/form/InputDate';
import ButtonText from '../../../../components/button/ButtonText';
import PanelFooter from "../../../../components/panel/PanelFooter";

import CampaignDetailsAPI from '../../../../api/campaign/CampaignDetailsAPI';

import { fetchCampaign } from '../../../../actions/campaign/CampaignDetailsActions';
import InputMultiSelect from "../../../../components/form/InputMultiSelect";

class CampaignFormEdit extends Component {
    constructor(props) {
        super(props);

        const {id, name, number, description, startDate, endDate, status, measureCategories, type} = props.campaign;

        this.state = {
            campaign: {
                id,
                name,
                number,
                description: description ? description : '',
                startDate,
                endDate,
                statusId: status ? status.id : '',
                typeId: type && type.id,
                measureCategoryIds: measureCategories && measureCategories.map((measureCategory) => measureCategory.id).join(','),
            },
            errors: {
                name: false,
                type: false,
            },
        }
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            campaign: {
                ...this.state.campaign,
                [name]: value
            },
        });
    };

    handleStartDate = (date) => {
        const formattedDate = (date ? moment(date).format('Y-MM-DD') : '');

        this.setState({
            ...this.state,
            campaign: {
                ...this.state.campaign,
                startDate: formattedDate
            },
        });
    };

    handleEndDate = (date) => {
        const formattedDate = (date ? moment(date).format('Y-MM-DD') : '');

        this.setState({
            ...this.state,
            campaign: {
                ...this.state.campaign,
                endDate: formattedDate
            },
        });
    };

    handleMeasureCategoryIds = (selectedOption) => {
        this.setState({
            ...this.state,
            campaign: {
                ...this.state.campaign,
                measureCategoryIds: selectedOption
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const {campaign} = this.state;

        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty(campaign.name)){
            errors.name = true;
            hasErrors = true;
        };

        if(validator.isEmpty('' + campaign.typeId)){
            errors.type = true;
            hasErrors = true;
        };

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
        CampaignDetailsAPI.updateCampaign(campaign.id, campaign).then(payload => {
            this.props.fetchCampaign(campaign.id);
            this.props.switchToView();
        });
    };

    render() {
        const {id, name, number, description, startDate, endDate, statusId, measureCategoryIds, typeId}  = this.state.campaign;

        return (
            <form className="form-horizontal col-md-12" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputText
                        label={"Naam"}
                        size={"col-sm-6"}
                        name={"name"}
                        value={name}
                        onChangeAction={this.handleInputChange}
                        required={"required"}
                        error={this.state.errors.name}
                    />
                    <InputText
                        label={"Campagnenummer"}
                        name={"number"}
                        value={number}
                        readOnly={true}
                    />
                </div>

                <div className="row">
                    <div className="form-group col-sm-12">
                        <div className="row">
                            <div className="col-sm-3">
                                <label htmlFor="description" className="col-sm-12">Beschrijving</label>
                            </div>
                            <div className="col-sm-8">
                                <textarea name='description' value={description} onChange={this.handleInputChange}
                                          className="form-control input-sm"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <InputDate
                        label={"Begindatum"}
                        size={"col-sm-6"}
                        name={"startDate"}
                        value={ startDate ? startDate : ''}
                        onChangeAction={this.handleStartDate}
                    />
                    <InputDate
                    label={"Einddatum"}
                    size={"col-sm-6"}
                    name={"endDate"}
                    value={ endDate ? endDate : ''}
                    onChangeAction={this.handleEndDate}
                    />
                </div>

                <div className="row">
                    <InputSelect
                        label={"Status"}
                        size={"col-sm-6"}
                        name={"statusId"}
                        options={this.props.status}
                        value={statusId}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputMultiSelect
                        label="Aangeboden maatregelen"
                        name="measureCategoryIds"
                        value={measureCategoryIds}
                        options={this.props.measureCategories}
                        onChangeAction={this.handleMeasureCategoryIds}
                    />
                </div>


                <div className="row">
                    <InputSelect
                        label={"Type"}
                        size={"col-sm-6"}
                        name={"typeId"}
                        options={this.props.types}
                        value={typeId}
                        onChangeAction={this.handleInputChange}
                        required={"required"}
                        error={this.state.errors.type}
                    />
                </div>
                <PanelFooter>
                    <div className="pull-right btn-group" role="group">
                        <ButtonText buttonClassName={"btn-default"} buttonText={"Annuleren"}
                                    onClickAction={this.props.switchToView}/>
                        <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit} type={"submit"}
                                    value={"Submit"}/>
                    </div>
                </PanelFooter>
            </form>
        );
    };
};

const mapDispatchToProps = dispatch => ({
    fetchCampaign: (id) => {
        dispatch(fetchCampaign(id));
    },
});

const mapStateToProps = (state) => {
    return {
        campaign: state.campaignDetails,
        status: state.systemData.campaignStatuses,
        types: state.systemData.campaignTypes,
        measureCategories: state.systemData.measureCategories,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CampaignFormEdit);
