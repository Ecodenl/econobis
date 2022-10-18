import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import TeamDetailsAPI from '../../../../api/team/TeamDetailsAPI';
import { newTeamGroup } from '../../../../actions/team/TeamDetailsActions';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

class TeamDetailsGroupsNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            groupId: '',
            errors: {
                groupId: false,
                hasErrors: true,
            },
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;

        this.setState({ groupId: value });
    }

    handleSubmit(event) {
        event.preventDefault();

        const teamGroup = {
            teamId: this.props.teamId,
            groupId: this.state.groupId,
        };

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(teamGroup.groupId)) {
            errors.groupId = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        if (!hasErrors) {
            TeamDetailsAPI.newTeamGroup(teamGroup)
                .then(payload => {
                    this.props.newTeamGroup(payload.data.data);
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
                                label={'Gebruiker'}
                                size={'col-sm-6'}
                                name={'groupId'}
                                options={this.props.groups}
                                optionName={'fullName'}
                                value={this.state.groupId}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.groupId}
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
        groups: state.systemData.groups,
    };
};

const mapDispatchToProps = dispatch => ({
    newTeamGroup: teamGroup => {
        dispatch(newTeamGroup(teamGroup));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamDetailsGroupsNew);
