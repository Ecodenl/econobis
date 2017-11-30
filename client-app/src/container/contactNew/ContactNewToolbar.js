import React, {Component} from 'react';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../components/button/ButtonIcon';
import Panel from '../../components/panel/Panel';
import PanelBody from '../../components/panel/PanelBody';

class ContactNewToolbar extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="row">
                <Panel>
                    <PanelBody className={"panel-small"}>
                        <div className="col-md-4">
                            <div className="btn-group margin-small" role="group">
                                <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack} />
                            </div>
                        </div>
                        <div className="col-md-4"><h4 className="text-center margin-small">Nieuw contact</h4></div>
                        <div className="col-md-4" />
                    </PanelBody>
                </Panel>
            </div>
        );
    };
};

export default ContactNewToolbar;