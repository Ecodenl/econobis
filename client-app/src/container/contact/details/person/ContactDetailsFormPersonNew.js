import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router';

import { fetchContactDetails } from '../../../../actions/contact/ContactDetailsActions';
import PersonAPI from '../../../../api/contact/PersonAPI';
import Modal from '../../../../components/modal/Modal';
import InputSelect from "../../../../components/form/InputSelect";
import validator from "validator";
import OccupationAPI from "../../../../api/contact/OccupationAPI";
import moment from "moment/moment";
import InputDate from "../../../../components/form/InputDate";
import InputToggle from "../../../../components/form/InputToggle";

class ContactDetailsFormPersonNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            people: [],
            occupation: {
                personId: '',
                occupationId: '',
                organisationId: props.organisationId,
                startDate: '',
                endDate: '',
                primary: false,
            },
            errors: {
                personId: false,
                occupationId: false,
            },
        };
    };

    componentDidMount() {
        PersonAPI.getPersonPeek().then(payload => {
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
            occupation: {
                ...this.state.occupation,
                [name]: value
            }
        });
    };

    handleStartDate = (date) => {
        const formattedDate = (date ? moment(date).format('Y-MM-DD') : '');

        this.setState({
            ...this.state,
            occupation: {
                ...this.state.occupation,
                startDate: formattedDate
            },
        });
    };

    handleEndDate = (date) => {
        const formattedDate = (date ? moment(date).format('Y-MM-DD') : '');

        this.setState({
            ...this.state,
            occupation: {
                ...this.state.occupation,
                endDate: formattedDate
            },
        });
    };

    confirmAction = () => {
        this.props.toggleShowNew();
    };

    handleSubmit = event => {
        event.preventDefault();

        const {occupation} = this.state;

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(occupation.personId)) {
            errors.personId = true;
            hasErrors = true;
        }

        if (validator.isEmpty(occupation.occupationId)) {
            errors.occupationId = true;
            hasErrors = true;
        }

        this.setState({...this.state, errors: errors});

        // If no errors send form
        !hasErrors &&
        OccupationAPI.newOccupation(occupation).then((payload) => {
            this.props.fetchContactDetails(this.props.contactId);
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
                        <InputSelect
                            label={"Voeg bestaand contactpersoon toe:"}
                            size={"col-sm-12"}
                            name={"personId"}
                            options={this.state.people}
                            optionName={'fullName'}
                            value={this.state.occupation.personId}
                            onChangeAction={this.handleInputChange}
                            required={"required"}
                            error={this.state.errors.personId}

                        />
                    </div>
                    <div className="row">
                        <InputSelect
                            label={"Rol:"}
                            size={"col-sm-12"}
                            name={"occupationId"}
                            options={this.props.occupations}
                            value={this.state.occupation.occupationId}
                            onChangeAction={this.handleInputChange}
                            required={"required"}
                            error={this.state.errors.occupationId}
                        />
                    </div>

                    <div className="row">
                        <InputDate
                            label={"Begin datum:"}
                            size={"col-sm-12"}
                            name={"startDate"}
                            value={this.state.occupation.startDate}
                            onChangeAction={this.handleStartDate}
                        />
                        <InputDate
                            label={"Eind datum:"}
                            size={"col-sm-12"}
                            name={"endDate"}
                            value={this.state.occupation.endDate}
                            onChangeAction={this.handleEndDate}
                        />
                    </div>

                    <div className="row">
                        <InputToggle
                            label={"Primair"}
                            name={"primary"}
                            value={this.state.occupation.primary}
                            onChangeAction={this.handleInputChange}
                        />
                    </div>

                    <div className="row">
                        <div className="col-sm-12">Of maak een <Link to={`/contact/nieuw/persoon/`} className="link-underline">Nieuw</Link> contactpersoon aan.</div>
                    </div>
                </form>
            </Modal>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        organisationId: state.contactDetails.organisation.id,
        contactId: state.contactDetails.id,
        occupations: state.systemData.occupations,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchContactDetails: (id) => {
        dispatch(fetchContactDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailsFormPersonNew);
