import React from 'react';
import {connect} from 'react-redux';

import Panel from "../../../../components/panel/Panel";
import PanelBody from "../../../../components/panel/PanelBody";
import HousingFilesList from "./HousingFilesList";

const HousingFileHarmonica = ({toggleShowList, showHousingFilesList, newHousingFile, housingFileCount, permissions}) => {
    return (
        <Panel className={"harmonica-button"}>
            <PanelBody>
                <div className="col-sm-10" onClick={toggleShowList} role="button">
                    <span className="">WONINGDOSSIERS <span className="badge">{ housingFileCount }</span></span>
                </div>
                <div className="col-sm-2">
                    {permissions.manageHousingFile &&
                    <a role="button" className="pull-right" onClick={newHousingFile}><span
                        className="glyphicon glyphicon-plus glyphicon-white"/></a>
                    }
                </div>
                <div className="col-sm-12">
                    { showHousingFilesList && <HousingFilesList /> }
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

export default connect(mapStateToProps, null)(HousingFileHarmonica);