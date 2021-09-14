import React, { Component } from 'react';
import { connect } from 'react-redux';

import ContactsAPI from '../../../../api/contact/ContactsAPI';
import CampaignDetailsAPI from '../../../../api/campaign/CampaignDetailsAPI';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import { fetchCampaign } from '../../../../actions/campaign/CampaignDetailsActions';

class CampaignDetailsResponseNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contactId: '',
            contacts: [],
            errors: {
                contact: false,
                hasErrors: true,
            },
        };
    }

    componentWillMount() {
        ContactsAPI.getContactsPeek().then(payload => {
            this.setState({
                contacts: payload,
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
                    hasErrors: true,
                },
            });
        } else {
            this.setState({
                ...this.state,
                contactId: value,
                errors: {
                    contact: false,
                    hasErrors: false,
                },
            });
        }
    };

    handleSubmit = event => {
        event.preventDefault();

        if (!this.state.errors.hasErrors) {
            CampaignDetailsAPI.attachResponse(this.props.campaignId, this.state.contactId).then(() => {
                this.props.fetchCampaign(this.props.campaignId, null);
                this.props.toggleShowNew();
            });
        } else {
            this.setState({
                ...this.state,
                errors: {
                    contact: true,
                    hasErrors: true,
                },
            });
        }
    };

    render() {
        const { contactId } = this.state;
        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label={'Campagne'}
                                name={'campaign'}
                                value={this.props.campaignName}
                                readOnly={true}
                            />
                            <InputSelect
                                label={'Contact'}
                                size={'col-sm-6'}
                                name={'contactId'}
                                options={this.state.contacts}
                                value={contactId}
                                onChangeAction={this.handleContactChange}
                                required={'required'}
                                optionName={'fullName'}
                                error={this.state.errors.contact}
                            />
                        </div>

                        <div className="pull-right btn-group" role="group">
                            <ButtonText
                                buttonClassName={'btn-default'}
                                buttonText={'Annuleren'}
                                onClickAction={this.props.toggleShowNew}
                            />
                            <ButtonText
                                buttonText={'Opslaan'}
                                onClickAction={this.handleSubmit}
                                type={'submit'}
                                value={'Submit'}
                            />
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        campaignId: state.campaignDetails.details.id,
        campaignName: state.campaignDetails.details.name
    };
};

const mapDispatchToProps = dispatch => ({
    fetchCampaign: (id, pagination) => {
        dispatch(fetchCampaign(id, pagination));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(CampaignDetailsResponseNew);
