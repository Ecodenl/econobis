import React, {Component} from 'react';
import {connect} from 'react-redux';

import contactAPI from '../../../api/contact/ContactsAPI';
import Modal from '../../../components/modal/Modal';
import VirtualizedSelect from 'react-virtualized-select';
import InputSelect from "../../../components/form/InputSelect";
import {hashHistory} from "react-router";

class ContactListEmail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            typeId: 'to',
            sendMethods: [
                {id: 'to', name: 'aan'},
                {id: 'cc', name: 'cc'},
                {id: 'bcc', name: 'bcc'},
            ],
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    };

    sendEmail = () => {
        hashHistory.push(`/email/nieuw/groep/${this.props.groupId}/${this.state.typeId}`);
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            ...this.state,
            typeId: value
        });
    };

    render() {
        return (
            <Modal
                buttonConfirmText="E-mailen"
                closeModal={this.props.closeModalEmail}
                confirmAction={this.sendEmail}
                title={`Contacten in deze groep e-mailen`}

            >
                <div className="row">
                    <div className="col-sm-12">
                        <form className="form-horizontal" onSubmit={this.handleSubmit}>
                            <InputSelect
                                label={"Verzend methode"}
                                size={"col-sm-12"}
                                name={"typeId"}
                                options={this.state.sendMethods}
                                value={this.state.typeId}
                                onChangeAction={this.handleInputChange}
                            />
                        </form>
                    </div>
                </div>
            </Modal>
        );
    }
};

export default ContactListEmail;
