import React, {Component} from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import moment from 'moment';
moment.locale('nl');

import IntakeDetailsAPI from '../../../../api/intake/IntakeDetailsAPI';
import { fetchIntakeDetails } from '../../../../actions/intake/IntakeDetailsActions';
import InputText from '../../../../components/form/InputText';
import InputSelect from '../../../../components/form/InputSelect';
import InputMultiSelect from '../../../../components/form/InputMultiSelect';
import InputCheckbox from '../../../../components/form/InputCheckbox';
import ButtonText from '../../../../components/button/ButtonText';

class IntakeDetailsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        const { id, address = {}, reasons, createdAt, campaign, sources, status} = props.intakeDetails;

        this.state = {
            intake: {
                id,
                address,
                buildYear: address.buildYear,
                buildingTypeId: address.buildingTypeId,
                createdAt: createdAt ? createdAt.date : '',
                owner: false,
                statusId: status && status.id,
                sourceIds: sources && sources.map((source) => source.id).join(','),
                campaignId: campaign && campaign.id,
                intakeReasonIds: reasons && reasons.map((reason) => reason.id).join(','),
            },
        }
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            intake: {
                ...this.state.intake,
                [name]: value
            },
        });
    };

    handleSourceIds = (selectedOption) => {
        this.setState({
            ...this.state,
            intake: {
                ...this.state.intake,
                sourceIds: selectedOption
            },
        });
    };

    handleIntakeReasonsIds = (selectedOption) => {
        this.setState({
            ...this.state,
            intake: {
                ...this.state.intake,
                intakeReasonIds: selectedOption
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { intake }  = this.state;

        if(intake.intakeReasonIds.length > 0){
            intake.intakeReasonIds = intake.intakeReasonIds.split(',');
        }

        if(intake.sourceIds.length > 0){
            intake.sourceIds = intake.sourceIds.split(',');
        }

        IntakeDetailsAPI.updateIntake(intake).then(() => {
            this.props.fetchIntakeDetails(intake.id);
            this.props.switchToView();
        });
    };

    render() {
        const { address, buildYear, buildingTypeId, createdAt, owner, statusId, sourceIds, campaignId, intakeReasonIds } = this.state.intake;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputText
                        label={"Adres"}
                        name={'address'}
                        value={address && address.street + ' ' + address.number}
                        onChangeAction={()=>{}}
                        readOnly
                    />
                    <InputText
                        type={"number"}
                        label={"Bouwjaar"}
                        name={"buildYear"}
                        value={buildYear}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputSelect
                        label={"Woningtype"}
                        name={"buildingTypeId"}
                        value={buildingTypeId}
                        options={this.props.buildingTypes}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputCheckbox
                        label={"Eigendom"}
                        name="owner"
                        checked={owner}
                        onChangeAction={this.handleInputChange}
                        id={"owner"}
                        labelCheckbox={'Ja'}
                    />
                </div>

                <div className="row">
                    <InputText
                        label="Intake datum"
                        name="intake"
                        value={ moment(createdAt.date).format('DD-MM-Y') }
                        readOnly
                    />
                    <InputSelect
                        label={"Status"}
                        size={"col-sm-6"}
                        name="statusId"
                        value={statusId}
                        options={this.props.intakeStatuses}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputMultiSelect
                        label="Intakesbron"
                        name="sourceIds"
                        value={sourceIds}
                        options={this.props.intakeSources}
                        onChangeAction={this.handleSourceIds}
                    />
                    <InputSelect
                        label="Campagne"
                        name="campaignId"
                        value={campaignId}
                        options={this.props.campaigns}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputMultiSelect
                        label="Wat is belangrijk"
                        name="intakeReasonIds"
                        value={intakeReasonIds}
                        options={this.props.intakeReasons}
                        onChangeAction={this.handleIntakeReasonsIds}
                    />
                </div>

                <div className="panel-footer">
                    <div className="pull-right btn-group" role="group">
                        <ButtonText buttonClassName={"btn-default"} buttonText={"Sluiten"} onClickAction={this.props.switchToView}/>
                        <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit}/>
                    </div>
                </div>
            </form>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        intakeDetails: state.intakeDetails,
        intakeStatuses: state.systemData.intakeStatuses,
        intakeSources: state.systemData.intakeSources,
        intakeReasons: state.systemData.intakeReasons,
        campaigns: state.systemData.campaigns,
        buildingTypes: state.systemData.buildingTypes,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchIntakeDetails: (id) => {
        dispatch(fetchIntakeDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(IntakeDetailsFormGeneralEdit);
