import React, { Component } from 'react';

import QuotationRequestNewForm from './QuotationRequestNewForm';
import QuotationRequestNewToolbar from './QuotationRequestNewToolbar';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const QuotationRequestNewAppWrapper = props => {
    const params = useParams();
    return <QuotationRequestNewApp {...props} params={params} />;
};

class QuotationRequestNewApp extends Component {
    constructor(props) {
        super(props);

        const opportunityAction = props.opportunityActions.find(function(opportunityAction) {
            return opportunityAction.id == props.params.opportunityActionId;
        });

        this.state = {
            opportunityAction: opportunityAction,
        };
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12 margin-10-top">
                        <QuotationRequestNewToolbar opportunityAction={this.state.opportunityAction} />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <QuotationRequestNewForm
                            opportunityId={this.props.params.opportunityId}
                            opportunityAction={this.state.opportunityAction}
                        />
                    </div>
                </div>
                <div className="col-md-3" />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        opportunityActions: state.systemData.opportunityActions,
    };
};

export default connect(mapStateToProps, null)(QuotationRequestNewAppWrapper);
