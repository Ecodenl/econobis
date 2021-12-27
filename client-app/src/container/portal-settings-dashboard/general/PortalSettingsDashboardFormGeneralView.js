import React from 'react';

import ViewText from '../../../components/form/ViewText';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import PortalSettingsDashboardWidgetList from '../widgets/PortalSettingsDashboardWidgetList';

const PortalSettingsDashboardFormGeneralView = ({ welcomeTitle, welcomeMessage, widgets, switchToEdit }) => {
    return (
        <div onClick={switchToEdit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText
                            label={'Welkomsttitel'}
                            divSize={'col-sm-8'}
                            value={welcomeTitle}
                            className={'col-sm-8 form-group'}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Welkomstbericht'}
                            divSize={'col-sm-8'}
                            value={welcomeMessage}
                            className={'col-sm-8 form-group'}
                        />
                    </div>
                </PanelBody>
            </Panel>
            <Panel>
                <PanelBody>
                    <div className="row" style={{ margin: '0' }}>
                        <PortalSettingsDashboardWidgetList widgets={widgets} edit={false} />
                    </div>
                </PanelBody>
            </Panel>
        </div>
    );
};

export default PortalSettingsDashboardFormGeneralView;
