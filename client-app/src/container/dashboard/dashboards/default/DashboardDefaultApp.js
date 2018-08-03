import React, { Component } from 'react';

import DashboardMain from "./DashboardDefaultMain";
import ButtonEmails from "./../../buttons/ButtonEmails";
import ButtonTasks from "./../../buttons/ButtonTasks";

class DashboardDefaultApp extends Component {
    render() {
        return (
            <div>
                <div className={'row'}>
                    <ButtonEmails size={'col-xs-3'}/>
                    <ButtonTasks size={'col-xs-3'}/>
                </div>
                {/*<DashboardMain/>*/}
            </div>
        )
    }
}

export default DashboardDefaultApp;