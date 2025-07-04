import React, { Component } from 'react';

import OrderNewForm from './OrderNewForm';
import OrderNewToolbar from './OrderNewToolbar';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import { useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const OrderNewAppWrapper = props => {
    const params = useParams();
    return <OrderNewApp {...props} params={params} />;
};

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
                            administrationId={this.props.params.administrationId}
                        />
                    </div>
                </div>
                <div className="col-md-3" />
            </div>
        );
    }
}

export default OrderNewAppWrapper;
