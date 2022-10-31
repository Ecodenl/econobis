import React, { Component } from 'react';

import QuotationRequestNewForm from './QuotationRequestNewForm';
import QuotationRequestNewToolbar from './QuotationRequestNewToolbar';

class QuotationRequestNewApp extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12 margin-10-top">
                        <QuotationRequestNewToolbar opportunityActionId={this.props.params.opportunityActionId} />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <QuotationRequestNewForm
                            opportunityId={this.props.params.opportunityId}
                            opportunityActionId={this.props.params.opportunityActionId}
                        />
                    </div>
                </div>
                <div className="col-md-3" />
            </div>
        );
    }
}

export default QuotationRequestNewApp;
