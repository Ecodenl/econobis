import React from 'react';

import Calendar from "./Calendar";
import Panel from "../../components/panel/Panel";
import PanelBody from "../../components/panel/PanelBody";
import CalendarToolbar from "./CalendarToolbar";

const CalendarApp = props => {
    return (
        <Panel>
            <PanelBody>
                <CalendarToolbar />
                <Calendar />
            </PanelBody>
        </Panel>
    );
};

export default CalendarApp;