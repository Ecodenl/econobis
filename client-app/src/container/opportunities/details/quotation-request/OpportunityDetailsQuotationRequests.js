import React, { Component } from 'react';

import OpportunityDetailsQuotationRequestsList from './OpportunityDetailsQuotationRequestsList';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

class OpportunityDetailsQuotationRequests extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { opportunityActions, opportunityId } = this.props;

        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Acties</span>
                    {this.props.permissions.manageQuotationRequest && opportunityActions.length == 1 ? (
                        <a
                            role="button"
                            className="pull-right"
                            onClick={() =>
                                hashHistory.push(
                                    `/offerteverzoek/nieuw/kans/${opportunityId}/actie/${opportunityActions[0].id}`
                                )
                            }
                        >
                            <span className="glyphicon glyphicon-plus" />
                        </a>
                    ) : null}

                    {this.props.permissions.manageQuotationRequest && opportunityActions.length > 1 ? (
                        <div className="nav navbar-nav btn-group pull-right" role="group">
                            <button className="btn btn-link" data-toggle="dropdown">
                                <span className="glyphicon glyphicon-plus" />
                            </button>
                            <ul className="dropdown-menu">
                                {opportunityActions.map((opportunityAction, i) => {
                                    return (
                                        <li>
                                            <a
                                                role={'button'}
                                                title={opportunityAction.name}
                                                onClick={() =>
                                                    hashHistory.push(
                                                        `/offerteverzoek/nieuw/kans/${opportunityId}/actie/${opportunityAction.id}`
                                                    )
                                                }
                                            >
                                                {opportunityAction.name}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ) : null}
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <OpportunityDetailsQuotationRequestsList />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        opportunityId: state.opportunityDetails.id,
        opportunityActions: state.opportunityDetails.intake.campaign.opportunityActions,
    };
};

export default connect(mapStateToProps)(OpportunityDetailsQuotationRequests);
