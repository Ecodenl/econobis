import React, {Component} from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import TeamDetailsAPI from '../../../../api/team/TeamDetailsAPI';
import { updateTeam } from '../../../../actions/team/TeamDetailsActions';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import Panel from "../../../../components/panel/Panel";
import PanelBody from "../../../../components/panel/PanelBody";

class TeamDetailsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            team: props.teamDetails,
            errors: {
                name: false,
            },
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            team: {
                ...this.state.team,
                [name]: value
            },
        });
    };

    handleSubmit(event) {
        event.preventDefault();

        const { team } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty(team.name)){
            errors.name = true;
            hasErrors = true;
        };

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            this.props.updateTeam(team, this.props.switchToView);
    };

    render() {
        const { name } = this.state.team;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label="Naam"
                                name={"name"}
                                value={name}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={this.state.errors.name}
                            />
                        </div>
                    </PanelBody>

                    <PanelBody>
                        <div className="pull-right btn-group" role="group">
                            <ButtonText buttonClassName={"btn-default"} buttonText={"Sluiten"} onClickAction={this.props.switchToView}/>
                            <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit} type={"submit"} value={"Submit"}/>
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        teamDetails: state.teamDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    updateTeam: (id, switchToView) => {
        dispatch(updateTeam(id, switchToView));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamDetailsFormGeneralEdit);
