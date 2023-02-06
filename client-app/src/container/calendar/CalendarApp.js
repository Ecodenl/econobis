import React from 'react';

import CalendarBody from './CalendarBody';
import Panel from '../../components/panel/Panel';
import PanelBody from '../../components/panel/PanelBody';
import CalendarToolbar from './CalendarToolbar';

const CalendarApp = props => {
    return (
        <Panel>
            <PanelBody>
                <CalendarToolbar />
                <CalendarBody />
            </PanelBody>
        </Panel>
    );
};

export default CalendarApp;
