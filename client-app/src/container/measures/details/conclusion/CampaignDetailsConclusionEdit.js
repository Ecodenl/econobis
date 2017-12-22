import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import validator from 'validator';

import InputText from '../../../../components/form/InputText';
import InputSelect from '../../../../components/form/InputSelect';
import ButtonText from '../../../../components/button/ButtonText';
import PanelFooter from "../../../../components/panel/PanelFooter";

import CampaignAPI from '../../../../api/CampaignAPI';

import { fetchCampaign } from '../../../../actions/CampaignsActions';
import InputDate from "../../../../components/form/InputDate";

class CampaignFormEdit extends Component {
    constructor(props) {
        super(props);
        const { id, createdBy = {}, createdAt = {}, ownedBy = {} } = props.campaign;

        this.state = {
            campaign: {
                id,
                createdBy: createdBy ? createdBy.fullName : '',
                ownedById: ownedBy ? ownedBy.id : '',
                createdAt: createdAt ? createdAt : '',
            },
            errors: {
                ownedBy: false,
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

    handleSubmit = event => {
        event.preventDefault();

        const {campaign} = this.state;

        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty('' + campaign.ownedById)){
            errors.ownedBy = true;
            hasErrors = true;
        };

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
        CampaignAPI.updateCampaignOwner(campaign.id, campaign.ownedById).then(payload => {
            this.props.fetchCampaign(campaign.id);
            this.props.switchToView();
        });
    };

    render() {
        const {createdBy, ownedById, createdAt}  = this.state.campaign;

        return (
            <form className="form-horizontal col-md-12" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputSelect
                        label={"Verantwoordelijke"}
                        size={"col-sm-6"}
                        name={"ownedById"}
                        options={this.props.users}
                        value={ownedById}
                        optionName={'fullName'}
                        onChangeAction={this.handleInputChange}
                        error={this.state.errors.ownedBy}
                    />
                </div>
                <div className="row">
                    <InputText
                        label={"Gemaakt door"}
                        name={"createdBy"}
                        value={createdBy}
                        readOnly={true}
                    />
                    <InputDate
                        label={"Gemaakt op"}
                        size={"col-sm-6"}
                        name={"createdAt"}
                        value={ createdAt ? moment(createdAt).format('LL') : createdAt}
                        readOnly={true}
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
        campaign: state.campaign,
        users: state.systemData.users,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CampaignFormEdit);
