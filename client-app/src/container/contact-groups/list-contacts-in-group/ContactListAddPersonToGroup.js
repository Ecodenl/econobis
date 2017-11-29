import React, { Component } from 'react';
import { connect } from 'react-redux';

import contactAPI from '../../../api/ContactsAPI';
import Modal from '../../../components/modal/Modal';

class ContactListAddPersonToGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            people: [],
            personId: '',
        };
    };

    componentDidMount() {
        contactAPI.getPerson().then(payload => {
            this.setState({
                ...this.state,
                people: payload,
            })
        })
    };

    handleInputChange = event => {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            [name]: value
        });
    };


    render() {
        return (
            <Modal
                buttonConfirmText="Toevoegen"
                closeModal={this.props.closeModalAddToGroup}
                confirmAction={this.props.addPersonToGroup(this.state.personId ,2)}
                title="Contactpersoon toevoegen"
            >
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-sm-6">Voeg bestaand contactpersoon toe:</div>
                        <div className="col-sm-6">
                            <select className="form-control input-sm" name="personId" value={this.state.personId} onChange={this.handleInputChange}>
                                <option value=''></option>
                                {this.state.people.map((option) => {
                                    return <option key={option.id} value={option.id}>{option.fullName}</option>
                                })}
                            </select>
                        </div>
                    </div>
                </form>
            </Modal>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        id: state.contactDetails.id,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchContactDetails: (id) => {
        dispatch(fetchContactDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactListAddPersonToGroup);
