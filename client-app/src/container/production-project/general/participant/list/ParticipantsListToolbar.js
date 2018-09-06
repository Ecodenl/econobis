import React, {Component} from 'react';
import {connect} from "react-redux";

import ButtonIcon from '../../../../../components/button/ButtonIcon';
import {hashHistory} from "react-router";
import ButtonText from "../../../../../components/button/ButtonText";
import ParticipantsListExtraFilters from "./ParticipantsListExtraFilters";
import ProductionProjectsAPI from "../../../../../api/production-project/ProductionProjectsAPI";
import axios from "axios";
import ContactsAPI from "../../../../../api/contact/ContactsAPI";

class ParticipantsListToolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            productionProjects: [],
            contacts: [],
            showExtraFilters: false,
        };
    }

    componentDidMount() {
        axios.all([ProductionProjectsAPI.peekProductionProjects(), ContactsAPI.getContactsPeek()])
            .then(axios.spread((productionProjects, contacts) => {
                this.setState({
                    productionProjects: productionProjects,
                    contacts: contacts,
                });
            }));
    };

    toggleShowExtraFilters = () => {
        this.setState({
            showExtraFilters: !this.state.showExtraFilters
        });
    };

    render() {
        const {meta = {}} = this.props.participantsProductionProject;

        return (
            <div className="row">
                <div className="col-md-2">
                    <div className="btn-group btn-group-flex" role="group">
                        <ButtonIcon iconName={"glyphicon-refresh"}
                                    onClickAction={this.props.resetParticipantProductionProjectFilters}/>
                        {this.props.permissions.manageParticipation &&
                        <ButtonIcon iconName={"glyphicon-plus"}
                                    onClickAction={() => hashHistory.push(`/productie-project/participant/nieuw/${this.props.productionProject.id}`)}/>
                        }
                        <ButtonIcon iconName={"glyphicon-filter"} onClickAction={this.toggleShowExtraFilters} />
                        <ButtonIcon iconName={"glyphicon-download-alt"} onClickAction={this.props.getCSV} />
                        <ButtonText buttonText={'Rapportage'} onClickAction={this.props.toggleShowCheckboxList}/>
                    </div>
                </div>
                <div className="col-md-8"><h4 className="text-center table-title">Participanten
                    productieproject {this.props.productionProject ? this.props.productionProject.name : ''}</h4></div>
                <div className="col-md-2">
                    <div className="pull-right">Resultaten: {meta.total || 0}</div>
                </div>
                {
                    this.state.showExtraFilters &&
                    <ParticipantsListExtraFilters
                        toggleShowExtraFilters={this.toggleShowExtraFilters}
                        handleExtraFiltersChange={this.props.handleExtraFiltersChange}
                        extraFilters={this.props.extraFilters}
                        amountOfFilters={this.props.amountOfFilters}
                        saveAsGroup={this.props.saveAsGroup}
                        productionProjects={this.state.productionProjects}
                        contacts={this.state.contacts}
                    />
                }
            </div>
        );
    }
    ;
}

const mapStateToProps = (state) => {
    return {
        participantsProductionProject: state.participantsProductionProject.list,
        productionProject: state.productionProjectDetails,
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(ParticipantsListToolbar);