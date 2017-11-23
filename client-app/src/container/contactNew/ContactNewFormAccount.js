import React, {Component} from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import moment from 'moment';
import validator from 'validator';

import AccountAPI from '../../api/AccountAPI';
import InputText from '../../components/form/InputText';
import InputSelect from '../../components/form/InputSelect';
import InputCheckbox from '../../components/form/InputCheckbox';
import InputDate from '../../components/form/InputDate';
import ButtonText from '../../components/button/ButtonText';
import PanelFooter from "../../components/panel/PanelFooter";

class ContactNewFormAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            account: {
                id: '',
                number: '',
                createdAt: '',
                name: '',
                chamberOfCommerceNumber: '',
                vatNumber: '',
                industryId: '',
                statusId: '',
                memberSince: '',
                memberUntil: '',
                typeId: '',
                website: '',
                iban: '',
                squareMeters: '',
                newsletter: false,
            },
            errors: {
                name: false,
                statusId: false,
            },
        }
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            account: {
                ...this.state.account,
                [name]: value
            },
        });
    };

    handleChangeMemberSince = (date) => {
        const value = moment(date).format('Y-MM-DD');

        this.setState({
            ...this.state,
            person: {
                ...this.state.person,
                memberSince: value
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { account }  = this.state;

        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty(account.name)){
            errors.name = true;
            hasErrors = true;
        };

        if(validator.isEmpty(account.statusId)){
            errors.statusId = true;
            hasErrors = true;
        };

        this.setState({ ...this.state, errors: errors })

        !hasErrors &&
            AccountAPI.newAccount(account).then((payload) => {
                hashHistory.push(`/contact/${payload.id}`);
            });
    };

    render() {
        const { typeId, statusId, name, chamberOfCommerceNumber, vatNumber, industryId, memberSince, newsletter, website, iban, squareMeters } = this.state.account;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputText
                        label={"Klantnummer"}
                        name={"number"}
                        value={''}
                        readOnly={ true }
                    />
                    <InputText
                        label={"Gemaakt op"}
                        name={"createdAt"}
                        value={ moment().format('DD-MM-Y') }
                        readOnly={ true }
                    />
                </div>

                <div className="row">
                    <InputText
                        label="Naam"
                        name={"name"}
                        value={name}
                        onChangeAction={this.handleInputChange}
                        required={"required"}
                        error={this.state.errors.name}
                    />
                    <InputSelect
                        label={"Status"}
                        size={"col-sm-6"}
                        name={"statusId"}
                        options={this.props.contactStatuses}
                        value={statusId}
                        onChangeAction={this.handleInputChange}
                        required={"required"}
                        error={this.state.errors.statusId}
                    />
                </div>

                <div className="row">
                    <InputText
                        label="Kvk"
                        size={"col-sm-6"}
                        name="chamberOfCommerceNumber"
                        value={chamberOfCommerceNumber}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputDate
                        label={"Lid sinds"}
                        name="memberSince"
                        value={ memberSince && moment(memberSince).format('DD-MM-Y') }
                        onChangeAction={this.handleChangeMemberSince}
                    />
                </div>

                <div className="row">
                    <InputText
                        label="Btw nummer"
                        name="vatNumber"
                        value={vatNumber}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        label={"Opzegdatum"}
                        name={"memberUntil"}
                        value={ '' }
                        readOnly={true}
                    />
                </div>

                <div className="row">
                    <InputText
                        label="Iban"
                        name="iban"
                        value={iban}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        label={"Website"}
                        name={"website"}
                        value={website}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputSelect
                        label={"Industrie"}
                        size={"col-sm-6"}
                        name={"industryId"}
                        options={this.props.industries}
                        value={industryId}
                        onChangeAction={this.handleInputChange}
                        readOnly={true}
                    />
                    <InputSelect
                        label={"Soort contact"}
                        size={"col-sm-6"}
                        name={"typeId"}
                        options={this.props.accountTypes}
                        value={typeId}
                        onChangeAction={this.handleInputChange}
                        readOnly={true}
                    />
                </div>

                <div className="row">
                    <InputCheckbox
                        label={"Nieuwsbrief"}
                        name={"newsletter"}
                        checked={newsletter}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        label="Oppervlakte"
                        name="squareMeters"
                        value={squareMeters}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <PanelFooter>
                    <div className="pull-right btn-group" role="group">
                        <ButtonText buttonClassName={"btn-default"} buttonText={"Sluiten"} onClickAction={this.props.switchToView}/>
                        <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit}/>
                    </div>
                </PanelFooter>
            </form>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        accountTypes: state.systemData.accountTypes,
        contactStatuses: state.systemData.contactStatuses,
        industries: state.systemData.industries,
    };
};

export default connect(mapStateToProps)(ContactNewFormAccount);
