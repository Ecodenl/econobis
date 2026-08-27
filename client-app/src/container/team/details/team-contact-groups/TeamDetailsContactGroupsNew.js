import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import TeamDetailsAPI from '../../../../api/team/TeamDetailsAPI';
import { newTeamContactGroup } from '../../../../actions/team/TeamDetailsActions';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import ContactGroupAPI from '../../../../api/contact-group/ContactGroupAPI';

class TeamDetailsContactGroupsNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contactGroupId: '',
            contactGroupsToSelect: [],
            errors: {
                contactGroupId: false,
                hasErrors: true,
            },
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;

        this.setState({ contactGroupId: value });
    }

    componentDidMount() {
        ContactGroupAPI.peekContactGroups().then(payload => {
            this.setState({ contactGroupsToSelect: payload });
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const teamContactGroup = {
            teamId: this.props.teamId,
            contactGroupId: this.state.contactGroupId,
        };

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(teamContactGroup.contactGroupId)) {
            errors.contactGroupId = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        if (!hasErrors) {
            TeamDetailsAPI.newTeamContactGroup(teamContactGroup)
                .then(payload => {
                    this.props.newTeamContactGroup(payload.data.data);
                    this.props.toggleShowNew();
                })
                .catch(error => {
                    console.log(error.response);
                });
        }
    }

    render() {
        const selectedIds = (this.props.selectedContractGroups || []).map(d => String(d.id));

        const contactGroupsToSelectFiltered = (this.state.contactGroupsToSelect || []).filter(
            d => !selectedIds.includes(String(d.id))
        );

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputText label={'Team'} name={'team'} value={this.props.teamName} readOnly={true} />
                            <InputSelect
                                label={'Groep'}
                                size={'col-sm-6'}
                                name={'contactGroupId'}
                                options={contactGroupsToSelectFiltered}
                                optionName={'name'}
                                value={this.state.contactGroupId}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.contactGroupId}
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
        selectedContractGroups: state.teamDetails.contactGroups,
    };
};

const mapDispatchToProps = dispatch => ({
    newTeamContactGroup: teamContactGroup => {
        dispatch(newTeamContactGroup(teamContactGroup));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamDetailsContactGroupsNew);
