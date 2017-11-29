import React, {Component} from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import validator from 'validator';
import moment from 'moment';

import ContactGroupAPI from '../../../api/ContactGroupAPI';
import InputText from '../../../components/form/InputText';
import InputSelect from '../../../components/form/InputSelect';
import InputDate from '../../../components/form/InputDate';
import InputCheckbox from '../../../components/form/InputCheckbox';
import ButtonText from '../../../components/button/ButtonText';

class ContactGroupNewForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contactGroup: {
                id: '',
                name: '',
                description: '',
                closed: false,
                responsibleUserId: '',
                dateStarted: '',
                dateFinished: '',
            },
            errors: {
                name: false,
            },
        }
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            contactGroup: {
                ...this.state.contactGroup,
                [name]: value
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { contactGroup }  = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty(contactGroup.name)){
            errors.name = true;
            hasErrors = true;
        };

        this.setState({ ...this.state, errors: errors })

        // If no errors send form
        !hasErrors &&
            ContactGroupAPI.newContactGroup(contactGroup).then((payload) => {
                hashHistory.push("/contact-groepen");
            });
    };

    render() {
        const { name, description, responsibleUserId, closed, dateStarted, dateFinished } = this.state.contactGroup;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputText
                        label="Naam"
                        name={"name"}
                        value={name}
                        onChangeAction={this.handleInputChange}
                        required={"required"}
                        error={this.state.errors.name}
                    />
                </div>

                <div className="row">
                    <div className="form-group col-sm-12">
                        <label htmlFor="description" className="col-sm-3">Omschrijving</label>
                        <div className="col-sm-9">
                            <textarea name="description" value={description} onChange={this.handleInputChange} className="form-control input-sm" />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <InputSelect
                        label="Verantwoordelijke"
                        name="responsibleUserId"
                        options={[{id: 1, name: 'test'}, {id: 2, name: 'test 2'}]}
                        value={responsibleUserId}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputCheckbox
                        label={"Gesloten"}
                        size={"col-sm-6"}
                        name="closed"
                        checked={closed}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputDate
                        label="Start datum"
                        size={"col-sm-6"}
                        name="dateStarted"
                        value={dateStarted}
                        onChangeAction={this.handleInputChange}

                    />
                    <InputDate
                        label="Datum gereed"
                        size={"col-sm-6"}
                        name="dateFinished"
                        value={dateFinished}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputText
                        label={"Gemaakt op"}
                        name={"createdAt"}
                        value={ moment().format('DD-MM-Y') }
                        readOnly={true}
                    />
                    <InputText
                        label={"Gemaakt door"}
                        name={"createdBy"}
                        value={ this.props.meDetails.fullName}
                        readOnly={true}
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
        meDetails: state.meDetails,
    };
};

export default connect(mapStateToProps)(ContactGroupNewForm);
