import React, {Component} from 'react';
import {connect} from 'react-redux';

import {newOccupation} from '../../../../actions/contact/ContactDetailsActions';
import InputSelect from '../../../../components/form/InputSelect';
import InputDate from '../../../../components/form/InputDate';
import ButtonText from '../../../../components/button/ButtonText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import validator from "validator";
import OccupationAPI from "../../../../api/contact/OccupationAPI";
import OrganisationAPI from "../../../../api/contact/OrganisationAPI";
import moment from "moment/moment";

class ContactDetailsFormOccupationsNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            organisations: [],
            occupation: {
                personId: this.props.id,
                organisationId: '',
                occupationId: '',
                startDate: '',
                endDate: '',
            },
            errors: {
                organisationId: false,
                occupationId: false,
            },
        }
    };

    componentDidMount() {
        OrganisationAPI.getOrganisationPeek().then(payload => {
            this.setState({
                organisations: payload
            });
        });
    }

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

        if (validator.isEmpty(occupation.organisationId)) {
            errors.organisationId = true;
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
            this.props.newOccupation(payload);
            this.props.toggleShowNew();
        });
    };

    render() {
        const {organisationId, occupationId, startDate, endDate} = this.state.occupation;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputSelect
                                label={"Verbonden met"}
                                size={"col-sm-6"}
                                name={"organisationId"}
                                options={this.state.organisations}
                                value={organisationId}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={this.state.errors.organisationId}
                            />
                            <InputSelect
                                label={"Rol"}
                                size={"col-sm-6"}
                                name={"occupationId"}
                                options={this.props.occupations}
                                value={occupationId}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={this.state.errors.occupationId}
                            />
                        </div>

                        <div className="row">
                            <InputDate
                                label={"Begin datum"}
                                size={"col-sm-6"}
                                name={"startDate"}
                                value={startDate}
                                onChangeAction={this.handleStartDate}
                            />
                            <InputDate
                                label={"Eind datum"}
                                size={"col-sm-6"}
                                name={"endDate"}
                                value={endDate}
                                onChangeAction={this.handleEndDate}
                            />
                        </div>

                        <div className="pull-right btn-group" role="group">
                            <ButtonText buttonClassName={"btn-default"} buttonText={"Annuleren"}
                                        onClickAction={this.props.toggleShowNew}/>
                            <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit} type={"submit"}
                                        value={"Submit"}/>
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        occupations: state.systemData.occupations,
        id: state.contactDetails.person.id,
    };
};

const mapDispatchToProps = dispatch => ({
    newOccupation: (id) => {
        dispatch(newOccupation(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailsFormOccupationsNew);
