import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import TeamDetailsAPI from '../../../../api/team/TeamDetailsAPI';
import { newTeamMailbox } from '../../../../actions/team/TeamDetailsActions';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import MailboxAPI from '../../../../api/mailbox/MailboxAPI';

class TeamDetailsMailboxesNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mailboxId: '',
            mailboxesToSelect: [],
            errors: {
                mailboxId: false,
                hasErrors: true,
            },
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;

        this.setState({ mailboxId: value });
    }

    componentDidMount() {
        MailboxAPI.peekMailboxes().then(payload => {
            this.setState({ mailboxesToSelect: payload });
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const teamMailbox = {
            teamId: this.props.teamId,
            mailboxId: this.state.mailboxId,
        };

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(teamMailbox.mailboxId)) {
            errors.mailboxId = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        if (!hasErrors) {
            TeamDetailsAPI.newTeamMailbox(teamMailbox)
                .then(payload => {
                    this.props.newTeamMailbox(payload.data.data);
                    this.props.toggleShowNew();
                })
                .catch(error => {
                    console.log(error.response);
                });
        }
    }

    render() {
        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputText label={'Team'} name={'team'} value={this.props.teamName} readOnly={true} />
                            <InputSelect
                                label={'Groep'}
                                size={'col-sm-6'}
                                name={'mailboxId'}
                                options={this.state.mailboxesToSelect}
                                optionName={'name'}
                                value={this.state.mailboxId}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.mailboxId}
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
        teamId: state.teamDetails.id,
        teamName: state.teamDetails.name,
    };
};

const mapDispatchToProps = dispatch => ({
    newTeamMailbox: teamMailbox => {
        dispatch(newTeamMailbox(teamMailbox));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamDetailsMailboxesNew);
