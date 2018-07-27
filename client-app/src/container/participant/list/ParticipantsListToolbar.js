import React, {Component} from 'react';
import {connect} from "react-redux";

import ButtonIcon from '../../../components/button/ButtonIcon';
import ButtonText from "../../../components/button/ButtonText";
import ParticipantsListExtraFilters from "./ParticipantsListExtraFilters";

class ParticipantsListToolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showExtraFilters: false,
        };
    }

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
                        <ButtonIcon iconName={"glyphicon-filter"} onClickAction={this.toggleShowExtraFilters} />
                        <ButtonIcon iconName={"glyphicon-download-alt"} onClickAction={this.props.getCSV} />
                        <ButtonText buttonText={'Rapportage'} onClickAction={this.props.toggleShowCheckboxList}/>
                    </div>
                </div>
                <div className="col-md-8"><h4 className="text-center table-title">Participanten
                    productieproject</h4></div>
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
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(ParticipantsListToolbar);