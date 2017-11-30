import React, {Component} from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import moment from 'moment';
moment.locale('nl');

import RegistrationDetailsAPI from '../../../api/registration/RegistrationDetailsAPI';
import InputText from '../../../components/form/InputText';
import InputSelect from '../../../components/form/InputSelect';
import InputMultiSelect from '../../../components/form/InputMultiSelect';
import InputCheckbox from '../../../components/form/InputCheckbox';
import ButtonText from '../../../components/button/ButtonText';

class RegistrationNewFormGeneral extends Component {
    constructor(props) {
        super(props);

        this.state = {
            registration: {
                id: '',
                addressId: props.addressId,
                buildYear: '',
                buildingTypeId: '',
                owner: false,
                statusId: '',
                sourceIds: '',
                campaignId: '',
                registrationReasonIds: '',
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

        RegistrationDetailsAPI.newRegistration(registration).then((payload) => {
            console.log(payload);
            hashHistory.push(`/aanmelding/${payload.id}`);
        });

    };

    render() {
        const { addressId, buildYear, buildingTypeId, owner, statusId, sourceIds, campaignId, registrationReasonIds } = this.state.registration;
        const { addresses = [] } = this.props.contactDetails;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="form-group col-sm-6">
                        <label htmlFor="addressId" className="col-sm-6">Adres</label>
                        <div className='col-sm-6'>
                            <select className="form-control input-sm" id="addressId" name="addressId" value={addressId} onChange={this.handleInputChange}>
                                { addresses.map((address, i) => {
                                    return <option key={i} value={ address.id }>{ address.street + ' ' + address.number }</option>
                                }) }
                            </select>
                        </div>
                    </div>
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
                        value={ moment().format('LL') }
                        readOnly={true}
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
                        <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit}/>
                    </div>
                </div>
            </form>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        registrationStatuses: state.systemData.registrationStatuses,
        registrationSources: state.systemData.registrationSources,
        registrationReasons: state.systemData.registrationReasons,
        campaigns: state.systemData.campaigns,
        buildingTypes: state.systemData.buildingTypes,
        contactDetails: state.contactDetails,
    };
};

export default connect(mapStateToProps, null)(RegistrationNewFormGeneral);
