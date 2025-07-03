import React from 'react';
import { connect } from 'react-redux';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import IntakesList from './IntakesList';

import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa/plus';

const IntakeHarmonica = ({ toggleShowList, showIntakesList, newIntake, intakeCount, permissions, keyUserRole, MarketingMedewerkerRole, BuurtaanpakManager, BuurtaanpakCoordinator }) => {
    return (
        permissions.menuEnergySaving &&
        (keyUserRole?.hasRole || MarketingMedewerkerRole?.hasRole || BuurtaanpakManager?.hasRole || BuurtaanpakCoordinator?.hasRole) && (
            <Panel className={'harmonica-button'}>
                <PanelBody>
                    <div className="col-sm-10" onClick={toggleShowList} role="button">
                        <span className="">
                            INTAKES <span className="badge">{intakeCount}</span>
                        </span>
                    </div>
                    <div className="col-sm-2">
                        {permissions.manageIntake && (
                            <a role="button" className="pull-right" onClick={newIntake}>
                                <Icon className="harmonica-button" size={14} icon={plus} />
                            </a>
                        )}
                    </div>
                    <div className="col-sm-12">{showIntakesList && <IntakesList />}</div>
                </PanelBody>
            </Panel>
        )
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        keyUserRole: state.meDetails.roles.find(role => role.name === 'Beheerder'),
        MarketingMedewerkerRole: state.meDetails.roles.find(role => role.name === 'Marketing medewerker'),
        BuurtaanpakManager: state.meDetails.roles.find(role => role.name === 'Buurtaanpak manager'),
        BuurtaanpakCoordinator: state.meDetails.roles.find(role => role.name === 'Buurtaanpak coördinator'),
    };
};

export default connect(mapStateToProps, null)(IntakeHarmonica);
