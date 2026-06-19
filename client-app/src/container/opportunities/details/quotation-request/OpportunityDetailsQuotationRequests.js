import React, { Component } from 'react';

import OpportunityDetailsQuotationRequestsList from './OpportunityDetailsQuotationRequestsList';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import DistrictAPI from '../../../../api/district/DistrictAPI';
import OpportunityDetailsQuotationRequestPlanByDistrictModal from './OpportunityDetailsQuotationRequestPlanByDistrictModal';

import Icon from 'react-icons-kit';
import { calendar } from 'react-icons-kit/fa/calendar';
import { plus } from 'react-icons-kit/fa/plus';

// Functionele wrapper voor de class component
const OpportunityDetailsQuotationRequestsWrapper = props => {
    const navigate = useNavigate();
    return <OpportunityDetailsQuotationRequests {...props} navigate={navigate} />;
};

class OpportunityDetailsQuotationRequests extends Component {
    constructor(props) {
        super(props);

        this.state = {
            districts: [],
            setShowPlanByDistrictModal: false,
        };
    }

    componentDidMount() {
        DistrictAPI.fetchDistricts().then(data => {
            this.setState({ districts: data.filter(district => !district.closed) });
        });
    }

    render() {
        const { opportunityActions, opportunityId } = this.props;

        return (
            <>
                <Panel>
                    <PanelHeader>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <span className="h5 text-bold">Acties</span>
                            <div>
                                {this.state.districts.length > 0 && (
                                    <>
                                        <button
                                            className="btn btn-link"
                                            onClick={() => this.setState({ setShowPlanByDistrictModal: true })}
                                        >
                                            <Icon size={14} icon={calendar} />
                                        </button>
                                    </>
                                )}
                                {this.props.permissions.manageQuotationRequest && opportunityActions.length == 1 ? (
                                    <button
                                        className="btn btn-link"
                                        onClick={() =>
                                            this.props.navigate(
                                                `/offerteverzoek/nieuw/kans/${opportunityId}/actie/${opportunityActions[0].id}`
                                            )
                                        }
                                    >
                                        <Icon size={14} icon={plus} />
                                    </button>
                                ) : null}
                                {this.props.permissions.manageQuotationRequest && opportunityActions.length > 1 ? (
                                    <div className="nav navbar-nav btn-group pull-right" role="group">
                                        <button className="btn btn-link" data-toggle="dropdown">
                                            <Icon size={14} icon={plus} />
                                        </button>
                                        <ul className="dropdown-menu">
                                            {opportunityActions.map((opportunityAction, i) => {
                                                return (
                                                    <li key={opportunityAction.id}>
                                                        <a
                                                            role={'button'}
                                                            title={opportunityAction.name}
                                                            onClick={() =>
                                                                this.props.navigate(
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
                            </div>
                        </div>
                    </PanelHeader>
                    <PanelBody>
                        <div className="col-md-12">
                            <OpportunityDetailsQuotationRequestsList />
                        </div>
                    </PanelBody>
                </Panel>
                {this.state.setShowPlanByDistrictModal && (
                    <OpportunityDetailsQuotationRequestPlanByDistrictModal
                        districts={this.state.districts}
                        onCancel={() => this.setState({ setShowPlanByDistrictModal: false })}
                        opportunityId={opportunityId}
                    />
                )}
            </>
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

export default connect(mapStateToProps)(OpportunityDetailsQuotationRequestsWrapper);
