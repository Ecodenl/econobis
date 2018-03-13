import React from 'react';
import {connect} from "react-redux";

import ButtonIcon from '../../../../../components/button/ButtonIcon';
import {hashHistory} from "react-router";
import ButtonText from "../../../../../components/button/ButtonText";

const ParticipantsListToolbar = props => {
    const { meta = {} } = props.participantsProductionProject;

    return (
        <div className="row">
            <div className="col-md-2">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={"glyphicon-refresh"} onClickAction={props.resetParticipantProductionProjectFilters} />
                    {props.permissions.manageParticipation &&
                    <ButtonIcon iconName={"glyphicon-plus"}
                                onClickAction={() => hashHistory.push(`/productie-project/participant/nieuw/${props.productionProject.id}`)}/>
                    }
                    <ButtonText buttonText={'Rapportage'} onClickAction={props.toggleShowCheckboxList}/>
                </div>
            </div>
            <div className="col-md-8"><h3 className="text-center table-title">Participanten productieproject {props.productionProject ? props.productionProject.name : ''}</h3></div>
            <div className="col-md-2">
                <div className="pull-right">Resultaten: { meta.total || 0 }</div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        participantsProductionProject: state.participantsProductionProject.list,
        productionProject: state.productionProjectDetails,
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(ParticipantsListToolbar);