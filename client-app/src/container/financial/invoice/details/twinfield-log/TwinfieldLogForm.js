import React, { Component } from 'react';

import TwinfieldLogFormList from './TwinfieldLogFormList';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../components/panel/PanelHeader';

class TwinfieldLogForm extends Component {
    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Twinfield log</span>
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <TwinfieldLogFormList />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

export default TwinfieldLogForm;
