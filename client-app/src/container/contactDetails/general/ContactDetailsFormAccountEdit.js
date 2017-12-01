import React, {Component} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import validator from 'validator';

import { updateAccount } from '../../../actions/ContactDetailsActions';
import AccountAPI from '../../../api/AccountAPI';
import InputText from '../../../components/form/InputText';
import InputSelect from '../../../components/form/InputSelect';
import InputCheckbox from '../../../components/form/InputCheckbox';
import InputDate from '../../../components/form/InputDate';
import ButtonText from '../../../components/button/ButtonText';
import PanelFooter from "../../../components/panel/PanelFooter";

class ContactDetailsFormAccountEdit extends Component {
    constructor(props) {
        super(props);

        const { number, account, status, iban, createdAt, memberSince = {}, memberUntil = {}, newsletter } = props.contactDetails;

        this.state = {
            account: {
                id: account.id,
                number: number,
                createdAt: createdAt.date,
                name: account.name,
                chamberOfCommerceNumber: account.chamberOfCommerceNumber,
                vatNumber: account.vatNumber,
                industryId: account.industryId ? account.industryId : '',
                statusId: status.id,
                memberSince: memberSince ? moment(memberSince.date).format('Y-MM-DD') : '',
                memberUntil: memberUntil ? moment(memberUntil.date).format('Y-MM-DD') : '',
                typeId: account.type ? account.type.id : '',
                website: account.website,
                iban: iban,
                squareMeters: account.squareMeters,
                newsletter: newsletter,
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
        const formattedDate = (date ? moment(date).format('Y-MM-DD') : '');

        this.setState({
            ...this.state,
            account: {
                ...this.state.account,
                memberSince: formattedDate
            },
        });
    };

    handleChangeMemberUntilDate = (date) => {
        const formattedDate = (date ? moment(date).format('Y-MM-DD') : '');

        this.setState({
            ...this.state,
            account: {
                ...this.state.account,
                memberUntil: formattedDate
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

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
            AccountAPI.updateAccount(account).then((payload) => {
                this.props.updateAccount(payload);
                this.props.switchToView();
            });
    };

    render() {
        const { number, typeId, statusId, name, chamberOfCommerceNumber, vatNumber, industryId, createdAt, memberSince, memberUntil, newsletter, website, iban, squareMeters } = this.state.account;

        return (
            <form className="form-horizontal col-md-12" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputText
                        label={"Klantnummer"}
                        name={"number"}
                        value={number}
                        readOnly={ true }
                    />
                    <InputText
                        label={"Gemaakt op"}
                        name={"createdAt"}
                        value={ moment(createdAt).format('DD-MM-Y')  }
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
                        value={ memberSince }
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
                    <InputDate
                        label={"Opzegdatum"}
                        size={"col-sm-6"}
                        name={"memberUntil"}
                        value={ memberUntil }
                        onChangeAction={this.handleChangeMemberUntilDate}
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
                        <ButtonText buttonClassName={"btn-default"} buttonText={"Annuleren"} onClickAction={this.props.switchToView}/>
                        <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit}/>
                    </div>
                </PanelFooter>
            </form>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        contactDetails: state.contactDetails,
        accountTypes: state.systemData.accountTypes,
        contactStatuses: state.systemData.contactStatuses,
        industries: state.systemData.industries,
    };
};

const mapDispatchToProps = dispatch => ({
    updateAccount: (id) => {
        dispatch(updateAccount(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailsFormAccountEdit);
