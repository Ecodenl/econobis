import React, {Component} from 'react';

import OpportunityDetailsQuotationRequestsView from './OpportunityDetailsQuotationRequestsView';
import {connect} from "react-redux";

class OpportunityDetailsQuotationRequestsItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlightLine: '',
        };
    };

    onLineEnter = () => {
        this.setState({
            highlightLine: 'highlight-line',
        });
    };

    onLineLeave = () => {
        this.setState({
            highlightLine: '',
        });
    };

    render() {
        return (
            <div>
                <OpportunityDetailsQuotationRequestsView
                    highlightLine={this.state.highlightLine}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    quotationRequest={this.props.quotationRequest}
                />
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions
    }
};

export default connect(mapStateToProps)(OpportunityDetailsQuotationRequestsItem);
