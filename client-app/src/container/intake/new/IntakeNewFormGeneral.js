import React, {Component} from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import moment from 'moment';
moment.locale('nl');

import IntakeDetailsAPI from '../../../api/intake/IntakeDetailsAPI';

import InputSelect from '../../../components/form/InputSelect';
import InputMultiSelect from '../../../components/form/InputMultiSelect';
import ButtonText from '../../../components/button/ButtonText';
import InputText from "../../../components/form/InputText";

class IntakeNewFormGeneral extends Component {
    constructor(props) {
        super(props);

        this.state = {
            intake: {
                contactId: props.contactId,
                addressId: props.addressId,
                campaignId: '',
                statusId: '1',
                sourceIds: '',
                intakeReasonIds: '',
                note: ''
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

        const {intake} = this.state;

        if (intake.intakeReasonIds.length > 0) {
            intake.intakeReasonIds = intake.intakeReasonIds.split(',');
        }

        if (intake.sourceIds.length > 0) {
            intake.sourceIds = intake.sourceIds.split(',');
        }

        IntakeDetailsAPI.newIntake(intake).then((payload) => {
            hashHistory.push(`/intake/${payload.data.id}`);
        });

    };

    render() {
        const {addressId, statusId, sourceIds, campaignId, intakeReasonIds, note} = this.state.intake;
        const {addresses = [], fullName} = this.props.contactDetails;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputText
                        name={'contact'}
                        label={'Contact'}
                        value={fullName}
                        readOnly={true}
                    />
                    <div className="form-group col-sm-6">
                        <label htmlFor="addressId" className="col-sm-6">Adres</label>
                        <div className='col-sm-6'>
                            <select className="form-control input-sm" id="addressId" name="addressId" value={addressId}
                                    onChange={this.handleInputChange}>
                                {addresses.map((address, i) => {
                                    return <option key={i}
                                                   value={address.id}>{address.street + ' ' + address.number}</option>
                                })}
                            </select>
                        </div>
                    </div>
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
                                <label htmlFor="note" className="col-sm-12">Opmerking van bewoner</label>
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
                        <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit}/>
                    </div>
                </div>
            </form>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        intakeStatuses: state.systemData.intakeStatuses,
        intakeSources: state.systemData.intakeSources,
        intakeReasons: state.systemData.intakeReasons,
        campaigns: state.systemData.campaigns,
        buildingTypes: state.systemData.buildingTypes,
        contactDetails: state.contactDetails,
    };
};

export default connect(mapStateToProps, null)(IntakeNewFormGeneral);
