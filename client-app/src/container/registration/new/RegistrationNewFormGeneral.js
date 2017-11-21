import React, {Component} from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

//import UserAPI from '../../../api/UserAPI';
import InputText from '../../../components/form/InputText';
import InputSelect from '../../../components/form/InputSelect';
import InputDate from '../../../components/form/InputDate';
import ButtonText from '../../../components/button/ButtonText';

class RegistrationNewFormGeneral extends Component {
    constructor(props) {
        super(props);

        this.state = {
            registration: {
                id: '',
                contactId: props.contactId,
                buildYear: '',
                buildingType: '',
                ownerId: '',
                registration: '',
                statusId: '',
                sourceId: '',
                campaignId: '',
                importantId: '',
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

    handleSubmit = event => {
        event.preventDefault();

        const { registration }  = this.state;

        RegistrationAPI.newRegistration(registration).then((payload) => {
            hashHistory.push(`/aanmelding/${payload.id}`);
        });

    };

    render() {
        const { contactId, buildYear, buildingType, ownerId, registration, statusId, sourceId, campaignId, importantId  } = this.state.registration;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputText
                        label="Contact"
                        name={"contactId"}
                        value={contactId}
                        readOnly={true}
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
                    <InputText
                        label={"Woningtype"}
                        name={"buildingType"}
                        value={buildingType}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        label={"Eigendom"}
                        name="ownerId"
                        value={ownerId}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputDate
                        label="Aanmeld datum"
                        name="registration"
                        value={registration}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        label={"Status"}
                        size={"col-sm-6"}
                        name="statusId"
                        value={statusId}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputText
                        label="Aanmeldingsbron"
                        name="sourceId"
                        value={sourceId}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        label="Campagne"
                        name="campaignId"
                        value={campaignId}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputText
                        label="Wat is belangrijk"
                        name="importantId"
                        value={importantId}
                        onChangeAction={this.handleInputChange}
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
        contactStatuses: state.systemData.contactStatuses,
    };
};

export default connect(mapStateToProps)(RegistrationNewFormGeneral);
