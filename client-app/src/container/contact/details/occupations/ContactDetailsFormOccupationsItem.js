import React, {Component} from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import { isEqual } from 'lodash';

import OccupationAPI from '../../../../api/contact/OccupationAPI';
import {deleteOccupation, updateOccupation} from '../../../../actions/contact/ContactDetailsActions';
import ContactDetailsFormOccupationsView from './ContactDetailsFormOccupationsView';
import ContactDetailsFormOccupationsEdit from './ContactDetailsFormOccupationsEdit';
import ContactDetailsFormOccupationsDelete from './ContactDetailsFormOccupationsDelete';
import moment from "moment/moment";
moment.locale('nl');
import OrganisationAPI from "../../../../api/contact/OrganisationAPI";

class ContactDetailsFormOccupationsItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showEdit: false,
            showDelete: false,
            organisations: [],
            occupation: {
                ...props.occupation,
                personId: props.occupation.person.id,
                startDate: props.occupation.startDate ? props.occupation.startDate.date : '',
                endDate: props.occupation.endDate ? props.occupation.endDate.date : '',
                organisationId: props.occupation.organisation.id,
                occupationId: props.occupation.occupation.id,
                oldOrganisationId: props.occupation.organisation.id,
                oldOccupationId: props.occupation.occupation.id,
            },
            errors: {
                organisationIdError: false,
                occupationIdError: false,
            },
        };
    };

    componentWillReceiveProps(nextProps) {
        if(!isEqual(this.state.occupation, nextProps.occupation)){
            this.setState({
                ...this.state,
                occupation: {
                    ...nextProps.occupation,
                    personId: nextProps.occupation.person.id,
                    startDate: nextProps.occupation.startDate ? nextProps.occupation.startDate.date : '',
                    endDate: nextProps.occupation.endDate ? nextProps.occupation.endDate.date : '',
                    organisationId: nextProps.occupation.organisation.id,
                    occupationId: nextProps.occupation.occupation.id,
                    oldOrganisationId: nextProps.occupation.organisation.id,
                    oldOccupationId: nextProps.occupation.occupation.id,
                },
            });
        }
    };

    componentDidMount() {
        OrganisationAPI.getOrganisationPeek().then(payload => {
            this.setState({
                organisations: payload
            });
        });
    }

    onLineEnter = () => {
        this.setState({
            showActionButtons: true,
            highlightLine: 'highlight-line',
        });
    };

    onLineLeave = () => {
        this.setState({
            showActionButtons: false,
            highlightLine: '',
        });
    };

    openEdit = () => {
        this.setState({showEdit: true});
    };

    closeEdit = () => {
        this.setState({showEdit: false});
    };

    cancelEdit = () => {
        this.setState({
            ...this.state,
            occupation: {
                ...this.props.occupation,
                personId: this.props.occupation.person.id,
                startDate: this.props.occupation.startDate ? this.props.occupation.startDate.date : '',
                endDate: this.props.occupation.endDate ? this.props.occupation.endDate.date : '',
                organisationId: this.props.occupation.organisation ? this.props.occupation.organisation.id : '',
                occupationId: this.props.occupation.occupation ? this.props.occupation.occupation.id : '',
            },
        });

        this.closeEdit();
    };

    toggleDelete = () => {
        this.setState({showDelete: !this.state.showDelete});
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
            },
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

    handleSubmit = event => {
        event.preventDefault();

        const {occupation} = this.state;

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(occupation.organisationId + '')) {
            errors.organisationIdError = true;
            hasErrors = true;
        }

        if (validator.isEmpty(occupation.occupationId + '')) {
            errors.occupationIdError = true;
            hasErrors = true;
        }

        this.setState({...this.state, errors: errors});

        // If no errors send form
        !hasErrors &&
        OccupationAPI.updateOccupation(occupation).then((payload) => {
            this.props.updateOccupation(payload);

            this.closeEdit();
        });
    };

    deleteOccupation = (occupation) => {
        OccupationAPI.deleteOccupation(occupation).then((payload) => {
            this.props.deleteOccupation(payload);

            this.setState({
                ...this.state,
                occupation: {
                    ...this.props.occupation,
                    personId: this.props.occupation.person.id,
                    startDate: this.props.occupation.startDate ? this.props.occupation.startDate.date : '',
                    endDate: this.props.occupation.endDate ? this.props.occupation.endDate.date : '',
                    organisationId: this.props.occupation.organisation ? this.props.occupation.organisation.id : '',
                    occupationId: this.props.occupation.occupation ? this.props.occupation.occupation.id : '',
                },
            });
        });
    };

    render() {
        return (
            <div>
                <ContactDetailsFormOccupationsView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    openEdit={this.openEdit}
                    toggleDelete={this.toggleDelete}
                    occupation={this.state.occupation}
                />
                {
                    this.state.showEdit &&
                    <ContactDetailsFormOccupationsEdit
                        occupation={this.state.occupation}
                        handleInputChange={this.handleInputChange}
                        handleStartDate={this.handleStartDate}
                        handleEndDate={this.handleEndDate}
                        handleSubmit={this.handleSubmit}
                        organisationIdError={this.state.errors.organisationIdError}
                        occupationIdError={this.state.errors.occupationIdError}
                        cancelEdit={this.cancelEdit}
                        organisations={this.state.organisations}
                    />
                }
                {
                    this.state.showDelete &&
                    <ContactDetailsFormOccupationsDelete
                        closeDeleteItemModal={this.toggleDelete}
                        deleteOccupation={this.deleteOccupation}
                        occupation={this.state.occupation}
                    />
                }
            </div>
        );
    }
};

const mapDispatchToProps = dispatch => ({
    updateOccupation: (occupation) => {
        dispatch(updateOccupation(occupation));
    },
    deleteOccupation: (occupation) => {
        dispatch(deleteOccupation(occupation));
    },
});

export default connect(null, mapDispatchToProps)(ContactDetailsFormOccupationsItem);
