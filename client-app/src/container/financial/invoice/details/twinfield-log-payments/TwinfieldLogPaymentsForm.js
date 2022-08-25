import React, { Component } from 'react';

import TwinfieldLogPaymentsFormList from './TwinfieldLogPaymentsFormList';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../components/panel/PanelHeader';

class TwinfieldLogPaymentsForm extends Component {
    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Twinfield log betalingen</span>
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <TwinfieldLogPaymentsFormList />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

export default TwinfieldLogPaymentsForm;
