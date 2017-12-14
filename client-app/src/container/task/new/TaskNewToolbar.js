import React from 'react';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

const TaskNewToolbar = ({task}) => {
    return (
        <div className="row">
            <div className="col-sm-12">
                <Panel>
                    <PanelBody className={"panel-small"}>
                        <div className="col-md-2">
                            <div className="btn-group" role="group">
                                <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack} />
                            </div>
                        </div>
                        <div className="col-md-2"><h4><strong>Taak:</strong></h4></div>
                        <div className="col-md-6"><h4>{task.name}</h4></div>
                        <div className="col-md-2" />
                    </PanelBody>
                </Panel>
            </div>
        </div>
    );
};

export default TaskNewToolbar;