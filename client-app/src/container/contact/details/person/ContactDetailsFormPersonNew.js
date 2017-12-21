import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router';

import { fetchContactDetails } from '../../../../actions/contact/ContactDetailsActions';
import PersonAPI from '../../../../api/contact/PersonAPI';
import Modal from '../../../../components/modal/Modal';

class ContactDetailsEmailDelete extends Component {
    constructor(props) {
        super(props);

        this.state = {
            peopleNoOrganisation: [],
            personId: '',
        };
    };

    componentDidMount() {
        PersonAPI.getPersonPeek().then(payload => {
            this.setState({
                ...this.state,
                peopleNoOrganisation: payload,
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

    confirmAction = () => {
        //props.deleteEmailAddress(props.id);
        this.props.toggleShowNew();
    };

    handleSubmit = event => {
        event.preventDefault();

        const person  = {
            id: this.state.personId,
            organisationId: this.props.id,
        };

        PersonAPI.updatePerson(person).then((payload) => {
            this.props.fetchContactDetails(this.props.id);
            this.props.toggleShowNew();
        });
    };

    render() {
        return (
            <Modal
                buttonConfirmText="Toevoegen"
                closeModal={this.props.toggleShowNew}
                confirmAction={this.handleSubmit}
                title="Contactpersoon toevoegen"
            >
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-sm-6">Voeg bestaand contactpersoon toe:</div>
                        <div className="col-sm-6">
                            <select className="form-control input-sm" name="personId" value={this.state.personId} onChange={this.handleInputChange}>
                                <option value=''></option>
                                {this.state.peopleNoOrganisation.map((option) => {
                                    return <option key={option.id} value={option.id}>{option.fullName}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">Of maak een <Link to={`/contact/nieuw/persoon/organisatie/${this.props.id}`} className="link-underline">Nieuw</Link> contact persoon aan.</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailsEmailDelete);
