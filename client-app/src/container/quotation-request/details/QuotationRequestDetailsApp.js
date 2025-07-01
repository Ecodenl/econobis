import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchQuotationRequestDetails } from '../../../actions/quotation-request/QuotationRequestDetailsActions';
import QuotationRequestDetailsToolbar from './QuotationRequestDetailsToolbar';
import QuotationRequestDetailsForm from './QuotationRequestDetailsForm';

import PanelBody from '../../../components/panel/PanelBody';
import Panel from '../../../components/panel/Panel';
import QuotationRequestDetailsHarmonica from './harmonica/QuotationRequestDetailsHarmonica';
import { useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const QuotationRequestDetailsAppWrapper = props => {
    const params = useParams();
    return <QuotationRequestDetailsApp {...props} params={params} />;
};

class QuotationRequestDetailsApp extends Component {
    constructor(props) {
        super(props);
    }

    UNSAFE_componentWillMount() {
        this.props.fetchQuotationRequestDetails(this.props.params.id);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <QuotationRequestDetailsToolbar id={this.props.params.id} />
                    </div>

                    <div className="col-md-12">
                        <QuotationRequestDetailsForm />
                    </div>
                </div>
                <Panel className="col-md-3 harmonica">
                    <PanelBody>
                        <QuotationRequestDetailsHarmonica id={this.props.params.id} />
                    </PanelBody>
                </Panel>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchQuotationRequestDetails: id => {
        dispatch(fetchQuotationRequestDetails(id));
    },
});

export default connect(null, mapDispatchToProps)(QuotationRequestDetailsAppWrapper);
