import React from 'react';
import {connect} from 'react-redux';

import Panel from "../../../../components/panel/Panel";
import PanelBody from "../../../../components/panel/PanelBody";
import ParticipationsList from './ParticipationsList';

const ParticipationHarmonica = ({toggleShowList, showParticipationsList, newParticipation, participationCount, permissions}) => {
    return (
        <Panel className={"harmonica-button"}>
            <PanelBody>
                <div className="col-sm-10" onClick={toggleShowList} role="button">
                    <span className="">PARTICIPATIES <span className="badge">{ participationCount }</span></span>
                </div>
                <div className="col-sm-2">
                    {permissions.manageParticipation &&
                    <a role="button" className="pull-right" onClick={newParticipation}><span
                        className="glyphicon glyphicon-plus glyphicon-white"/></a>
                    }
                </div>
                <div className="col-sm-12">
                    { showParticipationsList && <ParticipationsList /> }
                </div>
            </PanelBody>
        </Panel>
    );
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions
    };
};

export default connect(mapStateToProps, null)(ParticipationHarmonica);