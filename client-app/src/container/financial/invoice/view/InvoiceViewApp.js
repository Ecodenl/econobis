import React, {Component} from 'react';
import { connect } from 'react-redux';

import { fetchInvoiceDetails } from '../../../../actions/invoice/InvoiceDetailsActions';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import InvoiceViewToolbar from "./InvoiceViewToolbar";
import InvoiceViewForm from "./InvoiceViewForm";
import InvoiceDetailsAPI from "../../../../api/invoice/InvoiceDetailsAPI";
import fileDownload from "js-file-download";


class InvoiceViewApp extends Component {
    constructor(props){
        super(props);

        this.state = {
            scale: 1,
        };

        this.download = this.download.bind(this);
    };

    componentDidMount() {
        this.props.fetchInvoiceDetails(this.props.params.id);
    };

    zoomIn = () => {
        this.setState({
            scale: (this.state.scale + 0.2),
        });
    };

    zoomOut = () => {
        this.setState({
            scale: (this.state.scale - 0.2),
        });
    };

    download() {
        InvoiceDetailsAPI.download(this.props.invoiceDetails.id).then((payload) => {
            fileDownload(payload.data, this.props.invoiceDetails.document.name);
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={"panel-small"}>
                                <InvoiceViewToolbar
                                    zoomIn={this.zoomIn}
                                    zoomOut={this.zoomOut}
                                    download={this.download}/>
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <InvoiceViewForm
                            invoiceId={this.props.params.id}
                            scale={this.state.scale}/>
                    </div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        invoiceDetails: state.invoiceDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchInvoiceDetails: (id) => {
        dispatch(fetchInvoiceDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceViewApp);
