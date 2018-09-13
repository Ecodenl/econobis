import React, {Component} from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import uuid from 'uuid';
import moment from 'moment';
moment.locale('nl');

import { updateWebform } from '../../../../actions/webform/WebformDetailsActions';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import Panel from "../../../../components/panel/Panel";
import PanelBody from "../../../../components/panel/PanelBody";
import InputDate from "../../../../components/form/InputDate";
import InputSelectGroup from "../../../../components/form/InputSelectGroup";

class WebformDetailsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            webform: {
                ...props.webformDetails,
                responsible: props.webformDetails.responsibleUserId ? 'user' + props.webformDetails.responsibleUserId : 'team' + props.webformDetails.responsibleTeamId,
                dateStart: props.webformDetails.dateStart ? props.webformDetails.dateStart.date : '',
                dateEnd: props.webformDetails.dateEnd ? props.webformDetails.dateEnd.date : '',
                apiKeyDate: props.webformDetails.apiKeyDate ? props.webformDetails.apiKeyDate.date : '',
            },
            errors: {
                name: false,
            },
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.refreshKey = this.refreshKey.bind(this);
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            webform: {
                ...this.state.webform,
                [name]: value
            },
        });
    };

    refreshKey() {
        this.setState({
            ...this.state,
            webform: {
                ...this.state.webform,
                apiKey: uuid(),
                apiKeyDate: moment(),
            },
        });
    }

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            webform: {
                ...this.state.webform,
                [name]: value
            },
        });
    };

    handleSubmit(event) {
        event.preventDefault();

        const { webform }  = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty(webform.name)){
            errors.name = true;
            hasErrors = true;
        };

        if(validator.isEmpty(webform.maxRequestsPerMinute.toString())){
            errors.maxRequestsPerMinute = true;
            hasErrors = true;
        };

        if(validator.isEmpty(webform.responsible)){
            errors.responsible = true;
            hasErrors = true;
        };

        if(webform.responsible.search('user') >= 0 ) {
            webform.responsibleUserId = webform.responsible.replace('user', '');
            webform.responsibleTeamId = '';
        };

        if(webform.responsible.search("team") >= 0) {
            webform.responsibleUserId = '';
            webform.responsibleTeamId = webform.responsible.replace('team', '');
        };

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            this.props.updateWebform(webform, this.props.switchToView);
    };

    render() {
        const { name, apiKey, apiKeyDate, maxRequestsPerMinute, dateStart, dateEnd, responsible } = this.state.webform;

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
                            <InputText
                                label="Sleutel"
                                name={"apiKey"}
                                value={apiKey}
                                onChangeAction={this.handleInputChange}
                                readOnly={true}
                            />
                            <span className="glyphicon glyphicon-refresh mybtn-success" style={{top: '5px'}} role="button" onClick={this.refreshKey} title={'Ververs sleutel'} />
                        </div>
                        <div className="row">
                            <InputText
                                label="Aanvragen per minuut"
                                type={"number"}
                                name={"maxRequestsPerMinute"}
                                value={maxRequestsPerMinute}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={this.state.errors.maxRequestsPerMinute}
                            />
                            <InputText
                                label="Datum sleutel"
                                name="apiKeyDate"
                                value={moment(apiKeyDate).format('L')}
                                onChangeAction={() => {}}
                                readOnly={true}
                            />
                        </div>
                        <div className="row">
                            <InputDate
                                label="Startdatum"
                                name="dateStart"
                                value={dateStart}
                                onChangeAction={this.handleInputChangeDate}
                            />
                            <InputDate
                                label="Einddatum"
                                name="dateEnd"
                                value={dateEnd}
                                onChangeAction={this.handleInputChangeDate}
                            />
                        </div>
                        <div className="row">
                           <InputSelectGroup
                                label={"Verantwoordelijke"}
                                size={"col-sm-6"}
                                name={"responsible"}
                                optionsInGroups={[{name: 'user', label: 'Gebruikers', options: this.props.users, optionName: 'fullName'}, {name: 'team', label: 'Team', options: this.props.teams}]}
                                value={responsible}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={this.state.errors.responsible}
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
        webformDetails: state.webformDetails,
        teams: state.systemData.teams,
        users: state.systemData.users,
    };
};

const mapDispatchToProps = dispatch => ({
    updateWebform: (id, switchToView) => {
        dispatch(updateWebform(id, switchToView));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(WebformDetailsFormGeneralEdit);
