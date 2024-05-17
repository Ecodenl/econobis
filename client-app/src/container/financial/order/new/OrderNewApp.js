import React, { Component } from 'react';

import OrderNewForm from './OrderNewForm';
import OrderNewToolbar from './OrderNewToolbar';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

class OrderNewApp extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className="panel-small">
                                <OrderNewToolbar />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <OrderNewForm
                            contactId={this.props.params.contactId}
                            participationId={this.props.params.participationId}
                        />
                    </div>
                </div>
                <div className="col-md-3" />
            </div>
        );
    }
}

export default OrderNewApp;
