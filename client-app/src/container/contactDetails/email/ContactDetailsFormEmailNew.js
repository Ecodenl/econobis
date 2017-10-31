import React, { Component } from 'react';
import { connect } from 'react-redux';

import EmailAddressAPI from '../../../api/EmailAddressAPI';
import { newEmailAddress } from '../../../actions/ContactDetailsActions';
import InputText from '../../../components/form/InputText';
import ButtonText from '../../../components/button/ButtonText';
import InputSelect from "../../../components/form/InputSelect";
import InputCheckbox from "../../../components/form/InputCheckbox";
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

class ContactDetailsFormEmailNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            emailAddress: {
                contactId: this.props.id,
                email: '',
                typeId: '',
                primary: false,
            },
            typeIdError: false,
            emailError: false,
        }
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            emailAddress: {
                ...this.state.emailAddress,
                [name]: value
            },
        });
    };

    processError(fieldName, value) {
        this.setState({
            [fieldName]: value,
        })
    };

    validateForm(fieldNames) {
        fieldNames.map((fieldName) => {
            switch(fieldName) {
                case 'typeId':
                case 'email':
                    this.state.emailAddress[fieldName].length === 0 ?
                        this.processError(fieldName + 'Error', true)
                        :
                        this.processError(fieldName + 'Error', false)
                    break;
                default:
                    break;
            }
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        this.validateForm([
            'typeId',
            'email',
        ]);

        const { emailAddress } = this.state;

        // Temp solution
        setTimeout(() => {
            !this.state.typeIdError && !this.state.emailError &&
                EmailAddressAPI.newEmailAddress(emailAddress).then((payload) => {
                    this.props.newEmailAddress(payload);
                    this.props.toggleShowNew();
                });
        }, 100);
    };

    render() {
        const {email, typeId, primary} = this.state.emailAddress;
        const {emailError, typeIdError } = this.state;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label={"Email"}
                                id={"email"}
                                size={"col-sm-6"}
                                name={"email"}
                                value={email}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={emailError}
                            />

                            <InputSelect
                                label={"Type"}
                                id="type"
                                size={"col-sm-6"}
                                name={"typeId"}
                                options={this.props.emailAddressTypes}
                                value={typeId}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={typeIdError}
                            />
                        </div>

                        <div className="row">
                            <InputCheckbox
                                label={"Primair e-mailadres"}
                                name={"primary"}
                                checked={primary}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        <div className="pull-right btn-group" role="group">
                            <ButtonText buttonClassName={"btn-default"} buttonText={"Sluiten"} onClickAction={this.props.toggleShowNew}/>
                            <ButtonText buttonText={"Toevoegen"} onClickAction={this.handleSubmit} type={"submit"} value={"Submit"}/>
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        emailAddressTypes: state.systemData.emailAddressTypes,
        id: state.contactDetails.id,
    };
};

const mapDispatchToProps = dispatch => ({
    newEmailAddress: (id) => {
        dispatch(newEmailAddress(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailsFormEmailNew);