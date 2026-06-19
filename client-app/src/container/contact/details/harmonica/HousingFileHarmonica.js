import React from 'react';
import { connect } from 'react-redux';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import HousingFilesList from './HousingFilesList';

import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa/plus';

const HousingFileHarmonica = ({
    toggleShowList,
    showHousingFilesList,
    newHousingFile,
    housingFileCount,
    permissions,
}) => {
    return (
        permissions.viewHousingFile && (
            <Panel className={'harmonica-button'}>
                <PanelBody>
                    <div className="col-sm-10" onClick={toggleShowList} role="button">
                        <span className="">
                            WONINGDOSSIERS <span className="badge">{housingFileCount}</span>
                        </span>
                    </div>
                    <div className="col-sm-2">
                        {permissions.manageHousingFile && (
                            <a role="button" className="pull-right" onClick={newHousingFile}>
                                <Icon className="harmonica-button" size={14} icon={plus} />
                            </a>
                        )}
                    </div>
                    <div className="col-sm-12">{showHousingFilesList && <HousingFilesList />}</div>
                </PanelBody>
            </Panel>
        )
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(HousingFileHarmonica);
