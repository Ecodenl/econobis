import React from 'react';
import {connect} from 'react-redux';

import Panel from "../../../../components/panel/Panel";
import PanelBody from "../../../../components/panel/PanelBody";
import IntakesList from './IntakesList';

const TaskHarmonica = ({toggleShowList, showIntakesList, newIntake, intakeCount, permissions}) => {
    return (
        <Panel className={"harmonica-button"}>
            <PanelBody>
                <div className="col-sm-10" onClick={toggleShowList} role="button">
                    <span className="">INTAKES <span className="badge">{ intakeCount }</span></span>
                </div>
                <div className="col-sm-2">
                    {permissions.manageIntake &&
                    <a role="button" className="pull-right" onClick={newIntake}><span
                        className="glyphicon glyphicon-plus glyphicon-white"/></a>
                    }
                </div>
                <div className="col-sm-12">
                    { showIntakesList && <IntakesList /> }
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

export default connect(mapStateToProps, null)(TaskHarmonica);