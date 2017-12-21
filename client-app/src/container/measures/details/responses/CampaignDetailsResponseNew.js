import React, { Component } from 'react';
import { connect } from 'react-redux';

import ContactsAPI from '../../../../api/ContactsAPI';
import CampaignAPI from '../../../../api/CampaignAPI';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from "../../../../components/form/InputSelect";
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import { fetchCampaign } from '../../../../actions/CampaignsActions';

class CampaignDetailsResponseNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contactId:'',
            contacts: [],
            errors: {
                contact: false,
                hasErrors: true,
            },
        };
    };

    componentWillMount() {
        ContactsAPI.getContactsPeek().then(payload => {
            this.setState({
                contacts: payload
            });
        });
    }

    handleContactChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        if (value === '') {
            this.setState({
                ...this.state,
                contactId: '',
                errors: {
                    contact: true,
                    hasErrors: true
                },
            });
        }
        else {
            this.setState({
                ...this.state,
                contactId: value,
                errors: {
                    contact: false,
                    hasErrors: false
                },
            });
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        if(!this.state.errors.hasErrors){
            CampaignAPI.attachResponse(this.props.campaignId, this.state.contactId).then(() => {
               this.props.fetchCampaign(this.props.campaignId);
               this.props.toggleShowNew();
            });
        }
        else{
            this.setState({
                ...this.state,
                errors: {
                    contact: true,
                    hasErrors: true
                },
            });
        }
    };

    render() {
        const {contactId} = this.state;
        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label={"Campagne"}
                                name={"campaign"}
                                value={this.props.campaignName}
                                readOnly={true}
                            />
                            <InputSelect
                                label={"Contact"}
                                size={"col-sm-6"}
                                name={"contactId"}
                                options={this.state.contacts}
                                value={contactId}
                                onChangeAction={this.handleContactChange}
                                required={"required"}
                                optionName={"fullName"}
                                error={this.state.errors.contact}
                            />
                        </div>

                        <div className="pull-right btn-group" role="group">
                            <ButtonText buttonClassName={"btn-default"} buttonText={"Annuleren"} onClickAction={this.props.toggleShowNew}/>
                            <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit} type={"submit"} value={"Submit"}/>
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        campaignId: state.campaign.id,
        campaignName: state.campaign.name,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchCampaign: (id) => {
        dispatch(fetchCampaign(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(CampaignDetailsResponseNew);

