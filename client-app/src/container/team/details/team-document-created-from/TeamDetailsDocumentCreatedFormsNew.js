import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import TeamDetailsAPI from '../../../../api/team/TeamDetailsAPI';
import { newTeamDocumentCreatedFrom } from '../../../../actions/team/TeamDetailsActions';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

class TeamDetailsDocumentCreatedFormsNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            documentCreatedFromId: '',
            errors: {
                documentCreatedFromId: false,
                hasErrors: true,
            },
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;

        this.setState({ documentCreatedFromId: value });
    }

    componentDidMount() {}

    handleSubmit(event) {
        event.preventDefault();

        const teamDocumentCreatedFrom = {
            teamId: this.props.teamId,
            documentCreatedFromId: this.state.documentCreatedFromId,
        };

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(teamDocumentCreatedFrom.documentCreatedFromId)) {
            errors.documentCreatedFromId = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        if (!hasErrors) {
            TeamDetailsAPI.newTeamDocumentCreatedFrom(teamDocumentCreatedFrom)
                .then(payload => {
                    this.props.newTeamDocumentCreatedFrom(payload.data.data);
                    this.props.toggleShowNew();
                })
                .catch(error => {
                    console.log(error.response);
                });
        }
    }

    render() {
        const selectedIds = (this.props.selectedDocumentCreatedFroms || []).map(d => String(d.id));

        const documentCreatedFromsToSelectFiltered = (this.props.documentCreatedFromsToSelect || []).filter(
            d => !selectedIds.includes(String(d.id))
        );

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputText label={'Team'} name={'team'} value={this.props.teamName} readOnly={true} />
                            <InputSelect
                                label={'Document gemaakt vanuit'}
                                size={'col-sm-6'}
                                name={'documentCreatedFromId'}
                                options={documentCreatedFromsToSelectFiltered}
                                optionName={'name'}
                                value={this.state.documentCreatedFromId}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.documentCreatedFromId}
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
        documentCreatedFromsToSelect: state.systemData.documentCreatedFroms,
        selectedDocumentCreatedFroms: state.teamDetails.documentCreatedFroms,
    };
};

const mapDispatchToProps = dispatch => ({
    newTeamDocumentCreatedFrom: teamDocumentCreatedFrom => {
        dispatch(newTeamDocumentCreatedFrom(teamDocumentCreatedFrom));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamDetailsDocumentCreatedFormsNew);
