import React, {Component} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');

import IntakeDetailsAPI from '../../../../api/intake/IntakeDetailsAPI';
import CampaignsAPI from '../../../../api/campaign/CampaignsAPI';
import { fetchIntakeDetails } from '../../../../actions/intake/IntakeDetailsActions';
import InputText from '../../../../components/form/InputText';
import InputSelect from '../../../../components/form/InputSelect';
import InputMultiSelect from '../../../../components/form/InputMultiSelect';
import ButtonText from '../../../../components/button/ButtonText';

class IntakeDetailsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        const { id, contact, address = {}, reasons, campaign, sources, status, note} = props.intakeDetails;

        this.state = {
            campaigns: [],
            intake: {
                id,
                contact: contact.fullName,
                address: address ? address : '',
                campaignId: campaign && campaign.id,
                statusId: status ? status.id : '',
                sourceIds: sources && sources.map((source) => source.id).join(','),
                intakeReasonIds: reasons && reasons.map((reason) => reason.id).join(','),
                note: note && note,
            },
        }
    };

    componentWillMount() {
        CampaignsAPI.peekCampaigns().then((payload) => {
            this.setState({
                campaigns: payload,
            });
        });
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
        const { contact, address, statusId, sourceIds, campaignId, intakeReasonIds, note } = this.state.intake;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputText
                        label={"Contact"}
                        name={'contact'}
                        value={contact}
                        readOnly
                    />
                    <InputText
                        label={"Adres"}
                        name={'address'}
                        value={address && address.street + ' ' + address.number}
                        readOnly
                    />
                </div>

                <div className="row">
                    <InputSelect
                        label="Campagne"
                        name="campaignId"
                        value={campaignId}
                        options={this.props.campaigns}
                        onChangeAction={this.handleInputChange}
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
                        label="Aanmeldingsbron"
                        name="sourceIds"
                        value={sourceIds}
                        options={this.props.intakeSources}
                        onChangeAction={this.handleSourceIds}
                    />
                    <InputMultiSelect
                        label="Wat is belangrijk"
                        name="intakeReasonIds"
                        value={intakeReasonIds}
                        options={this.props.intakeReasons}
                        onChangeAction={this.handleIntakeReasonsIds}
                    />
                </div>

                <div className="row">
                    <div className="form-group col-sm-12">
                        <div className="row">
                            <div className="col-sm-3">
                                <label htmlFor="note" className="col-sm-12">Opmerkingen bewoner</label>
                            </div>
                            <div className="col-sm-8">
                                <textarea name='note' value={note} onChange={this.handleInputChange}
                                          className="form-control input-sm"/>
                            </div>
                        </div>
                    </div>
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
