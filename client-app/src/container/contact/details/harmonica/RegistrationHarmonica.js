import React from 'react';
import {connect} from 'react-redux';

import Panel from "../../../../components/panel/Panel";
import PanelBody from "../../../../components/panel/PanelBody";
import RegistrationsList from './RegistrationsList';

const TaskHarmonica = ({toggleShowList, showRegistrationsList, newRegistration, registrationCount, permissions}) => {
    return (
        <Panel className={"harmonica-button"}>
            <PanelBody>
                <div className="col-sm-10" onClick={toggleShowList} role="button">
                    <span className="">AANMELDINGEN <span className="badge">{ registrationCount }</span></span>
                </div>
                <div className="col-sm-2">
                    {permissions.manageRegistration &&
                    <a role="button" className="pull-right" onClick={newRegistration}><span
                        className="glyphicon glyphicon-plus glyphicon-white"/></a>
                    }
                </div>
                <div className="col-sm-12">
                    { showRegistrationsList && <RegistrationsList /> }
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