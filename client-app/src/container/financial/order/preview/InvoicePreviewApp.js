import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchOrderDetails } from '../../../../actions/order/OrderDetailsActions';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import InvoicePreviewForm from './InvoicePreviewForm';
import InvoicePreviewToolbar from './InvoicePreviewToolbar';
import { useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const InvoicePreviewAppWrapper = props => {
    const params = useParams();
    return <InvoicePreviewApp {...props} params={params} />;
};

class InvoicePreviewApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scale: 1,
        };
    }

    componentDidMount() {
        this.props.fetchOrderDetails(this.props.params.id);
    }

    zoomIn = () => {
        this.setState({
            scale: this.state.scale + 0.2,
        });
    };

    zoomOut = () => {
        this.setState({
            scale: this.state.scale - 0.2,
        });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={'panel-small'}>
                                <InvoicePreviewToolbar zoomIn={this.zoomIn} zoomOut={this.zoomOut} />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <InvoicePreviewForm orderId={this.props.params.id} scale={this.state.scale} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchOrderDetails: id => {
        dispatch(fetchOrderDetails(id));
    },
});

export default connect(null, mapDispatchToProps)(InvoicePreviewAppWrapper);
