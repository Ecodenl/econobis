import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import TeamDetailsAPI from '../../../../api/team/TeamDetailsAPI';
import { newTeamUser } from '../../../../actions/team/TeamDetailsActions';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

class TeamDetailsUsersNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: '',
            errors: {
                userId: false,
                hasErrors: true,
            },
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;

        this.setState({ userId: value });
    }

    handleSubmit(event) {
        event.preventDefault();

        const teamUser = {
            teamId: this.props.teamId,
            userId: this.state.userId,
        };

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(teamUser.userId)) {
            errors.userId = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        if (!hasErrors) {
            TeamDetailsAPI.newTeamUser(teamUser)
                .then(payload => {
                    this.props.newTeamUser(payload.data.data);
                    this.props.toggleShowNew();
                })
                .catch(error => {
                    console.log(error.response);
                });
        }
    }

    render() {
        const selectedIds = (this.props.selectedUsers || []).map(d => String(d.id));

        const usersToSelectFiltered = (this.props.usersToSelect || []).filter(d => !selectedIds.includes(String(d.id)));

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputText label={'Team'} name={'team'} value={this.props.teamName} readOnly={true} />
                            <InputSelect
                                label={'Gebruiker'}
                                size={'col-sm-6'}
                                name={'userId'}
                                options={usersToSelectFiltered}
                                optionName={'fullName'}
                                value={this.state.userId}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.userId}
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
        usersToSelect: state.systemData.users,
        selectedUsers: state.teamDetails.users,
    };
};

const mapDispatchToProps = dispatch => ({
    newTeamUser: teamUser => {
        dispatch(newTeamUser(teamUser));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamDetailsUsersNew);
