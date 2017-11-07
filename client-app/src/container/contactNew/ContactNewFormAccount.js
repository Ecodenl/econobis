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
                industrieId: '',
                statusId: '',
                memberSince: '',
                memberUntil: '',
                typeId: '',
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

        this.setState({ ...this.state,errors: errors })

        !hasErrors &&
            AccountAPI.newAccount(account).then((payload) => {
                hashHistory.push(`/contact/${payload.id}`);
            });
    };

    render() {
        const { typeId, statusId, name, chamberOfCommerceNumber, vatNumber, industryId, memberSince, newsletter } = this.state.account;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputText
                        label={"Klantnummer"}
                        name={"number"}
                        readOnly={ true }
                        value={''}
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
                        label="Organisatie"
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
                    <InputSelect
                        label={"Industrie"}
                        size={"col-sm-6"}
                        name={"industryId"}
                        options={this.props.personTypes}
                        value={industryId}
                        onChangeAction={this.handleInputChange}
                        readOnly={true}
                    />
                    <InputSelect
                        label={"Soort contact"}
                        size={"col-sm-6"}
                        name={"typeId"}
                        options={this.props.personTypes}
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
        personTypes: state.systemData.personTypes,
        contactStatuses: state.systemData.contactStatuses,
    };
};

export default connect(mapStateToProps)(ContactNewFormAccount);
