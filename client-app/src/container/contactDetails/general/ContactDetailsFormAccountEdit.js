import React, {Component} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import * as actions from '../../../actions/ContactDetailsActions';
import InputText from '../../../components/form/InputText';
import InputSelect from '../../../components/form/InputSelect';
import InputDate from '../../../components/form/InputDate';
import ButtonText from '../../../components/button/ButtonText';

class ContactDetailsFormAccountEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            number: props.contactDetails.number,
            createdAt: props.contactDetails.createdAt.date,
            statusCode: '',
            name: props.contactDetails.account.name,
            memberSince: '',
            cancellationDate: '',
            kindContact: '',
            organisation: '',
        }
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleChangeMemberSince = (date) => {
        const value = moment(date).format('Y-MM-DD');

        this.setState({
            memberSince: value
        });
    };

    handleChangeCancellationDate = (date) => {
        const value = moment(date).format('Y-MM-DD');

        this.setState({
            cancellationDate: value
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        let updatedContactDetails = {
            id: this.props.id,
            account: {
                name: this.state.name,
            },
        };

        this.props.dispatch(actions.updateAccount(updatedContactDetails));

        this.props.switchToView();
    };

    render() {
        const {number, createdAt, statusCode, name, memberSince, cancellationDate, kindContact, organisation} = this.state;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputText
                        label={"Klantnummer"}
                        id={"contact_no"}
                        name={"number"}
                        readOnly={ true }
                        value={number}
                    />
                    <InputText
                        label={"Gemaakt op"}
                        id={"created_at"}
                        name={"createdAt"}
                        value={ moment(createdAt).format('DD-MM-Y') }
                        readOnly={ true }
                    />
                </div>

                <div className="row">
                    <div className="col-sm-6" />
                    <InputSelect
                        label={"Status"}
                        id={"status"}
                        size={"col-sm-6"}
                        name={"statusCode"}
                        options={this.props.statuses}
                        value={statusCode}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputText
                        label="Bedrijfsnaam"
                        id="name"
                        size={"col-sm-6"}
                        name="name"
                        value={name}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputDate
                        label={"Lid sinds"}
                        id={"member_since"}
                        name="memberSince"
                        value={ memberSince && moment(memberSince).format('DD-MM-Y') }
                        onChangeAction={this.handleChangeMemberSince}
                    />
                </div>

                <div className="row">
                    <div className="col-sm-6" />
                    <InputDate
                        label={"Opzegdatum"}
                        id={"cancellation_date"}
                        name={"cancellationDate"}
                        value={ cancellationDate && moment(cancellationDate).format('DD-MM-Y') }
                        onChangeAction={this.handleChangeCancellationDate}
                    />
                </div>

                <div className="row">
                    <div className="col-sm-6" />
                    <InputSelect
                        label={"Soort contact"}
                        id={"kind_contact"}
                        name={"kindContact"}
                        options={ [{id: 1, name: 'Nog geen optie'}, {id: 2, name: 'Nog in te vullen'} ] }
                        value={kindContact}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputSelect
                        label={"Organisatie"}
                        id={"organisation"}
                        name={"organisation"}
                        options={ [{id: 1, name: 'Nog geen optie'}, {id: 2, name: 'Nog in te vullen'} ] }
                        value={organisation}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="panel-footer">
                    <div className="pull-right btn-group" role="group">
                        <ButtonText buttonClassName={"btn-default"} buttonText={"Annuleren"} onClickAction={this.props.switchToView}/>
                        <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit}/>
                    </div>
                </div>
            </form>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        contactDetails: state.contactDetails,
        statuses: state.statuses,
        types: state.types,
        lastNamePrefixes: state.systemData.lastNamePrefixes,
    };
};

export default connect(mapStateToProps)(ContactDetailsFormAccountEdit);
