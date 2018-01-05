import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from "validator";

import MailboxAPI from '../../../../api/mailbox/MailboxAPI';
import { newMailboxUser } from '../../../../actions/mailbox/MailboxDetailsActions';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from "../../../../components/form/InputSelect";
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import { fetchCampaign } from '../../../../actions/campaign/CampaignsActions';

class MailboxDetailsUsersNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId:'',
            errors: {
                userId: false,
                hasErrors: true,
            },
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;

        this.setState({userId: value});
    };

    handleSubmit(event) {
        event.preventDefault();

        const mailboxUser = {
            mailboxId: this.props.mailboxId,
            userId: this.state.userId,
        };

        // Validation
        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty(mailboxUser.userId)){
            errors.userId = true;
            hasErrors = true;
        };

        this.setState({ ...this.state, errors: errors });

        if(!hasErrors){
            MailboxAPI.newMailboxUser(mailboxUser).then((payload) => {
               this.props.newMailboxUser(payload.data.data);
               this.props.toggleShowNew();
            })
            .catch((error) => {
                console.log(error.response);
            });
        }
    };

    render() {
        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label={"Mailbox"}
                                name={"mailbox"}
                                value={this.props.mailboxName}
                                readOnly={true}
                            />
                            <InputSelect
                                label={"Gebruiker"}
                                size={"col-sm-6"}
                                name={"userId"}
                                options={this.props.users}
                                optionName={"fullName"}
                                value={this.state.userId}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={this.state.errors.userId}
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
        mailboxId: state.mailboxDetails.id,
        mailboxName: state.mailboxDetails.name,
        users: state.systemData.users,
    };
};

const mapDispatchToProps = dispatch => ({
    newMailboxUser: (mailboxUser) => {
        dispatch(newMailboxUser(mailboxUser));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MailboxDetailsUsersNew);

