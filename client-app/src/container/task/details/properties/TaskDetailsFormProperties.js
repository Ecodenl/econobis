import React, { Component } from 'react';

import TaskDetailsFormPropertiesList from './TaskDetailsFormPropertiesList';
import TaskDetailsFormPropertyNew from './TaskDetailsFormPropertyNew';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

class TaskDetailsFormProperties extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showNew: false,
        };
    }

    toggleShowNew = () => {
        this.setState({
            showNew: !this.state.showNew,
        })
    };

    render() {
        return (
            <Panel>
                <Panel>
                    <PanelHeader>
                        <span className="h5 text-bold">Extra kenmerken gegevens</span>
                        <a role="button" className="pull-right" onClick={this.toggleShowNew}><span
                            className="glyphicon glyphicon-plus"/></a>
                    </PanelHeader>
                    <PanelBody>
                        <div className="col-md-12">
                            <TaskDetailsFormPropertiesList/>
                        </div>
                        <div className="col-md-12 extra-space-above">
                            {this.state.showNew &&
                            <TaskDetailsFormPropertyNew toggleShowNew={this.toggleShowNew}/>}
                        </div>
                    </PanelBody>
                </Panel>
            </Panel>
        );
    }
}

export default TaskDetailsFormProperties;