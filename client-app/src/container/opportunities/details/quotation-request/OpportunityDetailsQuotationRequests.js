import React, { Component } from 'react';

import OpportunityDetailsQuotationRequestsList from './OpportunityDetailsQuotationRequestsList';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';
import {connect} from "react-redux";
import {hashHistory} from "react-router";

    class OpportunityDetailsQuotationRequests extends Component {
        constructor(props) {
            super(props);
        }

        newQuotationRequest = () => {
            hashHistory.push(`/offerteverzoek/nieuw/kans/${this.props.opportunityId}`);
        };

        render() {
            return (
                <Panel>
                    <PanelHeader>
                        <span className="h5 text-bold">Offerteverzoek</span>
                        {this.props.permissions.manageQuotationRequest &&
                        <a role="button" className="pull-right" onClick={this.newQuotationRequest}><span
                            className="glyphicon glyphicon-plus"/></a>
                        }
                    </PanelHeader>
                    <PanelBody>
                        <div className="col-md-12">
                            <OpportunityDetailsQuotationRequestsList/>
                        </div>
                    </PanelBody>
                </Panel>
            );
        }
    }

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions,
        opportunityId: state.opportunityDetails.id
    }
};

export default connect(mapStateToProps)(OpportunityDetailsQuotationRequests);