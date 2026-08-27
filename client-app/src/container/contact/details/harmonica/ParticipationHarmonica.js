import React from 'react';
import { connect } from 'react-redux';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import ParticipationsList from './ParticipationsList';

import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa/plus';

const ParticipationHarmonica = ({
    toggleShowList,
    showParticipationsList,
    newParticipation,
    participationCount,
    permissions,
}) => {
    return (
        permissions.viewParticipation && (
            <Panel className={'harmonica-button'}>
                <PanelBody>
                    <div className="col-sm-10" onClick={toggleShowList} role="button">
                        <span className="">
                            DEELNAMES <span className="badge">{participationCount}</span>
                        </span>
                    </div>
                    <div className="col-sm-2">
                        {permissions.manageParticipation && (
                            <a role="button" className="pull-right" onClick={newParticipation}>
                                <Icon className="harmonica-button" size={14} icon={plus} />
                            </a>
                        )}
                    </div>
                    <div className="col-sm-12">{showParticipationsList && <ParticipationsList />}</div>
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

export default connect(mapStateToProps, null)(ParticipationHarmonica);
