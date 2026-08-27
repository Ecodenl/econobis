import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchInvoiceDetails } from '../../../../actions/invoice/InvoiceDetailsActions';
import InvoiceDetailsToolbar from './InvoiceDetailsToolbar';
import InvoiceDetailsForm from './InvoiceDetailsForm';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import InvoiceDetailsHarmonica from './InvoiceDetailsHarmonica';
import { useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const InvoiceDetailsAppWrapper = props => {
    const params = useParams();
    return <InvoiceDetailsApp {...props} params={params} />;
};

class InvoiceDetailsApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchInvoiceDetails(this.props.params.id);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={'panel-small'}>
                                <InvoiceDetailsToolbar />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <InvoiceDetailsForm />
                    </div>
                </div>
                <Panel className="col-md-3 harmonica">
                    <PanelBody>
                        <InvoiceDetailsHarmonica />
                    </PanelBody>
                </Panel>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        invoiceDetails: state.invoiceDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchInvoiceDetails: id => {
        dispatch(fetchInvoiceDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDetailsAppWrapper);
