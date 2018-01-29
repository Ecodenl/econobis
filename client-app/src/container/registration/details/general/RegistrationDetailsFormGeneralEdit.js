import React, {Component} from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import moment from 'moment';
moment.locale('nl');

import RegistrationDetailsAPI from '../../../../api/registration/RegistrationDetailsAPI';
import { fetchRegistrationDetails } from '../../../../actions/registration/RegistrationDetailsActions';
import InputText from '../../../../components/form/InputText';
import InputSelect from '../../../../components/form/InputSelect';
import InputMultiSelect from '../../../../components/form/InputMultiSelect';
import InputCheckbox from '../../../../components/form/InputCheckbox';
import ButtonText from '../../../../components/button/ButtonText';

class RegistrationDetailsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        const { id, address = {}, reasons, createdAt, campaign, sources, status} = props.registrationDetails;

        this.state = {
            registration: {
                id,
                address,
                buildYear: address.buildYear,
                buildingTypeId: address.buildingTypeId,
                createdAt: createdAt ? createdAt.date : '',
                owner: false,
                statusId: status && status.id,
                sourceIds: sources && sources.map((source) => source.id).join(','),
                campaignId: campaign && campaign.id,
                registrationReasonIds: reasons && reasons.map((reason) => reason.id).join(','),
            },
        }
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            registration: {
                ...this.state.registration,
                [name]: value
            },
        });
    };

    handleSourceIds = (selectedOption) => {
        this.setState({
            ...this.state,
            registration: {
                ...this.state.registration,
                sourceIds: selectedOption
            },
        });
    };

    handleRegistrationReasonsIds = (selectedOption) => {
        this.setState({
            ...this.state,
            registration: {
                ...this.state.registration,
                registrationReasonIds: selectedOption
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { registration }  = this.state;

        if(registration.registrationReasonIds.length > 0){
            registration.registrationReasonIds = registration.registrationReasonIds.split(',');
        }

        if(registration.sourceIds.length > 0){
            registration.sourceIds = registration.sourceIds.split(',');
        }

        RegistrationDetailsAPI.updateRegistration(registration).then(() => {
            this.props.fetchRegistrationDetails(registration.id);
            this.props.switchToView();
        });
    };

    render() {
        const { address, buildYear, buildingTypeId, createdAt, owner, statusId, sourceIds, campaignId, registrationReasonIds } = this.state.registration;

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
                        label="Aanmeld datum"
                        name="registration"
                        value={ moment(createdAt.date).format('DD-MM-Y') }
                        readOnly
                    />
                    <InputSelect
                        label={"Status"}
                        size={"col-sm-6"}
                        name="statusId"
                        value={statusId}
                        options={this.props.registrationStatuses}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputMultiSelect
                        label="Aanmeldingsbron"
                        name="sourceIds"
                        value={sourceIds}
                        options={this.props.registrationSources}
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
                        name="registrationReasonIds"
                        value={registrationReasonIds}
                        options={this.props.registrationReasons}
                        onChangeAction={this.handleRegistrationReasonsIds}
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
        registrationDetails: state.registrationDetails,
        registrationStatuses: state.systemData.registrationStatuses,
        registrationSources: state.systemData.registrationSources,
        registrationReasons: state.systemData.registrationReasons,
        campaigns: state.systemData.campaigns,
        buildingTypes: state.systemData.buildingTypes,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchRegistrationDetails: (id) => {
        dispatch(fetchRegistrationDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationDetailsFormGeneralEdit);
